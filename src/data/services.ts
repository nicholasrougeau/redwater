import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  Search,
  Database,
  MessageSquare,
  Reply,
  MessagesSquare,
  Globe,
  FileText,
  LineChart,
  Presentation,
  Code2,
  Wrench,
  UserPlus,
  BarChart3,
  Send,
  PenSquare,
  Tags,
  Star,
  Repeat,
  Film,
  Image as ImageIcon,
  CalendarClock,
  Sparkles,
  BookOpen,
  TrendingUp,
  Compass,
  Hash,
  FileSearch,
  Inbox,
  ClipboardList,
  Boxes,
} from 'lucide-react';

export interface Bucket {
  slug: string;
  title: string;
  intro: string;
}

export interface Service {
  slug: string;
  bucket: string;
  title: string;
  tagline: string;
  outcome: string;
  icon: LucideIcon;
  description: string;
  deliverables: string[];
  idealFor: string[];
}

export const BUCKETS: Bucket[] = [
  { slug: 'bundled', title: 'Full-Stack System', intro: 'One system, unlimited support, zero duct tape.' },
  { slug: 'outreach', title: 'Outreach & Lead Gen', intro: 'Cold email, content, and newsletters — the inbound + outbound engine.' },
  { slug: 'website-sales-assets', title: 'Website & Sales Assets', intro: 'Everything that closes the deal once the lead shows up.' },
  { slug: 'custom-automation', title: 'AI Consulting & Engineering', intro: 'Training, custom skills, and systems built around how you actually run.' },
  { slug: 'seo-content-ops', title: 'SEO & Visibility', intro: 'Rank higher. Earn traffic. Protect your reputation.' },
  { slug: 'content-video', title: 'Content & Video Production', intro: 'Convert one piece of work into a month of content.' },
  { slug: 'research-intelligence', title: 'Research & Intelligence', intro: "Know what's happening before your competitors do." },
];

export const SERVICES: Service[] = [
  // Bundled / Retainer
  {
    slug: 'full-stack-agency-operator',
    bucket: 'bundled',
    title: 'Full-Stack System',
    tagline: 'Bundled retainer',
    outcome:
      'Outreach, CRM, reporting, content, and onboarding — one system, unlimited support, zero duct tape.',
    icon: Boxes,
    description:
      "Every revenue-facing system under one retainer. Outreach running daily, CRM kept clean, weekly reports shipping, content published, clients onboarded without you touching a form. One team, one invoice, no subcontractor roulette.",
    deliverables: [
      'Cold email + lead scraping + follow-up nurture running daily',
      'CRM + pipeline dashboards updated in real time',
      'Content pipeline — blog, newsletter, and social posts publishing on cadence',
      'Weekly client reports generated and sent on your cadence',
      'Onboarding automation — contract to kickoff without manual steps',
      'Monthly strategy review and backlog triage',
    ],
    idealFor: [
      'Agencies doing $30k–$250k/mo who still run on Zapier and vibes',
      'Consultants who want an ops team without hiring one',
      'Founders who refuse to be the bottleneck anymore',
    ],
  },

  // Outreach & Lead Gen
  {
    slug: 'cold-email-infrastructure',
    bucket: 'outreach',
    title: 'Cold Email Infrastructure',
    tagline: 'Inbox-first cold email',
    outcome:
      'Deliverable inboxes, warmed domains, and sequences that book calls — not spam folders.',
    icon: Mail,
    description:
      'We set up the inbox stack nobody wants to touch — domains, DNS, warm-up, throttling — and load in sequences that land in the inbox. You get booked calls, not bounces.',
    deliverables: [
      'Domain + DNS setup with SPF / DKIM / DMARC',
      '10–40 warmed secondary inboxes across domains',
      'Copy-tested 3-step sequence loaded in Instantly',
      'Weekly deliverability + reply-rate reporting',
    ],
    idealFor: [
      'Service businesses with a clear ICP and a $3k+ offer',
      'Anyone who stopped cold email after deliverability fell off',
      'Founders who want a channel that prints meetings on demand',
    ],
  },
  {
    slug: 'lead-scraping-enrichment',
    bucket: 'outreach',
    title: 'Lead Scraping & Enrichment',
    tagline: 'ICP lists, verified',
    outcome:
      'Pull your ICP from LinkedIn or Maps, verify emails, drop them straight into your campaigns.',
    icon: Search,
    description:
      'Tell us the ICP once. We pull the list from LinkedIn Sales Navigator or Google Maps, verify each email, and hand it over clean — ready to load into Instantly or whatever stack you run.',
    deliverables: [
      'ICP-matched lead list (500–5,000/week)',
      'Verified emails via AnyMailFinder',
      'CSV + direct Instantly import',
      'Dedupe against your existing CRM',
    ],
    idealFor: [
      'Outbound teams burning hours on manual list-building',
      'Agencies pitching niche verticals',
      'Anyone who needs volume without sacrificing accuracy',
    ],
  },
  {
    slug: 'follow-up-nurture',
    bucket: 'outreach',
    title: 'Context-Aware Follow-Up Nurture',
    tagline: 'Automatic follow-ups',
    outcome:
      'Follow-ups that read the thread and respond like a human — so pending leads stop going cold.',
    icon: Reply,
    description:
      'Most leads die in the follow-up gap. We wire in a nurture agent that reads the thread history and pings back at the right interval, in your voice, without you touching a draft.',
    deliverables: [
      'Thread-aware follow-up agent tied to your Gmail',
      'Sequence cadence tuned to your sales cycle',
      'Voice-matched drafts for each reply',
      'Dashboard showing which leads are waiting on you',
    ],
    idealFor: [
      'Founders with 30+ pending threads older than a week',
      'Sales reps who forget to circle back',
      'Anyone who wants fewer leads slipping through',
    ],
  },
  {
    slug: 'ai-inbox-auto-reply',
    bucket: 'outreach',
    title: 'AI Inbox Auto-Reply',
    tagline: 'First-touch responses',
    outcome:
      'First-touch replies drafted against your knowledge base while you sleep.',
    icon: MessageSquare,
    description:
      'Every inbound email gets a drafted reply within minutes, grounded in your knowledge base and services doc. You review and hit send. Response time drops from days to minutes.',
    deliverables: [
      'Knowledge base loaded from your docs + site + FAQs',
      'Gmail integration with auto-drafted replies',
      'Escalation rules for pricing / scope / legal questions',
      'Weekly tuning based on what you edit',
    ],
    idealFor: [
      'Solo operators drowning in inbound',
      'Coaches + consultants with repetitive top-of-funnel questions',
      'Anyone whose reply time is a pipeline bottleneck',
    ],
  },
  {
    slug: 'linkedin-dm-automation',
    bucket: 'outreach',
    title: 'LinkedIn DM Response Automation',
    tagline: 'On-voice LinkedIn replies',
    outcome:
      "Short, on-voice responses to inbound LinkedIn DMs at scale — no 'AI tone'.",
    icon: MessagesSquare,
    description:
      "LinkedIn DMs pile up fast when content works. We draft short, casual, human replies to every inbound — the kind that don't smell like GPT — and surface the ones that need your actual attention.",
    deliverables: [
      'DM monitoring across your LinkedIn account',
      'Voice-matched reply drafts for approval',
      'Filter for compliments / thanks / actual sales questions',
      'Slack notification for high-intent threads',
    ],
    idealFor: [
      'Creators posting on LinkedIn with heavy inbound DMs',
      'Founders running outbound on LinkedIn',
      'Anyone letting DMs rot because they all read the same',
    ],
  },

  // Website & Sales Assets
  {
    slug: 'full-website-build',
    bucket: 'website-sales-assets',
    title: 'Full Website Build & Deploy',
    tagline: 'Marketing sites that convert',
    outcome: 'High-fidelity marketing sites shipped in days, not months.',
    icon: Globe,
    description:
      "React + Tailwind marketing sites built around your actual offer — not a template. Shipped fast, deployed on infra you own, wired to forms and analytics on day one.",
    deliverables: [
      'Custom design + build (React / Vite / Tailwind)',
      'Copy structured around your offer and ICP',
      'Deployed to Netlify or GitHub Pages on your domain',
      'Contact form + analytics + sitemap out of the box',
    ],
    idealFor: [
      'Agencies and consultants outgrowing a Squarespace site',
      'Founders launching a new offer and needing a sharp landing',
      'Anyone whose current site underpriced their work',
    ],
  },
  {
    slug: 'animated-proposals',
    bucket: 'website-sales-assets',
    title: 'Animated Proposal Websites',
    tagline: 'Cinematic proposals',
    outcome: 'Animated proposal sites that confirm your expertise.',
    icon: FileText,
    description:
      "Ditch the PDF. We turn your proposal into a scrolling, animated website prospects share internally — and close before the next meeting.",
    deliverables: [
      'Scroll animations built around your proposal',
      'Live deploy on a one-off URL per client',
      'Branded to match your voice + design system',
      'Optional PDF export for procurement',
    ],
    idealFor: [
      'Agencies selling $10k+ engagements',
      'Consultants pitching board-level buyers',
      'Anyone tired of Google Doc proposals',
    ],
  },
  {
    slug: 'animated-client-progress-reports',
    bucket: 'website-sales-assets',
    title: 'Automated Client Progress Reports',
    tagline: 'Weekly WOW for clients',
    outcome: 'Branded, animated weekly reports that keep clients bought-in.',
    icon: LineChart,
    description:
      "The thing that keeps clients from churning is remembering the value you deliver. We ship a weekly animated progress page per client — branded, scroll-animated, one link they actually open.",
    deliverables: [
      'Per-client branded report template',
      'Weekly update flow: pastes in → site updates',
      'PDF snapshot + Gmail draft to client',
      'Slack ping to you when report is ready',
    ],
    idealFor: [
      'Agencies running monthly retainers',
      'Consultants managing multiple client engagements',
      'Anyone losing clients who forget why they pay you',
    ],
  },
  {
    slug: 'pitch-deck-pptx',
    bucket: 'website-sales-assets',
    title: 'Pitch Deck / PPTX Generation',
    tagline: 'Decks on demand',
    outcome: 'Brand-aware decks and PPTX exports generated from a single prompt.',
    icon: Presentation,
    description:
      "A branded deck system that produces on-voice PPTX decks in minutes — not days. Reuse layouts, swap content, ship decks without a designer in the loop.",
    deliverables: [
      'Brand + tone-of-voice files configured',
      'Layout cookbook tailored to your decks',
      'Prompt-to-PPTX pipeline for sales + internal decks',
      'LinkedIn carousel export pipeline included',
    ],
    idealFor: [
      'Founders pitching often',
      'Agencies producing client decks weekly',
      'Anyone stuck re-styling the same template',
    ],
  },

  // Custom Automation & Engineering
  {
    slug: 'claude-code-consulting',
    bucket: 'custom-automation',
    title: 'Claude Code Consulting & Team Onboarding',
    tagline: 'Adopt Claude Code',
    outcome: 'Leverage Claude Code to strategize and ship custom software for your business.',
    icon: Code2,
    description:
      "We come in, audit how your team ships, and set up Claude Code with the right skills, hooks, and guardrails. Your engineers move 3–5x faster within weeks, with fewer costly mistakes.",
    deliverables: [
      'Claude Code setup across your team',
      'Skills + hooks + permissions configured',
      'Internal playbooks for safe usage',
      'Team training sessions + office hours',
    ],
    idealFor: [
      'Engineering teams of 3–30 adopting AI tooling',
      'CTOs worried about review burden',
      'Founders who want velocity without chaos',
    ],
  },
  {
    slug: 'custom-claude-skills',
    bucket: 'custom-automation',
    title: 'Custom AI Skill Development',
    tagline: 'Skills tailored to your workflow',
    outcome: 'Custom skills that encode your playbook so AI runs it the same way every time.',
    icon: Wrench,
    description:
      "Every team has a few workflows worth encoding: the way you scope, the way you ship, the way you report. We build custom Claude skills that run them the same way every time, for any team member.",
    deliverables: [
      'Workflow discovery + spec',
      'Custom SKILL.md + supporting scripts',
      'Integration with your tooling (Slack, Gmail, Supabase, etc.)',
      'Documentation + rollout across the team',
    ],
    idealFor: [
      'Teams with repeatable internal processes',
      'Agencies standardizing delivery',
      'Founders tired of explaining the same steps twice',
    ],
  },
  {
    slug: 'custom-crm-build',
    bucket: 'custom-automation',
    title: 'Custom CRM Build',
    tagline: 'Your own CRM',
    outcome: 'A CRM shaped to your pipeline — not the other way around.',
    icon: Database,
    description:
      "HubSpot forces you into its model of how sales work. We build a CRM around how you actually sell — stages, fields, automations — running on Supabase + a dashboard you control.",
    deliverables: [
      'Schema designed around your pipeline',
      'Inline-editable dashboard UI',
      'Automated stage transitions + reminders',
      'Deploy on Vercel / Supabase you own',
    ],
    idealFor: [
      'Agencies running a non-standard sales process',
      'Founders hitting HubSpot pricing walls',
      'Anyone whose CRM fights them daily',
    ],
  },
  {
    slug: 'client-onboarding-automation',
    bucket: 'custom-automation',
    title: 'Client Onboarding Automation',
    tagline: 'Onboard in minutes',
    outcome: "Contract-to-kickoff automation — new clients are live before their check clears.",
    icon: UserPlus,
    description:
      "The first week with a new client should feel tight, not chaotic. We wire the contract-to-kickoff flow — intake, access, accounts, kickoff email, first deliverable — so onboarding runs itself.",
    deliverables: [
      'Contract + intake form',
      'Automated access provisioning (Gmail, Slack, shared drives)',
      'Kickoff email sequence',
      'First-deliverable handoff within 72 hours',
    ],
    idealFor: [
      'Agencies losing time in the first week of each engagement',
      'Consultants with messy intake processes',
      'Founders whose onboarding is all in their head',
    ],
  },
  {
    slug: 'client-reporting-automation',
    bucket: 'custom-automation',
    title: 'Client Reporting Automation',
    tagline: 'Weekly reports, no work',
    outcome: "Weekly client reports generated, reviewed, and sent with a single command.",
    icon: BarChart3,
    description:
      "Client reports are what keep renewals alive and what nobody wants to write. We automate the whole loop — pull data, draft narrative, brand it, ship it — so reports never slip again.",
    deliverables: [
      'Data pulls from your stack (GA, Ads, CRM, etc.)',
      'Auto-drafted weekly narrative in your voice',
      'Branded report template',
      'Gmail draft + Slack approval flow',
    ],
    idealFor: [
      'Agencies on monthly retainers',
      'Consultants tracking KPIs for execs',
      'Anyone who writes reports on Friday at 6pm',
    ],
  },
  {
    slug: 'newsletter-sequences',
    bucket: 'custom-automation',
    title: 'Newsletter Sequences',
    tagline: 'Automated newsletters',
    outcome: "Source → draft → review → send. Newsletters that run themselves.",
    icon: Send,
    description:
      "Pick a source (podcast, YouTube, Slack thread) and the pipeline produces a newsletter draft, loads it into ConvertKit or your ESP, and pings you for approval. You edit. It sends.",
    deliverables: [
      'Source-to-draft pipeline',
      'Drafts loaded into ConvertKit / Beehiiv / etc.',
      'Voice-matched writing rules',
      'Weekly schedule + analytics loop',
    ],
    idealFor: [
      'Creators + operators with a weekly newsletter',
      'Agencies doing content for clients',
      'Founders who keep skipping newsletter weeks',
    ],
  },

  // SEO & Content Ops
  {
    slug: 'blog-automation',
    bucket: 'seo-content-ops',
    title: 'Keyword-Researched Blog Automation',
    tagline: 'SEO blog on autopilot',
    outcome:
      'Keyword research → draft → approval → publish. Built on research flows already deployed for 7-figure businesses.',
    icon: PenSquare,
    description:
      "SEO blog without the content farm feel. We run keyword research, build topical clusters, and ship on-brand drafts into your CMS on a schedule — with your approval as the only required step.",
    deliverables: [
      'Keyword research + cluster plan',
      'Weekly drafts loaded into WordPress / Webflow / Ghost',
      'On-brand voice configured',
      'Publish schedule + ranking reporting',
    ],
    idealFor: [
      'Service businesses that want inbound SEO',
      'Agencies running blogs for clients',
      'Founders whose blog has gone dark',
    ],
  },
  {
    slug: 'seo-meta-automation',
    bucket: 'seo-content-ops',
    title: 'SEO Metadata Automation',
    tagline: 'Meta tags at scale',
    outcome: "Auto-generated SEO meta across dozens of sites — for agencies managing WordPress/Elementor fleets.",
    icon: Tags,
    description:
      "Agencies managing 30+ WordPress/Elementor sites spend hours a month on meta titles and descriptions. We automate the whole fleet: meta generated on publish, aligned with keyword strategy, written in the client's voice.",
    deliverables: [
      'AIOSEO / Rank Math integration',
      'Bulk meta generation across site fleet',
      'Voice + keyword alignment per client',
      'Monthly audit + regeneration on drift',
    ],
    idealFor: [
      'Agencies managing 20+ client sites',
      'SEO teams running WordPress at scale',
      'Anyone losing revenue to bad meta',
    ],
  },
  {
    slug: 'review-automation',
    bucket: 'seo-content-ops',
    title: 'Review Automation',
    tagline: 'Reviews + responses',
    outcome: 'Auto-request reviews from happy clients and reply to every new one in-brand.',
    icon: Star,
    description:
      "Every satisfied client gets an automatic review request at the right moment. Every new review gets a voice-matched response within the hour. Your reputation flow runs without you touching it.",
    deliverables: [
      'Post-project review request automation',
      'Auto-drafted responses to new reviews',
      'Google Business Profile + Yelp integration',
      'Weekly review digest in Slack',
    ],
    idealFor: [
      'Local service businesses ranking on Google',
      'Agencies managing reputation for clients',
      'Anyone whose review count stalled',
    ],
  },

  // Content & Video Production
  {
    slug: 'content-repurposing-pipeline',
    bucket: 'content-video',
    title: 'Content Repurposing Pipeline',
    tagline: '1 video → 30 posts',
    outcome: 'One transcript in, blog + 10–15 posts + images out. Pennies per run.',
    icon: Repeat,
    description:
      "One longform recording becomes a blog post, a newsletter, and 10–15 platform-native social posts — each with its own image, written in your voice, scheduled to avoid overlap. Runs for pennies.",
    deliverables: [
      'Transcript → blog + newsletter + 10–15 social posts',
      'Unique image per post',
      'Platform captions (FB / LinkedIn / IG)',
      'Latin-square scheduling across platforms',
    ],
    idealFor: [
      'Creators publishing weekly longform',
      'Founders with podcast or YouTube output',
      'Agencies doing content for high-volume clients',
    ],
  },
  {
    slug: 'custom-analytics-dashboard',
    bucket: 'content-video',
    title: 'Custom Analytics Dashboard',
    tagline: 'YouTube + your KPIs',
    outcome: "A dashboard that reads your data + your strategy and tells you what to fix.",
    icon: BarChart3,
    description:
      "Analytics you look at, not just collect. We build a custom dashboard pulling YouTube + social + revenue data, layered with your strategy doc so the dashboard itself tells you what to fix next.",
    deliverables: [
      'Data pipeline from YouTube / Ads / Supabase / etc.',
      'Dashboard UI with your KPIs',
      'Strategy-aware commentary per view',
      'Daily / weekly snapshot emails',
    ],
    idealFor: [
      'Creators + agencies with data spread across 5 tools',
      'Founders making decisions on feel, not numbers',
      'Anyone whose reporting is a pile of screenshots',
    ],
  },
  {
    slug: 'youtube-shorts-automation',
    bucket: 'content-video',
    title: 'YouTube Shorts Automation',
    tagline: 'Shorts from longform',
    outcome: 'Auto-cut vertical shorts from your longform videos, ready to ship daily.',
    icon: Film,
    description:
      "Longform → 5–10 vertical shorts per episode, auto-cut, captioned, and ready to post. Your shorts channel goes from idle to daily without hiring an editor.",
    deliverables: [
      'Auto-clipping pipeline (Vizard + custom logic)',
      'Captions + vertical reframe',
      'Thumbnail generation per short',
      'Scheduling to YouTube / IG / TikTok',
    ],
    idealFor: [
      'Podcasters + longform YouTubers',
      'Creators with footage but no editor',
      'Agencies running shorts for clients',
    ],
  },
  {
    slug: 'thumbnail-generation',
    bucket: 'content-video',
    title: 'Thumbnail Generation',
    tagline: 'Face-swapped thumbnails',
    outcome: 'Variant thumbnails generated on-brand, in your face, in minutes.',
    icon: ImageIcon,
    description:
      "Thumbnail testing without a thumbnail artist. We take a viral template, swap your face onto it, generate 3–5 variants, and pick the highest-CTR option automatically.",
    deliverables: [
      'Face-swap pipeline (Nano Banana / Gemini)',
      '3–5 variants per video',
      'On-brand color + typography',
      'CTR-based selection loop',
    ],
    idealFor: [
      'YouTubers testing thumbnails weekly',
      'Creators without a designer on retainer',
      "Anyone whose thumbnails look like everyone else's",
    ],
  },
  {
    slug: 'auto-scheduling',
    bucket: 'content-video',
    title: 'Auto-Scheduling',
    tagline: 'Latin-square post scheduling',
    outcome: 'Multi-platform scheduling that spreads your content without overlap.',
    icon: CalendarClock,
    description:
      "Multi-platform scheduling that never drops the same post on two platforms the same day. Built on Latin-square rotation so every post gets a real airing across your channels.",
    deliverables: [
      'Postiz / Buffer integration',
      'Latin-square rotation across platforms',
      'Smart time-of-day per platform',
      'Google Sheet log with post previews',
    ],
    idealFor: [
      'Creators posting daily across 3+ platforms',
      'Agencies running social for clients',
      'Anyone with a full content queue and no schedule',
    ],
  },
  {
    slug: 'ai-image-generation',
    bucket: 'content-video',
    title: 'AI Image Generation',
    tagline: 'On-brand images',
    outcome: "Brand-consistent images for social, blog, and slides — generated from a prompt.",
    icon: Sparkles,
    description:
      "Stop renting stock and stop hiring freelance illustrators for blog headers. Brand-locked prompt pipeline generates images that look like you every time.",
    deliverables: [
      'Brand style + reference images configured',
      'Prompt-to-image pipeline (Nano Banana / DALL-E)',
      'Batch image generation for blog / social',
      'Slide-compatible image variants',
    ],
    idealFor: [
      'Agencies producing a lot of content',
      'Creators tired of generic stock',
      'Founders who want consistent brand imagery',
    ],
  },

  // Research & Intelligence
  {
    slug: 'literature-deep-research',
    bucket: 'research-intelligence',
    title: 'Automated Deep Research',
    tagline: 'Research agents, not a research hire',
    outcome: 'Automated research agents synthesize academic, web, and forum sources into briefs you can act on.',
    icon: BookOpen,
    description:
      "Deep research as an agent, not a service. Academic papers, web search, niche forums — all synthesized into a single brief you can use to make a decision, write a keynote, or launch a product. Runs automatically, not by the hour.",
    deliverables: [
      'PubMed / academic search',
      'Web + forum + Reddit synthesis',
      'Cited brief with action items',
      'Optional multi-agent review for rigor',
    ],
    idealFor: [
      'Creators writing at depth',
      'Founders entering new markets',
      'Consultants pitching specialized engagements',
    ],
  },
  {
    slug: 'youtube-competitor-tracking',
    bucket: 'research-intelligence',
    title: 'YouTube Competitor Tracking & Outliers',
    tagline: 'Viral pattern spotter',
    outcome: 'Daily tracking of competitor channels with breakout alerts.',
    icon: TrendingUp,
    description:
      "Daily crawl of competitor channels, surfacing the videos breaking out before they peak. You copy the hook, not the strategy.",
    deliverables: [
      'Tracked channel list',
      'Daily breakout detection',
      'Slack alert on outliers',
      'Weekly pattern digest',
    ],
    idealFor: [
      'YouTubers in competitive niches',
      'Agencies doing YT for clients',
      'Creators who want pattern-recognition without manual watching',
    ],
  },
  {
    slug: 'cross-niche-content-research',
    bucket: 'research-intelligence',
    title: 'Cross-Niche Content Research',
    tagline: 'Steal the hook, keep the niche',
    outcome: 'Mine adjacent niches for hooks and patterns you can bring back.',
    icon: Compass,
    description:
      "The hooks breaking out in fitness, finance, and lifestyle will work in your niche six months later. We mine adjacent niches and surface the transferable patterns before your competitors do.",
    deliverables: [
      'Adjacent-niche channel selection',
      'Outlier video detection',
      'Hook + structure extraction',
      'Weekly transferable-pattern digest',
    ],
    idealFor: [
      'Creators stuck in one niche',
      'Agencies needing fresh content angles',
      'Founders whose content looks like everyone else',
    ],
  },
  {
    slug: 'x-twitter-trend-monitoring',
    bucket: 'research-intelligence',
    title: 'X/Twitter Trend Monitoring',
    tagline: 'Trend pulse',
    outcome: "Real-time discourse monitoring on X for any topic you care about.",
    icon: Hash,
    description:
      "Filtered trend stream on X for the topics you care about — real-time discourse, filtered for signal. Post the take before the wave breaks.",
    deliverables: [
      'Topic list + keyword tuning',
      'Grok-powered X search',
      'Daily digest of emerging threads',
      'Slack alerts on breakouts',
    ],
    idealFor: [
      'Founders posting on X daily',
      'Agencies tracking client-relevant discourse',
      'Anyone who wants the zeitgeist without the doomscroll',
    ],
  },
  {
    slug: 'invoice-data-extraction',
    bucket: 'research-intelligence',
    title: 'Invoice Data Extraction',
    tagline: 'PDF invoices → JSON',
    outcome: "Extract structured data from PDF invoices — vendor, amount, date, line items.",
    icon: FileSearch,
    description:
      "Drop a folder of invoice PDFs in, get structured data extracted and auto-pushed to your CRM or accounting tool — vendor, amount, date, line items, tax. No manual entry.",
    deliverables: [
      'PDF → structured JSON pipeline',
      'Vendor + line-item extraction',
      'Auto-updates to CRM / QuickBooks / Xero / Sheets',
      'Error-flagging on unreadable docs',
    ],
    idealFor: [
      'Operators doing bookkeeping by hand',
      'Agencies consolidating client invoices',
      'Founders whose bookkeeper still uses a shoebox',
    ],
  },
  {
    slug: 'inbox-triage-labeling',
    bucket: 'custom-automation',
    title: 'Inbox Triage & Labeling',
    tagline: 'Auto-triaged Gmail',
    outcome: 'Auto-label emails into Action Required / Waiting On / Reference.',
    icon: Inbox,
    description:
      "Every unread email auto-labeled into Action Required, Waiting On, or Reference. Real messages surface. Newsletters and updates move out of the way.",
    deliverables: [
      'Gmail label taxonomy configured',
      'AI triage on unread email',
      'Auto-archive of low-priority mail',
      'Daily digest of labeled high-priority threads',
    ],
    idealFor: [
      'Operators with 100+ unread',
      'Founders doing email triage at midnight',
      'Anyone whose inbox is a todo list in disguise',
    ],
  },
  {
    slug: 'meeting-notes-action-items',
    bucket: 'custom-automation',
    title: 'Meeting Notes → Action Items',
    tagline: 'Call → tasks',
    outcome: "Turn meeting transcripts into structured action items with owners + deadlines.",
    icon: ClipboardList,
    description:
      "Paste a transcript, get back structured action items with owners and deadlines. Dropped into your PM tool of choice. No more 'did we decide that?' messages.",
    deliverables: [
      'Transcript → structured action items',
      'Owner + deadline extraction',
      'Export to Linear / Notion / Sheets',
      'Slack summary post-meeting',
    ],
    idealFor: [
      'Teams running long strategy calls',
      'Consultants running client working sessions',
      'Anyone losing decisions in the transcript',
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getBucket(slug: string): Bucket | undefined {
  return BUCKETS.find((b) => b.slug === slug);
}

export function servicesInBucket(bucketSlug: string): Service[] {
  return SERVICES.filter((s) => s.bucket === bucketSlug);
}
