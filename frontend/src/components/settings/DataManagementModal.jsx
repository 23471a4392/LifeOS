import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

export const DataManagementModal = ({ isOpen, onClose, onConfirmReset }) => {
  if (!isOpen) return null;
  const [confirmWord, setConfirmWord] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-[#0c0c0c] border border-red-500/30 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-3 text-red-500">
          <AlertTriangle className="w-6 h-6" />
          <h3 className="text-lg font-bold">Reset Personal Data?</h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-neutral-400">
          This will permanently delete all your custom records. Type <span className="font-bold text-red-400">RESET</span> to confirm.
        </p>
        <input value={confirmWord} onChange={e => setConfirmWord(e.target.value)} placeholder="Type RESET" className="w-full px-3 py-2 text-xs rounded-xl border border-red-500/40 bg-red-500/5 dark:bg-neutral-900" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
          <button disabled={confirmWord !== 'RESET'} onClick={() => { onConfirmReset(); onClose(); }} className="px-4 py-2 text-xs rounded-xl bg-red-600 text-white font-bold disabled:opacity-40 cursor-pointer">Permanently Reset</button>
        </div>
      </div>
    </div>
  );
};
