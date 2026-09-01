import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  FileText,
  Lock,
  Globe,
  Bell,
  LogOut,
  Shield,
  Save,
  CheckCircle,
} from 'lucide-react';
import { KolhapurArea } from '../types';

export const ProfilePage: React.FC = () => {
  const { user, setUser, updateUserArea, switchUserRole, toggleTheme, theme } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [ward, setWard] = useState(user.ward);
  const [address, setAddress] = useState(user.address);
  const [state, setState] = useState(user.state || 'Maharashtra');
  const [city, setCity] = useState(user.city || 'Kolhapur');
  const [area, setArea] = useState<KolhapurArea>(user.area || 'Kasba Bawada Main Road');
  const [language, setLanguage] = useState('English');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      mobile,
      ward: `${area}, Kolhapur`,
      address,
      state,
      city,
      area,
    }));
    updateUserArea(area);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Save Toast */}
      {isSaved && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full text-xs font-semibold shadow-2xl z-50 animate-in fade-in flex items-center gap-2">
          <CheckCircle size={16} /> Profile settings and area updated successfully!
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover ring-4 ring-[#003d9b]/20"
          />
          <span className="absolute bottom-1 right-1 p-1 bg-emerald-500 text-white rounded-full ring-2 ring-white">
            <ShieldCheck size={14} />
          </span>
        </div>

        <div className="space-y-2 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">{user.name}</h1>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full flex items-center gap-1">
              <ShieldCheck size={12} /> Aadhaar Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#003d9b] dark:text-blue-400 font-bold flex items-center justify-center sm:justify-start gap-1">
            <MapPin size={14} /> {user.area}, {user.city}, {user.state}
          </p>

          <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              onClick={() => switchUserRole(user.role === 'citizen' ? 'admin' : 'citizen')}
              className="px-4 py-2 bg-blue-50 dark:bg-slate-700 text-[#003d9b] dark:text-blue-300 font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Shield size={14} /> Switch to {user.role === 'citizen' ? 'Admin Mode' : 'Citizen Mode'}
            </button>
          </div>
        </div>
      </div>

      {/* Personal Info Form */}
      <form onSubmit={handleSaveProfile} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User size={20} className="text-[#003d9b]" /> Personal Information & Citizen Jurisdiction
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              State
            </label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none font-bold"
            >
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              City
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none font-bold"
            >
              <option value="Kolhapur">Kolhapur</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Residential Area (Area-Wise Notification Zone)
            </label>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value as KolhapurArea)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none font-bold text-[#003d9b] dark:text-blue-400"
            >
              <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
              <option value="Shivaji Nagar">Shivaji Nagar</option>
              <option value="Market Area">Market Area</option>
              <option value="Rajarampuri">Rajarampuri</option>
              <option value="Bus Stand Area">Bus Stand Area</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Residential Street Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe size={18} className="text-[#003d9b]" /> Portal Language & Accessibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Preferred Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border rounded-xl text-sm outline-none"
              >
                <option>English</option>
                <option>हिंदी (Hindi)</option>
                <option>मराठी (Marathi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Theme Preference
              </label>
              <button
                type="button"
                onClick={toggleTheme}
                className="w-full py-2.5 px-4 bg-slate-50 dark:bg-slate-900 border rounded-xl text-xs font-semibold text-left flex justify-between items-center"
              >
                <span>Current Theme: {theme.toUpperCase()}</span>
                <span className="text-[#003d9b] underline">Toggle</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <Save size={16} /> Save Profile Settings
        </button>
      </form>
    </main>
  );
};
