import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Shield,
  ShieldCheck,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  Building2,
  CheckCircle2,
  KeyRound,
  Key,
} from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { adminLogin, isAdminAuthenticated } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const res = adminLogin(username, password);
      setIsSubmitting(false);

      if (res.success) {
        navigate('/admin', { replace: true });
      } else {
        setErrorMessage(res.error || 'Invalid username or password.');
      }
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center px-4 py-8 bg-[#f7f9fb] dark:bg-slate-950 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 to-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-[#003d9b] dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            <ArrowLeft size={14} /> Back to Citizen Portal
          </Link>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 px-2.5 py-1 rounded-full">
            <ShieldCheck size={13} /> Official Admin Gateway
          </span>
        </div>

        {/* Card Header */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#003d9b] to-[#0052cc] p-6 text-white text-center relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2.5 flex items-center justify-center text-emerald-300 shadow-inner">
              <Shield size={32} />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Municipal Admin Access</h1>
            <p className="text-blue-100 text-xs mt-1 max-w-xs mx-auto">
              Kolhapur Municipal Corporation Grievance Redressal & Command Console
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Demo Credentials Box */}
            <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Key size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Demo Admin Credentials</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs active:scale-95"
                >
                  <Sparkles size={11} />
                  <span>Auto Fill</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                <div className="bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900">
                  <span className="text-slate-400 block text-[10px] font-sans">Username</span>
                  <span className="font-bold text-slate-800 dark:text-emerald-300">admin</span>
                </div>
                <div className="bg-white/80 dark:bg-slate-900/80 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900">
                  <span className="text-slate-400 block text-[10px] font-sans">Password</span>
                  <span className="font-bold text-slate-800 dark:text-emerald-300">admin123</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 rounded-2xl p-3.5 flex items-start gap-3 text-red-700 dark:text-red-300 text-xs animate-in fade-in">
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold">Access Denied</p>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Username
                </label>
                <div className="relative">
                  <ShieldCheck size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Password
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none text-slate-900 dark:text-white font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#003d9b] to-[#0052cc] hover:from-[#00317e] hover:to-[#0041a3] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <LogIn size={18} />
                      <span>Log In to Admin Dashboard</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400 space-y-1">
              <p className="flex items-center justify-center gap-1 font-medium text-slate-500 dark:text-slate-400">
                <Building2 size={13} /> Kolhapur Municipal Corporation (KMC)
              </p>
              <p className="text-[11px]">Protected by 256-bit Municipal Security Protocols</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
