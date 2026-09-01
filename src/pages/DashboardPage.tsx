import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { WeatherAqiWidget } from '../components/WeatherAqiWidget';
import { ComplaintReceiptModal } from '../components/ComplaintReceiptModal';
import { Complaint } from '../types';
import {
  Droplet,
  Truck,
  CreditCard,
  CheckCircle2,
  Megaphone,
  Trees,
  AlertOctagon,
  FileText,
  Calendar,
  MapPin,
  PhoneCall,
  Plus,
  ArrowRight,
  Star,
  Clock,
  Printer,
  MessageSquare,
  ThumbsUp,
  History,
  ShieldCheck,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    waterSchedule,
    garbageSchedule,
    bills,
    complaints,
    favoriteServices,
    toggleFavoriteService,
    recentlyUsedServices,
    submitComplaintFeedback,
    t,
  } = useApp();

  const [selectedReceiptComplaint, setSelectedReceiptComplaint] = useState<Complaint | null>(null);
  const [feedbackComplaint, setFeedbackComplaint] = useState<Complaint | null>(null);
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');

  const dueBills = bills.filter((b) => b.status === 'Due');
  const totalPendingAmount = dueBills.reduce((acc, b) => acc + b.amount, 0);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComplaint) return;
    submitComplaintFeedback(feedbackComplaint.id, rating, feedbackText);
    setFeedbackComplaint(null);
    setFeedbackText('');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Welcome Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003d9b] via-indigo-900 to-[#0052cc] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2">
            Kasba Bawada Ward Command
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm leading-relaxed mt-1">
            Kolhapur Municipal Portal active. Monitor water schedule, track waste collection vehicles, and view your grievance resolutions.
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block pointer-events-none">
          <MapPin size={180} />
        </div>
      </section>

      {/* Environmental Weather & AQI Widget */}
      <WeatherAqiWidget />

      {/* Favorite Services & Recently Used Bar */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            {t('favoriteServices')}
          </h2>
          <span className="text-xs text-slate-400">Click star to pin</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'water', label: t('waterSchedule'), path: '/water-schedule', icon: Droplet, color: 'text-blue-600 bg-blue-50' },
            { id: 'garbage', label: t('garbageSchedule'), path: '/garbage-schedule', icon: Truck, color: 'text-emerald-600 bg-emerald-50' },
            { id: 'bills', label: t('billPayment'), path: '/bill-payment', icon: CreditCard, color: 'text-indigo-600 bg-indigo-50' },
            { id: 'certificates', label: t('certificates'), path: '/certificates', icon: FileText, color: 'text-amber-600 bg-amber-50' },
          ].map((serv) => {
            const Icon = serv.icon;
            const isFav = favoriteServices.includes(serv.id);
            return (
              <div
                key={serv.id}
                className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between"
              >
                <Link to={serv.path} className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${serv.color} dark:bg-slate-800`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{serv.label}</span>
                </Link>
                <button
                  onClick={() => toggleFavoriteService(serv.id)}
                  className="p-1 text-slate-400 hover:text-amber-500 transition-colors cursor-pointer"
                >
                  <Star className={`w-4 h-4 ${isFav ? 'text-amber-500 fill-amber-500' : ''}`} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Services & Active Complaints */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Water Supply Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-[#003d9b] transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-blue-50 dark:bg-slate-700 text-[#003d9b] dark:text-blue-400 rounded-2xl">
                  <Droplet size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#6bff8f]/30 text-[#007432] text-xs font-bold">
                  On Schedule
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Water Supply Grid
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Pressure: {waterSchedule.pressureBar} BAR • Status: {waterSchedule.currentState}
                </p>
              </div>
              <Link
                to="/water-schedule"
                className="mt-4 text-xs font-semibold text-[#003d9b] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                View Water Grid <ArrowRight size={12} />
              </Link>
            </div>

            {/* Waste Collection Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-emerald-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-emerald-50 dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 rounded-2xl">
                  <Truck size={24} />
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-slate-700 text-blue-800 dark:text-blue-300 text-xs font-bold">
                  {garbageSchedule.status}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Waste Collection Truck
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {garbageSchedule.truckNumber} is {garbageSchedule.distanceKm}km away.
                </p>
              </div>
              <Link
                to="/garbage-schedule"
                className="mt-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                Track Truck Live <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Citizen Complaint Timeline & Receipt Section */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-[#003d9b]" />
                  Grievance Timeline & Service Feedback
                </h2>
                <p className="text-xs text-slate-500">Track ETA, download receipt PDFs, and rate resolved services.</p>
              </div>

              <Link
                to="/complaint-register"
                className="px-3.5 py-2 bg-[#003d9b] text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all shadow-xs"
              >
                + Lodge Complaint
              </Link>
            </div>

            <div className="space-y-3">
              {complaints.slice(0, 4).map((comp) => (
                <div
                  key={comp.id}
                  className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#003d9b] bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-md">
                        #{comp.referenceNo}
                      </span>
                      <span className="font-extrabold text-xs text-slate-900 dark:text-white">{comp.category}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          comp.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {comp.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => setSelectedReceiptComplaint(comp)}
                        className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" /> Download Receipt PDF
                      </button>

                      {comp.status === 'Resolved' && !comp.citizenRating && (
                        <button
                          onClick={() => setFeedbackComplaint(comp)}
                          className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" /> Rate Service
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300">{comp.description}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" /> Location: {comp.location}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Clock className="w-3 h-3 text-amber-500" /> ETA: {comp.estimatedResolutionHours || '24-48 Hours'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Civic Updates Feed Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Civic Updates</h2>
              <Link to="/notifications" className="text-xs font-semibold text-[#003d9b] hover:underline">
                See All
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors border-l-4 border-[#003d9b]">
                <Megaphone size={20} className="text-[#003d9b] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Kasba Bawada Pipeline Upgrade
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Main water pipe replacement near Sugar Factory Road underway.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">2 hours ago</span>
                </div>
              </div>

              <div className="flex gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-2xl transition-colors border-l-4 border-emerald-500">
                <Trees size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Swachh Kolhapur Sanitation Drive
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Special wet and dry waste segregation awareness in Kasba Bawada ward.
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Feedback Modal */}
      {feedbackComplaint && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Service Feedback • Ticket #{feedbackComplaint.referenceNo}
            </h3>
            <p className="text-xs text-slate-500">
              Your grievance for {feedbackComplaint.category} was marked resolved by assigned staff. Please share your rating.
            </p>

            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-2 rounded-xl text-lg font-bold transition-transform cursor-pointer ${
                        rating >= s ? 'text-amber-500 scale-110' : 'text-slate-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Comments / Remarks
                </label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="The pipeline was fixed promptly. Thank you KMC!"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackComplaint(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Submit Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Receipt Modal */}
      <ComplaintReceiptModal
        isOpen={!!selectedReceiptComplaint}
        onClose={() => setSelectedReceiptComplaint(null)}
        complaint={selectedReceiptComplaint || undefined}
      />
    </main>
  );
};
