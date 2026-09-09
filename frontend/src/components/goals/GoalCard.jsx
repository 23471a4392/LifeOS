import React from 'react';
import { Target, Calendar, Trash2 } from 'lucide-react';
import { GoalStatusBadge } from './GoalStatusBadge';
import { MilestonesChecklist } from './MilestonesChecklist';
export const GoalCard = ({ goal, onUpdateMilestones, onDelete }) => (
  <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-3 text-xs">
    <div className="flex justify-between items-start">
      <div>
        <span className="text-[10px] font-bold text-indigo-400">{goal.pillar}</span>
        <h4 className="font-bold text-sm text-white">{goal.title}</h4>
        {goal.targetDate && <p className="text-[10px] text-slate-500 flex items-center gap-1"><Calendar className="w-3 h-3" /> {goal.targetDate}</p>}
      </div>
      <div className="flex items-center gap-1.5"><GoalStatusBadge status={goal.status} /><button onClick={() => onDelete(goal.id)} className="text-slate-400 hover:text-red-400"><Trash2 className="w-3 h-3" /></button></div>
    </div>
    <MilestonesChecklist milestones={goal.milestones || []} onAddMilestone={(m) => onUpdateMilestones(goal.id, [...(goal.milestones || []), m])} onToggleMilestone={(idx) => {
      const list = [...(goal.milestones || [])]; list[idx].completed = !list[idx].completed; onUpdateMilestones(goal.id, list);
    }} />
  </div>
);
