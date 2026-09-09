import React from 'react';
export const BudgetEnvelopeManager = ({ envelopes = [
  { category: 'Food & Dining', allocated: 12000, spent: 8500 },
  { category: 'Shopping', allocated: 8000, spent: 4500 }
] }) => (
  <div className="space-y-2 text-xs">
    <h4 className="font-bold text-slate-800 dark:text-neutral-200">Budget Envelopes</h4>
    {envelopes.map(env => (
      <div key={env.category} className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 flex justify-between">
        <span>{env.category}</span>
        <span className="font-bold">₹{env.spent} / ₹{env.allocated}</span>
      </div>
    ))}
  </div>
);
