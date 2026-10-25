"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { 
    loginWithEmail, 
    signupWithEmail, 
    loginWithGoogle, 
    loginAsDemo, 
    sendPasswordReset, 
    formatAuthError 
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const resetFormState = () => {
    setError('');
    setSuccessMsg('');
    setPassword('');
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
        onClose();
      } else if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please provide your full name.');
          setLoading(false);
          return;
        }
        await signupWithEmail(name, email, password);
        onClose();
      } else if (mode === 'forgot') {
        await sendPasswordReset(email);
        setSuccessMsg('Password reset link sent to your email. Check your inbox.');
      }
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemo();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 p-4 md:p-6"
          >
            <div className="bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-zinc-800 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col md:flex-row transition-colors duration-300">
              
              {/* Left Pane - Image & Atmosphere (Desktop Only) */}
              <div className="hidden md:block w-5/12 relative bg-zinc-950 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
                  alt="Athlete Training" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c0e]/90" />
                
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 font-mono text-[9px] uppercase tracking-widest mb-3">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    Vanguard System
                  </div>
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">
                    Enter The Forge.
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                    Access elite biometric algorithms, specialized kinesiology, and high-performance training protocols.
                  </p>
                </div>
              </div>

              {/* Right Pane - Form & Actions */}
              <div className="w-full md:w-7/12 p-6 sm:p-10 relative flex flex-col justify-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-40" />
                
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-black dark:hover:text-white transition-colors p-1 rounded-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-wider uppercase mb-1 text-black dark:text-white">
                    {mode === 'login' ? 'Athlete Access' : mode === 'signup' ? 'Join Vanguard' : 'Reset Credentials'}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                    {mode === 'login' 
                      ? 'Authenticate with your Vanguard credentials.' 
                      : mode === 'signup' 
                        ? 'Create your athlete account to unlock macro programming.' 
                        : 'Enter your registered email to receive a recovery link.'}
                  </p>
                </div>

                {/* Quick Demo Access Bar */}
                <div className="mb-5 p-3 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
                    <span className="text-[11px] font-mono uppercase text-gold-600 dark:text-gold-400 font-bold tracking-wider">
                      Evaluation &amp; Demo Mode
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleDemoAccess}
                    className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-black text-[10px] font-mono font-black uppercase tracking-widest rounded-lg transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    1-Click Demo Login
                  </button>
                </div>

                {/* Mode Selector Tabs (only for login & signup) */}
                {mode !== 'forgot' && (
                  <div className="flex bg-gray-100 dark:bg-zinc-900 rounded-xl p-1 mb-5">
                    <button
                      type="button"
                      onClick={() => { setMode('login'); resetFormState(); }}
                      className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                        mode === 'login'
                          ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                          : 'text-zinc-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); resetFormState(); }}
                      className={`flex-1 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all ${
                        mode === 'signup'
                          ? 'bg-white dark:bg-zinc-800 text-black dark:text-white shadow-sm'
                          : 'text-zinc-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Register
                    </button>
                  </div>
                )}

                {/* Social Login Button */}
                {mode !== 'forgot' && (
                  <div className="mb-4">
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:bg-gray-50 dark:hover:bg-zinc-800 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      Continue with Google
                    </button>

                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
                      </div>
                      <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                        <span className="bg-white dark:bg-[#0c0c0e] px-2 text-zinc-400">or with email</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email/Password Form */}
                <form onSubmit={handleEmailAuth} className="space-y-3.5">
                  <AnimatePresence initial={false}>
                    {mode === 'signup' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative overflow-hidden"
                      >
                        <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                          required={mode === 'signup'}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {mode !== 'forgot' && (
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-11 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); resetFormState(); }}
                        className="text-[11px] font-mono text-zinc-500 hover:text-gold-500 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="text-red-500 dark:text-red-400 text-xs font-mono p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
                      {error}
                    </div>
                  )}

                  {successMsg && (
                    <div className="text-emerald-500 dark:text-emerald-400 text-xs font-mono p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-black font-display font-black uppercase tracking-widest py-3 mt-2 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] disabled:opacity-50 cursor-pointer text-xs"
                  >
                    {loading 
                      ? 'Authenticating...' 
                      : mode === 'login' 
                        ? 'Authenticate' 
                        : mode === 'signup' 
                          ? 'Create Account' 
                          : 'Send Recovery Email'}
                  </button>
                </form>

                {/* Footer Switcher */}
                <div className="mt-5 text-center">
                  {mode === 'forgot' ? (
                    <button
                      type="button"
                      onClick={() => { setMode('login'); resetFormState(); }}
                      className="text-xs text-zinc-500 hover:text-gold-500 font-mono transition-colors"
                    >
                      &larr; Back to Login
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); resetFormState(); }}
                      className="text-xs text-zinc-500 hover:text-black dark:hover:text-white font-mono transition-colors"
                    >
                      {mode === 'login' 
                        ? "Don't have an athlete account? Apply now" 
                        : 'Already have credentials? Sign in'}
                    </button>
                  )}
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

