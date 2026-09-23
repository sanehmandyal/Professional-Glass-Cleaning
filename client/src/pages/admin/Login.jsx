import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 px-4 relative overflow-hidden">
      {/* Background glow reflections */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-panel p-8 sm:p-10 rounded-3xl bg-white/95 max-w-md w-full shadow-2xl border border-white/40 relative z-10 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Logo variant="full" />
          <div className="mt-5">
            <h1 className="text-xl font-bold text-navy-950">Operations Portal Login</h1>
            <p className="text-xs text-slate-500 mt-1">
              Authorized business management access only.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder="admin@professionalglasscleaning.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-glass flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-100 space-y-2">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-left text-[11px] text-slate-600 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-900">Default Admin Account</p>
              <p className="text-slate-500 font-mono text-[10px]">admin@professionalglasscleaning.com</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@professionalglasscleaning.com');
                setPassword('Admin@123456');
              }}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-brand-50 text-brand-600 hover:bg-brand-100 border border-brand-200 cursor-pointer"
            >
              Fill
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            🔒 Secure JWT encrypted operations access.
          </p>
        </div>
      </div>
    </div>
  );
}
