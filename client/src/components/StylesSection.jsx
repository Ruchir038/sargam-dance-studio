import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function StylesSection({ styles = [], onSelectStyle, onTrialForStyle }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Commercial', 'Street', 'Classical', 'Fitness', 'Events'];

  const filteredStyles = styles.filter(s => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Commercial') return s.slug.includes('bollywood');
    if (activeFilter === 'Street') return s.slug.includes('hip-hop');
    if (activeFilter === 'Classical') return s.slug.includes('kathak') || s.slug.includes('contemporary');
    if (activeFilter === 'Fitness') return s.slug.includes('zumba');
    if (activeFilter === 'Events') return s.slug.includes('sangeet') || s.slug.includes('kids');
    return true;
  });

  return (
    <section id="styles" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
            JAIPUR CURRICULUM
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Dance Styles & Programs
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Structured foundation programs tailored for hobbyists, fitness, and stage performers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="group rounded-2xl bg-[#13111C] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image Header with Subtle Gradient */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={style.heroImage}
                alt={style.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13111C] via-[#13111C]/30 to-transparent" />

              <span className="absolute top-3 left-3 text-[10px] font-medium text-white/90 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                {style.level?.[0] || 'All Levels'}
              </span>

              <span className="absolute bottom-2 right-3 font-hindi text-sm text-slate-300 font-medium">
                {style.nameHindi}
              </span>
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
                  {style.name}
                </h3>
                <p className="text-xs text-amber-300/90 font-medium mt-0.5 mb-2.5">
                  "{style.tagline}"
                </p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                  {style.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {style.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Note & Buttons */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <p className="text-[11px] text-slate-500 truncate">
                  📍 {style.popularInJaipur}
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onTrialForStyle(style)}
                    className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors cursor-pointer text-center"
                  >
                    Claim Free Trial
                  </button>
                  <a
                    href="#schedule"
                    className="px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Batches
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
