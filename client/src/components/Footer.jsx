import React from 'react';
import SargamKeyboard from './SargamKeyboard';
import { Phone, MessageSquare, Heart, Settings } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from './Icons';

export default function Footer({ onOpenAdmin, onOpenParentMode, onOpenTrial }) {
  return (
    <footer className="bg-[#0A0912] text-slate-300 border-t border-white/5 overflow-hidden">
      {/* Interactive Sargam Swaras Synthesizer */}
      <SargamKeyboard />

      {/* Editorial Typographic Banner */}
      <div className="py-8 border-y border-white/5 text-center overflow-hidden bg-[#0C0A14]">
        <h2 className="font-display font-extrabold text-3xl sm:text-6xl tracking-tight text-white/20 select-none uppercase">
          Sargam Dance Studio • Jaipur
        </h2>
      </div>

      {/* Main Studio Details Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💃</span>
              <span className="font-display font-bold text-xl text-white">SARGAM</span>
              <span className="font-hindi text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                सरगम
              </span>
            </div>
            <p className="font-fun text-base text-amber-300">
              "Move. Vibe. Repeat. Where every beat finds its dancer."
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jaipur's dance academy for hobby training, physical fitness, street cyphers, and royal wedding sangeet choreography.
            </p>

            <div className="flex gap-2.5 pt-1">
              <a
                href="https://instagram.com/sargamdancejaipur"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-rose-400 hover:border-white/20 transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com/@sargamdancestudiojaipur"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-red-400 hover:border-white/20 transition-colors"
                title="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/919829041234"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-white/20 transition-colors"
                title="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Jaipur Branches */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase">
              Jaipur Studio Branches
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-slate-200 block font-medium">📍 Malviya Nagar (Main Studio)</strong>
                <p className="mt-0.5">Plot 42, Near Gaurav Tower (GT Central), Malviya Nagar, 302017</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-slate-200 block font-medium">📍 Vaishali Nagar Studio</strong>
                <p className="mt-0.5">2nd Floor, Amrapali Circle, Vaishali Nagar, Jaipur</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <strong className="text-slate-200 block font-medium">📍 Tonk Phatak Studio</strong>
                <p className="mt-0.5">Above Royal Bakers, Tonk Phatak Main Road</p>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase">
              Quick Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#styles" className="hover:text-rose-400 transition-colors">Bollywood & Commercial Choreo</a>
              </li>
              <li>
                <a href="#styles" className="hover:text-rose-400 transition-colors">Desi Hip-Hop & Street Cypher</a>
              </li>
              <li>
                <a href="#styles" className="hover:text-rose-400 transition-colors">Kathak & Semi-Classical</a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-rose-400 transition-colors">Timetable & Formation Spots</a>
              </li>
              <li>
                <a href="#workshops" className="hover:text-rose-400 transition-colors">Workshops & Events</a>
              </li>
              <li>
                <button
                  onClick={onOpenParentMode}
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-400" />
                  <span>Parent Mode (Kids Batches)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Studio Admin Panel</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Contact */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs tracking-wider text-white uppercase">
              Timings & Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p>
                <strong className="text-slate-200">Mon – Sat:</strong> 6:30 AM – 9:30 PM
              </p>
              <p>
                <strong className="text-slate-200">Sunday:</strong> 8:00 AM – 2:00 PM (Masterclasses)
              </p>
              <div className="pt-2">
                <a
                  href="tel:+919829041234"
                  className="inline-flex items-center gap-2 text-sm text-white font-medium hover:text-rose-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-rose-500" />
                  <span>+91 98290 41234</span>
                </a>
              </div>
              <p className="text-[11px] text-slate-500">
                Helpline for batch enquiries, trial bookings, and wedding sangeet choreography.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sargam Dance Studio (Jaipur, Rajasthan). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-slate-400">Jaipur, RJ</span>
            <a href="https://maps.google.com/?q=Sargam+Dance+Studio+Jaipur" target="_blank" rel="noreferrer" className="hover:text-slate-300">
              Google Maps Location
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
