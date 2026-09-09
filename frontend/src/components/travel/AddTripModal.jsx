import React, { useState } from 'react';
import { X, Plane } from 'lucide-react';
import { TripTypeSelector } from './TripTypeSelector';
import { validateTripPayload } from '../../services/tripValidator';

export const AddTripModal = ({ isOpen, onClose, onSave, editingTrip }) => {
  if (!isOpen) return null;
  const [name, setName] = useState(editingTrip?.name || '');
  const [destination, setDestination] = useState(editingTrip?.destination || '');
  const [startDate, setStartDate] = useState(editingTrip?.startDate || '');
  const [endDate, setEndDate] = useState(editingTrip?.endDate || '');
  const [type, setType] = useState(editingTrip?.type || 'Vacation');
  const [budget, setBudget] = useState(editingTrip?.budget || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { name, destination, startDate, endDate, type, budget: Number(budget) || 0 };
    const { isValid, errors: valErrors } = validateTripPayload(payload);
    if (!isValid) return setErrors(valErrors);
    onSave(payload); onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-neutral-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Plane className="w-5 h-5 text-teal-500" />{editingTrip ? 'Edit Trip' : 'Plan New Adventure'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Trip Name" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <div className="grid grid-cols-2 gap-3">
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          </div>
          <TripTypeSelector selectedType={type} onSelect={setType} />
          <input type="number" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Budget (₹)" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold cursor-pointer">Save Trip</button>
          </div>
        </form>
      </div>
    </div>
  );
};
