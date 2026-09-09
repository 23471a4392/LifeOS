import React from 'react';

export const AVATAR_OPTIONS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80'
];

export const AvatarSelector = ({ selectedAvatar, onSelect }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">Select Portrait Avatar</label>
      <div className="grid grid-cols-6 gap-2">
        {AVATAR_OPTIONS.map((url, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(url)}
            className={`w-11 h-11 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${
              selectedAvatar === url ? 'border-emerald-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img src={url} alt={`Avatar ${i}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
