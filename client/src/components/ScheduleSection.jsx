import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Flame } from 'lucide-react';

export default function ScheduleSection({ batches = [], onSelectBatchSpot }) {
  const [selectedBranch, setSelectedBranch] = useState('All');

  const branches = ['All', 'Malviya Nagar (Main Studio)', 'Vaishali Nagar Studio'];

  const filteredBatches = batches.filter(b => {
    if (selectedBranch === 'All') return true;
    return b.branch.includes(selectedBranch);
  });

  return (
    <section id="schedule" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Live Next-Up Strip */}
      <div className="mb-12 p-4 sm:p-5 rounded-2xl bg-[#13111C] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/20">
            <Flame className="w-4 h-4 fill-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-wider text-rose-400 uppercase block font-semibold">
              NEXT UP IN JAIPUR STUDIO
            </span>
            <h4 className="font-display font-bold text-base sm:text-lg text-white">
              Bollywood Hookstep Hype (Malviya Nagar Branch)
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs font-mono text-amber-300 font-semibold">
            Starts in 00:42:18
          </div>
          <button
            onClick={() => onSelectBatchSpot(batches[0])}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Claim 1 of 3 Spots
          </button>
        </div>
      </div>

      {/* Main Schedule Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
            TIMETABLE & FORMATION MAP
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Batches & Spot Wars
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Reserve your exact spot in the formation: front spotlight, center stage, or comfort groove.
          </p>
        </div>

        {/* Branch Filter */}
        <div className="flex flex-wrap gap-1.5">
          {branches.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'bg-rose-600 text-white font-semibold shadow-sm'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {b === 'All' ? 'All Studios' : b.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBatches.map((batch) => {
          const spotsLeft = batch.capacity - batch.enrolledCount;
          return (
            <div
              key={batch.id}
              className="p-5 rounded-2xl bg-[#13111C] border border-white/10 hover:border-white/20 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 font-medium">
                    {batch.level}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 font-medium">
                    {batch.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white">
                  {batch.title}
                </h3>

                <div className="mt-3.5 space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{batch.days.join(', ')} • {batch.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{batch.branch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Capacity: {batch.enrolledCount}/{batch.capacity} ({spotsLeft} open)</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-4 w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${(batch.enrolledCount / batch.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">MONTHLY</span>
                  <span className="font-display font-bold text-lg text-white">₹{batch.price}</span>
                </div>

                <button
                  onClick={() => onSelectBatchSpot(batch)}
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-rose-400" />
                  <span>Choose Spot</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
