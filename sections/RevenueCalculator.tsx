import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Calculator, AlertCircle, Check } from 'lucide-react';

export const RevenueCalculator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    phone: '',
    avgJobValue: '',
    leadsPerWeek: '',
    percentMissed: ''
  });

  const [calculationResult, setCalculationResult] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateAndSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadsPerWeek = parseFloat(formData.leadsPerWeek) || 0;
    const avgJobValue = parseFloat(formData.avgJobValue) || 0;
    const percentMissed = parseFloat(formData.percentMissed) || 0;

    // Validation
    if (leadsPerWeek <= 0 || avgJobValue <= 0 || percentMissed < 0 || percentMissed > 100) {
      setIsSubmitting(false);
      return;
    }

    // Logic: Leads per week * 4 (month) * % missed * job value * 50% close rate
    const monthlyMissedLeads = (leadsPerWeek * 4) * (percentMissed / 100);
    const monthlyLoss = monthlyMissedLeads * avgJobValue * 0.5;

    setCalculationResult(monthlyLoss);

    // Simulate brief "calculating" delay for UX
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section id="calculator" className="py-24 px-4 relative">
       {/* Background glow for this section */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-accent-600/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 mb-6 text-accent-500 font-semibold tracking-wide uppercase text-sm">
              <Calculator className="w-4 h-4" />
              <span>Revenue Leakage Audit</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              See how much money you're leaving on the table.
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Most service businesses bleed revenue through missed calls, slow follow-ups, and disorganized pipelines. 
              <br /><br />
              Enter your numbers to see exactly what operational inefficiencies are costing you every single month.
            </p>
            
            <div className="p-6 bg-slate-900/50 border border-slate-800 rounded-xl">
              <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent-500" />
                Why this matters
              </h3>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2" />
                  Speed to lead is everything. 5 minutes delay drops conversion by 400%.
                </li>
                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-2" />
                  Manual follow-up fails 80% of the time after the 2nd attempt.
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              {!isSuccess ? (
                <form onSubmit={calculateAndSend} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase font-semibold">Name</label>
                      <input 
                        type="text" name="name" required 
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase font-semibold">Business Name</label>
                      <input 
                        type="text" name="businessName" required 
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase font-semibold">Email</label>
                    <input 
                      type="email" name="email" required 
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase font-semibold">Phone (Optional)</label>
                    <input 
                      type="tel" name="phone" 
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="h-px bg-slate-800 my-4" />

                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase font-semibold">Avg Job Value ($)</label>
                      <input 
                        type="number" name="avgJobValue" required placeholder="e.g. 1500"
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 uppercase font-semibold">Leads Per Week</label>
                      <input 
                        type="number" name="leadsPerWeek" required placeholder="e.g. 10"
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 uppercase font-semibold">% Leads missed (10+ mins delay)</label>
                    <input 
                      type="number" name="percentMissed" required max="100" min="0" placeholder="e.g. 30"
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                      onChange={handleChange}
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
                    {isSubmitting ? 'Calculating...' : 'Calculate My Loss'}
                  </Button>
                </form>
              ) : (
                 <div className="flex flex-col items-center justify-center h-full py-8 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-slate-400 text-lg font-medium mb-2">Estimated Monthly Revenue Loss</h3>
                    <div className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                       ${calculationResult?.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto mb-8">
                      This is based on a conservative 50% close rate on missed opportunities. In reality, it could be higher.
                    </p>
                    <Button onClick={() => {
                      const ctaEl = document.getElementById('cta');
                      if (ctaEl) {
                        ctaEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }} className="w-full">
                      Fix This Leak Now
                    </Button>
                 </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};