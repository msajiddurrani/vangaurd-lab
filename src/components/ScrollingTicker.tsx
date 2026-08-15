import React from 'react';
import { motion } from 'motion/react';

const tickerItems = [
  "CLINICALLY DOSED",
  "//",
  "ELITE KINESIOLOGY",
  "//",
  "HYPERTROPHY OPTIMIZED",
  "//",
  "NO PROPRIETARY BLENDS",
  "//",
  "MAXIMUM BIOAVAILABILITY",
  "//",
  "EVIDENCE BASED TRAINING",
  "//",
  "MACRO ARCHITECT",
  "//"
];

export default function ScrollingTicker() {
  return (
    <div className="w-full bg-gold-500 py-3 overflow-hidden border-y border-gold-400/50 relative z-20 flex">
      {/* 
        We use two identical motion divs scrolling infinitely 
        to create a seamless marquee effect.
      */}
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
      >
        {/* Double the array so it seamlessly loops */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <span 
            key={idx} 
            className={`px-4 text-xs md:text-sm font-mono font-black tracking-[0.2em] uppercase ${
              item === '//' ? 'text-black/30' : 'text-black'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
