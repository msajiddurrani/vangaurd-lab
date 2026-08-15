"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import AuthModal from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // If loading, show a thematic loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505]">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin mb-4"></div>
          <span className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase">Verifying Access...</span>
        </div>
      </div>
    );
  }

  // If not logged in, show restricted access screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#050505] px-4 pt-20 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold-500/20 rounded-full blur-[50px] pointer-events-none" />
          
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-[#050505] border border-gray-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center mb-6 relative z-10">
            <Lock className="w-8 h-8 text-gold-500" />
          </div>
          
          <h2 className="text-3xl font-display font-black text-black dark:text-white uppercase tracking-tight mb-3 relative z-10">
            Restricted <span className="text-gold-500">Access</span>
          </h2>
          
          <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 mb-8 relative z-10">
            You must be an authenticated member to access Vanguard protocols, macro architects, and the exercise library.
          </p>
          
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full relative group overflow-hidden px-8 py-4 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:-translate-y-1 active:translate-y-0"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-button-shimmer pointer-events-none" />
            <span className="relative z-10">Authenticate to Unlock</span>
          </button>
        </motion.div>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </div>
    );
  }

  // If user is authenticated, render the requested page content
  return <>{children}</>;
}
