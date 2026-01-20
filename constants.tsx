
import React from 'react';
import { 
  Globe, 
  Star, 
  Users, 
  MessageSquareText, 
  CheckCircle2, 
  TrendingUp, 
  Search, 
  PhoneMissed,
  Layout,
  Smartphone,
  Mail,
  Zap,
  PhoneCall,
  MousePointerClick,
  Repeat,
  ShieldCheck
} from 'lucide-react';
import { FoundationPillar, ProofPoint, NavItem, FAQItem, ServicePageData } from './types';

export const COLORS = {
  primary: '#EF4444', 
  secondary: '#F97316', 
  accent: '#EA580C', 
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'The 4 Pillars', href: '#foundations' },
  { label: 'Real Results', href: '#proof' },
  { label: '10-Day Launch', href: '#process' },
];

export const PILLARS: FoundationPillar[] = [
  {
    title: 'Functional Website',
    painPoint: 'Your current site is just a digital business card that nobody sees.',
    solution: 'Get a website that turns leads into sales conversations, showcases your work, and is built for search results',
    icon: <Globe className="w-6 h-6" />,
    serviceId: 'functional-website'
  },
  {
    title: '5-Star Review Machine',
    painPoint: 'Losing jobs to competitors with 100+ five-star reviews while you stay stagnant.',
    solution: 'Our "Automatic Review Machine" builds a wall of trust, making you the obvious choice (without buying fake reviews).',
    icon: <Star className="w-6 h-6" />,
    serviceId: 'review-funnel'
  },
  {
    title: 'Automated Lead Follow Up',
    painPoint: 'One-off jobs that never turn into repeat business or word-of-mouth.',
    solution: 'One-click referral, repeat business, and marketing campaigns to keep you top-of-mind with your customers.',
    icon: <Users className="w-6 h-6" />,
    serviceId: 'lead-follow-up'
  },
  {
    title: 'Missed Call Text Back',
    painPoint: 'Every missed call is a lead calling your competitor 30 seconds later.',
    solution: 'Don\'t let them call your competitors - our AI bot instantly texts back every missed call, starting the sales conversation for you to finish',
    icon: <MessageSquareText className="w-6 h-6" />,
    serviceId: 'missed-call-text-back'
  }
];

export const SERVICES_DATA: ServicePageData[] = [
  {
    id: 'functional-website',
    title: 'Functional Website',
    tagline: 'The Foundational Conversion Machine',
    dropdownDescription: 'Get a lead-generating website in just days',
    stats: [
      { value: '94%', label: 'of first impressions are design-related' },
      { value: '88%', label: 'of users won\'t return after a bad experience' },
      { value: '2.5×', label: 'potential higher conversion rates with a well-optimized website.' }
    ],
    description: 'A website isn\'t a decoration; it\'s your best salesperson. We build high-performance authority sites designed to turn local traffic into booked jobs.',
    features: [
      {
        title: 'Conversion Optimized',
        text: 'Every pixel is placed to drive one action: Booking a call.',
        icon: <Layout className="w-6 h-6" />
      },
      {
        title: 'High-Speed Infrastructure',
        text: 'We build on ultra-fast stacks so you never lose a lead to a slow load time.',
        icon: <Zap className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'missed-call-text-back',
    title: 'Missed Call Text Back',
    tagline: 'The First-Responder Advantage',
    dropdownDescription: 'Automatically text back missed calls instantly',
    stats: [
      { value: '62%', label: 'of calls to small businesses go unanswered' },
      { value: '50%', label: 'of jobs go to the first business that responds' },
      { value: '20-40%', label: 'of missed leads converted into sales' }
    ],
    description: 'If you miss a call, your customer calls your competitors. Our system detects the missed call and instantly sends a text to start a sales conversation.',
    features: [
      {
        title: 'Instant Engagement',
        text: 'Stop leads from calling the next person on Google within seconds.',
        icon: <Smartphone className="w-6 h-6" />
      },
      {
        title: 'AI Scheduling',
        text: 'The bot can automatically provide a booking link if they need an estimate.',
        icon: <TrendingUp className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'all-in-one-inbox',
    title: 'All-In-One Inbox',
    tagline: 'One Place for Every Conversation',
    dropdownDescription: 'Get all your messages in one place',
    stats: [
      { value: 'Central Inbox', label: 'all calls, texts, emails, and chats in one place' },
      { value: 'Less Overwhelm', label: 'fewer tabs, fewer tools, fewer things falling through' },
      { value: 'More Organized', label: 'every conversation automatically logged' }
    ],
    description: 'Consolidate Facebook messages, Instagram DMs, texts, and emails into one convenient place. Never miss an important message again.',
    features: [
      {
        title: '4-in-1 Unified Inbox',
        text: 'Streamline communication by seeing all channels in a single feed.',
        icon: <Mail className="w-6 h-6" />
      },
      {
        title: 'Team Collaboration',
        text: 'Assign conversations to staff members so everyone is on the same page.',
        icon: <Users className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'business-phone',
    title: 'Business Phone',
    tagline: 'Professionalism on Every Call',
    dropdownDescription: 'Separate business and personal calls',
    stats: [
      { value: '100%', label: 'separation of personal and business calls' },
      { value: 'Every Call', label: 'tracked for lead attribution and follow-up' },
      { value: '24/7', label: 'professional image for every customer interaction.' }
    ],
    description: 'A dedicated business phone number that keeps personal calls separate while tracking, recording, and logging every inbound call so you stay organized, responsive, and professional.',
    features: [
      {
        title: 'Smart Routing',
        text: 'Route calls to different team members based on the time of day.',
        icon: <PhoneCall className="w-6 h-6" />
      },
      {
        title: 'Call Tracking',
        text: 'Know exactly which marketing source generated every phone call.',
        icon: <Search className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'local-seo',
    title: 'Local SEO Mastery',
    tagline: 'Own Your Local Market',
    dropdownDescription: 'Actually get found on Google maps',
    stats: [
      { value: '46%', label: 'of all Google searches are local.' },
      { value: '76%', label: 'of local searches result in a same-day visit or contact.' },
      { value: 'Top 3', label: 'Map Pack listings receive the majority of local search clicks.' }
    ],
    description: 'If you aren\'t in the top 3 on Google Maps, you don\'t exist. We optimize your profile to dominate the local competition.',
    features: [
      {
        title: 'Map Pack Domination',
        text: 'Strategic citation building to push you to the top of the maps.',
        icon: <Search className="w-6 h-6" />
      },
      {
        title: 'Authority Building',
        text: 'We create geo-targeted content that proves your local relevance.',
        icon: <Globe className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'review-funnel',
    title: '5-Star Review Machine',
    tagline: 'The Reputation Autopilot',
    dropdownDescription: 'Get more 5 star reviews and prevent bad ones',
    stats: [
      { value: '85%+', label: 'customers checking Google Reviews before contacting' },
      { value: '10+', label: 'new Google reviews in the first 30 days.' },
      { value: '300%', label: 'more reviews generated on average' }
    ],
    description: 'Reviews are the currency of trust. We automate follow-ups so satisfied customers leave 5-star reviews — and frustrated customers are handled privately before they hurt your reputation.',
    features: [
      {
        title: 'Automatic Requests',
        text: 'Send a review link the moment the job is marked complete.',
        icon: <CheckCircle2 className="w-6 h-6" />
      },
      {
        title: 'Negative Review Shield',
        text: 'Capture feedback privately before it hits your public profile.',
        icon: <ShieldCheck className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'one-click-marketing',
    title: 'One-Click Marketing',
    tagline: 'Marketing for Busy Owners',
    dropdownDescription: 'Keep your customers thinking about you',
    stats: [
      { value: '1-Click', label: 'launch for review, referral, and seasonal follow-ups' },
      { value: 'Pre-Built', label: 'campaigns ready for your services and seasons' },
      { value: 'No Marketing', label: 'necessary to activate' }
    ],
    description: 'Choose a campaign. Add the customer. That’s it. Each submission triggers a prebuilt SMS and email follow-up, tracks the contact in your pipeline, and keeps your marketing running without the admin work.',
    features: [
      {
        title: 'Niche Templates',
        text: 'Landscaping, Plumbing, HVAC - we have proven templates ready.',
        icon: <MousePointerClick className="w-6 h-6" />
      },
      {
        title: 'Automated Budgeting',
        text: 'The system optimizes your spend so you don\'t waste a dime.',
        icon: <TrendingUp className="w-6 h-6" />
      }
    ]
  },
  {
    id: 'lead-follow-up',
    title: 'Automated Lead Follow Up',
    tagline: 'Never Let a Lead Go Cold',
    dropdownDescription: 'Automatically follow up with leads via text',
    stats: [
      { value: '80%', label: 'of sales require 5 follow-up contacts.' },
      { value: '44%', label: 'of reps give up after one follow-up.' },
      { value: 'Up to 2×', label: 'higher close rates with automated follow-up.' }
    ],
    description: 'Speed to lead wins deals. We automate the critical first 48 hours of follow-up so every lead is contacted instantly — even while you’re on a job.',
    features: [
      {
        title: 'Multi-Channel Nurture',
        text: 'Follow up via text, email, and ringless voicemail automatically.',
        icon: <Repeat className="w-6 h-6" />
      },
      {
        title: 'Long-Term Retention',
        text: 'Stay in touch with past customers every 6 months without lifting a finger.',
        icon: <Users className="w-6 h-6" />
      }
    ]
  }
];

export const PROOF_POINTS: ProofPoint[] = [
  { stat: '+$128k', description: 'Cash collected in 4 months (Landscaper)', category: 'Revenue' },
  { stat: '2x Rank', description: 'From 27.9 average position to 12.2 average without ads', category: 'Visibility' },
  { stat: '$900k', description: 'New estimate pipeline generated for a single contractor', category: 'Pipeline' },
  { stat: '200%', description: 'Double Google calls and site clicks in 1 month', category: 'Growth' },
  { stat: '4.2 Stars', description: 'Jumped from 2.4 stars in just 3 weeks', category: 'Reputation' },
  { stat: '$24k', description: 'Revenue from 4 emails to past customers', category: 'Referrals' },
];

export const ROADMAP_STEPS = [
  { day: 'Day 1', title: 'Audit and Onboarding', description: 'We understand your specific business and get to work immediately.' },
  { day: 'Day 1-5', title: 'The Build', description: 'Set up your site and automations.' },
  { day: 'Day 5-7', title: 'System Refinement', description: 'Missed call text back goes live and we refine the flow.' },
  { day: 'Day 7-10', title: 'Launch', description: 'The foundations are fully live. You start capturing missed revenue.' },
];

export const FAQS: FAQItem[] = [
  {
    question: "Why do I need a Google Business Profile first?",
    answer: "Our systems rely on the data and trust signals from your GBP to drive SEO results and review automation. Without a verified profile, we'd be building a house on sand. We want to give you real results, not just promises."
  },
  {
    question: "Is there a long-term contract?",
    answer: "No. We believe in earning your business every month. If we aren't generating more value than we cost, you shouldn't be paying us. Cancel anytime with a simple email."
  },
  {
    question: "What if I already have a website?",
    answer: "Most service provider websites are 'digital business cards'—they look okay but don't rank. We usually replace them with our high-speed, SEO-optimized machine. We can import your existing content and branding to keep it seamless."
  },
  {
    question: "How involved do I need to be?",
    answer: "Minimal. After a quick onboarding call to get your details right, we handle the heavy lifting. We might need a few photos of your trucks and jobs, but our job is to get you back to your jobs, not give you more office work."
  }
];
