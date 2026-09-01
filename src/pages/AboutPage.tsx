import React from 'react';
import { Building2, Award, ShieldCheck, MapPin, Users, Globe, Phone, Mail, FileText, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#003d9b] via-[#0052cc] to-blue-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-blue-200 text-xs font-bold uppercase tracking-wider border border-white/20">
            Government of Maharashtra • Kolhapur Ward Division
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Kolhapur Municipal Corporation (KMC)
          </h1>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Serving Kasba Bawada and all municipal sectors of Kolhapur with digital governance, automated water supply alerts, smart waste logistics, and direct citizen welfare services.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Building2 size={320} />
        </div>
      </div>

      {/* Key Municipal Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/60 text-[#003d9b] dark:text-blue-300 flex items-center justify-center font-bold">
            <Award size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart City Mission</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Pioneering digital governance under Mahagov standards with instant birth/death certificates, online tax processing, and transparent grievance SLAs.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Cleanliness & Sanitation</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Swachh Survekshan rated 5-Star ward sanitation with real-time GPS garbage vehicle tracking and live wet/dry segregation advisories.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 flex items-center justify-center font-bold">
            <Globe size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Civic Inclusion</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Multilingual accessibility in English, Marathi (मराठी) and Hindi (हिंदी), ensuring every resident in Kasba Bawada and Rajarampuri stays informed.
          </p>
        </div>
      </div>

      {/* Ward Information & Headquarters */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin size={22} className="text-[#003d9b]" /> Municipal Headquarters & Contact Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <p className="font-bold text-slate-900 dark:text-white">Main Municipal Office</p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Kolhapur Municipal Corporation Building, Main Road, Kasba Bawada Sector, Kolhapur, Maharashtra - 416006.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Phone size={14} className="text-[#003d9b]" /> 0231-2540201 / 1800-233-1911 (Toll-Free)
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Mail size={14} className="text-[#003d9b]" /> contact@kolhapur.gov.in
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <p className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">Key Wards Covered</p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Kasba Bawada Main Road & Sugar Factory Sector</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Shivaji Nagar & Tarabai Park Extension</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Market Area & Rankala Lake Precinct</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Rajarampuri Lanes 1 to 14</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-600" /> Central Bus Stand & Railway Colony Zone</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
