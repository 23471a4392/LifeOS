import React from 'react';
import { Palmtree, Briefcase, Compass, Car, Users, User } from 'lucide-react';
export const TRIP_TYPES = [
  { label: 'Vacation', icon: Palmtree }, { label: 'Business', icon: Briefcase },
  { label: 'Adventure', icon: Compass }, { label: 'Roadtrip', icon: Car },
  { label: 'Family', icon: Users }, { label: 'Solo', icon: User }
];
export const TripTypeSelector = ({ selectedType = 'Vacation', onSelect }) => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
    {TRIP_TYPES.map(({ label, icon: Icon }) => (
      <button key={label} type="button" onClick={() => onSelect(label)} className={`p-2 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1 ${selectedType === label ? 'bg-teal-500/10 border-teal-500 text-teal-400' : 'border-slate-200 dark:border-neutral-800 text-slate-400'}`}>
        <Icon className="w-4 h-4" /><span>{label}</span>
      </button>
    ))}
  </div>
);
