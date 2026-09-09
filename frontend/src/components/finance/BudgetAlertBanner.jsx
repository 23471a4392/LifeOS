import React from 'react';
import { AlertTriangle } from 'lucide-react';
export const BudgetAlertBanner = ({ totalOutflow = 0, monthlyIncome = 0 }) => {
  if (monthlyIncome <= 0) return null;
  const ratio = totalOutflow / monthlyIncome;
  if (ratio > 1) return <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Deficit Alert: Expenses exceed income!</div>;
  if (ratio > 0.8) return <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Warning: {Math.round(ratio * 100)}% of budget utilized.</div>;
  return null;
};
