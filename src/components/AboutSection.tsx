"use client";

import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Zap } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function AboutSection() {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-[#0b0b0d] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-black dark:text-white uppercase tracking-tighter leading-tight mb-6 transition-colors duration-300">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-600">Vanguard</span> <br /> Methodology.
            </motion.h2>
            
            <motion.div variants={itemVariants} className="space-y-6 text-zinc-600 dark:text-zinc-400 font-sans text-base leading-relaxed mb-12 transition-colors duration-300">
              <p>
                We are more than just a store—we are a complete training ecosystem designed to help you reach your goals faster and build your best physique.
              </p>
              <p>
                By integrating scientifically-backed workout routines with a massive biomechanical Exercise Library and precision Diet Calculators, every single tool in Vanguard is built to guarantee your success.
              </p>
            </motion.div>

            <div className="space-y-8">
              {[
                { icon: Target, title: "Clear Instructions", desc: "Every exercise in our library includes step-by-step form guides and clear demonstrations." },
                { icon: Zap, title: "Smart Tools", desc: "No guesswork. Use our simple calculators to find your perfect daily calories and max strength." },
                { icon: Shield, title: "Premium Methodology", desc: "High-quality programming perfectly balanced to fuel your hardest workouts and speed up recovery." }
              ].map((item, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex gap-5 items-start group">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-zinc-800 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:border-gold-500/50 group-hover:shadow-[0_0_15px_rgba(212,163,89,0.15)]">
                    <item.icon className="w-5 h-5 text-gold-500 transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-black dark:text-white uppercase tracking-tight text-lg mb-1.5 transition-colors duration-300">{item.title}</h4>
                    <p className="text-sm font-sans text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Imagery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gold-500/10 dark:bg-gold-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-[#050505] aspect-[4/5] lg:aspect-square group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" 
                alt="Athlete training" 
                className="w-full h-full object-cover opacity-80 dark:opacity-50 group-hover:opacity-100 dark:group-hover:opacity-70 group-hover:scale-[1.03] transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 dark:from-[#0b0b0d] dark:via-[#0b0b0d]/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10">
                <div className="backdrop-blur-xl bg-white/60 dark:bg-black/40 border border-gray-200/50 dark:border-white/10 rounded-2xl p-6 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-gold-600 dark:text-gold-500 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">System Stats</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-3xl md:text-4xl font-display font-black text-black dark:text-white mb-1">70+</div>
                      <div className="text-[9px] md:text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-tight">Biomechanic<br/>Movements</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-display font-black text-black dark:text-white mb-1">4</div>
                      <div className="text-[9px] md:text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest leading-tight">Diagnostic<br/>Calculators</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
