import { useState, type FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { SEO } from '../lib/seo';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const MIN_SUBMIT_MS = 2000;

const ROLE_OPTIONS = ['Owner / Broker', 'Agent', 'Operations / Admin', 'Other'];
const AGENT_COUNT_OPTIONS = ['Solo agent', '2-5', '6-15', '16-30', '30+'];

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  brokerage: string;
  role: string;
  agentCount: string;
  consent: boolean;
};

const EMPTY: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  brokerage: '',
  role: '',
  agentCount: '',
  consent: false,
};

export const RealEstate = () => {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [honeypot, setHoneypot] = useState('');
  const [loadedAt] = useState(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const tooFast = Date.now() - loadedAt < MIN_SUBMIT_MS;
    if (honeypot.trim() !== '' || tooFast) {
      setStatus('success');
      setForm(EMPTY);
      return;
    }

    const notes = [
      `Phone: ${form.phone}`,
      `Role: ${form.role}`,
      `Agents: ${form.agentCount}`,
      `Consent to contact: Yes`,
    ].join('\n');

    const sheetsUrl = (import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined)
      ?? 'https://script.google.com/macros/s/AKfycby-EukGa3WrjeASiBwy7CzSwZFqHW4lqk6y7gsBz5kzGTM6cXqSo4Hu6WdaKWjJmovCJw/exec';

    const [supabaseResult] = await Promise.all([
      supabase.from('website_leads').insert({
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        company: form.brokerage,
        industry: 'Real Estate',
        notes,
        source: 'rat-pack-form',
      }),
      sheetsUrl
        ? fetch(`${sheetsUrl}?${new URLSearchParams({
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
            email: form.email,
            brokerage: form.brokerage,
            role: form.role,
            agentCount: form.agentCount,
            source: 'rat-pack-form',
          }).toString()}`, {
            method: 'GET',
            mode: 'no-cors',
          }).catch(() => null)
        : Promise.resolve(null),
    ]);

    if (supabaseResult.error && isSupabaseConfigured) {
      setErrorMsg('Something went wrong. Try emailing us directly at jack@redwaterrev.com.');
      setStatus('error');
      return;
    }

    setStatus('success');
    setForm(EMPTY);
  };

  return (
    <div className="pt-32 pb-24">
      <SEO
        title="CEO Rat Pack — Redwater Revenue"
        description="Interested in working with Redwater? Drop your info and our team will reach out to set something up."
        path="/real-estate"
        noindex
      />

      <div className="mx-auto max-w-2xl px-6">

        {status === 'success' ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10">
              <CheckCircle2 className="h-8 w-8 text-brand-red" />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-zinc-900">You're on the list.</h2>
            <p className="text-zinc-500">
              Someone from the team will reach out within 24 hours to get something scheduled.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-10">
              <span className="mb-5 inline-block rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                For CEO Rat Pack
              </span>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-zinc-900 md:text-5xl">
                Drop your info.<br />
                <span className="text-gradient">We'll take it from there.</span>
              </h1>
              <p className="text-lg text-zinc-500">
                Leave your contact info below and the Redwater team will reach out within 24 hours
                to get an audit scheduled. Audits are <span className="font-semibold text-zinc-700">$250</span> and run 1-2 hours in person.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">First name</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={set('firstName')}
                    placeholder="Jack"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Last name</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={set('lastName')}
                    placeholder="Rougeau"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  />
                </div>
              </div>

              {/* Phone + Email */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Phone number</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="(337) 555-0100"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@brokerage.com"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  />
                </div>
              </div>

              {/* Brokerage */}
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Brokerage name</label>
                <input
                  type="text"
                  required
                  value={form.brokerage}
                  onChange={set('brokerage')}
                  placeholder="e.g. RE/MAX of Acadiana"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                />
              </div>

              {/* Role + Agent count */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Your role</label>
                  <select
                    required
                    value={form.role}
                    onChange={set('role')}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  >
                    <option value="" disabled>Select one</option>
                    {ROLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-zinc-700">Agents on your team</label>
                  <select
                    required
                    value={form.agentCount}
                    onChange={set('agentCount')}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-brand-red focus:ring-2 focus:ring-brand-red/10"
                  >
                    <option value="" disabled>Select one</option>
                    {AGENT_COUNT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              {/* Consent */}
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={set('consent')}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red"
                />
                <span className="text-sm text-zinc-600 leading-snug">
                  I agree to receive calls, texts, and emails from the Redwater Revenue team
                  regarding AI services. Message frequency varies. Reply STOP to opt out at any time.
                </span>
              </label>

              {errorMsg && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-brand-red px-6 py-4 text-base font-bold text-white transition-all hover:bg-brand-orange disabled:opacity-60"
              >
                {status === 'loading' ? 'Submitting...' : "I'm interested, reach out to me"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
