import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight } from 'lucide-react';

export const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formId = import.meta.env.VITE_CONVERTKIT_FORM_ID;
    if (!formId) {
      console.warn('[newsletter] VITE_CONVERTKIT_FORM_ID not set — TODO: configure ConvertKit form');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`https://app.convertkit.com/forms/${formId}/subscriptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email_address: email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl rounded-3xl border border-zinc-100 bg-zinc-50/50 p-8 md:p-16">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-brand-red">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-4xl font-bold text-zinc-900">The Revenue Report</h2>
            <p className="text-xl text-zinc-500 leading-relaxed">
              How we're using AI to grow businesses. No fluff, just working systems.
            </p>
          </div>

          <div className="relative">
            <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-2xl border border-zinc-200 bg-white px-6 py-4 text-lg focus:border-brand-orange focus:outline-none focus:ring-4 focus:ring-brand-orange/5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-8 py-4 text-lg font-bold text-white transition-all hover:bg-brand-red disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : status === 'success' ? 'Subscribed!' : 'Join the List'}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-sm font-medium text-green-600"
              >
                You're in. Check your inbox.
              </motion.p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm font-medium text-red-600">Something went wrong. Please try again.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
