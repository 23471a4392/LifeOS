import React from 'react';
const COLS = ['To Do', 'In Progress', 'Done'];
export const KanbanBoardView = ({ tasks = [] }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
    {COLS.map(c => (
      <div key={c} className="p-3 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-2">
        <h5 className="font-bold text-xs">{c}</h5>
        <div className="space-y-1.5">
          {tasks.filter(t => (c === 'Done' ? t.completed : !t.completed)).map(t => (
            <div key={t.id} className="p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 text-xs">{t.title}</div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
