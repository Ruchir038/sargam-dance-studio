# 💃 Sargam Dance Studio — "Move. Vibe. Repeat."

> **Jaipur's Loudest Dance Studio Web Application**  
> **Stack:** React 19 · Vite 8 · Tailwind CSS · Node.js · Express · Web Audio API · HTML5 Canvas  
> **Brand & Vibe:** Neon Mehfil — Funky, loud, musical, alive. Bollywood poster × street graffiti × Spotify Wrapped.

---

## 📍 Studio Details (Jaipur, Rajasthan)

Every single studio fact, branch address, contact phone number, and swara note configuration lives cleanly in **[`studio.config.json`](./studio.config.json)** and is served via `/api/config`:

- **Studio Name:** Sargam Dance Studio (सरगम डांस स्टूडियो)
- **Tagline:** *"Move. Vibe. Repeat."* | *"Where every beat finds its dancer."*
- **Main Jaipur Studio:** Plot 42, Near Gaurav Tower (GT Central), Malviya Nagar, Jaipur, Rajasthan 302017
- **Branches:**
  - **Malviya Nagar:** Near Gaurav Tower & WTP Jaipur
  - **Vaishali Nagar:** 2nd Floor, Amrapali Circle, Vaishali Nagar, Jaipur
  - **Tonk Phatak:** Above Royal Bakers, Tonk Phatak Main Road, Jaipur
- **Phone / WhatsApp:** `+91 98290 41234`
- **Google Rating:** ⭐ **4.9 / 5.0** (542+ verified local reviews)

---

## 🔥 Features Implemented (Plan Checklist)

| # | Feature | Details & Tech Implementation |
|---|---|---|
| **F1** | **Beat-Synced Website ("The Site Has a Pulse")** | Global `BeatProvider` running a BPM clock (default 105 BPM). Floating **DJ Deck** with tempo slider (70 to 140 BPM), kick & hi-hat synthesizer built with native Web Audio API, and synchronized pulse animation. |
| **F2** | **"Find Your Dance Style" Vibe Quiz** | 6-question playful quiz matching musical tastes and goals. Calculates match percentages, generates a downloadable Instagram Story personality card, and links directly to Jaipur batch bookings. |
| **F3** | **Move-Along Mirror (Webcam Mini-Game)** | In-browser dance challenge with local camera mirror (100% private, zero video uploaded). 30-second beat challenge with move prompts (Bollywood Thumka, Bhangra Bounce, Street Wave, Kathak Spin), live scoring meter, combos, and trial reward certificate. |
| **F4** | **Choreo Playground (Routine Builder)** | Interactive 8-count beat timeline! Move palette with Bollywood, Hip-Hop, Classical & Folk tiles. Real-time audio beat playback cursor and save to cloud capability. |
| **F5** | **Live Studio Status Light 🟢** | Dynamic header badge showing current session status (e.g. *"Class in session: Bollywood Beats • 3 spots left!"*) synced to real-time schedule. |
| **F6** | **Streaks, XP & Belts (Gamification)** | Attendance gamification system with Belts: *Groove 🎵* → *Flow 🌊* → *Fire 🔥* → *Star 🌟*. Displays Jaipur student rankings and streak counters. |
| **F7** | **Spot Wars (Smart Batch Booking)** | Cinema-style 3D studio floor formation map (Front Row Spotlight, Mid Formation Center, Back Groove Zone). Click to select spot, 2-minute temporary hold with live countdown, and instant digital booking pass. |
| **F8** | **Workshop "Drop" Mode & QR Pass** | Masterclasses drop ticketing with tier selection (Early Bird, VIP Front Row, Duo Pass), and instant digital ticket pass with scannable QR verification code. |
| **F9** | **Birthday & Wedding Sangeet Party Builder** | Live interactive price calculator for Royal Wedding Sangeets, Birthday Bashes, and Flash Mobs. Configurable song count, dancers, audio mashups, and one-click WhatsApp inquiry. |
| **F10** | **Sargam Notes Mode 🎵 Easter Egg** | Authentic Indian classical Swara synthesizer in the footer (**Sa, Re, Ga, Ma, Pa, Dha, Ni** / S, R, G, M, P, D, N) with pure harmonic frequencies. Typing **"Sa Re Ga Ma"** triggers confetti and unlocks the `SARGAMBEAT25` 25% discount voucher! |
| **F11** | **Reels Wall** | Instagram-style vertical video grid showcasing dance clips, choreographers, audio tags, and interactive likes. |
| **F12** | **Parent Mode (Kids Batches)** | Dedicated dashboard for Little Ustaads parents: attendance percentage (92%), teacher progress notes from Vikram Sir, and annual showcase performance checklist. |
| **F13** | **Mood-Based Dance Playlists** | Studio-curated Spotify/YouTube vibe playlists (*High Voltage Bollywood*, *Desi Street Cypher*, *Royal Sangeet*, *Morning Zumba 135 BPM*). |
| **F14** | **Disco Mode / Dark Mode Toggle** | Neon dark ink theme (`#0D0B1E`) and animated **Disco Mode** with color-shifting background and mirror-ball cursor glitter trails. |
| **F15** | **Micro-interactions & Sound Design** | Springy easing, beat-synchronized hover effects, audio click feedback, and celebratory confetti. |

---

## 🛠️ Architecture & Project Structure

```
Sargam Dance Studio/
 ├── studio.config.json       # Central studio source of truth (address, phones, styles, swaras)
 ├── run-dev.js               # Concurrently runs server & client
 ├── package.json             # Root npm configuration
 ├── server/
 │    ├── package.json
 │    └── src/
 │         ├── index.js       # Express REST APIs + static client serving
 │         └── data.js        # Seed Jaipur studio data (styles, batches, workshops, reviews)
 └── client/
      ├── index.html          # Google Fonts (Bungee, Mukta, Poppins) + SEO JSON-LD
      ├── vite.config.js      # Vite 8 + Tailwind CSS + API proxy
      └── src/
           ├── App.jsx        # Root application & modal orchestrator
           ├── main.jsx       # ThemeProvider + BeatProvider
           ├── index.css      # Neon Mehfil design tokens & beat keyframes
           ├── context/
           │    ├── BeatContext.jsx    # Global BPM clock & Swara easter egg engine
           │    └── ThemeContext.jsx   # Dark / Disco mode & cursor sparkle engine
           ├── lib/
           │    └── soundEngine.js     # Web Audio API kick, hi-hat & swaras synthesizer
           └── components/
                ├── Navbar.jsx               # Logo, live studio status light & controls
                ├── HeroSection.jsx          # Giant headline, CTAs & feature shortcuts
                ├── StylesSection.jsx        # Dance styles cards with BPM & local appeal
                ├── ScheduleSection.jsx      # Batches timetable & next-up countdown
                ├── WorkshopsSection.jsx     # Masterclass drops
                ├── InstructorsSection.jsx   # Choreographers crew bios & signature moves
                ├── TransformationWall.jsx   # Week 1 vs Week 12 comparison slider
                ├── ReviewsSection.jsx       # Spinning vinyl record with 4.9★ rating
                ├── ReelsWall.jsx            # Video reels & mood playlists
                ├── LeaderboardSection.jsx   # Top dancers leaderboard & belts
                ├── PricingSection.jsx       # Membership passes & packages
                ├── Footer.jsx               # Branch details, contact & Sargam keyboard
                ├── DJDeck.jsx               # Floating BPM tempo controller & audio waves
                ├── VibeQuizModal.jsx        # 6-question quiz & shareable card
                ├── MoveMirrorModal.jsx      # Webcam dance challenge mini-game
                ├── SpotWarsModal.jsx        # Studio formation seat picker
                ├── ChoreoPlaygroundModal.jsx# 8-count routine builder
                ├── PartyBuilderModal.jsx    # Sangeet & party price configurator
                ├── WorkshopDropModal.jsx    # QR code digital ticket pass
                ├── TrialBookingModal.jsx    # Free trial pass booking
                ├── ParentModeModal.jsx      # Kids batch progress & checklist
                ├── AdminPanelModal.jsx      # CRM leads, revenue analytics & broadcast
                └── EasterEggModal.jsx       # S-R-G-M celebratory discount voucher
```

---

## 🚀 Getting Started

### 1. Run the Full App (Server + Frontend)
```bash
# Start server (API + Client on http://localhost:5000)
npm --prefix server start
```
Visit **`http://localhost:5000`** in any browser.

### 2. Run with Vite Hot Module Reloading (Dev Mode)
```bash
# Terminal 1: Backend
npm run server

# Terminal 2: Frontend (Vite HMR on http://localhost:5173)
npm run client
```

---

## 🎨 Color Tokens ("Neon Mehfil")

- `--bg-ink`: `#0D0B1E` (Dark night stage)
- `--hot-pink`: `#FF2E93` (Primary CTA & hooks)
- `--electric-violet`: `#7B2FFF` (Gradients & depth)
- `--saffron`: `#FFB000` (Rajasthan royal warmth & badges)
- `--mint-pop`: `#00F5D4` (Live status indicator & accents)
- `--paper`: `#FFF8EE` (Contrast sections)
