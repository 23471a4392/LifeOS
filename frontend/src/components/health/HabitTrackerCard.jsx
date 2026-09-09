import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';
export const HabitTrackerCard = ({ habit, onToggle }) => (
  <div className="flex justify-between items-center p-3 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 text-xs">
    <div className="flex items-center gap-2">
      <CheckCircle2 onClick={() => onToggle(habit.id)} className={`w-4 h-4 cursor-pointer ${habit.todayCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
      <span className={habit.todayCompleted ? 'line-through text-slate-500 font-bold' : 'font-bold'}>{habit.name}</span>
    </div>
    <span className="flex items-center gap-1 font-bold text-orange-500"><Flame className="w-3.5 h-3.5 fill-orange-500" /> {habit.streak || 0}d</span>
  </div>
);
