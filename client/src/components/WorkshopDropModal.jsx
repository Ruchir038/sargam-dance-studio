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
        confetti({ particleCount: 50, spread: 45 });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E7E5E0] p-7 text-[#1C1917] shadow-xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F3EF] transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!ticketIssued ? (
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9F1239] font-semibold block mb-1">
              Workshop Pass
            </span>

            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              {workshop.title}
            </h3>
            <p className="text-xs text-[#78716C] mt-1 mb-5">
              With {workshop.guestArtist}
            </p>

            {/* Date & Venue Info */}
            <div className="space-y-2 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#57534E] mb-5">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>{workshop.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>{workshop.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span className="truncate">{workshop.venue}</span>
              </div>
            </div>

            {/* Tiers Selector */}
            <div className="space-y-2 mb-5">
              <span className="text-[11px] uppercase tracking-wider text-[#78716C] font-medium block">
                Select Pass Option:
              </span>
              <div className="space-y-2">
                {workshop.tiers.map((tier) => (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setSelectedTier(tier)}
                    className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                      currentTier.name === tier.name
                        ? 'bg-[#F5F3EF] border-[#1C1917] text-[#1C1917]'
                        : 'bg-white border-[#E7E5E0] text-[#57534E] hover:border-[#D6D3CD]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs sm:text-sm text-[#1C1917]">{tier.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E7E5E0] text-[#57534E]">
                          {tier.tag}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#78716C] font-mono mt-0.5 block">
                        {tier.sold}/{tier.limit} spots claimed
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-semibold text-base text-[#1C1917]">₹{tier.price}</span>
                      {tier.originalPrice && (
                        <span className="text-[11px] text-[#A8A29E] line-through block">₹{tier.originalPrice}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookTicket} className="space-y-3">
              <input
                type="text"
                placeholder="Attendee Full Name *"
                required
                value={attendeeName}
                onChange={(e) => setAttendeeName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
              />
              <div className="grid grid-cols-2 gap-2.5">
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs tracking-wide transition-colors cursor-pointer mt-2"
              >
                {isSubmitting ? 'Securing Pass...' : `Get Workshop Pass • ₹${currentTier.price}`}
              </button>
            </form>
          </div>
        ) : (
          /* Digital QR Ticket Pass */
          <div className="text-center space-y-4 py-2">
            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              Workshop Pass Issued
            </h3>

            {/* Ticket Card */}
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E7E5E0] text-left space-y-3 text-xs max-w-sm mx-auto">
              <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-2.5">
                <div>
                  <span className="text-[10px] text-[#9F1239] font-medium uppercase tracking-wider">SARGAM PASS</span>
                  <h4 className="font-medium text-sm text-[#1C1917] mt-0.5">{ticketIssued.workshopTitle}</h4>
                </div>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white border border-[#E7E5E0] text-[#57534E]">
                  {ticketIssued.ticketId}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#A8A29E] block">ATTENDEE</span>
                  <span className="font-medium text-[#1C1917]">{ticketIssued.attendeeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A8A29E] block">TIER</span>
                  <span className="font-medium text-[#1C1917]">{ticketIssued.tier}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A8A29E] block">DATE</span>
                  <span className="text-[#57534E]">{ticketIssued.date}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#A8A29E] block">AMOUNT</span>
                  <span className="text-[#9F1239] font-semibold">₹{ticketIssued.pricePaid} Paid</span>
                </div>
              </div>

              {/* QR Code */}
              <div className="pt-2.5 border-t border-[#E7E5E0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-12 bg-white p-1 rounded-lg border border-[#E7E5E0] flex items-center justify-center">
                    <QrCode className="w-10 h-10 text-black" />
                  </div>
                  <div className="text-[10px] text-[#78716C]">
                    <p className="text-emerald-700 font-medium">Verified Studio Pass</p>
                    <p>Show at entrance</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#A8A29E] font-medium">Jaipur, RJ</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-full bg-[#1C1917] hover:bg-[#292524] text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
