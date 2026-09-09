import React from 'react';
export const DecisionRiskMatrix = ({ risks = [{ factor: 'Higher Commute', level: 'Medium', mitigation: '2 days WFH' }] }) => (
  <div className="space-y-1.5 text-xs">
    {risks.map((r, i) => (
      <div key={i} className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
        <span>{r.factor} (Mitigation: {r.mitigation})</span>
        <span className="font-bold text-amber-400">{r.level}</span>
      </div>
    ))}
  </div>
);
