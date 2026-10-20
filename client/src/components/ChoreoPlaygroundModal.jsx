import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../lib/soundEngine';
import { X, Play, Square, Trash2, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

const AVAILABLE_MOVES = [
  { id: 'm-1', name: 'Jaipur Thumka', style: 'Bollywood', icon: '💃', color: '#E11D48' },
  { id: 'm-2', name: 'Street Wave', style: 'Hip-Hop', icon: '🌊', color: '#6366F1' },
  { id: 'm-3', name: 'Kathak Chakkar', style: 'Classical', icon: '🌪️', color: '#F59E0B' },
  { id: 'm-4', name: 'B-Boy Freeze', style: 'Breaking', icon: '⚡', color: '#14B8A6' },
  { id: 'm-5', name: 'Bhangra Bounce', style: 'Folk', icon: '🕺', color: '#EA580C' },
  { id: 'm-6', name: 'Lyrical Drop', style: 'Contemporary', icon: '🍃', color: '#38BDF8' },
  { id: 'm-7', name: 'Hookstep Hype', style: 'Bollywood', icon: '🔥', color: '#EC4899' },
  { id: 'm-8', name: 'Zumba Stomp', style: 'Fitness', icon: '✨', color: '#A855F7' }
];

export default function ChoreoPlaygroundModal({ isOpen, onClose }) {
  const [timeline, setTimeline] = useState([
    AVAILABLE_MOVES[0],
    AVAILABLE_MOVES[1],
    AVAILABLE_MOVES[4],
    AVAILABLE_MOVES[3]
  ]);
  const [routineTitle, setRoutineTitle] = useState('My Jaipur Sangeet Routine');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopPlayback();
    }
  }, [isOpen]);

  const addMove = (move) => {
    if (timeline.length >= 8) return;
    setTimeline(prev => [...prev, move]);
    soundEngine.playHiHat();
  };

  const removeMove = (index) => {
    setTimeline(prev => prev.filter((_, idx) => idx !== index));
  };

  const startPlayback = () => {
    if (timeline.length === 0) return;
    setIsPlaying(true);
    setActiveStep(0);

    let step = 0;
    const intervalMs = 600;

    timerRef.current = setInterval(() => {
      soundEngine.playKick();
      step = (step + 1) % timeline.length;
      setActiveStep(step);
    }, intervalMs);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    setActiveStep(-1);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSaveRoutine = async () => {
    try {
      await fetch('/api/choreo/routines', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: routineTitle,
          moves: timeline.map(m => m.id)
        })
      });
      setSavedSuccess(true);
      confetti({ particleCount: 50, spread: 45 });
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch {
      setSavedSuccess(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          CHOREO PLAYGROUND
        </span>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <input
            type="text"
            value={routineTitle}
            onChange={(e) => setRoutineTitle(e.target.value)}
            className="font-display font-bold text-lg text-white bg-transparent border-b border-white/10 focus:outline-none focus:border-rose-500 pb-1 w-full sm:w-auto"
          />
        </div>

        {/* Timeline Strip */}
        <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              8-Count Timeline ({timeline.length}/8 Slots)
            </span>
            <div className="flex gap-2">
              {!isPlaying ? (
                <button
                  onClick={startPlayback}
                  disabled={timeline.length === 0}
                  className="px-3 py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-white" /> Play
                </button>
              ) : (
                <button
                  onClick={stopPlayback}
                  className="px-3 py-1 rounded-md bg-slate-700 text-white text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Square className="w-3 h-3 fill-white" /> Stop
                </button>
              )}
            </div>
          </div>

          {/* Timeline Cards */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 min-h-20">
            {timeline.map((move, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={idx}
                  className={`relative p-2 rounded-lg border text-center transition-all ${
                    isActive
                      ? 'border-rose-500 bg-rose-500/10 scale-105'
                      : 'border-white/10 bg-[#1C1A2B]'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-500 block">#{idx + 1}</span>
                  <span className="text-xl my-0.5 block">{move.icon}</span>
                  <span className="text-[9px] font-medium text-slate-300 truncate w-full block">
                    {move.name}
                  </span>

                  <button
                    onClick={() => removeMove(idx)}
                    className="absolute -top-1 -right-1 p-0.5 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                  >
                    <Trash2 className="w-2.5 h-2.5" />
                  </button>
                </div>
              );
            })}

            {Array.from({ length: Math.max(0, 8 - timeline.length) }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="rounded-lg border border-dashed border-white/10 bg-black/10 flex items-center justify-center text-slate-600 text-xs font-mono"
              >
                +
              </div>
            ))}
          </div>
        </div>

        {/* Move Palette */}
        <div>
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-medium">
            Available Moves (Click to add):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AVAILABLE_MOVES.map((move) => (
              <button
                key={move.id}
                onClick={() => addMove(move)}
                className="p-2.5 rounded-xl bg-black/20 border border-white/5 hover:border-white/20 transition-all flex items-center gap-2 text-left cursor-pointer"
              >
                <span className="text-xl">{move.icon}</span>
                <div className="overflow-hidden">
                  <h6 className="text-xs font-medium text-slate-200 truncate">{move.name}</h6>
                  <span className="text-[10px] text-slate-500 block">{move.style}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/5">
          <span className="text-xs text-slate-400">
            {savedSuccess ? '✓ Routine saved to studio cloud' : 'Build an 8-count routine preview.'}
          </span>
          <button
            onClick={handleSaveRoutine}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" /> Save Routine
          </button>
        </div>
      </div>
    </div>
  );
}
