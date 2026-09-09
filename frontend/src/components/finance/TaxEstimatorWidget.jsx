import React from 'react';
import { Receipt } from 'lucide-react';
export const TaxEstimatorWidget = ({ annualIncome = 800000 }) => {
  const taxEst = annualIncome > 700000 ? Math.round((annualIncome - 700000) * 0.1) : 0;
  return (
    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs flex justify-between items-center">
      <div className="flex items-center gap-2"><Receipt className="w-4 h-4 text-emerald-400" /> <span>Estimated Tax (FY 2026-27)</span></div>
      <span className="font-bold text-white">₹{taxEst.toLocaleString()}</span>
    </div>
  );
};
