import React, { useState } from 'react';
import { Plus } from 'lucide-react';
export const TripExpenseLogger = ({ expenses = [], onAddExpense }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const handleAdd = (e) => { e.preventDefault(); if (!title || !amount) return; onAddExpense({ title, amount: Number(amount) }); setTitle(''); setAmount(''); };
  return (
    <div className="space-y-2 text-xs">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Expense description" className="flex-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" className="w-20 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded-lg font-bold"><Plus className="w-3.5 h-3.5" /></button>
      </form>
    </div>
  );
};
