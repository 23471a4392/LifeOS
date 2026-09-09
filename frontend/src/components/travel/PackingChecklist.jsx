import React, { useState } from 'react';
import { Plus, CheckCircle2, Trash2 } from 'lucide-react';
export const PackingChecklist = ({ packingList = [], onAddItem, onToggleItem, onDeleteItem }) => {
  const [item, setItem] = useState('');
  const handleAdd = (e) => { e.preventDefault(); if (!item) return; onAddItem({ name: item, packed: false }); setItem(''); };
  return (
    <div className="space-y-3 text-xs">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input value={item} onChange={e => setItem(e.target.value)} placeholder="Item name" className="flex-1 px-2 py-1 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <button type="submit" className="px-3 py-1 bg-teal-600 text-white rounded-lg font-bold"><Plus className="w-3.5 h-3.5" /></button>
      </form>
      <div className="space-y-1.5">
        {packingList.map((p, i) => (
          <div key={i} className="flex justify-between p-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900">
            <button onClick={() => onToggleItem(i)} className="flex items-center gap-2">
              <CheckCircle2 className={`w-3.5 h-3.5 ${p.packed ? 'text-teal-400' : 'text-slate-400'}`} />
              <span className={p.packed ? 'line-through text-slate-500' : ''}>{p.name}</span>
            </button>
            <button onClick={() => onDeleteItem(i)} className="text-slate-400 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};
