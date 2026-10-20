import React, { useState } from 'react';
import { X, Heart, Star, MessageSquare } from 'lucide-react';

export default function ParentModeModal({ isOpen, onClose }) {
  const [checklist, setChecklist] = useState({
    costume: true,
    sneakers: true,
    waterBottle: false,
    entryPass: true
  });

  if (!isOpen) return null;

  const toggleCheck = (k) => {
    setChecklist(prev => ({ ...prev, [k]: !prev[k] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          PARENT PORTAL
        </span>

        <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
          Little Ustaads Dashboard
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Tracking dance progress, stage confidence, and event checklists for kids batches.
        </p>

        {/* Child Profile Card */}
        <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-center gap-3.5 mb-3.5">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl">
            🧒
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm">Aarav Sharma (Age 7)</h4>
            <p className="text-xs text-slate-400">Junior Stars Batch • Sat & Sun 4:00 PM</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-medium">
                92% Attendance (11/12 Sessions)
              </span>
            </div>
          </div>
        </div>

        {/* Teacher Notes */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs space-y-1 mb-3.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>Note from Vikram Sharma (Lead Coach):</span>
          </div>
          <p className="text-slate-300 italic">
            "Aarav picked up the 8-count street wave quickly this week. He will lead the front formation for the upcoming annual showcase!"
          </p>
        </div>

        {/* Badges Earned */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
            Skill Badges Earned:
          </span>
          <div className="flex gap-1.5 text-xs">
            <span className="px-2 py-0.5 rounded-lg bg-black/20 border border-white/5 text-slate-300">
              🌟 Rhythm Sense
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-black/20 border border-white/5 text-slate-300">
              🦁 Stage Confidence
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-black/20 border border-white/5 text-slate-300">
              🤸 Balance
            </span>
          </div>
        </div>

        {/* Performance Day Checklist */}
        <div className="space-y-1.5 mb-5">
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
            Annual Showcase Checklist:
          </span>
          <div className="space-y-1 text-xs">
            {[
              { key: 'costume', label: 'Blue & Gold Sargam Vest & Pants' },
              { key: 'sneakers', label: 'Clean White Dance Sneakers' },
              { key: 'waterBottle', label: 'Hydration Flask & Snack' },
              { key: 'entryPass', label: 'Parent Admission Pass (2 Seats)' }
            ].map(item => (
              <label
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={checklist[item.key]}
                  className="accent-rose-500"
                />
                <span className={checklist[item.key] ? 'line-through text-slate-500' : 'text-slate-300'}>
                  {item.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp button */}
        <a
          href="https://wa.me/919829041234?text=Hello%20Sargam%20Studio%20I%20am%20Aarav%27s%20parent"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Message Instructor On WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
