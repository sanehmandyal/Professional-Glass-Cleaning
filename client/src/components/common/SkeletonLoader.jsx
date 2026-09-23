import React from 'react';

export default function SkeletonLoader({ type = 'card', count = 3 }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl animate-pulse space-y-4">
            <div className="h-48 bg-slate-200 rounded-2xl w-full"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-100 rounded w-full"></div>
              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-xl w-full pt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'row') {
    return (
      <div className="space-y-3">
        {items.map((_, idx) => (
          <div key={idx} className="h-16 bg-slate-100 rounded-2xl animate-pulse w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-8 glass-panel rounded-3xl animate-pulse space-y-4">
      <div className="h-8 bg-slate-200 rounded w-1/2"></div>
      <div className="h-4 bg-slate-100 rounded w-full"></div>
      <div className="h-4 bg-slate-100 rounded w-4/5"></div>
      <div className="h-32 bg-slate-100 rounded-2xl w-full"></div>
    </div>
  );
}
