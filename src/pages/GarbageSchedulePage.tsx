import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck,
  MapPin,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  Recycle,
  Trash2,
  Leaf,
  Navigation,
  Sparkles,
} from 'lucide-react';

export const GarbageSchedulePage: React.FC = () => {
  const { garbageSchedule, updateGarbageArea } = useApp();
  const [selectedArea, setSelectedArea] = useState(garbageSchedule.area);
  const [activeTab, setActiveTab] = useState<'all' | 'recyclable' | 'organic'>('all');

  const handleSearchArea = (e: React.FormEvent) => {
    e.preventDefault();
    updateGarbageArea(selectedArea);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Garbage Truck Schedule & Live Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track sanitation trucks in real-time and review waste segregation guidelines for your zone.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Live GPS Active</span>
        </div>
      </div>

      {/* Service Area Selector */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700">
        <form onSubmit={handleSearchArea} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Select Service Ward / Sector
            </label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option>Main Road</option>
                <option>Shivaji Nagar</option>
                <option>Market Area</option>
                <option>Bus Stand</option>
                <option>Rajarampuri Extension</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-2xl font-semibold text-sm hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <Search size={16} />
            <span>Update Sector</span>
          </button>
        </form>
      </div>

      {/* Main Truck Tracking Card & Live Simulated Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Scheduled Pickup Info */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold">
                {garbageSchedule.status}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {garbageSchedule.truckNumber}
              </span>
            </div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              NEXT SCHEDULED PICKUP
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {garbageSchedule.nextDay}
            </h3>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
              <Clock size={20} /> {garbageSchedule.nextTime}
            </p>
          </div>

          {/* ETA Card */}
          <div className="bg-emerald-50 dark:bg-slate-700/60 p-4 rounded-2xl border border-emerald-100 dark:border-slate-600 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-300 font-medium">Distance from your doorstep</p>
              <p className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                {garbageSchedule.distanceKm} km ({garbageSchedule.etaMinutes} mins)
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Navigation size={20} />
            </div>
          </div>

          {/* Waste Types Included */}
          <div>
            <p className="text-xs font-bold text-slate-500 mb-2">Accepted Waste Types for Today</p>
            <div className="flex flex-wrap gap-2">
              {garbageSchedule.wasteTypes.map((wt, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 size={12} className="text-emerald-600" />
                  {wt}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Truck Route Map Visualizer */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Truck size={20} className="text-emerald-600" /> Live Sector Truck Route Map
            </h3>
            <span className="text-xs text-slate-400">Sector 4 Route #A-9</span>
          </div>

          {/* Map Visual Container */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-80"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&auto=format&fit=crop&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-slate-900/30 backdrop-xs" />

            {/* Truck Pin & Route Path */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white animate-bounce">
              <Truck size={16} />
              <span className="text-xs font-extrabold">{garbageSchedule.truckNumber}</span>
            </div>

            {/* Destination Pin */}
            <div className="absolute top-1/3 right-1/4 bg-[#003d9b] text-white p-2 rounded-full shadow-lg border-2 border-white">
              <MapPin size={18} />
            </div>

            {/* Map Overlay Badge */}
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-800 dark:text-slate-200 shadow-md">
              📍 Current Location: Oakwood Ave & 4th Street
            </div>
          </div>

          {garbageSchedule.alertMessage && (
            <div className="p-3 bg-amber-50 dark:bg-slate-700/60 rounded-2xl border border-amber-200 dark:border-slate-600 flex items-center gap-2 text-xs text-amber-800 dark:text-amber-200">
              <AlertCircle size={16} className="shrink-0" />
              <span>{garbageSchedule.alertMessage}</span>
            </div>
          )}
        </div>
      </div>

      {/* Community Segregation Guidelines */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Recycle size={20} className="text-emerald-600" /> Waste Segregation Guidelines
          </h3>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setActiveTab('recyclable')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'recyclable'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Recyclables
            </button>
            <button
              onClick={() => setActiveTab('organic')}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === 'organic'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              Bio-Organic
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50/50 dark:bg-slate-700/50 rounded-2xl border border-emerald-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-2">
              <Leaf size={16} />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Green Bin: Wet Organic Waste</h4>
            <p className="text-xs text-slate-500">Vegetable peels, leftover food, garden leaves, tea bags.</p>
          </div>

          <div className="p-4 bg-blue-50/50 dark:bg-slate-700/50 rounded-2xl border border-blue-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center mb-2">
              <Recycle size={16} />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Blue Bin: Dry Recyclables</h4>
            <p className="text-xs text-slate-500">Paper, cardboards, plastic bottles, metal cans, glass jars.</p>
          </div>

          <div className="p-4 bg-rose-50/50 dark:bg-slate-700/50 rounded-2xl border border-rose-100 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center mb-2">
              <Trash2 size={16} />
            </div>
            <h4 className="font-bold text-xs text-slate-900 dark:text-white mb-1">Red Bin: Hazardous / E-Waste</h4>
            <p className="text-xs text-slate-500">Batteries, fluorescent bulbs, medicines, old electronics.</p>
          </div>
        </div>
      </section>
    </main>
  );
};
