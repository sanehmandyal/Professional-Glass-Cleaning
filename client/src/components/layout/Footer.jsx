import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ExternalLink, ShieldCheck, ChevronRight, Heart } from 'lucide-react';
import Logo from '../Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 relative overflow-hidden border-t border-slate-800">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="container-custom pt-16 pb-24 sm:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="footer" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Professional glass cleaning and repair services serving Zirakpur and selected nearby areas. Dedicated to streak-free clarity, authentic repairs, and dependable customer service.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 max-w-md">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>Green Enclave, Zirakpur, Punjab 140603, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href="tel:+918539842072" className="hover:text-white font-bold text-brand-300 transition-colors">
                  +91 8539842072
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/918539842072"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/10 text-slate-300 border border-white/15 hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

          {/* Col 3: Key Services */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 font-display">
              Our Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/services/glass-cleaning" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Glass Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/sgpc-repairing" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  SGPC Repairing
                </Link>
              </li>
              <li>
                <Link to="/services/silicone-repair" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Silicone Repair
                </Link>
              </li>
              <li>
                <Link to="/services/glass-repair" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Glass Repair
                </Link>
              </li>
              <li>
                <Link to="/services/water-tank-cleaning" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Water Tank Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/commercial-glass-cleaning" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Commercial Facades
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-brand-400 hover:underline font-semibold pt-1 inline-block">
                  View All 14 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Areas */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 font-display">
              Areas We Serve
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/locations/zirakpur" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Zirakpur (Green Enclave Base)
                </Link>
              </li>
              <li>
                <Link to="/locations/mohali" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Mohali (SAS Nagar)
                </Link>
              </li>
              <li>
                <Link to="/locations/chandigarh" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Chandigarh (Tricity)
                </Link>
              </li>
              <li>
                <Link to="/locations/punjab" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Punjab (Selected Areas)
                </Link>
              </li>
              <li>
                <Link to="/zirakpur/glass-cleaning" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Zirakpur Glass Cleaning
                </Link>
              </li>
              <li>
                <Link to="/mohali/glass-repair" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Mohali Glass Repair
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company Links */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  FAQ Knowledgebase
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  Contact & Bookings
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/admin/login" className="text-slate-500 hover:text-slate-400 text-xs">
                  Owner / Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {currentYear} Professional Glass Cleaning Service. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Primary Phone: </span>
            <a href="tel:+918539842072" className="font-bold text-slate-300 hover:underline">
              8539842072
            </a>
            <span className="mx-1.5">•</span>
            <span>Green Enclave, Zirakpur</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
