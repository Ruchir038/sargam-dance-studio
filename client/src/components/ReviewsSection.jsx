import React from 'react';
import { Star } from 'lucide-react';

export default function ReviewsSection({ reviews = [] }) {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Refined Vinyl Record with 4.9 Rating */}
        <div className="flex flex-col items-center text-center lg:w-1/3">
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-[#110F18] p-2 shadow-2xl border border-white/10 flex items-center justify-center animate-spin-slow">
            {/* Vinyl Grooves */}
            <div className="w-full h-full rounded-full border border-white/5 flex items-center justify-center">
              <div className="w-5/6 h-5/6 rounded-full border border-white/5 flex items-center justify-center">
                <div className="w-4/6 h-4/6 rounded-full border border-white/5 flex items-center justify-center">
                  {/* Center Label */}
                  <div className="w-24 h-24 rounded-full bg-[#181524] p-1 shadow-inner flex flex-col items-center justify-center text-white border border-white/10">
                    <span className="font-display font-bold text-xl text-amber-300">4.9★</span>
                    <span className="text-[9px] font-mono text-slate-400">542 REVIEWS</span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0C0A14] border border-white/20 mt-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-display font-bold text-xl text-white">
              Google Rating: 4.9 / 5.0
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              Based on 542+ reviews across Malviya Nagar & Vaishali Nagar branches.
            </p>
          </div>
        </div>

        {/* Right: Review Cards */}
        <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.slice(0, 4).map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="p-5 rounded-2xl bg-[#13111C] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-4">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h6 className="font-semibold text-xs text-white">{rev.name}</h6>
                  <span className="text-[10px] text-slate-400 block">{rev.locality} • {rev.style}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
