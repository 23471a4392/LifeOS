import React from 'react';
export const TaskPriorityBadge = ({ priority = 'P3' }) => {
  const code = priority.startsWith('P') ? priority.substring(0, 2) : 'P3';
  return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">{code}</span>;
};
