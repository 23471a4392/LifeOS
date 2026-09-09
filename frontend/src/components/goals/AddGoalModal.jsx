import React, { useState } from 'react';
import { X, Target } from 'lucide-react';
const PILLARS = ['Career', 'Finance', 'Health', 'Learning', 'Personal'];
export const AddGoalModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState('');
  const [pillar, setPillar] = useState('Career');
  const [targetDate, setTargetDate] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault(); if (!title.trim()) return;
    onSave({ title: title.trim(), pillar, targetDate }); onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 space-y-3">
        <h3 className="text-base font-bold flex items-center gap-2"><Target className="w-4 h-4 text-indigo-400" /> New Life Goal</h3>
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Goal Objective" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <select value={pillar} onChange={e => setPillar(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
            {PILLARS.map(p => <option key={p}>{p}</option>)}
          </select>
          <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-4 py-1.5 bg-indigo-600 text-white font-bold rounded-xl cursor-pointer">Save Goal</button>
          </div>
        </form>
      </div>
    </div>
  );
};
