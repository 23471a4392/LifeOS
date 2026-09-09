import React from 'react';
import { Award } from 'lucide-react';
export const TradeOffInsightsCard = ({ recommendation }) => {
  if (!recommendation) return null;
  return (
    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex justify-between items-center">
      <div className="flex items-center gap-2"><Award className="w-4 h-4 text-purple-400" /> <span>Recommended: {recommendation.winner}</span></div>
      <span className="font-bold text-white">{recommendation.confidence}% Match</span>
    </div>
  );
};
