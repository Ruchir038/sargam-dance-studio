import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ onOpenTrial, onOpenPartyBuilder }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0C0A14]/95 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl shadow-black/50'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Lockup */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 p-[1.5px] transition-transform duration-200 group-hover:scale-105 shadow-md shadow-rose-950/40">
                <div className="w-full h-full bg-[#0C0A14] rounded-xl flex items-center justify-center">
                  <span className="text-xl">💃</span>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold tracking-tight text-xl text-white group-hover:text-rose-400 transition-colors">
                    SARGAM
                  </span>
                  <span className="font-hindi text-xs px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10">
                    सरगम
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium">
                  Dance Studio • Jaipur
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#styles"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Styles
              </a>
              <a
                href="#schedule"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Schedule & Spots
              </a>
              <a
                href="#workshops"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>Workshops</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                  DROP
                </span>
              </a>
              <a
                href="#instructors"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Instructors
              </a>
              <button
                onClick={onOpenPartyBuilder}
                className="text-sm font-medium text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Sangeet & Events
              </button>
              <a
                href="#pricing"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Pricing
              </a>
            </nav>

            {/* Right Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-rose-950/60 hover:shadow-rose-900/40 cursor-pointer active:scale-95"
              >
                <span>Book Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0C0A14]/98 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <a
              href="#styles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-rose-400 py-2 border-b border-white/5"
            >
              Dance Styles
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-rose-400 py-2 border-b border-white/5"
            >
              Schedule & Formation Spots
            </a>
            <a
              href="#workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-rose-400 py-2 border-b border-white/5 flex items-center justify-between"
            >
              <span>Workshops & Masterclasses</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                DROP
              </span>
            </a>
            <a
              href="#instructors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-rose-400 py-2 border-b border-white/5"
            >
              Choreographers & Crew
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartyBuilder();
              }}
              className="text-left text-slate-200 hover:text-rose-400 py-2 border-b border-white/5 cursor-pointer"
            >
              Wedding Sangeet & Event Choreography
            </button>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-200 hover:text-rose-400 py-2 border-b border-white/5"
            >
              Pricing & Packages
            </a>
          </nav>

          <div className="space-y-3 pt-4 border-t border-white/5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm text-center shadow-lg transition-colors cursor-pointer"
            >
              Book Free Trial Class
            </button>
            <div className="text-center text-xs text-slate-400">
              📍 Malviya Nagar (GT Central) & Vaishali Nagar, Jaipur
            </div>
          </div>
        </div>
      )}
    </>
  );
}
