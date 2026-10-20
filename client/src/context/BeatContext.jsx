import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { soundEngine } from '../lib/soundEngine';
import confetti from 'canvas-confetti';

const BeatContext = createContext(null);

export const SWARAS = [
  { note: 'Sa', key: 'S', freq: 261.63, hindi: 'सा', color: '#E11D48', label: 'Shadja' },
  { note: 'Re', key: 'R', freq: 293.66, hindi: 'रे', color: '#EA580C', label: 'Rishabh' },
  { note: 'Ga', key: 'G', freq: 329.63, hindi: 'ग', color: '#F59E0B', label: 'Gandhar' },
  { note: 'Ma', key: 'M', freq: 349.23, hindi: 'म', color: '#14B8A6', label: 'Madhyam' },
  { note: 'Pa', key: 'P', freq: 392.00, hindi: 'प', color: '#6366F1', label: 'Pancham' },
  { note: 'Dha', key: 'D', freq: 440.00, hindi: 'ध', color: '#3B82F6', label: 'Dhaivat' },
  { note: 'Ni', key: 'N', freq: 493.88, hindi: 'नि', color: '#A855F7', label: 'Nishad' }
];

export function BeatProvider({ children }) {
  const [bpm, setBpm] = useState(105);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [currentBeatStep, setCurrentBeatStep] = useState(0);
  const [swaraHistory, setSwaraHistory] = useState([]);
  const [easterEggUnlocked, setEasterEggUnlocked] = useState(false);
  const [easterEggCode, setEasterEggCode] = useState('SARGAMBEAT25');
  const [recentSwara, setRecentSwara] = useState(null);

  // Update CSS variables whenever BPM changes
  useEffect(() => {
    const duration = (60 / bpm).toFixed(3) + 's';
    document.documentElement.style.setProperty('--beat-bpm', bpm.toString());
    document.documentElement.style.setProperty('--beat-duration', duration);
    soundEngine.setBPM(bpm);
  }, [bpm]);

  // Handle Beat audio toggle
  const toggleBeat = () => {
    if (isBeatPlaying) {
      soundEngine.stopBeat();
      setIsBeatPlaying(false);
    } else {
      soundEngine.startBeat(bpm, (step) => {
        setCurrentBeatStep(step);
      });
      setIsBeatPlaying(true);
    }
  };

  // Play Swara function
  const triggerSwara = (swaraObj) => {
    soundEngine.playSwara(swaraObj.freq);
    setRecentSwara(swaraObj);
    setTimeout(() => setRecentSwara(null), 600);

    setSwaraHistory(prev => {
      const next = [...prev, swaraObj.key].slice(-4);
      // Check for S R G M sequence
      if (next.join('') === 'SRGM') {
        soundEngine.playCelebration();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#FF2E93', '#7B2FFF', '#FFB000', '#00F5D4', '#FFFFFF']
        });
        setEasterEggUnlocked(true);
      }
      return next;
    });
  };

  // Keyboard shortcut listener for S, R, G, M, P, D, N
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      const key = e.key.toUpperCase();
      const match = SWARAS.find(s => s.key === key);
      if (match) {
        triggerSwara(match);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BeatContext.Provider
      value={{
        bpm,
        setBpm,
        isBeatPlaying,
        toggleBeat,
        currentBeatStep,
        triggerSwara,
        swaraHistory,
        recentSwara,
        easterEggUnlocked,
        setEasterEggUnlocked,
        easterEggCode,
        swaras: SWARAS
      }}
    >
      {children}
    </BeatContext.Provider>
  );
}

export const useBeat = () => useContext(BeatContext);
