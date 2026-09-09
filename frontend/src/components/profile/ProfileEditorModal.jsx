import React, { useState } from 'react';
import { X, User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

export const ProfileEditorModal = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;
  const [name, setName] = useState(user?.name || '');
  const [role, setRole] = useState(user?.role || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, role, phone, location, bio });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-neutral-800 mb-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit Profile Details</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"><X className="w-4 h-4" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 mt-1" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Role / Designation</label>
            <input value={role} onChange={e => setRole(e.target.value)} className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Phone</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Location</label>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Hyderabad, India" className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 mt-1" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900 mt-1" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-neutral-800">Cancel</button>
            <button type="submit" className="px-4 py-2 text-xs rounded-xl bg-emerald-600 text-white font-semibold">Save Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
};
