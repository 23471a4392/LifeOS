import React from 'react';
import { checkPasswordStrength } from '../../services/passwordStrength';

export const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;
  const { score, label, color } = checkPasswordStrength(password);
  const percentage = Math.min(100, (score / 5) * 100);

  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex justify-between text-[10px] font-medium text-slate-500 dark:text-neutral-400">
        <span>Password Strength</span>
        <span className={score >= 4 ? 'text-emerald-500' : score >= 3 ? 'text-amber-500' : 'text-red-500'}>{label}</span>
      </div>
      <div className="h-1 w-full bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
