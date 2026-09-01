import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Lightbulb,
  Droplet,
  Trash2,
  Car,
  Wind,
  MapPin,
  Camera,
  Upload,
  CheckCircle2,
  X,
  Compass,
  Sparkles,
  Loader2,
  Trees,
  Footprints,
  Bath,
  HelpCircle,
  Building2,
  Clock,
  ShieldAlert,
  Bot,
} from 'lucide-react';
import { Complaint, AiAnalysisResult } from '../types';
import { analyzeComplaintImage, SUPPORTED_AI_CATEGORIES } from '../lib/aiVisionAnalyzer';
import { AiDetectionCard } from '../components/AiDetectionCard';

export const ComplaintRegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { addComplaint } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState<string>('Garbage Overflow');
  const [department, setDepartment] = useState<string>('Sanitation Department');
  const [priority, setPriority] = useState<Complaint['priority']>('High');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Kasba Bawada Main Road, near Sugar Factory Chowk');
  const [ward, setWard] = useState('Ward 12 - Kasba Bawada');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState<AiAnalysisResult | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const allSupportedCategories = [
    { id: 'Garbage Overflow', label: 'Garbage Overflow', icon: Trash2, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'Water Leakage', label: 'Water Leakage', icon: Droplet, color: 'text-blue-600 bg-blue-50' },
    { id: 'Road Pothole', label: 'Road Pothole', icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
    { id: 'Drainage Blockage', label: 'Drainage Blockage', icon: Wind, color: 'text-purple-600 bg-purple-50' },
    { id: 'Street Light Not Working', label: 'Street Light Issue', icon: Lightbulb, color: 'text-yellow-600 bg-yellow-50' },
    { id: 'Broken Footpath', label: 'Broken Footpath', icon: Footprints, color: 'text-stone-600 bg-stone-50' },
    { id: 'Fallen Tree', label: 'Fallen Tree', icon: Trees, color: 'text-green-600 bg-green-50' },
    { id: 'Illegal Garbage Dump', label: 'Illegal Garbage Dump', icon: Trash2, color: 'text-red-600 bg-red-50' },
    { id: 'Public Toilet Issue', label: 'Public Toilet Issue', icon: Bath, color: 'text-teal-600 bg-teal-50' },
    { id: 'Other', label: 'Other Issue', icon: HelpCircle, color: 'text-indigo-600 bg-indigo-50' },
  ];

  const triggerAnalysisForPhoto = async (imageSrc: string) => {
    setIsAnalyzing(true);
    setPhotoUrl(imageSrc);
    
    try {
      const result = await analyzeComplaintImage(imageSrc);
      setAiResult(result);
      
      // Auto-fill complaint form fields
      setCategory(result.category);
      setDepartment(result.department);
      setPriority(result.priority);
      if (!description.trim() && result.suggestedDescription) {
        setDescription(result.suggestedDescription);
      }
    } catch (e) {
      console.error('AI Analysis failed:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      triggerAnalysisForPhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSamplePhotoSelect = (sampleUrl: string) => {
    triggerAnalysisForPhoto(sampleUrl);
  };

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`Kasba Bawada Main Rd, GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('Sugar Factory Road Chowk, Kasba Bawada, Kolhapur');
        }
      );
    } else {
      setLocation('Sugar Factory Road Chowk, Kasba Bawada, Kolhapur');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTicket = addComplaint({
      category,
      department,
      priority,
      description,
      location,
      ward,
      photoUrl: photoUrl || undefined,
      aiAnalysis: aiResult || undefined,
    });

    setSubmittedRef(newTicket.referenceNo);
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            AI-Powered Complaint System Active
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Lodge Civic Grievance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Upload an image for instant AI category detection, priority calculation & auto-department routing.
          </p>
        </div>
      </div>

      {/* Success Dialog */}
      {submittedRef ? (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-emerald-200 dark:border-emerald-800 shadow-xl text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Grievance Registered Successfully!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Reference No:{' '}
            <span className="font-extrabold text-[#003d9b] dark:text-blue-400">{submittedRef}</span>. Assigned to{' '}
            <span className="font-bold">{department}</span>. Field officer notified.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/complaint-tracking')}
              className="px-6 py-3 bg-[#003d9b] text-white font-semibold text-sm rounded-2xl hover:bg-[#0052cc] transition-all shadow-md cursor-pointer"
            >
              Track Complaint Status
            </button>
            <button
              onClick={() => {
                setSubmittedRef(null);
                setDescription('');
                setPhotoUrl(null);
                setAiResult(null);
              }}
              className="px-6 py-3 bg-slate-100 text-slate-700 font-semibold text-sm rounded-2xl hover:bg-slate-200 transition-all cursor-pointer"
            >
              File Another Complaint
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-xs border border-slate-200/80 dark:border-slate-700 space-y-6">
          
          {/* STEP 1: AI Photo Upload & Vision Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-600" />
                1. Upload Photo for AI Detection
              </label>
              <span className="text-xs text-indigo-600 font-bold">Auto Category & Department</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {!photoUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-44 border-2 border-dashed border-indigo-300 dark:border-indigo-800/80 rounded-3xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-[#003d9b] bg-indigo-50/30 dark:bg-slate-900/40 transition-all group"
              >
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                  <Camera size={28} />
                </div>
                <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                  Click to take photo or upload image file
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  AI will analyze image & automatically detect category, department, and priority
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="relative w-full h-56 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900">
                  <img src={photoUrl} alt="Uploaded complaint evidence" className="w-full h-full object-cover" />
                  
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoUrl(null);
                      setAiResult(null);
                    }}
                    className="absolute top-3 right-3 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900 cursor-pointer shadow-lg"
                  >
                    <X size={18} />
                  </button>

                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-center text-white space-y-3">
                      <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
                      <div className="space-y-1">
                        <p className="text-sm font-extrabold text-indigo-200 flex items-center justify-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                          AI Vision Analyzing Image...
                        </p>
                        <p className="text-xs text-slate-300">Extracting features & calculating confidence %</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Sample Image Selector for Demo Mode */}
            {!photoUrl && (
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-500 block mb-2">Or choose a demo scenario image:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Garbage Dump', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80' },
                    { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80' },
                    { label: 'Pothole Damage', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?w=600&auto=format&fit=crop&q=80' },
                    { label: 'Street Light Fault', url: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=600&auto=format&fit=crop&q=80' },
                  ].map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSamplePhotoSelect(s.url)}
                      className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-left hover:border-indigo-500 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <img src={s.url} alt={s.label} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Result Banner Card */}
            {aiResult && !isAnalyzing && (
              <AiDetectionCard
                analysis={aiResult}
                imageUrl={photoUrl || undefined}
                showApplyButton={true}
                onApplyDetails={() => {
                  setCategory(aiResult.category);
                  setDepartment(aiResult.department);
                  setPriority(aiResult.priority);
                  if (aiResult.suggestedDescription) {
                    setDescription(aiResult.suggestedDescription);
                  }
                }}
              />
            )}
          </div>

          {/* STEP 2: Category & Department Verification (Auto-Filled) */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <label className="text-sm font-extrabold text-slate-900 dark:text-white">
                2. Complaint Details & Department Routing
              </label>
              {aiResult && (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Auto-Filled by AI
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#003d9b]"
                >
                  {SUPPORTED_AI_CATEGORIES.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white outline-none"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Emergency">Emergency Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* STEP 3: Description */}
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              3. Description / Remarks
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide additional context or verify the auto-generated description..."
              className="w-full p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#003d9b]"
            />
          </div>

          {/* STEP 4: Incident Location */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-900 dark:text-white">
                4. Location & Ward
              </label>
              <button
                type="button"
                onClick={handleUseGPS}
                className="text-xs font-semibold text-[#003d9b] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Compass size={14} /> Detect Current Location
              </button>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Street name, landmark, or house number..."
                  className="w-full pl-10 pr-3 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm outline-none"
                />
              </div>

              <select
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none"
              >
                <option value="Ward 12 - Kasba Bawada">Ward 12 - Kasba Bawada</option>
                <option value="Ward 04 - Downtown Central">Ward 04 - Downtown Central</option>
                <option value="Ward 08 - North Hill">Ward 08 - North Hill</option>
                <option value="Ward 15 - Riverside">Ward 15 - Riverside</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full py-4 bg-[#003d9b] hover:bg-[#0052cc] text-white font-bold text-base rounded-2xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Upload size={18} />
            <span>Submit Complaint Ticket</span>
          </button>
        </form>
      )}
    </main>
  );
};
