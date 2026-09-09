import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { useTheme } from '../../context/ThemeContext';
import { sounds } from '../../services/soundService';
import { storageRepository } from '../../services/storageRepository';
import {
  Settings,
  User,
  Volume2,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Sparkles,
  Info
} from 'lucide-react';

export const SettingsView = () => {
  const {
    user,
    setUser,
    showToast,
    loadDemoDataForCurrentUser,
    clearCurrentUserData,
    refreshData
  } = useLifeOS();

  const [name, setName] = useState(user?.name || 'LifeOS User');
  const [role, setRole] = useState(user?.role || 'Senior Software Engineer');
  const [currency, setCurrency] = useState(user?.currency || '₹');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!user) return;
    setUser(prev => ({ ...prev, name, role, currency }));
    showToast('Profile settings updated successfully!', 'success');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.toggleSound(next);
    showToast(`Sound effects ${next ? 'enabled' : 'muted'}.`, 'info');
  };

  const handleExportAll = () => {
    if (!user) return;
    const backup = storageRepository.exportAllUserData(user.id);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `LifeOS_FullBackup_${user.email || 'workspace'}_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('All personal LifeOS data exported cleanly as JSON!', 'success');
  };

  const handleImportBackup = (e) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (user) {
            storageRepository.importUserData(user.id, parsed);
            refreshData(user);
            showToast('Backup restored successfully!', 'success');
          }
        } catch (err) {
          showToast('Failed to parse backup JSON file.', 'error');
        }
      };
    }
  };

  const handleLoadDemo = () => {
    if (window.confirm('Load sample demo data (tasks, trips, expenses, matrix) into your workspace?')) {
      loadDemoDataForCurrentUser();
    }
  };

  const handleClearAll = () => {
    if (window.confirm('CAUTION: This will clear all your tasks, expenses, trips, and goals, resetting your workspace to a clean 0 state. Are you sure?')) {
      clearCurrentUserData();
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 max-w-4xl transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <Settings className="w-4 h-4" />
            <span>PLATFORM SETTINGS & PREFERENCES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Configuration & Data Ownership
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Manage your personal profile, audio feedback, currency preferences, and full JSON data backups.
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Profile Information</span>
        </h2>

        <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Professional Role</label>
              <input
                type="text"
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Default Currency</label>
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="₹">₹ (INR - Indian Rupee)</option>
                <option value="$">$ (USD - US Dollar)</option>
                <option value="€">€ (EUR - Euro)</option>
                <option value="£">£ (GBP - British Pound)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer"
          >
            Save Profile Changes
          </button>
        </form>
      </div>

      {/* Audio & Experience */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Interactive Sounds & Haptics</span>
        </h2>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Audio Feedback Synthesizer</div>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400">Play celebratory chimes when completing tasks and water drops.</p>
          </div>
          <button
            type="button"
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                : 'bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-400 border-slate-300 dark:border-neutral-700'
            }`}
          >
            {soundEnabled ? 'Enabled 🔊' : 'Muted 🔇'}
          </button>
        </div>
      </div>

      {/* Dataset & Isolation Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Workspace Isolation & Sample Datasets</span>
        </h2>

        <p className="text-xs text-slate-600 dark:text-neutral-400">
          LifeOS ensures newly registered accounts always start with 0 records. You can explicitly load or wipe sample datasets here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            type="button"
            onClick={handleLoadDemo}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-semibold text-amber-700 dark:text-amber-300 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Load Demo Sample Dataset</span>
          </button>

          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-500/30 text-xs font-semibold text-rose-600 dark:text-rose-300 transition-all shadow-sm cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>Reset Workspace to Clean Zero State</span>
          </button>
        </div>
      </div>

      {/* Data Management & Backup */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Data Export & Import (100% Privacy)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <button
            type="button"
            onClick={handleExportAll}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-850 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-900 dark:text-white transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Export Full Workspace Backup (JSON)</span>
          </button>

          <label className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-neutral-900 dark:hover:bg-neutral-850 border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-900 dark:text-white transition-all shadow-sm cursor-pointer">
            <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Import Workspace Backup (JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
