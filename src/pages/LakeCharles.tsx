import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Mail,
  MapPin,
  PlayCircle,
  Users,
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { Scheduler } from '../components/Scheduler';

const PROOF_CARDS: { value: string; label: string }[] = [
  { value: '+$128k', label: 'Cash collected in 4 months — Louisiana landscaper, zero online presence to nationwide recognition' },
  { value: '2.4 → 4.2★', label: 'Google reviews lifted in 3 weeks — automated review-collection workflow' },
  { value: '50 hrs/wk', label: 'Content production time cut for a 600-member professional org' },
];

const INTRO_BULLETS = [
  'A quick read on whether AI is actually a fit for your business right now.',
  'If it is — the 1-2 highest-leverage workflows we\'d look at first.',
  'If it isn\'t — what to focus on instead. No pitch.',
];

export const LakeCharles = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO
        title="For Lake Charles — Redwater Revenue"
        description="A short intro and free 15-min call for Lake Charles business owners and operators."
        path="/lake-charles"
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
          {/* Initials placeholder — swap for a real photo when ready */}
          <div className="relative mx-auto h-32 w-32 lg:h-40 lg:w-40">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red via-brand-orange to-brand-gold opacity-90 blur-md" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full bg-zinc-900 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              NR
            </div>
          </div>

          <div>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              <MapPin className="h-3.5 w-3.5" />
              For Lake Charles
            </span>
            <h1 className="mb-5 text-4xl font-bold leading-[1.1] text-zinc-900 md:text-5xl lg:text-6xl">
              Glad we met. <span className="text-gradient">Here's everything to get started.</span>
            </h1>
            <p className="text-lg text-zinc-500 md:text-xl">
              I'm Nick. I run Redwater Revenue out of South Louisiana — we build AI systems for local
              businesses and professionals. This page has the short version of what I do, a few
              videos to learn the basics, and a way to grab time on my calendar.
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

        {/* Intro call */}
        <section id="book" className="mb-20 scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Free · 15 min · Google Meet
              </span>
              <h2 className="mb-5 text-3xl font-bold text-zinc-900 md:text-4xl">
                Grab 15 minutes on my calendar.
              </h2>
              <p className="mb-8 text-zinc-500 leading-relaxed">
                A quick conversation so I can understand what your business does and whether what I
                build is actually a fit. If it is, we'll set up a longer working session — usually
                in person if you're local. If it isn't, you'll know what to do instead.
              </p>
              <ul className="space-y-3">
                {INTRO_BULLETS.map((b) => (
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
                <Scheduler kind="intro-15" source="lake-charles-landing" ctaLabel="Confirm intro call" />
              </div>
            </div>
          </div>
        </section>

        {/* Want to learn first */}
        <section className="mb-20">
          <Link
            to="/learn"
            className="group block overflow-hidden rounded-3xl border border-zinc-100 bg-zinc-900 p-8 text-white transition-all hover:scale-[1.01] md:p-12"
          >
            <div className="grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange">
                <PlayCircle className="h-8 w-8" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Want to learn first?
                </p>
                <h3 className="mt-1 text-2xl font-bold md:text-3xl">
                  Free 15-minute AI crash course.
                </h3>
                <p className="mt-2 max-w-2xl text-zinc-400">
                  Six short videos on what AI actually is, where it pays off in a service business,
                  and how to start without wasting six months on the wrong build. No email gate.
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-zinc-900 transition-transform group-hover:translate-x-1">
                Watch the course
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </section>

        {/* Local proof */}
        <section className="mb-20 rounded-3xl border border-zinc-100 bg-zinc-50/60 p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Currently working with locally
          </p>
          <ul className="mt-4 space-y-2 text-zinc-700">
            <li>· BNI Elites — Lake Charles</li>
          </ul>
          <p className="mt-6 max-w-2xl text-sm text-zinc-500">
            Doing free in-person AI talks for Lake Charles civic groups and chambers as well — if
            you run a group that would benefit, an intro goes a long way.
          </p>
        </section>

        {/* Direct contact */}
        <section className="mb-20">
          <h2 className="mb-8 text-2xl font-bold text-zinc-900">Other ways to reach me</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:nick@redwaterrev.com"
              className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-zinc-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-50 text-brand-red">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900">Email</h3>
                <p className="text-zinc-500">nick@redwaterrev.com</p>
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
            If you run an organization, chapter, or team in Lake Charles that could use a free
            in-person AI session, an email intro goes a long way. I'll send back a one-pager you
            can pass along.
          </p>
          <a
            href="mailto:nick@redwaterrev.com?subject=Intro%20%E2%80%94%20AI%20talk%20for%20our%20group"
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
