import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export const AccessibilityControls = () => {
  const [highContrast, setHighContrast] = useState(false);
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-3">
      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
        <Eye className="w-4 h-4 text-teal-400" />
        Accessibility & Visual Preferences
      </h4>
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-600 dark:text-neutral-400">High Contrast Mode</span>
        <button onClick={() => setHighContrast(!highContrast)} className={`px-3 py-1 rounded-lg text-xs font-bold ${highContrast ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-neutral-800 text-slate-400'}`}>
          {highContrast ? 'Enabled' : 'Disabled'}
        </button>
      </div>
    </div>
  );
};
