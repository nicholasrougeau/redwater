import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, CalendarCheck, Loader2 } from 'lucide-react';

interface SchedulerProps {
  accent?: 'red' | 'orange';
}

interface BookingConfirmation {
  meetLink: string | null;
  startsAt: string;
}

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const DAY_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function startOfDay(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}
function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}
// Monday-based week start
function startOfWeekMonday(d: Date): Date {
  const out = startOfDay(d);
  const day = out.getDay(); // 0=Sun..6=Sat
  const diff = day === 0 ? -6 : 1 - day;
  out.setDate(out.getDate() + diff);
  return out;
}
function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function fmtTime(d: Date): string {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}
function fmtMonthDay(d: Date): string {
  return `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;
}
function fmtFullDate(d: Date): string {
  return `${DAY_FULL[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()} at ${fmtTime(d)}`;
}
function fmtShortDate(d: Date): string {
  return `${DAY_SHORT[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()} at ${fmtTime(d)}`;
}

const accentMap = {
  red: {
    pill: 'border-brand-red/20 bg-brand-red/5 text-brand-red',
    button: 'bg-brand-red hover:bg-zinc-900',
    subtle: 'text-brand-red',
  },
  orange: {
    pill: 'border-brand-orange/20 bg-brand-orange/5 text-brand-orange',
    button: 'bg-brand-orange hover:bg-brand-red',
    subtle: 'text-brand-orange',
  },
} as const;

export const Scheduler = ({ accent = 'red' }: SchedulerProps) => {
  const apiUrl = import.meta.env.VITE_SCHEDULER_API_URL as string | undefined;
  const tz = useMemo(() => Intl.DateTimeFormat().resolvedOptions().timeZone, []);
  const accentStyles = accentMap[accent];

  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', notes: '' });
  const [honeypot, setHoneypot] = useState('');
  const [booking, setBooking] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [loadedAt] = useState(() => Date.now());

  const today = useMemo(() => startOfDay(new Date()), []);
  const weekStart = useMemo(() => {
    return addDays(startOfWeekMonday(today), weekOffset * 7);
  }, [today, weekOffset]);
  const weekEnd = useMemo(() => addDays(weekStart, 7), [weekStart]);
  const days = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)), // Mon-Fri
    [weekStart],
  );

  useEffect(() => {
    if (!apiUrl) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    const fetchSlots = async () => {
      setLoadingSlots(true);
      setErrorMsg('');
      try {
        const from = weekStart.toISOString();
        const to = weekEnd.toISOString();
        const res = await fetch(
          `${apiUrl}/slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`,
          { method: 'GET' },
        );
        if (!res.ok) throw new Error(`Failed to load slots (${res.status})`);
        const body = (await res.json()) as { slots?: string[] };
        if (cancelled) return;
        setSlots(Array.isArray(body.slots) ? body.slots : []);
      } catch {
        if (cancelled) return;
        setSlots([]);
        setErrorMsg("Couldn't load availability. Refresh or email nick@redwaterrev.com.");
      } finally {
        if (!cancelled) setLoadingSlots(false);
      }
    };
    fetchSlots();
    return () => {
      cancelled = true;
    };
  }, [apiUrl, weekStart, weekEnd]);

  const slotsByDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const iso of slots) {
      const d = new Date(iso);
      const key = ymd(d);
      const list = map.get(key) ?? [];
      list.push(iso);
      map.set(key, list);
    }
    return map;
  }, [slots]);

  const slotsForSelected = useMemo(() => {
    if (!selectedDate) return [];
    return slotsByDay.get(ymd(selectedDate)) ?? [];
  }, [selectedDate, slotsByDay]);

  const handleBook = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !apiUrl) return;
    setBooking(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${apiUrl}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slot: selectedSlot,
          name: form.name,
          email: form.email,
          notes: form.notes,
          website: honeypot,
          loaded_at: loadedAt,
        }),
      });
      if (res.status === 429) {
        setErrorMsg('Too many attempts, try later.');
        return;
      }
      if (!res.ok) {
        setErrorMsg('Something went wrong. Try again or email nick@redwaterrev.com.');
        return;
      }
      const body = (await res.json()) as { meet_link?: string | null; starts_at?: string };
      setConfirmation({
        meetLink: body.meet_link ?? null,
        startsAt: body.starts_at ?? selectedSlot,
      });
    } catch {
      setErrorMsg('Something went wrong. Try again or email nick@redwaterrev.com.');
    } finally {
      setBooking(false);
    }
  };

  if (!apiUrl) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 p-8 text-center text-zinc-500">
        <CalendarCheck className="mx-auto mb-3 h-8 w-8 text-zinc-400" />
        <p className="font-medium">Scheduler coming online shortly.</p>
        <p className="mt-2 text-sm">
          Email{' '}
          <a href="mailto:nick@redwaterrev.com" className={`font-bold ${accentStyles.subtle}`}>
            nick@redwaterrev.com
          </a>{' '}
          to book directly.
        </p>
      </div>
    );
  }

  if (confirmation) {
    return (
      <div className="rounded-2xl border border-zinc-100 bg-white p-8 text-center">
        <CalendarCheck className={`mx-auto mb-4 h-10 w-10 ${accentStyles.subtle}`} />
        <h3 className="mb-2 text-2xl font-bold text-zinc-900">You're booked.</h3>
        <p className="mb-6 text-zinc-500">
          {fmtFullDate(new Date(confirmation.startsAt))} ({tz}). A calendar invite is on its way.
        </p>
        {confirmation.meetLink && (
          <a
            href={confirmation.meetLink}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-all hover:scale-105 ${accentStyles.button}`}
          >
            Open Google Meet link
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900">Pick a time</h3>
          <p className="text-xs text-zinc-400">
            Times shown in {tz}. All calls are 30 min on Google Meet.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous week"
            disabled={weekOffset === 0}
            onClick={() => {
              setWeekOffset((w) => Math.max(0, w - 1));
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            className="rounded-full border border-zinc-200 p-2 text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-medium text-zinc-700">
            {fmtMonthDay(weekStart)} – {fmtMonthDay(addDays(weekEnd, -1))}
          </span>
          <button
            type="button"
            aria-label="Next week"
            onClick={() => {
              setWeekOffset((w) => w + 1);
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            className="rounded-full border border-zinc-200 p-2 text-zinc-500 transition-all hover:border-zinc-300 hover:text-zinc-900"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day columns */}
      <div className="mb-6 grid grid-cols-5 gap-2">
        {days.map((day) => {
          const key = ymd(day);
          const count = slotsByDay.get(key)?.length ?? 0;
          const isActive = selectedDate ? sameDay(day, selectedDate) : false;
          const isPast = day < today;
          const hasSlots = count > 0;
          return (
            <button
              key={key}
              type="button"
              disabled={isPast || !hasSlots}
              onClick={() => {
                setSelectedDate(day);
                setSelectedSlot(null);
              }}
              className={`flex flex-col items-center rounded-xl border p-3 transition-all ${
                isActive
                  ? 'border-zinc-900 bg-zinc-900 text-white'
                  : hasSlots && !isPast
                    ? 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400'
                    : 'border-zinc-100 bg-zinc-50 text-zinc-300'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {DAY_SHORT[day.getDay()]}
              </span>
              <span className="mt-1 text-xl font-bold">{day.getDate()}</span>
              <span
                className={`mt-1 text-[10px] ${isActive ? 'text-zinc-300' : hasSlots ? 'text-zinc-500' : 'text-zinc-300'}`}
              >
                {isPast ? '—' : hasSlots ? `${count} open` : 'full'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slots for selected day */}
      {loadingSlots && (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-zinc-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading availability…
        </div>
      )}

      {!loadingSlots && selectedDate && slotsForSelected.length === 0 && (
        <p className="py-6 text-center text-sm text-zinc-400">No times left on this day.</p>
      )}

      {!loadingSlots && selectedDate && slotsForSelected.length > 0 && !selectedSlot && (
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4">
          {slotsForSelected.map((iso) => (
            <button
              key={iso}
              type="button"
              onClick={() => setSelectedSlot(iso)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm font-medium text-zinc-800 transition-all hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
            >
              {fmtTime(new Date(iso))}
            </button>
          ))}
        </div>
      )}

      {!loadingSlots && !selectedDate && slots.length > 0 && (
        <p className="py-6 text-center text-sm text-zinc-400">Pick a day to see open times.</p>
      )}

      {!loadingSlots && !selectedDate && slots.length === 0 && !errorMsg && (
        <p className="py-6 text-center text-sm text-zinc-400">
          No availability this week. Try next week.
        </p>
      )}

      {errorMsg && !selectedSlot && (
        <p className="py-4 text-center text-sm text-red-500">{errorMsg}</p>
      )}

      {/* Booking form */}
      {selectedSlot && (
        <form onSubmit={handleBook} className="mt-6 space-y-4 border-t border-zinc-100 pt-6">
          <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm">
            <span className="font-medium text-zinc-700">
              {fmtShortDate(new Date(selectedSlot))} ({tz})
            </span>
            <button
              type="button"
              onClick={() => setSelectedSlot(null)}
              className="text-xs font-bold text-zinc-500 hover:text-brand-red"
            >
              Change
            </button>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">Name</label>
            <input
              type="text"
              required
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-zinc-700">
              What do you want to scope? (optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          {/* Honeypot — hidden from users, visible to bots */}
          <div
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
          >
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={booking}
            className={`w-full rounded-xl py-4 font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 ${accentStyles.button}`}
          >
            {booking ? 'Booking…' : 'Confirm booking'}
          </button>
          {errorMsg && <p className="text-center text-sm text-red-500">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
};
