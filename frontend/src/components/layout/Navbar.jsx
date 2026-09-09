import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { useTheme } from '../../context/ThemeContext';
import { Search, Bell, Plus, Sparkles, LogIn, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { 
    user, 
    lifeScore, 
    notifications, 
    setIsCommandPaletteOpen, 
    setIsNotificationCenterOpen, 
    setIsQuickAddOpen,
    isAuthenticated,
    setIsAuthModalOpen,
    setIsReportModalOpen,
    logout
  } = useLifeOS();
  const { theme, setTheme } = useTheme();

  const unreadNotifsCount = (notifications || []).filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-neutral-800 transition-colors duration-200">
      {/* Search trigger & Command Palette button */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <button
          type="button"
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-3 w-full px-3.5 py-1.5 text-sm text-slate-500 dark:text-neutral-400 bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-200/60 dark:hover:bg-neutral-800 transition-all group shadow-inner cursor-pointer"
        >
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-400 group-hover:text-emerald-500 transition-colors" />
          <span className="flex-1 text-left">Search tasks, decisions, notes...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-neutral-400 bg-slate-200 dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-md">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Dynamic Life Score Pill */}
        {lifeScore && isAuthenticated && (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 animate-pulse" />
            <span>Life Score:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-sm">{lifeScore.overall}%</span>
          </div>
        )}

        {/* Generate Report Button */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            title="Generate Executive PDF Report"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Report</span>
          </button>
        )}

        {/* Quick Add Button */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsQuickAddOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-500/30 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Quick Add</span>
          </button>
        )}



        {/* Notifications Bell */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsNotificationCenterOpen(true)}
            className="relative p-2 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-neutral-100 hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-xl transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white dark:ring-black">
                {unreadNotifsCount}
              </span>
            )}
          </button>
        )}

        {/* Authentication Section: Login vs Profile Avatar */}
        {isAuthenticated ? (
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200 dark:border-neutral-800">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"}
              alt={user?.name || "Profile"}
              className="w-8 h-8 rounded-xl object-cover ring-1 ring-emerald-500/40"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-800 dark:text-neutral-200 leading-tight">{user?.name || "Ramya Sri"}</div>
              <div className="text-[10px] text-slate-500 dark:text-neutral-400 leading-tight">{user?.role || "Senior Engineer"}</div>
            </div>
            <button
              type="button"
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-neutral-900 rounded-lg transition-colors ml-1 cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
