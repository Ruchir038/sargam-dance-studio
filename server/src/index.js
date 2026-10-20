import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  studioConfig,
  danceStyles,
  instructors,
  batches,
  workshops,
  reviews,
  packages,
  reelsMedia,
  leaderboard,
  initialLeads,
  choreoMoves,
  studioPlaylists
} from './data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(clientDistPath));

// In-memory mutable states
let leadsStore = [...initialLeads];
let batchesStore = JSON.parse(JSON.stringify(batches));
let workshopsStore = JSON.parse(JSON.stringify(workshops));
let routinesStore = [
  {
    id: 'rtn-1',
    title: 'Jaipur Street Vibe Choreo',
    bpm: 105,
    creator: 'Vikram "V-Funk"',
    moves: ['m-1', 'm-2', 'm-7', 'm-4'],
    createdAt: new Date().toISOString()
  }
];
let bookingsStore = [];
let seatHolds = new Map(); // key: `${batchId}-${spotId}`, value: { user, expiry }

// Clean up expired seat holds every 30s
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of seatHolds.entries()) {
    if (val.expiry < now) {
      seatHolds.delete(key);
    }
  }
}, 30000);

// 1. Studio Configuration & Brand Token endpoint
app.get('/api/config', (req, res) => {
  res.json({
    success: true,
    data: studioConfig
  });
});

// 2. Dance Styles
app.get('/api/styles', (req, res) => {
  res.json({ success: true, count: danceStyles.length, data: danceStyles });
});

app.get('/api/styles/:slug', (req, res) => {
  const style = danceStyles.find(s => s.slug === req.params.slug);
  if (!style) {
    return res.status(404).json({ success: false, message: 'Style not found' });
  }
  const relatedBatches = batchesStore.filter(b => b.styleSlug === style.slug);
  res.json({ success: true, data: style, relatedBatches });
});

// 3. Batches & Live Schedule
app.get('/api/batches', (req, res) => {
  res.json({ success: true, count: batchesStore.length, data: batchesStore });
});

app.get('/api/batches/:id', (req, res) => {
  const batch = batchesStore.find(b => b.id === req.params.id);
  if (!batch) {
    return res.status(404).json({ success: false, message: 'Batch not found' });
  }
  res.json({ success: true, data: batch });
});

// 4. Spot Wars: Seat Hold & Booking
app.post('/api/seats/hold', (req, res) => {
  const { batchId, spotId, userName } = req.body;
  const batch = batchesStore.find(b => b.id === batchId);
  if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });

  const spot = batch.spotsMap.find(s => s.id === spotId);
  if (!spot) return res.status(404).json({ success: false, message: 'Spot not found' });
  if (spot.isBooked) return res.status(400).json({ success: false, message: 'Spot already booked' });

  const holdKey = `${batchId}-${spotId}`;
  if (seatHolds.has(holdKey) && seatHolds.get(holdKey).expiry > Date.now()) {
    return res.status(409).json({ success: false, message: 'Spot temporarily held by another dancer' });
  }

  // Hold for 2 minutes
  const expiry = Date.now() + 2 * 60 * 1000;
  seatHolds.set(holdKey, { userName: userName || 'Guest Dancer', expiry });

  res.json({
    success: true,
    message: 'Spot held for 2 minutes! Complete booking.',
    holdExpiresAt: new Date(expiry).toISOString(),
    spotId,
    batchId
  });
});

app.post('/api/seats/book', (req, res) => {
  const { batchId, spotId, dancerName, phone, email, notes } = req.body;
  const batch = batchesStore.find(b => b.id === batchId);
  if (!batch) return res.status(404).json({ success: false, message: 'Batch not found' });

  const spot = batch.spotsMap.find(s => s.id === spotId);
  if (!spot) return res.status(404).json({ success: false, message: 'Spot not found' });
  if (spot.isBooked) return res.status(400).json({ success: false, message: 'Spot already booked' });

  // Mark spot booked
  spot.isBooked = true;
  spot.reservedFor = dancerName;
  batch.enrolledCount = Math.min(batch.capacity, batch.enrolledCount + 1);

  const bookingId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
  const booking = {
    bookingId,
    batchId,
    batchTitle: batch.title,
    spotId,
    dancerName,
    phone,
    email,
    notes,
    status: 'Confirmed',
    bookedAt: new Date().toISOString()
  };

  bookingsStore.push(booking);
  seatHolds.delete(`${batchId}-${spotId}`);

  res.json({
    success: true,
    message: `Woohoo! Your spot ${spotId} is locked for ${batch.title}!`,
    booking
  });
});

// 5. Instructors
app.get('/api/instructors', (req, res) => {
  res.json({ success: true, data: instructors });
});

// 6. Workshops & Drop Ticketing
app.get('/api/workshops', (req, res) => {
  res.json({ success: true, data: workshopsStore });
});

app.post('/api/workshops/:id/ticket', (req, res) => {
  const { id } = req.params;
  const { attendeeName, email, phone, tierName } = req.body;
  const workshop = workshopsStore.find(w => w.id === id);
  if (!workshop) return res.status(404).json({ success: false, message: 'Workshop not found' });

  const tier = workshop.tiers.find(t => t.name === tierName) || workshop.tiers[0];
  tier.sold += 1;

  const ticketId = 'SARGAM-TKT-' + Math.floor(10000 + Math.random() * 90000);
  const ticket = {
    ticketId,
    workshopId: workshop.id,
    workshopTitle: workshop.title,
    venue: workshop.venue,
    date: workshop.date,
    time: workshop.time,
    attendeeName,
    email,
    phone,
    tier: tier.name,
    pricePaid: tier.price,
    qrValue: `https://sargamdancestudio.com/verify-ticket?id=${ticketId}`,
    issuedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: `Ticket Confirmed for ${workshop.title}!`,
    ticket
  });
});

// 7. Leads (Trial form & Sangeet party builder)
app.get('/api/leads', (req, res) => {
  res.json({ success: true, count: leadsStore.length, data: leadsStore });
});

app.post('/api/leads', (req, res) => {
  const { name, phone, email, interestedStyle, branch, message, source, estimatedBudget } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }

  const newLead = {
    id: 'lead-' + (leadsStore.length + 1) + '-' + Date.now().toString().slice(-4),
    name,
    phone,
    email: email || '',
    interestedStyle: interestedStyle || 'Bollywood Commercial',
    branch: branch || 'Malviya Nagar (Main Studio)',
    message: message || '',
    source: source || 'Website Trial Form',
    estimatedBudget: estimatedBudget || null,
    status: 'New Lead',
    createdAt: new Date().toISOString()
  };

  leadsStore.unshift(newLead);
  res.json({
    success: true,
    message: 'Thanks for reaching out! Team Sargam will WhatsApp/call you within 2 hours.',
    lead: newLead
  });
});

app.patch('/api/leads/:id', (req, res) => {
  const lead = leadsStore.find(l => l.id === req.params.id);
  if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

  if (req.body.status) lead.status = req.body.status;
  if (req.body.notes) lead.notes = req.body.notes;
  res.json({ success: true, lead });
});

// 8. Reviews
app.get('/api/reviews', (req, res) => {
  res.json({
    success: true,
    rating: studioConfig.studio.googleRating,
    count: studioConfig.studio.reviewCount,
    data: reviews
  });
});

// 9. Packages
app.get('/api/packages', (req, res) => {
  res.json({ success: true, data: packages });
});

// 10. Choreo Playground Moves & Routines
app.get('/api/choreo/moves', (req, res) => {
  res.json({ success: true, data: choreoMoves });
});

app.get('/api/choreo/routines', (req, res) => {
  res.json({ success: true, data: routinesStore });
});

app.post('/api/choreo/routines', (req, res) => {
  const { title, moves, bpm, creator } = req.body;
  const newRoutine = {
    id: 'rtn-' + Date.now().toString().slice(-5),
    title: title || 'My Sargam Routine',
    bpm: bpm || 105,
    creator: creator || 'Student Choreographer',
    moves: moves || [],
    createdAt: new Date().toISOString()
  };
  routinesStore.unshift(newRoutine);
  res.json({ success: true, routine: newRoutine });
});

// 11. Media / Reels
app.get('/api/reels', (req, res) => {
  res.json({ success: true, data: reelsMedia });
});

// 12. Playlists
app.get('/api/playlists', (req, res) => {
  res.json({ success: true, data: studioPlaylists });
});

// 13. Leaderboard
app.get('/api/leaderboard', (req, res) => {
  res.json({ success: true, data: leaderboard });
});

// 14. Coupon Verification (Easter Egg & Promos)
app.post('/api/coupons/verify', (req, res) => {
  const { code } = req.body;
  const cleanCode = (code || '').trim().toUpperCase();

  if (cleanCode === 'SARGAMBEAT25' || cleanCode === 'SARGAM25') {
    return res.json({
      valid: true,
      discountPercent: 25,
      message: '🎉 25% Sargam Swara Easter Egg Discount Applied!'
    });
  }
  if (cleanCode === 'JAIPURGROOVE' || cleanCode === 'JAIPUR10') {
    return res.json({
      valid: true,
      discountPercent: 10,
      message: '✨ 10% Pink City Dancer Discount Applied!'
    });
  }
  res.status(400).json({ valid: false, message: 'Invalid or expired promo code' });
});

// 15. Live Studio Status Light (Feature F5)
app.get('/api/status', (req, res) => {
  const now = new Date();
  const currentHour = now.getHours();

  let statusText = 'Class in session: Bollywood Hookstep • 3 spots left!';
  let isLive = true;
  let currentStyle = 'Bollywood Commercial';

  if (currentHour < 6 || currentHour >= 22) {
    statusText = 'Studio resting 🌙 Next morning batch at 6:30 AM!';
    isLive = false;
  } else if (currentHour >= 7 && currentHour < 9) {
    statusText = 'Class in session: Morning Zumba Glow Sweat • Join Now!';
    currentStyle = 'Zumba';
  } else if (currentHour >= 18 && currentHour < 21) {
    statusText = '🔥 Primetime Evening Batches in Session: Bollywood & Urban Cypher!';
    currentStyle = 'Hip-Hop';
  }

  res.json({
    success: true,
    isLive,
    statusText,
    currentStyle,
    activeBatchesCount: batchesStore.length,
    studioBranch: 'Malviya Nagar Studio'
  });
});

// 16. Admin Analytics
app.get('/api/admin/analytics', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalStudentsEnrolled: 328,
      monthlyRevenue: 486500,
      activeBatches: 8,
      trialConversionRate: '74%',
      popularStyle: 'Bollywood Commercial',
      pendingLeadsCount: leadsStore.filter(l => l.status === 'New Lead').length,
      nextWorkshopSeatsLeft: 8
    }
  });
});

// 17. Admin Broadcast Simulator
app.post('/api/admin/broadcast', (req, res) => {
  const { message, batchTarget, channel } = req.body;
  res.json({
    success: true,
    sentCount: 24,
    channel: channel || 'WhatsApp',
    message: `Simulated broadcast sent to ${batchTarget}: "${message}"`
  });
});

// Fallback to React frontend index.html for SPA routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`💃 Sargam Dance Studio API running on http://localhost:${PORT}`);
  console.log(`📍 Jaipur Studio: ${studioConfig.studio.address}`);
});
