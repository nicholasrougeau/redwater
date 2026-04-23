import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '../lib/seo';
import { getBucket, servicesInBucket } from '../data/services';

export const BucketDetail = () => {
  const { bucketSlug } = useParams<{ bucketSlug: string }>();

  if (bucketSlug === 'bundled') {
    return <Navigate to="/services/full-stack-system" replace />;
  }

  const bucket = bucketSlug ? getBucket(bucketSlug) : undefined;

  if (!bucket) {
    return (
      <div className="pt-32 pb-24">
        <SEO
          title="Category not found — Redwater Revenue"
          description="The requested services category could not be found."
          path={`/services/category/${bucketSlug ?? ''}`}
        />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 md:text-5xl">
            Category not found.
          </h1>
          <p className="mb-8 text-lg text-zinc-500">
            We couldn't find that services category. It may have been renamed or moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  const services = servicesInBucket(bucket.slug);

  return (
    <div className="pt-32 pb-24">
      <SEO
        title={`${bucket.title} — Redwater Revenue`}
        description={bucket.intro}
        path={`/services/category/${bucket.slug}`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <Link
          to="/services"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors hover:text-brand-red"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All services
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50/50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-zinc-500">
            Services category
          </div>
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">
            {bucket.title}
          </h1>
          <p className="text-xl text-zinc-500">{bucket.intro}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                to={`/services/${s.slug}`}
                className="group relative block h-full rounded-2xl border border-zinc-100 bg-white p-6 transition-all hover:border-brand-orange/30 hover:shadow-xl hover:shadow-brand-orange/5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-zinc-900">{s.title}</h3>
                  <ArrowRight className="h-4 w-4 flex-shrink-0 text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-brand-red" />
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.outcome}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-zinc-100 bg-zinc-50 p-10 md:p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">
            Need more than one piece?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-500">
            We wire the full stack — outreach, CRM, content, reporting, onboarding — under one retainer.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-4 font-bold text-zinc-900 transition-all hover:bg-zinc-100"
            >
              See all services
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
            >
              Book a call
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
