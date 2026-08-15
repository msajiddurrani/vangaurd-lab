import React from 'react';
import { motion } from 'motion/react';
import { Activity, Dumbbell, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: "Diagnostic Lab",
    desc: "Calibrate your macros and estimate your 1RM using elite calculation formulas engineered for peak performance.",
    icon: Activity,
    link: "/tools/calculators",
    color: "from-amber-500/20 to-amber-500/0",
    border: "group-hover:border-amber-500/50",
    iconColor: "text-amber-500"
  },
  {
    title: "Exercise Library",
    desc: "A comprehensive kinesiology database categorizing execution mechanics with high-fidelity visual demonstrations.",
    icon: BookOpen,
    link: "/academy/exercise-library",
    color: "from-emerald-500/20 to-emerald-500/0",
    border: "group-hover:border-emerald-500/50",
    iconColor: "text-emerald-500"
  },
  {
    title: "Training Portal",
    desc: "Access structured plans, active workout timers, and advanced educational guides to shatter your plateaus.",
    icon: Dumbbell,
    link: "/academy/portal",
    color: "from-rose-500/20 to-rose-500/0",
    border: "group-hover:border-rose-500/50",
    iconColor: "text-rose-500"
  }
];

export default function FeaturesShowcase() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-300">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-500 font-mono text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block"
          >
            Vanguard Ecosystem
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-black text-black dark:text-white uppercase tracking-tighter transition-colors duration-300"
          >
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-600">Dominance</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (idx + 1), duration: 0.6 }}
            >
              <Link href={feat.link} className={`group block relative p-8 rounded-3xl bg-white dark:bg-[#0b0b0d] border border-gray-200 dark:border-zinc-900 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/50 ${feat.border}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-zinc-800 flex items-center justify-center mb-8 ${feat.iconColor} group-hover:scale-110 transition-transform duration-500`}>
                    <feat.icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-black text-black dark:text-white uppercase tracking-tight mb-4 group-hover:text-gold-400 transition-colors">
                    {feat.title}
                  </h3>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 font-mono text-sm leading-relaxed mb-8 flex-grow group-hover:text-zinc-900 dark:group-hover:text-zinc-300 transition-colors">
                    {feat.desc}
                  </p>
                  
                  <div className="flex items-center text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors mt-auto">
                    <span>Initialize Sequence</span>
                    <ChevronRight className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
