import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Droplet,
  RefreshCw,
  Search,
  CheckCircle,
  Clock,
  Info,
  Calendar,
  AlertTriangle,
  MapPin,
  X,
  Volume2,
} from 'lucide-react';

export const WaterSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const { waterSchedule, updateWaterArea, addComplaint } = useApp();
  const [selectedArea, setSelectedArea] = useState(waterSchedule.area);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBurstModalOpen, setIsBurstModalOpen] = useState(false);

  // Pipe Burst Form State
  const [burstLocation, setBurstLocation] = useState('Oakwood Ave near Water Valve #12');
  const [burstSeverity, setBurstSeverity] = useState('High Leakage');

  const handleAreaSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateWaterArea(selectedArea);
    showToast(`Updated water supply data for ${selectedArea}`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Water distribution grid status refreshed successfully.');
    }, 1000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReportPipeBurst = (e: React.FormEvent) => {
    e.preventDefault();
    addComplaint({
      category: 'Water Leak',
      description: `[EMERGENCY PIPE BURST] Severity: ${burstSeverity}. Details: ${burstLocation}`,
      location: `${selectedArea} - ${burstLocation}`,
      ward: 'Ward 12',
    });
    setIsBurstModalOpen(false);
    showToast('Emergency Pipe Burst report submitted! Field dispatch team notified.');
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full text-xs font-semibold shadow-2xl z-50 animate-in fade-in">
          {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Water Supply Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time monitoring and scheduling of civic water distribution across municipal zones.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#6bff8f]/30 text-[#007432] font-semibold text-xs hover:bg-[#6bff8f]/50 transition-all active:scale-95"
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Refresh Grid Status</span>
        </button>
      </div>

      {/* Controls & Quick Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Area Selection & Search */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xs border border-slate-200/80 dark:border-slate-700">
          <form onSubmit={handleAreaSearch} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Current Municipal Area
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#003d9b]"
                >
                  <option>Kasba Bawada Main Road</option>
                  <option>Shivaji Nagar</option>
                  <option>Market Area</option>
                  <option>Rajarampuri Extension</option>
                  <option>Bus Stand Area</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#003d9b] text-white rounded-2xl font-semibold text-sm hover:bg-[#0052cc] transition-all flex items-center justify-center gap-2"
            >
              <Search size={16} />
              <span>Search Area</span>
            </button>
          </form>
        </div>

        {/* Quick System Health Card */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xs border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              System Health
            </p>
            <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              {waterSchedule.systemHealth}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-slate-700 flex items-center justify-center text-emerald-600">
            <Droplet size={24} />
          </div>
        </div>
      </div>

      {/* Main Flow Status Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-700">
          {/* Left State Badge */}
          <div className="lg:col-span-1 p-6 flex flex-col items-center justify-center text-center bg-emerald-50/50 dark:bg-emerald-950/20">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-lg shadow-emerald-600/20">
              <CheckCircle size={32} />
            </div>
            <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest mb-1">
              CURRENT STATE
            </p>
            <h3 className="text-xl font-extrabold text-emerald-800 dark:text-emerald-300">
              {waterSchedule.currentState}
            </h3>
            <p className="text-[11px] text-slate-500 mt-2">Last updated: {waterSchedule.lastUpdated}</p>
          </div>

          {/* Middle Schedule Info */}
          <div className="lg:col-span-3 p-6 sm:p-8 flex flex-col justify-center">
            <div className="flex flex-wrap gap-6 sm:gap-12">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  NEXT SCHEDULED DAY
                </p>
                <h4 className="text-3xl sm:text-4xl font-extrabold text-[#003d9b] dark:text-blue-400">
                  {waterSchedule.nextDay}
                </h4>
              </div>

              <div className="h-12 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block self-center" />

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  SUPPLY WINDOW
                </p>
                <div className="flex items-center gap-2">
                  <Clock size={20} className="text-[#003d9b] dark:text-blue-400" />
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {waterSchedule.supplyWindow}
                  </h4>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
              <Info size={20} className="text-[#003d9b] shrink-0" />
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Pressure is currently stable at{' '}
                <span className="font-bold text-slate-900 dark:text-white">
                  {waterSchedule.pressureBar} BAR
                </span>
                . No maintenance planned for the next 48 hours.
              </p>
            </div>
          </div>

          {/* Right Duration Ring Gauge */}
          <div className="lg:col-span-1 p-6 flex flex-col items-center justify-center">
            <div className="relative w-28 h-28">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#E2E8F0" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#006e2f"
                  strokeWidth="8"
                  strokeDasharray="264"
                  strokeDashoffset="132"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {waterSchedule.durationPercent}%
                </span>
                <span className="text-[10px] text-slate-500">Duration</span>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center font-medium">
              {waterSchedule.minutesRemaining} minutes remaining
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Distribution Days */}
      <section>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Upcoming Distribution Days
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {waterSchedule.upcoming.map((u, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-[#003d9b] transition-all"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-slate-700 text-[#003d9b] dark:text-blue-300 text-xs font-bold">
                  {u.day}
                </span>
                <Calendar size={18} className="text-slate-400" />
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{u.window}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <Droplet size={14} className="text-[#003d9b]" />
                <span>{u.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Zone Alerts & Emergency Pipe Burst Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">Zone Water Bulletins</h4>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-start gap-3">
              <CheckCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">Pressure Restoration</p>
                <p className="text-slate-500 dark:text-slate-400">System normalized in Greenwood Sector 2 pipeline valve #9.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl flex items-start gap-3">
              <Volume2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-100">Holiday Schedule Notice</p>
                <p className="text-slate-500 dark:text-slate-400">Water supply will be extended by 1 hour on upcoming Sunday morning.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col justify-center">
          <button
            onClick={() => setIsBurstModalOpen(true)}
            className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <AlertTriangle size={20} />
            <span>Report a Pipe Burst</span>
          </button>
        </div>
      </div>

      {/* Emergency Pipe Burst Modal */}
      {isBurstModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-rose-600 flex items-center gap-2">
                <AlertTriangle size={20} /> Report Water Pipe Burst
              </h3>
              <button
                onClick={() => setIsBurstModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReportPipeBurst} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Location Landmark
                </label>
                <input
                  type="text"
                  required
                  value={burstLocation}
                  onChange={(e) => setBurstLocation(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Leak Severity
                </label>
                <select
                  value={burstSeverity}
                  onChange={(e) => setBurstSeverity(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                >
                  <option>High Leakage / Road Flooding</option>
                  <option>Medium Pipeline Cracker</option>
                  <option>Minor Water Seepage</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsBurstModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700"
                >
                  Submit Emergency Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
