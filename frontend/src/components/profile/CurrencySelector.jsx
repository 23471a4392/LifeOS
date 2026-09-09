import React from 'react';

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
];

export const CurrencySelector = ({ currentCurrency = '₹', onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Currency:</span>
      <div className="flex gap-1 bg-slate-100 dark:bg-neutral-900 p-1 rounded-xl border border-slate-200 dark:border-neutral-800">
        {CURRENCIES.map(c => (
          <button
            key={c.code}
            type="button"
            onClick={() => onChange(c.symbol)}
            className={`px-2.5 py-1 text-xs rounded-lg font-bold transition-colors cursor-pointer ${
              currentCurrency === c.symbol ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-neutral-400 hover:text-white'
            }`}
          >
            {c.symbol} {c.code}
          </button>
        ))}
      </div>
    </div>
  );
};
