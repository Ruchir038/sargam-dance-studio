import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StylesSection from './components/StylesSection';
import ScheduleSection from './components/ScheduleSection';
import WorkshopsSection from './components/WorkshopsSection';
import InstructorsSection from './components/InstructorsSection';
import TransformationWall from './components/TransformationWall';
import ReviewsSection from './components/ReviewsSection';
import ReelsWall from './components/ReelsWall';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';

// Modals
import VibeQuizModal from './components/VibeQuizModal';
import MoveMirrorModal from './components/MoveMirrorModal';
import SpotWarsModal from './components/SpotWarsModal';
import ChoreoPlaygroundModal from './components/ChoreoPlaygroundModal';
import PartyBuilderModal from './components/PartyBuilderModal';
import WorkshopDropModal from './components/WorkshopDropModal';
import TrialBookingModal from './components/TrialBookingModal';
import ParentModeModal from './components/ParentModeModal';
import AdminPanelModal from './components/AdminPanelModal';
import EasterEggModal from './components/EasterEggModal';

export default function App() {
  // Data States
  const [styles, setStyles] = useState([]);
  const [batches, setBatches] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [packages, setPackages] = useState([]);
  const [reels, setReels] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isMirrorOpen, setIsMirrorOpen] = useState(false);
  const [isChoreoOpen, setIsChoreoOpen] = useState(false);
  const [isPartyBuilderOpen, setIsPartyBuilderOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);
  const [isParentModeOpen, setIsParentModeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [selectedBatchForSpots, setSelectedBatchForSpots] = useState(null);
  const [selectedWorkshopForDrop, setSelectedWorkshopForDrop] = useState(null);
  const [trialDefaultStyle, setTrialDefaultStyle] = useState('');

  // Fetch all initial data from backend API
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          resStyles,
          resBatches,
          resWorkshops,
          resInstructors,
          resReviews,
          resPackages,
          resReels,
          resPlaylists
        ] = await Promise.all([
          fetch('/api/styles').then(r => r.json()),
          fetch('/api/batches').then(r => r.json()),
          fetch('/api/workshops').then(r => r.json()),
          fetch('/api/instructors').then(r => r.json()),
          fetch('/api/reviews').then(r => r.json()),
          fetch('/api/packages').then(r => r.json()),
          fetch('/api/reels').then(r => r.json()),
          fetch('/api/playlists').then(r => r.json())
        ]);

        if (resStyles.success) setStyles(resStyles.data);
        if (resBatches.success) setBatches(resBatches.data);
        if (resWorkshops.success) setWorkshops(resWorkshops.data);
        if (resInstructors.success) setInstructors(resInstructors.data);
        if (resReviews.success) setReviews(resReviews.data);
        if (resPackages.success) setPackages(resPackages.data);
        if (resReels.success) setReels(resReels.data);
        if (resPlaylists.success) setPlaylists(resPlaylists.data);
      } catch (err) {
        console.error('Error fetching studio data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleOpenTrial = (styleName = '') => {
    setTrialDefaultStyle(styleName || 'Bollywood Commercial & Masala');
    setIsTrialOpen(true);
  };

  const handleOpenSpotWars = (batch) => {
    setSelectedBatchForSpots(batch);
  };

  const handleOpenWorkshopDrop = (ws) => {
    setSelectedWorkshopForDrop(ws);
  };

  const handleClaimDiscount = (code) => {
    setTrialDefaultStyle(`Promo ${code} applied`);
    setIsTrialOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0C0A14] text-slate-100 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar
        onOpenTrial={() => handleOpenTrial()}
        onOpenPartyBuilder={() => setIsPartyBuilderOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection
          onOpenTrial={() => handleOpenTrial()}
          onOpenQuiz={() => setIsQuizOpen(true)}
          onOpenMirror={() => setIsMirrorOpen(true)}
          onOpenChoreo={() => setIsChoreoOpen(true)}
          onOpenPartyBuilder={() => setIsPartyBuilderOpen(true)}
        />

        {/* Styles Explorer */}
        <StylesSection
          styles={styles}
          onSelectStyle={(s) => {
            const matchBatch = batches.find(b => b.styleSlug === s.slug) || batches[0];
            handleOpenSpotWars(matchBatch);
          }}
          onTrialForStyle={(s) => handleOpenTrial(s.name)}
        />

        {/* Schedule & Spot Wars */}
        <ScheduleSection
          batches={batches}
          onSelectBatchSpot={handleOpenSpotWars}
        />

        {/* Workshops Drop Mode */}
        <WorkshopsSection
          workshops={workshops}
          onSelectWorkshop={handleOpenWorkshopDrop}
        />

        {/* Instructors Crew */}
        <InstructorsSection instructors={instructors} />

        {/* Transformation Wall (Week 1 vs Week 12) */}
        <TransformationWall />

        {/* Spinning Vinyl Google Reviews */}
        <ReviewsSection reviews={reviews} />

        {/* Reels Wall & Playlists */}
        <ReelsWall reels={reels} playlists={playlists} />

        {/* Pricing Packages */}
        <PricingSection
          packages={packages}
          onSelectPackage={(pkg) => {
            if (pkg.id === 'pkg-trial') {
              handleOpenTrial();
            } else if (pkg.id === 'pkg-sangeet') {
              setIsPartyBuilderOpen(true);
            } else {
              handleOpenSpotWars(batches[0]);
            }
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenParentMode={() => setIsParentModeOpen(true)}
        onOpenTrial={() => handleOpenTrial()}
      />

      {/* Modals & Overlays */}
      <VibeQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectBatch={(batchSlug) => {
          const match = batches.find(b => b.styleSlug === batchSlug) || batches[0];
          handleOpenSpotWars(match);
        }}
      />

      <MoveMirrorModal
        isOpen={isMirrorOpen}
        onClose={() => setIsMirrorOpen(false)}
        onClaimTrial={() => handleOpenTrial()}
      />

      <SpotWarsModal
        isOpen={!!selectedBatchForSpots}
        batch={selectedBatchForSpots}
        onClose={() => setSelectedBatchForSpots(null)}
        onBookingSuccess={() => {}}
      />

      <ChoreoPlaygroundModal
        isOpen={isChoreoOpen}
        onClose={() => setIsChoreoOpen(false)}
      />

      <PartyBuilderModal
        isOpen={isPartyBuilderOpen}
        onClose={() => setIsPartyBuilderOpen(false)}
      />

      <WorkshopDropModal
        isOpen={!!selectedWorkshopForDrop}
        workshop={selectedWorkshopForDrop}
        onClose={() => setSelectedWorkshopForDrop(null)}
      />

      <TrialBookingModal
        isOpen={isTrialOpen}
        defaultStyle={trialDefaultStyle}
        onClose={() => setIsTrialOpen(false)}
      />

      <ParentModeModal
        isOpen={isParentModeOpen}
        onClose={() => setIsParentModeOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <EasterEggModal onClaimDiscount={handleClaimDiscount} />
    </div>
  );
}
