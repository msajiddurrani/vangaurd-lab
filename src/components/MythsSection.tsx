"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { XCircle, CheckCircle, Skull, Zap } from 'lucide-react';

const MYTHS = [
  {
    id: 'm1',
    myth: "Lifting heavy weights makes you bulky.",
    fact: "Building muscle requires eating more calories and years of consistent training. Lifting heavy weights simply makes you stronger and more toned.",
    category: "PHYSIOLOGY"
  },
  {
    id: 'm2',
    myth: "You must drink protein immediately after your workout.",
    fact: "The 'anabolic window' is a myth. Hitting your daily protein goal matters much more than rushing to drink a shake right after your workout.",
    category: "NUTRITION"
  },
  {
    id: 'm3',
    myth: "Doing cardio destroys your muscle gains.",
    fact: "Smart cardio improves blood flow and actually speeds up recovery, helping you build muscle in the long run.",
    category: "PROGRAMMING"
  },
  {
    id: 'm4',
    myth: "You can target fat loss by doing specific exercises.",
    fact: "You can't choose where you lose fat. Fat loss happens all over your body, so doing crunches won't burn belly fat specifically.",
    category: "METABOLISM"
  },
  {
    id: 'm5',
    myth: "More hours in the gym equals faster results.",
    fact: "Muscles grow while you rest, not while you train. Overtraining can actually slow down your progress and lead to burnout.",
    category: "RECOVERY"
  }
];

export default function MythsSection() {
  const [activeMyth, setActiveMyth] = useState<string | null>(MYTHS[0].id);

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden border-t border-gray-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-zinc-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-4"
          >
            <Skull className="w-3 h-3 text-red-500" />
            <span>Debunking the dogma</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter transition-colors duration-300"
          >
            SHATTER THE <span className="text-red-500 italic">MYTHS</span>
          </motion.h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-500 font-sans text-base max-w-2xl mx-auto transition-colors duration-300">
            The fitness industry is full of confusing advice. Let's break down the most common myths and reveal the truth about getting in shape.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Interactive List */}
          <div className="lg:col-span-5 space-y-3">
            {MYTHS.map((m) => {
              const isActive = activeMyth === m.id;
              return (
                <motion.button
                  key={m.id}
                  onClick={() => setActiveMyth(isActive ? null : m.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                    isActive 
                      ? 'bg-gray-100 dark:bg-zinc-900 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]' 
                      : 'bg-white dark:bg-[#0b0b0d] border-gray-200 dark:border-zinc-800 hover:border-gray-400 dark:hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
                      {m.category}
                    </span>
                    <XCircle className={`w-4 h-4 transition-colors ${isActive ? 'text-red-500' : 'text-zinc-400 dark:text-zinc-600 group-hover:text-red-500/50'}`} />
                  </div>
                  <h3 className={`font-display font-black text-lg uppercase transition-all duration-300 ${
                    isActive ? 'text-red-500 line-through opacity-50' : 'text-zinc-800 dark:text-zinc-300'
                  }`}>
                    "{m.myth}"
                  </h3>
                </motion.button>
              );
            })}
          </div>

          {/* Fact Display Board */}
          <div className="lg:col-span-7 relative">
            <div className="sticky top-24 bg-white/90 dark:bg-[#0b0b0d]/80 backdrop-blur-md border border-emerald-500/20 rounded-3xl p-8 md:p-12 min-h-[400px] flex flex-col justify-center shadow-[0_0_50px_rgba(16,185,129,0.05)] transition-colors duration-300">
              <AnimatePresence mode="wait">
                {activeMyth ? (
                  <motion.div
                    key={activeMyth}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg mb-6">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] font-mono font-bold text-emerald-500 tracking-widest uppercase">
                        SCIENTIFIC FACT
                      </span>
                    </div>
                    
                    <p className="text-xl md:text-3xl font-display font-black text-black dark:text-white uppercase leading-tight mb-8 transition-colors duration-300">
                      {MYTHS.find(m => m.id === activeMyth)?.fact}
                    </p>
                    
                    <div className="flex items-center gap-3 text-zinc-500">
                      <Zap className="w-4 h-4 text-emerald-500/50" />
                      <span className="text-[9px] font-mono uppercase tracking-widest">
                        Validated by Sports Science
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-zinc-600"
                  >
                    <Skull className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p className="font-mono text-xs uppercase tracking-widest">
                      Select a myth to reveal the truth.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
