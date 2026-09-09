import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthAlertBanner = ({ type = 'success', message }) => {
  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <div className={`p-3 rounded-xl flex items-start gap-2.5 text-xs font-medium ${
      isSuccess 
        ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
        : 'bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400'
    }`}>
      {isSuccess ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
      <span>{message}</span>
    </div>
  );
};
