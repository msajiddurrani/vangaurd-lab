"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please log in.');
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
              
              {/* Left Pane - Image & Atmosphere */}
              <div className="hidden md:block w-5/12 relative bg-zinc-950 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
                  alt="Athlete Training" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-zinc-950/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0c0c0e]/90" />
                
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight mb-2">
                    Enter The Forge.
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                    Access elite biometric algorithms, specialized kinesiology, and high-performance training protocols.
                  </p>
                </div>
              </div>

              {/* Right Pane - Form */}
              <div className="w-full md:w-7/12 p-6 sm:p-10 relative flex flex-col justify-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-40" />
                
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 text-zinc-400 hover:text-black dark:hover:text-white transition-colors p-1 rounded-lg"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-display font-black tracking-wider uppercase mb-1 text-black dark:text-white">
                    {isLogin ? 'Vanguard Access' : 'Join Vanguard'}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                    {isLogin ? 'Authenticate to access your protocol.' : 'Register to unlock the Macro Architect.'}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
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
                          className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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
                      className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-11 text-sm text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none transition-colors"
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

                  {error && (
                    <div className="text-red-500 dark:text-red-400 text-xs font-mono p-2.5 bg-red-500/10 border border-red-500/20 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-black font-display font-black uppercase tracking-widest py-3 mt-2 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.45)] disabled:opacity-50 cursor-pointer text-xs"
                  >
                    {loading ? 'Processing...' : isLogin ? 'Authenticate' : 'Initiate Protocol'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className="text-xs text-zinc-500 hover:text-black dark:hover:text-white font-mono uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {isLogin ? "Don't have access? Apply for membership" : 'Already a member? Log in'}
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
