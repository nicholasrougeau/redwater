import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Mail,
  MapPin,
  Users,
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { Scheduler } from '../components/Scheduler';

const PROOF_CARDS: { value: string; label: string }[] = [
  { value: '+$128k', label: 'Cash collected in 4 months — Louisiana landscaper, zero online presence to nationwide recognition' },
  { value: '2.4 → 4.2★', label: 'Google reviews lifted in 3 weeks — automated review-collection workflow' },
  { value: '50 hrs/wk', label: 'Content production time cut for a 600-member professional org' },
];

const AUDIT_BULLETS = [
  'We find the 1-2 workflows where AI has the highest return for your specific business.',
  'You see the actual tools and get a clear picture of what a build looks like.',
  'You walk away with a real answer — worth it or not. No pitch, no pressure.',
];

export const Lafayette = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO
        title="For Lafayette — Redwater Revenue"
        description="A free in-person AI audit for Lafayette business owners and operators."
        path="/lafayette"
        noindex
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-center"
        >
          <div className="relative mx-auto h-40 w-40 lg:h-48 lg:w-48">
            <img
              src="/jack.png"
              alt="Jack Rougeau"
              className="relative h-full w-full object-contain"
            />
          </div>

          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              <MapPin className="h-3.5 w-3.5" />
              For Lafayette
            </span>
            <h1 className="mb-5 text-4xl font-bold leading-[1.1] text-zinc-900 md:text-5xl lg:text-6xl">
              Glad we met. <span className="text-gradient">Here's everything to get started.</span>
            </h1>
            <p className="text-lg text-zinc-500 md:text-xl">
              I'm Jack. I run Redwater Revenue out of South Louisiana — we build AI systems for local
              businesses and professionals. This page has a quick overview of what we do and a way
              to grab time on my calendar.
            </p>
          </div>
        </motion.div>

        {/* Outcome cards */}
        <section className="mb-20">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            What we've built for businesses like yours
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {PROOF_CARDS.map((p) => (
              <div key={p.label} className="rounded-3xl border border-zinc-100 bg-white p-6">
                <div className="mb-3 text-3xl font-bold text-gradient md:text-4xl">{p.value}</div>
                <div className="text-sm leading-snug text-zinc-500">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link to="/case-studies" className="group inline-flex items-center gap-2 text-sm font-bold text-brand-red">
              See full case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        {/* Audit booking */}
        <section id="book" className="mb-20 scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Free · 1-2 hrs · In Person
              </span>
              <h2 className="mb-5 text-3xl font-bold text-zinc-900 md:text-4xl">
                Book a free AI audit.
              </h2>
              <p className="mb-8 text-zinc-500 leading-relaxed">
                Pick a spot — your office, a coffee shop, wherever's easy. I come to you. We walk
                through what your business does, I ask a few questions, and I find the one or two
                places where AI would actually move the needle. Then I show you the tools and
                exactly how we'd build it. No prep needed on your end.
              </p>
              <ul className="space-y-3">
                {AUDIT_BULLETS.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" />
                    <span className="text-zinc-700">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-zinc-100 bg-white p-4 shadow-xl shadow-zinc-100">
              <div className="mb-4 flex items-center gap-3 px-4 pt-4 text-brand-red">
                <CalendarIcon className="h-6 w-6" />
                <h3 className="text-xl font-bold">Pick a time</h3>
              </div>
              <div className="px-2 pb-2">
                <Scheduler
                  kind="audit-inperson"
                  source="lafayette-audit"
                  ctaLabel="Book my free audit"
                  extraFields={[
                    {
                      id: 'location',
                      label: 'Where do you want to meet?',
                      type: 'select',
                      options: ['My office', 'Coffee shop', 'Lunch', 'Virtual'],
                      required: true,
                    },
                    {
                      id: 'address',
                      label: 'Address or specific spot',
                      placeholder: "e.g. 123 Main St, or \"Jolie's on Jefferson\"",
                      required: true,
                    },
                    {
                      id: 'business',
                      label: 'What does your business do?',
                      placeholder: 'e.g. landscaping, legal services, coaching',
                      required: true,
                    },
                    {
                      id: 'challenges',
                      label: "What's your biggest challenge right now?",
                      placeholder: 'Anything goes — operations, team, revenue, time...',
                      type: 'textarea',
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Direct contact */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900">Other ways to reach me</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:jack@redwaterrev.com"
              className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-zinc-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-brand-red">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Email</h3>
                <p className="text-zinc-500">jack@redwaterrev.com</p>
              </div>
            </a>
            <Link
              to="/contact"
              className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-zinc-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-brand-orange">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Send a longer message</h3>
                <p className="text-zinc-500">Use the contact form for anything that won't fit in 15 min.</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Referral ask */}
        <section className="rounded-3xl bg-zinc-900 p-8 text-white md:p-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            One ask
          </p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Know a group that would benefit from hearing this?
          </h2>
          <p className="max-w-2xl text-zinc-400">
            If you run an organization, chapter, or team in Lafayette that could use a free
            in-person AI session, an email goes a long way.
          </p>
          <a
            href="mailto:jack@redwaterrev.com?subject=Intro%20%E2%80%94%20AI%20talk%20for%20our%20group"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-orange px-6 py-3 text-base font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Make an intro
            <ArrowRight className="h-5 w-5" />
          </a>
        </section>
      </div>
    </div>
  );
};
