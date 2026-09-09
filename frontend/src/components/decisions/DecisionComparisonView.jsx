import React from 'react';
export const DecisionComparisonView = ({ options = [] }) => (
  <div className="grid grid-cols-2 gap-3 text-xs">
    {options.map((opt, i) => (
      <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0c] space-y-1">
        <div className="flex justify-between font-bold"><span>{opt.name}</span><span className="text-purple-400">{opt.overallScore || 75}%</span></div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500" style={{ width: `${opt.overallScore || 75}%` }} />
        </div>
      </div>
    ))}
  </div>
);
