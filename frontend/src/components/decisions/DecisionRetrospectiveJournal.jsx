import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
export const DecisionRetrospectiveJournal = ({ lessons = [], onAdd }) => {
  const [note, setNote] = useState('');
  return (
    <div className="space-y-2 text-xs">
      <h5 className="font-bold flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Retrospective Log</h5>
      <input value={note} onChange={e => setNote(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { onAdd(note); setNote(''); } }} placeholder="Record outcome lesson..." className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
    </div>
  );
};
