"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { 
    user, 
    loading: authLoading, 
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

  // If loading auth state, show a thematic loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin mb-4"></div>
          <span className="font-mono text-xs tracking-widest text-zinc-500 uppercase">Verifying Athlete Credentials...</span>
        </div>
      </div>
    );
  }

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
      } else if (mode === 'signup') {
        if (!name.trim()) {
          setError('Please provide your full name.');
          setLoading(false);
          return;
        }
        await signupWithEmail(name, email, password);
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
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemo();
  };

  // If not logged in, show the split-screen login layout
  if (!user) {
    return (
      <div className="min-h-screen flex bg-white dark:bg-[#050505] overflow-hidden">
        
        {/* Left Side - Branding & Animation (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 relative bg-[#050505] flex-col items-center justify-center overflow-hidden border-r border-zinc-900">
          
          {/* Animated Infinite Typography Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-80">
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              className="flex whitespace-nowrap flex-col gap-12"
            >
              {[...Array(5)].map((_, rowIndex) => (
                <div key={rowIndex} className="flex whitespace-nowrap">
                  <motion.div 
                    animate={{ x: rowIndex % 2 === 0 ? ["-50%", "0%"] : ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 30 + rowIndex * 5 }}
                    className="flex whitespace-nowrap"
                  >
                    {[...Array(4)].map((_, i) => (
                      <span 
                        key={i}
                        className="text-[12vw] font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-700/60 to-transparent uppercase tracking-tight select-none pr-16"
                        style={{ WebkitTextStroke: '1px rgba(212, 163, 89, 0.15)' }}
                      >
                        VANGUARD
                      </span>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Central Animated Logo Element */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-32 h-32 mb-8 relative flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-gold-500/50 rotate-45 rounded-xl animate-pulse" />
              <div className="absolute inset-2 border-2 border-gold-500/30 rotate-12 rounded-lg" />
              <div className="absolute inset-4 bg-gold-500/10 rotate-45 rounded flex items-center justify-center backdrop-blur-sm" />
              <span className="font-display font-black text-5xl text-gold-500 z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">V</span>
            </motion.div>

            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="font-display text-5xl xl:text-7xl font-black tracking-widest uppercase text-white leading-[0.9] text-center drop-shadow-2xl"
            >
              VANGUARD<br/><span className="text-gold-500 italic drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">LAB</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-6 text-sm text-zinc-400 font-mono uppercase tracking-[0.4em] text-center max-w-xs drop-shadow-md"
            >
              Elite Training Protocols <br/> &amp; Macro Diagnostics
            </motion.p>
          </div>
          
          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212, 163, 89, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 163, 89, 0.08) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
          
          {/* Edge Shadows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none opacity-80" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
          
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.7, 0.4]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-500/15 rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[120px]"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md relative z-10 py-6"
          >
            {/* Top Return to Home Link */}
            <div className="mb-6 flex items-center justify-between">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-gold-500 transition-colors uppercase tracking-wider group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Main Hub
              </Link>

              <span className="text-[10px] font-mono text-zinc-400 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-2.5 py-1 rounded-full uppercase tracking-widest">
                Port 443 SECURE
              </span>
            </div>

            {/* Mobile Header (Hidden on Desktop) */}
            <div className="lg:hidden text-center mb-8">
              <div className="font-display text-4xl font-black tracking-widest uppercase text-black dark:text-white">
                VANGUARD<span className="text-gold-500 dark:text-gold-400">&amp;</span>LAB
              </div>
              <p className="text-[10px] text-zinc-500 font-mono mt-1.5 uppercase tracking-[0.2em]">
                Athlete Portal Access
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-black dark:text-white uppercase tracking-tight mb-1">
                {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Join the Forge' : 'Account Recovery'}
              </h2>
              <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                {mode === 'login' 
                  ? 'Enter your credentials to unlock your athlete portal.' 
                  : mode === 'signup' 
                    ? 'Register a new account to access custom training splits.' 
                    : 'Enter your email to receive recovery instructions.'}
              </p>
            </div>

            {/* Instant Demo Athlete Access Box */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(212,163,89,0.08)]">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider">
                    Instant Demo Athlete
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Inspect the complete Academy Portal with 1 click.
                </p>
              </div>
              <button
                type="button"
                onClick={handleDemoAccess}
                className="w-full sm:w-auto px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-display font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
              >
                <span>Enter Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            {mode !== 'forgot' && (
              <div className="flex bg-gray-100 dark:bg-zinc-900 rounded-xl p-1 mb-6 relative">
                <button 
                  type="button"
                  onClick={() => { setMode('login'); resetFormState(); }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider z-10 transition-colors ${mode === 'login' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
                >
                  Log In
                </button>
                <button 
                  type="button"
                  onClick={() => { setMode('signup'); resetFormState(); }}
                  className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider z-10 transition-colors ${mode === 'signup' ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
                >
                  Sign Up
                </button>
                
                <motion.div 
                   layout
                   className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200/50 dark:border-zinc-700/50"
                   initial={false}
                   animate={{ left: mode === 'login' ? '4px' : 'calc(50%)' }}
                   transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </div>
            )}

            {/* Google Authentication */}
            {mode !== 'forgot' && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800/80 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  Continue with Google
                </button>

                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-widest">
                    <span className="bg-white dark:bg-[#050505] px-3 text-zinc-400">or with email</span>
                  </div>
                </div>
              </div>
            )}

            {/* Email Form */}
            <form onSubmit={handleEmailAuth} className="space-y-4 flex flex-col">
              <AnimatePresence initial={false}>
                {mode === 'signup' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="relative overflow-hidden"
                  >
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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
                  className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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
                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-11 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="text-red-500 dark:text-red-400 text-xs font-mono p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {successMsg && (
                <div className="text-emerald-500 dark:text-emerald-400 text-xs font-mono p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full relative group overflow-hidden px-8 py-3.5 mt-2 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-button-shimmer pointer-events-none" />
                <span className="relative z-10">
                  {loading 
                    ? 'Processing...' 
                    : mode === 'login' 
                      ? 'Log In' 
                      : mode === 'signup' 
                        ? 'Sign Up' 
                        : 'Send Recovery Link'}
                </span>
              </button>
            </form>
            
            {/* Mode Switcher Footer */}
            <div className="mt-6 text-center">
              {mode === 'forgot' ? (
                <button
                  type="button"
                  onClick={() => { setMode('login'); resetFormState(); }}
                  className="text-xs text-zinc-500 hover:text-gold-500 font-mono transition-colors"
                >
                  &larr; Return to Sign In
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); resetFormState(); }}
                  className="text-xs text-zinc-500 hover:text-black dark:hover:text-white font-mono transition-colors"
                >
                  {mode === 'login' 
                    ? "Don't have credentials? Apply for membership" 
                    : 'Already an athlete? Sign in'}
                </button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-900 text-center text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Secured by Vanguard Lab Protocol &bull; Firebase Auth
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // If user is authenticated, render the requested page content
  return <>{children}</>;
}

