import React from 'react';
import { PhoneCall } from 'lucide-react';
export const EmergencyContactsCard = ({ contacts = [{ name: 'Police Helpline', number: '112' }] }) => (
  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2 text-xs">
    <span className="font-bold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-teal-400" /> Emergency Numbers</span>
    {contacts.map((c, i) => (
      <div key={i} className="flex justify-between text-slate-400"><span>{c.name}</span><span className="font-mono text-white">{c.number}</span></div>
    ))}
  </div>
);
