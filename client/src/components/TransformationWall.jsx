import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export default function TransformationWall() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-24 px-6 sm:px-8 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
          Real Journeys
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
          Week 1 vs. Week 12
        </h2>
        <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          Drag the slider to see how confidence and groove awaken over 90 days.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#E7E5E0] shadow-sm aspect-video select-none bg-stone-100">
        {/* Week 12 Image (Underneath) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547153760-18fc86324498?w=1200&auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] font-medium text-xs border border-stone-200 shadow-xs">
            Week 12: Stage Confidence
          </div>
          <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm max-w-xs text-right hidden sm:block border border-stone-200 shadow-xs">
            <p className="text-xs text-[#1C1917] font-semibold">Center Stage Freedom</p>
            <p className="text-[11px] text-[#78716C]">Fluid movement, musicality, zero stage anxiety</p>
          </div>
        </div>

        {/* Week 1 Image (Clipped by slider) */}
        <div
          className="absolute inset-0 bg-cover bg-center border-r-2 border-white shadow-lg"
          style={{
            clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=1200&auto=format&fit=crop&q=80')`
          }}
        >
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#57534E] font-medium text-xs border border-stone-200 shadow-xs">
            Week 1: First Steps
          </div>
          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm max-w-xs hidden sm:block border border-stone-200 shadow-xs">
            <p className="text-xs text-[#1C1917] font-semibold">Learning Basic Counts</p>
            <p className="text-[11px] text-[#78716C]">Hesitant posture, focusing on step alignment</p>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none shadow-md"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white border border-stone-300 shadow-md flex items-center justify-center text-[#1C1917]">
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
        <p className="text-xs text-[#A8A29E]">
          📍 Malviya Nagar Batch • "I joined as a complete non-dancer and performed at the annual festival."
        </p>
      </div>
    </section>
  );
}
