import React from 'react';
import { Sun, CloudRain, Cloud } from 'lucide-react';
export const TripWeatherWidget = ({ destination = 'Destination', temp = '28°C', condition = 'Sunny' }) => (
  <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-between text-xs font-semibold">
    <div className="flex items-center gap-2">
      <Sun className="w-4 h-4 text-amber-400" />
      <span>{destination} Weather: {condition}</span>
    </div>
    <span className="font-bold text-white">{temp}</span>
  </div>
);
