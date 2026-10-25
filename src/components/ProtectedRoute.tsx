"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading: authLoading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If loading auth state, show a clean thematic loading state
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin mb-4"></div>
          <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Verifying Access...</span>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      } else {
        if (!name.trim()) {
          setError('Please provide your full name.');
          setLoading(false);
          return;
        }
        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await updateProfile(userCredential.user, { displayName: name.trim() });
      }
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please switch to login.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message ? err.message.replace(/^Firebase:\s*/, '') : 'Authentication failed.');
      }
    } finally {
      setLoading(false);
    }
  };

  // If not logged in, show the full-screen non-scrolling split layout
  if (!user) {
    return (
      <div className="fixed inset-0 z-[100] w-screen h-screen flex bg-white dark:bg-[#050505] overflow-hidden select-none">
        
        {/* Left Side - Branding & Animation (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 h-full relative bg-[#050505] flex-col items-center justify-center overflow-hidden border-r border-zinc-900">
          
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
              className="w-28 h-28 mb-6 relative flex items-center justify-center"
            >
              <div className="absolute inset-0 border border-gold-500/50 rotate-45 rounded-xl animate-pulse" />
              <div className="absolute inset-2 border-2 border-gold-500/30 rotate-12 rounded-lg" />
              <div className="absolute inset-4 bg-gold-500/10 rotate-45 rounded flex items-center justify-center backdrop-blur-sm" />
              <span className="font-display font-black text-5xl text-gold-500 z-10 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">V</span>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="font-display text-5xl xl:text-6xl font-black tracking-widest uppercase text-white leading-[0.9] text-center drop-shadow-2xl"
            >
              VANGUARD<br/><span className="text-gold-500 italic drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]">LAB</span>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-5 text-xs text-zinc-400 font-mono uppercase tracking-[0.35em] text-center max-w-xs drop-shadow-md"
            >
              Elite Training Protocols <br/> &amp; Macro Diagnostics
            </motion.p>
          </div>
          
          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(212, 163, 89, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 163, 89, 0.08) 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} />
          
          {/* Edge Shadows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] pointer-events-none opacity-80" />
        </div>

        {/* Right Side - Form (Strictly Non-Scrolling) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center p-6 sm:p-10 relative overflow-hidden bg-white dark:bg-[#050505]">
          
          {/* Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full max-w-sm relative z-10"
          >
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="lg:hidden text-center mb-6">
              <div className="font-display text-4xl font-black tracking-widest uppercase text-black dark:text-white">
                VANGUARD<span className="text-gold-500">&amp;</span>LAB
              </div>
              <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-[0.2em]">
                Authentication Protocol
              </p>
            </div>

            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-display font-black text-black dark:text-white uppercase tracking-tight mb-1.5">
                {isLogin ? 'Welcome Back' : 'Join the Forge'}
              </h2>
              <p className="text-xs font-sans text-zinc-600 dark:text-zinc-400">
                {isLogin ? 'Enter your credentials to access the platform.' : 'Register a new account to unlock all features.'}
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 dark:bg-zinc-900 rounded-xl p-1 mb-6 relative">
              <button 
                type="button"
                onClick={() => { setIsLogin(true); setError(''); }}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider z-10 transition-colors ${isLogin ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => { setIsLogin(false); setError(''); }}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider z-10 transition-colors ${!isLogin ? 'text-black dark:text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'}`}
              >
                Sign Up
              </button>
              
              {/* Active Tab indicator */}
              <motion.div 
                 layout
                 className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200/50 dark:border-zinc-700/50"
                 initial={false}
                 animate={{ left: isLogin ? '4px' : 'calc(50%)' }}
                 transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 flex flex-col">
              <AnimatePresence initial={false}>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className="relative overflow-hidden"
                  >
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                      required={!isLogin}
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

              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-11 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="text-red-500 dark:text-red-400 text-xs font-mono p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl"
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
                <span className="relative z-10">{loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}</span>
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-xs text-zinc-500 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider font-mono cursor-pointer"
              >
                {isLogin ? "Don't have access? Apply for membership" : 'Already a member? Log in'}
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-900 text-center text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Secured by Vanguard Lab Protocol
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // If user is authenticated, render the full requested website content
  return <>{children}</>;
}
