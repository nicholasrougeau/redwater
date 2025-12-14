import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen font-sans antialiased text-slate-200 selection:bg-accent-500/30">
        <Background />
        <Navbar />

        <main className="relative z-10 flex flex-col gap-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </main>

        <footer className="relative z-10 py-12 border-t border-slate-900 bg-slate-950 text-slate-600 text-sm text-center">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Redwater Revenue. Growth systems for service businesses.</p>
            <p className="mt-2 text-slate-700">
              <a href="mailto:nick@redwaterrev.com" className="hover:text-accent-500 transition-colors">
                nick@redwaterrev.com
              </a>
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;