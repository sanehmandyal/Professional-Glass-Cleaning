import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Shield, CheckCircle2, Clock } from 'lucide-react';

export default function LocationCard({ location }) {
  const isBase = location.type === 'Primary Base';

  return (
    <div
      className={`glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden ${
        isBase ? 'border-2 border-brand-400 bg-brand-50/40 shadow-glass-hover' : ''
      }`}
    >
      {/* Base Badge */}
      {isBase && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-brand-500 text-white shadow-sm">
          <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
          Operations Base
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600">
              {location.type || 'Service Hub'}
            </span>
            <h3 className="text-xl font-bold text-navy-900 tracking-tight">{location.name}</h3>
          </div>
        </div>

        <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
          {location.heroSubtitle || location.description}
        </p>

        {/* Coverage Neighborhoods List */}
        {location.coverageAreas && location.coverageAreas.length > 0 && (
          <div className="mb-5">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Key Local Coverage Areas:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {location.coverageAreas.slice(0, 4).map((area, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface-200/70 text-slate-700 border border-slate-200"
                >
                  {area}
                </span>
              ))}
              {location.coverageAreas.length > 4 && (
                <span className="inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-lg text-brand-600">
                  +{location.coverageAreas.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <Link
          to={`/locations/${location.slug}`}
          className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-navy-900 bg-white hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center justify-center gap-1.5 border border-slate-200 shadow-sm"
        >
          <span>View {location.name} Services</span>
          <ArrowRight className="w-4 h-4 text-brand-500" />
        </Link>
      </div>
    </div>
  );
}
