// Shared helpers for calling Google APIs from Supabase Edge Functions (Deno).
// Keep dependencies minimal — only fetch + Deno std URL helpers.

interface CachedToken {
  accessToken: string;
  expiresAt: number; // epoch millis
}

// Module-scope cache — survives within a single isolate instance.
// TTL is 55 min (Google tokens live 1h). On cold start we just refresh.
let cached: CachedToken | null = null;

export interface EventPayload {
  summary: string;
  description: string;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  attendees: Array<{ email: string; displayName?: string }>;
  conferenceData?: {
    createRequest: { requestId: string };
  };
}

export interface CreatedEvent {
  id: string;
  hangoutLink?: string;
  conferenceData?: {
    entryPoints?: Array<{ entryPointType: string; uri: string }>;
  };
  htmlLink?: string;
}

export interface BusyWindow {
  start: string;
  end: string;
}

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const CALENDAR_BASE = 'https://www.googleapis.com/calendar/v3';

export async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cached && cached.expiresAt > now + 60_000) {
    return cached.accessToken;
  }
  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
  const refreshToken = Deno.env.get('GOOGLE_REFRESH_TOKEN');
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET / GOOGLE_REFRESH_TOKEN');
  }
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google token refresh failed: ${res.status} ${body}`);
  }
  const json = (await res.json()) as { access_token: string; expires_in: number };
  cached = {
    accessToken: json.access_token,
    expiresAt: now + Math.min(json.expires_in, 3300) * 1000, // cap at 55 min
  };
  return cached.accessToken;
}

export async function freeBusy(
  accessToken: string,
  calendarId: string,
  timeMin: string,
  timeMax: string,
): Promise<BusyWindow[]> {
  const res = await fetch(`${CALENDAR_BASE}/freeBusy`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timeMin,
      timeMax,
      items: [{ id: calendarId }],
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`freeBusy failed: ${res.status} ${body}`);
  }
  const json = (await res.json()) as { calendars: Record<string, { busy: BusyWindow[] }> };
  const entry = json.calendars?.[calendarId];
  return entry?.busy ?? [];
}

export async function createEvent(
  accessToken: string,
  calendarId: string,
  event: EventPayload,
): Promise<CreatedEvent> {
  const url = new URL(
    `${CALENDAR_BASE}/calendars/${encodeURIComponent(calendarId)}/events`,
  );
  url.searchParams.set('conferenceDataVersion', '1');
  url.searchParams.set('sendUpdates', 'all');
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`events.insert failed: ${res.status} ${body}`);
  }
  return (await res.json()) as CreatedEvent;
}

export function meetLinkFromEvent(event: CreatedEvent): string | null {
  if (event.hangoutLink) return event.hangoutLink;
  const entry = event.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video');
  return entry?.uri ?? null;
}
