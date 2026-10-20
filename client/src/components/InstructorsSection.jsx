import React from 'react';
import { Star } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function InstructorsSection({ instructors = [] }) {
  return (
    <section id="instructors" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          FACULTY & CHOREOGRAPHERS
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Meet The Instructors
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Passionate mentors with stage experience, competition titles, and patient teaching.
        </p>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="group rounded-2xl bg-[#13111C] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-slate-900">
              <img
                src={inst.photo}
                alt={inst.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13111C] via-[#13111C]/30 to-transparent" />

              <span className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-xs font-mono text-amber-300 font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-300" /> {inst.rating}
              </span>

              <div className="absolute bottom-3.5 left-4 right-4">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block font-semibold">
                  {inst.experience}
                </span>
                <h3 className="font-display font-bold text-lg text-white">
                  {inst.name}
                </h3>
                <p className="text-xs text-slate-300 font-medium">{inst.role}</p>
              </div>
            </div>

            {/* Bio & Signature Move */}
            <div className="p-5 space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                {inst.bio}
              </p>

              {/* Signature move highlight */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-medium">
                  SIGNATURE STYLE / MOVE:
                </span>
                <span className="text-xs font-semibold text-white mt-0.5 block">
                  {inst.signatureMove}
                </span>
              </div>

              {/* Styles Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {inst.styles.map((s, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Social Link */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                  <InstagramIcon className="w-3.5 h-3.5 text-rose-400" /> {inst.instagram}
                </span>
                <span className="text-[10px] text-slate-500">Jaipur Faculty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
