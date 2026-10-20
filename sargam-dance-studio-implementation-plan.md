# 💃 Sargam Dance Studio — "Move. Vibe. Repeat." Website Implementation Plan

> **Stack:** MongoDB · Express · React · Node.js (MERN)
> **Vibe:** Funky, loud, musical, alive. The site should feel like walking into the studio when the speakers are on.

---

## 0. ⚠️ Studio details: read this first

The Google share link could not be opened automatically (the page blocks automated access), and a web search returned several different studios named "Sargam", so I did not want to guess. This plan is built so that **every studio-specific fact lives in one config file** (`studio.config.json`) and in the database. Fill in the placeholders below from your Google listing and the whole site updates.

| Field | Your value (fill in) |
|---|---|
| Studio name | Sargam Dance Studio |
| Tagline | _e.g. "Where every beat finds its dancer"_ |
| Address / map pin | `TODO` |
| Phone / WhatsApp | `TODO` |
| Instructor(s) + bio | `TODO` |
| Dance styles offered | `TODO` (Bollywood, Hip-hop, Classical, Contemporary, Zumba, Freestyle, Kids, etc.) |
| Batch timings | `TODO` |
| Fees / packages | `TODO` |
| Google rating + review count | `TODO` |
| Instagram / YouTube links | `TODO` |

**To finish extraction:** paste the description text from the Google listing into chat and I'll fold the real content into this plan and the seed data.

---

## 1. Product Vision

A website that does five jobs:

1. **Hooks** visitors in 3 seconds with motion, color and music.
2. **Converts** them into trial-class bookings and enrolments.
3. **Runs the studio**: batches, attendance, fees, workshops, all in one admin panel.
4. **Builds community** through leaderboards, showcases and student profiles.
5. **Works on a phone first**, because 90% of your visitors will arrive from Instagram or WhatsApp.

---

## 2. Brand & Visual Identity

### 2.1 Personality
Loud but friendly. Think *Bollywood poster × street graffiti × Spotify Wrapped*.

### 2.2 Color System ("Neon Mehfil")

| Token | Hex | Use |
|---|---|---|
| `--bg-ink` | `#0D0B1E` | Main dark background |
| `--hot-pink` | `#FF2E93` | Primary CTA, highlights |
| `--electric-violet` | `#7B2FFF` | Gradients, hover |
| `--saffron` | `#FFB000` | Accents, badges (Indian warmth) |
| `--mint-pop` | `#00F5D4` | Success, "live now" |
| `--paper` | `#FFF8EE` | Light sections for contrast |

Gradients: `pink → violet`, `saffron → pink`. Use a subtle grain overlay on dark sections for a poster feel.

### 2.3 Typography

- **Display:** `Bungee`, `Rubik Mono One` or `Monoton` for huge headlines
- **Fun accent:** `Caveat Brush` or `Permanent Marker` for hand-drawn labels
- **Body:** `Poppins` or `DM Sans`
- **Devanagari accent (optional):** `Mukta` or `Teko`, to show "सरगम" in the logo lockup

### 2.4 Logo idea
Wordmark where the **"S" is a dancing figure** and sargam notes (**सा रे ग म प ध नि**) orbit the logo. Animated version for the loader.

### 2.5 Motion principles
- Everything moves **on the beat**: animations use a shared BPM clock (see feature F1).
- Easing: springy and overshooting (`cubic-bezier(.34,1.56,.64,1)`).
- Respect `prefers-reduced-motion`: replace with fades.

---

## 3. Sitemap & Page Concepts

```
/                    Home (the "stage")
/styles              Dance styles explorer
/styles/:slug        Single style page
/schedule            Live timetable + booking
/workshops           Upcoming workshops & events
/workshops/:id       Workshop detail + ticket
/instructors         Meet the crew
/gallery             Reels & photo wall
/community           Leaderboard, showcases, student wall
/pricing             Packages & calculator
/trial               Book a free/trial class
/blog                Tips, choreography breakdowns
/contact             Map, WhatsApp, enquiry
/login /signup       Student auth
/dashboard           Student dashboard
/admin/*             Studio admin panel
```

### 3.1 Home page: section by section

1. **Hero ("The Stage")**
   - Full-screen video loop (or canvas) of dancers; giant headline: *"SARGAM. Find your rhythm."*
   - **Sound toggle** (muted by default) that plays a short beat; the headline letters pulse to it.
   - Two CTAs: `Book a Trial` (pink), `See the Schedule` (outline).
2. **Marquee ticker**: infinite scrolling strip: `BOLLYWOOD • HIP-HOP • CONTEMPORARY • ZUMBA • KIDS • WORKSHOPS •`
3. **"Pick Your Vibe" quiz teaser** (feature F2).
4. **Styles carousel**: cards that tilt in 3D with cursor; hover plays a 3-second clip.
5. **Next-up strip**: "Next class starts in 02:14:33" with a live countdown and spots left.
6. **Instructor spotlight** with a parallax portrait and a signature move GIF.
7. **Transformation wall**: before/after "Week 1 vs Week 12" video sliders.
8. **Reviews**: Google rating displayed as a vinyl record that spins; reviews as sticky notes.
9. **Workshop banner**: a bold poster-style card for the next workshop, with a countdown.
10. **Footer**: giant "LET'S DANCE" text, social links, map, WhatsApp button.

---

## 4. 🔥 Unique Features (the "crazy" part)

### F1. Beat-Synced Website ("The Site Has a Pulse")
A global `BeatProvider` (React context) runs a BPM clock (default 100 BPM). Components subscribe and animate on the beat: buttons pulse, marquee nudges, background blobs breathe. A BPM slider in a floating "DJ deck" lets visitors change the whole site's tempo.
- **Tech:** Web Audio API + `requestAnimationFrame`, CSS variable `--beat` updated per tick.

### F2. "Find Your Dance Style" Vibe Quiz
Six playful questions (music taste, energy level, social vs solo, flexibility, goals). Result: a shareable **dance personality card** ("You are 70% Hip-hop, 30% Bollywood 🔥") with a recommended batch and a **"Book this batch"** button.
- Result cards generate as images (server-side with `satori` or `canvas`) for Instagram sharing, which gives free marketing.

### F3. Move-Along Mirror (Webcam Mini-Game)
Visitors can try a 30-second "follow the move" challenge using their webcam. A pose-detection model scores how closely they match an instructor's move.
- **Tech:** TensorFlow.js MoveNet or MediaPipe Pose, running 100% in the browser. No video is uploaded.
- End screen: *"You scored 78. Come learn the rest."* → Trial CTA.

### F4. Choreo Playground (Drag-and-Drop Routine Builder)
Students (and instructors) drag move tiles onto a timeline synced to a track, to plan or share a routine. Export as a shareable link or image.
- **Tech:** `dnd-kit`, a Mongo `routines` collection.

### F5. Live Studio Status Light 🟢
A tiny header badge showing **"Class in session: Hip-hop Batch, 3 spots left"** or **"Studio is chill, next class 6 PM"**, driven by the schedule and a Socket.io feed. It makes the studio feel alive and drives last-minute bookings.

### F6. Streaks, XP & Belts (Gamification)
Attendance earns XP. Streaks (e.g., 4 weeks in a row) unlock badges and "belts" (Groove → Flow → Fire → Star). A monthly **Top Dancer** leaderboard appears on the community page. Opt-in only, with privacy controls.

### F7. Spot Wars: Smart Batch Booking
Real-time seat map for each batch (like cinema seating, mapped to floor spots). Students pick a "spot" in the formation, front row or back row. Seat locks use a 2-minute hold via Redis (or Mongo TTL index).

### F8. Workshop "Drop" Mode
Workshops sell out fast. Drop mode shows a dramatic countdown, a waiting-room queue, and a **ticket-style PDF with a QR code** on purchase. Early-bird tiers unlock automatically by date or count.

### F9. Birthday & Event Party Builder
A configurator for **dance birthday parties / sangeet choreography**: pick the style, number of guests, duration and add-ons, then see a live price estimate and send an enquiry in one click.

### F10. Sargam Notes Mode 🎵
A playful easter egg: press keys **S R G M P D N** (or tap the sargam notes in the footer) and the site plays the swaras. Typing the sequence **Sa Re Ga Ma** triggers confetti and unlocks a discount code (random, stored in Mongo with an expiry).

### F11. Reels Wall with Auto-Playing Grid
Instagram-style vertical video grid. Hover/tap to unmute. Videos are served from Cloudinary with lazy loading and poster frames. An admin can pin/reorder.

### F12. Parent Mode (for kids' batches)
A parent dashboard: attendance, progress notes, fee reminders, performance-day checklists (costume, timings). WhatsApp reminders through the Cloud API.

### F13. Mood-Based Playlist Page
Studio-curated playlists per style with embedded Spotify/YouTube players, plus "warm-up mix" and "cool-down mix". Good for SEO and engagement.

### F14. Dark / Disco Theme Toggle
Light mode (`paper`) and **Disco mode**: mirror-ball cursor trail, color-shifting gradient background, glitter particles. Persisted in localStorage.

### F15. Custom Cursor & Micro-interactions
Cursor becomes a small dancer sprite on hover over CTAs. Buttons "bounce" on click. Page transitions are curtain wipes, like a stage curtain opening.

---

## 5. Student & Admin Functionality

### 5.1 Student dashboard
- Profile, active package, remaining classes, expiry date
- Upcoming classes + one-tap cancel/reschedule (with a rules window)
- Attendance calendar heat-map
- XP, streak, badges
- Payment history and downloadable receipts
- Saved routines (from F4)

### 5.2 Admin panel
- **Batches:** create/edit, assign instructor, capacity, recurring rules
- **Students:** CRM-style list, notes, tags, filters (new / active / lapsed)
- **Attendance:** QR scan-in or manual tick; bulk mark
- **Fees:** package assignment, pending dues, one-click reminder
- **Workshops:** create events, tiers, track sales, export attendee list
- **Leads:** enquiries from the trial form, with status (new → contacted → trial done → joined)
- **Content CMS:** gallery, reels, reviews, blog, FAQ, banners
- **Analytics:** revenue, retention, most popular style, peak hours, lead conversion
- **Broadcast:** send an announcement (email/WhatsApp) to a batch

---

## 6. Architecture

```
┌────────────┐     HTTPS      ┌──────────────┐     ┌────────────┐
│ React SPA  │ ─────────────▶ │ Express API  │ ──▶ │  MongoDB   │
│ (Vite)     │ ◀───────────── │  + Socket.io │     │  Atlas     │
└────────────┘   REST + WS    └──────┬───────┘     └────────────┘
                                     │
        ┌────────────────────────────┼──────────────────────────┐
        ▼                ▼           ▼              ▼           ▼
   Cloudinary        Razorpay     Email        WhatsApp     Redis (optional)
   (media)         (payments)  (Resend/SES)   Cloud API   (seat locks, cache)
```

### 6.1 Frontend (React)
| Concern | Choice |
|---|---|
| Build tool | Vite |
| Routing | React Router v6 |
| Server state | TanStack Query |
| UI state | Zustand |
| Styling | Tailwind CSS + CSS variables for the theme |
| Animation | Framer Motion (UI), GSAP + ScrollTrigger (hero/scroll), Lottie (icons) |
| 3D (optional) | `@react-three/fiber` for a mirror-ball hero |
| Forms | React Hook Form + Zod |
| Drag & drop | dnd-kit |
| Pose detection | MediaPipe / TF.js |
| Audio | Howler.js + Web Audio API |
| Charts (admin) | Recharts |
| SEO | `react-helmet-async` (or move marketing pages to Next.js later) |

### 6.2 Backend (Node + Express)
| Concern | Choice |
|---|---|
| Framework | Express + TypeScript |
| ODM | Mongoose |
| Auth | JWT (access + refresh in httpOnly cookies), bcrypt, optional Google login |
| Validation | Zod |
| Realtime | Socket.io |
| Jobs | `node-cron` or BullMQ (reminders, expiry checks) |
| File uploads | Multer → Cloudinary |
| Payments | Razorpay (UPI, cards) with webhook verification |
| Security | Helmet, rate-limit, mongo-sanitize, CORS allow-list |
| Logging | Pino |
| Testing | Vitest/Jest + Supertest |

### 6.3 Hosting suggestion
- Frontend: Vercel or Netlify
- API: Render / Railway / a small VPS
- DB: MongoDB Atlas (free tier to start)
- Media: Cloudinary
- Domain + SSL: Cloudflare

---

## 7. Data Model (Mongoose collections)

```js
User        { name, email, phone, passwordHash, role: 'student'|'parent'|'instructor'|'admin',
              avatar, xp, streak, badges[], parentOf[] , createdAt }

DanceStyle  { slug, name, tagline, description, level[], heroVideo, color, tags[] }

Instructor  { user?, name, bio, styles[], photo, signatureMoveGif, social{} }

Batch       { style, instructor, title, level, ageGroup, days[], startTime, endTime,
              capacity, spotsMap[], price, startDate, endDate, isActive }

Session     { batch, date, status: 'scheduled'|'live'|'cancelled', attendees[] }   // one per class occurrence

Booking     { user, batch, session?, spot, status, paymentRef, createdAt }

Package     { name, classes, validityDays, price, styles[], isTrial }

Enrollment  { user, package, classesLeft, expiresAt, status }

Payment     { user, amount, currency, provider, providerOrderId, status, receiptUrl }

Workshop    { title, slug, description, guestArtist, date, venue, tiers[{name, price, limit, sold, opensAt}],
              poster, status }

Ticket      { workshop, user, tier, qrCode, checkedIn, paymentRef }

Lead        { name, phone, source, interestedStyle, message, status, notes[] }

Review      { name, rating, text, source: 'google'|'manual', featured }

Routine     { owner, title, track, bpm, moves[{moveId, start, end}], isPublic }

Move        { name, style, thumbnail, durationSec }

Media       { type: 'photo'|'reel', url, poster, caption, style, pinned, order }

Announcement{ audience, message, channel, sentAt }

Coupon      { code, type, value, expiresAt, usageLimit, usedBy[] }
```

**Indexes:** `Batch(days, startTime)`, `Session(date)`, `Booking(user, session)` unique, `Ticket(qrCode)` unique, TTL index on temporary seat holds.

---

## 8. API Outline

```
Auth        POST /auth/register | /auth/login | /auth/refresh | /auth/logout
Public      GET  /styles | /styles/:slug | /batches | /schedule?week= | /instructors
            GET  /workshops | /workshops/:slug | /reviews | /media | /packages
            POST /leads  (trial / contact form)
            POST /quiz/result  (returns style recommendation + card image)
Student     GET  /me | PATCH /me | GET /me/bookings | /me/xp
            POST /bookings | DELETE /bookings/:id
            POST /seats/hold   (2-min hold)
            POST /payments/order | POST /payments/webhook
            CRUD /routines
Workshops   POST /workshops/:id/tickets | GET /tickets/:id/pdf
Admin       CRUD /admin/{batches,styles,instructors,packages,workshops,media,reviews,coupons}
            GET  /admin/leads | PATCH /admin/leads/:id
            POST /admin/attendance/scan | /admin/attendance/bulk
            GET  /admin/analytics/{revenue,retention,popular-styles,peak-hours}
            POST /admin/broadcast
Realtime    WS events: studio:status, batch:spots, workshop:sold, leaderboard:update
```

---

## 9. Frontend Folder Structure

```
client/
 ├─ src/
 │   ├─ app/            (router, providers: Beat, Theme, Query, Auth)
 │   ├─ components/
 │   │    ├─ ui/        (Button, Card, Modal, Marquee, Badge, Toast)
 │   │    ├─ fx/        (Confetti, MirrorBall, Cursor, GrainOverlay, CurtainTransition)
 │   │    └─ features/  (VibeQuiz, MoveMirror, SpotPicker, ChoreoBuilder, StatusLight)
 │   ├─ pages/
 │   ├─ hooks/          (useBeat, useCountdown, useSocket, useSound)
 │   ├─ lib/            (api client, zod schemas, constants)
 │   ├─ styles/         (tokens.css, globals.css)
 │   └─ assets/         (lottie, sounds, fonts)
server/
 ├─ src/
 │   ├─ config/  models/  routes/  controllers/  services/  middlewares/
 │   ├─ jobs/    (reminders, expiry, streak calc)
 │   ├─ sockets/
 │   └─ utils/   (pdf, qr, image-card generator)
```

---

## 10. Performance, SEO & Accessibility

**Performance (important, since this site is video-heavy)**
- Hero video ≤ 2 MB (WebM + MP4), with a poster image and `preload="metadata"`.
- Lazy-load reels and the pose-detection model (only when the user opens F3).
- Route-level code splitting; image CDN with AVIF/WebP and responsive `srcset`.
- Target Lighthouse mobile ≥ 85.

**SEO**
- Pre-render marketing pages (Vite SSG plugin or consider Next.js for the public site).
- Local SEO: `LocalBusiness` + `Course` + `Event` JSON-LD, Google Business Profile link, embedded map, "dance classes near me" landing copy for your locality.
- Clean URLs per style (`/styles/hip-hop`) and per workshop.

**Accessibility**
- Contrast-check neon colors on dark backgrounds (AA minimum).
- Sound never autoplays; motion respects reduced-motion; all videos have captions or are decorative with `aria-hidden`.
- Keyboard-navigable seat picker and quiz.

---

## 11. Security & Privacy
- Webcam feature processes locally; show a clear consent prompt.
- Children's data: collect the minimum; parent-controlled accounts for under-18s.
- Verify Razorpay signatures server-side; never trust client amounts.
- Rate-limit lead forms, add a honeypot field and optional hCaptcha.
- Regular Mongo backups; admin actions audit-logged.

---

## 12. Phased Roadmap

### Phase 1: MVP "Soundcheck" (Weeks 1–3)
- Design tokens, layout, Home, Styles, Instructors, Gallery, Contact
- Trial booking form → Leads (email + WhatsApp link notification)
- Static schedule from DB, Google reviews section
- Admin: login, leads, batches, media
- Deploy + domain + analytics

### Phase 2: "Rehearsal" (Weeks 4–6)
- Student auth, dashboard, packages, Razorpay payments
- Batch booking with spot picker (F7), live status light (F5)
- Workshops + ticketing with QR (F8)
- Vibe quiz with shareable card (F2)

### Phase 3: "Showtime" (Weeks 7–9)
- Beat-synced site (F1), Disco mode (F14), Sargam notes easter egg (F10)
- Gamification (F6), reminders via cron + WhatsApp
- Admin analytics, attendance QR scanning

### Phase 4: "Encore" (Weeks 10+)
- Move-Along Mirror (F3), Choreo Playground (F4)
- Parent mode (F12), party builder (F9), playlists (F13)
- PWA install, push notifications, referral program

---

## 13. Growth & Marketing Hooks Built In
- Shareable quiz cards and leaderboard badges → Instagram stories
- Referral codes ("Bring a friend, both get 1 free class")
- Every style page ends with an inline trial CTA
- Post-class auto message asking for a Google review (deep link)
- Blog/reels embedded for SEO and social proof

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Heavy visuals slow phones | Tiered effects: disable particles/3D on low-end devices (`navigator.hardwareConcurrency`, `deviceMemory`) |
| Scope creep from too many features | Strict phase gates; ship Phase 1 first |
| Seat double-booking | Atomic Mongo updates + unique index + hold TTL |
| Payment edge cases | Webhook-driven confirmation; idempotency keys |
| Webcam privacy concerns | Local-only processing, explicit opt-in, skippable |

---

## 15. Immediate Next Steps
1. Fill in the **Section 0** table (or paste the Google listing text into chat).
2. Collect assets: logo, 10–15 photos, 5–8 short dance clips (vertical, 5–10 s), instructor bio.
3. Decide the first three features to build (my pick: **F2 Vibe Quiz, F5 Status Light, F7 Spot Picker**).
4. Scaffold the repo (`client/` + `server/`), set up Atlas, Cloudinary, Razorpay test keys.
5. Build Phase 1 and demo it.

---

*Want me to go further? I can generate the project scaffold, the Mongoose models, a Tailwind theme with these tokens, or a full coded Home page with the beat-synced hero.*
