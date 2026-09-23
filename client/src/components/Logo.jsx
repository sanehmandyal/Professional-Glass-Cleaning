import React from 'react';
import { Link } from 'react-router-dom';

/**
 * High-End Professional Glass Emblem Logo
 * @param {Object} props
 * @param {'full'|'icon'|'mobile'|'footer'} props.variant
 * @param {string} props.className
 * @param {boolean} props.asLink
 */
export default function Logo({ variant = 'full', className = '', asLink = true }) {
  const iconSize = variant === 'icon' ? 'w-10 h-10' : variant === 'mobile' ? 'w-8 h-8' : 'w-10 h-10';

  const Icon = (
    <div className={`relative flex items-center justify-center shrink-0 ${iconSize}`}>
      <svg
        className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        viewBox="0 0 52 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Main Shield Gradient */}
          <linearGradient id="shieldGrad" x1="6" y1="4" x2="46" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0284C7" />
            <stop offset="0.5" stopColor="#1677FF" />
            <stop offset="1" stopColor="#0A2540" />
          </linearGradient>

          {/* Glass Pane Refraction */}
          <linearGradient id="paneTopLeft" x1="12" y1="10" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="1" stopColor="#38BDF8" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="paneTopRight" x1="28" y1="10" x2="40" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="1" stopColor="#0284C7" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="paneBottom" x1="14" y1="26" x2="38" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38BDF8" stopOpacity="0.3" />
            <stop offset="1" stopColor="#0B1F33" stopOpacity="0.6" />
          </linearGradient>

          {/* Golden/White Sparkle Gradient */}
          <linearGradient id="sparkleGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#38BDF8" />
          </linearGradient>
        </defs>

        {/* Outer Hexagonal Shield Base with Specular Bevel */}
        <path
          d="M26 3L45 12V28C45 38.5 36.8 47.4 26 50C15.2 47.4 7 38.5 7 28V12L26 3Z"
          fill="url(#shieldGrad)"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Top-Left Glass Facet */}
        <path
          d="M26 6L10 13.5V26L25 26V7L26 6Z"
          fill="url(#paneTopLeft)"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />

        {/* Top-Right Glass Facet */}
        <path
          d="M26 6L42 13.5V26L27 26V7L26 6Z"
          fill="url(#paneTopRight)"
          stroke="#FFFFFF"
          strokeWidth="0.75"
          strokeOpacity="0.6"
        />

        {/* Bottom Left Triangular Facet */}
        <path
          d="M10 27.5C10 36.5 16.8 44.5 25 47V27.5H10Z"
          fill="url(#paneBottom)"
          stroke="#38BDF8"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />

        {/* Bottom Right Triangular Facet */}
        <path
          d="M42 27.5C42 36.5 35.2 44.5 27 47V27.5H42Z"
          fill="url(#paneBottom)"
          stroke="#38BDF8"
          strokeWidth="0.75"
          strokeOpacity="0.4"
        />

        {/* Specular Diagonal Reflection Beam Across Glass */}
        <path
          d="M13 18L33 6M11 29L39 15M17 41L43 27"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />

        {/* Center Precision Sparkle Star */}
        <path
          d="M26 21C26 24 23 26 20 26C23 26 26 28 26 31C26 28 29 26 32 26C29 26 26 24 26 21Z"
          fill="url(#sparkleGrad)"
        />
        <circle cx="26" cy="26" r="1.2" fill="#FFFFFF" />

        {/* Primary Clean Sparkle Star Top-Right */}
        <path
          d="M44 4C44 7 41.5 9 39 9C41.5 9 44 11 44 14C44 11 46.5 9 49 9C46.5 9 44 7 44 4Z"
          fill="#38BDF8"
        />
        <circle cx="44" cy="9" r="1.5" fill="#FFFFFF" />
      </svg>
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
              variant === 'footer' ? 'text-white' : 'text-slate-900'
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
              variant === 'footer' ? 'text-sky-300' : 'text-slate-500'
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
