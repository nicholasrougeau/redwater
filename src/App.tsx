import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MouseFollower } from './components/MouseFollower';

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const Services = lazy(() => import('./pages/Services').then((m) => ({ default: m.Services })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const CaseStudies = lazy(() =>
  import('./pages/CaseStudies').then((m) => ({ default: m.CaseStudies })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const RouteFallback = () => (
  <div className="flex min-h-[60vh] items-center justify-center text-sm text-zinc-400">
    Loading…
  </div>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen selection:bg-brand-orange/30">
        <MouseFollower />
        <Navbar />
        <main>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
