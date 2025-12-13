import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';

export const CTA: React.FC = () => {
  const handleBookingClick = () => {
    // Opens email client for contact
    window.location.href = 'mailto:contact@redwaterrev.com?subject=Diagnostic Call Request';
  };

  const handlePricingClick = () => {
    // Scroll to calculator
    const calculatorEl = document.getElementById('calculator');
    if (calculatorEl) {
      calculatorEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="cta" className="py-32 px-4 relative flex items-center justify-center min-h-[60vh]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50 pointer-events-none" />

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
            Stop guessing. <br />
            Start scaling your revenue.
          </h2>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            You don't need another agency promising the moon. You need an infrastructure audit to see exactly where your revenue is leaking.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleBookingClick} className="w-full sm:w-auto text-lg px-8 py-4">
              Book a Diagnostic Call
            </Button>
            <Button onClick={handlePricingClick} variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
              View Pricing Models
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-600">
            No pressure. No hard selling. Just a look at your systems.
          </p>
        </motion.div>
      </div>
    </section>
  );
};