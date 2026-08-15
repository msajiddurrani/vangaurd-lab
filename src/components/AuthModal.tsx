"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      }
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') setError('Email is already registered.');
      else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') setError('Invalid email or password.');
      else if (err.code === 'auth/weak-password') setError('Password should be at least 6 characters.');
      else setError(err.message);
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-50 p-4 md:p-6"
          >
            <div className="bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-2xl relative overflow-hidden shadow-2xl flex transition-colors duration-300">
              
              {/* Left Pane - Image (Hidden on Mobile) */}
              <div className="hidden md:block w-1/2 relative bg-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop" 
                  alt="Athlete Training" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-zinc-950" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-8 left-8 right-8 z-10">
                  <h3 className="text-3xl font-display font-black text-white uppercase tracking-tight mb-2">
                    Enter the Forge.
                  </h3>
                  <p className="text-sm font-mono text-zinc-400">
                    No shortcuts. No excuses. Just pure, unadulterated biometric progress.
                  </p>
                </div>
              </div>

              {/* Right Pane - Form */}
              <div className="w-full md:w-1/2 p-8 md:p-12 relative flex flex-col justify-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-30" />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-3xl font-display font-black tracking-widest uppercase mb-2 text-black dark:text-white transition-colors duration-300">
                  {isLogin ? 'Vanguard Access' : 'Join Vanguard'}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8 transition-colors duration-300">
                  {isLogin ? 'Authenticate to access your protocol.' : 'Register to unlock the Macro Architect.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                  <AnimatePresence initial={false}>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="relative overflow-hidden"
                      >
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-black dark:text-white placeholder-zinc-500 dark:placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:bg-white dark:focus:bg-zinc-900 transition-colors"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:bg-zinc-900 transition-colors"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-white placeholder-zinc-600 focus:border-gold-500 focus:outline-none focus:bg-zinc-900 transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-400 text-sm py-2">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold-500 hover:bg-gold-400 text-black font-display font-black uppercase tracking-widest py-3 mt-4 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : (isLogin ? 'Authenticate' : 'Initiate Protocol')}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors uppercase tracking-wider"
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
