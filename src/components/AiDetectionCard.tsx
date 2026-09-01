import React from 'react';
import { AiAnalysisResult } from '../types';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Building2,
  ShieldAlert,
  Zap,
  Target,
  FileText,
  Layers,
} from 'lucide-react';

interface AiDetectionCardProps {
  analysis: AiAnalysisResult;
  imageUrl?: string;
  compact?: boolean;
  onApplyDetails?: () => void;
  showApplyButton?: boolean;
}

export const AiDetectionCard: React.FC<AiDetectionCardProps> = ({
  analysis,
  imageUrl,
  compact = false,
  onApplyDetails,
  showApplyButton = false,
}) => {
  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Emergency':
        return 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50';
      case 'High':
        return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50';
      case 'Medium':
        return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50';
      default:
        return 'bg-slate-500/10 text-slate-600 border-slate-200 dark:border-slate-700';
    }
  };

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-800 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
        <span className="font-bold text-indigo-700 dark:text-indigo-300">{analysis.category}</span>
        <span className="px-1.5 py-0.5 rounded-md bg-indigo-600 text-white font-mono text-[10px] font-extrabold">
          {analysis.confidence}% AI
        </span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 shadow-2xl border border-indigo-500/30 space-y-4 animate-in fade-in zoom-in-95">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-indigo-500/20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-extrabold text-white tracking-wide">AI Vision Result</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Auto-Detected
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Kolhapur Municipal AI Classification Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white text-xs font-mono font-extrabold shadow-md border border-indigo-400/40 flex items-center gap-1">
            <Target className="w-3.5 h-3.5" />
            <span>{analysis.confidence}% Confidence</span>
          </div>
        </div>
      </div>

      {/* Image & Main Analysis Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
        {imageUrl && (
          <div className="sm:col-span-4 relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-slate-950 group h-36 sm:h-full min-h-[120px]">
            <img src={imageUrl} alt="AI Inspected" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] text-indigo-200 font-mono font-bold bg-slate-900/80 px-2 py-0.5 rounded-md border border-indigo-500/30">
                Visual Feed Analyzed
              </span>
            </div>
          </div>
        )}

        <div className={`${imageUrl ? 'sm:col-span-8' : 'sm:col-span-12'} space-y-3`}>
          {/* Detected Category Title */}
          <div className="bg-slate-800/60 backdrop-blur-md p-3.5 rounded-2xl border border-indigo-500/20">
            <span className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider block mb-1">
              Detected Category
            </span>
            <div className="text-lg font-black text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{analysis.category}</span>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {/* Priority */}
            <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Priority</span>
              <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-extrabold border ${getPriorityBadgeClass(analysis.priority)}`}>
                {analysis.priority}
              </span>
            </div>

            {/* Department */}
            <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Department</span>
              <span className="font-extrabold text-indigo-200 truncate block flex items-center gap-1">
                <Building2 className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="truncate">{analysis.department}</span>
              </span>
            </div>

            {/* Resolution Time */}
            <div className="p-2.5 bg-slate-800/40 rounded-xl border border-slate-700/60 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block mb-0.5">Est. Resolution Time</span>
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{analysis.estimatedResolutionTime}</span>
              </span>
            </div>
          </div>

          {/* Detected Features / Objects */}
          {analysis.detectedObjects && analysis.detectedObjects.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                <Layers className="w-3 h-3 text-indigo-400" /> Objects:
              </span>
              {analysis.detectedObjects.map((obj, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-indigo-950/80 text-indigo-200 border border-indigo-800/60 rounded-md text-[10px] font-semibold"
                >
                  {obj}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Suggested Description & Apply Action */}
      {analysis.suggestedDescription && (
        <div className="relative z-10 pt-2 border-t border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-indigo-100/90 leading-relaxed italic flex items-start gap-2">
            <FileText className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>"{analysis.suggestedDescription}"</span>
          </p>

          {showApplyButton && onApplyDetails && (
            <button
              type="button"
              onClick={onApplyDetails}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-extrabold rounded-xl shadow-lg transition-all active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Apply AI Auto-Fill</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
