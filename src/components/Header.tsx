import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LanguageSelector } from './LanguageSelector';
import {
  Bell,
  Search,
  User,
  Shield,
  HelpCircle,
  Menu,
  Sun,
  Moon,
  X,
  LogOut,
  ChevronDown,
  Settings,
  Building2,
  Briefcase,
  MapPin,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    user,
    notifications,
    theme,
    toggleTheme,
    globalSearch,
    setGlobalSearch,
    setIsLiveChatOpen,
    switchUserRole,
    isAdminAuthenticated,
    adminLogout,
    isEmployeeAuthenticated,
  } = useApp();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate('/dashboard');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#003d9b] to-[#0052cc] p-1.5 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" fill="none" stroke="currentColor" strokeWidth="12" strokeLinejoin="round" />
                <path d="M35 50 L48 63 L68 38" fill="none" stroke="#6bff8f" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#003d9b] dark:text-blue-400 font-sans">
              Civora
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 ml-6 text-sm font-medium">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Citizen Dashboard
            </Link>
            <Link
              to="/complaint-register"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/complaint-register'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Complaints
            </Link>
            <Link
              to="/bill-payment"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/bill-payment'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Bills (₹)
            </Link>
            <Link
              to="/certificates"
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                location.pathname === '/certificates'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Certificates
            </Link>
            <Link
              to="/map"
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                location.pathname === '/map'
                  ? 'bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-400 font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <MapPin size={14} className="text-red-500" />
              Live Map
            </Link>
            <Link
              to={isEmployeeAuthenticated ? '/employee/dashboard' : '/employee/login'}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                location.pathname.startsWith('/employee')
                  ? 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-300 font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold'
              }`}
            >
              <Briefcase size={14} className="text-amber-600 dark:text-amber-400" />
              Staff
            </Link>
            <Link
              to={isAdminAuthenticated && user.role === 'admin' ? '/admin' : '/admin/login'}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                location.pathname.startsWith('/admin')
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300 font-bold'
                  : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 font-semibold'
              }`}
            >
              <Shield size={15} />
              Admin
            </Link>
          </nav>
        </div>

        {/* Search Bar (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs relative">
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Search services, bills..."
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-full border border-transparent focus:border-[#003d9b] focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
          />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </form>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <LanguageSelector />
          {/* Live Support Trigger */}
          <button
            onClick={() => setIsLiveChatOpen(true)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 dark:bg-slate-800 text-[#003d9b] dark:text-blue-300 hover:bg-blue-100 transition-colors"
            title="Live Support"
          >
            <HelpCircle size={15} />
            <span>Support</span>
          </button>

          {/* Role Switcher Badge / TO ADMIN button */}
          <button
            onClick={() => {
              if (user.role === 'citizen' || !isAdminAuthenticated) {
                navigate('/admin/login');
              } else {
                adminLogout();
                navigate('/');
              }
            }}
            className="hidden sm:flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300 transition-colors border border-emerald-200 dark:border-slate-700"
            title={user.role === 'admin' ? 'Click to log out of Admin' : 'Click to log in as Admin'}
          >
            <Shield size={12} className={user.role === 'admin' ? 'text-emerald-600' : 'text-blue-600'} />
            <span>{user.role === 'admin' ? 'Admin Mode' : 'TO ADMIN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Notification Alert Bell */}
          <Link
            to="/notifications"
            className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            )}
          </Link>

          {/* Profile Dropdown / Avatar */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#003d9b]/20"
              />
              <ChevronDown size={14} className="text-slate-500 hidden sm:block" />
            </button>

            {profileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-sm animate-in fade-in slide-in-from-top-2"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  <p className="text-[11px] font-medium text-emerald-600 mt-1">
                    {user.role === 'admin' ? 'Municipal Admin' : user.ward}
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <User size={16} />
                  <span>My Profile</span>
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>

                <Link
                  to="/about"
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Building2 size={16} />
                  <span>About KMC</span>
                </Link>

                <Link
                  to="/help"
                  className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <HelpCircle size={16} />
                  <span>Contact & Help</span>
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-emerald-700 dark:text-emerald-400 font-medium hover:bg-emerald-50 dark:hover:bg-slate-700"
                  >
                    <Shield size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}

                <div className="border-t border-slate-100 dark:border-slate-700 my-1"></div>

                <button
                  onClick={() => {
                    if (user.role === 'citizen' || !isAdminAuthenticated) {
                      navigate('/admin/login');
                    } else {
                      adminLogout();
                      navigate('/');
                    }
                  }}
                  className="w-full text-left flex items-center justify-between px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-700"
                >
                  <span>{user.role === 'citizen' ? 'Switch to Admin Portal' : 'Log Out Admin'}</span>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded uppercase font-bold text-[10px]">
                    {user.role === 'citizen' ? 'To Admin' : 'Exit Admin'}
                  </span>
                </button>

                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-slate-700"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl outline-none"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Citizen Dashboard
            </Link>
            <Link
              to="/water-schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Water Schedule
            </Link>
            <Link
              to="/garbage-schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Garbage Schedule
            </Link>
            <Link
              to="/complaint-register"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Register Complaint
            </Link>
            <Link
              to="/complaint-tracking"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Track Complaint
            </Link>
            <Link
              to="/bill-payment"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Pay Bills (₹)
            </Link>
            <Link
              to="/certificates"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Certificates
            </Link>
            <Link
              to="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Contact & Help
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              Settings
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
            >
              About KMC
            </Link>
            <Link
              to={isAdminAuthenticated && user.role === 'admin' ? '/admin' : '/admin/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-200 dark:border-emerald-800 flex items-center justify-between"
            >
              <span>Admin Portal</span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md font-extrabold uppercase">
                {user.role === 'admin' ? 'Active' : 'Login'}
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
