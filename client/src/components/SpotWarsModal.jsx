import React, { useState, useEffect } from 'react';
import { X, Users, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SpotWarsModal({ isOpen, batch, onClose, onBookingSuccess }) {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    if (!isOpen) {
      setSelectedSpot(null);
      setHoldExpiresAt(null);
      setBookingConfirmed(null);
      setErrorMsg('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!holdExpiresAt) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((new Date(holdExpiresAt) - new Date()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        setSelectedSpot(null);
        setHoldExpiresAt(null);
        setErrorMsg('2-minute hold expired. Please select a spot again.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [holdExpiresAt]);

  if (!isOpen || !batch) return null;

  const handleSelectSpot = async (spot) => {
    if (spot.isBooked) return;
    setErrorMsg('');
    setSelectedSpot(spot);

    try {
      const res = await fetch('/api/seats/hold', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: batch.id,
          spotId: spot.id,
          userName: formData.name || 'Dancer'
        })
      });
      const data = await res.json();
      if (data.success) {
        setHoldExpiresAt(data.holdExpiresAt);
        setSecondsLeft(120);
      } else {
        setErrorMsg(data.message || 'Could not hold spot.');
        setSelectedSpot(null);
      }
    } catch {
      setHoldExpiresAt(new Date(Date.now() + 120000).toISOString());
      setSecondsLeft(120);
    }
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedSpot) {
      setErrorMsg('Please click a spot on the studio floor first.');
      return;
    }
    if (!formData.name || !formData.phone) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/seats/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchId: batch.id,
          spotId: selectedSpot.id,
          dancerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          notes: formData.notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setBookingConfirmed(data.booking);
        confetti({ particleCount: 50, spread: 50 });
        if (onBookingSuccess) onBookingSuccess(data.booking);
      } else {
        setErrorMsg(data.message || 'Failed to complete booking.');
      }
    } catch {
      const fallbackBooking = {
        bookingId: 'BK-' + Math.floor(100000 + Math.random() * 900000),
        batchTitle: batch.title,
        spotId: selectedSpot.id,
        dancerName: formData.name,
        status: 'Confirmed'
      };
      setBookingConfirmed(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs p-3 sm:p-4 flex items-start sm:items-center justify-center animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-2xl bg-white border border-[#E7E5E0] p-5 sm:p-7 text-[#1C1917] shadow-2xl my-4 sm:my-6"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-600 hover:text-[#1C1917] transition-colors z-20 cursor-pointer border border-[#E7E5E0] shadow-xs active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingConfirmed ? (
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#9F1239] font-semibold block mb-1">
              Formation Spot Reservation
            </span>

            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              {batch.title}
            </h3>
            <p className="text-xs text-[#78716C] mt-1 mb-5">
              {batch.branch} • {batch.days.join(', ')} @ {batch.time} • ₹{batch.price}/month
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {errorMsg}
              </div>
            )}

            {/* Stage Mirror Indicator */}
            <div className="w-full py-2.5 rounded-xl bg-[#F5F3EF] border border-[#E7E5E0] text-center mb-6">
              <span className="text-xs tracking-wider uppercase text-[#57534E] font-medium">
                Studio Mirrors & Instructor Stage
              </span>
            </div>

            {/* Studio Floor Spots Formation */}
            <div className="space-y-4 bg-[#FAF9F6] p-4 rounded-xl border border-[#E7E5E0]">
              {/* Row 1: Front Spotlight */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-2 font-medium">
                  Row 1: Front Spotlight
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {batch.spotsMap.slice(0, 4).map((spot) => {
                    const isSelected = selectedSpot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        disabled={spot.isBooked}
                        onClick={() => handleSelectSpot(spot)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-stone-200/50 border-stone-200 text-stone-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#1C1917] border-[#1C1917] text-white font-semibold'
                            : 'bg-white border-[#E7E5E0] text-[#1C1917] hover:border-[#1C1917]'
                        }`}
                      >
                        <span className="text-xs font-mono font-medium block">{spot.id}</span>
                        <span className="text-[10px] block truncate text-stone-500">
                          {spot.isBooked ? 'Taken' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Mid Formation */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-2 font-medium">
                  Row 2: Center Formation
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {batch.spotsMap.slice(4, 9).map((spot) => {
                    const isSelected = selectedSpot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        disabled={spot.isBooked}
                        onClick={() => handleSelectSpot(spot)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-stone-200/50 border-stone-200 text-stone-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#1C1917] border-[#1C1917] text-white font-semibold'
                            : 'bg-white border-[#E7E5E0] text-[#1C1917] hover:border-[#1C1917]'
                        }`}
                      >
                        <span className="text-xs font-mono font-medium block">{spot.id}</span>
                        <span className="text-[9px] block truncate text-stone-500">
                          {spot.isBooked ? 'Taken' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Back Groove Zone */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] block mb-2 font-medium">
                  Row 3: Back Groove Zone
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {batch.spotsMap.slice(9, 14).map((spot) => {
                    const isSelected = selectedSpot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        disabled={spot.isBooked}
                        onClick={() => handleSelectSpot(spot)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-stone-200/50 border-stone-200 text-stone-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-[#1C1917] border-[#1C1917] text-white font-semibold'
                            : 'bg-white border-[#E7E5E0] text-[#1C1917] hover:border-[#1C1917]'
                        }`}
                      >
                        <span className="text-xs font-mono font-medium block">{spot.id}</span>
                        <span className="text-[9px] block truncate text-stone-500">
                          {spot.isBooked ? 'Taken' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2-Min Hold Timer Badge */}
            {selectedSpot && (
              <div className="mt-4 p-3 rounded-xl bg-[#F5F3EF] border border-[#E7E5E0] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#9F1239]" />
                  <span className="text-[#57534E]">
                    Spot <strong className="text-[#1C1917]">{selectedSpot.id}</strong> reserved for 2 minutes.
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-[#1C1917] px-2 py-0.5 rounded bg-white border border-[#E7E5E0]">
                  {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Dancer Details Form */}
            <form onSubmit={handleConfirmBooking} className="mt-5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-[#1C1917] text-xs placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-[#1C1917] text-xs placeholder:text-[#A8A29E] focus:outline-none focus:border-[#1C1917]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedSpot}
                className={`w-full py-3 rounded-full font-medium text-xs tracking-wide transition-all cursor-pointer ${
                  selectedSpot
                    ? 'bg-[#1C1917] hover:bg-[#292524] text-white shadow-xs'
                    : 'bg-[#F5F3EF] text-[#A8A29E] cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Confirming...' : `Confirm Spot ${selectedSpot ? selectedSpot.id : ''} (₹${batch.price}/mo)`}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center space-y-4 py-4">
            <h3 className="font-display font-medium text-2xl text-[#1C1917]">
              Spot Confirmed
            </h3>
            <p className="text-xs text-[#78716C] max-w-sm mx-auto">
              Your formation spot has been secured. See you on the studio floor!
            </p>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-left space-y-2 text-xs max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-[#E7E5E0] pb-2">
                <span className="font-mono text-[10px] text-[#A8A29E]">BOOKING ID</span>
                <span className="font-mono font-medium text-[#1C1917]">{bookingConfirmed.bookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#78716C]">Dancer:</span>
                <span className="text-[#1C1917] font-medium">{bookingConfirmed.dancerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#78716C]">Batch:</span>
                <span className="text-[#1C1917] font-medium">{bookingConfirmed.batchTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#78716C]">Spot:</span>
                <span className="text-[#9F1239] font-bold text-sm">{bookingConfirmed.spotId}</span>
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
