import React from 'react';
const D = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
export const HabitHeatmap = ({ history = [true, true, true, false, true, true, false] }) => (
  <div className="flex gap-1">
    {D.map((d, i) => (
      <div key={i} className={`w-5 h-5 rounded text-[9px] flex items-center justify-center font-bold ${history[i] ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-400'}`}>{d}</div>
    ))}
  </div>
);
