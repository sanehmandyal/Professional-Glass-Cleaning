import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Users,
  Star,
  RefreshCw,
  Database,
  CheckCircle2,
} from 'lucide-react';
import apiClient from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingEnquiries: 0,
    contactedEnquiries: 0,
    completedEnquiries: 0,
    totalServices: 0,
    totalLocations: 0,
    totalReviews: 6,
    pendingReviews: 0,
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMsg, setSyncMsg] = useState(null);

  const fetchDashboardData = () => {
    setLoading(true);
    Promise.allSettled([
      apiClient.get('/enquiries'),
      apiClient.get('/services?all=true'),
      apiClient.get('/locations?all=true'),
      apiClient.get('/reviews/admin/all'),
    ]).then(([enqRes, svcRes, locRes, revRes]) => {
      if (enqRes.status === 'fulfilled' && enqRes.value.data?.data) {
        const list = enqRes.value.data.data;
        setStats((prev) => ({
          ...prev,
          totalEnquiries: list.length,
          pendingEnquiries: list.filter((e) => e.status === 'Pending').length,
          contactedEnquiries: list.filter((e) => e.status === 'Contacted').length,
          completedEnquiries: list.filter((e) => e.status === 'Completed').length,
        }));
        setRecentEnquiries(list.slice(0, 5));
      }

      if (svcRes.status === 'fulfilled' && svcRes.value.data?.data) {
        setStats((prev) => ({ ...prev, totalServices: svcRes.value.data.data.length }));
      }

      if (locRes.status === 'fulfilled' && locRes.value.data?.data) {
        setStats((prev) => ({ ...prev, totalLocations: locRes.value.data.data.length }));
      }

      if (revRes.status === 'fulfilled' && revRes.value.data?.data) {
        const revs = revRes.value.data.data;
        setStats((prev) => ({
          ...prev,
          totalReviews: revs.length,
          pendingReviews: revs.filter((r) => !r.isApproved).length,
        }));
      }

      setLoading(false);
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSyncAllData = async () => {
    if (!window.confirm('Synchronize and seed all 14 services, 4 locations, FAQs, reviews, and business settings into the live database?')) {
      return;
    }
    setSyncLoading(true);
    setSyncMsg(null);
    let success = false;
    let msg = 'Database synchronized successfully with all catalog items!';

    try {
      const res = await apiClient.post('/services/seed-all');
      msg = res.data?.message || msg;
      success = true;
    } catch {
      try {
        const res = await apiClient.post('/admin/seed-all');
        msg = res.data?.message || msg;
        success = true;
      } catch {
        try {
          await apiClient.post('/services/seed');
          success = true;
        } catch (err) {
          success = false;
          msg = err.response?.data?.message || 'Failed to synchronize database.';
        }
      }
    }

    if (success) {
      setSyncMsg({ type: 'success', text: msg });
      fetchDashboardData();
    } else {
      setSyncMsg({ type: 'error', text: msg });
    }
    setSyncLoading(false);
    setTimeout(() => setSyncMsg(null), 6000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Operations overview, lead pipeline, and full website content management.
          </p>
        </div>

        <button
          onClick={handleSyncAllData}
          disabled={syncLoading}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${syncLoading ? 'animate-spin' : ''}`} />
          <span>{syncLoading ? 'Synchronizing DB...' : 'Sync Website Data to Live DB'}</span>
        </button>
      </div>

      {syncMsg && (
        <div
          className={`p-4 rounded-2xl text-xs font-semibold flex items-center gap-2.5 ${
            syncMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {syncMsg.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{syncMsg.text}</span>
        </div>
      )}

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Pending Enquiries */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-200 bg-amber-50/40 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Pending Leads
            </p>
            <p className="text-3xl font-extrabold text-amber-900 mt-1">
              {stats.pendingEnquiries}
            </p>
            <p className="text-[11px] text-amber-700 mt-0.5">Requires callback</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Total Leads */}
        <div className="glass-panel p-5 rounded-2xl border border-brand-200 bg-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Total Enquiries
            </p>
            <p className="text-3xl font-extrabold text-navy-900 mt-1">{stats.totalEnquiries}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">All-time customer requests</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Total Active Services */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Active Services
            </p>
            <p className="text-3xl font-extrabold text-navy-900 mt-1">{stats.totalServices || 14}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Published offerings</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Locations */}
        <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Service Hubs
            </p>
            <p className="text-3xl font-extrabold text-navy-900 mt-1">{stats.totalLocations || 4}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Zirakpur, Mohali, Chd, PB</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-navy-900">Recent Customer Enquiries</h2>
            <p className="text-xs text-slate-500">Latest submissions from website lead forms.</p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Client Name</th>
                  <th className="py-3 px-3">Phone</th>
                  <th className="py-3 px-3">Service</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </td>
                    <td className="py-3 px-3 font-bold text-navy-900">{enq.name}</td>
                    <td className="py-3 px-3 font-semibold text-brand-600">
                      <a href={`tel:${enq.phone}`}>{enq.phone}</a>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{enq.service}</td>
                    <td className="py-3 px-3 text-slate-500">{enq.location || '—'}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          enq.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="text-xs font-bold text-brand-600 hover:underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-slate-500 text-xs">
            No customer enquiries logged yet.
          </div>
        )}
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          to="/admin/reviews"
          className="p-5 rounded-2xl glass-panel hover:bg-white transition-all border border-amber-200 bg-amber-50/20 flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-navy-900 group-hover:text-brand-600">
              Customer Reviews
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {stats.pendingReviews > 0
                ? `⚡ ${stats.pendingReviews} pending moderation`
                : `${stats.totalReviews} total customer ratings`}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
        </Link>

        <Link
          to="/admin/services"
          className="p-5 rounded-2xl glass-panel hover:bg-white transition-all border border-slate-200 flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-navy-900 group-hover:text-brand-600">
              Manage Services
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Edit titles, descriptions & process</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
        </Link>

        <Link
          to="/admin/locations"
          className="p-5 rounded-2xl glass-panel hover:bg-white transition-all border border-slate-200 flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-navy-900 group-hover:text-brand-600">
              Manage Service Areas
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Zirakpur, Mohali & Chandigarh hubs</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
        </Link>

        <Link
          to="/admin/seo"
          className="p-5 rounded-2xl glass-panel hover:bg-white transition-all border border-slate-200 flex items-center justify-between group"
        >
          <div>
            <h3 className="font-bold text-sm text-navy-900 group-hover:text-brand-600">
              SEO Page Settings
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Custom titles, descriptions & canonicals</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
        </Link>
      </div>
    </div>
  );
}
