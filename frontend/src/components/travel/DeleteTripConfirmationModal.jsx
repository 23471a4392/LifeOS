import React from 'react';
import { AlertTriangle } from 'lucide-react';
export const DeleteTripConfirmationModal = ({ isOpen, onClose, trip, onConfirm }) => {
  if (!isOpen || !trip) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-[#0c0c0c] border border-red-500/30 rounded-3xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-red-500 font-bold text-sm"><AlertTriangle className="w-4 h-4" /> Delete Trip?</div>
        <p className="text-xs text-slate-400">Delete "{trip.name}"?</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs">Cancel</button>
          <button onClick={() => { onConfirm(trip.id); onClose(); }} className="px-4 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold cursor-pointer">Delete</button>
        </div>
      </div>
    </div>
  );
};
