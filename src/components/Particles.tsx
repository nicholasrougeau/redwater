import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';

const colors = ['bg-brand-red', 'bg-brand-orange', 'bg-brand-gold'];
const COUNT = 40;

interface Particle {
  left: string;
  top: string;
  size: number;
  colorClass: string;
  duration: number;
  delay: number;
  drift: number;
  direction: 1 | -1;
}

export const Particles = () => {
  const [enabled, setEnabled] = useState(false);

  // Compute positions once — stable across rerenders, spread across the full viewport.
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 3,
      colorClass: colors[i % colors.length],
      duration: Math.random() * 18 + 14,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 80,
      direction: Math.random() > 0.5 ? 1 : -1,
    }));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.colorClass} opacity-40`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, p.direction * 300],
            x: [0, p.drift],
            opacity: [0, 0.6, 0],
            scale: [0.6, 1.4, 0.6],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};
