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
  Shield,
  PhoneCall,
} from 'lucide-react';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/enquiries', label: 'Enquiries & Leads', icon: MessageSquare },
  { to: '/admin/reviews', label: 'Customer Reviews', icon: Star },
  { to: '/admin/services', label: 'Services & Photos', icon: Sparkles },
  { to: '/admin/locations', label: 'Service Areas', icon: MapPin },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/seo', label: 'SEO Settings', icon: Search },
  { to: '/admin/business-info', label: 'Business Info', icon: Settings },
  { to: '/admin/settings', label: 'Password & Security', icon: KeyRound },
];

export default function AdminSidebar({ onClose }) {
  return (
    <aside className="w-64 h-full bg-[#0b1329] text-slate-300 flex flex-col justify-between border-r border-slate-800 select-none">
      <div className="flex flex-col min-h-0 flex-1">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-cyan-400 p-0.5 shadow-md shrink-0 flex items-center justify-center">
              <div className="w-full h-full bg-[#0b1329] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xs font-black text-white tracking-wider uppercase truncate">
                Professional Glass
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  Admin Console
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
            Main Management
          </p>
          <nav className="space-y-1">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-300 font-bold border border-brand-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-brand-400' : 'text-slate-400 group-hover:text-slate-300'
                      }`}
                    />
                    <span className="truncate">{label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-800/80 shrink-0 bg-[#080d1d] space-y-2">
        <div className="flex items-center justify-between px-2 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3 h-3 text-emerald-400" />
            <span className="font-semibold text-slate-300">8539842072</span>
          </span>
          <span className="text-[10px] text-slate-500">Zirakpur Hub</span>
        </div>

        <Link
          to="/"
          target="_blank"
          className="w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors border border-slate-700/60"
        >
          <span>View Live Website</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </Link>
      </div>
    </aside>
  );
}
