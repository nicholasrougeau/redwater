// Google Apps Script — CEO Rat Pack Lead Capture
// Does two things per submission:
//   1. Appends a row to this Google Sheet
//   2. Upserts the lead into the Redwater CRM pipeline (dashboard-v2)
//
// Deploy as: Web App, Execute as: Me, Access: Anyone
//
// REQUIRED ONE-TIME SETUP (keeps the CRM key out of all git repos):
//   1. In the Apps Script editor, click the gear icon (Project Settings)
//   2. Scroll to "Script Properties" > Add script property
//   3. Property: CRM_API_KEY   Value: <your cli_api_key from dashboard Settings > Profile>
//
// The CRM call is fire-and-safe: if the key is missing or the CRM is down,
// the sheet row still gets written and the response still returns success.

const CRM_URL = 'https://dashboard-v2-five-wheat.vercel.app/api/cli/upsert-prospect';

function doGet(e) {
  try {
    const p = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Write header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Submitted At',
        'First Name',
        'Last Name',
        'Phone',
        'Email',
        'Brokerage',
        'Role',
        'Agent Count',
        'Consent',
        'Source',
        'CRM Status',
      ]);
    }

    const crmStatus = pushToCrm(p);

    sheet.appendRow([
      new Date(),
      p.firstName || '',
      p.lastName  || '',
      p.phone     || '',
      p.email     || '',
      p.brokerage || '',
      p.role      || '',
      p.agentCount|| '',
      'Yes',
      p.source    || 'rat-pack-form',
      crmStatus,
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function pushToCrm(p) {
  const key = PropertiesService.getScriptProperties().getProperty('CRM_API_KEY');
  if (!key) return 'skipped (no key set)';

  const name = ((p.firstName || '') + ' ' + (p.lastName || '')).trim();
  if (!name) return 'skipped (no name)';

  const notes = [
    'CEO Rat Pack form submission.',
    'Role: ' + (p.role || 'n/a'),
    'Agents on team: ' + (p.agentCount || 'n/a'),
    'Consented to calls/texts/emails: Yes',
  ].join(' ');

  try {
    const res = UrlFetchApp.fetch(CRM_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: { Authorization: 'Bearer ' + key },
      payload: JSON.stringify({
        name: name,
        company: p.brokerage || null,
        email: p.email || null,
        phone: p.phone || null,
        primary_source: 'networking_event',
        lifecycle_stage: 'lead',
        tags: ['ceo-rat-pack', 'real-estate'],
        notes_summary: notes,
      }),
      muteHttpExceptions: true,
    });
    const code = res.getResponseCode();
    if (code === 200 || code === 201) {
      const body = JSON.parse(res.getContentText());
      return body.created ? 'created' : (body.merged ? 'merged' : 'ok');
    }
    return 'error ' + code;
  } catch (err) {
    return 'error: ' + err.message;
  }
}
