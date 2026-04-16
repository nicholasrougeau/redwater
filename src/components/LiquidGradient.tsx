import { useEffect, useState } from 'react';

interface LiquidGradientProps {
  /**
   * Visual intensity. `subtle` for most pages, `hero` for the home hero where
   * we want more presence. Defaults to `subtle`.
   */
  intensity?: 'subtle' | 'hero';
  className?: string;
}

/**
 * Animated multi-blob gradient background. Pure CSS keyframes, GPU-composited.
 * Disabled on mobile (perf) and when reduced-motion is requested.
 */
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

  const baseOpacity = intensity === 'hero' ? 0.55 : 0.28;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: enabled ? baseOpacity : 0, transition: 'opacity 800ms' }}
    >
      <div className="liquid-blob liquid-blob--a" />
      <div className="liquid-blob liquid-blob--b" />
      <div className="liquid-blob liquid-blob--c" />
      <div className="liquid-blob liquid-blob--d" />
    </div>
  );
};
