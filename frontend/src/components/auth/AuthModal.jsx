import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { Lock, Mail, User, Sparkles, LogIn, UserPlus, CheckCircle2, ShieldCheck, X, AlertCircle, Briefcase } from 'lucide-react';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, isAuthenticated, login, register, loadDemoMode } = useLifeOS();
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: string }
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already authenticated and modal is not explicitly triggered, do not show
  if (!isAuthModalOpen && isAuthenticated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          setStatusMessage({ type: 'error', text: 'Passwords do not match. Please verify.' });
          setIsSubmitting(false);
          return;
        }

        const res = await register({ name, email, role, password, confirmPassword });
        if (res.success) {
          setStatusMessage({
            type: 'success',
            text: 'Account registered successfully! Please sign in with your password to access your private workspace.'
          });
          // Switch to login tab and clear password
          setMode('login');
          setPassword('');
          setConfirmPassword('');
        } else {
          setStatusMessage({ type: 'error', text: res.error || 'Registration failed.' });
        }
      } else {
        const res = await login(email, password);
        if (res.success) {
          setIsAuthModalOpen(false);
        } else {
          setStatusMessage({ type: 'error', text: res.error || 'Invalid email or password.' });
        }
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'An unexpected authentication error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setStatusMessage(null);
    setIsSubmitting(true);
    await loadDemoMode();
    setIsSubmitting(false);
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative">
        {/* Close button only visible if user is already authenticated and just opened modal */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-neutral-800 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-200 dark:border-neutral-800 text-center relative bg-slate-50/70 dark:bg-neutral-900/40">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/25 mb-3 ring-1 ring-emerald-400/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">LifeOS Security & Access</h2>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Personal Life Management & Decision Support Platform
          </p>

          {/* Switcher Tabs */}
          <div className="flex p-1 mt-4 rounded-xl bg-slate-200/70 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => { setMode('login'); setStatusMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'login' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setStatusMessage(null); }}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'register' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Feedback Alert Banners */}
        {statusMessage && (
          <div className="px-6 pt-4">
            <div className={`p-3 rounded-xl text-xs flex items-start gap-2.5 ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed font-medium">{statusMessage.text}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                  Full Name <span className="text-emerald-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="e.g. Ramya Sri"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                  Professional Focus / Role
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    placeholder="e.g. Senior Software Engineer / Founder"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
              Email or Username <span className="text-emerald-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g. ramya@lifeos.dev or any name"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
              Password <span className="text-emerald-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter any password"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">
                Confirm Password <span className="text-emerald-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 dark:text-neutral-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In to LifeOS</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create LifeOS Account</span>
              </>
            )}
          </button>

          {/* 1-Click Demo Mode Button */}
          {mode === 'login' && (
            <div className="pt-2">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-neutral-800"></div>
                <span className="flex-shrink mx-2 text-[10px] uppercase tracking-wider text-slate-400 dark:text-neutral-500 font-medium">or</span>
                <div className="flex-grow border-t border-slate-200 dark:border-neutral-800"></div>
              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isSubmitting}
                className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-200 dark:border-neutral-800 text-slate-800 dark:text-neutral-200 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Explore Demo Mode (1-Click Sample Workspace)</span>
              </button>
            </div>
          )}
        </form>

        <div className="p-4 bg-slate-50 dark:bg-[#070707] border-t border-slate-200 dark:border-neutral-800 text-center text-[11px] text-slate-500 dark:text-neutral-500 font-mono">
          🔒 Strict User Workspace Isolation • Zero-Data New Account Baseline
        </div>
      </div>
    </div>
  );
};
