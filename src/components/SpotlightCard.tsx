import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'motion/react';
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  key?: string | number;
}

export const SpotlightCard = ({ children, className = '', tilt = true }: SpotlightCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized pointer position relative to card center, -0.5 .. 0.5
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(ny, (v) => -v * 6), springConfig);
  const rotateY = useSpring(useTransform(nx, (v) => v * 6), springConfig);

  const [tiltEnabled, setTiltEnabled] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !tilt) return;
    const desktop = window.matchMedia('(min-width: 768px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setTiltEnabled(desktop.matches && !reduced.matches);
    update();
    desktop.addEventListener('change', update);
    reduced.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, [tilt]);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const localX = clientX - left;
    const localY = clientY - top;
    mouseX.set(localX);
    mouseY.set(localY);
    nx.set(localX / width - 0.5);
    ny.set(localY / height - 0.5);
  }

  function handleMouseLeave() {
    nx.set(0);
    ny.set(0);
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 138, 0, 0.12),
      transparent 80%
    )
  `;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 1200 } : undefined}
      className={`group relative rounded-3xl border border-zinc-100 bg-white p-8 transition-all hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/5 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0 overflow-hidden"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
