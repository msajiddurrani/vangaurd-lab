"use client";

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Activity, X, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { exercisesDatabase, Exercise } from '../data/exercises';

const ImageWithSkeleton = ({ src, alt }: { src: string; alt: string }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {!isLoaded && <div className="absolute inset-0 bg-zinc-900 animate-pulse" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${isLoaded ? 'opacity-60 group-hover:opacity-100' : 'opacity-0'}`}
      />
    </>
  );
};

export default function ExerciseLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const categories = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];

  const filteredExercises = useMemo(() => {
    return exercisesDatabase.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ex.primaryMuscle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ex.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (cat: string) => {
    if (cat === selectedCategory) return;
    setIsTransitioning(true);
    setSelectedCategory(cat);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Gentle loading duration
  };

  const categoryImages: Record<string, string> = {
    'Chest': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
    'Back': 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?q=80&w=800&auto=format&fit=crop',
    'Legs': 'https://images.unsplash.com/photo-1434596922112-19c563067271?q=80&w=800&auto=format&fit=crop',
    'Shoulders': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop',
    'Arms': 'https://images.unsplash.com/photo-1581009137042-c552e485697a?q=80&w=800&auto=format&fit=crop',
    'Core': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop',
    'Full Body': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop'
  };

  return (
    <div className="w-full">
      {/* Filters & Search */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0b0b0d] p-4 rounded-2xl border border-zinc-900 shadow-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 h-5 w-5" />
          <input
            type="text"
            placeholder="Search exercises or muscles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#050505] border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`relative whitespace-nowrap px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors ${
                selectedCategory === cat
                  ? 'text-black'
                  : 'text-zinc-400 hover:text-white bg-[#050505] border border-zinc-800'
              }`}
            >
              {selectedCategory === cat && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-gold-500 rounded-lg shadow-[0_0_15px_rgba(212,163,89,0.4)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Exercise Grid with Gentle Skeleton Transition */}
      <div className="min-h-[600px]">
        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div 
              key="skeleton-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-[#0b0b0d] border border-zinc-900 rounded-2xl p-4 flex flex-col h-[280px] animate-pulse">
                  <div className="h-36 w-full bg-zinc-900 rounded-xl mb-4 shrink-0"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="h-4 w-16 bg-zinc-900 rounded"></div>
                    <div className="h-4 w-20 bg-zinc-900 rounded"></div>
                  </div>
                  <div className="h-6 w-3/4 bg-zinc-900 rounded mb-3"></div>
                  <div className="space-y-2 mt-auto">
                    <div className="h-3 w-1/2 bg-zinc-900 rounded"></div>
                    <div className="h-3 w-2/3 bg-zinc-900 rounded"></div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredExercises.map((exercise) => (
                  <motion.div
                    key={exercise.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setSelectedExercise(exercise)}
                    className="bg-[#0b0b0d] border border-zinc-900 hover:border-gold-500/50 rounded-2xl p-4 cursor-pointer group transition-all relative overflow-hidden flex flex-col"
                  >
                    <div className="h-36 w-full mb-4 rounded-xl overflow-hidden relative shrink-0">
                      <ImageWithSkeleton 
                        src={exercise.imageUrl || categoryImages[exercise.category] || categoryImages['Full Body']} 
                        alt={exercise.name} 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0d] via-[#0b0b0d]/50 to-transparent"></div>
                    </div>
                    
                    <div className="flex justify-between items-start mb-3 relative z-10 mt-auto">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-bold bg-gold-500/10 px-2 py-1 rounded">
                        {exercise.category}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded font-bold ${
                        exercise.difficulty === 'Beginner' ? 'text-emerald-400 bg-emerald-400/10' :
                        exercise.difficulty === 'Intermediate' ? 'text-amber-400 bg-amber-400/10' :
                        'text-rose-400 bg-rose-400/10'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight mb-2 relative z-10 group-hover:text-gold-400 transition-colors">
                      {exercise.name}
                    </h3>
                    
                    <div className="space-y-1 relative z-10">
                      <p className="text-xs font-mono text-zinc-400">
                        <span className="text-zinc-600">Target:</span> {exercise.primaryMuscle}
                      </p>
                      <p className="text-xs font-mono text-zinc-400">
                        <span className="text-zinc-600">Equip:</span> {exercise.equipment}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-20">
          <Activity className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
          <p className="text-zinc-500 font-mono uppercase tracking-widest text-sm">No exercises found</p>
        </div>
      )}

      {/* Exercise Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExercise(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0b0b0d] border border-zinc-800 shadow-2xl rounded-3xl p-6 md:p-10"
            >
              <button 
                onClick={() => setSelectedExercise(null)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8 border-b border-zinc-900 pb-6 pr-12">
                <div className="flex gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold-500 font-bold bg-gold-500/10 px-2.5 py-1 rounded">
                    {selectedExercise.category}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold bg-zinc-800 px-2.5 py-1 rounded">
                    {selectedExercise.difficulty}
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                  {selectedExercise.name}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2 font-bold">Anatomy Profile</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 bg-[#050505] p-3 rounded-xl border border-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Primary Mover</p>
                          <p className="text-sm font-medium text-white">{selectedExercise.primaryMuscle}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 bg-[#050505] p-3 rounded-xl border border-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Secondary Synergists</p>
                          <p className="text-sm font-medium text-white">{selectedExercise.secondaryMuscles.join(', ')}</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3 bg-[#050505] p-3 rounded-xl border border-zinc-900/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Required Load/Gear</p>
                          <p className="text-sm font-medium text-white">{selectedExercise.equipment}</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {selectedExercise.tips.length > 0 && (
                    <div className="bg-gold-500/5 border border-gold-500/20 rounded-2xl p-5">
                      <h4 className="text-[10px] font-mono uppercase tracking-widest text-gold-500 mb-3 font-bold flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Pro Tips
                      </h4>
                      <ul className="space-y-2">
                        {selectedExercise.tips.map((tip, i) => (
                          <li key={i} className="text-sm text-zinc-300 flex items-start gap-2">
                            <span className="text-gold-500/50 mt-1">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-4 font-bold">Execution Mechanics</h4>
                  <ol className="space-y-4">
                    {selectedExercise.instructions.map((step, idx) => (
                      <li key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-mono font-bold text-zinc-400">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed pt-0.5">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
