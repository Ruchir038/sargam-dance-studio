import React, { useState } from 'react';
import { useBeat } from '../context/BeatContext';
import { Copy, Check, X } from 'lucide-react';

export default function EasterEggModal({ onClaimDiscount }) {
  const { easterEggUnlocked, setEasterEggUnlocked, easterEggCode } = useBeat();
  const [copied, setCopied] = useState(false);

  if (!easterEggUnlocked) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(easterEggCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-white border border-[#E7E5E0] p-6 sm:p-7 text-center text-[#1C1917] shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setEasterEggUnlocked(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-500 hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E7E5E0]"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-center text-2xl mb-3 shadow-xs">
          🎵
        </div>

        <span className="text-[10px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block">
          EASTER EGG UNLOCKED
        </span>

        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] mt-1">
          "सा रे ग म" Sequence Complete
        </h3>

        <p className="text-xs text-stone-600 mt-2">
          You discovered the musical easter egg. Enjoy 25% off your first month enrolment.
        </p>

        {/* Voucher Code Box */}
        <div className="my-5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[9px] text-stone-500 font-mono tracking-wider block font-semibold">PROMO CODE</span>
            <span className="font-mono text-base font-bold text-[#9F1239]">{easterEggCode}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-xs font-medium text-white transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <button
          onClick={() => {
            setEasterEggUnlocked(false);
            if (onClaimDiscount) onClaimDiscount(easterEggCode);
          }}
          className="w-full py-3 rounded-full bg-[#9F1239] hover:bg-[#881337] text-white font-medium text-xs tracking-wide transition-colors cursor-pointer"
        >
          Apply To Enrolment
        </button>
      </div>
    </div>
  );
}
