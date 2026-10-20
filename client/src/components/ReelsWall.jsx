import React, { useState } from 'react';
import { Play, Heart, Music, Disc3, Eye } from 'lucide-react';

export default function ReelsWall({ reels = [], playlists = [] }) {
  const [activeTab, setActiveTab] = useState('reels');
  const [likedReels, setLikedReels] = useState({});

  const toggleLike = (id) => {
    setLikedReels(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
            COMMUNITY & MEDIA
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            Studio Reels & Playlists
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Catch choreography snippets, cypher moments, and studio playlists.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('reels')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'reels'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Studio Reels
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'playlists'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Playlists
          </button>
        </div>
      </div>

      {/* Reels Grid */}
      {activeTab === 'reels' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reels.map((reel) => {
            const isLiked = likedReels[reel.id];
            return (
              <div
                key={reel.id}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-slate-900 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Background Image */}
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between">
                  {/* Top: Style badge & views */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                      {reel.style}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-white/80 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      <Eye className="w-3 h-3" /> {reel.views}
                    </span>
                  </div>

                  {/* Center Play Button on hover */}
                  <div className="w-11 h-11 mx-auto rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 cursor-pointer">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>

                  {/* Bottom: Info & Like button */}
                  <div>
                    <h5 className="font-semibold text-sm text-white line-clamp-1">{reel.title}</h5>
                    <p className="text-xs text-amber-300/90 mt-0.5">By {reel.choreographer}</p>

                    <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 truncate max-w-[150px] flex items-center gap-1">
                        <Music className="w-2.5 h-2.5 text-slate-400" /> {reel.audio}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(reel.id);
                        }}
                        className="p-1 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isLiked ? 'fill-rose-500 text-rose-500' : 'text-white/80'
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
              className="p-5 rounded-2xl bg-[#13111C] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-square mb-4 bg-slate-900">
                  <img src={pl.cover} alt={pl.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90" />
                  <div className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white">
                    <Disc3 className="w-4 h-4 group-hover:animate-spin" />
                  </div>
                </div>

                <h4 className="font-semibold text-base text-white group-hover:text-rose-400 transition-colors">{pl.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5">Curated by {pl.curator} • {pl.duration}</p>

                {/* Top tracks snippet */}
                <div className="mt-3 pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Featured:</span>
                  {pl.topTracks.slice(0, 3).map((track, i) => (
                    <p key={i} className="text-xs text-slate-300 truncate">
                      {i + 1}. {track}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
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
