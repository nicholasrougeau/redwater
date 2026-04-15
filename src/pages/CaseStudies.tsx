import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../lib/seo';

interface FeaturedBuild {
  title: string;
  problem: string;
  build: string;
  outcome: string;
}

const featuredBuilds: FeaturedBuild[] = [
  {
    title: 'GHL 46-Page Website Builder',
    problem: 'Agency was burning ~10 hours per site spinning up 40+ page GHL builds tuned to match each client\'s Google Business Profile.',
    build: 'Code + no-code pipeline that ingests a kickoff transcript, GBP data, and optional prior site, then assembles a Google-optimized 46-page GHL site.',
    outcome: 'Delivery cut from ~10 hrs to ~1 hr. Client\'s Google ranking position doubled in under 2 weeks.',
  },
  {
    title: 'Financial Newsletter Automation',
    problem: 'Daily financial newsletter required a human to scrape markets, write copy, and ship HTML by 7am.',
    build: 'Automation scrapes 200+ articles + live market data, writes the newsletter in the brand\'s voice with subject/preview optimization, and delivers via ConvertKit with full tracking.',
    outcome: 'Running 30+ days with zero manual touch. Reads like a human wrote it.',
  },
  {
    title: 'n8n Blog Researcher',
    problem: 'Content team couldn\'t keep up with deep research on 50+ sources for a specialty certification business.',
    build: 'Three-workflow n8n system — daily research across 200+ articles, form-triggered Google Doc drafts with Slack approval, one-click WP publish that preserves user edits.',
    outcome: 'ICP-tuned research surfaces live pain points. Content team ships 5x the volume.',
  },
  {
    title: 'Transcript → Blog + Social Pipeline',
    problem: 'One podcast episode was getting reposted once and ignored. The rest of the content value evaporated.',
    build: 'Transcript in → blog post + 10–15 social posts + matching images out. Optional CTA, audience targeting, and internal/external link insertion.',
    outcome: 'A month of distribution from a single recording. Costs a few cents per run.',
  },
  {
    title: 'YouTube Strategy Dashboard',
    problem: 'Creator had YouTube analytics but no "what do I do next?" signal.',
    build: 'Pulls YT API data, reads a custom strategy doc (brand pillars, goals), diagnoses each video vs best practices + the client\'s own strategy, and delivers insights by email and in an interactive dashboard.',
    outcome: 'Turns analytics into specific next actions. Example: "High views, low comments — missing CTA. Fix: specific question in final 10s."',
  },
];

const proofPoints: { value: string; label: string }[] = [
  { value: '+$128k', label: 'Cash collected in 4 months — landscaper' },
  { value: '2.4 → 4.2', label: 'Review score in 3 weeks' },
  { value: '2x', label: 'Google calls + site clicks in 1 month' },
  { value: '27.9 → 12.2', label: 'Google ranking position in 2 weeks' },
  { value: '108k', label: 'Facebook views from zero presence' },
  { value: '$24k', label: 'From 4 emails to past customers' },
  { value: '$900M', label: 'Real estate firm running our automations' },
  { value: '200+', label: 'Articles researched daily — blog automation R&D' },
  { value: '150+', label: 'Daily sources into one ConvertKit newsletter' },
];

export const CaseStudies = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Case Studies — Redwater Revenue"
        description="Real outcomes from Redwater Revenue builds: +$128k for a landscaper, 2x Google calls in a month, 27.9 → 12.2 ranking in 2 weeks, and more."
        path="/case-studies"
      />
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero */}
        <div className="mb-20 max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">Real outcomes. Real numbers.</h1>
          <p className="text-xl text-zinc-500">
            We don't do case studies in hypotheticals. Every number here came out of a real client engagement — most of them shipped solo, end to end.
          </p>
        </div>

        {/* Hero case: Landscaper */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 rounded-3xl border border-zinc-100 bg-white p-8 md:p-16 shadow-2xl shadow-zinc-100"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            Hero case
          </div>
          <h2 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">
            Landscaper: 2.4★ → $128k+ in new jobs
          </h2>
          <p className="mb-10 max-w-3xl text-lg text-zinc-500">
            A local landscaper with a 2.4-star rating and zero online presence. Four months later: $128k+ in new cash collected, 4.2-star rating, 108k Facebook views from a cold start, and an inbound flow that runs itself.
          </p>

          <div className="mb-10 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-3 font-bold text-zinc-900 uppercase tracking-widest text-xs text-zinc-400">The problem</h3>
              <p className="text-zinc-600 leading-relaxed">
                Great work, terrible digital footprint. 2.4-star average. No website. No FB presence. Missed calls. Estimates that never got booked.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-zinc-900 uppercase tracking-widest text-xs text-zinc-400">The build</h3>
              <p className="text-zinc-600 leading-relaxed">
                34-page SEO-optimized site. FB page from scratch. GBP optimization. CRM + email (30–40% opens, 5–7% CTR). AI agents for review collection, estimate booking, and inbound warmup.
              </p>
            </div>
            <div>
              <h3 className="mb-3 font-bold text-zinc-900 uppercase tracking-widest text-xs text-zinc-400">The outcome</h3>
              <p className="text-zinc-600 leading-relaxed">
                Reviews 8 → 25 (2.4 → 4.2). 108k FB views. $150k+ YoY invoice growth. 9.8x–31x ROAS on paid. $128k+ cash collected in 4 months.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-100 pt-10">
            <Stat value="+$128k" label="Cash in 4 months" />
            <Stat value="2.4 → 4.2" label="Review score" />
            <Stat value="108k" label="FB views" />
            <Stat value="9.8–31x" label="ROAS" />
          </div>
        </motion.section>

        {/* Featured builds */}
        <section className="mb-24">
          <h2 className="mb-10 text-3xl font-bold text-zinc-900 md:text-4xl">Featured builds</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredBuilds.map((b) => (
              <motion.article
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                className="rounded-2xl border border-zinc-100 bg-white p-8 transition-all hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5"
              >
                <h3 className="mb-5 text-xl font-bold text-zinc-900">{b.title}</h3>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold uppercase tracking-widest text-xs text-zinc-400 mb-1">Problem</dt>
                    <dd className="text-zinc-600 leading-relaxed">{b.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase tracking-widest text-xs text-zinc-400 mb-1">Build</dt>
                    <dd className="text-zinc-600 leading-relaxed">{b.build}</dd>
                  </div>
                  <div>
                    <dt className="font-bold uppercase tracking-widest text-xs text-brand-red mb-1">Outcome</dt>
                    <dd className="text-zinc-900 font-medium leading-relaxed">{b.outcome}</dd>
                  </div>
                </dl>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Proof points strip */}
        <section className="mb-16">
          <h2 className="mb-10 text-3xl font-bold text-zinc-900 md:text-4xl">Proof points</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {proofPoints.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-zinc-100 bg-white p-6"
              >
                <div className="mb-2 text-3xl md:text-4xl font-bold text-gradient">{p.value}</div>
                <div className="text-sm text-zinc-500 leading-snug">{p.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-20 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Let's make your numbers the next case study
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div>
    <div className="mb-1 text-3xl font-bold text-zinc-900">{value}</div>
    <div className="text-xs text-zinc-500 uppercase tracking-widest">{label}</div>
  </div>
);
