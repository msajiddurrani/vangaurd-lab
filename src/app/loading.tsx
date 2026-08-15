import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col pt-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      {/* Skeleton Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 animate-pulse gap-6">
        <div className="h-12 w-64 bg-zinc-900 rounded-xl"></div>
        <div className="flex gap-4">
          <div className="h-10 w-24 bg-zinc-900 rounded-lg"></div>
          <div className="h-10 w-24 bg-zinc-900 rounded-lg"></div>
          <div className="h-10 w-24 bg-zinc-900 rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[#0b0b0d] border border-zinc-900 rounded-2xl p-6 h-64 animate-pulse flex flex-col">
            <div className="h-40 w-full bg-zinc-900 rounded-xl mb-4"></div>
            <div className="h-6 w-3/4 bg-zinc-900 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-zinc-900 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
