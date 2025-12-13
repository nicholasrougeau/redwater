import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { ArrowDown, Flame } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToCalculator = () => {
    const el = document.getElementById('calculator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Dramatic Background Elements specific to Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-600/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-accent-500/30 text-accent-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(234,88,12,0.2)]">
            <Flame className="w-3 h-3 fill-accent-500 text-accent-500" />
            <span>SEO &bull; AI Automation &bull; Marketing Systems</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
            15 Booked Leads
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 relative">
             in 90 Days
          </span>
          <br />
          <span className="text-4xl md:text-6xl text-slate-500 font-medium">
            or you don't pay.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light"
        >
          We build the automated infrastructure that scales service businesses. 
          Stop chasing leads and start closing jobs with our proven growth systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Button icon onClick={scrollToCalculator} className="w-full sm:w-auto text-lg px-8">Calculate Lost Revenue</Button>
          <Button variant="ghost" className="w-full sm:w-auto">View Case Studies</Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};