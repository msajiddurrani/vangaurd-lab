"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Target, Shield, Flame } from 'lucide-react';
import Link from 'next/link';

const ARSENAL_ITEMS = [
  {
    id: 'diagnostics',
    title: 'LAB DIAGNOSTICS',
    subtitle: 'METRIC CALIBRATION',
    icon: <Zap className="w-6 h-6 text-gold-500" />,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=2000&auto=format&fit=crop',
    description: 'Calculate your daily calories and find your 1-rep max using our easy tools.',
    link: '/tools/calculators'
  },
  {
    id: 'kinesiology',
    title: 'KINESIOLOGY DB',
    subtitle: 'FORM & BIOMECHANICS',
    icon: <Shield className="w-6 h-6 text-gold-500" />,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2000&auto=format&fit=crop',
    description: 'Learn proper lifting technique with our complete exercise library.',
    link: '/academy/exercise-library'
  },
  {
    id: 'challenges',
    title: 'IRON CHALLENGES',
    subtitle: 'TEST YOUR LIMITS',
    icon: <Target className="w-6 h-6 text-gold-500" />,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2000&auto=format&fit=crop',
    description: 'Take on fun fitness challenges like the 1000 lbs club to test your strength.',
    link: '/academy/portal'
  },
  {
    id: 'protocols',
    title: 'ELITE PROTOCOLS',
    subtitle: 'THE BLUEPRINT',
    icon: <Flame className="w-6 h-6 text-gold-500" />,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
    description: 'Proven training programs used by top athletes to build muscle and burn fat.',
    link: '/academy/portal'
  }
];

export default function EliteArsenal() {
  const [activeId, setActiveId] = useState<string>('diagnostics');

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden border-t border-gray-200 dark:border-zinc-900 transition-colors duration-300">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gold-500/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 text-gold-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-4"
          >
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span>Deployment Matrix</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter transition-colors duration-300"
          >
            THE VANGUARD <span className="text-gold-500 italic">ARSENAL</span>
          </motion.h2>
        </div>

        {/* Expanding Cards Layout */}
        <div className="flex flex-col lg:flex-row gap-4 h-[600px] md:h-[500px] w-full max-w-6xl mx-auto">
          {ARSENAL_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                  isActive ? 'lg:flex-[3] flex-[3] shadow-[0_0_40px_rgba(212,163,89,0.15)]' : 'lg:flex-[1] flex-[1] grayscale-[50%] hover:grayscale-0'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{ transform: isActive ? 'scale(1.05)' : 'scale(1)' }}
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' 
                      : 'bg-black/60'
                  }`} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-500 ${
                      isActive ? 'scale-100' : 'scale-90'
                    }`}>
                      {item.icon}
                    </div>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 hidden lg:block'}`}>
                      <h3 className="font-display font-black text-2xl text-[#ffffff] uppercase tracking-wider whitespace-nowrap">
                        {item.title}
                      </h3>
                      <p className="text-[10px] font-mono text-gold-500 uppercase tracking-widest whitespace-nowrap">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Expanded hidden content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-[#e4e4e7] font-sans mt-2 mb-6 max-w-md line-clamp-2 md:line-clamp-none">
                          {item.description}
                        </p>
                        
                        <Link href={item.link}>
                          <button className="px-6 py-3 bg-white text-black font-display font-black text-xs uppercase tracking-widest rounded-xl hover:bg-gold-500 transition-colors flex items-center gap-2 group">
                            DEPLOY NOW 
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Vertical Title for non-active state on desktop */}
                <div className={`absolute inset-0 p-6 flex flex-col justify-end items-center pointer-events-none transition-opacity duration-300 ${
                  isActive ? 'opacity-0' : 'opacity-0 lg:opacity-100'
                }`}>
                  <h3 className="font-display font-black text-xl text-[#ffffff] uppercase tracking-wider -rotate-90 origin-bottom-left absolute bottom-24 left-14 whitespace-nowrap">
                    {item.title}
                  </h3>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
