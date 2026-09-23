import React from 'react';
import { LogOut, Menu, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminNavbar({ onToggleMobile }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="md:hidden p-2 rounded-xl text-navy-900 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs">
            <User className="w-4 h-4" />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">
            Signed in as <strong className="text-navy-900">{admin?.name || 'Admin'}</strong>
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          logout();
          navigate('/admin/login');
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Logout</span>
      </button>
    </header>
  );
}
