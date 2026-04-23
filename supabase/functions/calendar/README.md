# `calendar` Edge Function

Supabase Edge Function that talks to Google Calendar for the site scheduler.

## Prerequisites

1. **Google Cloud project** with the Calendar API enabled:
   - https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
2. **OAuth 2.0 Client ID** (type: Web application):
   - Authorized redirect URI: `http://localhost:53682/oauth/callback` (for the one-time token grab)
3. **Supabase CLI** logged in and linked to the project.

## Secrets

Set these once per environment:

```bash
supabase secrets set \
  GOOGLE_CLIENT_ID=<client-id> \
  GOOGLE_CLIENT_SECRET=<client-secret> \
  GOOGLE_REFRESH_TOKEN=<refresh-token-from-helper> \
  GOOGLE_CALENDAR_ID=primary
```

Get the refresh token:

```bash
node scripts/get-google-refresh-token.mjs
# copy the printed refresh_token, then:
supabase secrets set GOOGLE_REFRESH_TOKEN=<paste>
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are auto-injected into the Edge runtime.

## Database

Run the migration before first deploy:

```bash
supabase db push
```

It creates `website_leads` (insert-only RLS for anon) and `rate_limits` (service-role only).

## Local dev

Put the secrets into `supabase/functions/.env` (gitignored) for local `serve`:

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_CALENDAR_ID=primary
SUPABASE_URL=https://<proj>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
```

Then:

```bash
supabase functions serve calendar --no-verify-jwt --env-file supabase/functions/.env
```

## Deploy

```bash
supabase functions deploy calendar --no-verify-jwt
```

`--no-verify-jwt` is required — this function is called from an anonymous public site.

## Wire up the frontend

After deploy, set a GitHub Actions secret:

```
VITE_SCHEDULER_API_URL=https://<proj>.supabase.co/functions/v1/calendar
```

## Test

```bash
# slots for this week
curl "https://<proj>.supabase.co/functions/v1/calendar/slots?from=2026-04-20T00:00:00Z&to=2026-04-25T00:00:00Z"

# book a slot (example)
curl -X POST https://<proj>.supabase.co/functions/v1/calendar/book \
  -H "Content-Type: application/json" \
  -d '{
    "slot": "2026-04-21T15:00:00.000Z",
    "name": "Test Lead",
    "email": "test@example.com",
    "notes": "Scoping the retainer",
    "website": "",
    "loaded_at": 0
  }'
```

Note: `loaded_at: 0` will trigger the min-time-to-submit trap and return a dummy success.
Use a fresh timestamp from the current request (e.g. `$(($(date +%s%3N) - 5000))`) to exercise the real booking path.

## Config knobs

Availability is edited at the top of `index.ts`:

```ts
const CONFIG = {
  timezone: 'America/Chicago',
  businessHours: { startHour: 9, endHour: 17 },
  businessDays: [1, 2, 3, 4, 5],
  slotMinutes: 30,
  bufferMinutes: 15,
  minNoticeHours: 24,
};
```

Redeploy after edits. A future session can move these into a `scheduling_config` table for dashboard-editable availability.
