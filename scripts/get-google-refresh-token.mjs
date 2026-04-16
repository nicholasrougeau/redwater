#!/usr/bin/env node
// One-time helper — obtains a Google refresh token for the scheduler Edge Function.
//
// Prerequisites:
//   1. Google Cloud Console → Enable Google Calendar API for the project
//   2. Create an OAuth 2.0 Client ID (type: Web application)
//   3. Add Authorized Redirect URI: http://localhost:53682/oauth/callback
//   4. Export these in your shell OR have the script prompt you:
//        GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
//
// Usage:
//   node scripts/get-google-refresh-token.mjs
//
// Output:
//   Prints refresh_token to stdout
//   Writes it to .google-refresh-token.local (gitignored)
//
// Next step:
//   supabase secrets set GOOGLE_REFRESH_TOKEN=<token>

import http from 'node:http';
import { URL } from 'node:url';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const REDIRECT_URI = 'http://localhost:53682/oauth/callback';
const PORT = 53682;
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
  'openid',
  'email',
  'profile',
].join(' ');

async function prompt(question) {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question(question);
  rl.close();
  return answer.trim();
}

function openBrowser(url) {
  const platform = process.platform;
  let cmd;
  let args;
  if (platform === 'win32') {
    // cmd.exe `start` mangles URLs at the first `&`. rundll32 handles the URL as a single arg.
    cmd = 'rundll32';
    args = ['url.dll,FileProtocolHandler', url];
  } else if (platform === 'darwin') {
    cmd = 'open';
    args = [url];
  } else {
    cmd = 'xdg-open';
    args = [url];
  }
  try {
    spawn(cmd, args, { detached: true, stdio: 'ignore' }).unref();
  } catch (err) {
    console.warn('Could not auto-open browser. Open this URL manually:\n', url);
    void err;
  }
}

async function main() {
  let clientId = process.env.GOOGLE_CLIENT_ID;
  let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  if (!clientId) clientId = await prompt('GOOGLE_CLIENT_ID: ');
  if (!clientSecret) clientSecret = await prompt('GOOGLE_CLIENT_SECRET: ');
  if (!clientId || !clientSecret) {
    console.error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required.');
    process.exit(1);
  }

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES);
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  const codePromise = new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const u = new URL(req.url, `http://localhost:${PORT}`);
      if (u.pathname !== '/oauth/callback') {
        res.writeHead(404).end('Not found');
        return;
      }
      const err = u.searchParams.get('error');
      const code = u.searchParams.get('code');
      if (err) {
        res.writeHead(400, { 'Content-Type': 'text/html' }).end(`<h1>Error: ${err}</h1>`);
        server.close();
        reject(new Error(err));
        return;
      }
      if (!code) {
        res.writeHead(400, { 'Content-Type': 'text/html' }).end('<h1>Missing code</h1>');
        server.close();
        reject(new Error('Missing code'));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' }).end(
        '<h1>You can close this tab.</h1><p>Refresh token printed to your terminal.</p>',
      );
      server.close();
      resolve(code);
    });
    server.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT} for Google callback…`);
      openBrowser(authUrl.toString());
    });
    server.on('error', reject);
  });

  const code = await codePromise;

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
  });
  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    console.error('Token exchange failed:', tokenRes.status, text);
    process.exit(1);
  }
  const tokens = await tokenRes.json();
  if (!tokens.refresh_token) {
    console.error(
      'No refresh_token returned. Revoke app access in your Google account and retry — Google only issues refresh_token on first consent.',
    );
    console.error('Full response:', tokens);
    process.exit(1);
  }

  const outfile = '.google-refresh-token.local';
  fs.writeFileSync(outfile, tokens.refresh_token + '\n', { mode: 0o600 });

  console.log('\n=== REFRESH TOKEN ===');
  console.log(tokens.refresh_token);
  console.log('=====================');
  console.log(`\nSaved to ${outfile}`);
  console.log('Next: supabase secrets set GOOGLE_REFRESH_TOKEN=<paste above>');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
