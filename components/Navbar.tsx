import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAuditClick = () => {
    const calculatorEl = document.getElementById('calculator');
    if (calculatorEl) {
      calculatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/5 bg-slate-950/80 backdrop-blur-md"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-white to-slate-500 flex items-center justify-center">
          <span className="text-slate-950 font-bold text-sm">R</span>
        </div>
        <span className="text-lg font-medium tracking-tight text-white">Redwater</span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <a
          href="#problems"
          onClick={(e) => handleNavClick(e, 'problems')}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Problems
        </a>
        <a
          href="#solutions"
          onClick={(e) => handleNavClick(e, 'solutions')}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Solutions
        </a>
        <a
          href="#results"
          onClick={(e) => handleNavClick(e, 'results')}
          className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Results
        </a>
      </div>

      <Button variant="secondary" className="px-4 py-2 text-sm" onClick={handleAuditClick}>
        Audit Your Systems
      </Button>
    </motion.nav>
  );
};
