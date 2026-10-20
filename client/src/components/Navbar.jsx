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
            ? 'bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#E7E5E0] py-3.5 shadow-xs'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-baseline gap-2 group">
              <span className="font-display font-semibold text-2xl tracking-tight text-[#1C1917]">
                Sargam
              </span>
              <span className="font-hindi text-xs text-[#78716C] font-normal">
                सरगम
              </span>
              <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-[#A8A29E] font-medium ml-1">
                • Jaipur
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <a
                href="#styles"
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                Styles
              </a>
              <a
                href="#schedule"
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                Schedule & Spots
              </a>
              <a
                href="#workshops"
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                Workshops
              </a>
              <a
                href="#instructors"
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                Instructors
              </a>
              <button
                onClick={onOpenPartyBuilder}
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#9F1239] transition-colors cursor-pointer"
              >
                Sangeet & Events
              </button>
              <a
                href="#pricing"
                className="text-xs uppercase tracking-wider font-medium text-[#57534E] hover:text-[#1C1917] transition-colors"
              >
                Pricing
              </a>
            </nav>

            {/* Right Action */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenTrial}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white text-xs font-medium tracking-wide transition-all shadow-sm cursor-pointer active:scale-95"
              >
                <span>Book a Trial</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#1C1917] hover:bg-stone-200/60 transition-colors"
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
        <div className="fixed inset-0 z-40 bg-[#FAF9F6]/98 backdrop-blur-xl lg:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <a
              href="#styles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1917] py-2 border-b border-[#E7E5E0]"
            >
              Dance Styles
            </a>
            <a
              href="#schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1917] py-2 border-b border-[#E7E5E0]"
            >
              Schedule & Formation Spots
            </a>
            <a
              href="#workshops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1917] py-2 border-b border-[#E7E5E0]"
            >
              Workshops & Masterclasses
            </a>
            <a
              href="#instructors"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1917] py-2 border-b border-[#E7E5E0]"
            >
              Choreographers
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPartyBuilder();
              }}
              className="text-left text-[#1C1917] py-2 border-b border-[#E7E5E0] cursor-pointer"
            >
              Wedding Sangeet & Private Events
            </button>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#1C1917] py-2 border-b border-[#E7E5E0]"
            >
              Pricing & Packages
            </a>
          </nav>

          <div className="space-y-3 pt-4 border-t border-[#E7E5E0]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-3 rounded-full bg-[#1C1917] text-white font-medium text-sm text-center shadow-sm cursor-pointer"
            >
              Book a Trial Class
            </button>
            <div className="text-center text-xs text-[#78716C]">
              Malviya Nagar & Vaishali Nagar, Jaipur
            </div>
          </div>
        </div>
      )}
    </>
  );
}
