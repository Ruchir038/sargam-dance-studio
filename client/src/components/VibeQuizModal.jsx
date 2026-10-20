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
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-4 flex items-start sm:items-center justify-center animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E7E5E0] p-5 sm:p-8 text-[#1C1917] shadow-2xl my-4 sm:my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-600 hover:text-[#1C1917] transition-colors cursor-pointer border border-[#E7E5E0] shadow-xs active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {!result ? (
          <div>
            <span className="text-[11px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block mb-1">
              DANCE STYLE MATCH
            </span>

            <h3 className="font-serif font-semibold text-2xl text-[#1C1917] mb-1">
              Find Your Dance Style
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
            </p>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#FAF9F6] rounded-full mb-6 overflow-hidden border border-[#E7E5E0]">
              <div
                className="h-full bg-[#9F1239] transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question title */}
            <h4 className="text-sm sm:text-base font-semibold text-[#1C1917] mb-4 leading-snug">
              {QUIZ_QUESTIONS[currentQuestion].question}
            </h4>

            {/* Options */}
            <div className="space-y-2.5">
              {QUIZ_QUESTIONS[currentQuestion].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx, opt)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between group cursor-pointer ${
                    selectedOption === idx
                      ? 'bg-[#9F1239] border-[#9F1239] text-white font-medium shadow-sm'
                      : 'bg-[#FAF9F6] border-[#E7E5E0] text-stone-700 hover:border-stone-400 hover:bg-[#F5F3EF]'
                  }`}
                >
                  <span className="leading-snug">{opt.text}</span>
                  <ArrowRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Screen */
          <div className="text-center space-y-4 animate-in zoom-in-95 duration-200 py-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-center text-3xl">
              {result.spiritIcon}
            </div>

            <div>
              <span className="text-[11px] font-mono text-[#9F1239] uppercase tracking-wider block font-semibold">
                YOUR STYLE MATCH
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917] mt-1">
                {result.title}
              </h3>
              <p className="text-xs text-[#9F1239] font-medium mt-1">
                {result.archetype}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              {result.description}
            </p>

            {/* Recommended Batch Box */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-left">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                RECOMMENDED JAIPUR BATCH
              </span>
              <div className="flex items-center justify-between mt-1.5">
                <div>
                  <h5 className="font-semibold text-[#1C1917] text-sm">{result.batchTitle}</h5>
                  <p className="text-xs text-stone-500">Coach: {result.instructor}</p>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#9F1239]/10 text-[#9F1239] border border-[#9F1239]/20 font-medium">
                  96% Match
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-3 space-y-2">
              <button
                onClick={() => {
                  onClose();
                  if (onSelectBatch) onSelectBatch(result.batchSlug);
                }}
                className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer"
              >
                View Batch & Reserve Formation Spot
              </button>

              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-[#1C1917] transition-colors cursor-pointer pt-1"
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
