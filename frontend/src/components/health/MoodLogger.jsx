import React from 'react';
const EMOJIS = ['⚡ Vibrant', '😊 Good', '😐 Neutral', '😴 Tired'];
export const MoodLogger = ({ onSelect }) => (
  <div className="flex gap-2">
    {EMOJIS.map(e => <button key={e} onClick={() => onSelect(e)} className="px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs">{e}</button>)}
  </div>
);
