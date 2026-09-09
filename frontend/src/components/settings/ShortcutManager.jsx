import React from 'react';
import { Command } from 'lucide-react';

export const PLATFORM_SHORTCUTS = [
  { combo: 'Ctrl + K', desc: 'Open Command Palette & Global Search' },
  { combo: 'Ctrl + N', desc: 'Quick Add Task, Expense or Note' },
  { combo: 'Ctrl + B', desc: 'Toggle Navigation Sidebar' },
  { combo: 'Ctrl + /', desc: 'Open Keyboard Shortcuts Cheat Sheet' }
];

export const ShortcutManager = () => {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-3">
      <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
        <Command className="w-4 h-4 text-indigo-400" />
        Global Keyboard Shortcuts
      </h4>
      <div className="space-y-2">
        {PLATFORM_SHORTCUTS.map(s => (
          <div key={s.combo} className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-neutral-400">{s.desc}</span>
            <kbd className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 font-mono font-bold text-[10px]">{s.combo}</kbd>
          </div>
        ))}
      </div>
    </div>
  );
};
