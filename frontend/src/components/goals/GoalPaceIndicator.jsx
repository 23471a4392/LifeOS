import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
export const GoalPaceIndicator = ({ risk = 'On Track' }) => (
  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${risk === 'Overdue' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
    {risk === 'Overdue' ? <AlertCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
    {risk}
  </span>
);
