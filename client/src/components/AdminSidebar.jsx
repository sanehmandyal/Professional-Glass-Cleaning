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
    <aside className="w-64 shrink-0 bg-navy-950 text-slate-300 min-h-screen flex flex-col justify-between border-r border-slate-800">
      <div>
        <div className="p-6 border-b border-slate-800/80">
          <Logo variant="footer" asLink={false} />
          <p className="text-[11px] font-bold text-brand-400 uppercase tracking-widest mt-2">
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
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
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

      <div className="p-4 border-t border-slate-800/80">
        <Link
          to="/"
          target="_blank"
          className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold flex items-center justify-between transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </aside>
  );
}
