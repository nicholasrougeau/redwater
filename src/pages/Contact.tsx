import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Calendar as CalendarIcon } from 'lucide-react';
import { SEO } from '../lib/seo';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Scheduler } from '../components/Scheduler';

const MIN_SUBMIT_MS = 2000;

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', industry: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [honeypot, setHoneypot] = useState('');
  const [loadedAt] = useState(() => Date.now());

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    // Silent bot trap — pretend success, don't tip them off
    const tooFast = Date.now() - loadedAt < MIN_SUBMIT_MS;
    if (honeypot.trim() !== '' || tooFast) {
      setStatus('success');
      setFormData({ name: '', email: '', company: '', industry: '', message: '' });
      return;
    }

    const { error } = await supabase.from('website_leads').insert({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      industry: formData.industry,
      notes: formData.message,
      source: 'contact-form',
    });
    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
      return;
    }
    setStatus('success');
    setFormData({ name: '', email: '', company: '', industry: '', message: '' });
  };

  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Contact — Redwater Revenue"
        description="Book a strategy call or send a message. We build AI operating systems for coaches, lawyers, consultants, and agencies."
        path="/contact"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">
            Let's build your AI operating system.
          </h1>
          <p className="text-xl text-zinc-500">
            Book a call to scope the work, or send a message and we'll reply same-day.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-12 rounded-3xl border border-zinc-100 bg-white p-4 shadow-xl shadow-zinc-100">
              <div className="mb-4 flex items-center gap-3 px-4 pt-4 text-brand-red">
                <CalendarIcon className="h-6 w-6" />
                <h2 className="text-xl font-bold">Book a strategy call</h2>
              </div>
              <div className="px-2 pb-2">
                <Scheduler />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-brand-red">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Email</h3>
                  <p className="text-zinc-500">nick@redwaterrev.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-brand-orange">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900">Location</h3>
                  <p className="text-zinc-500">South Louisiana, USA — serving clients nationwide.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-100 bg-white p-8 shadow-2xl shadow-zinc-100 lg:p-12">
            <h2 className="mb-2 text-2xl font-bold text-zinc-900">Prefer to send a message?</h2>
            <p className="mb-8 text-zinc-500">Tell us what you're working on. We'll reply same-day.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Company</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Industry</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
                  placeholder="e.g. law firm, coaching, landscaping, SaaS"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-zinc-700">Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 focus:border-brand-orange focus:outline-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              {/* Honeypot — hidden from users */}
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
                disabled={status === 'loading'}
                className="w-full rounded-xl bg-brand-red py-4 font-bold text-white transition-all hover:scale-[1.02] hover:bg-zinc-900 disabled:opacity-50"
              >
                {status === 'loading'
                  ? 'Sending...'
                  : status === 'success'
                    ? 'Message sent.'
                    : 'Send message'}
              </button>

              {!isSupabaseConfigured && (
                <p className="text-center text-xs text-zinc-400">
                  Form backend not configured yet. Set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY
                  to enable submissions.
                </p>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-red-500">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
