"use client";

import React, { useState } from 'react';
import { Activity, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function BodyMetrics() {
  const [height, setHeight] = useState<number>(70); // inches
  const [weight, setWeight] = useState<number>(180); // lbs
  const [neck, setNeck] = useState<number>(15); // inches
  const [waist, setWaist] = useState<number>(32); // inches
  const [gender, setGender] = useState<'male' | 'female'>('male');

  // U.S. Navy Method for Body Fat Percentage (simplified inches)
  const calculateBodyFat = () => {
    if (gender === 'male') {
      const bf = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
      return Math.max(0, Math.min(bf, 100)).toFixed(1);
    } else {
      // Need hips for female, we'll use a simplified estimate if hips are missing, or just add a standard modifier for demo
      // Simplified: male formula + ~8-10% for essential fat differences
      const bf = (86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76) + 8;
      return Math.max(0, Math.min(bf, 100)).toFixed(1);
    }
  };

  const bfPercent = calculateBodyFat();
  const leanMass = (weight * (1 - parseFloat(bfPercent) / 100)).toFixed(1);
  const fatMass = (weight * (parseFloat(bfPercent) / 100)).toFixed(1);

  // BMI
  const bmi = ((weight / (height * height)) * 703).toFixed(1);
  
  const getBMICategory = (bmi: string) => {
    const val = parseFloat(bmi);
    if (val < 18.5) return 'Underweight';
    if (val < 25) return 'Normal Weight';
    if (val < 30) return 'Overweight';
    return 'Obese';
  };

  return (
    <div className="bg-[#0b0b0d]/80 border border-zinc-900 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:border-zinc-800 transition-colors">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-zinc-900/50">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Activity className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="font-display text-lg font-black text-white uppercase tracking-wider">Body Metrics</h3>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Simple Tape Measure Method</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 relative z-10">
        <div className="space-y-4">
          
          <div className="flex bg-[#050505] rounded-lg border border-zinc-800 p-0.5">
            <button 
              onClick={() => setGender('male')}
              className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase transition-all rounded ${gender === 'male' ? 'bg-zinc-800 text-emerald-500' : 'text-zinc-500'}`}
            >MALE</button>
            <button 
              onClick={() => setGender('female')}
              className={`flex-1 py-2 text-[10px] font-mono font-bold uppercase transition-all rounded ${gender === 'female' ? 'bg-zinc-800 text-emerald-500' : 'text-zinc-500'}`}
            >FEMALE</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Weight (lbs)</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Height (in)</label>
              <input 
                type="number" 
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Neck (in)</label>
              <input 
                type="number" 
                value={neck}
                onChange={(e) => setNeck(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5">Waist (in)</label>
              <input 
                type="number" 
                value={waist}
                onChange={(e) => setWaist(parseFloat(e.target.value) || 0)}
                className="w-full bg-[#050505] border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#050505] border border-emerald-500/20 rounded-2xl p-5 shadow-[0_0_20px_rgba(16,185,129,0.05)]">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 mb-2 font-bold flex items-center justify-between">
              Body Fat Percentage
              <Target className="w-3 h-3" />
            </h4>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-display font-black text-white">{bfPercent}%</span>
              <span className="text-xs font-mono text-zinc-500 mb-1 border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded">
                Fat Mass: {fatMass} lbs
              </span>
            </div>
            <div className="w-full bg-zinc-900 h-1.5 rounded-full mt-4 overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, parseFloat(bfPercent))}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#050505] border border-zinc-900 rounded-xl p-4">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">Lean Body Mass</h4>
              <div className="text-xl font-bold text-white">{leanMass} <span className="text-xs text-zinc-500">lbs</span></div>
            </div>
            <div className="bg-[#050505] border border-zinc-900 rounded-xl p-4">
              <h4 className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">BMI Index</h4>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">{bmi}</span>
                <span className={`text-[8px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded ${
                  getBMICategory(bmi) === 'Normal Weight' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                }`}>{getBMICategory(bmi)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
