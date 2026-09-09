import React from 'react';
import { Moon } from 'lucide-react';
export const SleepTrackerCard = ({ hours = 7.5 }) => (
  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs flex justify-between items-center">
    <span className="flex items-center gap-1.5"><Moon className="w-3.5 h-3.5 text-indigo-400" /> Sleep Duration</span>
    <span className="font-bold text-white">{hours} hrs / 8.0 hrs</span>
  </div>
);
