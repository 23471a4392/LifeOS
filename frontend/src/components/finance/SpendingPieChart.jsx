import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6'];
export const SpendingPieChart = ({ categoryTotals = {} }) => {
  const data = Object.keys(categoryTotals).map((cat, i) => ({ name: cat, value: categoryTotals[cat], color: COLORS[i % COLORS.length] }));
  if (data.length === 0) return <div className="h-40 flex items-center justify-center text-xs text-slate-500">No data</div>;
  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={40} outerRadius={65} dataKey="value">
            {data.map((entry, idx) => <Cell key={`cell-${idx}`} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(v) => `₹${Number(v).toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
