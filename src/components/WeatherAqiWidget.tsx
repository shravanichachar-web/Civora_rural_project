import React from 'react';
import { CloudSun, Wind, Droplets, Thermometer, ShieldCheck, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WeatherAqiWidget: React.FC = () => {
  const { t } = useApp();

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              {t('weatherAndAQI')}
            </h3>
          </div>
          <p className="text-lg font-bold text-slate-100 mt-0.5">Kasba Bawada, Kolhapur</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/70 border border-slate-700/50 px-3 py-1.5 rounded-xl">
            <CloudSun className="w-6 h-6 text-amber-400" />
            <div>
              <div className="text-lg font-extrabold text-white leading-tight">29°C</div>
              <div className="text-[10px] text-slate-400">Partly Cloudy</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
        {/* AQI Card */}
        <div className="bg-slate-800/50 border border-slate-700/40 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            42
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">AQI (Air Quality)</div>
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Good / Pure
            </div>
          </div>
        </div>

        {/* Water Quality */}
        <div className="bg-slate-800/50 border border-slate-700/40 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">Water Quality</div>
            <div className="text-xs font-bold text-blue-300">pH 7.2 (Safe)</div>
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-slate-800/50 border border-slate-700/40 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">Humidity / Wind</div>
            <div className="text-xs font-bold text-indigo-300">78% • 12 km/h</div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-slate-800/50 border border-slate-700/40 p-3 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-300">KMC Services</div>
            <div className="text-xs font-bold text-amber-300">100% Operational</div>
          </div>
        </div>
      </div>
    </div>
  );
};
