import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bot, Mail, Monitor, FileText, PenTool } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';

interface Service {
  id: string;
  title: string;
  summary: string;
  importance: string;
  icon: React.ElementType;
}

const services: Service[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    summary: 'Data-driven optimization to dominate SERPs for high-intent keywords.',
    importance: 'Generates sustainable, organic traffic that reduces reliance on paid ads.',
    icon: Search,
  },
  {
    id: 'marketing-automation',
    title: 'Marketing Automation',
    summary: 'Streamlined workflows that nurture leads 24/7 without manual intervention.',
    importance: 'Scales your revenue operations by ensuring no lead is ever left cold.',
    icon: Bot,
  },
  {
    id: 'content-marketing',
    title: 'Content Marketing',
    summary: 'Strategic content creation designed to capture attention and drive authority.',
    importance: 'Builds brand trust and fuels the top of your funnel with qualified leads.',
    icon: PenTool,
  },
  {
    id: 'email-marketing',
    title: 'Email Campaigns',
    summary: 'High-conversion sequences that turn subscribers into lifetime customers.',
    importance: 'Maximize LTV (Lifetime Value) through direct, owned audience communication.',
    icon: Mail,
  },
  {
    id: 'web-dev',
    title: 'Web Design & Dev',
    summary: 'Industrial-grade, high-performance websites built for speed and conversion.',
    importance: 'Your digital storefront must flawlessly represent your brand quality.',
    icon: Monitor,
  },
  {
    id: 'blog-writing',
    title: 'Blog Writing Services',
    summary: 'Deep-dive technical articles that establish industry thought leadership.',
    importance: 'Fuels SEO and provides sales assets for your closing teams.',
    icon: FileText,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-accent-500 font-bold tracking-widest text-sm uppercase mb-4">
              Systematic Growth
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Services
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-accent-600/30 pl-6">
              We don't do "fluff". We deploy calculated revenue engines.
              Select a service below to understand how we engineer growth for high-performance companies.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.id} variants={itemVariants} className="h-full">
              <Card className="h-full flex flex-col p-8 hover:bg-slate-900/60 transition-colors">
                <div className="mb-6 flex items-start justify-between">
                  <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-accent-500" />
                  </div>
                  <div className="text-xs font-mono text-slate-600 uppercase tracking-widest">
                    {service.id.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-500 transition-colors">
                  {service.title}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {service.summary}
                </p>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Critical Impact
                  </h4>
                  <p className="text-slate-300 text-sm border-l border-accent-500/30 pl-3">
                    {service.importance}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-800/50">
                  <Button
                    onClick={() => {
                      const ctaEl = document.getElementById('cta');
                      if (ctaEl) {
                        ctaEl.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.location.href = '/#cta';
                      }
                    }}
                    className="w-full"
                  >
                    Book a Call
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-slate-500 mb-6">
            Ready to scale your service business?
          </p>
          <Button
            onClick={() => window.location.href = '/#calculator'}
            variant="secondary"
            className="mx-auto"
          >
            Calculate Your Revenue Loss
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
