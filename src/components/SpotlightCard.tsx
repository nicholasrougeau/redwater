import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { MouseEvent, ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  key?: string | number;
}

export const SpotlightCard = ({ children, className = "" }: SpotlightCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 138, 0, 0.1),
      transparent 80%
    )
  `;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-zinc-100 bg-white p-8 transition-all hover:border-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/5 ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 z-0 overflow-hidden"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
