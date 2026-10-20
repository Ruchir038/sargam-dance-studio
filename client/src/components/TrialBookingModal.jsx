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
      confetti({ particleCount: 40, spread: 40 });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E7E5E0] p-7 text-[#1C1917] shadow-xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F3EF] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9F1239] font-semibold block mb-1">
              Trial Pass
            </span>

            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              Book a Free Trial Session
            </h3>
            <p className="text-xs text-[#78716C] mt-1 mb-6">
              Experience a class at our Malviya Nagar or Vaishali Nagar studios in Jaipur.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs text-[#57534E] block mb-1 font-medium">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Aryan Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#57534E] block mb-1 font-medium">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98290 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#57534E] block mb-1 font-medium">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="aryan@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-[#57534E] block mb-1 font-medium">Dance Style</label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
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
                  <label className="text-xs text-[#57534E] block mb-1 font-medium">Studio Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
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
                className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs tracking-wide transition-colors cursor-pointer mt-2"
              >
                {isSubmitting ? 'Reserving...' : 'Confirm Free Trial Reservation'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              Trial Session Reserved
            </h3>
            <p className="text-xs text-[#78716C] max-w-xs mx-auto">
              We received your trial request for <strong>{style}</strong> at <strong>{branch}</strong>. Our studio manager will WhatsApp you confirmation details shortly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                onClick={openWhatsApp}
                className="flex-1 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-[#F5F3EF] text-[#57534E] text-xs font-medium hover:bg-[#E7E5E0] cursor-pointer"
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
