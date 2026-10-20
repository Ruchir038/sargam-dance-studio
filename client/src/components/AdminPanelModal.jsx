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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white border border-[#E7E5E0] p-6 sm:p-8 text-[#1C1917] shadow-xl my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6] hover:bg-[#F5F3EF] text-stone-500 hover:text-[#1C1917] transition-colors z-20 cursor-pointer border border-[#E7E5E0]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <span className="text-[11px] font-mono text-[#9F1239] tracking-wider uppercase font-semibold block mb-1">
          STUDIO MANAGEMENT
        </span>

        <h3 className="font-serif font-bold text-2xl text-[#1C1917] mb-4">
          Admin Dashboard & Leads CRM
        </h3>

        {/* Tabs */}
        <div className="flex border-b border-[#E7E5E0] gap-2 mb-5">
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
                  ? 'border-[#9F1239] text-[#9F1239] font-semibold'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
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
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-stone-500 uppercase">MONTHLY REVENUE</span>
                <h4 className="font-serif font-bold text-xl text-[#1C1917] mt-1">₹{analytics.monthlyRevenue.toLocaleString('en-IN')}</h4>
                <span className="text-[11px] text-emerald-700 font-medium">+18% growth</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-stone-500 uppercase">ACTIVE ENROLMENTS</span>
                <h4 className="font-serif font-bold text-xl text-[#1C1917] mt-1">{analytics.totalStudentsEnrolled} Dancers</h4>
                <span className="text-[11px] text-stone-500">Across 3 branches</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-stone-500 uppercase">TRIAL CONVERSION</span>
                <h4 className="font-serif font-bold text-xl text-[#1C1917] mt-1">{analytics.trialConversionRate}</h4>
                <span className="text-[11px] text-stone-500">Industry leading</span>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0]">
                <span className="text-[10px] font-mono text-stone-500 uppercase">TOP STYLE</span>
                <h4 className="font-semibold text-xs text-[#1C1917] mt-1.5 truncate">{analytics.popularStyle}</h4>
                <span className="text-[11px] text-stone-500">6 batches</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] text-xs text-stone-600">
              Peak studio utilization is at <strong>6:30 PM – 8:30 PM</strong> at the Malviya Nagar branch near Gaurav Tower.
            </div>
          </div>
        )}

        {/* Tab 2: Leads CRM */}
        {activeTab === 'leads' && (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {leads.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6">No leads found.</p>
            ) : (
              leads.map(lead => (
                <div key={lead.id} className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E7E5E0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-[#1C1917] text-xs sm:text-sm">{lead.name}</strong>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-stone-700 border border-[#E7E5E0]">
                        {lead.interestedStyle}
                      </span>
                    </div>
                    <p className="text-stone-500 text-[11px] mt-0.5">📞 {lead.phone} • 📍 {lead.branch}</p>
                    {lead.message && <p className="text-stone-600 italic text-[11px] mt-0.5">"{lead.message}"</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-stone-700 focus:outline-none"
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
                      className="p-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white"
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
          <form onSubmit={handleSendBroadcast} className="space-y-3.5">
            <div>
              <label className="text-xs font-mono text-stone-600 block mb-1">Target Audience</label>
              <select
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#9F1239]"
              >
                <option>All Batches (328 Students)</option>
                <option>Bollywood Commercial Batches</option>
                <option>Desi Hip-Hop Cypher Crew</option>
                <option>Weekend Workshop Ticket Holders</option>
                <option>Trial Pass Inquiries (Unconverted)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono text-stone-600 block mb-1">Broadcast Message</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Reminder: Tomorrow's Bollywood class includes video routine filming! Bring your white sneakers."
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#E7E5E0] text-xs text-[#1C1917] focus:outline-none focus:border-[#9F1239]"
              />
            </div>

            {broadcastSent && (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Simulated announcement dispatched to {broadcastTarget}!</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white font-medium text-xs tracking-wide cursor-pointer transition-colors"
            >
              Send WhatsApp Broadcast
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
