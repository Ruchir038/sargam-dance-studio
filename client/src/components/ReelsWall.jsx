import React, { useState } from 'react';
import { Play, Heart, Music, Disc3, Eye } from 'lucide-react';

export default function ReelsWall({ reels = [], playlists = [] }) {
  const [activeTab, setActiveTab] = useState('reels');
  const [likedReels, setLikedReels] = useState({});

  const toggleLike = (id) => {
    setLikedReels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block mb-2">
            Social & Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1C1917] tracking-tight">
            Studio Reels & Playlists
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Recent choreography snippets, battle cyphers, and studio tracks.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-full bg-[#F5F3EF] border border-[#E7E5E0]">
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'reels'
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Studio Reels
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'playlists'
                ? 'bg-white text-[#1C1917] shadow-xs'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            Playlists
          </button>
        </div>
      </div>

      {/* Reels Grid */}
      {activeTab === 'reels' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => {
            const isLiked = likedReels[reel.id];
            return (
              <div
                key={reel.id}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-stone-900 shadow-sm"
              >
                {/* Background Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-4 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white border border-white/20">
                      {reel.style}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-white/90 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      <Eye className="w-3 h-3" /> {reel.views}
                    </span>
                  </div>

                  {/* Center Play Button on hover */}
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 cursor-pointer">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>

                  {/* Bottom */}
                  <div>
                    <h5 className="font-medium text-sm text-white line-clamp-1">{reel.title}</h5>
                    <p className="text-xs text-amber-200 mt-0.5">By {reel.choreographer}</p>

                    <div className="mt-2.5 pt-2.5 border-t border-white/15 flex items-center justify-between">
                      <span className="text-[11px] text-white/70 truncate max-w-[150px] flex items-center gap-1">
                        <Music className="w-2.5 h-2.5" /> {reel.audio}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(reel.id);
                        }}
                        className="p-1 rounded-full text-white/90 hover:text-white transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isLiked ? 'fill-rose-500 text-rose-500' : 'text-white'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Playlists Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlists.map((pl) => (
            <div
              key={pl.id}
              className="p-5 rounded-2xl bg-white border border-[#E7E5E0] hover:border-[#D6D3CD] transition-all flex flex-col justify-between group shadow-xs hover:shadow-sm"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-square mb-4 bg-stone-100">
                  <img src={pl.cover} alt={pl.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300" />
                  <div className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/60 backdrop-blur-sm text-white">
                    <Disc3 className="w-4 h-4 group-hover:animate-spin" />
                  </div>
                </div>

                <h4 className="font-display font-medium text-base text-[#1C1917] group-hover:text-[#9F1239] transition-colors">{pl.title}</h4>
                <p className="text-xs text-[#78716C] mt-1">{pl.curator} • {pl.duration}</p>

                {/* Top tracks snippet */}
                <div className="mt-4 pt-3 border-t border-[#F0EEE9] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] font-medium block">Featured:</span>
                  {pl.topTracks.slice(0, 3).map((track, i) => (
                    <p key={i} className="text-xs text-[#57534E] truncate">
                      {i + 1}. {track}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F0EEE9]">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5F3EF] text-[#57534E]">
                  {pl.vibe}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
