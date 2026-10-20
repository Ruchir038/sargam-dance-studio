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
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-8 overflow-hidden bg-grain">
      {/* Subtle Atmospheric Warm Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-rose-950/20 blur-[130px] pointer-events-none" />

      {/* Main Hero Body */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* Location Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 mb-6">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>Jaipur, Rajasthan • Malviya Nagar & Vaishali Nagar</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white leading-[1.04]">
          MOVE. <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400">VIBE.</span> REPEAT.
        </h1>

        {/* Hindi & Subtitle */}
        <div className="flex items-center justify-center gap-2.5 mt-3">
          <span className="font-hindi text-lg sm:text-2xl text-slate-200 font-semibold">
            सरगम डांस स्टूडियो
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-fun text-lg sm:text-xl text-amber-300">
            "Where every beat finds its dancer."
          </span>
        </div>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-400 mt-4 leading-relaxed font-normal">
          Jaipur's authentic hub for Bollywood commercial choreography, urban street cyphers, Kathak fusion, and bespoke wedding sangeets.
        </p>

        {/* Primary Call-to-actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={onOpenTrial}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Book A Free Trial Pass</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#schedule"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Batches & Formation Spots</span>
          </a>
        </div>

        {/* Interactive Feature Shortcuts Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10 max-w-2xl mx-auto">
          <button
            onClick={onOpenQuiz}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-rose-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Vibe Quiz</span>
          </button>

          <button
            onClick={onOpenMirror}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-emerald-400" />
            <span>Move Mirror (Camera Game)</span>
          </button>

          <button
            onClick={onOpenChoreo}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Choreo Playground</span>
          </button>

          <button
            onClick={onOpenPartyBuilder}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-rose-500/40 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>💍 Wedding Sangeet Builder</span>
          </button>
        </div>
      </div>

      {/* Ticker */}
      <div className="mt-14 w-full overflow-hidden bg-[#0F0D18] py-2.5 border-y border-white/5">
        <div className="animate-marquee whitespace-nowrap text-xs font-semibold tracking-wider text-slate-400 uppercase">
          <span className="text-rose-400 mx-4">Bollywood Masala</span> •
          <span className="text-slate-300 mx-4">Desi Hip-Hop</span> •
          <span className="text-amber-400 mx-4">Kathak Fusion</span> •
          <span className="text-slate-300 mx-4">Contemporary</span> •
          <span className="text-rose-400 mx-4">Zumba Fitness</span> •
          <span className="text-amber-400 mx-4">Royal Sangeet</span> •
          <span className="text-slate-300 mx-4">Sargam Jaipur 4.9★</span> •
          <span className="text-rose-400 mx-4">Bollywood Masala</span> •
          <span className="text-slate-300 mx-4">Desi Hip-Hop</span> •
          <span className="text-amber-400 mx-4">Kathak Fusion</span> •
          <span className="text-slate-300 mx-4">Contemporary</span> •
          <span className="text-rose-400 mx-4">Zumba Fitness</span> •
          <span className="text-amber-400 mx-4">Royal Sangeet</span> •
          <span className="text-slate-300 mx-4">Sargam Jaipur 4.9★</span> •
        </div>
      </div>
    </section>
  );
}
