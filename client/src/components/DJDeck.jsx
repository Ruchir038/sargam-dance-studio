import React, { useEffect, useRef } from 'react';
import { useBeat } from '../context/BeatContext';
import { X, Play, Square, Sliders } from 'lucide-react';

export default function DJDeck({ isOpen, onClose }) {
  const { bpm, setBpm, isBeatPlaying, toggleBeat, currentBeatStep } = useBeat();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const mid = height / 2;

      ctx.beginPath();
      ctx.strokeStyle = isBeatPlaying ? '#E11D48' : '#334155';
      ctx.lineWidth = 2;

      const bars = 24;
      const barWidth = width / bars;

      for (let i = 0; i < bars; i++) {
        let amp = isBeatPlaying ? Math.sin(phase + i * 0.4) * (height * 0.35) : 3;
        if (i % 4 === currentBeatStep && isBeatPlaying) {
          amp *= 1.3;
        }
        const x = i * barWidth + barWidth / 2;
        ctx.moveTo(x, mid - amp);
        ctx.lineTo(x, mid + amp);
      }
      ctx.stroke();

      if (isBeatPlaying) {
        phase += (bpm / 60) * 0.12;
      }
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isBeatPlaying, bpm, currentBeatStep]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-92 rounded-2xl bg-[#14121F]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-5 text-white animate-in slide-in-from-bottom duration-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/20">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
              Studio Beat Clock
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">BPM SYNC ENGINE</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Visualizer Canvas */}
      <div className="my-3 py-2 px-3 bg-black/40 rounded-xl border border-white/5 flex flex-col items-center justify-center">
        <canvas ref={canvasRef} width={280} height={40} className="w-full h-10" />
        
        {/* 4-Beat Step Indicator */}
        <div className="flex items-center justify-between w-full mt-2 px-1">
          {[0, 1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-1.5 flex-1 mx-1 rounded-full transition-all duration-150 ${
                currentBeatStep === step && isBeatPlaying
                  ? 'bg-rose-500 scale-y-125'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* BPM Controls */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">Tempo:</span>
          <span className="text-lg font-display font-bold text-rose-400">{bpm} <span className="text-xs font-mono text-slate-400">BPM</span></span>
        </div>

        <input
          type="range"
          min="70"
          max="140"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full accent-rose-500 cursor-pointer"
        />

        {/* Quick Style Presets */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[
            { label: '85 HipHop', value: 85 },
            { label: '105 Sargam', value: 105 },
            { label: '120 Bolly', value: 120 },
            { label: '135 Zumba', value: 135 }
          ].map((preset) => (
            <button
              key={preset.value}
              onClick={() => setBpm(preset.value)}
              className={`px-1.5 py-1 text-[10px] font-medium rounded-lg border transition-all cursor-pointer ${
                bpm === preset.value
                  ? 'bg-rose-600/30 border-rose-500/50 text-white font-semibold'
                  : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Master Play / Mute Switch */}
        <button
          onClick={toggleBeat}
          className={`w-full py-2.5 rounded-xl font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
            isBeatPlaying
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white/10 text-slate-200 hover:bg-white/15'
          }`}
        >
          {isBeatPlaying ? (
            <>
              <Square className="w-3.5 h-3.5 fill-white" /> Stop Audio Beat
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-white" /> Play Audio Beat
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-400">
          Syncs subtle page pulse & rhythm with studio tempo.
        </p>
      </div>
    </div>
  );
}
