import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

const roadmapItems = [
  {
    step: "01",
    title: "Audit & Architecture",
    description: "We deep-dive into your current tech stack and workflows to identify bottlenecks and high-leverage automation opportunities.",
  },
  {
    step: "02",
    title: "System Engineering",
    description: "Our team builds your custom AI operating system, integrating your CRM, content pipelines, and lead gen engines.",
  },
  {
    step: "03",
    title: "Deployment & Training",
    description: "We launch the systems and train your team (or you) on how to manage the new automated infrastructure.",
  },
  {
    step: "04",
    title: "Scale & Optimize",
    description: "Continuous monitoring and optimization to ensure your AI systems are generating maximum ROI as you grow.",
  },
];

export const Roadmap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 text-center">
          <h2 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">The Path to Automation</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-500">A systematic approach to transforming your business into an AI-first powerhouse.</p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Squiggly Path SVG */}
          <div className="absolute inset-0 pointer-events-none hidden md:block">
            <svg
              viewBox="0 0 1000 1400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M500 0 C 900 300, 100 400, 500 700 C 900 1000, 100 1100, 500 1400"
                stroke="rgba(244, 244, 245, 1)"
                strokeWidth="4"
                strokeDasharray="12 12"
              />
              <motion.path
                d="M500 0 C 900 300, 100 400, 500 700 C 900 1000, 100 1100, 500 1400"
                stroke="url(#roadmap-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                style={{ pathLength }}
              />
              <defs>
                <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-brand-red)" />
                  <stop offset="50%" stopColor="var(--color-brand-orange)" />
                  <stop offset="100%" stopColor="var(--color-brand-gold)" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Mobile Vertical Line */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-100 md:hidden">
            <motion.div
              style={{ scaleY: pathLength, originY: 0 }}
              className="h-full w-full luxury-gradient"
            />
          </div>

          <div className="space-y-32 md:space-y-0">
            {roadmapItems.map((item, i) => (
              <RoadmapItem key={item.step} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface RoadmapItemProps {
  item: typeof roadmapItems[0];
  index: number;
  key?: string | number;
}

const RoadmapItem = ({ item, index }: RoadmapItemProps) => {
  const isEven = index % 2 === 0;
  
  // Align items with the peaks of the squiggle
  // index 0: Right peak
  // index 1: Left peak
  // index 2: Right peak
  // index 3: Left peak
  const xOffset = isEven ? "md:translate-x-[60%]" : "md:-translate-x-[60%]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex flex-col md:flex-row md:h-[350px] items-center justify-center`}
    >
      {/* Dot - Positioned on the squiggle path */}
      <div className="absolute left-4 top-0 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white border-4 border-zinc-50 shadow-xl md:left-1/2 md:top-1/2 md:-translate-y-1/2">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="h-5 w-5 rounded-full bg-brand-red shadow-[0_0_20px_rgba(255,31,31,0.6)]" 
        />
      </div>

      <div className={`ml-12 md:ml-0 md:w-[35%] p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-zinc-100 shadow-lg transition-all hover:shadow-2xl hover:border-brand-orange/30 ${xOffset}`}>
        <div className="mb-2 font-display text-6xl font-black opacity-5">
          {item.step}
        </div>
        <h3 className="mb-3 text-2xl font-bold text-zinc-900">{item.title}</h3>
        <p className="text-zinc-500 leading-relaxed text-sm">{item.description}</p>
      </div>
    </motion.div>
  );
};
