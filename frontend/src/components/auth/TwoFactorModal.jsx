import React, { useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const TwoFactorModal = ({ isOpen, onClose, onVerify }) => {
  if (!isOpen) return null;
  const [code, setCode] = useState('');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xs bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 text-center space-y-3">
        <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
        <h4 className="text-sm font-bold">Two-Factor Authentication</h4>
        <input value={code} onChange={e => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} placeholder="000000" className="w-full text-center text-lg tracking-widest px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 font-mono" />
        <button onClick={() => { onVerify(code); onClose(); }} className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer">Verify Code</button>
      </div>
    </div>
  );
};
