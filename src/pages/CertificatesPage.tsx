import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileCheck,
  Award,
  Download,
  Clock,
  Plus,
  X,
  CheckCircle2,
  ShieldCheck,
  Building,
  User,
  Heart,
  FileSpreadsheet,
} from 'lucide-react';
import { CertificateRequest } from '../types';

export const CertificatesPage: React.FC = () => {
  const { certificates, applyCertificate } = useApp();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [certType, setCertType] = useState<CertificateRequest['type']>('Birth Certificate');
  const [applicantName, setApplicantName] = useState('Alex Johnson');
  const [successCert, setSuccessCert] = useState<CertificateRequest | null>(null);

  const certTypes: Array<{ type: CertificateRequest['type']; label: string; desc: string; icon: any; color: string }> = [
    {
      type: 'Birth Certificate',
      label: 'Birth Certificate',
      desc: 'Official registration document for newborn children in municipal registry.',
      icon: User,
      color: 'bg-blue-50 text-[#003d9b]',
    },
    {
      type: 'Death Certificate',
      label: 'Death Certificate',
      desc: 'Official death record for legal and estate settlement purposes.',
      icon: FileSpreadsheet,
      color: 'bg-slate-100 text-slate-700',
    },
    {
      type: 'Marriage Certificate',
      label: 'Marriage Certificate',
      desc: 'Legal registration and digital certificate for solemnized marriages.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      type: 'Income Certificate',
      label: 'Income Certificate',
      desc: 'Official certificate verifying annual family/individual income for government schemes.',
      icon: Building,
      color: 'bg-emerald-50 text-emerald-700',
    },
    {
      type: 'Residence Certificate',
      label: 'Residence / Domicile',
      desc: 'Official proof of residence within Kasba Bawada municipal jurisdiction.',
      icon: Building,
      color: 'bg-amber-50 text-amber-700',
    },
    {
      type: 'Senior Citizen Certificate',
      label: 'Senior Citizen Card',
      desc: 'Official identification for senior citizens to access municipal concessions.',
      icon: User,
      color: 'bg-purple-50 text-purple-700',
    },
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    const created = applyCertificate(certType, applicantName);
    setIsApplyModalOpen(false);
    setSuccessCert(created);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Digital Certificates Registry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Apply, track, and download officially verified municipal certificates with QR verification.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="px-5 py-2.5 bg-[#003d9b] hover:bg-[#0052cc] text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95"
        >
          <Plus size={16} />
          <span>Apply New Certificate</span>
        </button>
      </div>

      {/* Official Registry Banner */}
      <div className="p-6 bg-gradient-to-r from-slate-900 to-[#003d9b] text-white rounded-3xl shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#6bff8f]">
            Verified Digital Seal
          </span>
          <h2 className="text-xl font-bold">Civora QR Cryptographic Registry</h2>
          <p className="text-xs text-blue-100 max-w-xl">
            All issued certificates carry an embedded cryptographic QR code valid across government institutions and passport offices.
          </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
          <Award size={32} className="text-[#6bff8f]" />
        </div>
      </div>

      {/* Certificate Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {certTypes.map((ct) => {
          const IconComp = ct.icon;
          return (
            <div
              key={ct.type}
              className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between hover:border-[#003d9b] transition-all space-y-4"
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl ${ct.color} flex items-center justify-center mb-4`}>
                  <IconComp size={24} />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">{ct.label}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{ct.desc}</p>
              </div>

              <button
                onClick={() => {
                  setCertType(ct.type);
                  setIsApplyModalOpen(true);
                }}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-[#003d9b] hover:text-white text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                Apply Online
              </button>
            </div>
          );
        })}
      </div>

      {/* Applied Certificates List */}
      <section className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">
          My Applied Certificates & Permits
        </h3>

        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{cert.type}</span>
                  <span className="text-xs font-semibold text-[#003d9b] dark:text-blue-400">
                    ({cert.referenceNo})
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Applicant: {cert.applicantName} • Applied: {cert.appliedDate}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    cert.status === 'Issued'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {cert.status}
                </span>

                {cert.status === 'Issued' && (
                  <button
                    onClick={() => alert(`Downloading Certificate ${cert.referenceNo}.pdf`)}
                    className="p-2 bg-[#003d9b] text-white rounded-xl text-xs font-semibold hover:bg-[#0052cc]"
                    title="Download PDF Certificate"
                  >
                    <Download size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Certificate Application
              </h3>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Certificate Type
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value as any)}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
                >
                  <option>Birth Certificate</option>
                  <option>Death Certificate</option>
                  <option>Marriage Certificate</option>
                  <option>Income Certificate</option>
                  <option>Residence Certificate</option>
                  <option>Senior Citizen Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name of Applicant / Subject
                </label>
                <input
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upload Supporting Identity Document (Aadhaar / Passport)
                </label>
                <div className="p-3 border-2 border-dashed rounded-xl text-center text-xs text-slate-400">
                  Click or drag file to attach
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="flex-1 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#003d9b] text-white rounded-xl text-xs font-bold hover:bg-[#0052cc]"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      {successCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="font-extrabold text-lg">Application Submitted!</h3>
            <p className="text-xs text-slate-500">
              Reference: <span className="font-bold text-[#003d9b]">{successCert.referenceNo}</span>
            </p>
            <button
              onClick={() => setSuccessCert(null)}
              className="w-full py-2.5 bg-[#003d9b] text-white text-xs font-bold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
