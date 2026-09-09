import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { validateExpensePayload } from '../../services/expenseValidator';

const CATS = ['Food & Dining', 'Housing & Rent', 'Utilities & Bills', 'Travel & Fuel', 'Shopping', 'Health', 'Learning'];

export const AddExpenseModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATS[0]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid } = validateExpensePayload({ title, amount });
    if (!isValid) return;
    onSave({ title, amount: Number(amount), category, date });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-neutral-800">
          <h3 className="text-base font-bold flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-500" /> Add Expense</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Merchant / Item" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (₹)" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-white font-bold rounded-xl cursor-pointer">Record</button>
          </div>
        </form>
      </div>
    </div>
  );
};
