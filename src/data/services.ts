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

export interface ServiceHighlight {
  metric: string;
  label: string;
}

export interface Service {
  slug: string;
  bucket: string;
  title: string;
  tagline: string;
  outcome: string;
  icon: LucideIcon;
  highlights: ServiceHighlight[];
  hook: string;
  details: string;
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
      'One operator running outreach, CRM, content, reporting, and onboarding — all under one monthly retainer.',
    icon: Boxes,
    highlights: [
      { metric: 'A–Z', label: 'Every revenue system, one team' },
      { metric: '0', label: 'Subcontractors or duct tape' },
      { metric: '1', label: 'Monthly invoice, unlimited support' },
    ],
    hook:
      'You stop being the bottleneck. Outreach runs daily, leads get followed up, content publishes on cadence, clients get weekly updates, and new clients are onboarded in 72 hours — all without you touching a form. One team, one retainer, no duct tape.',
    details:
      'We keep your CRM clean, ship weekly reports, publish blogs and newsletters, run cold email, respond to DMs, and move every deliverable through QA. You review, we execute.',
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
      'Send 300–2,000 personalized emails a day to your ideal clients — meetings on the calendar, not bounces.',
    icon: Mail,
    highlights: [
      { metric: '300+', label: 'Personalized emails / day' },
      { metric: 'A–Z', label: 'Domains, DNS, warm-up, copy' },
      { metric: '3+', label: 'High-intent leads / day at 1% reply' },
    ],
    hook:
      'Cold email that lands in the inbox and books real calls. At 300+ personalized sends per day and a 1% positive reply rate, you get 3+ high-intent leads on the calendar every business day — without hiring an SDR.',
    details:
      'We handle domains, DNS, SPF/DKIM/DMARC, 10–40 warmed secondary inboxes, copy testing, and sequence loading in Instantly. Weekly deliverability and reply-rate reporting land in your inbox.',
    deliverables: [
      'Domain + DNS setup with SPF / DKIM / DMARC',
      '10–40 warmed secondary inboxes across domains',
      'Copy-tested 3-step sequence loaded in Instantly',
      'Weekly deliverability + reply-rate reporting',
    ],
    idealFor: [
      'Service businesses with a clear offer at $3k+',
      'Teams serving a large total addressable market — remote or nationwide',
      'Anyone who needs predictable meeting flow without hiring out',
    ],
  },
  {
    slug: 'lead-scraping-enrichment',
    bucket: 'outreach',
    title: 'Lead Scraping & Enrichment',
    tagline: 'ICP lists, verified',
    outcome:
      'Pull thousands of your ideal clients from LinkedIn or Google Maps — verified and ready to contact.',
    icon: Search,
    highlights: [
      { metric: '2,000+', label: 'Verified leads / week' },
      { metric: '98%', label: 'Email deliverability after verify' },
      { metric: '0', label: 'Hours of manual list-building' },
    ],
    hook:
      'Tell us your ideal customer profile (ICP) once. We pull hundreds to thousands of matching leads from LinkedIn Sales Navigator or Google Maps, verify every email, and hand you a list ready to pitch — so you can spend time closing, not scraping.',
    details:
      'We source, verify via AnyMailFinder, dedupe against your CRM, and hand over a clean CSV or direct import to Instantly. Every list is matched to your brand voice-ready copy and platform of choice.',
    deliverables: [
      'ICP-matched lead list (500–5,000/week)',
      'Verified emails via AnyMailFinder',
      'CSV + direct Instantly import',
      'Dedupe against your existing CRM',
    ],
    idealFor: [
      'Outbound teams burning hours on manual list-building',
      'Agencies pitching niche verticals',
      'Anyone who needs outreach volume without sacrificing accuracy',
    ],
  },
  {
    slug: 'follow-up-nurture',
    bucket: 'outreach',
    title: 'Context-Aware Follow-Up Nurture',
    tagline: 'Automatic follow-ups',
    outcome:
      'Automatic follow-ups that read the thread and respond like a human — so pending leads convert into buyers.',
    icon: Reply,
    highlights: [
      { metric: '80%', label: 'Of sales come after the first follow-up' },
      { metric: '0', label: 'Drafts you have to write' },
      { metric: '100%', label: 'Of pending leads worked without you' },
    ],
    hook:
      "Most leads don't die from rejection — they die in the follow-up gap. 80% of sales happen after the first follow-up, yet pending threads rot in your inbox. We wire in a nurture agent that reads the thread, times the nudge right, and replies in your voice — so every lead converts or closes out.",
    details:
      'Thread-aware agent integrated with your email stack. Cadence tuned to your sales cycle, voice matched to your past replies, dashboard showing which leads are waiting on you versus waiting on them.',
    deliverables: [
      'Thread-aware follow-up agent tied to your Gmail',
      'Sequence cadence tuned to your sales cycle',
      'Voice-matched drafts for each reply',
      'Dashboard showing which leads are waiting on you',
    ],
    idealFor: [
      'High-inbound businesses juggling 30+ live threads',
      'Sales teams that forget to circle back',
      'Operators who want fewer deals lost to silence',
    ],
  },
  {
    slug: 'ai-inbox-auto-reply',
    bucket: 'outreach',
    title: 'AI Inbox Auto-Reply',
    tagline: 'First-touch responses',
    outcome:
      'Reply to every new lead inside 5 minutes — 5x more buyers on the back end, zero effort.',
    icon: MessageSquare,
    highlights: [
      { metric: '5×', label: 'Higher close rate at sub-5-min reply' },
      { metric: '<5 min', label: 'Average response time' },
      { metric: '24/7', label: 'Coverage while you sleep' },
    ],
    hook:
      'Speed-to-lead is the #1 predictor of closing. Prospects who get a personalized reply inside 5 minutes convert up to 5x more often than those who wait an hour. We start that sales conversation the moment they land — while you sleep.',
    details:
      'Every inbound email gets a drafted reply within minutes, grounded in your knowledge base and services doc. Works across Gmail, Outlook, or any email stack. Escalation rules flag pricing, scope, and legal questions for you to review.',
    deliverables: [
      'Knowledge base loaded from your docs + site + FAQs',
      'Email integration (Gmail, Outlook, any stack) with auto-drafted replies',
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
    title: 'Social DM Response Automation',
    tagline: 'On-brand replies, every platform',
    outcome:
      "Short, on-brand responses to inbound DMs across LinkedIn, Facebook, and Instagram — DMs don't rot, sales conversations start.",
    icon: MessagesSquare,
    highlights: [
      { metric: '3 platforms', label: 'LinkedIn + Facebook + Instagram' },
      { metric: '0', label: 'AI-tone responses — sounds like you' },
      { metric: '1 Slack ping', label: 'When a high-intent thread lands' },
    ],
    hook:
      'When content works, DMs pile up fast. Every ignored inbound is a missed buyer. We draft short, casual, on-brand replies to every new DM across your social accounts — fast enough to start the sales conversation, human enough to land.',
    details:
      'Monitors LinkedIn, Facebook, and Instagram inboxes, drafts replies in your voice, filters thanks/compliments from real sales questions, and pings you in Slack for high-intent threads.',
    deliverables: [
      'DM monitoring across LinkedIn, Facebook, and Instagram',
      'Voice-matched reply drafts for approval',
      'Filter for compliments / thanks / actual sales questions',
      'Slack notification for high-intent threads',
    ],
    idealFor: [
      'Creators posting on social with heavy inbound DMs',
      'Local businesses fielding questions on Facebook or Instagram',
      'Anyone letting DMs rot because they are too busy to keep up',
    ],
  },

  // Website & Sales Assets
  {
    slug: 'full-website-build',
    bucket: 'website-sales-assets',
    title: 'Full Website Build & Deploy',
    tagline: 'Marketing sites that convert',
    outcome: 'A high-converting website shipped in days — so new leads land on something that actually sells.',
    icon: Globe,
    highlights: [
      { metric: '7–14 days', label: 'From kickoff to live site' },
      { metric: '1', label: 'Stack you own — no rented builders' },
      { metric: '100%', label: 'Built around your offer, not a template' },
    ],
    hook:
      "Your website is the first thing buyers judge. A template site tells them you're average. We ship a custom React + Tailwind site structured around your offer and ICP, deployed on infra you own, wired to forms and analytics from day one — so leads convert the minute they land.",
    details:
      "We design and build with React, Vite, and Tailwind. Deployed to Netlify or GitHub Pages on your domain with a contact form, analytics, and sitemap configured out of the box. You own the code and the DNS.",
    deliverables: [
      'Custom design + build (React / Vite / Tailwind)',
      'Copy structured around your offer and ICP',
      'Deployed to Netlify or GitHub Pages on your domain',
      'Contact form + analytics + sitemap out of the box',
    ],
    idealFor: [
      'Consultants and agencies outgrowing a Squarespace or Wix site',
      'Founders launching a new offer and needing a sharp landing',
      'Anyone whose current site is leaving deals on the table',
    ],
  },
  {
    slug: 'animated-proposals',
    bucket: 'website-sales-assets',
    title: 'Animated Proposal Websites',
    tagline: 'Cinematic proposals',
    outcome: 'Proposals that close — a scrolling, animated site prospects share internally and say yes before the next meeting.',
    icon: FileText,
    highlights: [
      { metric: '1 link', label: 'Prospect gets instead of a PDF' },
      { metric: 'On-brand', label: 'Every page, every animation' },
      { metric: '$10k+', label: 'Typical engagement size closed' },
    ],
    hook:
      "Prospects don't forward PDFs. They forward things that look expensive. We turn your proposal into a scrolling, animated website — on-brand, one-off URL per client — so the buying team closes it together before the next meeting.",
    details:
      "Scroll-animated proposal built around your scope. Deployed on a one-off URL per client, branded to match your voice and design system. Optional PDF export for procurement teams that still require it.",
    deliverables: [
      'Scroll animations built around your proposal',
      'Live deploy on a one-off URL per client',
      'Branded to match your voice + design system',
      'Optional PDF export for procurement',
    ],
    idealFor: [
      'Agencies selling $10k+ engagements',
      'Consultants pitching board-level buyers',
      'Anyone whose proposals die in a forwarded PDF chain',
    ],
  },
  {
    slug: 'animated-client-progress-reports',
    bucket: 'website-sales-assets',
    title: 'Automated Client Progress Reports',
    tagline: 'Weekly WOW for clients',
    outcome: 'A branded, animated weekly update your clients actually open — so they remember the value and keep paying.',
    icon: LineChart,
    highlights: [
      { metric: '1x / week', label: 'Report shipped per client' },
      { metric: '1 link', label: 'Clients open and forward' },
      { metric: '0', label: 'Hours writing the same update twice' },
    ],
    hook:
      "Clients churn when they forget the value. We ship an animated, branded progress page per client every week — one link they actually open, forward to their boss, and remember why they pay you.",
    details:
      'Per-client branded template, weekly update flow (paste in the wins → site updates), PDF snapshot, Gmail draft to the client, and a Slack ping to you when the report is ready.',
    deliverables: [
      'Per-client branded report template',
      'Weekly update flow: pastes in → site updates',
      'PDF snapshot + Gmail draft to client',
      'Slack ping to you when report is ready',
    ],
    idealFor: [
      'Agencies running monthly retainers',
      'Consultants managing multiple client engagements',
      'Operators who keep losing clients to "what am I paying for?"',
    ],
  },
  {
    slug: 'pitch-deck-pptx',
    bucket: 'website-sales-assets',
    title: 'Pitch Deck / PPTX Generation',
    tagline: 'Decks on demand',
    outcome: 'Brand-aware PPTX decks generated from a prompt — ship sales decks, investor decks, and client decks without a designer.',
    icon: Presentation,
    highlights: [
      { metric: '< 5 min', label: 'From prompt to on-brand deck' },
      { metric: '1', label: 'Layout cookbook, infinite decks' },
      { metric: 'A–Z', label: 'Sales, investor, client, internal' },
    ],
    hook:
      "Decks are the asset everyone needs and nobody wants to build. We configure a brand + layout system and wire a prompt-to-PPTX pipeline — so any deck your team needs ships in minutes, on-brand, without a designer in the loop.",
    details:
      'Brand + tone-of-voice files configured, layout cookbook tailored to your decks, and a prompt-to-PPTX pipeline for sales and internal use. LinkedIn carousel export included in the same pipeline.',
    deliverables: [
      'Brand + tone-of-voice files configured',
      'Layout cookbook tailored to your decks',
      'Prompt-to-PPTX pipeline for sales + internal decks',
      'LinkedIn carousel export pipeline included',
    ],
    idealFor: [
      'Founders pitching investors or enterprise often',
      'Agencies producing client decks weekly',
      'Operators tired of restyling the same template',
    ],
  },

  // Custom Automation & Engineering
  {
    slug: 'claude-code-consulting',
    bucket: 'custom-automation',
    title: 'Claude Code Consulting & Team Onboarding',
    tagline: 'Adopt Claude Code',
    outcome: 'Your engineers ship 3–5x faster with Claude Code — guardrails, skills, and team training included.',
    icon: Code2,
    highlights: [
      { metric: '3–5×', label: 'Faster shipping inside weeks' },
      { metric: '0', label: 'Cowboy commits or silent regressions' },
      { metric: '1 team', label: 'All on the same playbook' },
    ],
    hook:
      "Your team already knows AI is a force multiplier. The problem is adopting it safely. We audit how your engineers ship, set up Claude Code with the right skills, hooks, and permissions, and train the team — so velocity goes up and review burden goes down.",
    details:
      'Claude Code installed across the team, skills and hooks configured for your repo, internal playbooks for safe usage, and training sessions plus office hours so engineers actually use it.',
    deliverables: [
      'Claude Code setup across your team',
      'Skills + hooks + permissions configured',
      'Internal playbooks for safe usage',
      'Team training sessions + office hours',
    ],
    idealFor: [
      'Engineering teams of 3–30 adopting AI tooling',
      'CTOs worried about review burden and silent regressions',
      'Founders who want velocity without chaos',
    ],
  },
  {
    slug: 'custom-claude-skills',
    bucket: 'custom-automation',
    title: 'Custom AI Skill Development',
    tagline: 'Skills tailored to your workflow',
    outcome: 'Encode your playbook into a custom AI skill — so any team member runs it the same way, every time.',
    icon: Wrench,
    highlights: [
      { metric: '1x', label: 'You document it — it runs forever' },
      { metric: '0', label: 'Training new hires on "how we do it"' },
      { metric: 'Anywhere', label: 'Slack, Gmail, Supabase, custom API' },
    ],
    hook:
      'Every team has a few workflows worth encoding — the way you scope, the way you ship, the way you report. We build custom Claude skills that run them the same way every time, for any team member, so the playbook stops living in your head.',
    details:
      'Workflow discovery and spec, custom SKILL.md and supporting scripts, integration with your tooling (Slack, Gmail, Supabase, GitHub, any API), and documentation plus rollout across the team.',
    deliverables: [
      'Workflow discovery + spec',
      'Custom SKILL.md + supporting scripts',
      'Integration with your tooling (Slack, Gmail, Supabase, etc.)',
      'Documentation + rollout across the team',
    ],
    idealFor: [
      'Teams with repeatable internal processes',
      'Agencies standardizing delivery across operators',
      'Founders tired of explaining the same steps twice',
    ],
  },
  {
    slug: 'custom-crm-build',
    bucket: 'custom-automation',
    title: 'Custom CRM Build',
    tagline: 'Your own CRM',
    outcome: 'A CRM shaped to how you actually sell — not the other way around.',
    icon: Database,
    highlights: [
      { metric: '1', label: 'Pipeline, your exact stages' },
      { metric: '$0', label: 'Per-seat pricing traps' },
      { metric: 'Owned', label: 'Your Supabase + Vercel, your data' },
    ],
    hook:
      "HubSpot forces you into its model of how sales work. We build a CRM around how you actually sell — custom stages, fields, and automations — running on Supabase and a dashboard you own. No seat fees, no pricing walls, no vendor lock-in.",
    details:
      'Schema designed around your pipeline, inline-editable dashboard UI, automated stage transitions and reminders, deployed to Vercel and Supabase you control. Migration from HubSpot / Pipedrive / Notion included.',
    deliverables: [
      'Schema designed around your pipeline',
      'Inline-editable dashboard UI',
      'Automated stage transitions + reminders',
      'Deploy on Vercel / Supabase you own',
    ],
    idealFor: [
      'Agencies running a non-standard sales process',
      'Founders hitting HubSpot pricing walls',
      'Operators whose CRM fights them daily',
    ],
  },
  {
    slug: 'client-onboarding-automation',
    bucket: 'custom-automation',
    title: 'Client Onboarding Automation',
    tagline: 'Onboard in minutes',
    outcome: 'New clients go from signed contract to first deliverable in 72 hours — no one chasing access or Slack invites.',
    icon: UserPlus,
    highlights: [
      { metric: '72 hrs', label: 'Contract to first deliverable' },
      { metric: '0', label: 'Manual steps you have to remember' },
      { metric: '1 flow', label: 'Every new client, same experience' },
    ],
    hook:
      "The first week with a new client sets the whole relationship. A messy intake costs you referrals and renewals. We wire the contract-to-kickoff flow — intake, access, accounts, kickoff email, first deliverable — so onboarding runs itself and every client gets the premium experience.",
    details:
      'Contract and intake form, automated access provisioning (Gmail, Slack, shared drives, Notion), kickoff email sequence, and first-deliverable handoff inside 72 hours.',
    deliverables: [
      'Contract + intake form',
      'Automated access provisioning (Gmail, Slack, shared drives)',
      'Kickoff email sequence',
      'First-deliverable handoff within 72 hours',
    ],
    idealFor: [
      'Agencies losing time in the first week of each engagement',
      'Consultants with messy intake processes',
      'Founders whose onboarding lives entirely in their head',
    ],
  },
  {
    slug: 'client-reporting-automation',
    bucket: 'custom-automation',
    title: 'Client Reporting Automation',
    tagline: 'Weekly reports, no work',
    outcome: 'Weekly client reports generated, reviewed, and shipped with a single command — renewals stop slipping.',
    icon: BarChart3,
    highlights: [
      { metric: '1 click', label: 'To generate, review, send' },
      { metric: '5+ hrs/wk', label: 'Reclaimed per account manager' },
      { metric: '100%', label: 'Of reports shipped on time' },
    ],
    hook:
      "Reports are what keep renewals alive and what nobody wants to write. We automate the whole loop — pull data from your stack, draft a narrative in your voice, brand it, ship it — so reports never slip and your team stops writing on Friday at 6pm.",
    details:
      "Data pulls from Google Analytics, Ads, CRM, and any other source you track. Auto-drafted weekly narrative, branded template, Gmail draft with approval flow, and Slack ping when ready to send.",
    deliverables: [
      'Data pulls from your stack (GA, Ads, CRM, etc.)',
      'Auto-drafted weekly narrative in your voice',
      'Branded report template',
      'Gmail draft + Slack approval flow',
    ],
    idealFor: [
      'Agencies on monthly retainers with 5+ clients',
      'Consultants tracking KPIs for execs',
      'Operators who write reports at 6pm on Friday',
    ],
  },
  {
    slug: 'newsletter-sequences',
    bucket: 'custom-automation',
    title: 'Newsletter Sequences',
    tagline: 'Automated newsletters',
    outcome: 'Source → draft → review → send. A newsletter that runs itself — so your list actually hears from you.',
    icon: Send,
    highlights: [
      { metric: '1x / week', label: 'Draft in your inbox, ready to send' },
      { metric: '0 skipped', label: 'Weeks (the problem everyone has)' },
      { metric: 'Your voice', label: 'Trained on past newsletters' },
    ],
    hook:
      "The newsletter is the most durable channel you own — and the one that always falls off the calendar first. We pick a source (podcast, YouTube, Slack), auto-draft the newsletter in your voice, load it in ConvertKit / Beehiiv, and ping you for approval. You edit. It sends.",
    details:
      'Source-to-draft pipeline tied to your content, drafts loaded into ConvertKit / Beehiiv / MailerLite, voice-matched writing rules tuned on your past issues, and a weekly analytics loop so you see what hooks landed.',
    deliverables: [
      'Source-to-draft pipeline',
      'Drafts loaded into ConvertKit / Beehiiv / etc.',
      'Voice-matched writing rules',
      'Weekly schedule + analytics loop',
    ],
    idealFor: [
      'Creators + operators with a weekly newsletter',
      'Agencies writing newsletters for clients',
      'Founders who keep skipping newsletter weeks',
    ],
  },
  {
    slug: 'inbox-triage-labeling',
    bucket: 'custom-automation',
    title: 'Inbox Triage & Labeling',
    tagline: 'Auto-triaged Gmail',
    outcome: 'Every unread email auto-labeled — Action Required rises to the top, noise gets out of the way.',
    icon: Inbox,
    highlights: [
      { metric: '3 labels', label: 'Action / Waiting / Reference' },
      { metric: '100%', label: 'Of unread mail triaged nightly' },
      { metric: '1 digest', label: 'Priority threads, delivered daily' },
    ],
    hook:
      'Your inbox is a todo list in disguise. We run an AI triage agent across every unread email — labels the ones that need you now, files the ones that can wait, and archives the noise. Real messages surface. You stop starting the day in reactive mode.',
    details:
      'Gmail label taxonomy configured to your workflow, AI triage on unread email, auto-archive of low-priority mail, and a daily digest of high-priority threads in Slack or email.',
    deliverables: [
      'Gmail label taxonomy configured',
      'AI triage on unread email',
      'Auto-archive of low-priority mail',
      'Daily digest of labeled high-priority threads',
    ],
    idealFor: [
      'Operators with 100+ unread emails',
      'Founders triaging email at midnight',
      'Anyone whose inbox is running their day',
    ],
  },
  {
    slug: 'meeting-notes-action-items',
    bucket: 'custom-automation',
    title: 'Meeting Notes → Action Items',
    tagline: 'Call → tasks',
    outcome: "Transcripts become structured action items with owners and deadlines — so decisions don't die in the recording.",
    icon: ClipboardList,
    highlights: [
      { metric: '1 paste', label: 'Transcript in, tasks out' },
      { metric: '100%', label: 'Of decisions captured with owners' },
      { metric: 'Anywhere', label: 'Linear, Notion, Sheets, ClickUp' },
    ],
    hook:
      "Every long meeting ends with the same question: 'wait, did we decide that?' We turn any transcript into a structured list of action items — owners, deadlines, open questions — dropped straight into your PM tool. Decisions stick. Follow-ups happen.",
    details:
      'Paste a transcript (or auto-pull from Fathom / Otter / Fireflies), get back structured action items with owners and deadlines, exported to Linear / Notion / Sheets / ClickUp, plus a Slack summary posted post-meeting.',
    deliverables: [
      'Transcript → structured action items',
      'Owner + deadline extraction',
      'Export to Linear / Notion / Sheets',
      'Slack summary post-meeting',
    ],
    idealFor: [
      'Teams running long strategy calls',
      'Consultants in client working sessions',
      'Operators losing decisions in the transcript',
    ],
  },

  // SEO & Content Ops
  {
    slug: 'blog-automation',
    bucket: 'seo-content-ops',
    title: 'Keyword-Researched Blog Automation',
    tagline: 'SEO blog on autopilot',
    outcome:
      'Keyword research → draft → approval → publish. A real SEO blog that ships weekly without a content team.',
    icon: PenSquare,
    highlights: [
      { metric: '50 hrs/wk', label: 'Saved vs. in-house content team' },
      { metric: '1x / week', label: 'Publish cadence, held without you' },
      { metric: '7-figure', label: 'Businesses already running this flow' },
    ],
    hook:
      "SEO blogs die because nobody wants to write them. We run keyword research, build topical clusters, and ship on-brand drafts straight into your CMS on a schedule — with your approval as the only required step. Same flow already deployed for 7-figure businesses.",
    details:
      'Keyword research and cluster plan built around your ICP, weekly drafts loaded into WordPress / Webflow / Ghost, on-brand voice configured from past content, and ranking reports in your inbox every week.',
    deliverables: [
      'Keyword research + cluster plan',
      'Weekly drafts loaded into WordPress / Webflow / Ghost',
      'On-brand voice configured',
      'Publish schedule + ranking reporting',
    ],
    idealFor: [
      'Service businesses wanting inbound SEO traffic',
      'Agencies running blogs for clients',
      'Founders whose blog has gone dark for months',
    ],
  },
  {
    slug: 'seo-meta-automation',
    bucket: 'seo-content-ops',
    title: 'SEO Metadata Automation',
    tagline: 'Meta tags at scale',
    outcome: "Auto-generated SEO meta across an entire WordPress fleet — so you stop paying someone to write meta titles by hand.",
    icon: Tags,
    highlights: [
      { metric: '30+ sites', label: 'Meta generated fleet-wide' },
      { metric: '4 fields', label: 'Title, description, keywords, focus KW' },
      { metric: '1 click', label: 'From publish to optimized meta' },
    ],
    hook:
      "Agencies managing 30+ WordPress and Elementor sites burn hours a month on meta titles and descriptions. We automate the whole fleet — meta generated on publish, aligned with keyword strategy, written in each client's voice — so your SEO team stops doing data entry.",
    details:
      'AIOSEO or Rank Math integration, bulk meta generation across the fleet, voice and keyword alignment per client, and a monthly audit that regenerates anything that drifted.',
    deliverables: [
      'AIOSEO / Rank Math integration',
      'Bulk meta generation across site fleet',
      'Voice + keyword alignment per client',
      'Monthly audit + regeneration on drift',
    ],
    idealFor: [
      'Agencies managing 20+ client WordPress sites',
      'SEO teams running WordPress at scale',
      'Operators losing revenue to bad meta',
    ],
  },
  {
    slug: 'review-automation',
    bucket: 'seo-content-ops',
    title: 'Review Automation',
    tagline: 'Reviews + responses',
    outcome: 'Ask every happy client for a review. Reply to every new review in-brand. Your reputation flow runs itself.',
    icon: Star,
    highlights: [
      { metric: '2.4 → 4.2', label: 'Client rating lift in 3 weeks (real result)' },
      { metric: '100%', label: 'Of new reviews replied to' },
      { metric: '0', label: 'Hours you spend on it' },
    ],
    hook:
      "A higher review score is the fastest compounding asset a local business has. We auto-request a review from every satisfied client at the right moment, then reply to every new review in your voice within the hour — so your rating rises, your SEO rises, and your inbound flow rises with it.",
    details:
      "Post-project review request automation, auto-drafted responses to new reviews, Google Business Profile and Yelp integration, and a weekly review digest posted to Slack.",
    deliverables: [
      'Post-project review request automation',
      'Auto-drafted responses to new reviews',
      'Google Business Profile + Yelp integration',
      'Weekly review digest in Slack',
    ],
    idealFor: [
      'Local service businesses competing on Google',
      'Agencies managing reputation for local clients',
      'Operators whose review count stalled out',
    ],
  },

  // Content & Video Production
  {
    slug: 'content-repurposing-pipeline',
    bucket: 'content-video',
    title: 'Content Repurposing Pipeline',
    tagline: '1 video → 30 posts',
    outcome: 'One transcript in — blog, newsletter, 10–15 social posts with unique images, all scheduled. Pennies per run.',
    icon: Repeat,
    highlights: [
      { metric: '1 → 30+', label: 'Pieces of content per recording' },
      { metric: '$0.50', label: 'Average cost per full run' },
      { metric: '0', label: 'Overlap — no post on two platforms same day' },
    ],
    hook:
      'One longform recording becomes a blog post, a newsletter, and 10–15 platform-native social posts — each with its own image, written in your voice, scheduled to avoid overlap. One afternoon of recording turns into a month of content.',
    details:
      'Transcript-to-everything pipeline with a 70/20/10 hook ratio across posts, unique AI-generated image per post, Facebook / LinkedIn / Instagram captions, and Latin-square scheduling so no post hits two platforms the same day.',
    deliverables: [
      'Transcript → blog + newsletter + 10–15 social posts',
      'Unique image per post',
      'Platform captions (FB / LinkedIn / IG)',
      'Latin-square scheduling across platforms',
    ],
    idealFor: [
      'Creators publishing weekly longform',
      'Founders with podcast or YouTube output',
      'Agencies running content for high-volume clients',
    ],
  },
  {
    slug: 'custom-analytics-dashboard',
    bucket: 'content-video',
    title: 'Custom Analytics Dashboard',
    tagline: 'YouTube + your KPIs',
    outcome: "A dashboard that reads your data plus your strategy and tells you what to fix — analytics you actually use.",
    icon: BarChart3,
    highlights: [
      { metric: '1 dashboard', label: 'Replaces 5 separate tools' },
      { metric: '1x / day', label: 'Snapshot email with next actions' },
      { metric: 'Strategy-aware', label: 'Commentary, not just charts' },
    ],
    hook:
      "Most analytics dashboards tell you what happened. Yours should tell you what to do next. We build a dashboard pulling YouTube, ads, and revenue data, layered with your strategy doc — so every view answers 'what do I fix next week?' instead of 'huh, that's a number.'",
    details:
      'Data pipeline from YouTube / Ads / Supabase / GA4, dashboard UI wired to your KPIs, strategy-aware commentary per view, and daily or weekly snapshot emails with next actions called out.',
    deliverables: [
      'Data pipeline from YouTube / Ads / Supabase / etc.',
      'Dashboard UI with your KPIs',
      'Strategy-aware commentary per view',
      'Daily / weekly snapshot emails',
    ],
    idealFor: [
      'Creators + agencies with data spread across 5 tools',
      'Founders making decisions on feel, not numbers',
      'Operators whose reporting is a pile of screenshots',
    ],
  },
  {
    slug: 'youtube-shorts-automation',
    bucket: 'content-video',
    title: 'YouTube Shorts Automation',
    tagline: 'Shorts from longform',
    outcome: 'Auto-cut 5–10 vertical shorts per longform video — your shorts channel goes daily without an editor.',
    icon: Film,
    highlights: [
      { metric: '5–10', label: 'Vertical shorts per longform' },
      { metric: 'Daily', label: 'Shorts schedule, held automatically' },
      { metric: '0', label: 'Editor hours required' },
    ],
    hook:
      'Shorts are where new audiences discover you — and the reason most channels stall is pure editing drag. We auto-cut 5–10 vertical shorts per longform, captioned and ready to post, so your shorts channel runs daily without an editor.',
    details:
      'Auto-clipping pipeline (Vizard plus custom logic), captions and vertical reframe, thumbnail generation per short, and scheduling to YouTube / Instagram / TikTok on the right cadence per platform.',
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
    outcome: 'Variant thumbnails generated on-brand, in your face, in minutes — so your CTR stops costing you views.',
    icon: ImageIcon,
    highlights: [
      { metric: '3–5', label: 'Variants per video, auto-selected' },
      { metric: '< 10 min', label: 'From prompt to testable options' },
      { metric: '$0', label: 'Thumbnail artist on retainer' },
    ],
    hook:
      "Thumbnails decide whether your video gets watched. We take a proven template, swap your face onto it, generate 3–5 variants, and auto-select the highest-CTR option — so every upload ships with a thumbnail built on what's already working.",
    details:
      'Face-swap pipeline on Nano Banana / Gemini, 3–5 variants per video, on-brand color and typography, and a CTR-based selection loop that learns from your channel data.',
    deliverables: [
      'Face-swap pipeline (Nano Banana / Gemini)',
      '3–5 variants per video',
      'On-brand color + typography',
      'CTR-based selection loop',
    ],
    idealFor: [
      'YouTubers testing thumbnails weekly',
      'Creators without a designer on retainer',
      "Operators whose thumbnails look like everyone else's",
    ],
  },
  {
    slug: 'auto-scheduling',
    bucket: 'content-video',
    title: 'Auto-Scheduling',
    tagline: 'Latin-square post scheduling',
    outcome: 'Multi-platform scheduling that spreads your content without overlap — every post gets a real airing.',
    icon: CalendarClock,
    highlights: [
      { metric: '3+ platforms', label: 'Scheduled without overlap' },
      { metric: '1 queue', label: 'Feeds every channel' },
      { metric: '0', label: 'Same post on two platforms same day' },
    ],
    hook:
      "Cross-posting the same thing the same day is why people unfollow. We run Latin-square rotation across your platforms so every post gets a real airing — your followers see variety, your reach goes up, and your queue actually gets spent.",
    details:
      'Postiz or Buffer integration, Latin-square rotation across platforms, smart time-of-day per platform, and a Google Sheet log with post previews you can audit.',
    deliverables: [
      'Postiz / Buffer integration',
      'Latin-square rotation across platforms',
      'Smart time-of-day per platform',
      'Google Sheet log with post previews',
    ],
    idealFor: [
      'Creators posting daily across 3+ platforms',
      'Agencies running social for clients',
      'Operators with a full content queue and no schedule',
    ],
  },
  {
    slug: 'ai-image-generation',
    bucket: 'content-video',
    title: 'AI Image Generation',
    tagline: 'On-brand images',
    outcome: "Brand-consistent images for social, blog, and slides — generated from a prompt, without stock or freelancers.",
    icon: Sparkles,
    highlights: [
      { metric: '1 prompt', label: 'Infinite on-brand images' },
      { metric: '$0', label: 'Stock or freelance bills' },
      { metric: 'Consistent', label: 'Every image looks like you' },
    ],
    hook:
      "Stop renting stock and stop hiring freelance illustrators for blog headers. A brand-locked prompt pipeline generates images that look like you every single time — so your content ships without a design bottleneck.",
    details:
      'Brand style and reference images configured, prompt-to-image pipeline on Nano Banana / DALL-E, batch generation for blog and social, and slide-compatible image variants for decks.',
    deliverables: [
      'Brand style + reference images configured',
      'Prompt-to-image pipeline (Nano Banana / DALL-E)',
      'Batch image generation for blog / social',
      'Slide-compatible image variants',
    ],
    idealFor: [
      'Agencies producing high volumes of content',
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
    outcome: 'Academic + web + forum synthesis into a cited brief — research you can act on, not a research bill.',
    icon: BookOpen,
    highlights: [
      { metric: '1 brief', label: 'Synthesized, cited, ready to use' },
      { metric: 'Multi-source', label: 'PubMed, web, Reddit, niche forums' },
      { metric: '$0 / hour', label: 'No research retainer billed' },
    ],
    hook:
      "Deep research as an agent, not a service. Academic papers, web search, niche forums — all synthesized into a single cited brief you can use to make a decision, write a keynote, or launch a product. Runs automatically, not by the hour.",
    details:
      'PubMed and academic search, web and forum and Reddit synthesis, cited brief with action items, and an optional multi-agent review pass for rigor on high-stakes work.',
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
    outcome: 'Daily tracking of competitor channels with breakout alerts — copy the hook before the wave peaks.',
    icon: TrendingUp,
    highlights: [
      { metric: 'Daily', label: 'Channel scan across your competitor set' },
      { metric: '1 Slack ping', label: 'Per real breakout detected' },
      { metric: '1x / week', label: 'Pattern digest with hooks to borrow' },
    ],
    hook:
      "The videos breaking out in your niche this week are telling you what's going to work next month. We run a daily crawl of your competitor channels, surface outliers before they peak, and ship a weekly digest of the hooks and patterns worth borrowing.",
    details:
      'Tracked channel list you control, daily breakout detection via outlier scoring, Slack alert on real outliers, and a weekly pattern digest highlighting what to copy and why.',
    deliverables: [
      'Tracked channel list',
      'Daily breakout detection',
      'Slack alert on outliers',
      'Weekly pattern digest',
    ],
    idealFor: [
      'YouTubers in competitive niches',
      'Agencies running YT for clients',
      'Creators who want pattern-recognition without manual watching',
    ],
  },
  {
    slug: 'cross-niche-content-research',
    bucket: 'research-intelligence',
    title: 'Cross-Niche Content Research',
    tagline: 'Steal the hook, keep the niche',
    outcome: 'Mine adjacent niches for hooks and structures — bring transferable patterns back before your competitors do.',
    icon: Compass,
    highlights: [
      { metric: '6 months', label: 'Ahead of your direct niche' },
      { metric: '1x / week', label: 'Transferable-pattern digest' },
      { metric: 'Adjacent', label: 'Fitness, finance, lifestyle, etc.' },
    ],
    hook:
      'The hooks breaking out in fitness, finance, and lifestyle will work in your niche six months later. We mine adjacent niches and surface the transferable patterns — so your content feels fresh while everyone else recycles the same five angles.',
    details:
      'Adjacent-niche channel selection you approve, outlier video detection, hook and structure extraction, and a weekly digest of patterns ready to port into your niche.',
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
    outcome: "Real-time X discourse on your topics — post the take before the wave breaks, no doomscroll required.",
    icon: Hash,
    highlights: [
      { metric: 'Real-time', label: 'Discourse pulse on your topics' },
      { metric: '1x / day', label: 'Digest of emerging threads' },
      { metric: '0', label: 'Hours scrolling to find the signal' },
    ],
    hook:
      "The people who post timely takes on X win the timeline. The ones doomscrolling for ideas lose the day. We build a filtered trend stream on X for the topics you care about — real-time discourse, filtered for signal — so you post the take before the wave breaks.",
    details:
      'Topic list and keyword tuning you control, Grok-powered X search, daily digest of emerging threads, and Slack alerts on genuine breakouts.',
    deliverables: [
      'Topic list + keyword tuning',
      'Grok-powered X search',
      'Daily digest of emerging threads',
      'Slack alerts on breakouts',
    ],
    idealFor: [
      'Founders posting on X daily',
      'Agencies tracking client-relevant discourse',
      'Operators who want the zeitgeist without the doomscroll',
    ],
  },
  {
    slug: 'invoice-data-extraction',
    bucket: 'research-intelligence',
    title: 'Invoice Data Extraction',
    tagline: 'PDF invoices → JSON',
    outcome: "Drop PDF invoices in — structured JSON out. Vendor, amount, date, line items auto-pushed to your books.",
    icon: FileSearch,
    highlights: [
      { metric: 'PDF → JSON', label: 'Structured in seconds' },
      { metric: '0', label: 'Hours of manual data entry' },
      { metric: '4 fields', label: 'Vendor, amount, date, line items' },
    ],
    hook:
      "Bookkeeping by hand is expensive and error-prone. Drop a folder of invoice PDFs in and the pipeline extracts structured data — vendor, amount, date, line items, tax — and pushes it straight to your CRM or accounting tool. No manual entry, no shoebox.",
    details:
      'PDF to structured JSON pipeline, vendor and line-item extraction, auto-updates to CRM / QuickBooks / Xero / Sheets, and error-flagging on unreadable docs so nothing slips.',
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
