import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  Zap,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  QrCode,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, registerUser } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [identifier, setIdentifier] = useState('rohan.kumbhar@kolhapur.gov.in');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Rohan Kumbhar');
  const [mobile, setMobile] = useState('9876543210');
  const [state, setState] = useState('Maharashtra');
  const [city, setCity] = useState('Kolhapur');
  const [area, setArea] = useState('Kasba Bawada Main Road');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      registerUser({
        name: fullName,
        email: identifier.includes('@') ? identifier : `${fullName.toLowerCase().replace(/\s+/g, '.')}@kolhapur.gov.in`,
        mobile,
        area,
        state,
        city,
      });
    } else {
      setUser((prev) => ({
        ...prev,
        name: fullName || prev.name,
        email: identifier.includes('@') ? identifier : prev.email,
        mobile: mobile || prev.mobile,
      }));
    }
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row bg-[#f7f9fb] dark:bg-slate-900">
      {/* Left Hero (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#003d9b] to-[#0052cc] p-12 relative overflow-hidden items-center justify-center text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-[500px] h-[500px] bg-[#6bff8f] blur-[120px] rounded-full -top-48 -left-48 animate-pulse" />
          <div className="absolute w-[400px] h-[400px] bg-blue-300 blur-[100px] rounded-full bottom-0 right-0 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-md space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-3 flex items-center justify-center border border-white/20">
            <ShieldCheck size={36} className="text-[#6bff8f]" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Civora Digital Portal</h1>
          <p className="text-blue-100 leading-relaxed text-sm">
            The unified digital gateway for all municipal services. Efficient, transparent, and built for modern civic life.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs border border-white/10">
              <ShieldCheck size={20} className="mb-2 text-[#6bff8f]" />
              <p className="text-xs font-semibold">Verified Civic ID</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs border border-white/10">
              <Zap size={20} className="mb-2 text-[#6bff8f]" />
              <p className="text-xs font-semibold">Instant Processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-8 sm:px-12 bg-white dark:bg-slate-900">
        <div className="w-full max-w-md space-y-6">
          {/* Logo & Header */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#003d9b] p-2 flex items-center justify-center text-white">
                <ShieldCheck size={24} className="text-[#6bff8f]" />
              </div>
              <span className="font-extrabold text-2xl text-[#003d9b] dark:text-blue-400">Civora</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {isSignUp ? 'Create Civic Account' : 'Access Your Civic Services'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {isSignUp
                ? 'Sign up to submit complaints, pay taxes, and access digital certificates.'
                : 'Please log in to manage your reports and municipal services.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Rohan Kumbhar"
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      State
                    </label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none"
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
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none"
                    >
                      <option value="Kolhapur">Kolhapur</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Resident Area
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none font-medium text-slate-900 dark:text-white"
                    >
                      <option value="Kasba Bawada Main Road">Kasba Bawada Main Road</option>
                      <option value="Shivaji Nagar">Shivaji Nagar</option>
                      <option value="Market Area">Market Area</option>
                      <option value="Rajarampuri">Rajarampuri</option>
                      <option value="Bus Stand Area">Bus Stand Area</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number or Email
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your mobile number or email"
                  className="w-full pl-10 pr-3 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                {!isSignUp && (
                  <a href="#" className="text-xs font-medium text-[#003d9b] dark:text-blue-400 hover:underline">
                    Forgot Password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#003d9b] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  defaultChecked
                  className="rounded border-slate-300 text-[#003d9b] focus:ring-[#003d9b]"
                />
                <label htmlFor="remember" className="text-xs text-slate-600 dark:text-slate-400">
                  Keep me logged in
                </label>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full py-3 bg-[#003d9b] hover:bg-[#0052cc] text-white font-semibold text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>{isSignUp ? 'Create Account' : 'Login'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold text-sm rounded-xl transition-all"
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Sign Up for New Account'}
              </button>
            </div>
          </form>

          {/* Social / Direct Auth Options */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Are you a Municipal Officer?</p>
              <button
                type="button"
                onClick={() => navigate('/admin/login')}
                className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                <ShieldCheck size={14} /> Go to Admin Login Portal &rarr;
              </button>
            </div>

            <p className="text-center text-xs text-slate-400">Or continue with</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleSubmit}
                className="py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="font-bold text-slate-700 dark:text-slate-300">G</span> Google
              </button>
              <button
                onClick={handleSubmit}
                className="py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <QrCode size={16} className="text-slate-600" /> QR Access
              </button>
            </div>
          </div>

          <p className="text-center text-[11px] text-slate-400">
            By accessing Civora, you agree to our <a href="#" className="text-[#003d9b] hover:underline">Terms of Service</a> and <a href="#" className="text-[#003d9b] hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};
