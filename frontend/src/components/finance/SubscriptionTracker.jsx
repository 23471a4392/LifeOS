import React from 'react';
import { Calendar, CreditCard } from 'lucide-react';
export const SubscriptionTracker = ({ subscriptions = [
  { name: 'Netflix Premium', amount: 649, dueDay: 15 },
  { name: 'Broadband Fiber', amount: 999, dueDay: 20 },
  { name: 'Electricity Bill', amount: 2400, dueDay: 28 }
] }) => (
  <div className="space-y-2 text-xs">
    <h4 className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-neutral-200"><Calendar className="w-3.5 h-3.5 text-blue-400" /> Active Subscriptions & Bills</h4>
    <div className="space-y-1.5">
      {subscriptions.map(s => (
        <div key={s.name} className="flex justify-between items-center p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
          <span>{s.name} (Due {s.dueDay}th)</span>
          <span className="font-bold text-white">₹{s.amount}/mo</span>
        </div>
      ))}
    </div>
  </div>
);
