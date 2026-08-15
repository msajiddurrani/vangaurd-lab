"use client";

import React from 'react';
import { ArrowRight, Activity, Dumbbell, BookOpen } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import FeaturesShowcase from '../components/FeaturesShowcase';
import EliteArsenal from '../components/EliteArsenal';
import ScrollingTicker from '../components/ScrollingTicker';
import MythsSection from '../components/MythsSection';
import AboutSection from '../components/AboutSection';





export default function HomePage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const bgY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <>
      <main className="flex-grow">
        <div className="animate-fade-in">
          
          <section id="store-hero" className="relative bg-gray-50 dark:bg-[#050505] min-h-screen flex items-center justify-center overflow-hidden border-b border-gray-200 dark:border-zinc-900 pt-20 transition-colors duration-300">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <motion.div 
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="flex whitespace-nowrap"
              >
                {[...Array(4)].map((_, i) => (
                  <span 
                    key={i}
                    className="text-[14vw] font-display font-black text-black/10 dark:text-gold-500/10 uppercase tracking-[0.15em] select-none pr-16 transition-colors duration-300"
                  >
                    ATHLETIC
                  </span>
                ))}
              </motion.div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div 
                style={{ y: heroY, opacity: heroOpacity }}
                className="max-w-2xl mx-auto text-center flex flex-col items-center"
              >
                
                <motion.h1 
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
                  className="font-display text-5xl sm:text-7xl font-black text-black dark:text-white uppercase tracking-tighter leading-[0.95] text-center transition-colors duration-300"
                >
                  DIET <span className="text-zinc-500">&amp;</span> <br /> <span className="text-gold-500 italic">WORKOUT LAB</span>
                </motion.h1>

                <motion.p 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                  className="mt-5 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto text-center font-sans transition-colors duration-300"
                >
                  Calculate your daily calories and macros with our simple tools, and follow proven workout plans designed to help you build muscle and lose fat.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.45, ease: "easeOut" }}
                  className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
                >
                  <Link
                    href="/tools/calculators"
                    className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 via-amber-400 to-gold-500 hover:from-gold-400 hover:via-amber-300 hover:to-gold-400 text-black font-display font-black text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:shadow-[0_0_50px_rgba(234,179,8,0.65)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2.5 cursor-pointer border border-gold-300/40"
                  >
                    <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-button-shimmer pointer-events-none" />
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    <span className="relative z-10 font-black">LAUNCH DIET ENGINE</span>
                    <ArrowRight className="relative z-10 h-4 w-4 stroke-[3] transform group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>

                  <Link
                    href="/academy/portal"
                    className="relative group overflow-hidden w-full sm:w-auto px-8 py-4 bg-zinc-950/80 hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white border border-zinc-800 hover:border-gold-500/80 rounded-xl font-display font-black text-xs tracking-widest uppercase transition-all duration-300 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(212,163,89,0.25)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2.5 cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/10 to-gold-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500/40 group-hover:bg-gold-500 group-hover:scale-125 transition-all duration-300" />
                    <span className="relative z-10">TRAINING SPLITS</span>
                  </Link>
                </motion.div>

              </motion.div>
            </div>
          </section>

          <FeaturesShowcase />
          <EliteArsenal />
          <ScrollingTicker />
          <MythsSection />
          <AboutSection />

        </div>
      </main>
    </>
  );
}
