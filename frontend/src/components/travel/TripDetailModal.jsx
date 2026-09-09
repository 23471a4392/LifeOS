import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { ItineraryPlanner } from './ItineraryPlanner';
import { PackingChecklist } from './PackingChecklist';
import { TripBudgetProgressBar } from './TripBudgetProgressBar';
import { TripExpenseLogger } from './TripExpenseLogger';

export const TripDetailModal = ({ isOpen, onClose, trip, onUpdateTrip }) => {
  if (!isOpen || !trip) return null;
  const [tab, setTab] = useState('itinerary');
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-start pb-2 border-b border-slate-100 dark:border-neutral-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{trip.name}</h3>
            <p className="text-xs text-teal-400 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {trip.destination}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <TripBudgetProgressBar budget={trip.budget} spent={trip.spent || 0} />
        <div className="flex gap-2 border-b border-slate-200 dark:border-neutral-800 pb-2 text-xs font-semibold">
          <button onClick={() => setTab('itinerary')} className={`px-2.5 py-1 rounded-lg ${tab === 'itinerary' ? 'bg-teal-600 text-white' : 'text-slate-400'}`}>Itinerary</button>
          <button onClick={() => setTab('packing')} className={`px-2.5 py-1 rounded-lg ${tab === 'packing' ? 'bg-teal-600 text-white' : 'text-slate-400'}`}>Packing</button>
        </div>
        {tab === 'itinerary' && (
          <ItineraryPlanner
            itinerary={trip.itinerary || []}
            onAddItem={(it) => onUpdateTrip(trip.id, { itinerary: [...(trip.itinerary || []), it] })}
            onToggleItem={(idx) => {
              const list = [...(trip.itinerary || [])]; list[idx].completed = !list[idx].completed;
              onUpdateTrip(trip.id, { itinerary: list });
            }}
            onDeleteItem={(idx) => onUpdateTrip(trip.id, { itinerary: (trip.itinerary || []).filter((_, i) => i !== idx) })}
          />
        )}
        {tab === 'packing' && (
          <PackingChecklist
            packingList={trip.packingList || []}
            onAddItem={(p) => onUpdateTrip(trip.id, { packingList: [...(trip.packingList || []), p] })}
            onToggleItem={(idx) => {
              const list = [...(trip.packingList || [])]; list[idx].packed = !list[idx].packed;
              onUpdateTrip(trip.id, { packingList: list });
            }}
            onDeleteItem={(idx) => onUpdateTrip(trip.id, { packingList: (trip.packingList || []).filter((_, i) => i !== idx) })}
          />
        )}
      </div>
    </div>
  );
};
