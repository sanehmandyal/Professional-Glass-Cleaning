import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  MapPin,
  MessageSquare,
  Star,
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
  { to: '/admin/services', label: 'Services & Images', icon: Sparkles },
  { to: '/admin/locations', label: 'Service Areas', icon: MapPin },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/seo', label: 'SEO Settings', icon: Search },
  { to: '/admin/business-info', label: 'Business Info', icon: Settings },
  { to: '/admin/settings', label: 'Password & Security', icon: KeyRound },
];

export default function AdminSidebar({ onClose }) {
  return (
    <aside className="w-64 h-full bg-navy-950 text-slate-300 flex flex-col justify-between border-r border-slate-800/80">
      <div className="flex flex-col min-h-0 flex-1">
        {/* Header */}
        <div className="p-4 border-b border-slate-800/80 shrink-0">
          <Logo variant="footer" asLink={false} />
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">
              Admin Portal • 8539842072
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800/80 shrink-0 bg-navy-950">
        <Link
          to="/"
          target="_blank"
          className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-brand-500/20 text-slate-300 hover:text-brand-300 text-xs font-medium flex items-center justify-between transition-colors border border-slate-800 hover:border-brand-500/30"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </aside>
  );
}
