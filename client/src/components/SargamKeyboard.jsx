import React from 'react';
import { useBeat } from '../context/BeatContext';
import { Music } from 'lucide-react';

export default function SargamKeyboard() {
  const { swaras, triggerSwara, recentSwara, swaraHistory } = useBeat();

  return (
    <div className="w-full py-8 px-4 bg-[#0F0D18] border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center space-y-3">
        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          <span>SARGAM SWARA SYNTHESIZER 🎵</span>
        </div>

        <h3 className="text-lg sm:text-xl font-display font-bold text-white">
          Press Keys <span className="text-rose-400">S • R • G • M • P • D • N</span> On Your Keyboard
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Type the sequence <span className="font-hindi text-amber-300 font-semibold">"सा रे ग म"</span> (S-R-G-M) to unlock a secret Jaipur dancer discount code.
        </p>

        {/* Keyboard keys */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-2 max-w-xl mx-auto">
          {swaras.map((swara) => {
            const isRecent = recentSwara?.key === swara.key;
            return (
              <button
                key={swara.key}
                onClick={() => triggerSwara(swara)}
                className={`flex flex-col items-center justify-between p-2.5 sm:p-3.5 rounded-xl border transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                  isRecent
                    ? 'bg-rose-500/20 border-rose-500 scale-105'
                    : 'bg-[#14121F] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Keyboard key badge */}
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 font-medium">
                  {swara.key}
                </span>

                {/* Swara Devanagari */}
                <span
                  style={{ color: swara.color }}
                  className="font-hindi text-xl sm:text-2xl font-bold my-1"
                >
                  {swara.hindi}
                </span>

                {/* Western note label */}
                <span className="text-[10px] text-slate-400">
                  {swara.note}
                </span>
              </button>
            );
          })}
        </div>

        {/* Recent sequence history */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-mono text-[11px] uppercase tracking-wider">Sequence:</span>
          <div className="flex gap-1.5">
            {swaraHistory.length === 0 ? (
              <span className="text-slate-600 font-mono">_ _ _ _</span>
            ) : (
              swaraHistory.map((k, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30 font-mono font-bold text-rose-300 text-xs"
                >
                  {k}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
