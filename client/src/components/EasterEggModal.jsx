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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#14121F] border border-white/10 p-6 text-center text-white shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setEasterEggUnlocked(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-3">
          🎵
        </div>

        <span className="text-[10px] font-mono text-rose-400 tracking-wider uppercase font-semibold block">
          EASTER EGG UNLOCKED
        </span>

        <h3 className="font-display font-bold text-xl text-white mt-1">
          "सा रे ग म" Sequence Complete
        </h3>

        <p className="text-xs text-slate-400 mt-2">
          You discovered the musical easter egg. Enjoy 25% off your first month enrolment.
        </p>

        {/* Voucher Code Box */}
        <div className="my-4 p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[9px] text-slate-500 font-mono tracking-wider block">PROMO CODE</span>
            <span className="font-mono text-base font-bold text-amber-300">{easterEggCode}</span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs font-medium text-white transition-all cursor-pointer"
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
          className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer"
        >
          Apply To Enrolment
        </button>
      </div>
    </div>
  );
}
