import React from 'react';
import { Calendar, Clock, MapPin, Ticket } from 'lucide-react';

export default function WorkshopsSection({ workshops = [], onSelectWorkshop }) {
  return (
    <section id="workshops" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
          Intensives & Masterclasses
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
          Upcoming Workshops
        </h2>
        <p className="text-sm text-[#78716C] mt-2 max-w-md mx-auto">
          One-off masterclasses with guest choreographers, certified technical drills, and routine video shoots.
        </p>
      </div>

      {/* Workshop Poster Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {workshops.map((ws) => (
          <div
            key={ws.id}
            className="group rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-sm"
          >
            {/* Poster Header */}
            <div className="relative aspect-[16/9] overflow-hidden bg-[#F5F3EF]">
              <img
                src={ws.poster}
                alt={ws.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute top-3.5 left-3.5 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#1C1917] text-[11px] font-medium border border-stone-200">
                {ws.status}
              </span>
              <span className="absolute top-3.5 right-3.5 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#9F1239] text-[11px] font-medium border border-stone-200">
                {ws.earlyBirdDeadline}
              </span>

              <div className="absolute bottom-3 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-stone-200">
                <span className="text-[10px] text-[#78716C] uppercase tracking-wider block font-medium">
                  Choreographer & Artist
                </span>
                <h4 className="font-display font-medium text-base text-[#1C1917]">
                  {ws.guestArtist}
                </h4>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-medium text-xl text-[#1C1917] mb-2">
                  {ws.title}
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed mb-5">
                  {ws.description}
                </p>

                <div className="space-y-2 p-3.5 rounded-xl bg-[#F5F3EF] text-xs text-[#57534E] mb-5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span>{ws.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span>{ws.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span className="truncate">{ws.venue}</span>
                  </div>
                </div>

                {/* Tiers Preview */}
                <div className="space-y-2 mb-6">
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] font-medium block">
                    Available Pass Options:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ws.tiers.map((t, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-center">
                        <span className="text-[11px] font-medium text-[#44403C] block truncate">{t.name}</span>
                        <span className="font-display font-semibold text-sm text-[#1C1917]">₹{t.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectWorkshop(ws)}
                className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Ticket className="w-3.5 h-3.5 opacity-70" />
                <span>Reserve Workshop Pass & QR Ticket</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
