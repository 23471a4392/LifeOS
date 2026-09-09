import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export const ProtectedRoute = ({ isAuthenticated, onOpenAuth, children }) => {
  if (isAuthenticated) return children;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-md">
        <Lock className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Protected LifeOS Workspace</h3>
      <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mb-5">
        This area contains your personal encrypted records. Sign in to unlock.
      </p>
      <button
        onClick={onOpenAuth}
        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-lg cursor-pointer"
      >
        Sign In / Unlock
      </button>
    </div>
  );
};
