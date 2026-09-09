import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { X, CheckCircle2, AlertCircle, Clock, Bell, Sparkles } from 'lucide-react';

export const NotificationCenter = () => {
  const { isNotificationCenterOpen, setIsNotificationCenterOpen, notifications = [] } = useLifeOS();

  if (!isNotificationCenterOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'urgent': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'reminder': return <Clock className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-indigo-500" />;
    }
  };

  const safeNotifs = Array.isArray(notifications) ? notifications : [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setIsNotificationCenterOpen(false)} />
      
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#0D0D0D] border-l border-slate-200 dark:border-neutral-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">System Notifications</h2>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">Real-time reminders, bills & task alerts</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsNotificationCenterOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {safeNotifs.length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-neutral-500 text-xs">
                No new notifications. Everything is in order!
              </div>
            ) : (
              safeNotifs.map(item => (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    item.read
                      ? 'bg-slate-50 dark:bg-neutral-900/40 border-slate-200 dark:border-neutral-800/80 opacity-75'
                      : 'bg-white dark:bg-neutral-900/80 border-slate-300 dark:border-neutral-700/80 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 dark:text-neutral-100">{item.title}</h4>
                        <span className="text-[10px] text-slate-400 dark:text-neutral-400 font-mono">{item.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1 leading-relaxed">{item.message}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-[#080808] text-center text-xs text-slate-500 dark:text-neutral-400">
            <span className="flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              LifeOS Intelligent Engine Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
