import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Grid, AlertTriangle, Bell, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { notifications } = useApp();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 py-1.5 px-4 shadow-lg md:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-90 ${
              isActive
                ? 'bg-[#6bff8f] text-[#007432] font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-[#003d9b]'
            }`
          }
        >
          <Home size={20} />
          <span className="text-[11px] mt-0.5">Home</span>
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-90 ${
              isActive
                ? 'bg-[#6bff8f] text-[#007432] font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-[#003d9b]'
            }`
          }
        >
          <Grid size={20} />
          <span className="text-[11px] mt-0.5">Services</span>
        </NavLink>

        <NavLink
          to="/complaint-register"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-90 ${
              isActive
                ? 'bg-[#6bff8f] text-[#007432] font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-[#003d9b]'
            }`
          }
        >
          <AlertTriangle size={20} />
          <span className="text-[11px] mt-0.5">Complaints</span>
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-90 relative ${
              isActive
                ? 'bg-[#6bff8f] text-[#007432] font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-[#003d9b]'
            }`
          }
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-600 rounded-full" />
          )}
          <span className="text-[11px] mt-0.5">Alerts</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all active:scale-90 ${
              isActive
                ? 'bg-[#6bff8f] text-[#007432] font-semibold'
                : 'text-slate-600 dark:text-slate-400 hover:text-[#003d9b]'
            }`
          }
        >
          <User size={20} />
          <span className="text-[11px] mt-0.5">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
};
