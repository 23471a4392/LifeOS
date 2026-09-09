import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
export const PomodoroTimer = () => {
  const [sec, setSec] = useState(25 * 60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    let t = null;
    if (run && sec > 0) t = setInterval(() => setSec(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [run, sec]);
  const m = Math.floor(sec / 60); const s = sec % 60;
  return (
    <div className="p-3 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 flex justify-between items-center text-xs">
      <span className="font-bold">⏱️ Pomodoro Focus ({String(m).padStart(2,'0')}:{String(s).padStart(2,'0')})</span>
      <div className="flex gap-2">
        <button onClick={() => setRun(!run)} className="p-1.5 bg-indigo-600 text-white rounded-lg">{run ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}</button>
        <button onClick={() => { setRun(false); setSec(25 * 60); }} className="p-1.5 bg-slate-100 dark:bg-neutral-800 rounded-lg"><RotateCcw className="w-3 h-3" /></button>
      </div>
    </div>
  );
};
