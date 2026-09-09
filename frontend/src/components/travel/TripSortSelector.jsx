import React from 'react';
export const TripSortSelector = ({ sortBy, onChange }) => (
  <select value={sortBy} onChange={e => onChange(e.target.value)} className="px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#0c0c0c]">
    <option value="date-desc">Newest First</option>
    <option value="date-asc">Oldest First</option>
    <option value="budget-high">Budget: High to Low</option>
    <option value="budget-low">Budget: Low to High</option>
  </select>
);
