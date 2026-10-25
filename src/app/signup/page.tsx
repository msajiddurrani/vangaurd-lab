"use client";

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const { 
    user, 
    loading: authLoading, 
    signupWithEmail, 
    loginWithGoogle, 
    loginAsDemo, 
    logout,
    formatAuthError 
  } = useAuth();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    setLoading(true);

    try {
      await signupWithEmail(name, email, password);
      router.push('/academy/portal');
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
      router.push('/academy/portal');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    loginAsDemo();
    router.push('/academy/portal');
  };

  // If already logged in, show authenticated banner
  if (user && !authLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] flex items-center justify-center p-6 pt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-gold-500" />
          </div>

          <h2 className="text-2xl font-display font-black text-black dark:text-white uppercase tracking-wider mb-2">
            Already Enrolled
          </h2>
          <p className="text-xs font-mono text-zinc-500 mb-6">
            You are logged in as <span className="text-gold-500 font-bold">{user.name}</span>.
          </p>

          <div className="space-y-3">
            <Link
              href="/academy/portal"
              className="w-full py-3.5 px-6 bg-gold-500 hover:bg-gold-400 text-black font-display font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center gap-2"
            >
              <span>Access Your Portal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => logout()}
              className="w-full py-3 px-6 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#050505] overflow-hidden pt-16 sm:pt-0">
      
      {/* Left Side - Branding */}
      <div className="hidden lg:flex w-1/2 relative bg-[#050505] flex-col items-center justify-center overflow-hidden border-r border-zinc-900">
        
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
            <span className="font-display font-black text-5xl text-gold-500 z-10">V</span>
          </motion.div>

          <div className="font-display text-5xl xl:text-7xl font-black tracking-widest uppercase text-white leading-[0.9] text-center">
            VANGUARD<br/><span className="text-gold-500 italic">LAB</span>
          </div>

          <p className="mt-6 text-sm text-zinc-400 font-mono uppercase tracking-[0.4em] text-center max-w-xs">
            Join The Vanguard Athlete Network
          </p>
        </div>
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none opacity-80" />
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        
        <div className="w-full max-w-md relative z-10 py-8">
          
          <div className="mb-6 flex items-center justify-between">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-gold-500 transition-colors uppercase tracking-wider group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return to Main Hub
            </Link>

            <span className="text-[10px] font-mono text-zinc-400 bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-2.5 py-1 rounded-full uppercase tracking-widest">
              New Athlete Intake
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-display font-black text-black dark:text-white uppercase tracking-tight mb-1">
              Create Account
            </h1>
            <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
              Register as an athlete to customize workouts and macro plans.
            </p>
          </div>

          {/* Instant Demo Athlete Box */}
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-gold-500/15 via-gold-500/10 to-transparent border border-gold-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[0_0_20px_rgba(212,163,89,0.08)]">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider">
                  Test Drive Vanguard
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Skip registration and test the full app instantly.
              </p>
            </div>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full sm:w-auto px-4 py-2 bg-gold-500 hover:bg-gold-400 text-black text-xs font-display font-black uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
            >
              <span>Instant Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Google Auth Button */}
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
              Sign Up with Google
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

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                required
              />
            </div>

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

            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (minimum 6 characters)"
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

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 dark:text-red-400 text-xs font-mono p-3 bg-red-500/10 border border-red-500/20 rounded-xl"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full relative group overflow-hidden px-8 py-3.5 mt-2 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-button-shimmer pointer-events-none" />
              <span className="relative z-10">
                {loading ? 'Creating Account...' : 'Initiate Protocol Registration'}
              </span>
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-500 font-mono">
              Already have credentials?{' '}
              <Link href="/login" className="text-gold-500 hover:underline font-bold">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
