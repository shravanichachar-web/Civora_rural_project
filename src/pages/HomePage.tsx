import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Droplet,
  Truck,
  AlertTriangle,
  CreditCard,
  FileCheck,
  Bell,
  Search,
  ArrowRight,
  CheckCircle2,
  Recycle,
  Sparkles,
  Headphones,
  ShieldAlert,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { globalSearch, setGlobalSearch, setIsLiveChatOpen, complaints, garbageSchedule } = useApp();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate('/dashboard');
    }
  };

  const activeComplaintsCount = complaints.filter((c) => c.status !== 'Resolved').length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28">
      {/* Welcome & Search */}
      <section className="mb-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome to Civora
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1">
            Empowering your civic life with smart digital solutions.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative group max-w-3xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search for services, documents, or reports..."
            className="w-full pl-12 pr-28 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-[#003d9b] focus:border-[#003d9b] transition-all shadow-xs text-sm sm:text-base outline-none"
          />
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="submit"
              className="bg-[#003d9b] hover:bg-[#0052cc] text-white px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-xs"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* Feature Banner (Bento Style) */}
      <section className="mb-10">
        <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[3/1] shadow-lg group">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f30ac4ce78?w=1600&auto=format&fit=crop&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003d9b]/90 via-[#003d9b]/70 to-transparent flex flex-col justify-center px-6 sm:px-12 text-white">
            <span className="bg-[#6bff8f] text-[#007432] w-fit px-3 py-1 rounded-full text-xs font-extrabold mb-3 flex items-center gap-1.5 shadow-xs">
              <Sparkles size={14} /> NEW SERVICE
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold max-w-xl leading-tight">
              Smart Municipal Services at Your Fingertips
            </h2>
            <p className="text-white/90 mt-3 text-xs sm:text-sm max-w-md hidden sm:block">
              Access waste management, utility bill payments in Indian Rupees (₹), and grievance redressal in one seamless dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Action Grid */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Quick Actions</h3>
          <Link
            to="/dashboard"
            className="text-[#003d9b] dark:text-blue-400 text-xs sm:text-sm font-semibold hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Action 1: Water */}
          <Link
            to="/water-schedule"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-[#003d9b] transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-[#003d9b] group-hover:text-white text-[#003d9b] dark:text-blue-400 transition-colors">
              <Droplet size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Water Supply Schedule
            </span>
          </Link>

          {/* Action 2: Garbage */}
          <Link
            to="/garbage-schedule"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-emerald-500 transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-emerald-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white text-emerald-700 dark:text-emerald-400 transition-colors">
              <Truck size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Garbage Truck Schedule
            </span>
          </Link>

          {/* Action 3: Complaint */}
          <Link
            to="/complaint-register"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-rose-500 transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-rose-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-rose-600 group-hover:text-white text-rose-600 dark:text-rose-400 transition-colors">
              <AlertTriangle size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Register Complaint
            </span>
          </Link>

          {/* Action 4: Pay Bills */}
          <Link
            to="/bill-payment"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-indigo-500 transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-indigo-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-[#003d9b] group-hover:text-white text-[#003d9b] dark:text-indigo-400 transition-colors">
              <CreditCard size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Pay Bills (₹)
            </span>
          </Link>

          {/* Action 5: Certificates */}
          <Link
            to="/certificates"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-amber-500 transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-amber-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white text-amber-700 dark:text-amber-400 transition-colors">
              <FileCheck size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Certificates
            </span>
          </Link>

          {/* Action 6: Notifications */}
          <Link
            to="/notifications"
            className="flex flex-col items-center justify-center p-5 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl hover:shadow-md hover:border-purple-500 transition-all group active:scale-95 text-center"
          >
            <div className="w-14 h-14 bg-purple-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white text-purple-700 dark:text-purple-400 transition-colors">
              <Bell size={28} />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
              Notifications
            </span>
          </Link>
        </div>
      </section>

      {/* Highlights / Live Stats */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Active Complaints Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border-l-4 border-l-[#003d9b] border-y border-r border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Active Complaints
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-[#003d9b] dark:text-blue-400">
                  {activeComplaintsCount}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Resolved in last 24h
                </span>
              </div>
              <Link
                to="/complaint-tracking"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#003d9b] hover:underline"
              >
                Track status <ArrowRight size={12} />
              </Link>
            </div>
            <div className="w-16 h-16 bg-blue-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-[#003d9b] dark:text-blue-300">
              <CheckCircle2 size={32} />
            </div>
          </div>

          {/* Waste Pickup Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border-l-4 border-l-emerald-600 border-y border-r border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                Next Waste Pickup
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {garbageSchedule.nextDay}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {garbageSchedule.nextTime}
                </span>
              </div>
              <Link
                to="/garbage-schedule"
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
              >
                View live truck location <ArrowRight size={12} />
              </Link>
            </div>
            <div className="w-16 h-16 bg-emerald-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-300">
              <Recycle size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Support FAB */}
      <button
        onClick={() => setIsLiveChatOpen(true)}
        className="fixed bottom-20 md:bottom-8 right-6 bg-[#003d9b] text-white p-4 md:px-5 md:py-3 rounded-2xl shadow-xl hover:bg-[#0052cc] transition-all active:scale-95 flex items-center gap-2 z-40"
      >
        <Headphones size={20} />
        <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Live Support</span>
      </button>
    </main>
  );
};
