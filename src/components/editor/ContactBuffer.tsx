'use client';

import { useState } from 'react';
import MdBuffer from './MdBuffer';
import type { Line } from './lines';

const EMAIL = 'finlay.cooper@rogers.com';

const field =
  'min-w-0 flex-1 border-0 border-b border-dashed border-border bg-transparent px-0 text-fg-strong focus:border-warn focus:outline-none';

/** Label column wide enough for "linkedin:" so values line up. */
const Label = ({ htmlFor, children }: { htmlFor: string; children: string }) => (
  <label htmlFor={htmlFor} className="w-[10ch] shrink-0 text-code">
    {children}
  </label>
);

const info: [string, string, string | null][] = [
  ['email', EMAIL, `mailto:${EMAIL}`],
  ['location', 'Toronto, ON', null],
  ['phone', '(647) 963-2667', 'tel:+16479632667'],
];

const connect: [string, string, string][] = [
  ['github', 'github.com/FinlayCooper', 'https://github.com/FinlayCooper'],
  ['linkedin', 'linkedin.com/in/finlaycooper', 'https://www.linkedin.com/in/finlaycooper/'],
];

const linkClass =
  'min-w-0 break-all text-heading underline decoration-heading/40 underline-offset-4 hover:decoration-heading';

const kv = ([k, v, href]: [string, string, string | null]): Line => ({
  t: 'node',
  node: (
    <p className="flex flex-wrap">
      <span className="w-[10ch] shrink-0 text-code">{k}:</span>
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={linkClass}>
          {v}
        </a>
      ) : (
        <span>{v}</span>
      )}
    </p>
  ),
});

const ContactBuffer = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const lines: Line[] = [
    { t: 'h1', text: 'Get in Touch' },
    { t: 'meta', text: 'Open to new grad roles and freelance work.' },
    { t: 'blank' },
    { t: 'h2', text: 'Contact Information' },
    ...info.map(kv),
    { t: 'blank' },
    { t: 'h2', text: 'Connect' },
    ...connect.map(kv),
    { t: 'blank' },
    { t: 'h2', text: 'Send a message' },
    {
      t: 'node',
      node: (
        <p className="flex">
          <Label htmlFor="name">name:</Label>
          <input id="name" name="name" autoComplete="name" required value={form.name} onChange={onChange} className={field} />
        </p>
      ),
    },
    {
      t: 'node',
      node: (
        <p className="flex">
          <Label htmlFor="email">email:</Label>
          <input id="email" name="email" type="email" autoComplete="email" required value={form.email} onChange={onChange} className={field} />
        </p>
      ),
    },
    {
      t: 'node',
      node: (
        <p className="flex">
          <Label htmlFor="message">message:</Label>
          <textarea id="message" name="message" rows={4} required value={form.message} onChange={onChange} className={`${field} resize-y`} />
        </p>
      ),
    },
    { t: 'blank' },
    {
      t: 'node',
      node: (
        <button
          type="submit"
          disabled={status === 'sending'}
          className="min-h-11 bg-surface px-[1ch] text-fg-strong hover:bg-cursorline disabled:opacity-60"
        >
          {status === 'sending' ? '[ sending... ]' : '[ send message ]'}
        </button>
      ),
    },
    ...(status === 'success'
      ? [
          {
            t: 'node',
            node: (
              <p role="status" className="text-code">
                <span aria-hidden="true">✓ </span>Message sent. I&apos;ll get back to you shortly.
              </p>
            ),
          } as Line,
        ]
      : status === 'error'
        ? [
            {
              t: 'node',
              node: (
                <p role="alert" className="text-error">
                  Message didn&apos;t send. Try again, or email{' '}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-4">
                    {EMAIL}
                  </a>{' '}
                  directly.
                </p>
              ),
            } as Line,
          ]
        : []),
  ];

  return (
    <form onSubmit={onSubmit} className="flex flex-1 flex-col md:min-h-0">
      <MdBuffer file="contact.md" lines={lines} cursor={4} />
    </form>
  );
};

export default ContactBuffer;
