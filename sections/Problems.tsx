import React from 'react';
import { motion } from 'framer-motion';
import { PhoneMissed, TrendingDown, Users } from 'lucide-react';
import { Card } from '../components/Card';

const problems = [
  {
    icon: <PhoneMissed className="w-6 h-6 text-rose-400" />,
    title: " The 'Busy' Trap",
    description: "You're on the tools or managing crews, so you miss 30% of incoming calls. That's thousands in revenue vanishing into voicemail."
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-orange-400" />,
    title: "Feast or Famine",
    description: "You're either overwhelmed with work or staring at an empty calendar. No predictable pipeline to hire confidently against."
  },
  {
    icon: <Users className="w-6 h-6 text-amber-400" />,
    title: "Owner Dependency",
    description: "If you take a week off, the business stops. Marketing, follow-up, and sales live entirely in your head."
  }
];

export const Problems: React.FC = () => {
  return (
    <section id="problems" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Hard work isn't the problem. <br />
            <span className="text-slate-400">Operational drag is.</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Most service owners are stuck in a reactive loop. You're good at your trade, but the backend chaos is capping your growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((prob, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Card className="h-full p-8 group hover:bg-slate-900/80 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700">
                  {prob.icon}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">{prob.title}</h3>
                <p className="text-slate-400 leading-relaxed">{prob.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};