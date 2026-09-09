import React from 'react';
import { Trash2 } from 'lucide-react';
export const ExpenseTable = ({ expenses = [], onDelete }) => {
  if (expenses.length === 0) return <div className="p-8 text-center text-xs text-slate-500">No expenses recorded yet.</div>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-neutral-800">
      <table className="w-full text-xs text-left">
        <thead className="bg-slate-50 dark:bg-neutral-900 font-bold text-slate-500">
          <tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Date</th><th className="p-3 text-right">Amount</th><th className="p-3 text-center">Action</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-neutral-900">
          {expenses.map(e => (
            <tr key={e.id}>
              <td className="p-3 font-semibold">{e.title}</td>
              <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-[10px]">{e.category}</span></td>
              <td className="p-3 text-slate-400">{e.date}</td>
              <td className="p-3 text-right font-bold text-emerald-400">₹{Number(e.amount).toLocaleString()}</td>
              <td className="p-3 text-center"><button onClick={() => onDelete(e.id)} className="text-slate-400 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
