import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowDown,
  Check,
  X,
  Mail,
  Database,
  FileText,
  Send,
  UserPlus,
  Inbox,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { Roadmap } from '../components/Roadmap';
import { getService } from '../data/services';

interface Pillar {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  bullets: string[];
  chips: { slug: string; label: string }[];
}

const PILLARS: Pillar[] = [
  {
    id: 'outreach',
    icon: Mail,
    title: 'Outreach',
    summary: "Cold email, scraping, and follow-ups run daily — without you touching Instantly.",
    description:
      "We keep 10–40 warmed inboxes sending 300+ personalized emails a day, pull fresh ICP lists every week, and wire in a follow-up agent so nothing rots in pending. You get booked calls. We handle everything upstream of them.",
    bullets: [
      'Domain + DNS stack fully warmed and monitored',
      'Weekly ICP lists pulled from LinkedIn Sales Navigator or Google Maps',
      'Sequences A/B tested and rotated against reply data',
      'Follow-up agent replies in your voice, flags high-intent threads',
    ],
    chips: [
      { slug: 'cold-email-infrastructure', label: 'Cold email infrastructure' },
      { slug: 'lead-scraping-enrichment', label: 'Lead scraping' },
      { slug: 'follow-up-nurture', label: 'Follow-up nurture' },
    ],
  },
  {
    id: 'crm-reporting',
    icon: Database,
    title: 'CRM & Reporting',
    summary: 'Your pipeline stays clean, weekly client reports ship on time, numbers are always live.',
    description:
      "We keep your CRM in the shape your sales process actually needs — not HubSpot's default. Weekly client reports draft, render, and ship on your cadence. When you open the dashboard, the numbers are real.",
    bullets: [
      'Custom CRM schema matched to your pipeline stages',
      'Real-time dashboards for pipeline, revenue, and activity',
      'Auto-drafted weekly client reports with approval flow',
      'Slack pings when a report is ready or a deal moves stage',
    ],
    chips: [
      { slug: 'custom-crm-build', label: 'Custom CRM build' },
      { slug: 'client-reporting-automation', label: 'Client reporting' },
      { slug: 'animated-client-progress-reports', label: 'Animated reports' },
    ],
  },
  {
    id: 'content',
    icon: FileText,
    title: 'Content & Inbound',
    summary: "Blog posts, newsletters, and social content publish on cadence — in your voice.",
    description:
      'One long recording turns into a blog post, a newsletter, and 10–15 social posts, each with its own image. SEO meta gets generated on publish. Your site ranks, your list hears from you, and your social feed never goes dark.',
    bullets: [
      'Transcript-to-everything repurposing pipeline',
      'Weekly SEO-researched blog drafts loaded into your CMS',
      'Newsletter drafts ready to send in ConvertKit / Beehiiv',
      'Latin-square scheduling across LinkedIn, IG, FB, X',
    ],
    chips: [
      { slug: 'content-repurposing-pipeline', label: 'Repurposing pipeline' },
      { slug: 'blog-automation', label: 'Blog automation' },
      { slug: 'newsletter-sequences', label: 'Newsletter sequences' },
    ],
  },
  {
    id: 'inbox',
    icon: Inbox,
    title: 'Inbox & DMs',
    summary: 'Every inbound email and DM gets a reply in 5 minutes — drafted in your voice.',
    description:
      'New leads get a personalized reply inside 5 minutes — the #1 predictor of closing. DMs across LinkedIn, Facebook, and Instagram get drafted responses in your voice. High-intent threads ping you in Slack for approval.',
    bullets: [
      'Sub-5-min drafted replies across Gmail / Outlook',
      'Social DMs monitored and drafted across 3 platforms',
      'AI triage labeling every unread email nightly',
      'Escalation rules for pricing, scope, and legal',
    ],
    chips: [
      { slug: 'ai-inbox-auto-reply', label: 'Inbox auto-reply' },
      { slug: 'linkedin-dm-automation', label: 'Social DM automation' },
      { slug: 'inbox-triage-labeling', label: 'Inbox triage' },
    ],
  },
  {
    id: 'onboarding',
    icon: UserPlus,
    title: 'Onboarding',
    summary: 'New clients go from signed contract to first deliverable in 72 hours — automatically.',
    description:
      "The first week sets the whole relationship. We wire contract, intake form, access provisioning, kickoff email, and the first deliverable into a flow that runs itself — so every client gets the premium onboarding experience.",
    bullets: [
      'Contract + intake form with automatic routing',
      'Access provisioning across Gmail, Slack, Notion, shared drives',
      'Kickoff email sequence in your voice',
      'First deliverable shipped inside 72 hours',
    ],
    chips: [{ slug: 'client-onboarding-automation', label: 'Client onboarding' }],
  },
  {
    id: 'support',
    icon: Send,
    title: 'Strategy & Support',
    summary: 'Monthly strategy review, unlimited async support, monthly backlog triage.',
    description:
      "You get one Slack channel, one operator, and unlimited async support. Every month we sit down, review what's working, prioritize the next build, and ship it. No scope pings, no per-hour billing.",
    bullets: [
      'Dedicated Slack channel with next-day response',
      'Monthly strategy review call',
      'Backlog prioritization against real revenue impact',
      'New automations built into the retainer',
    ],
    chips: [
      { slug: 'custom-claude-skills', label: 'Custom AI skills' },
      { slug: 'meeting-notes-action-items', label: 'Meeting notes automation' },
    ],
  },
];

const COMPARISON_ROWS: { label: string; contractors: string; fullstack: string }[] = [
  {
    label: 'Points of contact',
    contractors: '4–6 separate vendors, all emailing you',
    fullstack: 'One operator, one Slack channel',
  },
  {
    label: 'Handoffs between systems',
    contractors: 'Your team fills the gaps',
    fullstack: 'Systems talk to each other natively',
  },
  {
    label: 'Who fixes it when it breaks',
    contractors: 'You triage, then email whoever owns it',
    fullstack: "We triage. You don't hear about it unless we need a decision.",
  },
  {
    label: 'Monthly cost',
    contractors: '$8,000–$15,000 per month',
    fullstack: 'One retainer, starts at $5k/mo',
  },
  {
    label: 'Revenue accountability',
    contractors: 'Nobody owns the outcome',
    fullstack: 'We own the full revenue stack — outreach to renewal',
  },
];

export const FullStackSystemPage = () => {
  const reduceMotion = useReducedMotion();
  const service = getService('full-stack-system');

  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: 'easeOut' as const },
      };

  const stagger = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
        };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Full-Stack System',
    description:
      service?.outcome ??
      'One operator running outreach, CRM, content, reporting, and onboarding under one monthly retainer.',
    serviceType: 'Bundled AI automation retainer',
    provider: {
      '@type': 'Organization',
      name: 'Redwater Revenue',
      url: 'https://redwaterrev.com',
    },
  };

  return (
    <div className="pt-24 pb-0">
      <SEO
        title="Full-Stack System — Redwater Revenue"
        description="One operator running outreach, CRM, content, reporting, and onboarding — all under one monthly retainer. Starts at $5k/mo."
        path="/services/full-stack-system"
        jsonLd={jsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-24 lg:pt-24">
        {/* Ambient gradient backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 40%, rgba(249, 115, 22, 0.10) 0%, transparent 50%)',
          }}
        />
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            <Sparkles className="h-3.5 w-3.5" />
            Bundled retainer
          </div>
          <h1 className="mb-8 text-5xl font-black leading-[1.02] tracking-tight text-zinc-900 md:text-7xl lg:text-[5.5rem]">
            Full-Stack <span className="text-gradient">System</span>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-zinc-500 md:text-2xl">
            One unified system for outreach, CRM, content, reporting, and onboarding — all on one
            retainer.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-zinc-900/10 transition-all hover:scale-105 hover:bg-brand-red"
            >
              Book a strategy call
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#stack"
              className="group inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-4 text-base font-bold text-zinc-900 transition-all hover:bg-zinc-50"
            >
              See the stack below
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* What you stop worrying about */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              What you stop worrying about
            </div>
            <h2 className="text-4xl font-black leading-tight text-zinc-900 md:text-5xl">
              6 things that eat your week.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.a
                  key={p.id}
                  href={`#${p.id}`}
                  {...stagger(i)}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-8 transition-all hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5"
                >
                  <div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
                    style={{
                      backgroundImage:
                        'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
                    }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-zinc-900">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{p.summary}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works (pillar deep-dives) */}
      <section id="stack" className="relative bg-zinc-50 px-6 py-24 lg:py-32 scroll-mt-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...fadeUp} className="mb-20 max-w-3xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              How it works
            </div>
            <h2 className="text-4xl font-black leading-tight text-zinc-900 md:text-5xl">
              Six pillars. One retainer. Zero duct tape.
            </h2>
            <p className="mt-6 text-lg text-zinc-500">
              Each pillar is a piece of the revenue stack we run end-to-end. Click any chip to see
              the individual service detail.
            </p>
          </motion.div>

          <div className="space-y-24">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              const imageLeft = i % 2 === 0;
              return (
                <motion.div
                  key={p.id}
                  id={p.id}
                  {...fadeUp}
                  className="scroll-mt-24 grid items-center gap-12 lg:grid-cols-2"
                >
                  {/* Icon tile */}
                  <div className={imageLeft ? 'lg:order-1' : 'lg:order-2'}>
                    <div className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-xl">
                      <div
                        className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-2xl p-8"
                        style={{
                          backgroundImage:
                            'linear-gradient(135deg, #DC2626 0%, #F97316 55%, #FBBF24 100%)',
                        }}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-20 mix-blend-overlay"
                          style={{
                            backgroundImage:
                              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                          }}
                        />
                        <div
                          aria-hidden
                          className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
                        />
                        <Icon
                          className="relative h-40 w-40 text-white drop-shadow-lg"
                          strokeWidth={1.5}
                        />
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                            Pillar {String(i + 1).padStart(2, '0')}
                          </div>
                          <div className="text-2xl font-bold leading-tight text-white">
                            {p.title}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={imageLeft ? 'lg:order-2' : 'lg:order-1'}>
                    <h3 className="mb-4 text-3xl font-black text-zinc-900 md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mb-6 text-lg leading-relaxed text-zinc-600">{p.description}</p>
                    <ul className="mb-8 space-y-3">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-3 text-zinc-700">
                          <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          <span className="text-base leading-snug">{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {p.chips.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/services/${c.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold text-zinc-700 transition-all hover:border-brand-orange/40 hover:bg-brand-orange/5 hover:text-brand-red"
                        >
                          {c.label}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl">
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              Why this beats a stack of contractors
            </div>
            <h2 className="text-4xl font-black leading-tight text-zinc-900 md:text-5xl">
              One operator. One invoice. Nothing falls through.
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-xl"
          >
            {/* Header row */}
            <div className="grid grid-cols-1 border-b border-zinc-100 md:grid-cols-[1.2fr_1fr_1fr]">
              <div className="hidden p-6 md:block" />
              <div className="border-b border-zinc-100 bg-zinc-50 p-6 text-sm font-bold uppercase tracking-wider text-zinc-500 md:border-b-0 md:border-l">
                A stack of contractors
              </div>
              <div className="bg-brand-red/5 p-6 text-sm font-bold uppercase tracking-wider text-brand-red md:border-l md:border-zinc-100">
                Full-Stack System
              </div>
            </div>
            {/* Rows */}
            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] ${
                  i !== COMPARISON_ROWS.length - 1 ? 'border-b border-zinc-100' : ''
                }`}
              >
                <div className="bg-zinc-50/50 p-6 text-sm font-bold text-zinc-900">{row.label}</div>
                <div className="flex items-start gap-3 p-6 text-sm text-zinc-600 md:border-l md:border-zinc-100">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-zinc-400" strokeWidth={2.5} />
                  <span>{row.contractors}</span>
                </div>
                <div className="flex items-start gap-3 bg-brand-red/[0.02] p-6 text-sm text-zinc-700 md:border-l md:border-zinc-100">
                  <Check
                    className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red"
                    strokeWidth={3}
                  />
                  <span>{row.fullstack}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing framing */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div
            {...fadeUp}
            className="overflow-hidden rounded-3xl p-10 text-center md:p-16"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #DC2626 0%, #F97316 55%, #FBBF24 100%)',
            }}
          >
            <div className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Retainer pricing
            </div>
            <h2 className="mb-6 text-4xl font-black leading-tight text-white md:text-5xl">
              Scoped to your business. Starts at $5k/mo.
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
              No menu pricing, no per-seat fees, no scope pings. One retainer that covers the
              full-stack system, ongoing builds, and async support across your revenue operation.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-red shadow-xl shadow-brand-red/20 transition-all hover:scale-105"
            >
              Get a retainer quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <Roadmap />

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-5xl rounded-3xl bg-zinc-900 p-10 text-center text-white md:p-16"
        >
          <h2 className="mb-4 text-3xl font-black md:text-5xl">
            Ready to run one system instead of five?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
            30-minute call. We'll map your current stack, flag the biggest leaks, and hand back a
            scope the same week.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 text-base font-bold text-white shadow-xl shadow-brand-orange/20 transition-all hover:scale-105 hover:bg-brand-red"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
