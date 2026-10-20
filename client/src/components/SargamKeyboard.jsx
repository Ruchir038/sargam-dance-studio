import React from 'react';
import { useBeat } from '../context/BeatContext';
import { Music } from 'lucide-react';

export default function SargamKeyboard() {
  const { swaras, triggerSwara, recentSwara, swaraHistory } = useBeat();

  return (
    <div className="w-full py-12 px-6 bg-[#F5F3EF] border-t border-[#E7E5E0]">
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E5E0] text-xs text-[#57534E]">
          <Music className="w-3.5 h-3.5 text-[#9F1239]" />
          <span>Interactive Swara Synthesizer</span>
        </div>

        <h3 className="text-xl font-display font-medium text-[#1C1917]">
          Press Keys <span className="text-[#9F1239]">S • R • G • M • P • D • N</span>
        </h3>
        <p className="text-xs text-[#78716C] max-w-md mx-auto">
          Type the sequence <span className="font-hindi text-[#1C1917] font-semibold">"सा रे ग म"</span> (S-R-G-M) to reveal a studio discount voucher.
        </p>

        {/* Keyboard keys */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 pt-3 max-w-md mx-auto">
          {swaras.map((swara) => {
            const isRecent = recentSwara?.key === swara.key;
            return (
              <button
                key={swara.key}
                onClick={() => triggerSwara(swara)}
                className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border transition-all duration-150 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer shadow-xs ${
                  isRecent
                    ? 'bg-[#1C1917] text-white border-[#1C1917]'
                    : 'bg-white border-[#E7E5E0] text-[#1C1917] hover:border-[#D6D3CD]'
                }`}
              >
                <span className={`text-[9px] font-mono font-medium ${isRecent ? 'text-stone-400' : 'text-[#A8A29E]'}`}>
                  {swara.key}
                </span>

                <span
                  style={{ color: isRecent ? '#FFFFFF' : swara.color }}
                  className="font-hindi text-lg sm:text-xl font-medium my-1"
                >
                  {swara.hindi}
                </span>

                <span className={`text-[9px] ${isRecent ? 'text-stone-300' : 'text-[#78716C]'}`}>
                  {swara.note}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sequence history */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs">
          <span className="text-[#A8A29E] font-mono text-[10px] uppercase tracking-wider">Sequence:</span>
          <div className="flex gap-1">
            {swaraHistory.length === 0 ? (
              <span className="text-[#A8A29E] font-mono">_ _ _ _</span>
            ) : (
              swaraHistory.map((k, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-white border border-[#E7E5E0] font-mono font-semibold text-[#1C1917] text-[11px]"
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
