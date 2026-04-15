import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { SEO } from '../lib/seo';

interface Service {
  title: string;
  outcome: string;
}

interface Bucket {
  slug: string;
  title: string;
  intro: string;
  services: Service[];
}

const featured: { title: string; tagline: string; outcome: string; bullets: string[] } = {
  title: 'Full-Stack Agency Operator',
  tagline: 'Bundled / Retainer',
  outcome:
    'One system that runs outreach, CRM, reporting, and onboarding end-to-end — so you stop paying four contractors to duct-tape it together.',
  bullets: [
    'Outreach engine (cold email + lead scraping + nurture)',
    'CRM + pipeline + reporting dashboard',
    'Client onboarding automation',
    'Weekly performance reports, auto-generated',
  ],
};

const buckets: Bucket[] = [
  {
    slug: 'outreach',
    title: 'Outreach & Lead Gen',
    intro: 'Fill the top of your pipeline without hiring an SDR.',
    services: [
      { title: 'Cold Email Infrastructure', outcome: 'Deliverable inboxes, warmed domains, and sequences that book calls — not spam folders.' },
      { title: 'Lead Scraping & Enrichment', outcome: 'Pull your ICP from LinkedIn/Maps, verify emails, drop them straight into your campaigns.' },
      { title: 'Context-Aware Follow-Up Nurture', outcome: 'Follow-ups that read the thread and respond like a human — so pending leads stop going cold.' },
      { title: 'AI Inbox Auto-Reply', outcome: 'First-touch replies drafted against your knowledge base while you sleep.' },
      { title: 'LinkedIn DM Response Automation', outcome: 'Short, on-voice responses to inbound LinkedIn DMs at scale — no "AI tone".' },
    ],
  },
  {
    slug: 'website-sales-assets',
    title: 'Website & Sales Assets',
    intro: 'Everything that closes the deal once the lead shows up.',
    services: [
      { title: 'Full Website Build & Deploy', outcome: 'High-fidelity marketing sites shipped in days, not quarters.' },
      { title: 'Animated Proposal Websites', outcome: 'Cinematic scrolling proposals that make prospects hit "accept" before the call ends.' },
      { title: 'Animated Client Progress Reports', outcome: 'Weekly branded progress pages that turn retention into a feature, not a scramble.' },
      { title: 'Pitch Deck / PPTX Generation', outcome: 'Brand-consistent decks generated from a brief, not designed from scratch every time.' },
    ],
  },
  {
    slug: 'automation-engineering',
    title: 'Custom Automation & Engineering',
    intro: 'Where the off-the-shelf tool ends, we build.',
    services: [
      { title: 'Claude Code Consulting & Team Onboarding', outcome: 'Get your team shipping with Claude Code in a week — skill architecture, workflows, and review loops.' },
      { title: 'Custom Claude Code Skill Development', outcome: 'Skills that encode your team\'s actual workflow — not a generic prompt wrapper.' },
      { title: 'Custom CRM Build', outcome: 'A CRM that fits how you actually sell — not how HubSpot thinks you should.' },
      { title: 'Client Onboarding Automation', outcome: 'Kickoff to first-deliverable without a single "can you resend that form?" email.' },
      { title: 'Client Reporting Automation', outcome: 'Weekly/monthly client reports assembled from your stack — zero manual copy-paste.' },
      { title: 'Newsletter Sequences', outcome: 'Evergreen and broadcast sequences that actually get opened, wired to your ESP of choice.' },
    ],
  },
  {
    slug: 'seo-content-ops',
    title: 'SEO & Content Ops',
    intro: 'Traffic systems that compound.',
    services: [
      { title: 'Keyword-Researched Blog Automation', outcome: 'Publishes researched posts your ICP actually searches for — with your voice, on your schedule.' },
      { title: 'SEO Meta Automation', outcome: 'Auto-generates titles, descriptions, and schema across dozens of sites — so meta stops being the bottleneck.' },
    ],
  },
  {
    slug: 'content-video',
    title: 'Content & Video Production',
    intro: 'Turn one recording into a month of distribution.',
    services: [
      { title: 'Content Repurposing Pipeline', outcome: 'One transcript → blog, newsletter, and 10+ platform-native social posts with matching images.' },
      { title: 'Custom Analytics Dashboard', outcome: 'YouTube + social + revenue stats in one page so you stop switching tabs to "check how we did".' },
      { title: 'YouTube Shorts Automation', outcome: 'Clip-worthy moments extracted, captioned, and queued — without a video editor.' },
      { title: 'Thumbnail Generation', outcome: 'On-brand thumbnails generated in seconds — face-swap templates, not stock renders.' },
      { title: 'Auto-Scheduling', outcome: 'Posts land on the right platform at the right time on a rotation you don\'t have to babysit.' },
      { title: 'AI Image Generation', outcome: 'Custom images at scale for blogs, socials, and ads — brand-consistent, zero licensing drama.' },
    ],
  },
  {
    slug: 'research-intelligence',
    title: 'Research & Intelligence',
    intro: 'Reasoning tools that make your team sharper, not just faster.',
    services: [
      { title: 'Literature / Deep Research', outcome: 'Long-form research briefs with cited sources — ready to ship, not ready to edit.' },
      { title: 'YouTube Competitor Tracking & Outliers', outcome: 'Daily watch on competitor channels, surfacing the videos breaking out before they peak.' },
      { title: 'Multi-Agent Consensus Analysis', outcome: 'Multiple agents argue a decision from opposing angles so you see the weak spot before you ship.' },
      { title: 'Cross-Niche Content Research', outcome: 'Pulls winning hooks and structures from adjacent industries so your content doesn\'t look like everyone else\'s.' },
      { title: 'X/Twitter Trend Monitoring', outcome: 'Real-time trend surfacing on topics you care about — filtered, not firehose.' },
      { title: 'Video-to-Action Extraction', outcome: 'YouTube tutorial → step-by-step checklist you can actually execute.' },
      { title: 'Invoice Data Extraction', outcome: 'PDFs in, clean structured data out — vendor, line items, totals, tax.' },
      { title: 'Inbox Triage & Labeling', outcome: 'AI reads every unread email and labels what actually needs you — the rest gets archived.' },
      { title: 'Meeting Notes → Action Items', outcome: 'Transcripts in, owners/deadlines/next steps out — before the call even ends.' },
    ],
  },
];

export const Services = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Services — Redwater Revenue"
        description="The full Redwater Revenue services catalog: outreach, websites, custom automation, SEO, content, and research systems. Custom-scoped. Projects from $500 to $10k+."
        path="/services"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">What we build.</h1>
          <p className="text-xl text-zinc-500">
            Seven buckets. One operating system. We scope each project to the outcome — not to a menu item.
          </p>
        </div>

        {/* Featured / Retainer */}
        <div id="retainer" className="mb-24 scroll-mt-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
            {featured.tagline}
          </div>
          <SpotlightCard className="!p-1 luxury-gradient">
            <div className="rounded-[calc(1.5rem-1px)] bg-zinc-900 p-10 md:p-16 text-white">
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">{featured.title}</h2>
              <p className="mb-10 max-w-3xl text-lg text-zinc-300">{featured.outcome}</p>
              <ul className="mb-10 grid gap-4 md:grid-cols-2">
                {featured.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-zinc-200">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
              >
                Scope the retainer
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SpotlightCard>
        </div>

        {/* Buckets */}
        <div className="space-y-24">
          {buckets.map((bucket, i) => (
            <motion.section
              key={bucket.slug}
              id={bucket.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="scroll-mt-32"
            >
              <div className="mb-10 flex items-end gap-6 border-b border-zinc-100 pb-6">
                <div className="font-display text-6xl font-black text-zinc-100 leading-none">
                  {String(i + 2).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="mb-2 text-3xl font-bold text-zinc-900 md:text-4xl">{bucket.title}</h2>
                  <p className="text-lg text-zinc-500">{bucket.intro}</p>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bucket.services.map((s) => (
                  <div
                    key={s.title}
                    className="rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5"
                  >
                    <h3 className="mb-3 text-lg font-bold text-zinc-900">{s.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{s.outcome}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Pricing framing */}
        <div className="mt-32 rounded-3xl border border-zinc-100 bg-zinc-50 p-10 md:p-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">Custom-scoped. Projects from $500 to $10k+.</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-500">
            No menu pricing. We scope each engagement to the outcome and the surface area — from a single skill build to a full-stack agency operator retainer.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Get a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
