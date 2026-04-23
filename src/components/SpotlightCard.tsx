import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform } from 'motion/react';
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Enable 3D tilt effect. Default true. */
  tilt?: boolean;
  /** Dark-mode treatment (darker base, same cursor-following glow) for on-dark cards. */
  dark?: boolean;
  key?: string | number;
}

/**
 * Card with a cursor-following multi-color border glow (brand red → orange → gold)
 * and subtle 3D tilt. The border is a radial gradient masked to a ~1.5px ring so
 * it lights up around the pointer — full corner coverage.
 *
 * Padding: p-8 by default; override with className (e.g. `!p-0`, `!p-4`).
 */
export const SpotlightCard = ({ children, className = '', tilt = true, dark = false }: SpotlightCardProps) => {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  const nx = useMotionValue(0);
  const ny = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.6 };
  const rotateX = useSpring(useTransform(ny, (v) => -v * 2.5), springConfig);
  const rotateY = useSpring(useTransform(nx, (v) => v * 2.5), springConfig);

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
    mouseX.set(-400);
    mouseY.set(-400);
  }

  // Cursor-following multi-color border (brand red → orange → gold)
  const borderBg = useMotionTemplate`radial-gradient(
    320px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 31, 31, 1),
    rgba(255, 138, 0, 0.85) 30%,
    rgba(184, 134, 11, 0.5) 55%,
    transparent 80%
  )`;

  // Soft inner fill that tracks the cursor
  const fillBg = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 138, 0, 0.08),
    transparent 80%
  )`;

  const baseBg = dark ? 'bg-zinc-900' : 'bg-white';
  const baseBorder = dark ? 'border-white/10' : 'border-zinc-100';

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltEnabled ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
      className={`group relative rounded-3xl border ${baseBorder} ${baseBg} p-8 transition-shadow hover:shadow-2xl hover:shadow-brand-orange/10 ${className}`}
    >
      {/* Cursor-following gradient border — mask-composite cuts it to a ~1.5px ring */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: borderBg,
          WebkitMask: 'linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1.5px',
        }}
      />
      {/* Soft inner fill */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: fillBg }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
