import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../lib/seo';

export const About = () => {
  return (
    <div className="pt-32 pb-24">
      <SEO
        title="About — Redwater Revenue"
        description="Redwater Revenue is Nick Rougeau's AI automation agency. We build operating systems for coaches, lawyers, consultants, professional services, and agencies."
        path="/about"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-24 max-w-3xl">
          <h1 className="mb-6 text-5xl font-bold text-zinc-900 md:text-7xl">
            We build operating systems, not one-off automations.
          </h1>
          <p className="text-xl text-zinc-500">
            Redwater Revenue is a small, senior team shipping AI automation for the businesses that actually drive professional services revenue: coaches, lawyers, consultants, and agencies.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-2 mb-32">
          <div className="space-y-6 text-lg text-zinc-600">
            <h2 className="text-4xl font-bold text-zinc-900 mb-2">Who</h2>
            <p>
              Redwater Revenue is founded and run by Nick Rougeau out of South Louisiana. Nick is an AI engineer who has spent the last several years shipping outreach systems, custom CRMs, content pipelines, and research automations for clients ranging from local service businesses to a $900M real estate firm.
            </p>
            <p>
              The bar: every system has to produce a number you can point to — cash collected, reviews earned, hours reclaimed, positions ranked, deals closed. If we can't tie the build to an outcome, we don't scope it.
            </p>
          </div>

          <div className="rounded-3xl bg-zinc-900 p-12 text-white">
            <h2 className="mb-6 text-3xl font-bold">Who we build for</h2>
            <ul className="space-y-4 text-lg text-zinc-300">
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />Coaches running high-ticket programs</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />Lawyers and professional services firms</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />Consultants and solo operators scaling without headcount</li>
              <li className="flex items-start gap-3"><span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-orange" />Agencies replacing manual delivery with engineered systems</li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 grid gap-16 lg:grid-cols-2"
        >
          <div>
            <h2 className="mb-6 text-4xl font-bold text-zinc-900">How we work</h2>
            <div className="space-y-6 text-lg text-zinc-600">
              <p>
                Most agencies sell services. We sell systems. Every engagement starts with a scoping call where we map the workflow, identify the highest-leverage surface to automate, and ship a first working piece in days — not quarters.
              </p>
              <p>
                From there, we either hand it off or layer on the next system until the whole operating stack is running: outreach feeding CRM, CRM feeding reporting, reporting feeding content, content feeding outreach.
              </p>
              <p>
                No jargon. No "AI strategy decks." We ship.
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-4xl font-bold text-zinc-900">What "AI operating system" means</h2>
            <div className="space-y-6 text-lg text-zinc-600">
              <p>
                An operating system is the layer everything else runs on. For a modern professional services business, that layer should be doing the repetitive reasoning work — drafting follow-ups, triaging inboxes, assembling reports, researching leads, repurposing content.
              </p>
              <p>
                We wire that layer into your existing tools so it runs in the background while you focus on the work only a human can do: closing deals, serving clients, making decisions.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-10 md:p-16">
          <h2 className="mb-4 text-3xl font-bold text-zinc-900 md:text-4xl">The offer, in seven buckets</h2>
          <p className="mb-8 max-w-3xl text-lg text-zinc-500">
            Retainer, outreach and lead gen, websites and sales assets, custom automation and engineering, SEO and content ops, content and video production, research and intelligence. Pick one or stack them.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            See the catalog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
