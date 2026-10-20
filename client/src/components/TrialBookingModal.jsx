import React, { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TrialBookingModal({ isOpen, onClose, defaultStyle }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [style, setStyle] = useState(defaultStyle || 'Bollywood Commercial & Masala');
  const [branch, setBranch] = useState('Malviya Nagar (Near Gaurav Tower)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          interestedStyle: style,
          branch,
          message,
          source: 'Trial Class Modal'
        })
      });
      setIsSubmitted(true);
      confetti({ particleCount: 50, spread: 45 });
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sargam Dance Studio! I booked a Free Trial for ${style} at ${branch}. My name is ${name}. See you soon!`
    );
    window.open(`https://wa.me/919829041234?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
              ZERO-OBLIGATION PASS
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Claim Your Free Trial
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Experience a live class at our Malviya Nagar or Vaishali Nagar studios in Jaipur.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aryan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Dance Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option>Bollywood Commercial & Masala</option>
                    <option>Desi Hip-Hop & Street Urban</option>
                    <option>Kathak Fusion & Semi-Classical</option>
                    <option>Contemporary & Lyrical Flow</option>
                    <option>Zumba Fitness & Cardio Jam</option>
                    <option>Royal Wedding & Sangeet</option>
                    <option>Little Ustaads (Kids 4-12 yrs)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Studio Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option>Malviya Nagar (Near Gaurav Tower)</option>
                    <option>Vaishali Nagar Studio (Amrapali)</option>
                    <option>Tonk Phatak Studio</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer mt-1"
              >
                {isSubmitting ? 'Reserving...' : 'Claim 100% Free Trial Pass'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-3 py-3">
            <h3 className="font-display font-bold text-xl text-white">
              Trial Pass Reserved
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              We received your trial request for <strong>{style}</strong> at <strong>{branch}</strong>. Our studio manager will WhatsApp you upcoming session timings.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={openWhatsApp}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg bg-white/10 text-slate-300 text-xs font-medium hover:bg-white/15 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
