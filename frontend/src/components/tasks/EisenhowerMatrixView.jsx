import React from 'react';
import { classifyQuadrant } from '../../services/eisenhowerClassifier';
import { CheckCircle2 } from 'lucide-react';
const QUADS = [
  { id: 'Q1_DO_FIRST', label: 'Do First (Urgent & Important)', color: 'border-red-500/30' },
  { id: 'Q2_SCHEDULE', label: 'Schedule (Not Urgent & Important)', color: 'border-emerald-500/30' },
  { id: 'Q3_DELEGATE', label: 'Delegate (Urgent & Not Important)', color: 'border-amber-500/30' },
  { id: 'Q4_ELIMINATE', label: 'Don\'t Do (Neither)', color: 'border-slate-500/30' }
];
export const EisenhowerMatrixView = ({ tasks = [], onToggleTask }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    {QUADS.map(q => {
      const qTasks = tasks.filter(t => classifyQuadrant(t) === q.id);
      return (
        <div key={q.id} className={`p-3 rounded-2xl border ${q.color} bg-white dark:bg-[#0c0c0c] space-y-2`}>
          <h4 className="text-[11px] font-bold text-slate-400">{q.label} ({qTasks.length})</h4>
          <div className="space-y-1">
            {qTasks.map(t => (
              <div key={t.id} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-50 dark:bg-neutral-900 text-xs">
                <CheckCircle2 onClick={() => onToggleTask(t.id)} className={`w-3.5 h-3.5 cursor-pointer ${t.completed ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className={t.completed ? 'line-through text-slate-500' : ''}>{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
);
