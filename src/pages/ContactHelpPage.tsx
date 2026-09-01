import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Headphones,
  Building,
} from 'lucide-react';

export const ContactHelpPage: React.FC = () => {
  const { setIsLiveChatOpen } = useApp();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const emergencyNumbers = [
    { name: 'Police Helpline', number: '112 / 100', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { name: 'Fire Emergency', number: '101', color: 'bg-orange-50 text-orange-700 border-orange-200' },
    { name: 'Ambulance & Medical', number: '108 / 102', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Kolhapur Municipal Helpline', number: '1800-233-1913', color: 'bg-blue-50 text-[#003d9b] border-blue-200' },
  ];

  const faqs = [
    {
      q: 'How do I pay my municipal property tax or water bill online in Indian Rupees (₹)?',
      a: 'Navigate to the "Bill Payment" section from the top or bottom navigation bar. Select your due bill (Property Tax, Water Bill, or Waste Management), click "Pay Now", and choose your preferred payment option (GPay, PhonePe, UPI, Credit/Debit Card, or Net Banking). Instant PDF receipts are generated upon successful transaction.',
    },
    {
      q: 'How can I track the live location of the garbage collection truck?',
      a: 'Go to the "Garbage Schedule" tab. Select your ward/sector from the dropdown. You will see a live simulated route map showing the current truck location, estimated arrival time (ETA), and distance in kilometers.',
    },
    {
      q: 'What is the turnaround time for complaint resolution?',
      a: 'High-priority issues like water pipeline bursts or power outages are dispatched within 2-4 hours. Street lighting and road repair complaints are typically inspected within 24 hours. You can monitor progress and field officer comments in real-time under "Complaint Status Tracking".',
    },
    {
      q: 'How do I obtain a digital Birth or Marriage Certificate?',
      a: 'Visit the "Certificates" portal. Choose the required certificate type, fill in applicant details, and attach supporting identity verification. Once approved by the municipal registrar, a QR-verified downloadable PDF certificate will appear in your profile.',
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Contact & Citizen Help Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Reach municipal authorities, access emergency numbers, or get instant help from AI support.
        </p>
      </div>

      {/* Emergency Hotlines Row */}
      <section>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldAlert size={20} className="text-rose-600" /> Emergency Hotlines
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyNumbers.map((em, i) => (
            <div
              key={i}
              className={`p-5 rounded-3xl border ${em.color} shadow-xs flex justify-between items-center`}
            >
              <div>
                <p className="text-xs font-semibold opacity-80">{em.name}</p>
                <p className="text-xl font-extrabold mt-0.5">{em.number}</p>
              </div>

              <a
                href={`tel:${em.number}`}
                className="p-3 rounded-full bg-white shadow-xs hover:scale-110 active:scale-95 transition-all text-slate-900"
                title="Call now"
              >
                <PhoneCall size={18} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Office Details & AI Chat Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Office Details */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building size={20} className="text-[#003d9b]" /> Central Municipal Headquarters
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="text-[#003d9b] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Physical Address</p>
                <p className="text-slate-500">Kolhapur Municipal Corporation (Kasba Bawada Ward Office), Main Road, Kasba Bawada, Kolhapur, Maharashtra 416006</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} className="text-[#003d9b] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Operating Hours</p>
                <p className="text-slate-500">Monday - Saturday: 09:45 AM - 05:30 PM (Closed on Sundays & Govt Holidays)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail size={20} className="text-[#003d9b] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Official Email Support</p>
                <p className="text-slate-500">kasbabawada@kolhapur.gov.in / grievances@kolhapur.gov.in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Support Trigger Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#003d9b] to-[#0052cc] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col justify-between space-y-6">
          <div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Headphones size={28} className="text-[#6bff8f]" />
            </div>
            <h3 className="text-xl font-extrabold mb-2">24/7 AI Citizen Assistant</h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Have a query about water schedules, complaint updates, or property tax? Chat with our instant virtual assistant now.
            </p>
          </div>

          <button
            onClick={() => setIsLiveChatOpen(true)}
            className="w-full py-3.5 bg-[#6bff8f] hover:bg-[#52e875] text-[#007432] font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} /> Launch Live Chat Assistant
          </button>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle size={20} className="text-[#003d9b]" /> Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <span>{f.q}</span>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isOpen && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
