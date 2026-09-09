import React from 'react';
import { Droplet, Plus } from 'lucide-react';
export const HydrationLogger = ({ currentMl = 1500, goalMl = 3000, onAddWater }) => (
  <div className="p-3 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 flex justify-between items-center text-xs">
    <div className="flex items-center gap-2"><Droplet className="w-4 h-4 text-cyan-400" /> <span>{currentMl} / {goalMl} ml</span></div>
    <button onClick={() => onAddWater(250)} className="px-2.5 py-1 bg-cyan-600 text-white rounded-lg font-bold flex items-center gap-1"><Plus className="w-3 h-3" /> +250ml</button>
  </div>
);
