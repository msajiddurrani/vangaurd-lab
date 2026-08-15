"use client";

import React, { useState } from 'react';
import { Calculator, ChevronRight, Activity, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function OneRepMax() {
  const [weight, setWeight] = useState<number>(225);
  const [reps, setReps] = useState<number>(5);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  // Epley Formula: 1RM = Weight * (1 + 0.0333 * Reps)
  // Brzycki Formula: 1RM = Weight / (1.0278 - 0.0278 * Reps)
  
  const calculate1RM = () => {
    if (reps === 1) return weight;
    // We'll use a blend or simply Epley for general use
    const epley = weight * (1 + 0.0333 * reps);
    return Math.round(epley);
  };

  const oneRM = calculate1RM();

  const percentages = [
    { pct: 100, reps: '1', focus: '1 Rep Max (Heaviest)' },
    { pct: 95, reps: '2', focus: 'Heavy Strength' },
    { pct: 90, reps: '3-4', focus: 'Build Strength' },
    { pct: 85, reps: '5-6', focus: 'Strength & Size' },
    { pct: 80, reps: '7-8', focus: 'Build Muscle Size' },
    { pct: 75, reps: '9-10', focus: 'Build Muscle Size' },
    { pct: 70, reps: '11-12', focus: 'Muscle Tone' },
    { pct: 60, reps: '15+', focus: 'Muscle Endurance' }
  ];

  return (
    <div className="bg-[#0b0b0d]/80 border border-zinc-900 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-zinc-800 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-900/50">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center">
          <Calculator className="h-5 w-5 text-gold-500" />
        </div>
        <div>
          <h3 className="font-display text-lg font-black text-white uppercase tracking-wider">1RM Calculator</h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Find your max weight safely</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Weight Lifted</label>
            <div className="flex bg-[#050505] rounded-xl border border-zinc-800 p-1">
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full bg-transparent px-4 py-2 text-xl font-bold text-white focus:outline-none"
              />
              <div className="flex bg-zinc-900 rounded-lg p-0.5">
                <button 
                  onClick={() => setUnit('lbs')}
                  className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${unit === 'lbs' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                >LBS</button>
                <button 
                  onClick={() => setUnit('kg')}
                  className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase transition-all ${unit === 'kg' ? 'bg-zinc-800 text-gold-500' : 'text-zinc-500'}`}
                >KG</button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Reps Completed</label>
            <input 
              type="range" 
              min="1" max="15" 
              value={reps}
              onChange={(e) => setReps(parseInt(e.target.value))}
              className="w-full accent-gold-500 h-1.5 bg-zinc-900 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-3">
              <span className="text-3xl font-display font-black text-white">{reps}</span>
              <span className="text-sm font-mono text-zinc-500 ml-2">REPS</span>
            </div>
          </div>

          <div className="bg-[#050505] border border-gold-500/20 rounded-2xl p-6 text-center shadow-[0_0_20px_rgba(212,163,89,0.05)]">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-1 font-bold">Estimated 1 Rep Max</h4>
            <div className="text-5xl font-display font-black text-white my-2">{oneRM} <span className="text-xl text-zinc-500">{unit}</span></div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">Always use a spotter when lifting heavy!</p>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 font-bold flex items-center gap-2">
            <Zap className="w-3 h-3 text-gold-500" /> Weight Recommendations
          </h4>
          <div className="space-y-2">
            {percentages.map((p) => {
              const calcWeight = Math.round(oneRM * (p.pct / 100));
              return (
                <div key={p.pct} className="flex items-center justify-between bg-[#050505] p-3 rounded-xl border border-zinc-900 hover:border-zinc-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold w-12 text-right ${p.pct >= 90 ? 'text-rose-500' : p.pct >= 75 ? 'text-amber-500' : 'text-emerald-500'}`}>
                      {p.pct}%
                    </span>
                    <span className="text-white font-bold">{calcWeight} {unit}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-zinc-400">{p.reps} Reps</div>
                    <div className="text-[8px] font-mono text-zinc-600 uppercase hidden sm:block">{p.focus}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
