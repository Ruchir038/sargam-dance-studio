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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E7E5E0] p-6 sm:p-8 text-[#1C1917] shadow-xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-500 hover:text-[#1C1917] transition-colors z-20 cursor-pointer border border-[#E7E5E0]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-[11px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block mb-1">
          PARENT PORTAL
        </span>

        <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
          Little Ustaads Dashboard
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          Tracking dance progress, stage confidence, and event checklists for kids batches.
        </p>

        {/* Child Profile Card */}
        <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-[#E7E5E0] flex items-center justify-center text-2xl shadow-xs">
            🧒
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-[#1C1917] text-sm">Aarav Sharma (Age 7)</h4>
            <p className="text-xs text-stone-500">Junior Stars Batch • Sat & Sun 4:00 PM</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium">
                92% Attendance (11/12 Sessions)
              </span>
            </div>
          </div>
        </div>

        {/* Teacher Notes */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs space-y-1 mb-4">
          <div className="flex items-center gap-1.5 text-amber-700 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>Note from Vikram Sharma (Lead Coach):</span>
          </div>
          <p className="text-stone-600 italic">
            "Aarav picked up the 8-count street wave quickly this week. He will lead the front formation for the upcoming annual showcase!"
          </p>
        </div>

        {/* Badges Earned */}
        <div className="mb-4">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-2 font-medium">
            Skill Badges Earned:
          </span>
          <div className="flex gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] text-stone-700">
              🌟 Rhythm Sense
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] text-stone-700">
              🦁 Stage Confidence
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] text-stone-700">
              🤸 Balance
            </span>
          </div>
        </div>

        {/* Performance Day Checklist */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block font-medium">
            Annual Showcase Checklist:
          </span>
          <div className="space-y-1.5 text-xs">
            {[
              { key: 'costume', label: 'Blue & Gold Sargam Vest & Pants' },
              { key: 'sneakers', label: 'Clean White Dance Sneakers' },
              { key: 'waterBottle', label: 'Hydration Flask & Snack' },
              { key: 'entryPass', label: 'Parent Admission Pass (2 Seats)' }
            ].map(item => (
              <label
                key={item.key}
                onClick={() => toggleCheck(item.key)}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E7E5E0] cursor-pointer hover:border-stone-400 transition-colors"
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={checklist[item.key]}
                  className="accent-[#9F1239]"
                />
                <span className={checklist[item.key] ? 'line-through text-stone-400' : 'text-stone-700'}>
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
          className="w-full py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Message Instructor On WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
