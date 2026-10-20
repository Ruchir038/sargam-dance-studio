import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewsSection({ reviews = [] }) {
  return (
    <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-14">
        {/* Left: Minimalist Vinyl & 4.9 Rating */}
        <div className="flex flex-col items-center text-center lg:w-1/3">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-[#1C1917] p-2 shadow-xl border border-stone-800 flex items-center justify-center animate-spin-slow">
            <div className="w-full h-full rounded-full border border-stone-800 flex items-center justify-center">
              <div className="w-5/6 h-5/6 rounded-full border border-stone-800 flex items-center justify-center">
                <div className="w-4/6 h-4/6 rounded-full border border-stone-800 flex items-center justify-center">
                  <div className="w-22 h-22 rounded-full bg-[#FAF9F6] p-1 flex flex-col items-center justify-center text-[#1C1917] border border-stone-300">
                    <span className="font-display font-bold text-lg text-[#1C1917]">4.9★</span>
                    <span className="text-[9px] font-mono text-[#78716C]">542 REVIEWS</span>
                    <div className="w-2 h-2 rounded-full bg-[#1C1917] mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-display font-medium text-xl text-[#1C1917]">
              Google Rating: 4.9 / 5.0
            </h3>
            <p className="text-xs text-[#78716C] mt-1 max-w-xs leading-relaxed">
              Based on 542+ verified student reviews across Malviya Nagar & Vaishali Nagar.
            </p>
          </div>
        </div>

        {/* Right: Review Cards */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {reviews.slice(0, 4).map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1 text-amber-500">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#A8A29E]">{rev.date}</span>
                </div>
                <p className="text-xs text-[#44403C] leading-relaxed italic mb-5">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0EEE9] flex items-center justify-between">
                <div>
                  <h6 className="font-medium text-xs text-[#1C1917]">{rev.name}</h6>
                  <span className="text-[11px] text-[#78716C] block">{rev.locality} • {rev.style}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5F3EF] text-[#78716C]">
                  Google Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
