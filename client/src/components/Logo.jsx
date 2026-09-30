import React from 'react';
import { Link } from 'react-router-dom';

/**
 * High-End Professional Glass Brand Logo Component
 * @param {Object} props
 * @param {'full'|'icon'|'mobile'|'footer'|'graphic'} props.variant
 * @param {string} props.className
 * @param {boolean} props.asLink
 */
export default function Logo({ variant = 'full', dark = false, className = '', asLink = true }) {
  const isDark = dark || variant === 'footer';
  const iconSize =
    variant === 'icon'
      ? 'w-11 h-11'
      : variant === 'mobile'
      ? 'w-9 h-9'
      : variant === 'graphic'
      ? 'w-auto h-12'
      : 'w-11 h-11 sm:w-12 sm:h-12';

  // Graphical Full Emblem Image
  if (variant === 'graphic') {
    const graphicElement = (
      <div className={`relative inline-flex items-center ${className}`}>
        <img
          src="/logo.jpg"
          alt="Professional Glass Cleaning Services"
          className="h-12 w-auto object-contain rounded-xl shadow-sm border border-slate-200/60 bg-white"
        />
      </div>
    );

    return asLink ? (
      <Link to="/" className="group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl" aria-label="Professional Glass Cleaning Home">
        {graphicElement}
      </Link>
    ) : (
      graphicElement
    );
  }

  const Icon = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSize} rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-900/10 bg-white p-0.5 group-hover:scale-105 transition-transform duration-300`}>
      <img
        src="/logo.jpg"
        alt="Professional Glass Cleaning Logo"
        className="w-full h-full object-cover rounded-[10px]"
      />
    </div>
  );

  if (variant === 'icon') {
    return asLink ? (
      <Link to="/" className={`inline-flex items-center ${className}`} aria-label="Professional Glass Cleaning Home">
        {Icon}
      </Link>
    ) : (
      Icon
    );
  }

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {Icon}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            } ${variant === 'mobile' ? 'text-base' : 'text-lg sm:text-xl'}`}
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            PROFESSIONAL
          </span>
          <span className="font-extrabold tracking-tight text-brand-500 text-lg sm:text-xl">
            GLASS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10.5px] font-bold tracking-[0.18em] uppercase ${
              isDark ? 'text-sky-300' : 'text-slate-500'
            }`}
          >
            Cleaning & Repair Service
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-400">Zirakpur</span>
        </div>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        to="/"
        className="group inline-flex items-center focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-xl"
        aria-label="Professional Glass Cleaning Service Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}

