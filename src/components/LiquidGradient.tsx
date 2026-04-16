import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface LiquidGradientProps {
  /** `hero` = more opacity, `subtle` = background ambience */
  intensity?: 'subtle' | 'hero';
  className?: string;
}

interface Blob {
  color: string;
  startX: string;
  startY: string;
  size: string;
  xs: number[];
  ys: number[];
  scales: number[];
  duration: number;
}

// Hard-coded blob configs — uniquely positioned so they don't stack
// in one corner. Each blob has its own slow drift/scale loop.
const BLOBS: Blob[] = [
  {
    color: 'radial-gradient(circle, rgba(255, 31, 31, 0.9) 0%, rgba(255, 31, 31, 0) 70%)',
    startX: '5%',
    startY: '-10%',
    size: '55%',
    xs: [0, 80, -40, 0],
    ys: [0, 60, -30, 0],
    scales: [1, 1.15, 0.9, 1],
    duration: 22,
  },
  {
    color: 'radial-gradient(circle, rgba(255, 138, 0, 0.9) 0%, rgba(255, 138, 0, 0) 70%)',
    startX: '55%',
    startY: '-15%',
    size: '60%',
    xs: [0, -70, 40, 0],
    ys: [0, 50, -20, 0],
    scales: [1, 0.9, 1.2, 1],
    duration: 28,
  },
  {
    color: 'radial-gradient(circle, rgba(184, 134, 11, 0.9) 0%, rgba(184, 134, 11, 0) 70%)',
    startX: '15%',
    startY: '45%',
    size: '50%',
    xs: [0, 50, -60, 0],
    ys: [0, -40, 20, 0],
    scales: [1, 1.1, 0.95, 1],
    duration: 32,
  },
  {
    color: 'radial-gradient(circle, rgba(255, 31, 31, 0.7) 0%, rgba(255, 31, 31, 0) 70%)',
    startX: '60%',
    startY: '40%',
    size: '45%',
    xs: [0, -50, 30, 0],
    ys: [0, -60, 30, 0],
    scales: [1, 1.2, 0.85, 1],
    duration: 26,
  },
];

export const LiquidGradient = ({ intensity = 'subtle', className = '' }: LiquidGradientProps) => {
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

  const containerOpacity = intensity === 'hero' ? 0.65 : 0.35;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: enabled ? containerOpacity : 0, transition: 'opacity 800ms' }}
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.startX,
            top: b.startY,
            width: b.size,
            height: b.size,
            background: b.color,
            filter: 'blur(70px)',
            willChange: 'transform',
          }}
          animate={
            enabled
              ? {
                  x: b.xs,
                  y: b.ys,
                  scale: b.scales,
                }
              : undefined
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
