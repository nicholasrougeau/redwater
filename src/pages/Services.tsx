import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SpotlightCard } from '../components/SpotlightCard';
import { SEO } from '../lib/seo';
import { BUCKETS, getService, servicesInBucket } from '../data/services';

const FEATURED_SLUG = 'full-stack-agency-operator';

export const Services = () => {
  const featured = getService(FEATURED_SLUG);
  const nonBundledBuckets = BUCKETS.filter((b) => b.slug !== 'bundled');

  return (
    <div className="pt-32 pb-24">
      <SEO
        title="Services — Redwater Revenue"
        description="The full Redwater Revenue services catalog: outreach, websites, custom automation, SEO, content, and research systems. Custom-scoped. Projects from $500 to $15k+."
        path="/services"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">What we build.</h1>
          <p className="text-xl text-zinc-500">
            Every revenue-facing system we build. Pick a piece — or wire the full stack.
          </p>
        </div>

        {/* Featured / Retainer */}
        {featured && (
          <div id="bundled" className="mb-24 scroll-mt-32">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-red/20 bg-brand-red/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-red">
              {featured.tagline}
            </div>
            <SpotlightCard dark tilt={false} className="!p-10 md:!p-16 text-white">
              <div>
                <h2 className="mb-4 text-4xl font-bold md:text-5xl">{featured.title}</h2>
                <p className="mb-10 max-w-3xl text-lg text-zinc-300">{featured.outcome}</p>
                <ul className="mb-10 grid gap-4 md:grid-cols-2">
                  {featured.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-zinc-200">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
                >
                  See the system
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        )}

        {/* Buckets */}
        <div className="space-y-24">
          {nonBundledBuckets.map((bucket, i) => {
            const services = servicesInBucket(bucket.slug);
            return (
              <motion.section
                key={bucket.slug}
                id={bucket.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="scroll-mt-32"
              >
                <div className="mb-10 flex items-end gap-6 border-b border-zinc-100 pb-6">
                  <div className="font-display text-6xl font-black text-zinc-100 leading-none">
                    {String(i + 2).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className="mb-2 text-3xl font-bold text-zinc-900 md:text-4xl">
                      {bucket.title}
                    </h2>
                    <p className="text-lg text-zinc-500">{bucket.intro}</p>
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      className="group relative rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-zinc-900">{s.title}</h3>
                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-brand-red" />
                      </div>
                      <p className="text-sm text-zinc-500 leading-relaxed">{s.outcome}</p>
                    </Link>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Pricing framing */}
        <div className="mt-32 rounded-3xl border border-zinc-100 bg-zinc-50 p-10 md:p-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
            Custom-scoped. Projects from $500 to $15k+.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-500">
            No menu pricing. We scope each engagement to the outcome and the surface area — from a single skill build to a full-stack system retainer.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Get a quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
