import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export const AuthNotificationToast = ({ notification, onDismiss }) => {
  if (!notification) return null;
  const isSecurity = notification.type === 'security';
  return (
    <div role="status" aria-live="polite" className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-2xl text-xs font-medium">
      {isSecurity ? <ShieldAlert className="w-5 h-5 text-amber-500" /> : <ShieldCheck className="w-5 h-5 text-emerald-500" />}
      <span className="text-slate-800 dark:text-neutral-200">{notification.message}</span>
      <button onClick={onDismiss} className="text-slate-400 hover:text-white text-xs ml-2 cursor-pointer">×</button>
    </div>
  );
};
