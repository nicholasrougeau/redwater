import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { SEO } from '../lib/seo';
import { getService, getBucket, servicesInBucket } from '../data/services';

export const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;

  if (!service) {
    return (
      <div className="pt-32 pb-24">
        <SEO
          title="Service not found — Redwater Revenue"
          description="That service doesn't exist. Browse the full catalog."
          path="/services"
        />
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900">Service not found.</h1>
          <p className="mb-8 text-zinc-500">
            That URL doesn't match anything in the catalog. Head back to services to find what you
            need.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 font-bold text-white transition-all hover:bg-brand-red"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  const bucket = getBucket(service.bucket);
  const Icon = service.icon;
  const related = servicesInBucket(service.bucket).filter((s) => s.slug !== service.slug);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.outcome,
    serviceType: bucket?.title ?? 'AI automation',
    provider: {
      '@type': 'Organization',
      name: 'Redwater Revenue',
      url: 'https://redwaterrev.com',
    },
  };

  return (
    <div className="pt-32 pb-24">
      <SEO
        title={`${service.title} | Redwater Revenue`}
        description={service.outcome}
        path={`/services/${service.slug}`}
        jsonLd={serviceJsonLd}
      />
      <div className="mx-auto max-w-5xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
          <Link to="/" className="hover:text-brand-red transition-colors">
            Home
          </Link>
          <span className="text-zinc-300">/</span>
          <Link to="/services" className="hover:text-brand-red transition-colors">
            Services
          </Link>
          {bucket && (
            <>
              <span className="text-zinc-300">/</span>
              <span className="text-zinc-700">{bucket.title}</span>
            </>
          )}
        </nav>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="mb-8 flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-red/5 text-brand-red">
              <Icon className="h-8 w-8" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-orange/20 bg-brand-orange/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-orange">
              {service.tagline}
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-[1.1] text-zinc-900 md:text-7xl">
            {service.title}
          </h1>
          <p className="max-w-3xl text-xl text-zinc-500 md:text-2xl">{service.outcome}</p>
          <p className="mt-6 max-w-3xl text-lg text-zinc-500 leading-relaxed">
            {service.description}
          </p>
        </motion.div>

        {/* Deliverables */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-zinc-900 md:text-4xl">What you get</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {service.deliverables.map((d) => (
              <li
                key={d}
                className="flex items-start gap-4 rounded-2xl border border-zinc-100 bg-white p-6"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                  <Check className="h-4 w-4" />
                </div>
                <span className="text-zinc-700 leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ideal for */}
        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-zinc-900 md:text-4xl">Ideal for</h2>
          <ul className="space-y-3">
            {service.idealFor.map((i) => (
              <li key={i} className="flex items-start gap-4 text-lg text-zinc-600">
                <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red" />
                {i}
              </li>
            ))}
          </ul>
        </section>

        {/* How it fits */}
        {bucket && related.length > 0 && (
          <section className="mb-20 rounded-3xl border border-zinc-100 bg-zinc-50/50 p-8 md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">How it fits</h2>
            <p className="mb-8 max-w-3xl text-lg text-zinc-500 leading-relaxed">
              {service.title} lives inside{' '}
              <Link to="/services" className="text-brand-red font-bold hover:underline">
                {bucket.title}
              </Link>
              . It pairs well with the rest of the bucket — most engagements end up stacking two or
              three of these together.
            </p>
            <div className="flex flex-wrap gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/services/${r.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:border-brand-orange/40 hover:text-brand-red"
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-3xl bg-zinc-900 p-10 text-center text-white md:p-16">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Want this running in your business?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-zinc-400">
            Book a call. We'll scope the work to your stack and hand back a plan the same week.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-orange px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Book a call to scope this
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
};
