import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 rounded-xl glass-panel text-xs sm:text-sm text-slate-600 mb-6 flex items-center flex-wrap gap-1.5 shadow-sm">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-slate-600 hover:text-brand-500 transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5 text-brand-500" />
        <span>Home</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {isLast || !item.url ? (
              <span className="font-semibold text-navy-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url}
                className="text-slate-600 hover:text-brand-500 transition-colors font-medium truncate max-w-[150px] sm:max-w-none"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
