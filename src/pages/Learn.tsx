import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar as CalendarIcon, CheckCircle2, Clock, PlayCircle } from 'lucide-react';
import { SEO } from '../lib/seo';
import { VideoEmbed } from '../components/VideoEmbed';
import { Scheduler } from '../components/Scheduler';

interface LessonDef {
  slug: string;
  title: string;
  blurb: string;
  duration: string;
  videoUrl: string | null;
}

// Update each `videoUrl` to a YouTube or Loom share link as videos are recorded.
// Component sniffs the host — both work.
const LESSONS: LessonDef[] = [
  {
    slug: 'what-ai-actually-is',
    title: 'What AI actually is (without the hype)',
    blurb:
      'Plain-English breakdown — what these tools do well, what they do poorly, and the one mental model that makes everything else easier.',
    duration: '~3 min',
    videoUrl: null,
  },
  {
    slug: 'where-it-pays-off',
    title: 'Where it pays off in a service business',
    blurb:
      'The three highest-leverage places AI moves the needle for landscapers, law firms, dentists, contractors, and coaches — with real numbers.',
    duration: '~3 min',
    videoUrl: null,
  },
  {
    slug: 'what-it-cant-do',
    title: "What AI can't do — and why that matters",
    blurb:
      "The honest version. Where these tools break, where they hallucinate, and what stays a human job. Knowing the limits is what keeps you out of trouble.",
    duration: '~2 min',
    videoUrl: null,
  },
  {
    slug: 'how-to-get-started',
    title: 'How a local business gets started',
    blurb:
      'The order of operations. What to build first, what to skip, and what one workflow returns the most time in the first 30 days.',
    duration: '~3 min',
    videoUrl: null,
  },
  {
    slug: 'three-mistakes',
    title: 'The 3 mistakes most owners make',
    blurb:
      "What I see when I audit a shop's existing setup. These are the ones that cost months of wasted budget and a rebuild from scratch.",
    duration: '~2 min',
    videoUrl: null,
  },
  {
    slug: 'audit-walkthrough',
    title: 'What an AI audit actually looks like',
    blurb:
      "30-minute call, then a written roadmap. Here's exactly what comes out of it and how to use it whether or not you hire us.",
    duration: '~2 min',
    videoUrl: null,
  },
];

const PROOF_CARDS: { value: string; label: string }[] = [
  { value: '+$128k', label: 'Cash collected in 4 months — landscaper, zero online presence to nationwide recognition' },
  { value: '50 hrs/wk', label: 'Content production time cut — blog automation for a 600-member professional org' },
  { value: '9.8×–31×', label: 'ROAS on marketing spend — same landscaper, same systems' },
];

const AUDIT_BULLETS = [
  'A short list of the 3 highest-leverage AI workflows for your specific business.',
  'Honest pushback on what NOT to automate — including anything we think will hurt you.',
  'A written roadmap you can keep, whether or not you hire us to build it.',
];

export const Learn = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = LESSONS[activeIdx];

  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Free AI Crash Course for Local Businesses — Redwater Revenue"
        description="A short, no-fluff video series on what AI is, where it pays off in a service business, and how to get started. Built for owners and operators — not engineers."
        path="/learn"
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <span className="mb-4 inline-block rounded-full border border-brand-red/20 bg-brand-red/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
            Free crash course · ~15 min total
          </span>
          <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-zinc-900 md:text-6xl lg:text-7xl">
            AI for local businesses. <span className="text-gradient">Plain English. Real workflows.</span>
          </h1>
          <p className="text-lg text-zinc-500 md:text-xl">
            Six short videos on what these tools actually do, where they pay off, and how to start without
            wasting six months on the wrong build. Aimed at owners and operators — not engineers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#course"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-base font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
            >
              Start watching
              <PlayCircle className="h-5 w-5" />
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3 text-base font-bold text-zinc-900 transition-all hover:bg-zinc-50"
            >
              Book a free audit
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </motion.div>

        {/* Course — sticky video on desktop, stacked on mobile */}
        <section id="course" className="mb-24 scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <VideoEmbed videoUrl={active.videoUrl} title={active.title} />
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Lesson {activeIdx + 1} of {LESSONS.length}
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-zinc-900">{active.title}</h2>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                  <Clock className="h-3.5 w-3.5" />
                  {active.duration}
                </span>
              </div>
              <p className="mt-3 text-zinc-500 leading-relaxed">{active.blurb}</p>

              <div className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-5">
                <p className="text-sm font-bold text-zinc-700">Want to talk through how this fits your business?</p>
                <a
                  href="#book"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-brand-red hover:gap-2.5 transition-all"
                >
                  Book a free 30-min audit
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                The whole course
              </p>
              <ol className="space-y-3">
                {LESSONS.map((lesson, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <li key={lesson.slug}>
                      <button
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                          isActive
                            ? 'border-brand-red/30 bg-brand-red/[0.04] shadow-sm'
                            : 'border-zinc-100 bg-white hover:border-zinc-300'
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${
                            isActive
                              ? 'bg-brand-red text-white'
                              : 'bg-zinc-100 text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-3">
                            <span className={`text-sm font-bold ${isActive ? 'text-brand-red' : 'text-zinc-900'}`}>
                              {lesson.title}
                            </span>
                            <span className="shrink-0 text-[11px] text-zinc-400">{lesson.duration}</span>
                          </span>
                          <span className="mt-1 block text-xs text-zinc-500 leading-relaxed line-clamp-2">
                            {lesson.blurb}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* Proof cards */}
        <section className="mb-24">
          <div className="mb-10 max-w-2xl">
            <h2 className="mb-3 text-3xl font-bold text-zinc-900 md:text-4xl">
              Numbers from real local-business builds.
            </h2>
            <p className="text-zinc-500">
              Three of the strongest outcomes from shipped work. Full case studies are on the next page.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PROOF_CARDS.map((p) => (
              <div key={p.label} className="rounded-3xl border border-zinc-100 bg-white p-6">
                <div className="mb-3 text-3xl font-bold text-gradient md:text-4xl">{p.value}</div>
                <div className="text-sm leading-snug text-zinc-500">{p.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit booking */}
        <section id="book" className="mb-12 scroll-mt-24">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full border border-brand-orange/20 bg-brand-orange/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Free · 30 min · No pitch
              </span>
              <h2 className="mb-5 text-3xl font-bold text-zinc-900 md:text-4xl">
                Book a free AI audit.
              </h2>
              <p className="mb-8 text-zinc-500 leading-relaxed">
                30 minutes on Google Meet. We look at how your business actually runs and where AI can pay
                off — or where it can't. You walk away with a written roadmap whether or not we work
                together.
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
                <h3 className="text-xl font-bold">Pick a time for your audit</h3>
              </div>
              <div className="px-2 pb-2">
                <Scheduler kind="audit-30" source="learn-page" ctaLabel="Confirm audit" />
              </div>
            </div>
          </div>
        </section>

        {/* Local footer line */}
        <section className="rounded-3xl border border-zinc-100 bg-zinc-50/60 p-8 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-400">Based in South Louisiana</p>
          <p className="mt-3 text-lg text-zinc-700 md:text-xl">
            Currently doing free in-person AI talks for Lake Charles businesses and civic groups.{' '}
            <a href="mailto:nick@redwaterrev.com?subject=AI talk for our group" className="font-bold text-brand-red hover:underline">
              Email me
            </a>{' '}
            if you'd like one for your team.
          </p>
        </section>
      </div>
    </div>
  );
};
