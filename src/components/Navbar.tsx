import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronDown,
  Cpu,
  Layers,
  Mail,
  Menu,
  Monitor,
  Search,
  Telescope,
  Video,
  X,
  type LucideIcon,
} from 'lucide-react';
import { BUCKETS, SERVICES, servicesInBucket } from '../data/services';

const BUCKET_ICON: Record<string, LucideIcon> = {
  bundled: Layers,
  outreach: Mail,
  'website-sales-assets': Monitor,
  'custom-automation': Cpu,
  'seo-content-ops': Search,
  'content-video': Video,
  'research-intelligence': Telescope,
};

const DROPDOWN_MOTION = {
  initial: { opacity: 0, y: -8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.98 },
  transition: { duration: 0.18, ease: [0.2, 0.8, 0.2, 1] as const },
};

export const Navbar = () => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBucket, setMobileBucket] = useState<string | null>(null);
  const location = useLocation();
  const closeTimer = useRef<number | null>(null);

  // Close menus on route change
  useEffect(() => {
    setDesktopOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setMobileBucket(null);
  }, [location.pathname, location.hash]);

  // Lock scroll when mobile drawer open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const openDropdown = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDesktopOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDesktopOpen(false), 120);
  };

  return (
    <nav className="fixed top-0 left-0 z-40 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src="/logo.svg"
            alt="Redwater Revenue"
            className="h-10 w-10"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <span className="font-display text-xl font-bold tracking-tighter text-zinc-900">
            REDWATER<span className="text-brand-red">REVENUE</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={desktopOpen}
              onFocus={openDropdown}
              onClick={() => setDesktopOpen((v) => !v)}
              className="flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red focus:text-brand-red focus:outline-none"
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  desktopOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            <AnimatePresence>
              {desktopOpen && (
                <motion.div
                  {...DROPDOWN_MOTION}
                  className="absolute left-1/2 top-full z-50 w-[min(90vw,720px)] -translate-x-1/2 pt-4"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                >
                  <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-2xl shadow-zinc-900/10">
                    <ul className="divide-y divide-zinc-100">
                      {BUCKETS.map((bucket) => {
                        const Icon = BUCKET_ICON[bucket.slug] ?? Layers;
                        const featured = bucket.slug === 'bundled';
                        const bucketHref = featured
                          ? '/services/full-stack-system'
                          : `/services/category/${bucket.slug}`;
                        return (
                          <li key={bucket.slug}>
                            <Link
                              to={bucketHref}
                              className={`group flex items-center gap-4 px-5 py-4 transition-colors ${
                                featured
                                  ? 'bg-brand-red/[0.03] hover:bg-brand-red/[0.06]'
                                  : 'hover:bg-zinc-50'
                              }`}
                              onClick={() => setDesktopOpen(false)}
                            >
                              <span
                                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-colors ${
                                  featured
                                    ? 'bg-brand-red/10 text-brand-red'
                                    : 'bg-zinc-100 text-zinc-700 group-hover:bg-brand-orange/10 group-hover:text-brand-red'
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span
                                    className={`text-sm font-bold ${
                                      featured ? 'text-brand-red' : 'text-zinc-900'
                                    }`}
                                  >
                                    {bucket.title}
                                  </span>
                                  {featured && (
                                    <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">
                                      Flagship
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-xs text-zinc-500">
                                  {bucket.intro}
                                </span>
                              </span>
                              <ChevronDown className="h-4 w-4 -rotate-90 flex-shrink-0 text-zinc-300 transition-all group-hover:-translate-y-0.5 group-hover:text-brand-red" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50 px-5 py-3">
                      <span className="text-xs text-zinc-500">
                        {`${SERVICES.length} services across ${BUCKETS.length} categories`}
                      </span>
                      <Link
                        to="/services"
                        className="text-xs font-bold text-brand-red hover:underline"
                        onClick={() => setDesktopOpen(false)}
                      >
                        View all →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/case-studies"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red"
          >
            Case Studies
          </Link>
          <Link
            to="/learn"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red"
          >
            Learn
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red"
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] bottom-0 z-30 overflow-y-auto border-t border-zinc-100 bg-white md:hidden"
          >
            <div className="px-6 py-6">
              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-base font-semibold text-zinc-900 hover:bg-zinc-50"
                  >
                    Services
                    <ChevronDown
                      className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <ul className="mt-1 space-y-1 pl-2">
                          {BUCKETS.map((bucket) => {
                            const Icon = BUCKET_ICON[bucket.slug] ?? Layers;
                            const expanded = mobileBucket === bucket.slug;
                            const services = servicesInBucket(bucket.slug);
                            const featured = bucket.slug === 'bundled';
                            return (
                              <li key={bucket.slug}>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileBucket(expanded ? null : bucket.slug)
                                  }
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-zinc-50"
                                >
                                  <span
                                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${
                                      featured
                                        ? 'bg-brand-red/10 text-brand-red'
                                        : 'bg-zinc-100 text-zinc-700'
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </span>
                                  <span className="flex-1 text-sm font-semibold text-zinc-800">
                                    {bucket.title}
                                  </span>
                                  <ChevronDown
                                    className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
                                      expanded ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                                <AnimatePresence initial={false}>
                                  {expanded && (
                                    <motion.ul
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden pl-12"
                                    >
                                      <li>
                                        <Link
                                          to={
                                            bucket.slug === 'bundled'
                                              ? '/services/full-stack-system'
                                              : `/services/category/${bucket.slug}`
                                          }
                                          className="block rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider text-brand-red hover:bg-brand-red/5"
                                          onClick={() => setMobileOpen(false)}
                                        >
                                          View bucket →
                                        </Link>
                                      </li>
                                      {services.map((s) => {
                                        const ServiceIcon = s.icon;
                                        return (
                                          <li key={s.slug}>
                                            <Link
                                              to={`/services/${s.slug}`}
                                              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-brand-red"
                                              onClick={() => setMobileOpen(false)}
                                            >
                                              <ServiceIcon className="h-4 w-4 flex-shrink-0 text-zinc-400" />
                                              <span className="truncate">{s.title}</span>
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </motion.ul>
                                  )}
                                </AnimatePresence>
                              </li>
                            );
                          })}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                <li>
                  <Link
                    to="/case-studies"
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/learn"
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    Learn
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block rounded-lg px-3 py-3 text-base font-semibold text-zinc-900 hover:bg-zinc-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-red"
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
