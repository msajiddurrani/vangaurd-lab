import React from 'react';
import AboutSection from '../../components/AboutSection';
import { BookOpen } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50 dark:bg-[#050505] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 border-b border-gray-200 dark:border-zinc-900 pb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-gold-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-4">
            <BookOpen className="h-4 w-4" />
            <span>The Vanguard Mission</span>
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-6">
            ABOUT <span className="text-gold-500 italic">US</span>
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
            Discover the science behind our methods and why Vanguard Athletic Lab is the ultimate hub for maximizing human performance and potential.
          </p>
        </div>

      </div>

      <AboutSection />
    </div>
  );
}
