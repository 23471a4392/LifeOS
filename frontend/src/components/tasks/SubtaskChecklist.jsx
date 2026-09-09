import React from 'react';
import { CheckCircle2 } from 'lucide-react';
export const SubtaskChecklist = ({ subtasks = [], onToggle }) => (
  <div className="space-y-1 text-xs">
    {subtasks.map((st, i) => (
      <div key={i} className="flex items-center gap-2">
        <CheckCircle2 onClick={() => onToggle(i)} className={`w-3.5 h-3.5 cursor-pointer ${st.completed ? 'text-emerald-400' : 'text-slate-400'}`} />
        <span className={st.completed ? 'line-through text-slate-500' : ''}>{st.title}</span>
      </div>
    ))}
  </div>
);
