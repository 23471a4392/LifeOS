import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ProfileCompletionWidget = ({ user }) => {
  const steps = [
    { label: 'Set Full Name', done: !!user?.name },
    { label: 'Verify Email', done: !!user?.email },
    { label: 'Choose Professional Avatar', done: !!user?.avatar && !user.avatar.includes('default') },
    { label: 'Add Role / Bio', done: !!user?.bio || !!user?.role },
    { label: 'Set Currency Preference', done: !!user?.currency }
  ];
  const completed = steps.filter(s => s.done).length;
  const percent = Math.round((completed / steps.length) * 100);

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-2">
      <div className="flex justify-between items-center text-xs font-bold">
        <span>Profile Setup</span>
        <span className="text-emerald-500">{percent}% Complete</span>
      </div>
      <div className="h-1.5 w-full bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};
