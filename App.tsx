import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight,
  Phone,
  Zap,
  Menu,
  X,
  Star,
  ChevronDown,
  ChevronUp,
  DollarSign,
  AlertTriangle,
  Play,
  Loader2,
  Globe,
  Smartphone,
  Mail,
  Search,
  MousePointerClick,
  Users
} from 'lucide-react';
import { NAV_ITEMS, PILLARS, PROOF_POINTS, ROADMAP_STEPS, FAQS, SERVICES_DATA } from './constants';
import { MotionWrapper } from './components/MotionWrapper';
import { HoverCard } from './components/HoverCard';

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/11am6QHObrEmx0qnQg7g/webhook-trigger/f67e2e01-2427-4cd4-b9c2-3ae8861dd8f0';
const BOOKING_URL = 'https://link.redwaterrev.com/widget/bookings/redwaterrev/demo';

const SERVICE_ICON_MAP: Record<string, React.ReactNode> = {
  'functional-website': <Globe className="w-5 h-5" />,
  'missed-call-text-back': <Smartphone className="w-5 h-5" />,
  'all-in-one-inbox': <Mail className="w-5 h-5" />,
  'business-phone': <Phone className="w-5 h-5" />,
  'local-seo': <Search className="w-5 h-5" />,
  'review-funnel': <Star className="w-5 h-5" />,
  'one-click-marketing': <MousePointerClick className="w-5 h-5" />,
  'lead-follow-up': <Users className="w-5 h-5" />,
};

// Service demo images mapping
const SERVICE_IMAGE_MAP: Record<string, { src: string; alt: string }> = {
  'functional-website': {
    src: '/images/2_website.png',
    alt: 'Professional service business website mockup showing desktop and mobile responsive design with clear call-to-action buttons'
  },
  'missed-call-text-back': {
    src: '/images/3_Missed_call.png',
    alt: 'iPhone showing automatic text message response to a missed call - instant lead engagement'
  },
  'all-in-one-inbox': {
    src: '/images/4_all_in_one.png',
    alt: 'Unified inbox dashboard showing Facebook, Instagram, SMS and email messages in one place'
  },
  'business-phone': {
    src: '/images/5_biz_phone.png',
    alt: 'Side-by-side comparison of personal phone showing Mom calling versus business phone showing New Lead'
  },
  'local-seo': {
    src: '/images/6_local_seo.png',
    alt: 'Google Maps search results showing business ranking in the top 3 local pack with 5-star reviews'
  },
  'review-funnel': {
    src: '/images/7_review_automation.png',
    alt: 'Automated review request text message with direct Google review link and 5-star rating prompt'
  },
  'one-click-marketing': {
    src: '/images/8_one_click_campaign.png',
    alt: 'Simple marketing dashboard with one-click campaign buttons for Spring Cleanup, Refer a Friend, and Winter Prep'
  },
  'lead-follow-up': {
    src: '/images/9_lead_nurture.png',
    alt: 'Lead follow-up automation timeline showing instant text, email at 30 minutes, voicemail at 2 hours, then appointment booked'
  },
};

// SEO Head component for dynamic meta tags
const SEOHead = ({
  title,
  description,
  canonical,
  structuredData
}: {
  title: string;
  description: string;
  canonical: string;
  structuredData?: object;
}) => {
  const fullTitle = `${title} | Redwater Revenue`;
  const fullCanonical = `https://redwaterrev.com${canonical}`;
  const ogImage = 'https://redwaterrev.com/og-image.jpg';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Redwater Revenue" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

const RevenueLeakCalculator = ({ onFixClick }: { onFixClick: () => void }) => {
  const [avgJob, setAvgJob] = useState(1000);
  const [missedCalls, setMissedCalls] = useState(5);

  const leak = useMemo(() => {
    const capturedLeadsPerWeek = missedCalls * 0.15;
    const weeklyLost = capturedLeadsPerWeek * avgJob;
    return Math.floor(weeklyLost * 52);
  }, [avgJob, missedCalls]);

  return (
    <div className="bg-slate-900 rounded-3xl p-8 lg:p-10 text-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Revenue Leak Calculator</h3>
            <p className="text-slate-400 text-sm">See what missed calls are costing you</p>
          </div>
        </div>

        <div className="space-y-8 mb-10">
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Avg. Customer Value</label>
              <span className="text-red-500 font-bold">${avgJob.toLocaleString()}</span>
            </div>
            <input
              type="range" min="500" max="15000" step="100"
              value={avgJob} onChange={(e) => setAvgJob(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-400">Missed Calls / Week</label>
              <span className="text-red-500 font-bold">{missedCalls} calls</span>
            </div>
            <input
              type="range" min="1" max="25" step="1"
              value={missedCalls} onChange={(e) => setMissedCalls(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <p className="text-sm font-medium text-slate-400 mb-2 uppercase tracking-widest">Estimated Annual Revenue Leak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-red-500 tracking-tighter">${leak.toLocaleString()}</span>
            <span className="text-slate-500 font-bold">/ year</span>
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed italic">
              Estimate based on a conservative 15% recovery rate from instant missed-call text-back follow-up. Industry benchmarks often range from 20–40%.
            </p>
            <button
              onClick={onFixClick}
              className="mt-6 block w-full py-4 bg-red-600 text-white rounded-xl font-bold text-center hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 active:scale-[0.98]"
            >
              Fix My Missed Calls
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LeadForm = ({ source = 'Website Foundations Form', className = '' }: { source?: string, className?: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ company: '', name: '', phone: '', email: '' });
  const [smsConsent, setSmsConsent] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookCall = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Sanitize inputs
    const sanitizedData = {
      company: formData.company.trim().slice(0, 200),
      name: formData.name.trim().slice(0, 100),
      phone: formData.phone.replace(/[^\d\+\-\(\)\s]/g, '').slice(0, 20),
      email: formData.email.trim().toLowerCase().slice(0, 254),
    };

    // Store SMS consent locally for compliance tracking
    if (smsConsent) {
      localStorage.setItem('smsConsent', JSON.stringify({
        consented: true,
        phone: sanitizedData.phone,
        timestamp: new Date().toISOString(),
      }));
    }

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...sanitizedData,
          source,
          smsConsent,
          timestamp: new Date().toISOString(),
        })
      });
    } catch (err) {
      console.error('Webhook trigger failed:', err);
    }
    window.location.href = BOOKING_URL;
  };

  return (
    <form onSubmit={handleBookCall} className={`grid gap-6 ${className}`}>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
        <input
          type="text" name="company" required value={formData.company} onChange={handleInputChange}
          placeholder="e.g. Acme Landscaping"
          maxLength={200}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
          <input
            type="text" name="name" required value={formData.name} onChange={handleInputChange}
            placeholder="John Doe"
            maxLength={100}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
          <input
            type="tel" name="phone" required value={formData.phone} onChange={handleInputChange}
            placeholder="(555) 000-0000"
            maxLength={20}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
        <input
          type="email" name="email" required value={formData.email} onChange={handleInputChange}
          placeholder="john@yourbusiness.com"
          maxLength={254}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="smsConsent"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          className="mt-1 w-4 h-4 text-red-600 bg-slate-50 border-slate-300 rounded focus:ring-red-500 focus:ring-2 cursor-pointer"
        />
        <label htmlFor="smsConsent" className="text-xs text-slate-500 leading-relaxed cursor-pointer">
          I agree to receive SMS text messages from Redwater Revenue. Message frequency varies. Message and data rates may apply. Reply STOP to opt out. View our <a href="/privacy" className="text-red-600 hover:underline">Privacy Policy</a>.
        </label>
      </div>
      <button
        disabled={isSubmitting}
        className="w-full py-5 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</> : 'Book a Call'}
      </button>
      <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1"><AlertTriangle className="w-3 h-3 text-red-500" /> Required: Active Google Business Profile</p>
    </form>
  );
};

const FAQAccordion: React.FC<{ item: typeof FAQS[0]; idx: number }> = ({ item, idx }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonId = `faq-btn-${idx}`;
  const contentId = `faq-content-${idx}`;

  return (
    <div className="border-b border-slate-200">
      <button
        id={buttonId}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full py-6 flex justify-between items-center text-left hover:text-red-600 transition-colors"
      >
        <span className="text-lg font-bold text-slate-900">{item.question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">{item.answer}</p>
      </div>
    </div>
  );
};

const RoadmapSection = () => (
  <section id="process" className="py-24 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <MotionWrapper>
          <p className="text-lg font-bold text-red-600 mb-2 uppercase tracking-widest">What it looks like to work with us</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            The <span className="text-red-600">10-Day</span> Launch Roadmap
          </h2>
          <p className="text-xl text-slate-600">
            It shouldn't take 3 months to "Strategize Your Marketing Ecosystem," whatever the hell that means. We'll fix your foundations and launch in less than 2 weeks.
          </p>
        </MotionWrapper>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2"></div>
        <div className="grid lg:grid-cols-4 gap-8 relative z-10">
          {ROADMAP_STEPS.map((step, idx) => (
            <MotionWrapper key={idx} delay={idx * 0.15} direction="up">
              <div className="bg-white lg:pt-12 p-8 text-center group">
                <div className="w-16 h-16 bg-white border-2 border-slate-100 text-red-600 rounded-2xl flex items-center justify-center font-black text-xl mb-8 mx-auto group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-300 shadow-xl shadow-slate-200/50">
                  {step.day}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.description}</p>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MascotCTA = ({ onBookClick }: { onBookClick: () => void }) => (
  <div className="mt-20 relative overflow-hidden bg-[#1a1c2e] rounded-[3rem] p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12">
    <div className="flex-1 text-center lg:text-left">
      <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
        Want to schedule a time to talk?
      </h3>
      <p className="text-xl text-slate-400 mb-10 max-w-xl">
        See everything we do to help you grow your business so you can implement it yourself or let us do it for you.
      </p>
      <button
        onClick={onBookClick}
        className="px-10 py-5 bg-[#eeb05a] text-slate-900 rounded-xl font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-[#eeb05a]/20"
      >
        Book A Call
      </button>
    </div>
    <div className="relative w-64 lg:w-96 aspect-square shrink-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-transparent rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full h-full flex items-center justify-center bg-slate-800 rounded-3xl border-4 border-red-600/30 p-8">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white">
             <Zap className="w-12 h-12 fill-current" />
          </div>
          <p className="font-black text-white text-lg tracking-tighter uppercase">Redwater Revenue</p>
        </div>
      </div>
    </div>
  </div>
);

const ServicePage = ({ serviceId, onBookClick }: { serviceId: string; onBookClick: () => void }) => {
  const data = SERVICES_DATA.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!data) return null;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "provider": {
      "@type": "Organization",
      "name": "Redwater Revenue",
      "url": "https://redwaterrev.com"
    },
    "description": data.description,
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    }
  };

  return (
    <>
      <SEOHead
        title={data.title}
        description={data.description}
        canonical={`/services/${serviceId}`}
        structuredData={serviceSchema}
      />
      <div className="pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link to="/" className="mb-12 flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-colors">
            <ArrowRight className="w-5 h-5 rotate-180" /> Back to Home
          </Link>

          <MotionWrapper>
            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 text-center mb-20">{data.title}</h1>
          </MotionWrapper>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
            <div className="space-y-6">
              {data.stats.map((stat, i) => (
                <MotionWrapper key={i} delay={i * 0.1}>
                  <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <span className="text-5xl font-black text-red-600 mb-2 block">{stat.value}</span>
                    <p className="text-slate-600 font-bold leading-snug">{stat.label}</p>
                  </div>
                </MotionWrapper>
              ))}
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">See how it works</h2>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={SERVICE_IMAGE_MAP[data.id]?.src || `/images/2_website.png`}
                  alt={SERVICE_IMAGE_MAP[data.id]?.alt || `${data.title} service demonstration`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="450"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1a1c2e] text-white py-32 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 -translate-y-1/2 -skew-y-3 origin-left"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl lg:text-5xl font-black mb-12">
                {data.id === 'missed-call-text-back' ? 'What is Missed Call Text Back' : `What is the ${data.title.toLowerCase()}?`}
              </h2>
              <div className="bg-white text-slate-900 p-8 lg:p-12 rounded-3xl shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-red-600">
                     {data.features[0].icon}
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">{data.title} System</h3>
                </div>
                <p className="text-xl text-slate-600 leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RoadmapSection />
          <MascotCTA onBookClick={onBookClick} />
        </div>
      </div>
    </>
  );
};

const HomePage = ({ onBookClick }: { onBookClick: () => void }) => {
  const navigate = useNavigate();

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Redwater Revenue",
    "url": "https://redwaterrev.com",
    "description": "Growth systems for service businesses",
    "email": "nick@redwaterrev.com"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title="Foundational Growth for Service Businesses"
        description="Stop losing leads to poor follow-up. We build the 4 digital foundations your service business needs: website, missed call text back, review automation, and lead follow-up."
        canonical="/"
        structuredData={organizationSchema}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section id="hero" className="relative overflow-hidden pt-28 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <MotionWrapper direction="fade">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-6">
                  <Zap className="w-3 h-3 fill-red-600" /> No-Fluff Foundations
                </div>
              </MotionWrapper>
              <MotionWrapper delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
                  Stop Losing Leads to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Poor Follow-Up.</span>
                </h1>
              </MotionWrapper>
              <MotionWrapper delay={0.2}>
                <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                  You're a master of your craft, but your back-office is leaking money. We fix the 4 digital foundations of your service business so you can stop babysitting your phone (without charging you bullsh*t marketing agency prices)
                </p>
              </MotionWrapper>
              <MotionWrapper delay={0.3} className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onBookClick}
                  className="group relative px-8 py-4 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  Get Your Foundations Live <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={onBookClick}
                  className="px-8 py-4 bg-white border-2 border-slate-100 text-slate-700 rounded-xl font-bold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                >
                  Book a Call
                </button>
              </MotionWrapper>
            </div>
            <MotionWrapper delay={0.5} className="relative">
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                <img
                  src="/images/1_Homepage.png"
                  alt="Home service contractor checking phone with work truck in background - capturing leads on the job site"
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="600"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-8">
                  <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-xs">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center"><Phone className="w-5 h-5" /></div>
                    <div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Missed Call Text Back</p>
                      <p className="text-sm font-bold text-slate-900">Lead captured automatically</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section id="foundations" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3">
              <MotionWrapper>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8">The 4 Pillars of <span className="text-red-600">Predictable Revenue</span></h2>
                <p className="text-xl text-slate-600 mb-12">We're not selling you "digital marketing," we build you the foundations that plug your leaks. If you love the results (most people do), we can talk about ads and SEO.</p>
              </MotionWrapper>
              <div className="grid md:grid-cols-2 gap-6">
                {PILLARS.map((pillar, idx) => (
                  <MotionWrapper key={idx} delay={idx * 0.1}>
                    <Link to={pillar.serviceId ? `/services/${pillar.serviceId}` : '#'} className="cursor-pointer group block">
                      <HoverCard className="h-full">
                        <div className="mb-6 p-4 bg-slate-50 text-red-600 rounded-2xl w-fit group-hover:bg-red-600 group-hover:text-white transition-all duration-300">{pillar.icon}</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{pillar.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">{pillar.solution}</p>
                        <span className="text-xs font-bold text-red-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">Learn More <ArrowRight className="w-3 h-3" /></span>
                      </HoverCard>
                    </Link>
                  </MotionWrapper>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <MotionWrapper direction="left"><RevenueLeakCalculator onFixClick={onBookClick} /></MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      <section id="proof" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <MotionWrapper direction="left">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Real Results from <span className="text-red-600">Real Contractors.</span></h2>
              <p className="text-xl text-slate-600">No magic. Just consistent follow-up, optimized visibility, and automated reputation management.</p>
            </MotionWrapper>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROOF_POINTS.map((item, idx) => (
              <MotionWrapper key={idx} delay={idx * 0.05} direction="up">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl font-black text-red-600 tracking-tight">{item.stat}</span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                  </div>
                  <p className="text-slate-800 font-bold text-lg leading-snug">{item.description}</p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <RoadmapSection />

      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <MotionWrapper>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Common Questions</h2>
              <p className="text-lg text-slate-600">Everything you need to know about the Foundations.</p>
            </MotionWrapper>
          </div>
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-200">
            {FAQS.map((item, idx) => <FAQAccordion key={idx} item={item} idx={idx} />)}
          </div>
        </div>
      </section>
    </>
  );
};

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.split('/').pop() || 'home';

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen">
      {/* Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 lg:p-12 overflow-y-auto max-h-[90vh]">
            <button onClick={closeModal} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Book a Call</h2>
              <p className="text-slate-500">Let's talk. We'll show you how it works, answer any questions, and get the Foundational Four live in under 2 weeks.</p>
            </div>
            <LeadForm source={`Modal Form - ${currentPage}`} />
          </div>
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-extrabold tracking-tight text-slate-900">
                REDWATER <span className="text-red-600">REVENUE</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors">Home</Link>
              <div className="relative group">
                <button
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors flex items-center gap-1 h-20"
                >
                  Services <ChevronDown className="w-4 h-4" />
                </button>
                <div
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  className={`absolute top-full -left-48 w-[840px] bg-white border border-slate-100 shadow-2xl rounded-[1.5rem] p-8 transition-all duration-300 origin-top ${isServicesDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}
                >
                  <div className="mb-6 pb-4 border-b border-slate-100">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Systems & Features</h4>
                  </div>
                  <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                    {SERVICES_DATA.map(s => (
                      <Link
                        key={s.id}
                        to={`/services/${s.id}`}
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="group flex items-start gap-4 text-left p-3 rounded-2xl hover:bg-slate-50 transition-all duration-200"
                      >
                        <div className="shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                          {SERVICE_ICON_MAP[s.id] || <Zap className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">{s.title}</p>
                          <p className="text-xs font-medium text-slate-400 leading-relaxed">{s.dropdownDescription}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={openModal}
                className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-red-600 transition-all shadow-md active:scale-95"
              >
                Book a Call
              </button>
            </div>

            <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left text-lg font-semibold text-slate-600">Home</Link>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Our Services</p>
              {SERVICES_DATA.map(s => (
                <Link key={s.id} to={`/services/${s.id}`} onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-left py-2 text-slate-600 font-medium">{s.title}</Link>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">Company</p>
              {NAV_ITEMS.map(item => (
                <button key={item.href} onClick={(e) => scrollToSection(e, item.href)} className="block w-full text-left py-2 text-slate-600 font-medium">{item.label}</button>
              ))}
            </div>
            <button
              onClick={() => { openModal(); setIsMobileMenuOpen(false); }}
              className="block w-full text-center bg-red-600 text-white py-3 rounded-xl font-bold"
            >
              Book a Call
            </button>
          </div>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<HomePage onBookClick={openModal} />} />
          <Route path="/services/:serviceId" element={<ServicePageWrapper onBookClick={openModal} />} />
        </Routes>

        <section id="cta" className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <MotionWrapper>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-white mb-8">Ready to stop <span className="text-red-500 underline decoration-red-500/30">bleeding leads?</span></h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Let's talk. We'll show you how it works, answer any questions, and get the Foundational Four live in under 2 weeks.</p>
              <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-2xl text-left max-w-2xl mx-auto">
                <LeadForm source={`Footer Form - ${currentPage}`} />
              </div>
            </MotionWrapper>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <Link to="/" className="flex items-center mb-6">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 uppercase">Redwater <span className="text-red-600">Revenue</span></span>
              </Link>
              <p className="text-slate-500 max-w-sm leading-relaxed text-sm">Helping service businesses build the digital foundations required for predictable scale, without the bullshit</p>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Navigation</h5>
              <ul className="space-y-4 text-slate-500 font-medium text-sm">
                <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
                {NAV_ITEMS.map(item => (
                  <li key={item.href}>
                    <button onClick={(e) => scrollToSection(e, item.href)} className="hover:text-red-600 transition-colors text-left">{item.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Core Services</h5>
              <ul className="space-y-4 text-slate-500 font-medium text-sm">
                {SERVICES_DATA.slice(0, 5).map(s => (
                  <li key={s.id}><Link to={`/services/${s.id}`} className="hover:text-red-600 transition-colors">{s.title}</Link></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            <p>© {new Date().getFullYear()} Redwater Revenue.</p>
            <div className="flex gap-8"><a href="#" className="hover:text-slate-600">Privacy</a><a href="#" className="hover:text-slate-600">Terms</a></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Wrapper component to extract serviceId from URL params
const ServicePageWrapper = ({ onBookClick }: { onBookClick: () => void }) => {
  const location = useLocation();
  const serviceId = location.pathname.split('/').pop() || '';
  return <ServicePage serviceId={serviceId} onBookClick={onBookClick} />;
};

export default App;
