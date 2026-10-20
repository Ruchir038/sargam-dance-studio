import React from 'react';
import { ArrowRight, Calendar, Sparkles, Camera, Music, MapPin } from 'lucide-react';

export default function HeroSection({
  onOpenTrial,
  onOpenQuiz,
  onOpenMirror,
  onOpenChoreo,
  onOpenPartyBuilder
}) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Subtle City Tag (Clickable Map Link) */}
        <a
          href="https://maps.google.com/?q=Sargam+Dance+Studio+Malviya+Nagar+Jaipur"
          target="_blank"
          rel="noopener noreferrer"
          title="Open Jaipur studio locations in Google Maps"
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F3EF] border border-[#E7E5E0] hover:border-[#9F1239]/40 hover:text-[#1C1917] text-xs text-[#57534E] mb-8 font-medium transition-all cursor-pointer shadow-2xs group"
        >
          <MapPin className="w-3.5 h-3.5 text-[#9F1239] group-hover:scale-110 transition-transform" />
          <span>Malviya Nagar & Vaishali Nagar • Jaipur</span>
        </a>

        {/* Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-medium text-[#1C1917] leading-[1.12] max-w-4xl mx-auto">
          Where rhythm, expression, and joy meet in Jaipur.
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-[#78716C] mt-6 leading-relaxed font-normal">
          From Bollywood commercial hooksteps to Kathak fusion and street cyphers. A studio built for real dancers of every level.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9">
          <button
            onClick={onOpenTrial}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Book a Trial Class</span>
            <ArrowRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          <a
            href="#schedule"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] text-[#1C1917] font-medium text-xs tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Timetable & Formation Spots</span>
          </a>
        </div>

        {/* Minimalist Sub-features Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-12 max-w-2xl mx-auto">
          <button
            onClick={onOpenQuiz}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E0] hover:border-[#9F1239]/40 text-xs text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#9F1239]" />
            <span>Find Your Dance Style Quiz</span>
          </button>

          <button
            onClick={onOpenMirror}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E0] hover:border-[#9F1239]/40 text-xs text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Camera className="w-3 h-3 text-[#78716C]" />
            <span>Movement Mirror Game</span>
          </button>

          <button
            onClick={onOpenChoreo}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E0] hover:border-[#9F1239]/40 text-xs text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Music className="w-3 h-3 text-[#78716C]" />
            <span>Choreography Timeline</span>
          </button>

          <button
            onClick={onOpenPartyBuilder}
            className="px-3.5 py-1.5 rounded-full bg-white border border-[#E7E5E0] hover:border-[#9F1239]/40 text-xs text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <span>Wedding Sangeet Estimator</span>
          </button>
        </div>
      </div>

      {/* Understated Minimalist Ticker */}
      <div className="mt-16 w-full overflow-hidden bg-[#F5F3EF] py-3 border-y border-[#E7E5E0]">
        <div className="animate-marquee whitespace-nowrap text-xs font-medium tracking-widest text-[#78716C] uppercase">
          <span className="text-[#1C1917] mx-5 font-semibold">Bollywood Commercial</span> •
          <span className="mx-5">Urban Street & Hip-Hop</span> •
          <span className="text-[#9F1239] mx-5 font-semibold">Kathak Fusion</span> •
          <span className="mx-5">Contemporary Flow</span> •
          <span className="text-[#1C1917] mx-5 font-semibold">Zumba Fitness</span> •
          <span className="mx-5">Royal Wedding Choreography</span> •
          <span className="mx-5">Google Rated 4.9 / 5.0</span> •
          <span className="text-[#1C1917] mx-5 font-semibold">Bollywood Commercial</span> •
          <span className="mx-5">Urban Street & Hip-Hop</span> •
          <span className="text-[#9F1239] mx-5 font-semibold">Kathak Fusion</span> •
          <span className="mx-5">Contemporary Flow</span> •
          <span className="text-[#1C1917] mx-5 font-semibold">Zumba Fitness</span> •
          <span className="mx-5">Royal Wedding Choreography</span> •
          <span className="mx-5">Google Rated 4.9 / 5.0</span> •
        </div>
      </div>
    </section>
  );
}
