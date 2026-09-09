import React, { useState } from 'react';
import { Plus, CheckCircle2, Trash2 } from 'lucide-react';
export const ItineraryPlanner = ({ itinerary = [], onAddItem, onToggleItem, onDeleteItem }) => {
  const [day, setDay] = useState(1);
  const [time, setTime] = useState('10:00 AM');
  const [activity, setActivity] = useState('');
  const handleAdd = (e) => { e.preventDefault(); if (!activity) return; onAddItem({ day, time, activity, completed: false }); setActivity(''); };
  return (
    <div className="space-y-3 text-xs">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input type="number" min="1" value={day} onChange={e => setDay(e.target.value)} className="w-14 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <input value={activity} onChange={e => setActivity(e.target.value)} placeholder="Stop activity" className="flex-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded-lg font-bold"><Plus className="w-3.5 h-3.5" /></button>
      </form>
      <div className="space-y-1.5">
        {itinerary.map((item, idx) => (
          <div key={idx} className="flex justify-between p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
            <button onClick={() => onToggleItem(idx)} className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${item.completed ? 'text-teal-400' : 'text-slate-400'}`} />
              <span className={item.completed ? 'line-through text-slate-500' : ''}>Day {item.day} - {item.activity}</span>
            </button>
            <button onClick={() => onDeleteItem(idx)} className="text-slate-400 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};
