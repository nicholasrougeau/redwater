import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-100 bg-zinc-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-bold tracking-tighter text-zinc-900">
                REDWATER<span className="text-brand-red">REVENUE</span>
              </span>
            </Link>
            <p className="max-w-md text-zinc-500 leading-relaxed">
              AI operating systems for coaches, lawyers, consultants, and agencies. Based in South Louisiana, shipping for clients nationwide.
            </p>
          </div>

          <div>
            <h4 className="mb-6 font-display font-bold uppercase tracking-widest text-zinc-400 text-xs">Navigation</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-zinc-600 hover:text-brand-red transition-colors">Services</Link></li>
              <li><Link to="/case-studies" className="text-zinc-600 hover:text-brand-red transition-colors">Case Studies</Link></li>
              <li><Link to="/about" className="text-zinc-600 hover:text-brand-red transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-zinc-600 hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-display font-bold uppercase tracking-widest text-zinc-400 text-xs">Connect</h4>
            <ul className="space-y-4">
              <li><a href="mailto:nick@redwaterrev.com" className="text-zinc-600 hover:text-brand-red transition-colors">nick@redwaterrev.com</a></li>
              <li><Link to="/contact" className="text-zinc-600 hover:text-brand-red transition-colors">Book a call</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div>© 2026 Redwater Revenue. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="mailto:nick@redwaterrev.com" className="hover:text-brand-red transition-colors">nick@redwaterrev.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
