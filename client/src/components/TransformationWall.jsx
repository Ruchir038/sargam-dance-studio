import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function TransformationWall() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          STUDENT PROGRESS
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Week 1 vs. Week 12
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Drag the slider to see how confidence and groove awaken over 90 days.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-video select-none bg-slate-900">
        {/* Week 12 Image (Underneath) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-white font-medium text-xs border border-white/10">
            WEEK 12: CONFIDENT STAGE FLOW
          </div>
          <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-black/70 backdrop-blur-md max-w-xs text-right hidden sm:block border border-white/10">
            <p className="text-xs text-white font-semibold">Center Stage Confidence</p>
            <p className="text-[11px] text-slate-300">Fluid isolations, musicality, zero stage anxiety</p>
          </div>
        </div>

        {/* Week 1 Image (Clipped by slider) */}
        <div
          className="absolute inset-0 bg-cover bg-center border-r-2 border-white/60"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-slate-200 font-medium text-xs border border-white/10">
            WEEK 1: HESITANT BEGINNER
          </div>
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-black/70 backdrop-blur-md max-w-xs hidden sm:block border border-white/10">
            <p className="text-xs text-white font-semibold">Learning Basic Counts</p>
            <p className="text-[11px] text-slate-300">Hesitant posture, focusing on foot placement</p>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/40 shadow-xl flex items-center justify-center text-white">
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Interactive Slider Input */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={(e) => setSliderPos(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
        />
      </div>

      <div className="text-center mt-4">
        <p className="text-xs text-slate-400">
          📍 Malviya Nagar Batch • "I joined as a complete non-dancer and performed at the annual festival."
        </p>
      </div>
    </section>
  );
}
