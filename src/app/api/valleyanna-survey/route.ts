import { NextRequest, NextResponse } from 'next/server';
import { transporter } from '../../../lib/mailer';

// Receives submissions from public/valleyanna-survey.html. Each response is
// appended to a Google Sheet (scripts/valleyanna-survey.gs) and emailed as a
// backup; the neighbour only sees an error if both fail.

// Maximum length kept for each text field.
const LIMITS = {
  house: 20,
  floods: 2000,
  dateNotes: 2000,
  kind: 500,
  claim: 50,
  protection: 200,
  comments: 4000,
  submittedAt: 40,
} as const;

type Row = Record<keyof typeof LIMITS, string> & {
  floodCount: number;
  receivedAt: string;
};

const LABELS: [keyof Row, string][] = [
  ['house', 'House number'],
  ['floodCount', 'Floods in 25 years'],
  ['floods', 'Dates'],
  ['dateNotes', 'Notes on dates'],
  ['kind', 'Kind of flooding'],
  ['claim', 'Insurance claim'],
  ['protection', 'Protections'],
  ['comments', 'Anything else'],
  ['submittedAt', 'Submitted (browser)'],
  ['receivedAt', 'Received (server)'],
];

function text(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

async function appendToSheet(row: Row) {
  const url = process.env.SURVEY_SHEET_URL;
  if (!url) throw new Error('SURVEY_SHEET_URL is not set');

  // Apps Script answers with a redirect to the script output; fetch follows it.
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.SURVEY_SHEET_SECRET, ...row }),
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.ok) {
    throw new Error(`Sheet rejected the row: ${res.status} ${JSON.stringify(body)}`);
  }
}

async function sendEmail(row: Row) {
  // Plain text only, so nothing a neighbour types is ever rendered as HTML.
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `Valleyanna survey — house ${row.house}`,
    text: LABELS.map(([key, label]) => `${label}: ${row[key] === '' ? '-' : row[key]}`).join('\n'),
  });
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  const floodCount = Math.min(50, Math.max(0, Math.floor(Number(body.floodCount)) || 0));
  const row = {
    ...Object.fromEntries(
      Object.entries(LIMITS).map(([key, max]) => [key, text(body[key], max)]),
    ),
    floodCount,
    receivedAt: new Date().toISOString(),
  } as Row;

  if (!row.house) {
    return NextResponse.json({ ok: false, error: 'House number is required' }, { status: 400 });
  }

  const [sheet, email] = await Promise.allSettled([appendToSheet(row), sendEmail(row)]);
  if (sheet.status === 'rejected') console.error('Survey sheet error:', sheet.reason);
  if (email.status === 'rejected') console.error('Survey email error:', email.reason);

  if (sheet.status === 'rejected' && email.status === 'rejected') {
    return NextResponse.json({ ok: false, error: 'Could not record response' }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
