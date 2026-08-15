"use client";

import React, { useState, useEffect } from 'react';
import { Dumbbell, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  // Clock Update for Tactical Vibe
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '/', desc: 'MAIN HUB' },
    { label: 'CALCULATORS', href: '/tools/calculators', desc: 'DIET & METRICS' },
    { label: 'EXERCISES', href: '/academy/exercise-library', desc: 'KINESIOLOGY' },
    { label: 'ACADEMY', href: '/academy/portal', desc: 'PLANS & GUIDES' },
  ];

  return (
    <div id="vanguard-header-wrapper" className="fixed top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-5 pb-2 transition-all duration-300">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-4xl mx-auto rounded-full bg-white/95 dark:bg-[#0b0b0d]/85 backdrop-blur-xl border border-gray-200 dark:border-zinc-900/80 shadow-[0_12px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] relative overflow-visible transition-colors duration-300"
      >
        <div className="absolute top-0 inset-x-12 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent rounded-t-full" />

        <div className="px-5 h-14 sm:h-16 flex items-center justify-between relative z-10">
          
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group relative z-10 cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <Dumbbell className="h-7 w-7 sm:h-8 sm:w-8 text-black dark:text-white group-hover:text-gold-500 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-tighter uppercase leading-none text-xl sm:text-2xl text-black dark:text-white transition-colors duration-300">
                Vanguard
              </span>
              <span className="font-mono text-gold-500 tracking-[0.2em] font-bold uppercase text-[9px] sm:text-[10px] transition-all duration-300">
                Athletic Lab
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 relative z-10">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors duration-200 group"
              >
                <span className="relative z-10 font-bold">{item.label}</span>
                <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full border border-gray-200 dark:border-zinc-800/80 bg-gray-100 hover:bg-gray-200 dark:bg-[#050505]/60 dark:hover:bg-zinc-900/50 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center h-8 w-8 relative overflow-hidden"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div key="dark" initial={{ y: 15, opacity: 0, rotate: 45 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -15, opacity: 0, rotate: -45 }} transition={{ duration: 0.15 }}>
                    <Sun className="h-4 w-4 text-gold-500" />
                  </motion.div>
                ) : (
                  <motion.div key="light" initial={{ y: 15, opacity: 0, rotate: -45 }} animate={{ y: 0, opacity: 1, rotate: 0 }} exit={{ y: -15, opacity: 0, rotate: 45 }} transition={{ duration: 0.15 }}>
                    <Moon className="h-4 w-4 text-zinc-800" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {user ? (
              <button
                onClick={logout}
                className="hidden sm:flex items-center px-3 h-8 rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-50 hover:bg-gray-100 dark:bg-[#050505]/60 dark:hover:bg-zinc-900 text-[10px] font-mono font-bold tracking-widest uppercase text-gold-500 hover:text-gold-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                Logout ({user.name.split(' ')[0]})
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex items-center px-3 h-8 rounded-full border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500/20 text-[10px] font-mono font-bold tracking-widest uppercase text-gold-600 dark:text-gold-500 transition-colors cursor-pointer"
              >
                Join / Login
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 md:hidden rounded-full border border-gray-200 dark:border-zinc-800 bg-gray-100 hover:bg-gray-200 dark:bg-[#050505]/60 dark:hover:bg-zinc-900 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer h-8 w-8 flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden border-t border-zinc-900/60 light:border-zinc-200 bg-[#0b0b0d]/95 light:bg-white/95 rounded-b-2xl overflow-hidden"
            >
              <div className="p-3.5 space-y-2">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-left px-4 py-2.5 rounded-xl border bg-transparent border-zinc-900/10 text-zinc-400 hover:text-white transition-all cursor-pointer flex justify-between items-center"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">{item.label}</span>
                      <span className="font-mono text-[7px] text-zinc-500 tracking-wider mt-0.5 uppercase">{item.desc}</span>
                    </div>
                  </Link>
                ))}
                <div className="p-2.5 bg-[#050505]/40 border border-zinc-900/40 rounded-xl font-mono text-[8px] text-zinc-500 flex justify-between items-center">
                  <span>LAB_CLOCK:</span>
                  <span className="text-zinc-400 font-bold">{currentTime || 'SYNCING'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}
