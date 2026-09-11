/**
 * Google Apps Script for the Valleyanna Drive flood survey.
 * Not deployed with the site — paste it into an Apps Script project
 * (script.google.com). It creates its own responses spreadsheet.
 *
 *   1. Replace the editor contents with this file and set SECRET below to the
 *      same value as SURVEY_SHEET_SECRET in Netlify / .env.local.
 *   2. Run testDoPost once. The log prints the new sheet's URL.
 *   3. Deploy -> New deployment -> type "Web app",
 *      Execute as: Me, Who has access: Anyone. Authorize when asked.
 *   4. Copy the Web app URL (ends in /exec) into SURVEY_SHEET_URL.
 *
 * After editing this script, use Deploy -> Manage deployments -> Edit ->
 * Version: New version, so the /exec URL stays the same.
 */

const SECRET = 'PASTE_THE_SAME_VALUE_AS_SURVEY_SHEET_SECRET';

const COLUMNS = [
  ['receivedAt', 'Received'],
  ['house', 'House number'],
  ['floodCount', 'Floods in 25 years'],
  ['floods', 'Dates'],
  ['dateNotes', 'Notes on dates'],
  ['kind', 'Kind of flooding'],
  ['claim', 'Insurance claim'],
  ['protection', 'Protections'],
  ['comments', 'Anything else'],
  ['submittedAt', 'Submitted (browser)'],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json({ ok: false, error: 'forbidden' });

    const sheet = getSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS.map(function (c) { return c[1]; }));
      sheet.setFrozenRows(1);
    }

    sheet.appendRow(COLUMNS.map(function (c) {
      const value = data[c[0]] === undefined ? '' : data[c[0]];
      // Stop free text starting with = + - @ from being treated as a formula.
      return typeof value === 'string' && /^[=+\-@]/.test(value) ? "'" + value : value;
    }));

    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// doPost only receives data from a real web request, so pressing Run on it in
// the editor fails. Run this instead (pick it in the function dropdown) to
// authorize the script and check a TEST row lands in the sheet, then delete
// that row.
function testDoPost() {
  const res = doPost({ postData: { contents: JSON.stringify({
    secret: SECRET,
    house: 'TEST',
    floodCount: 0,
    receivedAt: new Date().toISOString(),
  }) } });
  Logger.log(res.getContent());
}

// Creates the responses spreadsheet on first use and remembers its ID.
function getSheet() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty('SHEET_ID');
  if (!id) {
    const created = SpreadsheetApp.create('Valleyanna flood survey responses');
    id = created.getId();
    props.setProperty('SHEET_ID', id);
    Logger.log('Created sheet: ' + created.getUrl());
  }
  return SpreadsheetApp.openById(id).getSheets()[0];
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
