import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const SkeletonBox: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div
    className={`animate-pulse bg-zinc-800/60 dark:bg-zinc-800/60 light:bg-zinc-200/90 rounded-xl relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 light:via-white/40 to-transparent" />
  </div>
);

export const WorkoutsTabSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Sidebar Filter Skeleton */}
      <div className="lg:col-span-3 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl p-5 space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-900/80 light:border-zinc-200 pb-3">
          <SkeletonBox className="h-5 w-24" />
          <SkeletonBox className="h-4 w-12" />
        </div>
        <div className="space-y-3">
          <SkeletonBox className="h-4 w-16" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <SkeletonBox className="h-4 w-4 rounded" />
                <SkeletonBox className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <SkeletonBox className="h-4 w-20" />
          <div className="grid grid-cols-2 gap-2">
            <SkeletonBox className="h-8 rounded-xl" />
            <SkeletonBox className="h-8 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="lg:col-span-9 space-y-6">
        {/* Workout Session Header Player Skeleton */}
        <div className="bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-900/80 light:border-zinc-200 pb-4">
            <div className="space-y-2">
              <SkeletonBox className="h-3 w-32" />
              <SkeletonBox className="h-7 w-64" />
            </div>
            <div className="flex gap-2">
              <SkeletonBox className="h-9 w-28 rounded-xl" />
              <SkeletonBox className="h-9 w-24 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-950/60 light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 space-y-2">
                <SkeletonBox className="h-3 w-20" />
                <SkeletonBox className="h-6 w-32" />
              </div>
            ))}
          </div>

          {/* Exercises Table Skeleton */}
          <div className="space-y-3 pt-2">
            <SkeletonBox className="h-4 w-36" />
            <div className="space-y-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-zinc-950/40 light:bg-zinc-100 border border-zinc-900/80 light:border-zinc-200 flex justify-between items-center">
                  <div className="space-y-1.5 flex-1 pr-4">
                    <SkeletonBox className="h-4 w-48" />
                    <SkeletonBox className="h-3 w-32" />
                  </div>
                  <SkeletonBox className="h-8 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workout Catalog Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0b0b0d]/80 light:bg-white border border-zinc-900 light:border-zinc-200 space-y-3">
              <div className="flex justify-between items-center">
                <SkeletonBox className="h-4 w-20 rounded-full" />
                <SkeletonBox className="h-4 w-16" />
              </div>
              <SkeletonBox className="h-5 w-40" />
              <SkeletonBox className="h-3 w-full" />
              <SkeletonBox className="h-3 w-3/4" />
              <div className="pt-2 flex justify-between items-center">
                <SkeletonBox className="h-3 w-24" />
                <SkeletonBox className="h-7 w-20 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PlansTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      {/* Plan selector header skeleton */}
      <div className="p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-zinc-900/80 light:border-zinc-200 pb-4">
          <div className="space-y-2">
            <SkeletonBox className="h-3 w-28" />
            <SkeletonBox className="h-6 w-56" />
          </div>
          <div className="flex gap-2">
            <SkeletonBox className="h-9 w-32 rounded-xl" />
            <SkeletonBox className="h-9 w-32 rounded-xl" />
          </div>
        </div>

        {/* Days of week tabs skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBox key={i} className="h-12 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Selected Day Details Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <SkeletonBox className="h-5 w-40" />
            <SkeletonBox className="h-4 w-20" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-zinc-950/40 light:bg-zinc-50 border border-zinc-900/80 light:border-zinc-200 flex justify-between items-center">
                <div className="space-y-2">
                  <SkeletonBox className="h-4 w-44" />
                  <SkeletonBox className="h-3 w-28" />
                </div>
                <SkeletonBox className="h-8 w-16 rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-4 shadow-xl">
          <SkeletonBox className="h-5 w-32" />
          <SkeletonBox className="h-10 w-full rounded-xl" />
          <SkeletonBox className="h-10 w-full rounded-xl" />
          <SkeletonBox className="h-10 w-full rounded-xl" />
          <SkeletonBox className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export const ProgramsTabSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 w-full">
      {/* Program Selector Hero Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <SkeletonBox className="h-3 w-24" />
              <SkeletonBox className="h-5 w-16 rounded-full" />
            </div>
            <SkeletonBox className="h-6 w-48" />
            <SkeletonBox className="h-3 w-full" />
            <SkeletonBox className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* 12-Week Interactive Matrix Grid Skeleton */}
      <div className="p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
          <SkeletonBox className="h-5 w-48" />
          <SkeletonBox className="h-4 w-28" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-zinc-950/40 light:bg-zinc-50 border border-zinc-900 light:border-zinc-200 space-y-2 text-center">
              <SkeletonBox className="h-3 w-12 mx-auto" />
              <SkeletonBox className="h-5 w-16 mx-auto" />
              <SkeletonBox className="h-6 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ChallengesTabSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
      {/* Metric Circular Stopwatch Skeleton */}
      <div className="lg:col-span-5 p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-6 shadow-xl text-center flex flex-col items-center">
        <SkeletonBox className="h-4 w-36" />
        <div className="relative w-44 h-44 rounded-full border-4 border-zinc-900 light:border-zinc-200 flex items-center justify-center">
          <SkeletonBox className="h-10 w-24" />
        </div>
        <div className="flex gap-3 w-full">
          <SkeletonBox className="h-10 flex-1 rounded-xl" />
          <SkeletonBox className="h-10 flex-1 rounded-xl" />
        </div>
      </div>

      {/* Challenge Directives Skeleton */}
      <div className="lg:col-span-7 p-6 bg-[#0b0b0d]/90 light:bg-white border border-zinc-900 light:border-zinc-200 rounded-3xl space-y-6 shadow-xl">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <SkeletonBox className="h-5 w-44" />
          <SkeletonBox className="h-4 w-20" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl bg-zinc-950/40 light:bg-zinc-50 border border-zinc-900/80 light:border-zinc-200 flex items-center space-x-3">
              <SkeletonBox className="h-5 w-5 rounded-md" />
              <div className="space-y-1 flex-1">
                <SkeletonBox className="h-4 w-40" />
                <SkeletonBox className="h-3 w-28" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const AcademyPortalSkeleton: React.FC<{ tab?: 'workouts' | 'plans' | 'programs' | 'challenges' }> = ({ tab = 'workouts' }) => {
  switch (tab) {
    case 'plans':
      return <PlansTabSkeleton />;
    case 'programs':
      return <ProgramsTabSkeleton />;
    case 'challenges':
      return <ChallengesTabSkeleton />;
    case 'workouts':
    default:
      return <WorkoutsTabSkeleton />;
  }
};
