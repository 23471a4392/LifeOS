import React from 'react';
const S = ['All', 'Planning', 'Booked', 'In Progress', 'Completed'];
export const TripFilterPills = ({ currentStatus = 'All', onSelect }) => (
  <div className="flex gap-1.5 overflow-x-auto">
    {S.map(s => (
      <button key={s} onClick={() => onSelect(s)} className={`px-3 py-1 rounded-xl text-xs font-semibold ${currentStatus === s ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-neutral-900 text-slate-400'}`}>{s}</button>
    ))}
  </div>
);
