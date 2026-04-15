import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full border-b border-zinc-100 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
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

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/services" className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red">
            Services
          </Link>
          <Link to="/case-studies" className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red">
            Case Studies
          </Link>
          <Link to="/about" className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red">
            About
          </Link>
          <Link to="/contact" className="text-sm font-medium text-zinc-600 transition-colors hover:text-brand-red">
            Contact
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-brand-red"
          >
            Book a Call
          </Link>
        </div>
      </div>
    </nav>
  );
};
