// Supabase Edge Function — Google Calendar-backed scheduler.
// Routes:
//   GET  /slots?from=ISO&to=ISO   → list of open 30-min slots
//   POST /book                    → create event + Google Meet link, insert lead row
//
// Deploy: supabase functions deploy calendar --no-verify-jwt
//
// Required secrets (supabase secrets set):
//   GOOGLE_CLIENT_ID
//   GOOGLE_CLIENT_SECRET
//   GOOGLE_REFRESH_TOKEN
//   GOOGLE_CALENDAR_ID       (optional, default: primary)
//   SUPABASE_URL             (auto-set in edge runtime)
//   SUPABASE_SERVICE_ROLE_KEY (auto-set in edge runtime)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import {
  getAccessToken,
  freeBusy,
  createEvent,
  meetLinkFromEvent,
  type BusyWindow,
} from '../_shared/google.ts';
import { checkAndIncrement } from '../_shared/rate-limit.ts';

// Availability config — edit these constants to change scheduling behavior.
const CONFIG = {
  timezone: 'America/Chicago',
  businessHours: { startHour: 9, endHour: 17 },
  businessDays: [1, 2, 3, 4, 5], // Mon–Fri (Sunday=0 in UTC day-of-week; see note in getCtDayOfWeek)
  slotMinutes: 30,
  bufferMinutes: 15,
  minNoticeHours: 24,
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}

// Map a UTC moment to a {y,m,d,h,min,dow} tuple in America/Chicago.
// We use Intl.DateTimeFormat to avoid a full timezone library in Deno.
function toCtParts(date: Date): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dow: number; // 0=Sun, 1=Mon, ... 6=Sat
} {
  const fmt = new Intl.DateTimeFormat('en-US', {
    timeZone: CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  });
  const parts = fmt.formatToParts(date);
  const lookup: Record<string, string> = {};
  for (const p of parts) lookup[p.type] = p.value;
  const dowMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    year: parseInt(lookup.year, 10),
    month: parseInt(lookup.month, 10),
    day: parseInt(lookup.day, 10),
    hour: parseInt(lookup.hour === '24' ? '0' : lookup.hour, 10),
    minute: parseInt(lookup.minute, 10),
    dow: dowMap[lookup.weekday] ?? 0,
  };
}

function overlapsBusy(
  slotStart: Date,
  slotEnd: Date,
  buffer: number,
  busy: BusyWindow[],
): boolean {
  const startMs = slotStart.getTime() - buffer * 60_000;
  const endMs = slotEnd.getTime() + buffer * 60_000;
  return busy.some((b) => {
    const bs = new Date(b.start).getTime();
    const be = new Date(b.end).getTime();
    return bs < endMs && be > startMs;
  });
}

function generateCandidateSlots(fromISO: string, toISO: string): Date[] {
  const now = Date.now();
  const minStart = now + CONFIG.minNoticeHours * 3600_000;
  const from = new Date(fromISO);
  const to = new Date(toISO);
  const slots: Date[] = [];
  // Step minute-by-30 in UTC; convert each candidate to CT to check business hours/days.
  const stepMs = CONFIG.slotMinutes * 60_000;
  let cursor = new Date(Math.ceil(from.getTime() / stepMs) * stepMs);
  while (cursor.getTime() < to.getTime()) {
    if (cursor.getTime() >= minStart) {
      const ct = toCtParts(cursor);
      if (CONFIG.businessDays.includes(ct.dow)) {
        const endHour = ct.hour + (ct.minute + CONFIG.slotMinutes) / 60;
        if (
          ct.hour >= CONFIG.businessHours.startHour &&
          endHour <= CONFIG.businessHours.endHour
        ) {
          slots.push(new Date(cursor));
        }
      }
    }
    cursor = new Date(cursor.getTime() + stepMs);
  }
  return slots;
}

async function handleSlots(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  if (!from || !to) return jsonResponse({ error: 'Missing from/to' }, 400);
  const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID') ?? 'primary';
  const accessToken = await getAccessToken();
  const busy = await freeBusy(accessToken, calendarId, from, to);
  const candidates = generateCandidateSlots(from, to);
  const open = candidates.filter((slot) => {
    const end = new Date(slot.getTime() + CONFIG.slotMinutes * 60_000);
    return !overlapsBusy(slot, end, CONFIG.bufferMinutes, busy);
  });
  return jsonResponse({ slots: open.map((d) => d.toISOString()) });
}

interface BookingBody {
  slot?: string;
  name?: string;
  email?: string;
  industry?: string;
  notes?: string;
  website?: string;
  loaded_at?: number;
}

function dummyBookingResponse(body: BookingBody): Response {
  // For bots that trip honeypot / min-time: return a plausible success so they
  // can't distinguish rejection from success.
  const starts = body.slot ?? new Date(Date.now() + 48 * 3600_000).toISOString();
  return jsonResponse({
    event_id: 'queued',
    meet_link: null,
    starts_at: starts,
  });
}

function getIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const real = req.headers.get('x-real-ip');
  if (real) return real.trim();
  return 'unknown';
}

function uuid(): string {
  return crypto.randomUUID();
}

async function handleBook(req: Request): Promise<Response> {
  let body: BookingBody;
  try {
    body = (await req.json()) as BookingBody;
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }
  const { slot, name, email, industry, notes, website, loaded_at } = body;

  // Silent bot trap — dummy success, don't hint at rejection
  const tooFast = typeof loaded_at === 'number' && Date.now() - loaded_at < 2000;
  if ((website && website.trim() !== '') || tooFast) {
    return dummyBookingResponse(body);
  }

  if (!slot || !name || !email) {
    return jsonResponse({ error: 'Missing required fields' }, 400);
  }

  const slotStart = new Date(slot);
  if (isNaN(slotStart.getTime())) return jsonResponse({ error: 'Invalid slot' }, 400);
  const slotEnd = new Date(slotStart.getTime() + CONFIG.slotMinutes * 60_000);

  // Supabase admin client
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRole = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceRole) {
    return jsonResponse({ error: 'Supabase not configured' }, 500);
  }
  const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
    auth: { persistSession: false },
  });

  // Rate limit
  const ip = getIp(req);
  const allowed = await checkAndIncrement(supabaseAdmin, ip, 'book');
  if (!allowed) {
    return jsonResponse({ error: 'Too many attempts' }, 429);
  }

  const calendarId = Deno.env.get('GOOGLE_CALENDAR_ID') ?? 'primary';
  const accessToken = await getAccessToken();

  // Re-check availability
  const busy = await freeBusy(accessToken, calendarId, slotStart.toISOString(), slotEnd.toISOString());
  if (overlapsBusy(slotStart, slotEnd, CONFIG.bufferMinutes, busy)) {
    return jsonResponse({ error: 'Slot no longer available' }, 409);
  }

  // Create event
  const created = await createEvent(accessToken, calendarId, {
    summary: `Strategy Call — ${name}`,
    description: `${notes ?? ''}\n\n(booked from redwaterrev.com)`.trim(),
    start: { dateTime: slotStart.toISOString(), timeZone: CONFIG.timezone },
    end: { dateTime: slotEnd.toISOString(), timeZone: CONFIG.timezone },
    attendees: [{ email, displayName: name }],
    conferenceData: { createRequest: { requestId: uuid() } },
  });

  // Insert lead row (non-blocking for the booking result — log but don't fail)
  try {
    await supabaseAdmin.from('website_leads').insert({
      name,
      email,
      industry: industry ?? null,
      notes: notes ?? null,
      source: 'scheduler',
    });
  } catch (err) {
    // Intentionally swallow — event was created successfully.
    // Dashboard inbox widget will just miss this row.
    void err;
  }

  return jsonResponse({
    event_id: created.id,
    meet_link: meetLinkFromEvent(created),
    starts_at: slotStart.toISOString(),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  const pathname = new URL(req.url).pathname;
  try {
    if (req.method === 'GET' && pathname.endsWith('/slots')) return await handleSlots(req);
    if (req.method === 'POST' && pathname.endsWith('/book')) return await handleBook(req);
    return jsonResponse({ error: 'Not found' }, 404);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return jsonResponse({ error: message }, 500);
  }
});
