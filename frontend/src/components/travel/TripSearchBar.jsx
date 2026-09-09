import React from 'react';
import { Search } from 'lucide-react';
export const TripSearchBar = ({ query, onChange }) => (
  <div className="relative flex-1">
    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
    <input value={query} onChange={e => onChange(e.target.value)} placeholder="Search trips..." className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0c]" />
  </div>
);
