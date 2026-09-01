import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Truck,
  Droplets,
  AlertTriangle,
  Layers,
  Search,
  Filter,
  RefreshCw,
  Navigation,
  Info,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export const LiveMapPage: React.FC = () => {
  const { complaints, garbageScheduleItems, waterScheduleItems } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'complaints' | 'garbage' | 'water'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [truckPosOffset, setTruckPosOffset] = useState(0);

  // Animate garbage truck positions slightly to simulate real-time GPS movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPosOffset((prev) => (prev + 0.0003) % 0.003);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const mapComplaints = complaints.slice(0, 15).map((c, idx) => ({
    ...c,
    lat: c.coordinates?.lat || 16.7198 + (idx % 5) * 0.002,
    lng: c.coordinates?.lng || 74.2482 + (idx % 4) * 0.002,
  }));

  const filteredComplaints = mapComplaints.filter(
    (c) =>
      c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">GPS Live Monitoring</span>
          </div>
          <h1 className="text-xl font-black text-white mt-0.5">Kasba Bawada & Kolhapur Municipal Map</h1>
          <p className="text-xs text-slate-300">Live GPS tracking for Garbage Vehicles, Water Distribution Grid & Complaint Markers</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'all' ? 'bg-[#003d9b] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            All Layers
          </button>
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'complaints' ? 'bg-[#003d9b] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Complaints
          </button>
          <button
            onClick={() => setActiveTab('garbage')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'garbage' ? 'bg-[#003d9b] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Garbage Trucks
          </button>
          <button
            onClick={() => setActiveTab('water')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'water' ? 'bg-[#003d9b] text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            Water Grid
          </button>
        </div>
      </div>

      {/* Map Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Interactive Simulated Canvas Map */}
        <div className="lg:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl relative min-h-[500px] flex flex-col">
          {/* Map Controls Top Overlay */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
            <div className="bg-slate-900/90 backdrop-blur-md p-2 rounded-xl border border-slate-700 text-white flex items-center gap-2 pointer-events-auto shadow-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search location or ticket..."
                className="bg-transparent border-none text-xs focus:outline-none text-white placeholder-slate-400 w-48"
              />
            </div>

            <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold flex items-center gap-2 pointer-events-auto">
              <Navigation className="w-3.5 h-3.5 text-blue-400 animate-pulse" /> Kasba Bawada Zone (16.7214° N, 74.2488° E)
            </div>
          </div>

          {/* Canvas Map View Representation */}
          <div className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative p-8 flex items-center justify-center overflow-hidden">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Simulated River / Land Contour lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none">
              <path d="M0,100 Q300,180 600,120 T1200,200" fill="none" stroke="#0284c7" strokeWidth="6" />
              <path d="M0,400 Q400,300 800,420 T1200,350" fill="none" stroke="#0369a1" strokeWidth="4" />
            </svg>

            {/* Map Markers Overlay */}
            <div className="relative w-full max-w-3xl h-[380px] border border-slate-800 rounded-2xl bg-slate-900/40 backdrop-blur-xs p-6 flex flex-col justify-between">
              <div className="text-center font-mono text-[10px] text-blue-400 tracking-widest uppercase mb-2">
                Interactive Municipal Map Representation • Kasba Bawada Sector Grid
              </div>

              {/* Grid Nodes / Markers */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* Complaints Markers */}
                {(activeTab === 'all' || activeTab === 'complaints') &&
                  filteredComplaints.slice(0, 6).map((comp, i) => (
                    <div
                      key={comp.id}
                      className="bg-slate-800/90 border border-slate-700 p-2.5 rounded-xl text-left hover:border-amber-400 transition-all cursor-pointer shadow-md group"
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-mono font-bold text-amber-400">#{comp.referenceNo}</span>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300">{comp.category}</p>
                      <p className="text-[10px] text-slate-400 line-clamp-1">{comp.location}</p>
                    </div>
                  ))}

                {/* Garbage Vehicle Markers */}
                {(activeTab === 'all' || activeTab === 'garbage') &&
                  garbageScheduleItems.slice(0, 4).map((g, i) => (
                    <div
                      key={g.id}
                      className="bg-emerald-950/80 border border-emerald-700/60 p-2.5 rounded-xl text-left hover:border-emerald-400 transition-all cursor-pointer shadow-md"
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-bold text-emerald-400 flex items-center gap-1">
                          <Truck className="w-3 h-3" /> {g.vehicle}
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">LIVE</span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1">{g.area}</p>
                      <p className="text-[10px] text-emerald-300 font-semibold">ETA: {g.time}</p>
                    </div>
                  ))}

                {/* Water Grid Markers */}
                {(activeTab === 'all' || activeTab === 'water') &&
                  waterScheduleItems.slice(0, 4).map((w, i) => (
                    <div
                      key={w.id}
                      className="bg-blue-950/80 border border-blue-700/60 p-2.5 rounded-xl text-left hover:border-blue-400 transition-all cursor-pointer shadow-md"
                    >
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="font-bold text-blue-300 flex items-center gap-1">
                          <Droplets className="w-3 h-3 text-blue-400" /> Pumping Station #{i + 1}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-white line-clamp-1">{w.area}</p>
                      <p className="text-[10px] text-blue-300 font-semibold">Window: {w.time}</p>
                    </div>
                  ))}
              </div>

              {/* Bottom Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Pending Complaints</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Garbage Van (GPS Active)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Water Supply Zone</span>
                </div>
                <span className="font-bold text-slate-300">Updated: Just Now</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 shadow-sm space-y-4">
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Info className="w-4 h-4 text-[#003d9b]" />
            Live Feed Updates
          </h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {/* Live Truck 1 */}
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Van KMC-G001</span>
                <span className="text-[10px] bg-emerald-200 dark:bg-emerald-800 px-1.5 py-0.5 rounded">0.8 km away</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">Currently servicing Kasba Bawada Main Road.</p>
            </div>

            {/* Live Water Supply */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-blue-800 dark:text-blue-300">
                <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5" /> Water Pumping Active</span>
                <span className="text-[10px] bg-blue-200 dark:bg-blue-800 px-1.5 py-0.5 rounded">Optimal Pressure</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">Kasba Bawada & Sugar Factory Road lines flowing.</p>
            </div>

            {/* Active Complaint */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <div className="flex items-center justify-between font-bold text-amber-800 dark:text-amber-300">
                <span className="flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Pipeline Repair</span>
                <span className="text-[10px] bg-amber-200 dark:bg-amber-800 px-1.5 py-0.5 rounded">In Progress</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 font-medium">Line Bazar leak repair underway by Suresh More team.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
