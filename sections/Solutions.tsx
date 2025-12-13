import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, Layers, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    id: '01',
    title: "Traffic & Authority",
    header: "Dominate your local market.",
    description: "You need more than just a website. You need a lead engine. We handle SEO, Google Map Ranking, and high-converting Website Design to ensure when people search for your service, they find YOU first.",
    icon: <LineChart className="w-6 h-6 text-white" />,
    features: ["Local SEO & Map Ranking", "Conversion-Focused Web Design", "Social Media Management"]
  },
  {
    id: '02',
    title: "Automated Capture",
    header: "15 Booked Leads Guarantee.",
    description: "Leads are useless if you don't book them. Our AI Receptionists and automation workflows engage leads instantly—24/7. We filter tire-kickers and schedule ready-to-buy customers directly to your calendar.",
    icon: <Bot className="w-6 h-6 text-white" />,
    features: ["AI Call Handling", "Instant SMS Response", "Calendar Booking Automation"]
  },
  {
    id: '03',
    title: "Nurture & Reactivation",
    header: "Turn ghost leads into revenue.",
    description: "Stop manually chasing leads from 6 months ago. Our system automatically reactivates your old database with proven offers and nurtures new inquiries until they are ready to sign the contract.",
    icon: <Layers className="w-6 h-6 text-white" />,
    features: ["Database Reactivation Workflows", "Review Generation Systems", "Long-term Nurture Campaigns"]
  }
];

export const Solutions: React.FC = () => {
  return (
    <section id="solutions" className="py-32 px-4 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="mb-20">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-semibold text-white mb-6"
          >
            A machine built for <br />
            <span className="text-slate-500">predictable revenue.</span>
          </motion.h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            From SEO to AI automation, we build the entire ecosystem your business needs to scale.
          </p>
        </div>

        <div className="space-y-24">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={pillar.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}
            >
              {/* Visual Side */}
              <div className="w-full md:w-1/2 relative group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-accent-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl blur-xl" />
                 <div className="relative border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-2xl p-8 aspect-video flex items-center justify-center overflow-hidden">
                    {/* Abstract Representation of the System */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
                    <div className="relative z-10 w-full max-w-xs">
                       <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shadow-[0_0_15px_rgba(234,88,12,0.1)]">
                           {pillar.icon}
                         </div>
                         <div className="h-2 w-24 bg-slate-800 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: "100%" }}
                             transition={{ duration: 1.5, delay: 0.5 }}
                             className="h-full bg-accent-500" 
                           />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <div className="h-2 w-full bg-slate-800 rounded animate-pulse" style={{ animationDelay: '0ms' }}/>
                         <div className="h-2 w-3/4 bg-slate-800 rounded animate-pulse" style={{ animationDelay: '150ms' }}/>
                         <div className="h-2 w-1/2 bg-slate-800 rounded animate-pulse" style={{ animationDelay: '300ms' }}/>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl font-bold text-slate-800 select-none">{pillar.id}</span>
                  <div className="h-px bg-slate-800 flex-1" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{pillar.title}</h3>
                <h4 className="text-xl text-accent-500 font-light mb-6">{pillar.header}</h4>
                <p className="text-slate-400 leading-relaxed mb-8">{pillar.description}</p>
                
                <ul className="space-y-3">
                  {pillar.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-accent-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};