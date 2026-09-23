import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Palette,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Sliders,
  Sparkles,
} from 'lucide-react';
import apiClient from '../../services/api';

export default function SettingsAdmin() {
  const [activeTab, setActiveTab] = useState('security');

  // Password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState(null);

  // Admin profile state
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // Business Info & UI site state
  const [siteForm, setSiteForm] = useState({
    businessName: 'Professional Glass Cleaning Service',
    phone: '8539842072',
    whatsapp: '918539842072',
    address: 'Green Enclave, Zirakpur, Punjab 140603, India',
    serviceArea: 'Zirakpur, Mohali (SAS Nagar), Chandigarh, Tricity & nearby areas',
    announcementText: 'Special 10% Discount on Residential & Commercial Glass Cleaning in Zirakpur & Mohali!',
    showAnnouncement: false,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603',
  });
  const [siteLoading, setSiteLoading] = useState(false);
  const [siteMsg, setSiteMsg] = useState(null);

  useEffect(() => {
    // Load current admin info
    apiClient
      .get('/auth/me')
      .then((res) => {
        if (res.data?.admin) {
          setProfileForm({
            name: res.data.admin.name || '',
            email: res.data.admin.email || '',
          });
        }
      })
      .catch(() => {});

    // Load business info & site settings
    apiClient
      .get('/business-info')
      .then((res) => {
        if (res.data?.data) {
          setSiteForm((prev) => ({
            ...prev,
            ...res.data.data,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Handle password change
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await apiClient.put('/auth/update-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.data?.token) {
        localStorage.setItem('gc_admin_token', res.data.token);
      }

      setPasswordMsg({
        type: 'success',
        text: res.data.message || 'Password updated successfully!',
      });
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      setPasswordMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update password. Check your current password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Handle profile update
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);

    try {
      const res = await apiClient.put('/auth/profile', profileForm);
      setProfileMsg({
        type: 'success',
        text: res.data.message || 'Profile updated successfully!',
      });
    } catch (err) {
      setProfileMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Handle UI & Site settings update
  const handleSiteSubmit = async (e) => {
    e.preventDefault();
    setSiteMsg(null);
    setSiteLoading(true);

    try {
      await apiClient.put('/business-info', siteForm);
      setSiteMsg({
        type: 'success',
        text: 'UI settings & Business Information updated successfully!',
      });
    } catch (err) {
      setSiteMsg({
        type: 'error',
        text: err.response?.data?.message || 'Failed to update site settings.',
      });
    } finally {
      setSiteLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-1.5">
            Admin Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-950">
            Security & Portal Settings
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
            Manage admin password, account credentials, and public website UI configurations.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Password & Credentials</span>
        </button>

        <button
          onClick={() => setActiveTab('ui')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'ui'
              ? 'bg-brand-500 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>UI & Site Appearance</span>
        </button>
      </div>

      {/* TAB 1: PASSWORD & SECURITY */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Password Change Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Change Admin Password</h3>
                <p className="text-xs text-slate-500">
                  Update your admin login password securely.
                </p>
              </div>
            </div>

            {passwordMsg && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                  passwordMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {passwordMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{passwordMsg.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Password *
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    required
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <input
                    type={showNew ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    placeholder="Minimum 6 characters"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-glass flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{passwordLoading ? 'Updating Password...' : 'Save New Password'}</span>
              </button>
            </form>
          </div>

          {/* Admin Profile Details */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Admin Account Info</h3>
                <p className="text-xs text-slate-500">
                  Update primary account details.
                </p>
              </div>
            </div>

            {profileMsg && (
              <div
                className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                  profileMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {profileMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                )}
                <span>{profileMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Login Email
                </label>
                <input
                  type="email"
                  required
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{profileLoading ? 'Saving...' : 'Update Account Info'}</span>
                </button>
              </div>
            </form>

            <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-navy-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                Security Information
              </p>
              <p className="text-[11px] text-slate-500">
                JWT sessions are automatically renewed. Always use a strong password with letters, numbers, and special characters.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UI & SITE APPEARANCE */}
      {activeTab === 'ui' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-navy-900">Live Website UI & Contact Controls</h3>
                <p className="text-xs text-slate-500">
                  Changes saved here update the public website headers, sticky bars, and contact links immediately.
                </p>
              </div>
            </div>
          </div>

          {siteMsg && (
            <div
              className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
                siteMsg.type === 'success'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {siteMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{siteMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleSiteSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Primary Hotline Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={siteForm.phone}
                    onChange={(e) => setSiteForm({ ...siteForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pl-10"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  WhatsApp Number (with country code) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={siteForm.whatsapp}
                    onChange={(e) => setSiteForm({ ...siteForm, whatsapp: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pl-10"
                  />
                  <MessageCircle className="w-4 h-4 text-emerald-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Physical Office & Dispatch Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={siteForm.address}
                  onChange={(e) => setSiteForm({ ...siteForm, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pl-10"
                />
                <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Region Description
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={siteForm.serviceArea}
                  onChange={(e) => setSiteForm({ ...siteForm, serviceArea: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 pl-10"
                />
                <Globe className="w-4 h-4 text-brand-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Promotional Live Announcement Banner */}
            <div className="p-4 rounded-2xl bg-surface-100 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold text-navy-900">
                    Live Announcement Banner on Website
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={siteForm.showAnnouncement}
                    onChange={(e) =>
                      setSiteForm({ ...siteForm, showAnnouncement: e.target.checked })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-500"></div>
                </label>
              </div>

              <div>
                <input
                  type="text"
                  value={siteForm.announcementText}
                  onChange={(e) =>
                    setSiteForm({ ...siteForm, announcementText: e.target.value })
                  }
                  placeholder="Enter top banner announcement message..."
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={siteLoading}
              className="py-3 px-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-glass flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{siteLoading ? 'Saving Site UI...' : 'Save Website Settings'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
