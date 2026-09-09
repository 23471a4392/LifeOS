import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
export const IncomeEditorModal = ({ isOpen, onClose, currentIncome = 0, onSave }) => {
  if (!isOpen) return null;
  const [income, setIncome] = useState(currentIncome || '');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-5 space-y-3">
        <h4 className="text-sm font-bold flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-emerald-500" /> Monthly Income</h4>
        <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="Income (₹)" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 text-xs" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs">Cancel</button>
          <button onClick={() => { onSave(Number(income) || 0); onClose(); }} className="px-4 py-1.5 bg-emerald-600 text-white font-bold rounded-xl text-xs cursor-pointer">Save</button>
        </div>
      </div>
    </div>
  );
};
