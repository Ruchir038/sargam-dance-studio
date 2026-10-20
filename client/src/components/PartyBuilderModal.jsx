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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Header */}
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
              CHOREOGRAPHY ESTIMATOR
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Sangeet & Event Choreography
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Customize song count, participants, and rehearsal slots for transparent pricing in Jaipur.
            </p>

            {/* Event Type Grid */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {EVENT_TYPES.map((et) => (
                <button
                  key={et.id}
                  onClick={() => setEventType(et)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    eventType.id === et.id
                      ? 'bg-rose-600/15 border-rose-500/60 text-white'
                      : 'bg-black/20 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-300'
                  }`}
                >
                  <h5 className="font-semibold text-xs sm:text-sm text-white">{et.name}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{et.desc}</p>
                </button>
              ))}
            </div>

            {/* Config Sliders */}
            <div className="space-y-3.5 bg-black/30 p-4 rounded-xl border border-white/5 mb-5">
              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-400">Number of Songs:</span>
                  <span className="font-mono font-semibold text-rose-400">{songCount} Tracks</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={songCount}
                  onChange={(e) => setSongCount(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1 text-xs">
                  <span className="text-slate-400">Estimated Performers:</span>
                  <span className="font-mono font-semibold text-amber-300">{dancerCount} People</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="25"
                  value={dancerCount}
                  onChange={(e) => setDancerCount(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Optional Add-Ons:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addons.audioMashup}
                      onChange={(e) => setAddons({ ...addons, audioMashup: e.target.checked })}
                      className="accent-rose-500"
                    />
                    <span className="text-slate-300">DJ Audio Mashup (+₹1,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addons.studioRehearsals}
                      onChange={(e) => setAddons({ ...addons, studioRehearsals: e.target.checked })}
                      className="accent-rose-500"
                    />
                    <span className="text-slate-300">Studio Practice Slots (+₹2,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addons.venueDryRun}
                      onChange={(e) => setAddons({ ...addons, venueDryRun: e.target.checked })}
                      className="accent-rose-500"
                    />
                    <span className="text-slate-300">On-Stage Dry Run (+₹3,500)</span>
                  </label>

                  <label className="flex items-center gap-2 p-2 rounded-lg bg-black/20 border border-white/5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addons.cinematicVideo}
                      onChange={(e) => setAddons({ ...addons, cinematicVideo: e.target.checked })}
                      className="accent-rose-500"
                    />
                    <span className="text-slate-300">Gimbal Video Shoot (+₹3,000)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Price Estimation Box */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between mb-5">
              <div>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider uppercase block">
                  ESTIMATED PRICE
                </span>
                <span className="font-display font-bold text-2xl text-white">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-slate-400 text-right max-w-[140px]">
                Includes tutorials & coaching
              </span>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmitEnquiry} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Sangeet / Event Enquiry</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-3.5 py-4">
            <h3 className="font-display font-bold text-xl text-white">
              Enquiry Received
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Our lead sangeet choreographer Aryan Joshi and team will review your estimated package (₹{totalEstimate.toLocaleString('en-IN')}) and message you on WhatsApp.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={openWhatsAppDirect}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Chat On WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-white/10 text-slate-300 text-xs font-medium hover:bg-white/15 cursor-pointer"
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
