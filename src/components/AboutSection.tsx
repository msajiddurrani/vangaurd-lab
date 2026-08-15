import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Zap } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0b0b0d] relative overflow-hidden border-b border-gray-200 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-black dark:text-white uppercase tracking-tighter leading-tight mb-6 transition-colors duration-300">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-600 to-zinc-800 dark:from-zinc-400 dark:to-zinc-600">Vanguard</span> <br /> Methodology.
            </h2>
            
            <div className="space-y-6 text-zinc-600 dark:text-zinc-400 font-mono text-sm md:text-base leading-relaxed mb-10 transition-colors duration-300">
              <p>
                Welcome to the ultimate hub for clinical hypertrophy and elite athletic performance. We are not just a supplement store or a generic gym database—we are a comprehensive kinesiology ecosystem designed for those who take their physical evolution seriously.
              </p>
              <p>
                Our platform integrates evidence-based workout routines with a massive, biomechanically categorized Exercise Library. Whether you are calibrating your macros in our Diagnostic Lab or pushing to failure in the Training Portal, every tool here is engineered to shatter your plateaus.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Target, title: "Precision Execution", desc: "Every exercise in our library includes strict anatomical profiling and mechanic breakdowns." },
                { icon: Zap, title: "Data-Driven Tools", desc: "No guesswork. Use our calculators to dial in your basal metabolic rate and precise rep maxes." },
                { icon: Shield, title: "Elite Supplements", desc: "Clinically dosed ingredients meant to fuel the grueling regimens found in our training splits." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-zinc-800 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-black dark:text-white uppercase tracking-tight text-lg mb-1 transition-colors duration-300">{item.title}</h4>
                    <p className="text-xs font-mono text-zinc-500 dark:text-zinc-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Imagery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gold-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#050505] aspect-[4/5] lg:aspect-square group">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop" 
                alt="Athlete training" 
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gold-500 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">Current Stats</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-display font-black text-white">70+</div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Exercises</div>
                    </div>
                    <div>
                      <div className="text-3xl font-display font-black text-white">4</div>
                      <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Pro Calculators</div>
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
