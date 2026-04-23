import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Particles } from '../components/Particles';
import { SpotlightCard } from '../components/SpotlightCard';
import { Roadmap } from '../components/Roadmap';
import { NewsletterSection } from '../components/NewsletterSection';
import { SEO } from '../lib/seo';

const partners = [
  { name: 'Anthropic', logo: '/logos/anthropic.svg' },
  { name: 'OpenAI', logo: '/logos/openai.svg' },
  { name: 'Gemini', logo: '/logos/gemini.svg' },
  { name: 'n8n', logo: '/logos/n8n.svg' },
  { name: 'Make', logo: '/logos/make.svg' },
  { name: 'Zapier', logo: '/logos/zapier.svg' },
  { name: 'Supabase', logo: '/logos/supabase.svg' },
  { name: 'Vercel', logo: '/logos/vercel.svg' },
  { name: 'ConvertKit', logo: '/logos/convertkit.svg' },
  { name: 'Remotion', logo: '/logos/remotion.svg' },
  { name: 'Modal', logo: '/logos/modal.svg' },
  { name: 'Instantly', logo: '/logos/instantly.svg' },
];

const bucketSummaries = [
  { slug: 'bundled', title: 'Full-Stack System', blurb: 'Outreach, CRM, reporting, content, and onboarding — one system, unlimited support.' },
  { slug: 'outreach', title: 'Outreach & Lead Gen', blurb: 'Cold email, scraping, nurture, inbox reply, LinkedIn DMs, content, newsletters.' },
  { slug: 'website-sales-assets', title: 'Website & Sales Assets', blurb: 'Sites, animated proposals, automated progress reports, decks.' },
  { slug: 'custom-automation', title: 'AI Consulting & Engineering', blurb: 'Claude Code training, custom skills, CRMs, onboarding, reporting, inbox triage.' },
  { slug: 'seo-content-ops', title: 'SEO & Visibility', blurb: 'Keyword-researched blog automation, SEO metadata at scale, review automation, and more.' },
  { slug: 'content-video', title: 'Content & Video', blurb: 'Repurposing pipeline, dashboards, shorts, thumbnails, scheduling.' },
  { slug: 'research-intelligence', title: 'Research & Intelligence', blurb: 'Deep research agents, competitor tracking, cross-niche mining, trend monitoring.' },
];

const proofPoints: { value: string; label: string }[] = [
  { value: '+$128k', label: 'Cash collected in 4 months' },
  { value: '2.4 → 4.2', label: 'Google reviews in 3 weeks' },
  { value: '50 hrs/wk', label: 'Content production time cut — blog automation' },
  { value: '27.9 → 4.7', label: 'Google ranking position on target keywords' },
  { value: '$900k', label: 'Added to pipeline via automated content + auto-responders' },
  { value: '$900M', label: 'Real estate firm running our automations' },
];

export const Home = () => {
  return (
    <div className="pt-20">
      <SEO
        title="Redwater Revenue — AI Systems for Local Businesses and Professionals"
        description="Custom AI systems for local businesses including coaches, lawyers, consultants, and agencies. Outreach, CRM, content, and reporting that scale revenue and reclaim time."
        path="/"
      />
      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-32">
        <Particles />
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-zinc-900 md:text-6xl lg:text-7xl">
              AI Systems for <span className="text-gradient">Local Businesses</span> and Professionals.
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-500 md:text-xl">
              Custom automation systems for local businesses including coaches, lawyers, consultants, and agencies. We ship outreach, CRM, content, and reporting infrastructure that scales revenue without scaling headcount.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
              >
                Book a Strategy Call
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-zinc-200 bg-white px-8 py-4 text-lg font-bold text-zinc-900 transition-all hover:bg-zinc-50"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools strip — seamless fade, no hard borders */}
      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-zinc-50/60 to-white" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p className="mb-12 text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Partnered with trusted enterprise systems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            {partners.map((partner) => (
              <img
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                className="h-6 w-auto object-contain md:h-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services buckets */}
      <section className="px-6 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">One system. Every piece your business needs.</h2>
              <p className="text-lg text-zinc-500">
                Custom infrastructure that replaces manual work with custom software and AI agents.
              </p>
            </div>
            <Link to="/services" className="group flex items-center gap-2 font-bold text-brand-red">
              Explore all services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bucketSummaries.map((b) => {
              const href =
                b.slug === 'bundled'
                  ? '/services/full-stack-system'
                  : `/services/category/${b.slug}`;
              return (
                <SpotlightCard key={b.slug}>
                  <h3 className="mb-3 text-xl font-bold text-zinc-900">{b.title}</h3>
                  <p className="mb-6 text-sm text-zinc-500 leading-relaxed">{b.blurb}</p>
                  <Link
                    to={href}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-red transition-all hover:gap-3"
                  >
                    See services <ArrowRight className="h-4 w-4" />
                  </Link>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <Roadmap />

      {/* Proof */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">Numbers from real clients.</h2>
            <p className="text-lg text-zinc-500">Six of the strongest outcomes from shipped work. Full case studies on the next page.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {proofPoints.map((p) => (
              <div key={p.label} className="rounded-2xl border border-zinc-100 bg-white p-6">
                <div className="mb-2 text-3xl md:text-4xl font-bold text-gradient">{p.value}</div>
                <div className="text-sm text-zinc-500 leading-snug">{p.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/case-studies" className="group inline-flex items-center gap-2 font-bold text-brand-red">
              See all case studies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <SpotlightCard
          dark
          tilt={false}
          className="mx-auto max-w-7xl !px-8 !py-24 text-center text-white overflow-hidden"
        >
          <div>
            <h2 className="mb-6 text-4xl font-bold md:text-6xl">Ready to automate your revenue?</h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
              30-minute call. We'll map the highest-leverage system to build first.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-10 py-5 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-brand-red shadow-xl shadow-brand-orange/20"
            >
              Book a Strategy Call
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </SpotlightCard>
      </section>

      <NewsletterSection />
    </div>
  );
};
