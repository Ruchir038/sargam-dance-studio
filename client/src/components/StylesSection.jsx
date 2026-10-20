import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
    <section id="styles" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
            Jaipur Curriculum
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
            Dance Styles & Programs
          </h2>
          <p className="text-sm text-[#78716C] mt-2 max-w-md">
            Thoughtfully crafted programs for hobby dancers, fitness seekers, and stage performers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-white border border-[#E7E5E0] text-[#78716C] hover:text-[#1C1917] hover:border-[#D6D3CD]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStyles.map((style) => (
          <div
            key={style.id}
            className="group rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            {/* Image Header */}
            <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F3EF]">
              <img
                src={style.heroImage}
                alt={style.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 text-[11px] font-medium text-[#1C1917] px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 shadow-xs">
                {style.level?.[0] || 'All Levels'}
              </span>
              <span className="absolute bottom-3 right-3 font-hindi text-sm text-[#44403C] font-medium bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-md">
                {style.nameHindi}
              </span>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-medium text-xl text-[#1C1917]">
                  {style.name}
                </h3>
                <p className="text-xs text-[#9F1239] font-medium mt-1 mb-3">
                  "{style.tagline}"
                </p>
                <p className="text-xs text-[#78716C] leading-relaxed line-clamp-3 mb-5">
                  {style.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {style.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#F5F3EF] text-[#57534E]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Note & Buttons */}
              <div className="pt-4 border-t border-[#F0EEE9] space-y-4">
                <p className="text-xs text-[#A8A29E]">
                  📍 {style.popularInJaipur}
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => onTrialForStyle(style)}
                    className="flex-1 py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs transition-colors cursor-pointer text-center"
                  >
                    Book a Trial
                  </button>
                  <a
                    href="#schedule"
                    className="px-4 py-2.5 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] border border-[#E7E5E0] text-[#44403C] text-xs font-medium transition-colors cursor-pointer"
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
