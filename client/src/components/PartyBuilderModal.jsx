import React, { useState } from 'react';
import { X, Send, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

const EVENT_TYPES = [
  { id: 'sangeet', name: 'Royal Wedding Sangeet', basePrice: 8000, desc: 'Couple duets, family flashmobs & grand entries' },
  { id: 'birthday', name: 'Dance Birthday Party', basePrice: 4000, desc: 'High energy choreography, games & floor hosting' },
  { id: 'flashmob', name: 'Flash Mob / Surprise Event', basePrice: 7000, desc: 'Secret rehearsals & synchronized group drops' },
  { id: 'corporate', name: 'Corporate Team Groove', basePrice: 6000, desc: 'Team bonding & stage choreography' }
];

export default function PartyBuilderModal({ isOpen, onClose }) {
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [songCount, setSongCount] = useState(3);
  const [dancerCount, setDancerCount] = useState(8);
  const [addons, setAddons] = useState({
    audioMashup: true,
    studioRehearsals: true,
    venueDryRun: false,
    cinematicVideo: false
  });
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  let totalEstimate = eventType.basePrice;
  totalEstimate += (songCount - 1) * 1500;
  if (dancerCount > 10) totalEstimate += (dancerCount - 10) * 200;
  if (addons.audioMashup) totalEstimate += 1500;
  if (addons.studioRehearsals) totalEstimate += 2500;
  if (addons.venueDryRun) totalEstimate += 3500;
  if (addons.cinematicVideo) totalEstimate += 3000;

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          interestedStyle: `Event: ${eventType.name}`,
          source: 'Party & Sangeet Builder',
          estimatedBudget: totalEstimate,
          message: `${eventType.name} for ${songCount} songs, ~${dancerCount} dancers on date ${eventDate || 'Upcoming'}. Est: ₹${totalEstimate}`
        })
      });
      setIsSubmitted(true);
      confetti({ particleCount: 50, spread: 45 });
    } catch {
      setIsSubmitted(true);
    }
  };

  const openWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Sargam Dance Studio! I planned a package for ${eventType.name} (Estimated: ₹${totalEstimate}). Name: ${contactName}, Phone: ${contactPhone}. Please share choreographers' availability!`
    );
    window.open(`https://wa.me/919829041234?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-6 flex items-start justify-center animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#E7E5E0] p-5 sm:p-8 text-[#1C1917] shadow-2xl my-4 sm:my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-600 hover:text-[#1C1917] transition-colors z-20 cursor-pointer border border-[#E7E5E0] shadow-xs active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <span className="text-[11px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block mb-1">
              CHOREOGRAPHY ESTIMATOR
            </span>

            <h3 className="font-serif font-semibold text-2xl sm:text-3xl text-[#1C1917]">
              Sangeet & Event Choreography
            </h3>
            <p className="text-xs text-stone-500 mb-6">
              Customize song count, participants, and rehearsal slots for transparent pricing in Jaipur.
            </p>

            {/* Event Type Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              {EVENT_TYPES.map((et) => (
                <button
                  key={et.id}
                  onClick={() => setEventType(et)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    eventType.id === et.id
                      ? 'bg-[#9F1239]/5 border-[#9F1239] text-[#1C1917]'
                      : 'bg-[#FAF9F6] border-[#E7E5E0] text-stone-600 hover:border-stone-400'
                  }`}
                >
                  <h5 className="font-semibold text-xs sm:text-sm text-[#1C1917]">{et.name}</h5>
                  <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{et.desc}</p>
                </button>
              ))}
            </div>

            {/* Config Sliders */}
            <div className="space-y-4 bg-[#FAF9F6] p-4 sm:p-5 rounded-xl border border-[#E7E5E0] mb-5">
              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-stone-600">Number of Songs:</span>
                  <span className="font-mono font-semibold text-[#9F1239]">{songCount} Tracks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={songCount}
                  onChange={(e) => setSongCount(Number(e.target.value))}
                  className="w-full accent-[#9F1239] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-stone-600">Estimated Performers:</span>
                  <span className="font-mono font-semibold text-[#9F1239]">{dancerCount} People</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={dancerCount}
                  onChange={(e) => setDancerCount(Number(e.target.value))}
                  className="w-full accent-[#9F1239] cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block mb-2 font-medium">
                  Optional Add-Ons:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E7E5E0] cursor-pointer hover:border-stone-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.audioMashup}
                      onChange={(e) => setAddons({ ...addons, audioMashup: e.target.checked })}
                      className="accent-[#9F1239]"
                    />
                    <span className="text-stone-700">DJ Audio Mashup (+₹1,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E7E5E0] cursor-pointer hover:border-stone-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.studioRehearsals}
                      onChange={(e) => setAddons({ ...addons, studioRehearsals: e.target.checked })}
                      className="accent-[#9F1239]"
                    />
                    <span className="text-stone-700">Studio Practice Slots (+₹2,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E7E5E0] cursor-pointer hover:border-stone-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.venueDryRun}
                      onChange={(e) => setAddons({ ...addons, venueDryRun: e.target.checked })}
                      className="accent-[#9F1239]"
                    />
                    <span className="text-stone-700">On-Stage Dry Run (+₹3,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-[#E7E5E0] cursor-pointer hover:border-stone-400 transition-colors">
                    <input
                      type="checkbox"
                      checked={addons.cinematicVideo}
                      onChange={(e) => setAddons({ ...addons, cinematicVideo: e.target.checked })}
                      className="accent-[#9F1239]"
                    />
                    <span className="text-stone-700">Gimbal Video Shoot (+₹3,000)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Price Estimation Box */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] font-mono text-stone-500 tracking-wider uppercase block">
                  ESTIMATED PRICE
                </span>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-[#1C1917]">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-stone-500 text-right max-w-[140px]">
                Includes tutorials & coaching
              </span>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmitEnquiry} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#9F1239] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#9F1239] transition-colors"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#9F1239] transition-colors"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Sangeet / Event Enquiry</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] hover:bg-[#F5F3EF] text-stone-600 font-medium text-xs transition-colors cursor-pointer text-center"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-6">
            <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
              Enquiry Received
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
              Our lead sangeet choreographer Aryan Joshi and team will review your estimated package (₹{totalEstimate.toLocaleString('en-IN')}) and message you on WhatsApp.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={openWhatsAppDirect}
                className="flex-1 py-3 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat On WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#FAF9F6] border border-[#E7E5E0] text-stone-700 text-xs font-medium hover:bg-[#F5F3EF] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
