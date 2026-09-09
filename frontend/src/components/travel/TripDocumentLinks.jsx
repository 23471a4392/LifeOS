import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
export const TripDocumentLinks = ({ documents = [] }) => (
  <div className="space-y-1.5 text-xs">
    {documents.map((d, i) => (
      <div key={i} className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
        <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-teal-400" /> {d.title}</span>
        <span className="text-slate-400 font-mono text-[10px]">{d.refNumber || 'CONFIRMED'}</span>
      </div>
    ))}
  </div>
);
