import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  User,
  MessageSquare,
  Send,
  MapPin,
  Calendar,
  Building2,
  Image as ImageIcon,
  ShieldAlert,
} from 'lucide-react';

export const ComplaintTrackingPage: React.FC = () => {
  const { complaints, addComplaintComment } = useApp();
  const [selectedId, setSelectedId] = useState<string>(complaints[0]?.id || '');
  const [searchRef, setSearchRef] = useState('');
  const [commentText, setCommentText] = useState('');

  const activeComplaint = complaints.find(
    (c) => c.id === selectedId || c.referenceNo.toLowerCase() === searchRef.trim().toLowerCase()
  ) || complaints[0];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !activeComplaint) return;

    addComplaintComment(activeComplaint.id, commentText);
    setCommentText('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Complaint Status Tracking
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor real-time progress, inspector notes, and field activity logs for your grievances.
        </p>
      </div>

      {/* Ticket Search Bar & Direct Quick Pick Tabs */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchRef}
            onChange={(e) => setSearchRef(e.target.value)}
            placeholder="Search by Reference No. (e.g. #CV-8932)..."
            className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
          />
        </div>

        {/* Complaint Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {complaints.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                activeComplaint?.id === c.id
                  ? 'bg-[#003d9b] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200'
              }`}
            >
              {c.referenceNo} • {c.category}
            </button>
          ))}
        </div>
      </div>

      {activeComplaint ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Details & Timeline */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Header Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-4">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div>
                  <span className="text-xs font-extrabold text-[#003d9b] dark:text-blue-400 uppercase tracking-wider">
                    TICKET {activeComplaint.referenceNo}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {activeComplaint.category}
                  </h2>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold ${
                    activeComplaint.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : activeComplaint.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-slate-700 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {activeComplaint.status}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeComplaint.description}
              </p>

              {/* Meta information tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100 dark:border-slate-700 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Building2 size={16} className="text-[#003d9b]" />
                  <span>{activeComplaint.department}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={16} className="text-[#003d9b]" />
                  <span className="truncate">{activeComplaint.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Calendar size={16} className="text-[#003d9b]" />
                  <span>Submitted: {activeComplaint.submittedAt}</span>
                </div>
              </div>
            </div>

            {/* Attached Photo Evidence */}
            {activeComplaint.photoUrl && (
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                  <ImageIcon size={18} className="text-[#003d9b]" /> Attached Photo Evidence
                </h3>
                <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img
                    src={activeComplaint.photoUrl}
                    alt="Evidence"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Interactive Vertical Timeline */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base mb-6 flex items-center gap-2">
                <Clock size={20} className="text-[#003d9b]" /> Field Activity Log & Timeline
              </h3>

              <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-6">
                {activeComplaint.activityLog.map((act, i) => (
                  <div key={i} className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#003d9b] ring-4 ring-white dark:ring-slate-800" />
                    <div>
                      <div className="flex justify-between items-center">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          {act.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-slate-400">{act.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {act.description}
                      </p>
                      <span className="text-[10px] text-blue-600 font-medium mt-1 block">
                        By {act.actor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Officer & Citizen Comments Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col h-full justify-between">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-[#003d9b]" /> Case Comments
                </h3>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {activeComplaint.comments.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No comments posted yet.</p>
                  ) : (
                    activeComplaint.comments.map((cm) => (
                      <div key={cm.id} className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-800 dark:text-slate-200">{cm.author}</span>
                          <span className="text-[10px] text-slate-400">{cm.timestamp}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#003d9b] block">{cm.role}</span>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                          {cm.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Post Comment Form */}
              <form onSubmit={handlePostComment} className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
                <textarea
                  rows={2}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment or inquiry for the inspector..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-[#003d9b]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <Send size={14} /> Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-slate-500">No complaint ticket found.</p>
      )}
    </main>
  );
};
