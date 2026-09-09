import React from 'react';
import { Fingerprint } from 'lucide-react';

export const BiometricPrompt = ({ onAuthenticate }) => {
  return (
    <button
      onClick={onAuthenticate}
      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-bold text-xs hover:bg-emerald-500/20 transition-all cursor-pointer"
    >
      <Fingerprint className="w-4 h-4" />
      <span>Unlock with Biometric Passkey</span>
    </button>
  );
};
