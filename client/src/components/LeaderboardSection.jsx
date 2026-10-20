import React from 'react';
import { Trophy, Flame } from 'lucide-react';

export default function LeaderboardSection({ leaderboard = [] }) {
  return (
    <section id="community" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          ATTENDANCE & MILESTONES
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
          Student Leaderboard & Belts
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Consistent attendance unlocks community belts: Groove, Flow, Fire, and Star.
        </p>
      </div>

      {/* Belts Explanation Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
        {[
          { belt: 'Groove 🎵', desc: '1-4 Weeks Streak' },
          { belt: 'Flow 🌊', desc: '5-8 Weeks Streak' },
          { belt: 'Fire 🔥', desc: '9-12 Weeks Streak' },
          { belt: 'Star 🌟', desc: '13+ Weeks Milestone' }
        ].map((b, i) => (
          <div key={i} className="p-3.5 rounded-xl bg-[#13111C] border border-white/10 text-center">
            <span className="font-display font-semibold text-sm text-white block">{b.belt}</span>
            <span className="text-[10px] text-slate-400 font-mono">{b.desc}</span>
          </div>
        ))}
      </div>

      {/* Top Dancers Table */}
      <div className="max-w-4xl mx-auto rounded-2xl bg-[#13111C] border border-white/10 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-display font-bold text-sm text-white tracking-wide uppercase">
              Monthly Top Dancers (Jaipur)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">UPDATED WEEKLY</span>
        </div>

        <div className="divide-y divide-white/5">
          {leaderboard.map((dancer) => (
            <div
              key={dancer.rank}
              className={`p-4 sm:px-6 flex items-center justify-between transition-colors ${
                dancer.rank === 1 ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`w-6 text-center font-display font-bold text-sm ${
                  dancer.rank === 1 ? 'text-amber-400 text-base' : dancer.rank === 2 ? 'text-slate-300' : dancer.rank === 3 ? 'text-amber-600' : 'text-slate-500'
                }`}>
                  #{dancer.rank}
                </span>

                <span className="text-xl p-1.5 rounded-lg bg-black/40 border border-white/5">
                  {dancer.avatar}
                </span>

                <div>
                  <h5 className="font-semibold text-sm text-white flex items-center gap-2">
                    {dancer.name}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                      {dancer.belt}
                    </span>
                  </h5>
                  <p className="text-[11px] text-slate-400">
                    Styles: {dancer.styles.join(', ')}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="font-display font-bold text-sm text-white block">
                  {dancer.xp.toLocaleString()} <span className="text-[10px] font-mono text-slate-400">XP</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-medium flex items-center justify-end gap-1">
                  <Flame className="w-3 h-3 text-rose-400 fill-rose-400" /> {dancer.streakWeeks}w Streak
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
