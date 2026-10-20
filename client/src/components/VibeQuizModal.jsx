import React, { useState, useRef } from 'react';
import { X, Sparkles, ArrowRight, Download, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'When you hear a rhythm drop in Jaipur, what is your instinctive reaction?',
    options: [
      { text: 'Full expressive Bollywood hookstep with cinematic confidence.', score: { bolly: 3, hiphop: 0, classical: 0, zumba: 1 } },
      { text: 'Drop low, pop shoulders, and catch a clean street groove.', score: { bolly: 0, hiphop: 3, classical: 0, zumba: 1 } },
      { text: 'A poised chakkar spin and classical mudra alignment.', score: { bolly: 1, hiphop: 0, classical: 3, zumba: 0 } },
      { text: 'Fast jumping rhythm and non-stop aerobic energy.', score: { bolly: 1, hiphop: 0, classical: 0, zumba: 3 } }
    ]
  },
  {
    id: 2,
    question: 'What dominates your top music playlist right now?',
    options: [
      { text: 'Bollywood celebratory tracks and chartbusters', score: { bolly: 3, hiphop: 1, classical: 0, zumba: 1 } },
      { text: 'Desi Hip-Hop, Divine, Karan Aujla, and urban beats', score: { bolly: 1, hiphop: 3, classical: 0, zumba: 0 } },
      { text: 'Coke Studio, semi-classical sitar fusion, and soulful Sufi', score: { bolly: 0, hiphop: 0, classical: 3, zumba: 0 } },
      { text: 'Latin reggaeton, EDM drops, and fast workout mixes', score: { bolly: 0, hiphop: 1, classical: 0, zumba: 3 } }
    ]
  },
  {
    id: 3,
    question: 'What is your primary dance goal?',
    options: [
      { text: 'Confidence at weddings, stage events, and social gatherings', score: { bolly: 3, hiphop: 1, classical: 0, zumba: 0 } },
      { text: 'Street cypher battles, popping isolation, and smooth waves', score: { bolly: 0, hiphop: 3, classical: 0, zumba: 1 } },
      { text: 'Classical foundation, rhythm cycles (taal), and graceful posture', score: { bolly: 1, hiphop: 0, classical: 3, zumba: 0 } },
      { text: 'Burning 500+ calories with fun, high-energy cardio workouts', score: { bolly: 0, hiphop: 0, classical: 0, zumba: 3 } }
    ]
  },
  {
    id: 4,
    question: 'How do you like learning choreography?',
    options: [
      { text: 'Step by step with practical musical cues and expressions', score: { bolly: 3, hiphop: 1, classical: 0, zumba: 0 } },
      { text: 'Count drills, musicality precision, and freestyle sessions', score: { bolly: 0, hiphop: 3, classical: 0, zumba: 0 } },
      { text: 'Deep focus on body alignment, tatkar footwork, and story', score: { bolly: 0, hiphop: 0, classical: 3, zumba: 0 } },
      { text: 'Follow-the-coach non-stop movement and high tempo', score: { bolly: 1, hiphop: 0, classical: 0, zumba: 3 } }
    ]
  },
  {
    id: 5,
    question: 'Which Jaipur studio location suits you best?',
    options: [
      { text: 'Malviya Nagar Studio (Near Gaurav Tower & WTP)', score: { bolly: 1, hiphop: 1, classical: 1, zumba: 1 } },
      { text: 'Vaishali Nagar Studio (Amrapali Circle)', score: { bolly: 1, hiphop: 1, classical: 1, zumba: 1 } },
      { text: 'Tonk Phatak Studio (Main Road)', score: { bolly: 1, hiphop: 1, classical: 1, zumba: 1 } },
      { text: 'Weekend Masterclass / Open To Any Branch', score: { bolly: 1, hiphop: 1, classical: 1, zumba: 1 } }
    ]
  }
];

export default function VibeQuizModal({ isOpen, onClose, onSelectBatch }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ bolly: 0, hiphop: 0, classical: 0, zumba: 0 });
  const [selectedOption, setSelectedOption] = useState(null);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleSelectOption = (index, option) => {
    setSelectedOption(index);
    const updatedScores = {
      bolly: scores.bolly + option.score.bolly,
      hiphop: scores.hiphop + option.score.hiphop,
      classical: scores.classical + option.score.classical,
      zumba: scores.zumba + option.score.zumba
    };
    setScores(updatedScores);

    setTimeout(() => {
      if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        calculateResult(updatedScores);
      }
    }, 250);
  };

  const calculateResult = (finalScores) => {
    const total = finalScores.bolly + finalScores.hiphop + finalScores.classical + finalScores.zumba || 1;
    const sorted = Object.entries(finalScores).sort((a, b) => b[1] - a[1]);
    const topKey = sorted[0][0];

    const bollyPct = Math.round((finalScores.bolly / total) * 100);
    const hiphopPct = Math.round((finalScores.hiphop / total) * 100);
    const classicalPct = Math.round((finalScores.classical / total) * 100);
    const zumbaPct = Math.round((finalScores.zumba / total) * 100);

    let profile = {
      title: 'Bollywood Commercial',
      archetype: '70% Commercial Choreo, 30% Street',
      description: 'You carry natural stage charisma and expressive musicality. Bollywood Commercial and Hookstep batches are your natural home.',
      batchSlug: 'bollywood-commercial',
      batchTitle: 'Bollywood Hookstep Hype (Evening)',
      instructor: 'Vikram "V-Funk" Sharma',
      spiritIcon: '💃'
    };

    if (topKey === 'hiphop') {
      profile = {
        title: 'Desi Hip-Hop & Urban',
        archetype: `${hiphopPct}% Urban Cypher, ${bollyPct}% Commercial`,
        description: 'You connect with low bass grooves, popping isolation, and street swagger. The Cypher evening batch is tailored for you.',
        batchSlug: 'urban-hip-hop',
        batchTitle: 'Desi Hip-Hop & Urban Cypher',
        instructor: 'Rahul "B-Boy Beat" Verma',
        spiritIcon: '🕺'
      };
    } else if (topKey === 'classical') {
      profile = {
        title: 'Kathak & Semi-Classical Fusion',
        archetype: `${classicalPct}% Kathak Flow, ${bollyPct}% Soul`,
        description: 'You appreciate depth, intricate footwork, and fluid storytelling. Our Kathak Fusion batch will nurture your poise.',
        batchSlug: 'kathak-fusion',
        batchTitle: 'Kathak & Semi-Classical Grace',
        instructor: 'Pooja Shekhawat',
        spiritIcon: '✨'
      };
    } else if (topKey === 'zumba') {
      profile = {
        title: 'Zumba Fitness & Cardio Jam',
        archetype: `${zumbaPct}% Cardio Groove, ${bollyPct}% Dance`,
        description: 'High energy, joyful calorie-melting workouts and upbeat tracks keep you thriving.',
        batchSlug: 'zumba-cardio-jam',
        batchTitle: 'Morning Zumba Glow Sweat',
        instructor: 'Simran Mathur',
        spiritIcon: '⚡'
      };
    }

    setResult(profile);
    confetti({ particleCount: 60, spread: 50 });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ bolly: 0, hiphop: 0, classical: 0, zumba: 0 });
    setSelectedOption(null);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div>
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
              DANCE STYLE MATCH
            </span>

            <h3 className="font-display font-bold text-xl text-white mb-1">
              Find Your Dance Style
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-black/40 rounded-full mb-6 overflow-hidden border border-white/5">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h4 className="text-sm sm:text-base font-semibold text-slate-100 mb-4 leading-snug">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {QUIZ_QUESTIONS[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx, opt)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between group cursor-pointer ${
                    selectedOption === idx
                      ? 'bg-rose-600 border-rose-500 text-white font-medium'
                      : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <span>{opt.text}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
              {result.spiritIcon}
            </div>

            <div>
              <span className="text-xs font-mono text-rose-400 uppercase tracking-wider block font-semibold">
                YOUR STYLE MATCH
              </span>
              <h3 className="font-display font-bold text-2xl text-white mt-1">
                {result.title}
              </h3>
              <p className="text-xs text-amber-300 font-medium mt-0.5">
                {result.archetype}
              </p>
            </div>

            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              {result.description}
            </p>

            {/* Recommended Batch Box */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-left">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                RECOMMENDED JAIPUR BATCH
              </span>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <h5 className="font-semibold text-white text-sm">{result.batchTitle}</h5>
                  <p className="text-[11px] text-slate-400">Coach: {result.instructor}</p>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
                  96% Match
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  if (onSelectBatch) onSelectBatch(result.batchSlug);
                }}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer"
              >
                View Batch & Reserve Formation Spot
              </button>

              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer pt-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
