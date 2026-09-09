import React, { useState } from 'react';
import { Globe, Linkedin, Github } from 'lucide-react';

export const SocialLinksManager = ({ links = {}, onSave }) => {
  const [github, setGithub] = useState(links.github || '');
  const [linkedin, setLinkedin] = useState(links.linkedin || '');
  const [website, setWebsite] = useState(links.website || '');

  const handleUpdate = () => {
    onSave({ github, linkedin, website });
  };

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-2">
        <Github className="w-4 h-4 text-slate-500" />
        <input value={github} onChange={e => setGithub(e.target.value)} onBlur={handleUpdate} placeholder="github.com/username" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
      </div>
      <div className="flex items-center gap-2">
        <Linkedin className="w-4 h-4 text-slate-500" />
        <input value={linkedin} onChange={e => setLinkedin(e.target.value)} onBlur={handleUpdate} placeholder="linkedin.com/in/username" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
      </div>
      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-slate-500" />
        <input value={website} onChange={e => setWebsite(e.target.value)} onBlur={handleUpdate} placeholder="https://portfolio.dev" className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900" />
      </div>
    </div>
  );
};
