import React from 'react';
import SargamKeyboard from './SargamKeyboard';
import { Phone, MessageSquare, Heart, Settings } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

export default function Footer({ onOpenAdmin, onOpenParentMode, onOpenTrial }) {
  return (
    <footer className="bg-[#FAF9F6] text-[#1C1917] border-t border-[#E7E5E0] overflow-hidden">
      {/* Interactive Sargam Swaras Synthesizer */}
      <SargamKeyboard />

      {/* Main Studio Details Columns */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-semibold text-2xl tracking-tight text-[#1C1917]">
                Sargam
              </span>
              <span className="font-hindi text-xs text-[#78716C] font-normal">
                सरगम
              </span>
            </div>
            <p className="font-display italic text-base text-[#9F1239]">
              "Where every beat finds its dancer."
            </p>
            <p className="text-xs text-[#78716C] leading-relaxed">
              Jaipur's dance academy dedicated to technical training, fitness routines, underground battles, and wedding sangeet choreography.
            </p>

            <div className="flex gap-2.5 pt-1">
              <a
                href="https://instagram.com/sargamdancejaipur"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6D3CD] transition-colors shadow-xs"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@sargamdancestudiojaipur"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6D3CD] transition-colors shadow-xs"
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919829041234"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white border border-[#E7E5E0] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6D3CD] transition-colors shadow-xs"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Jaipur Branches */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              Studio Branches
            </h4>
            <div className="space-y-3 text-xs text-[#78716C]">
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E0] shadow-xs">
                <strong className="text-[#1C1917] block font-medium">📍 Malviya Nagar (Main Studio)</strong>
                <p className="mt-1">Plot 42, Near Gaurav Tower (GT Central), 302017</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E0] shadow-xs">
                <strong className="text-[#1C1917] block font-medium">📍 Vaishali Nagar Studio</strong>
                <p className="mt-1">2nd Floor, Amrapali Circle, Vaishali Nagar</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#E7E5E0] shadow-xs">
                <strong className="text-[#1C1917] block font-medium">📍 Tonk Phatak Studio</strong>
                <p className="mt-1">Above Royal Bakers, Tonk Phatak Main Road</p>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-[#78716C]">
              <li>
                <a href="#styles" className="hover:text-[#1C1917] transition-colors">Bollywood Commercial</a>
              </li>
              <li>
                <a href="#styles" className="hover:text-[#1C1917] transition-colors">Desi Hip-Hop & Street</a>
              </li>
              <li>
                <a href="#styles" className="hover:text-[#1C1917] transition-colors">Kathak & Semi-Classical</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-[#1C1917] transition-colors">Timetable & Formations</a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-[#1C1917] transition-colors">Workshops & Masterclasses</a>
              </li>
              <li>
                <button
                  onClick={onOpenParentMode}
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Heart className="w-3.5 h-3.5 text-[#9F1239]" />
                  <span>Parent Portal (Kids)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-[#1C1917] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-[#78716C]" />
                  <span>Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Contact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
              Timings & Contact
            </h4>
            <div className="space-y-2 text-xs text-[#78716C]">
              <p>
                <strong className="text-[#1C1917]">Monday – Saturday:</strong><br />6:30 AM – 9:30 PM
              </p>
              <p>
                <strong className="text-[#1C1917]">Sunday:</strong><br />8:00 AM – 2:00 PM (Masterclasses)
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919829041234"
                  className="inline-flex items-center gap-2 text-sm text-[#1C1917] font-semibold hover:text-[#9F1239] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#9F1239]" />
                  <span>+91 98290 41234</span>
                </a>
              </div>
              <p className="text-[11px] text-[#A8A29E] pt-1">
                Studio helpline for trials, timings, and wedding sangeet choreography inquiries.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-14 pt-8 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-4">
          <p>© {new Date().getFullYear()} Sargam Dance Studio (Jaipur, Rajasthan). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Jaipur, RJ</span>
            <a href="https://maps.google.com/?q=Sargam+Dance+Studio+Jaipur" target="_blank" rel="noreferrer" className="hover:text-[#1C1917]">
              Google Maps Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
