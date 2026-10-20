import React, { useState } from 'react';
import { Clock, MapPin, Users } from 'lucide-react';

export default function ScheduleSection({ batches = [], onSelectBatchSpot }) {
  const [selectedBranch, setSelectedBranch] = useState('All');

  const branches = ['All', 'Malviya Nagar (Main Studio)', 'Vaishali Nagar Studio'];

  const filteredBatches = batches.filter(b => {
    if (selectedBranch === 'All') return true;
    return b.branch.includes(selectedBranch);
  });

  return (
    <section id="schedule" className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Live Next-Up Strip */}
      <div className="mb-14 p-5 sm:p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#9F1239] font-bold block mb-1">
            Next Session Starting Soon
          </span>
          <h4 className="font-display font-medium text-lg text-[#1C1917]">
            Bollywood Hookstep Hype (Malviya Nagar Branch)
          </h4>
          <p className="text-xs text-[#78716C] mt-0.5">Plot 42, Near Gaurav Tower • Today 6:30 PM</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-md bg-[#FAF9F6] border border-[#E7E5E0] text-xs font-mono text-[#57534E]">
            Starts in 42 mins
          </div>
          <button
            onClick={() => onSelectBatchSpot(batches[0])}
            className="px-4 py-2 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Claim 1 of 3 Spots
          </button>
        </div>
      </div>

      {/* Main Schedule Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
            Timetable & Formations
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
            Batches & Spot Selection
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Select your batch and choose your exact position in the studio formation.
          </p>
        </div>

        {/* Branch Filter */}
        <div className="flex flex-wrap gap-1.5">
          {branches.map(b => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                selectedBranch === b
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'bg-white border border-[#E7E5E0] text-[#78716C] hover:text-[#1C1917]'
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
              className="p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5F3EF] text-[#57534E] font-medium">
                    {batch.level}
                  </span>
                  <span className="text-[11px] text-[#9F1239] font-medium">
                    {batch.status}
                  </span>
                </div>

                <h3 className="font-display font-medium text-lg text-[#1C1917]">
                  {batch.title}
                </h3>

                <div className="mt-4 space-y-2 text-xs text-[#78716C]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span>{batch.days.join(', ')} • {batch.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span>{batch.branch}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-[#A8A29E]" />
                    <span>{batch.enrolledCount}/{batch.capacity} enrolled ({spotsLeft} open)</span>
                  </div>
                </div>

                {/* Capacity Progress Bar */}
                <div className="mt-5 w-full h-1 bg-[#F5F3EF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1C1917]"
                    style={{ width: `${(batch.enrolledCount / batch.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-[#F0EEE9] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] block font-medium">Monthly</span>
                  <span className="font-display font-semibold text-lg text-[#1C1917]">₹{batch.price}</span>
                </div>

                <button
                  onClick={() => onSelectBatchSpot(batch)}
                  className="px-4 py-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] border border-[#E7E5E0] text-[#1C1917] text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-[#78716C]" />
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
