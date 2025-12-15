import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Check } from 'lucide-react';

export const RevenueCalculatorForm: React.FC = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const leadsPerWeek = parseFloat(formData.leadsPerWeek) || 0;
    const avgJobValue = parseFloat(formData.avgJobValue) || 0;
    const percentMissed = parseFloat(formData.percentMissed) || 0;

    // Validation
    if (leadsPerWeek <= 0 || avgJobValue <= 0 || percentMissed < 0 || percentMissed > 100) {
      setIsSubmitting(false);
      alert('Please enter valid numbers');
      return;
    }

    // Calculate monthly revenue loss
    const monthlyMissedLeads = (leadsPerWeek * 4) * (percentMissed / 100);
    const monthlyLoss = monthlyMissedLeads * avgJobValue * 0.5;
    setCalculationResult(monthlyLoss);

    // Prepare webhook payload
    const payload = {
      name: formData.name,
      businessName: formData.businessName,
      email: formData.email,
      phone: formData.phone || '',
      avgJobValue: avgJobValue,
      leadsPerWeek: leadsPerWeek,
      percentMissed: percentMissed,
      calculatedLoss: monthlyLoss,
      timestamp: new Date().toISOString(),
      source: 'services-page-calculator',
    };

    // Submit to GHL webhook
    try {
      const response = await fetch(
        'https://services.leadconnectorhq.com/hooks/11am6QHObrEmx0qnQg7g/webhook-trigger/cbc1a239-54a7-4c7f-8594-b0165308238f',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        console.error('Webhook submission failed:', response.status);
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Webhook error:', error);
      // Still show result even if webhook fails
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-semibold">Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  required
                  value={formData.businessName}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase font-semibold">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase font-semibold">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                onChange={handleChange}
              />
            </div>

            <div className="h-px bg-slate-800 my-4" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-semibold">Avg Job Value ($)</label>
                <input
                  type="number"
                  name="avgJobValue"
                  required
                  placeholder="e.g. 1500"
                  value={formData.avgJobValue}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase font-semibold">Leads Per Week</label>
                <input
                  type="number"
                  name="leadsPerWeek"
                  required
                  placeholder="e.g. 10"
                  value={formData.leadsPerWeek}
                  className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-500 transition-colors"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase font-semibold">% Leads missed (10+ mins delay)</label>
              <input
                type="number"
                name="percentMissed"
                required
                max="100"
                min="0"
                placeholder="e.g. 30"
                value={formData.percentMissed}
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
            <Button
              onClick={() => {
                window.location.href = 'https://book.redwaterrev.com/book';
              }}
              className="w-full"
            >
              Book a Call to Fix This
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
