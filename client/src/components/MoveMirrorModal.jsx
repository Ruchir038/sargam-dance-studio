import React, { useState, useEffect, useRef } from 'react';
import { X, Camera, Play, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const DANCE_PROMPTS = [
  { name: 'Bollywood Thumka', icon: '💃', desc: 'Bounce hips right-left to the beat!', duration: 7 },
  { name: 'Bhangra Shoulder Pop', icon: '🕺', desc: 'Pump both shoulders up and down!', duration: 7 },
  { name: 'Street Arm Wave', icon: '🌊', desc: 'Ripple wave across your arms!', duration: 8 },
  { name: 'Kathak Spin & Freeze', icon: '🌪️', desc: 'Spin and hold a sharp pose!', duration: 8 }
];

export default function MoveMirrorModal({ isOpen, onClose, onClaimTrial }) {
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [feedback, setFeedback] = useState('Get Ready');
  const [challengeFinished, setChallengeFinished] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setIsPlaying(false);
      setChallengeFinished(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setCameraError('Camera access not granted. You can still test the dance challenge!');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const startChallenge = () => {
    setIsPlaying(true);
    setScore(0);
    setCombo(1);
    setSecondsLeft(30);
    setCurrentPromptIdx(0);
    setChallengeFinished(false);
    setFeedback('Move on the beat');

    let time = 30;
    const feedbacks = ['Good Rhythm', 'Clean Isolation', 'On The Beat', 'Sharp Movement'];

    timerRef.current = setInterval(() => {
      time -= 1;
      setSecondsLeft(time);

      setScore(prev => prev + Math.floor(Math.random() * 3 + 2));
      if (time % 3 === 0) {
        setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)]);
        setCombo(prev => Math.min(prev + 1, 5));
      }

      if (time === 23) setCurrentPromptIdx(1);
      if (time === 16) setCurrentPromptIdx(2);
      if (time === 8) setCurrentPromptIdx(3);

      if (time <= 0) {
        clearInterval(timerRef.current);
        setIsPlaying(false);
        setChallengeFinished(true);
        confetti({ particleCount: 60, spread: 50 });
      }
    }, 1000);
  };

  if (!isOpen) return null;

  const currentMove = DANCE_PROMPTS[currentPromptIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-[#E7E5E0] p-6 sm:p-7 text-[#1C1917] shadow-xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-500 hover:text-[#1C1917] transition-colors z-20 cursor-pointer border border-[#E7E5E0]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-[11px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block mb-1">
          STUDIO MIRROR CHALLENGE
        </span>
        <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mb-1">
          30-Second Movement Challenge
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          Match the choreography cues in real-time. 100% private in your browser.
        </p>

        {/* Video / Mirror Canvas View */}
        <div className="relative w-full aspect-video rounded-xl bg-stone-900 border border-[#E7E5E0] overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover transform scale-x-[-1] ${cameraActive ? 'block' : 'hidden'}`}
          />

          {!cameraActive && (
            <div className="text-center p-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl">
                🪞
              </div>
              <p className="text-xs text-stone-300 max-w-xs">
                Enable webcam to see yourself in the studio mirror, or start the prompt challenge directly.
              </p>
              <button
                onClick={startCamera}
                className="px-4 py-2 rounded-full bg-white text-xs font-medium text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Enable Camera
              </button>
            </div>
          )}

          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between bg-gradient-to-t from-black/80 via-transparent to-black/60">
              <div className="flex items-center justify-between">
                <div className="px-2.5 py-1 rounded-md bg-[#9F1239] text-white text-[11px] font-mono font-medium">
                  TIME: {secondsLeft}s
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/20 text-xs font-mono text-white">
                    COMBO {combo}X
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#9F1239]/80 border border-white/30 text-xs font-mono text-white">
                    SCORE: {score}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
                  {feedback}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{currentMove.icon}</span>
                  <div>
                    <h5 className="font-semibold text-white text-xs">{currentMove.name}</h5>
                    <p className="text-[11px] text-stone-300">{currentMove.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-400">{secondsLeft % 8}s</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls or Results */}
        {!challengeFinished ? (
          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Follow the on-screen dance cues and hold the posture!
            </span>
            {!isPlaying ? (
              <button
                onClick={startChallenge}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Start 30-Sec Challenge</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  clearInterval(timerRef.current);
                  setIsPlaying(false);
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] text-stone-700 text-xs font-medium hover:bg-[#F5F3EF]"
              >
                Pause
              </button>
            )}
          </div>
        ) : (
          <div className="mt-5 p-5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-center space-y-3">
            <h4 className="font-serif font-bold text-xl text-[#1C1917]">
              Challenge Complete • Score: {score}
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Nice groove! Come experience the real dance floor with our instructors at Malviya Nagar.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (onClaimTrial) onClaimTrial();
                }}
                className="flex-1 py-2.5 rounded-full bg-[#9F1239] hover:bg-[#881337] text-white font-medium text-xs transition-colors cursor-pointer"
              >
                Claim Free Studio Trial Pass
              </button>
              <button
                onClick={startChallenge}
                className="px-4 py-2.5 rounded-full bg-white border border-[#E7E5E0] text-stone-700 text-xs font-medium hover:bg-[#F5F3EF] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
