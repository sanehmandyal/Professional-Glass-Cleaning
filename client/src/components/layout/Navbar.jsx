import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, Sparkles, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';
import Logo from '../Logo';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    hasDropdown: true,
  },
  {
    name: 'Locations',
    path: '/locations',
    hasDropdown: true,
  },
  { name: 'Reviews', path: '/reviews' },
  { name: 'About', path: '/about' },
  { name: 'FAQs', path: '/faqs' },
  { name: 'Contact', path: '/contact' },
];

const FEATURED_SERVICES = [
  { name: 'Professional Glass Cleaning', path: '/services/glass-cleaning' },
  { name: 'SGPC Repairing', path: '/services/sgpc-repairing' },
  { name: 'Silicone Repair', path: '/services/silicone-repair' },
  { name: 'Glass Repair', path: '/services/glass-repair' },
  { name: 'Water Tank Cleaning', path: '/services/water-tank-cleaning' },
  { name: 'Commercial Glass Cleaning', path: '/services/commercial-glass-cleaning' },
  { name: 'Residential Glass Cleaning', path: '/services/residential-glass-cleaning' },
];

const PRIMARY_LOCATIONS = [
  { name: 'Zirakpur (Base)', path: '/locations/zirakpur', badge: 'Green Enclave' },
  { name: 'Mohali (SAS Nagar)', path: '/locations/mohali' },
  { name: 'Chandigarh', path: '/locations/chandigarh' },
  { name: 'Punjab (Selected Hubs)', path: '/locations/punjab' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setLocationsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-glass py-2.5'
          : 'bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Logo variant="full" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            if (link.name === 'Services') {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onMouseLeave={() => setServicesDropdownOpen(false)}
                >
                  <Link
                    to="/services"
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1 ${
                      location.pathname.startsWith('/services')
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-navy-900 hover:text-brand-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Services</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  {/* Mega dropdown */}
                  <div
                    className={`absolute top-full left-0 w-80 p-3 rounded-2xl glass-panel shadow-glass-lg border border-slate-200 transition-all duration-200 ${
                      servicesDropdownOpen
                        ? 'opacity-100 visible translate-y-1'
                        : 'opacity-0 invisible translate-y-3 pointer-events-none'
                    }`}
                  >
                    <div className="space-y-1">
                      {FEATURED_SERVICES.map((svc) => (
                        <Link
                          key={svc.path}
                          to={svc.path}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/70 transition-colors flex items-center justify-between"
                        >
                          <span>{svc.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <Link
                        to="/services"
                        className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-brand-600 hover:bg-brand-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View All 14 Services</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            if (link.name === 'Locations') {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setLocationsDropdownOpen(true)}
                  onMouseLeave={() => setLocationsDropdownOpen(false)}
                >
                  <Link
                    to="/locations"
                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-1 ${
                      location.pathname.startsWith('/locations')
                        ? 'text-brand-600 bg-brand-50'
                        : 'text-navy-900 hover:text-brand-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>Locations</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
                  </Link>

                  <div
                    className={`absolute top-full left-0 w-72 p-3 rounded-2xl glass-panel shadow-glass-lg border border-slate-200 transition-all duration-200 ${
                      locationsDropdownOpen
                        ? 'opacity-100 visible translate-y-1'
                        : 'opacity-0 invisible translate-y-3 pointer-events-none'
                    }`}
                  >
                    <div className="space-y-1">
                      {PRIMARY_LOCATIONS.map((loc) => (
                        <Link
                          key={loc.path}
                          to={loc.path}
                          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/70 transition-colors flex items-center justify-between"
                        >
                          <span>{loc.name}</span>
                          {loc.badge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                              {loc.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100">
                      <Link
                        to="/locations"
                        className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-brand-600 hover:bg-brand-50 transition-colors flex items-center justify-center gap-1"
                      >
                        <span>View Coverage Map</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-brand-600 bg-brand-50'
                      : 'text-navy-900 hover:text-brand-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+918539842072"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>8539842072</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-glass transition-all duration-200 hover:-translate-y-0.5 glass-shine"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-navy-950/60 backdrop-blur-md z-50 overflow-y-auto animate-fadeIn">
          <div className="bg-white m-3 p-5 rounded-3xl shadow-2xl border border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Quick Emergency Phone Bar */}
            <div className="p-3 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-slate-500">Service Hotline</p>
                <p className="text-sm font-bold text-brand-700">8539842072</p>
              </div>
              <a
                href="tel:+918539842072"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-500 text-white shadow-sm"
              >
                Call Now
              </a>
            </div>

            <div className="space-y-1 border-b border-slate-100 pb-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                Home
              </NavLink>

              <div className="py-1">
                <Link
                  to="/services"
                  className="block px-4 py-2 rounded-xl font-bold text-sm text-navy-900 hover:bg-slate-50"
                >
                  Services
                </Link>
                <div className="pl-4 pr-2 py-1 space-y-1 grid grid-cols-1 gap-1">
                  {FEATURED_SERVICES.map((svc) => (
                    <Link
                      key={svc.path}
                      to={svc.path}
                      className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                    >
                      • {svc.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="py-1">
                <Link
                  to="/locations"
                  className="block px-4 py-2 rounded-xl font-bold text-sm text-navy-900 hover:bg-slate-50"
                >
                  Locations
                </Link>
                <div className="pl-4 pr-2 py-1 space-y-1">
                  {PRIMARY_LOCATIONS.map((loc) => (
                    <Link
                      key={loc.path}
                      to={loc.path}
                      className="block px-3 py-1.5 rounded-lg text-xs text-slate-600 hover:text-brand-600 hover:bg-slate-50"
                    >
                      📍 {loc.name}
                    </Link>
                  ))}
                </div>
              </div>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                About Us
              </NavLink>

              <NavLink
                to="/faqs"
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                FAQs
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl font-bold text-sm ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                Contact & Directions
              </NavLink>
            </div>

            {/* Quick Mobile Action Links */}
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/contact"
                className="w-full py-3 rounded-xl bg-brand-500 font-bold text-sm text-white text-center shadow-glass flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get a Free Quote</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
