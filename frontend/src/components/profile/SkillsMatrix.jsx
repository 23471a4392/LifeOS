import React from 'react';
import { Award } from 'lucide-react';

export const SkillsMatrix = ({ skills = [
  { name: 'Full-Stack Architecture', level: 90 },
  { name: 'System Design', level: 85 },
  { name: 'Cloud Infrastructure', level: 80 }
] }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
        <Award className="w-4 h-4 text-emerald-500" />
        Technical & Domain Skills
      </h4>
      <div className="space-y-2">
        {skills.map(s => (
          <div key={s.name} className="space-y-1 text-xs">
            <div className="flex justify-between font-semibold text-slate-700 dark:text-neutral-300">
              <span>{s.name}</span>
              <span className="text-emerald-500">{s.level}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
