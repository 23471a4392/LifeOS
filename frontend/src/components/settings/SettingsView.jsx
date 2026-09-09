import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { User, Download, Trash2 } from 'lucide-react';
import { CurrencySelector } from '../profile/CurrencySelector';
import { AvatarSelector } from '../profile/AvatarSelector';
import { SecuritySettings } from './SecuritySettings';
import { DataManagementModal } from './DataManagementModal';
import { exportUserDataAsJSON } from '../../services/dataExportService';

export const SettingsView = () => {
  const { user, updateUser, clearUserData, showToast } = useLifeOS();
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [currency, setCurrency] = useState(user?.currency || '₹');

  const handleCurrencyChange = (newSym) => {
    setCurrency(newSym);
    if (updateUser) updateUser({ currency: newSym });
    showToast(`Currency updated to ${newSym}`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account & Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage security, profile, currency and data settings</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 space-y-4">
          <CurrencySelector currentCurrency={currency} onChange={handleCurrencyChange} />
          <AvatarSelector selectedAvatar={user?.avatar} onSelect={(url) => updateUser && updateUser({ avatar: url })} />
        </div>
        <SecuritySettings user={user} onUpdatePassword={(h) => updateUser && updateUser({ passwordHash: h })} />
      </div>
      <DataManagementModal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)} onConfirmReset={() => { if (clearUserData) clearUserData(); showToast('Data reset.', 'info'); }} />
    </div>
  );
};
