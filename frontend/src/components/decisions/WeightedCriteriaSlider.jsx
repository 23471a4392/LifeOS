import React from 'react';
export const WeightedCriteriaSlider = ({ label, value = 5, onChange }) => (
  <div className="space-y-1 text-xs">
    <div className="flex justify-between font-semibold"><span>{label}</span><span className="text-purple-400">{value}/10</span></div>
    <input type="range" min="1" max="10" value={value} onChange={e => onChange(Number(e.target.value))} className="w-full accent-purple-500" />
  </div>
);
