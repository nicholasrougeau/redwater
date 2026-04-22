import { useParams, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Cpu,
  Layers,
  Mail,
  Monitor,
  Search,
  Telescope,
  Video,
  type LucideIcon,
} from 'lucide-react';
import { SEO } from '../lib/seo';
import { getService, getBucket, servicesInBucket } from '../data/services';

const BUCKET_ICON: Record<string, LucideIcon> = {
  bundled: Layers,
  outreach: Mail,
  'website-sales-assets': Monitor,
  'custom-automation': Cpu,
  'seo-content-ops': Search,
  'content-video': Video,
  'research-intelligence': Telescope,
};

const ROADMAP_STEPS: { title: string; desc: string }[] = [
  {
    title: 'Scope',
    desc: 'Kickoff call to map your stack, bottlenecks, and desired outcomes.',
  },
  {
    title: 'Design',
    desc: 'Architecture diagram + specs. You approve before a line of code.',
  },
  {
    title: 'Build & iterate',
    desc: 'Daily async updates. You see progress, not a black box.',
  },
  {
    title: 'Ship & support',
    desc: 'Handoff, documentation, and a 2-week stabilization window.',
  },
];

export const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;
  const reduceMotion = useReducedMotion();

  if (!service) {
    return (
      <div className="pt-32 pb-24">
        <SEO
          title="Service not found — Redwater Revenue"
          description="That service doesn't exist. Browse the full catalog."
          path="/services"
        />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900">Service not found.</h1>
          <p className="mb-8 text-zinc-500">
            That URL doesn't match anything in the catalog. Head back to services to find what you
            need.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-bold text-white transition-all hover:bg-brand-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const bucket = getBucket(service.bucket);
  const BucketIcon = BUCKET_ICON[service.bucket] ?? Layers;
  const Icon = service.icon;
  const related = servicesInBucket(service.bucket).filter((s) => s.slug !== service.slug);

  // Motion helpers — respect prefers-reduced-motion
  const fadeUp = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: 'easeOut' as const },
      };

  const scaleIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.7, ease: 'easeOut' as const },
      };

  const staggerUp = (i: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
        };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.outcome,
    serviceType: bucket?.title ?? 'AI automation',
    provider: {
      '@type': 'Organization',
      name: 'Redwater Revenue',
      url: 'https://redwaterrev.com',
    },
  };

  return (
    <div className="pt-32 pb-24">
      <SEO
        title={`${service.title} | Redwater Revenue`}
        description={service.outcome}
        path={`/services/${service.slug}`}
        jsonLd={serviceJsonLd}
      />

      {/* Section 1 — Top nav strip */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to all services
          </Link>
          {bucket && (
            <Link
              to={`/services/category/${bucket.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-700 transition-all hover:border-brand-orange/40 hover:text-brand-red"
            >
              <BucketIcon className="h-3.5 w-3.5" />
              {bucket.title}
            </Link>
          )}
        </div>
      </div>

      {/* Section 2 — Hero (centered) */}
      <div className="mx-auto max-w-5xl px-6">
        <motion.div {...fadeUp} className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
            {service.tagline}
          </div>
          <h1 className="mb-6 text-5xl font-black leading-[1.05] text-zinc-900 lg:text-7xl">
            {service.title}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-500 md:text-2xl">
            {service.outcome}
          </p>
        </motion.div>
      </div>

      {/* Section 3 — Two-column: highlight cards + visual */}
      <div className="mx-auto max-w-5xl px-6">
        <section className="mb-40 grid items-start gap-16 lg:grid-cols-2">
          {/* Left: 3 highlight cards */}
          <div className="space-y-6">
            {service.highlights.map((h, i) => (
              <motion.div
                key={`${h.label}-${i}`}
                {...staggerUp(i)}
                className="rounded-2xl border border-zinc-100 bg-white p-8 shadow-sm"
              >
                <div className="mb-3 text-5xl font-black leading-none text-brand-red">
                  {h.metric}
                </div>
                <p className="text-lg font-bold leading-snug text-zinc-800">{h.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: visual tile */}
          <motion.div
            {...scaleIn}
            className="rounded-3xl border border-zinc-100 bg-white p-6 shadow-2xl"
          >
            <h2 className="mb-8 text-center text-2xl font-bold text-zinc-900">See the fit</h2>
            <div
              className="relative flex h-[420px] flex-col justify-between overflow-hidden rounded-2xl p-8"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #DC2626 0%, #F97316 55%, #FBBF24 100%)',
              }}
            >
              {/* subtle grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-20 mix-blend-overlay"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              {/* radial highlight */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/20 blur-3xl"
              />

              <div className="relative flex flex-1 items-center justify-center">
                <Icon className="h-40 w-40 text-white drop-shadow-lg" strokeWidth={1.5} />
              </div>

              <div className="relative">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                  What we build
                </div>
                <div className="text-2xl font-bold leading-tight text-white">
                  {service.title}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Section 4 — Dark "What this looks like" with clean gradient transition */}
      <div
        aria-hidden
        className="h-6 w-full bg-gradient-to-b from-zinc-50 to-[#0F172A]"
      />
      <section className="relative bg-[#0F172A]">
        <div className="relative mx-auto max-w-5xl px-6 pt-24 pb-28">
          <motion.h2
            {...fadeUp}
            className="mb-12 text-4xl font-black leading-tight text-white lg:text-5xl"
          >
            What is {service.title}?
          </motion.h2>

          <motion.div
            {...fadeUp}
            className="max-w-3xl rounded-3xl bg-white p-8 text-slate-900 shadow-xl lg:p-12"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="mb-4 text-2xl font-bold text-brand-red">
              {service.title} System
            </h3>
            <p className="mb-6 text-xl leading-relaxed text-zinc-600">{service.hook}</p>
            <p className="text-xl leading-relaxed text-zinc-600">{service.details}</p>
          </motion.div>
        </div>
      </section>

      {/* Section 4b — What's included (deliverables checklist) */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.h2
          {...fadeUp}
          className="mb-4 text-4xl font-black text-zinc-900 lg:text-5xl"
        >
          What's included
        </motion.h2>
        <motion.p {...fadeUp} className="mb-12 max-w-2xl text-lg text-zinc-500">
          Everything delivered inside this engagement — ready to run, documented, and yours to keep.
        </motion.p>
        <motion.ul {...fadeUp} className="grid gap-4 md:grid-cols-2">
          {service.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-5 shadow-sm"
            >
              <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-base leading-snug text-zinc-700">{d}</span>
            </li>
          ))}
        </motion.ul>
      </section>

      {/* Section 5 — How we build it roadmap */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <motion.h2
          {...fadeUp}
          className="mb-4 text-4xl font-black text-zinc-900 lg:text-5xl"
        >
          How we build it
        </motion.h2>
        <motion.p {...fadeUp} className="mb-16 max-w-2xl text-lg text-zinc-500">
          Four stages. Same on every engagement. No black boxes.
        </motion.p>

        <div className="relative">
          {/* Animated connecting line (desktop) */}
          <motion.div
            aria-hidden
            initial={reduceMotion ? {} : { scaleX: 0 }}
            whileInView={reduceMotion ? {} : { scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="absolute top-8 left-[8%] hidden h-[2px] w-[84%] origin-left bg-gradient-to-r from-brand-red via-brand-orange to-brand-gold lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {ROADMAP_STEPS.map((step, i) => (
              <motion.li key={step.title} {...staggerUp(i)} className="relative">
                <div
                  className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-xl font-black text-white shadow-lg"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #DC2626 0%, #F97316 100%)',
                  }}
                >
                  {i + 1}
                </div>
                <div className="text-center lg:text-left">
                  <h3 className="mb-2 text-lg font-bold text-zinc-900">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Section 6 — Ideal for */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <motion.h2 {...fadeUp} className="mb-8 text-3xl font-bold text-zinc-900 md:text-4xl">
          Ideal for
        </motion.h2>
        <motion.ul {...fadeUp} className="space-y-3">
          {service.idealFor.map((i) => (
            <li key={i} className="flex items-start gap-4 text-lg text-zinc-600">
              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
              {i}
            </li>
          ))}
        </motion.ul>
      </section>

      {/* Section 7 — Related services */}
      {bucket && related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <motion.h2
            {...fadeUp}
            className="mb-6 text-3xl font-bold text-zinc-900 md:text-4xl"
          >
            More in {bucket.title}
          </motion.h2>
          <motion.div {...fadeUp} className="flex flex-wrap gap-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/services/${r.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-brand-orange/40 hover:text-brand-red"
              >
                {r.title}
              </Link>
            ))}
          </motion.div>
        </section>
      )}

      {/* Section 8 — Final CTA */}
      <div className="mx-auto max-w-5xl px-6">
        <motion.section
          {...fadeUp}
          className="rounded-3xl bg-zinc-900 p-10 text-center text-white md:p-16"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Let's build this into your business.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
            Book a call. 30 minutes. We'll scope the work and hand back a plan the same week.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Book a strategy call
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.section>
      </div>
    </div>
  );
};
