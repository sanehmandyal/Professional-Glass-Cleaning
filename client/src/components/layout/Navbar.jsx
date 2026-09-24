import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  MapPin,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Star,
  Layers,
  Info,
  HelpCircle,
  Home,
} from 'lucide-react';
import Logo from '../Logo';
import { useBusiness } from '../../context/BusinessContext';
import { DEFAULT_WHATSAPP_MESSAGE } from '../../utils/business';

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
  { name: 'Zirakpur (HQ)', path: '/locations/zirakpur', badge: 'Green Enclave' },
  { name: 'Mohali (SAS Nagar)', path: '/locations/mohali' },
  { name: 'Chandigarh', path: '/locations/chandigarh' },
  { name: 'Punjab (Selected Hubs)', path: '/locations/punjab' },
];

export default function Navbar() {
  const { business } = useBusiness();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setLocationsDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Handle ESC key to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
        setLocationsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Dynamic Announcement Banner managed by Admin */}
      {business.showAnnouncement && business.announcementText && (
        <div className="bg-gradient-to-r from-navy-950 via-brand-900 to-navy-950 text-white text-xs py-2 px-4 border-b border-brand-500/20 text-center relative z-50">
          <div className="container-custom flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
            <span className="font-semibold text-slate-100">{business.announcementText}</span>
            <a
              href={business.phoneHref}
              className="underline font-bold text-amber-300 hover:text-white ml-2 text-[11px]"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-glass py-2 sm:py-2.5'
            : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 sm:py-3.5'
        }`}
      >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Logo variant="full" />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
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
            href={business.phoneHref}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{business.phone}</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-glass transition-all duration-200 hover:-translate-y-0.5 glass-shine"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button with comfortable touch padding */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={business.phoneHref}
            className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-200 flex items-center justify-center"
            aria-label="Call Business Phone"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-xl text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 active:scale-95 touch-manipulation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-brand-600" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer Navigation (Adaptive for all devices & screen sizes) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop Blur Overlay with click to close */}
          <div
            className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div
            className="relative ml-auto w-full max-w-sm sm:max-w-md bg-white h-[100dvh] shadow-2xl flex flex-col z-10 animate-slideLeft border-l border-slate-200 overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white sticky top-0 z-20">
              <Logo variant="full" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Banner */}
            <div className="px-4 py-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-brand-100 font-medium uppercase tracking-wider">Fast Service Hotline</p>
                  <p className="text-sm font-bold tracking-tight">{business.phone}</p>
                </div>
              </div>
              <a
                href={business.phoneHref}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-white text-brand-700 hover:bg-brand-50 transition-colors shadow-sm"
              >
                Call Now
              </a>
            </div>

            {/* Scrollable Navigation Body */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 overscroll-contain">
              {/* Home */}
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                <Home className="w-4 h-4 text-slate-400" />
                <span>Home</span>
              </NavLink>

              {/* Services Collapsible Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <Link
                    to="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center gap-3 px-3.5 py-2.5 font-bold text-sm text-navy-900 hover:text-brand-600"
                  >
                    <Sparkles className="w-4 h-4 text-brand-500" />
                    <span>Our Services</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                    className="p-2.5 text-slate-400 hover:text-brand-600 transition-transform"
                    aria-label="Toggle Services List"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileServicesOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileServicesOpen && (
                  <div className="px-3 pb-2.5 pt-1 space-y-1 bg-white border-t border-slate-100 animate-fadeIn">
                    {FEATURED_SERVICES.map((svc) => (
                      <Link
                        key={svc.path}
                        to={svc.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      >
                        <span>{svc.name}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 rounded-lg text-xs font-bold text-brand-600 bg-brand-50/80 hover:bg-brand-100 transition-colors mt-2"
                    >
                      View All 14 Services →
                    </Link>
                  </div>
                )}
              </div>

              {/* Locations Collapsible Accordion */}
              <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <Link
                    to="/locations"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 flex items-center gap-3 px-3.5 py-2.5 font-bold text-sm text-navy-900 hover:text-brand-600"
                  >
                    <MapPin className="w-4 h-4 text-brand-500" />
                    <span>Service Locations</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileLocationsOpen((prev) => !prev)}
                    className="p-2.5 text-slate-400 hover:text-brand-600 transition-transform"
                    aria-label="Toggle Locations List"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileLocationsOpen ? 'rotate-180 text-brand-600' : ''
                      }`}
                    />
                  </button>
                </div>

                {mobileLocationsOpen && (
                  <div className="px-3 pb-2.5 pt-1 space-y-1 bg-white border-t border-slate-100 animate-fadeIn">
                    {PRIMARY_LOCATIONS.map((loc) => (
                      <Link
                        key={loc.path}
                        to={loc.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                      >
                        <span>{loc.name}</span>
                        {loc.badge && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-100 text-brand-700">
                            {loc.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                    <Link
                      to="/locations"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-center py-2 rounded-lg text-xs font-bold text-brand-600 bg-brand-50/80 hover:bg-brand-100 transition-colors mt-2"
                    >
                      View Coverage Area Map →
                    </Link>
                  </div>
                )}
              </div>

              {/* Reviews */}
              <NavLink
                to="/reviews"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Customer Reviews</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  4.9 ★
                </span>
              </NavLink>

              {/* About */}
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                <Info className="w-4 h-4 text-slate-400" />
                <span>About Us</span>
              </NavLink>

              {/* FAQs */}
              <NavLink
                to="/faqs"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Frequently Asked Questions</span>
              </NavLink>

              {/* Contact */}
              <NavLink
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-navy-900 hover:bg-slate-50'
                  }`
                }
              >
                <Phone className="w-4 h-4 text-brand-500" />
                <span>Contact & Directions</span>
              </NavLink>
            </nav>

            {/* Bottom Sticky Action Area */}
            <div className="p-4 border-t border-slate-200 bg-slate-50/80 space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={business.phoneHref}
                  className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-navy-900 hover:bg-brand-50 hover:text-brand-600 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-600" />
                  <span>Call Direct</span>
                </a>
                <a
                  href={business.whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-glass transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Instant Free Quote</span>
              </Link>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                📍 {business.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
    </>
  );
}
