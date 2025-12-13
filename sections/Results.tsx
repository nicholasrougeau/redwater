import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { TrendingUp, Mail, Building, Globe, MapPin } from 'lucide-react';

const resultsData = [
  {
    icon: <TrendingUp className="w-6 h-6 text-accent-500" />,
    stat: "+$200k+",
    label: "Added Revenue",
    desc: "Generated in just 4 months for a client."
  },
  {
    icon: <Mail className="w-6 h-6 text-accent-500" />,
    stat: "$40k",
    label: "Email Campaign",
    desc: "Revenue generated from just 4 reactivation emails."
  },
  {
    icon: <Building className="w-6 h-6 text-accent-500" />,
    stat: "$900M",
    label: "Real Estate Co.",
    desc: "Built custom automations for a $900M firm."
  },
  {
    icon: <Globe className="w-6 h-6 text-accent-500" />,
    stat: "2x Views",
    label: "Landscaping SEO",
    desc: "Doubled page views in just 2 weeks."
  },
  {
    icon: <MapPin className="w-6 h-6 text-accent-500" />,
    stat: "2x Rank",
    label: "Construction",
    desc: "Doubled Google Map position in 2 weeks."
  }
];

export const Results: React.FC = () => {
  return (
    <section id="results" className="py-24 px-4 border-y border-slate-900 bg-slate-950/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Real outcomes. <br/>
            <span className="text-slate-500">Zero fluff.</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400">
            We don't sell "brand awareness" or "likes". We implement systems (SEO, Automation, Reactivation) that directly impact your bottom line.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resultsData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className=""
            >
              <Card className="p-8 h-full flex flex-col items-start hover:bg-slate-900/60 transition-colors border-slate-800/50">
                <div className="flex items-center gap-4 mb-6 w-full">
                  <div className="p-3 rounded-lg bg-accent-500/10 border border-accent-500/20 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-medium text-slate-200 border-b border-slate-800 pb-1 w-full">
                    {item.label}
                  </h3>
                </div>
                
                <div className="text-4xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                  {item.stat}
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};