import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Sparkles, Phone, AlertCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';

export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Professional Glass Cleaning Service"
        description="The page you were looking for cannot be found. Navigate back to our services or homepage."
        robots="noindex, follow"
      />

      <div className="container-custom py-24 text-center">
        <div className="max-w-md mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-glass">
            <AlertCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-4xl font-extrabold text-navy-950 font-display block mb-1">404</span>
            <h1 className="text-2xl font-bold text-navy-900">Looking for something?</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              We couldn’t find the exact page you requested. Please use the links below to navigate our services or reach out directly.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/"
              className="py-3 px-5 rounded-xl font-bold text-sm text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back Home</span>
            </Link>

            <Link
              to="/services"
              className="py-3 px-5 rounded-xl font-bold text-sm text-navy-900 bg-surface-100 hover:bg-surface-200 transition-colors border border-slate-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>View Services</span>
            </Link>

            <Link
              to="/contact"
              className="py-3 px-5 rounded-xl font-bold text-sm text-slate-700 hover:text-navy-900 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-slate-400" />
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
