import React from 'react';
export const TripBudgetProgressBar = ({ budget = 0, spent = 0 }) => {
  const pct = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  return (
    <div className="space-y-1 text-xs">
      <div className="flex justify-between font-semibold">
        <span>Spent: ₹{Number(spent).toLocaleString()} / ₹{Number(budget).toLocaleString()}</span>
        <span className={spent > budget ? 'text-red-400' : 'text-teal-400'}>{pct}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full ${spent > budget ? 'bg-red-500' : 'bg-teal-500'}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};
