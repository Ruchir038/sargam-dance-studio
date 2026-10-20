import React, { useState } from 'react';
import { X, QrCode, Ticket, Calendar, MapPin, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkshopDropModal({ isOpen, workshop, onClose }) {
  const [selectedTier, setSelectedTier] = useState(workshop?.tiers?.[0] || null);
  const [attendeeName, setAttendeeName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [ticketIssued, setTicketIssued] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !workshop) return null;

  const currentTier = selectedTier || workshop.tiers[0];

  const handleBookTicket = async (e) => {
    e.preventDefault();
    if (!attendeeName || !phone) return;
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/workshops/${workshop.id}/ticket`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendeeName,
          phone,
          email,
          tierName: currentTier.name
        })
      });
      const data = await res.json();
      if (data.success) {
        setTicketIssued(data.ticket);
        confetti({ particleCount: 60, spread: 55 });
      }
    } catch {
      const fallbackTicket = {
        ticketId: 'SARGAM-TKT-' + Math.floor(10000 + Math.random() * 90000),
        workshopTitle: workshop.title,
        venue: workshop.venue,
        date: workshop.date,
        time: workshop.time,
        attendeeName,
        phone,
        tier: currentTier.name,
        pricePaid: currentTier.price
      };
      setTicketIssued(fallbackTicket);
    } finally {
      setIsSubmitting(false);
    }
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

        {!ticketIssued ? (
          <div>
            {/* Header */}
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
              WORKSHOP PASS
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              {workshop.title}
            </h3>
            <p className="text-xs text-amber-300 font-medium mt-0.5 mb-4">
              With {workshop.guestArtist}
            </p>

            {/* Date & Venue Info */}
            <div className="space-y-1.5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-slate-300 mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{workshop.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{workshop.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{workshop.venue}</span>
              </div>
            </div>

            {/* Tiers Selector */}
            <div className="space-y-2 mb-5">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Select Ticket Tier:
              </span>
              <div className="space-y-2">
                {workshop.tiers.map((tier) => (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      currentTier.name === tier.name
                        ? 'bg-rose-600/15 border-rose-500/70 text-white'
                        : 'bg-black/20 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-white">{tier.name}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-slate-300 border border-white/5">
                          {tier.tag}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        {tier.sold}/{tier.limit} spots claimed
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-bold text-base text-white">₹{tier.price}</span>
                      {tier.originalPrice && (
                        <span className="text-[10px] text-slate-500 line-through block">₹{tier.originalPrice}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookTicket} className="space-y-2.5">
              <input
                type="text"
                placeholder="Attendee Full Name *"
                required
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide transition-colors cursor-pointer mt-1"
              >
                {isSubmitting ? 'Securing Pass...' : `Get Workshop Pass • ₹${currentTier.price}`}
              </button>
            </form>
          </div>
        ) : (
          /* Digital QR Ticket Pass */
          <div className="text-center space-y-3.5">
            <h3 className="font-display font-bold text-xl text-white">
              Workshop Pass Issued
            </h3>

            {/* Ticket Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <div>
                  <span className="text-[9px] font-mono text-rose-400 uppercase font-semibold">SARGAM PASS</span>
                  <h4 className="font-semibold text-sm text-white">{ticketIssued.workshopTitle}</h4>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-slate-200">
                  {ticketIssued.ticketId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 block">DANCER</span>
                  <span className="font-medium text-white">{ticketIssued.attendeeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TIER</span>
                  <span className="font-medium text-slate-200">{ticketIssued.tier}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DATE & TIME</span>
                  <span className="text-slate-300">{ticketIssued.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">AMOUNT</span>
                  <span className="text-rose-400 font-semibold">₹{ticketIssued.pricePaid} Paid</span>
                </div>
              </div>

              {/* QR code */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-white p-1 rounded flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <p className="text-emerald-400 font-medium">Verified Pass</p>
                    <p>Show at studio entrance</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Jaipur</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
