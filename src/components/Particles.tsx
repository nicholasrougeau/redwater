import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const colors = ['bg-brand-red', 'bg-brand-orange', 'bg-brand-gold'];

export const Particles = () => {
  const [enabled, setEnabled] = useState(false);

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
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(60)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${colors[i % colors.length]} opacity-30`}
          style={{
            width: Math.random() * 6 + 3 + 'px',
            height: Math.random() * 6 + 3 + 'px',
          }}
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
            opacity: 0,
          }}
          animate={{
            y: [null, Math.random() > 0.5 ? '-120%' : '120%'],
            x: [null, (Math.random() - 0.5) * 20 + '%'],
            opacity: [0, 0.6, 0],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};
