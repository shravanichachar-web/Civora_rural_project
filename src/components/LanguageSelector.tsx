import React from 'react';
import { useApp } from '../context/AppContext';
import { LanguageCode } from '../types';
import { Languages } from 'lucide-react';

export const LanguageSelector: React.FC<{ variant?: 'header' | 'compact' }> = ({ variant = 'header' }) => {
  const { language, setLanguage } = useApp();

  const options: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'mr', label: 'मराठी', flag: '🚩' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  ];

  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
        {options.map((opt) => (
          <button
            key={opt.code}
            onClick={() => setLanguage(opt.code)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
              language === opt.code
                ? 'bg-[#003d9b] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="mr-1">{opt.flag}</span>
            {opt.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200">
        <Languages className="w-3.5 h-3.5 text-[#003d9b] dark:text-blue-400" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as LanguageCode)}
          className="bg-transparent border-none text-xs font-bold focus:ring-0 focus:outline-none cursor-pointer dark:bg-slate-800 text-slate-800 dark:text-slate-100"
        >
          {options.map((opt) => (
            <option key={opt.code} value={opt.code} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
              {opt.flag} {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
