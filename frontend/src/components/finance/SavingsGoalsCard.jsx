import React from 'react';
import { Target } from 'lucide-react';
export const SavingsGoalsCard = ({ goals = [{ name: 'Emergency Reserve', current: 150000, target: 300000 }] }) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-3 text-xs">
    <h4 className="font-bold flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-emerald-400" /> Savings Goals</h4>
    {goals.map(g => {
      const pct = Math.min(100, Math.round((g.current / g.target) * 100));
      return (
        <div key={g.name} className="space-y-1">
          <div className="flex justify-between font-semibold"><span>{g.name}</span><span className="text-emerald-400">{pct}%</span></div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      );
    })}
  </div>
);
