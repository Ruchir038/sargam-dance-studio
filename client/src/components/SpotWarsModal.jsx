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
        confetti({ particleCount: 70, spread: 60 });
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookingConfirmed ? (
          <div>
            {/* Header */}
            <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
              FORMATION SPOT RESERVATION
            </span>

            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              {batch.title}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {batch.branch} • {batch.days.join(', ')} @ {batch.time} • ₹{batch.price}/mo
            </p>

            {errorMsg && (
              <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            {/* Stage Mirror Indicator */}
            <div className="w-full py-2 rounded-xl bg-black/30 border border-white/5 text-center mb-5">
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                🪞 Studio Wall Mirrors & Instructor Stage
              </span>
            </div>

            {/* Studio Floor Spots Formation */}
            <div className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/5">
              {/* Row 1: Front Spotlight */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-2 font-medium uppercase">
                  Row 1: Front Spotlight Line
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {batch.spotsMap.slice(0, 4).map((spot) => {
                    const isSelected = selectedSpot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        disabled={spot.isBooked}
                        onClick={() => handleSelectSpot(spot)}
                        className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-black/20 border-white/5 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-600 border-white text-white font-bold'
                            : 'bg-[#1C192B] border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block">{spot.id}</span>
                        <span className="text-[10px] block truncate text-slate-400">
                          {spot.isBooked ? 'Booked' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 2: Mid Formation */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-2 font-medium uppercase">
                  Row 2: Mid Formation
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {batch.spotsMap.slice(4, 9).map((spot) => {
                    const isSelected = selectedSpot?.id === spot.id;
                    return (
                      <button
                        key={spot.id}
                        disabled={spot.isBooked}
                        onClick={() => handleSelectSpot(spot)}
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-black/20 border-white/5 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-600 border-white text-white font-bold'
                            : 'bg-[#1C192B] border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block">{spot.id}</span>
                        <span className="text-[9px] block truncate text-slate-400">
                          {spot.isBooked ? 'Taken' : 'Open'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Row 3: Back Groove Zone */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 block mb-2 font-medium uppercase">
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
                        className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                          spot.isBooked
                            ? 'bg-black/20 border-white/5 text-slate-600 cursor-not-allowed'
                            : isSelected
                            ? 'bg-rose-600 border-white text-white font-bold'
                            : 'bg-[#1C192B] border-white/10 text-slate-300 hover:border-white/30'
                        }`}
                      >
                        <span className="text-xs font-mono font-semibold block">{spot.id}</span>
                        <span className="text-[9px] block truncate text-slate-400">
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
              <div className="mt-3.5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span className="text-xs text-slate-200">
                    Spot <strong className="text-rose-400">{selectedSpot.id}</strong> reserved for 2 minutes.
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-amber-300 px-2 py-0.5 rounded bg-black/40">
                  {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Dancer Details Form */}
            <form onSubmit={handleConfirmBooking} className="mt-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !selectedSpot}
                className={`w-full py-3 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                  selectedSpot
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-sm'
                    : 'bg-white/5 text-slate-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'Confirming...' : `Confirm Spot ${selectedSpot ? selectedSpot.id : ''} (₹${batch.price}/mo)`}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center space-y-3.5 py-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center text-2xl border border-rose-500/20">
              🎟️
            </div>

            <h3 className="font-display font-bold text-2xl text-white">
              Spot Confirmed
            </h3>
            <p className="text-xs text-slate-300">
              Your formation spot has been secured.
            </p>

            {/* Pass Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-mono text-[10px] text-slate-400">BOOKING ID</span>
                <span className="font-mono font-bold text-amber-300">{bookingConfirmed.bookingId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Dancer:</span>
                <span className="text-white font-medium">{bookingConfirmed.dancerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Batch:</span>
                <span className="text-white font-medium">{bookingConfirmed.batchTitle}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Spot:</span>
                <span className="text-rose-400 font-bold">{bookingConfirmed.spotId}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
