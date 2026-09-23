import { Link } from 'react-router-dom';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

const serviceLinks = [
  { to: '/services/glass-cleaning', label: 'Glass Cleaning' },
  { to: '/services/glass-repair', label: 'Glass Repair' },
  { to: '/services/silicone-repair', label: 'Silicone Repair' },
  { to: '/services/sgpc-repairing', label: 'SGPC Repairing' },
  { to: '/services/water-tank-cleaning', label: 'Water Tank Cleaning' },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
];

const Footer = () => (
  <footer className="bg-navy-950 text-white/80">
    <div className="container-x py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <Logo dark />
        <p className="mt-4 text-sm leading-relaxed text-white/60 max-w-xs">
          Professional glass cleaning and repair services in Zirakpur and nearby areas.
        </p>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2.5 text-sm">
          {quickLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-skyline-300 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4">Services</h4>
        <ul className="space-y-2.5 text-sm">
          {serviceLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="hover:text-skyline-300 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2.5">
            <Phone size={16} className="text-skyline-400 shrink-0" />
            <a href={BUSINESS.phoneHref} className="hover:text-skyline-300">{BUSINESS.phoneDisplay}</a>
          </li>
          <li className="flex items-start gap-2.5">
            <MapPin size={16} className="text-skyline-400 shrink-0 mt-0.5" />
            <span>{BUSINESS.address}</span>
          </li>
          <li className="flex items-center gap-2.5">
            <MessageCircle size={16} className="text-skyline-400 shrink-0" />
            <a
              href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-skyline-300"
            >
              Chat on WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container-x py-5 text-center text-xs text-white/50">
        © 2026 Professional Glass Cleaning Service. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
