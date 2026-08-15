import React from 'react';
import ExerciseLibrary from '../../../components/ExerciseLibrary';
import { BookOpen } from 'lucide-react';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function ExerciseLibraryPage() {
  return (
    <ProtectedRoute>
      <div className="bg-[#050505] min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row gap-6 justify-between items-end">
          <div>
            <div className="inline-flex items-center space-x-2 text-gold-500 font-mono text-[10px] tracking-[0.25em] uppercase mb-2">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Kinesiology Database</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tighter leading-none">
              EXERCISE <span className="text-gold-500 italic">LIBRARY</span>
            </h1>
            <p className="text-sm text-zinc-500 font-mono uppercase tracking-wider mt-3 max-w-2xl">
              A comprehensive encyclopedia of biomechanical movements, categorized by target musculature with exact execution parameters.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 bg-[#0b0b0d] px-3 py-1.5 rounded-lg uppercase tracking-widest">
              Live Index
            </span>
          </div>
        </div>

        <ExerciseLibrary />

      </div>
      </div>
    </ProtectedRoute>
  );
}
