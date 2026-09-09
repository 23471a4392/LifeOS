import React from 'react';
import { Clock } from 'lucide-react';
export const DeadlineCountdownTag = ({ deadline }) => {
  if (!deadline) return null;
  const diff = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  return <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-500/10 text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{diff}d left</span>;
};
