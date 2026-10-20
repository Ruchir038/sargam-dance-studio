import React from 'react';
import { Star } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function InstructorsSection({ instructors = [] }) {
  return (
    <section id="instructors" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
          Faculty & Mentors
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
          Meet The Choreographers
        </h2>
        <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          Passionate instructors with professional battle titles, national stage experience, and patient mentorship.
        </p>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="group rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-[#F5F3EF]">
              <img
                src={inst.photo}
                alt={inst.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-stone-200 text-xs font-mono text-[#1C1917] font-semibold flex items-center gap-1 shadow-xs">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {inst.rating}
              </span>

              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-[#9F1239] uppercase tracking-wider block font-semibold">
                  {inst.experience}
                </span>
                <h3 className="font-display font-medium text-lg text-[#1C1917]">
                  {inst.name}
                </h3>
                <p className="text-xs text-[#78716C]">{inst.role}</p>
              </div>
            </div>

            {/* Bio & Signature Move */}
            <div className="p-6 space-y-4">
              <p className="text-xs text-[#78716C] leading-relaxed">
                {inst.bio}
              </p>

              {/* Signature move */}
              <div className="p-3 rounded-xl bg-[#F5F3EF] border border-[#E7E5E0]">
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block font-semibold">
                  Signature Specialty:
                </span>
                <span className="text-xs font-medium text-[#1C1917] mt-0.5 block">
                  {inst.signatureMove}
                </span>
              </div>

              {/* Styles Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {inst.styles.map((s, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-[#57534E]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Social Link */}
              <div className="pt-3 border-t border-[#F0EEE9] flex items-center justify-between text-xs text-[#78716C]">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#44403C]">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#9F1239]" /> {inst.instagram}
                </span>
                <span className="text-[10px] text-[#A8A29E]">Jaipur Studio Faculty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
