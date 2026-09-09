import React from 'react';
export const GoalStatusBadge = ({ status = 'In Progress' }) => (
  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{status}</span>
);
