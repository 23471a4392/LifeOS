import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useLifeOS();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let Icon = CheckCircle2;
        let style = "bg-emerald-950/90 border-emerald-500/50 text-emerald-200 shadow-emerald-900/30";
        if (toast.type === 'error') {
          Icon = AlertCircle;
          style = "bg-red-950/90 border-red-500/50 text-red-200 shadow-red-900/30";
        } else if (toast.type === 'info') {
          Icon = Info;
          style = "bg-blue-950/90 border-blue-500/50 text-blue-200 shadow-blue-900/30";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md animate-slide-up text-xs font-medium ${style}`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
