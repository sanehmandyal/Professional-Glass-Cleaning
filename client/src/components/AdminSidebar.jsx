import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  MapPin,
  MessageSquare,
  Star,
  Image,
  HelpCircle,
  Settings,
  Search,
  ExternalLink,
  KeyRound,
} from 'lucide-react';
import Logo from './Logo';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/enquiries', label: 'Enquiries & Leads', icon: MessageSquare },
  { to: '/admin/reviews', label: 'Customer Reviews', icon: Star },
  { to: '/admin/services', label: 'Services', icon: Sparkles },
  { to: '/admin/locations', label: 'Service Areas', icon: MapPin },
  { to: '/admin/gallery', label: 'Gallery Images', icon: Image },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/seo', label: 'SEO Settings', icon: Search },
  { to: '/admin/business-info', label: 'Business Info', icon: Settings },
  { to: '/admin/settings', label: 'Password & Security', icon: KeyRound },
];

export default function AdminSidebar({ onClose }) {
  return (
    <aside className="w-64 h-full bg-navy-950 text-slate-300 flex flex-col justify-between border-r border-slate-800/80 overflow-y-auto">
      <div>
        <div className="p-5 border-b border-slate-800/80">
          <Logo variant="footer" asLink={false} />
          <p className="text-[11px] font-bold text-brand-400 uppercase tracking-widest mt-1.5">
            Operations Portal
          </p>
        </div>

        <nav className="p-3 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-3.5 space-y-2.5 border-t border-slate-800/80">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-0.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] uppercase tracking-wider font-bold">Hotline Number</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <p className="font-bold text-white tracking-wide text-xs">8539842072</p>
          <p className="text-[10px] text-slate-500">Green Enclave, Zirakpur</p>
        </div>

        <Link
          to="/"
          target="_blank"
          className="w-full py-2 px-3 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-300 text-xs font-semibold flex items-center justify-between transition-colors border border-brand-500/20"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-brand-400" />
        </Link>
      </div>
    </aside>
  );
}
