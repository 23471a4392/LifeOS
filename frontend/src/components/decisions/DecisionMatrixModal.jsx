import React, { useState } from 'react';
import { X, Scale } from 'lucide-react';
import { calculateDecisionScores } from '../../services/decisionScoringEngine';

export const DecisionMatrixModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState('');
  const [opt1, setOpt1] = useState('Option A');
  const [opt2, setOpt2] = useState('Option B');

  const handleSubmit = (e) => {
    e.preventDefault(); if (!title) return;
    const dec = calculateDecisionScores({
      title, options: [
        { name: opt1, scores: { salary: 8, growth: 9, balance: 6 } },
        { name: opt2, scores: { salary: 7, growth: 8, balance: 8 } }
      ]
    });
    onSave(dec); onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold flex items-center gap-1.5"><Scale className="w-4 h-4 text-purple-400" /> Compare Choices</h4>
        <form onSubmit={handleSubmit} className="space-y-2.5 text-xs">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Decision title" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <div className="grid grid-cols-2 gap-2">
            <input value={opt1} onChange={e => setOpt1(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
            <input value={opt2} onChange={e => setOpt2(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-4 py-1.5 bg-purple-600 text-white font-bold rounded-xl cursor-pointer">Score Choices</button>
          </div>
        </form>
      </div>
    </div>
  );
};
