import React, { useState } from 'react';
import { Plus, CheckCircle2 } from 'lucide-react';
export const MilestonesChecklist = ({ milestones = [], onAddMilestone, onToggleMilestone }) => {
  const [text, setText] = useState('');
  const handleAdd = (e) => { e.preventDefault(); if (!text) return; onAddMilestone({ title: text, completed: false }); setText(''); };
  const done = milestones.filter(m => m.completed).length;
  const pct = milestones.length > 0 ? Math.round((done / milestones.length) * 100) : 0;
  return (
    <div className="space-y-2 text-xs">
      <div className="flex justify-between font-semibold"><span>Milestones</span><span className="text-indigo-400">{pct}%</span></div>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Milestone step" className="flex-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <button type="submit" className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold"><Plus className="w-3.5 h-3.5" /></button>
      </form>
      <div className="space-y-1">
        {milestones.map((m, i) => (
          <div key={i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-neutral-900">
            <CheckCircle2 onClick={() => onToggleMilestone(i)} className={`w-3.5 h-3.5 cursor-pointer ${m.completed ? 'text-indigo-400' : 'text-slate-400'}`} />
            <span className={m.completed ? 'line-through text-slate-500' : ''}>{m.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
