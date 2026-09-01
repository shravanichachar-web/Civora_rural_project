import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings, Moon, Sun, Bell, Globe, Shield, MapPin, Smartphone, Check, UserCheck } from 'lucide-react';
import { KolhapurArea } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, setUser, updateUserArea, theme, toggleTheme, switchUserRole } = useApp();

  const [selectedArea, setSelectedArea] = useState<KolhapurArea>(user.area || 'Kasba Bawada Main Road');
  const [selectedLang, setSelectedLang] = useState('English');
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserArea(selectedArea);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Settings size={28} className="text-[#003d9b]" /> App Settings & Notification Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize your area alerts, theme preference, language options, and account role.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-xs">
          <Check size={18} /> Settings updated! Your area-wise alert filters have been configured for {selectedArea}.
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Area Preference */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin size={20} className="text-[#003d9b]" /> Primary Resident Area for Civic Alerts
          </h2>
          <p className="text-xs text-slate-500">
            Select your ward area to receive targeted water supply schedules, garbage truck alerts, and emergency announcements.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Kasba Bawada Main Road',
              'Shivaji Nagar',
              'Market Area',
              'Rajarampuri',
              'Bus Stand Area',
            ].map((areaItem) => (
              <label
                key={areaItem}
                className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                  selectedArea === areaItem
                    ? 'border-[#003d9b] bg-blue-50/60 dark:bg-slate-700/60 text-[#003d9b] dark:text-blue-300 font-bold'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xs">{areaItem}</span>
                <input
                  type="radio"
                  name="areaChoice"
                  value={areaItem}
                  checked={selectedArea === areaItem}
                  onChange={() => setSelectedArea(areaItem as KolhapurArea)}
                  className="accent-[#003d9b]"
                />
              </label>
            ))}
          </div>
        </section>

        {/* Display & Language */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe size={20} className="text-[#003d9b]" /> Display Theme & Language
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Appearance Theme</p>
                <p className="text-[11px] text-slate-500">Currently: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center gap-2"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                <span>Toggle Mode</span>
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <p className="text-xs font-bold text-slate-900 dark:text-white">Portal Language</p>
              <select
                value={selectedLang}
                onChange={(e) => setSelectedLang(e.target.value)}
                className="w-full p-2 bg-white dark:bg-slate-800 border rounded-xl text-xs font-semibold outline-none"
              >
                <option value="English">English</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Hindi">हिंदी (Hindi)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Push Notification Switches */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell size={20} className="text-[#003d9b]" /> Alert Channels
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Browser / App Push Notifications</p>
                <p className="text-[11px] text-slate-500">Instant popups for water supply start & garbage truck arrival</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifs}
                onChange={(e) => setPushNotifs(e.target.checked)}
                className="w-5 h-5 accent-[#003d9b]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">SMS Mobile Alerts</p>
                <p className="text-[11px] text-slate-500">Send text messages to +91 {user.mobile}</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#003d9b]"
              />
            </div>
          </div>
        </section>

        {/* Role Switch */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Shield size={20} className="text-[#003d9b]" /> Active User Role
              </h2>
              <p className="text-xs text-slate-500">
                Current role: <span className="font-bold uppercase text-[#003d9b]">{user.role}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => switchUserRole(user.role === 'citizen' ? 'admin' : 'citizen')}
              className="px-4 py-2 bg-[#003d9b] text-white text-xs font-bold rounded-xl hover:bg-[#0052cc]"
            >
              Switch to {user.role === 'citizen' ? 'Admin Portal' : 'Citizen Mode'}
            </button>
          </div>
        </section>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-extrabold text-sm rounded-2xl shadow-md transition-all"
        >
          Save All Settings
        </button>
      </form>
    </main>
  );
};
