import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Sparkles,
  Zap,
  Scale,
  BatteryCharging,
  Flame,
  Heart,
  Check,
  Send,
  Coffee,
  Sun,
  ShieldCheck,
  BrainCircuit
} from 'lucide-react';

export const MoodTrackerWidget = () => {
  const { logMood, user, showToast } = useLifeOS();

  // Clean, professional Lucide Icons matching the exact Sidebar Design System
  const moods = [
    {
      id: 'Inspired',
      label: 'Inspired',
      sublabel: 'Creative & Energetic',
      icon: Sparkles,
      iconColor: 'text-amber-500',
      bgGlow: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
      activeRing: 'ring-amber-400 border-amber-500'
    },
    {
      id: 'Productive',
      label: 'Productive',
      sublabel: 'Deep Focus & Flow',
      icon: Zap,
      iconColor: 'text-emerald-500',
      bgGlow: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      activeRing: 'ring-emerald-400 border-emerald-500'
    },
    {
      id: 'Balanced',
      label: 'Balanced',
      sublabel: 'Calm & Steady',
      icon: Scale,
      iconColor: 'text-blue-500',
      bgGlow: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      activeRing: 'ring-blue-400 border-blue-500'
    },
    {
      id: 'Fatigued',
      label: 'Fatigued',
      sublabel: 'Low Energy / Rest',
      icon: BatteryCharging,
      iconColor: 'text-purple-500',
      bgGlow: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      activeRing: 'ring-purple-400 border-purple-500'
    },
    {
      id: 'Stressed',
      label: 'Stressed',
      sublabel: 'High Workload',
      icon: Flame,
      iconColor: 'text-rose-500',
      bgGlow: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      activeRing: 'ring-rose-400 border-rose-500'
    },
  ];

  const [selectedMood, setSelectedMood] = useState('Productive');
  const [energyLevel, setEnergyLevel] = useState(8);
  const [gratitudeNote, setGratitudeNote] = useState('');
  const [isLoggedToday, setIsLoggedToday] = useState(false);

  const handleSaveMood = (e) => {
    e.preventDefault();
    if (logMood) {
      logMood({
        mood: selectedMood,
        energy: energyLevel,
        gratitudeNote: gratitudeNote.trim()
      });
    }
    setIsLoggedToday(true);
    showToast(`✨ Daily Mood & Reflection Logged!`, 'success');
  };

  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 transition-colors duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Daily Mood & Gratitude Journal</h3>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400">Mental Wellbeing & Energy Tracker</p>
          </div>
        </div>
        {isLoggedToday && (
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
            <Check className="w-3 h-3" /> Logged Today
          </span>
        )}
      </div>

      <form onSubmit={handleSaveMood} className="space-y-4">
        {/* Lucide Vector Icon Tiles matching Sidebar */}
        <div>
          <label className="block text-[11px] font-medium text-slate-500 dark:text-neutral-400 mb-2">
            Select your current mental & focus state:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {moods.map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMood(m.id)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-2.5 relative group ${
                    isSelected
                      ? `${m.bgGlow} ring-2 ${m.activeRing} shadow-md scale-[1.02]`
                      : 'bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-800 hover:border-slate-300 dark:hover:border-neutral-700'
                  }`}
                >
                  {/* Clean Vector Icon Tile matching Sidebar style */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-200 ${
                      isSelected
                        ? `${m.bgGlow} shadow-inner scale-110`
                        : 'bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 group-hover:scale-105 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${isSelected ? m.iconColor : 'text-slate-500 dark:text-neutral-400 group-hover:text-emerald-500'}`} />
                  </div>

                  <div>
                    <span className={`text-xs font-bold block ${isSelected ? 'text-slate-900 dark:text-white font-extrabold' : 'text-slate-700 dark:text-neutral-300'}`}>
                      {m.label}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-neutral-500 block mt-0.5">{m.sublabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Gratitude Note & Energy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          <div className="md:col-span-2">
            <label className="block text-[11px] font-medium text-slate-500 dark:text-neutral-400 mb-1">
              One thing you're grateful for today:
            </label>
            <input
              type="text"
              placeholder="e.g. Completed milestone on time, good health, great focus session..."
              value={gratitudeNote}
              onChange={e => setGratitudeNote(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-neutral-400 mb-1">
              <span>Energy Level:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{energyLevel}/10</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energyLevel}
              onChange={e => setEnergyLevel(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-pink-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Record Daily Mood & Gratitude</span>
        </button>
      </form>
    </div>
  );
};
