import React, { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
export const CurrencyConverterWidget = () => {
  const [inr, setInr] = useState(1000);
  const usd = (inr / 84).toFixed(2);
  return (
    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs flex justify-between items-center">
      <div className="flex items-center gap-1.5"><ArrowRightLeft className="w-3.5 h-3.5 text-teal-400" /> ₹{inr} INR</div>
      <span className="font-bold text-white">${usd} USD</span>
    </div>
  );
};
