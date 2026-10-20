import React from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';

export default function WorkshopsSection({ workshops = [], onSelectWorkshop }) {
  return (
    <section id="workshops" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          MASTERCLASSES & EVENTS
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Upcoming Workshops
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Intensive sessions with guest choreographers, performance shoots, and certification.
        </p>
      </div>

      {/* Workshop Poster Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="group rounded-2xl bg-[#13111C] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            {/* Poster Header */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
              <img
                src={ws.poster}
                alt={ws.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13111C] via-[#13111C]/40 to-transparent" />

              <span className="absolute top-3.5 left-3.5 px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-mono font-semibold">
                {ws.status}
              </span>

              <span className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-amber-300 font-semibold">
                ⏰ {ws.earlyBirdDeadline}
              </span>

              <div className="absolute bottom-3.5 left-4 right-4">
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
                  CHOREOGRAPHER
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-white">
                  {ws.guestArtist}
                </h4>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {ws.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {ws.description}
                </p>

                <div className="space-y-1.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{ws.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{ws.venue}</span>
                  </div>
                </div>

                {/* Tiers Preview */}
                <div className="space-y-1.5 mb-5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Pass Tiers:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ws.tiers.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-center">
                        <span className="text-[10px] font-medium text-slate-300 block truncate">{t.name}</span>
                        <span className="font-display font-bold text-sm text-rose-400">₹{t.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectWorkshop(ws)}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Ticket className="w-4 h-4" />
                <span>Claim Workshop Pass & QR Ticket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
