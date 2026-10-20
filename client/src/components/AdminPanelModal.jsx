import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, BarChart2 } from 'lucide-react';

export default function AdminPanelModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('analytics');
  const [analytics, setAnalytics] = useState(null);
  const [leads, setLeads] = useState([]);
  const [broadcastTarget, setBroadcastTarget] = useState('All Batches (328 Students)');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/admin/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAnalytics(data.stats);
      })
      .catch(() => {});

    fetch('/api/leads')
      .then(res => res.json())
      .then(data => {
        if (data.success) setLeads(data.data);
      })
      .catch(() => {});
  }, [isOpen]);

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch {}
  };

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastMsg) return;

    try {
      await fetch('/api/admin/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchTarget: broadcastTarget,
          message: broadcastMsg
        })
      });
      setBroadcastSent(true);
      setTimeout(() => setBroadcastSent(false), 3000);
      setBroadcastMsg('');
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#14121F] border border-white/10 p-6 sm:p-7 text-white shadow-2xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-xs font-mono text-rose-400 tracking-wider uppercase font-semibold block mb-1">
          STUDIO MANAGEMENT
        </span>

        <h3 className="font-display font-bold text-xl text-white mb-4">
          Admin Dashboard & Leads CRM
        </h3>

        {/* Tabs */}
        <div className="flex border-b border-white/5 gap-2 mb-5">
          {[
            { id: 'analytics', label: '📊 Revenue & Analytics' },
            { id: 'leads', label: `👥 Leads CRM (${leads.length})` },
            { id: 'broadcast', label: '📢 WhatsApp Announcements' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-2.5 px-3 text-xs font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'border-rose-500 text-rose-400 font-semibold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Analytics */}
        {activeTab === 'analytics' && analytics && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">MONTHLY REVENUE</span>
                <h4 className="font-display font-bold text-lg text-white mt-1">₹{analytics.monthlyRevenue.toLocaleString('en-IN')}</h4>
                <span className="text-[10px] text-emerald-400 font-medium">+18% growth</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">ACTIVE ENROLMENTS</span>
                <h4 className="font-display font-bold text-lg text-white mt-1">{analytics.totalStudentsEnrolled} Dancers</h4>
                <span className="text-[10px] text-slate-500">Across 3 branches</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">TRIAL CONVERSION</span>
                <h4 className="font-display font-bold text-lg text-white mt-1">{analytics.trialConversionRate}</h4>
                <span className="text-[10px] text-slate-500">Industry leading</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-[10px] font-mono text-slate-400 uppercase">TOP STYLE</span>
                <h4 className="font-semibold text-xs text-white mt-1.5 truncate">{analytics.popularStyle}</h4>
                <span className="text-[10px] text-slate-500">6 batches</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-400">
              Peak studio utilization is at <strong>6:30 PM – 8:30 PM</strong> at the Malviya Nagar branch near Gaurav Tower.
            </div>
          </div>
        )}

        {/* Tab 2: Leads CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {leads.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No leads found.</p>
            ) : (
              leads.map(lead => (
                <div key={lead.id} className="p-3 rounded-xl bg-black/30 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-white text-xs">{lead.name}</strong>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-slate-300 border border-white/5">
                        {lead.interestedStyle}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">📞 {lead.phone} • 📍 {lead.branch}</p>
                    {lead.message && <p className="text-slate-500 italic text-[11px] mt-0.5">"{lead.message}"</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="px-2 py-1 rounded bg-black border border-white/10 text-xs text-slate-300"
                    >
                      <option>New Lead</option>
                      <option>Contacted</option>
                      <option>Trial Scheduled</option>
                      <option>Joined / Paid</option>
                    </select>

                    <a
                      href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.name)}!%20Team%20Sargam%20Dance%20Studio%20Jaipur%20here.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                      title="WhatsApp Lead"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 3: Broadcast */}
        {activeTab === 'broadcast' && (
          <form onSubmit={handleSendBroadcast} className="space-y-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Target Audience</label>
              <select
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white"
              >
                <option>All Batches (328 Students)</option>
                <option>Bollywood Commercial Batches</option>
                <option>Desi Hip-Hop Cypher Crew</option>
                <option>Weekend Workshop Ticket Holders</option>
                <option>Trial Pass Inquiries (Unconverted)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Broadcast Message</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Reminder: Tomorrow's Bollywood class includes video routine filming! Bring your white sneakers."
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {broadcastSent && (
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Simulated announcement dispatched to {broadcastTarget}!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs tracking-wide cursor-pointer"
            >
              Send WhatsApp Broadcast
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
