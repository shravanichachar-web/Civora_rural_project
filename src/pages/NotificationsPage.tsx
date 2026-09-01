import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  AlertTriangle,
  Droplet,
  Truck,
  Megaphone,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const { user, notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useApp();
  const [filterMode, setFilterMode] = useState<'all' | 'myArea' | 'unread'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = notifications.filter((n) => {
    // Mode filter
    if (filterMode === 'myArea') {
      if (n.area && n.area !== 'All Areas' && user.area && n.area.toLowerCase() !== user.area.toLowerCase()) {
        return false;
      }
    } else if (filterMode === 'unread') {
      if (n.read) return false;
    }

    // Category filter
    if (categoryFilter !== 'all') {
      if (n.type !== categoryFilter) return false;
    }

    return true;
  });

  const getIconForNotif = (type: NotificationItem['type']) => {
    switch (type) {
      case 'emergency':
        return AlertTriangle;
      case 'water':
        return Droplet;
      case 'garbage':
        return Truck;
      case 'announcement':
        return Megaphone;
      default:
        return Bell;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const userAreaNotificationsCount = notifications.filter(
    (n) => !n.area || n.area === 'All Areas' || (user.area && n.area.toLowerCase() === user.area.toLowerCase())
  ).length;

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Notification Center
            </h1>
            <span className="px-3 py-1 rounded-full bg-[#003d9b]/10 text-[#003d9b] dark:bg-blue-900/40 dark:text-blue-300 text-xs font-bold">
              {user.area || 'Kasba Bawada Main Road'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time area alerts for water supply, garbage truck arrival, and municipal updates.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2.5 bg-[#003d9b] text-white hover:bg-[#0052cc] text-xs font-semibold rounded-2xl flex items-center gap-2 transition-all shadow-xs shrink-0"
        >
          <CheckCheck size={16} /> Mark All as Read
        </button>
      </div>

      {/* Main Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filterMode === 'all'
              ? 'bg-[#003d9b] text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Notifications ({notifications.length})
        </button>

        <button
          onClick={() => setFilterMode('myArea')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filterMode === 'myArea'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <MapPin size={14} /> My Area Notifications ({userAreaNotificationsCount})
        </button>

        <button
          onClick={() => setFilterMode('unread')}
          className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
            filterMode === 'unread'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          <Sparkles size={14} /> Unread ({unreadCount})
        </button>
      </div>

      {/* Category Sub-Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            categoryFilter === 'all'
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          All Types
        </button>
        <button
          onClick={() => setCategoryFilter('water')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            categoryFilter === 'water'
              ? 'bg-blue-100 dark:bg-blue-900/60 text-[#003d9b] dark:text-blue-300'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          💧 Water Supply
        </button>
        <button
          onClick={() => setCategoryFilter('garbage')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            categoryFilter === 'garbage'
              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          🗑️ Garbage Collection
        </button>
        <button
          onClick={() => setCategoryFilter('emergency')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            categoryFilter === 'emergency'
              ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
          }`}
        >
          ⚠️ Emergency Alerts
        </button>
      </div>

      {/* Notifications Stream */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 space-y-3">
          <Bell className="mx-auto text-slate-300 dark:text-slate-600" size={48} />
          <h3 className="text-base font-bold text-slate-800 dark:text-white">No notifications match your filter</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching filters or checking back later for new municipal schedule updates.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => {
            const IconComp = getIconForNotif(item.type);
            const isUserArea = !item.area || item.area === 'All Areas' || (user.area && item.area.toLowerCase() === user.area.toLowerCase());

            return (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all relative overflow-hidden ${
                  !item.read
                    ? 'bg-white dark:bg-slate-800 border-[#003d9b]/30 shadow-md'
                    : 'bg-slate-50/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-90'
                }`}
              >
                {!item.read && (
                  <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#003d9b]" />
                )}

                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${
                      item.type === 'emergency'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                        : item.type === 'water'
                        ? 'bg-blue-100 text-[#003d9b] dark:bg-slate-700 dark:text-blue-300'
                        : item.type === 'garbage'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                    }`}
                  >
                    <IconComp size={22} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-slate-900 dark:text-white">
                            {item.title}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              !item.read
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {!item.read ? 'UNREAD' : 'READ'}
                          </span>
                        </div>

                        {/* Metadata badges */}
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                          <span className="flex items-center gap-1 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-lg text-slate-700 dark:text-slate-300">
                            <MapPin size={12} className="text-[#003d9b]" />
                            {item.area || 'All Areas'}
                            {isUserArea && <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">(Your Area)</span>}
                          </span>

                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {item.date || 'Today'}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.time || item.timeAgo}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1">
                        {!item.read && (
                          <button
                            onClick={() => markNotificationRead(item.id)}
                            title="Mark as Read"
                            className="p-1.5 text-slate-400 hover:text-[#003d9b] hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-all"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(item.id)}
                          title="Delete Notification"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-normal">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
