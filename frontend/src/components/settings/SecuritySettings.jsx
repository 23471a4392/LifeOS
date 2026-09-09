import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { hashPassword } from '../../services/cryptoService';

export const SecuritySettings = ({ user, onUpdatePassword }) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    if (!currentPass) return setMsg({ type: 'error', text: 'Current password is required.' });
    if (newPass.length < 8) return setMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
    if (newPass !== confirmPass) return setMsg({ type: 'error', text: 'New passwords do not match.' });
    const newHash = await hashPassword(newPass);
    if (onUpdatePassword) onUpdatePassword(newHash);
    setMsg({ type: 'success', text: 'Password updated successfully!' });
    setCurrentPass(''); setNewPass(''); setConfirmPass('');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 space-y-3">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
        <Shield className="w-4 h-4 text-emerald-500" />
        <span>Security & Password</span>
      </div>
      {msg && <div className={`text-xs p-2 rounded-lg ${msg.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>{msg.text}</div>}
      <form onSubmit={handleSubmit} className="space-y-2 text-xs">
        <input type="password" placeholder="Current Password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <input type="password" placeholder="New Password (min 8 chars)" value={newPass} onChange={e => setNewPass(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <input type="password" placeholder="Confirm New Password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
        <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold cursor-pointer">Update Password</button>
      </form>
    </div>
  );
};
