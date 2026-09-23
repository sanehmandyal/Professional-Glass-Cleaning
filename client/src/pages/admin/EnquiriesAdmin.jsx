import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  MessageCircle,
  Trash2,
  CheckCircle,
  Clock,
  User,
  Calendar,
} from 'lucide-react';
import apiClient from '../../services/api';

const STATUSES = ['All', 'Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];

export default function EnquiriesAdmin() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchEnquiries = () => {
    setLoading(true);
    apiClient
      .get('/enquiries')
      .then((res) => {
        if (res.data?.data) {
          setEnquiries(res.data.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await apiClient.patch(`/enquiries/${id}`, { status: newStatus });
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this enquiry?')) return;
    try {
      await apiClient.delete(`/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      alert('Failed to delete enquiry');
    }
  };

  const filteredEnquiries = enquiries.filter((enq) => {
    const matchesStatus = statusFilter === 'All' || enq.status === statusFilter;
    const matchesSearch =
      enq.name?.toLowerCase().includes(search.toLowerCase()) ||
      enq.phone?.includes(search) ||
      enq.service?.toLowerCase().includes(search.toLowerCase()) ||
      enq.location?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Customer Enquiries & Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage incoming quote requests and update follow-up statuses.
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
        >
          Refresh Leads
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-200 bg-white flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client, phone, service, area..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs glass-input"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {STATUSES.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                statusFilter === st
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-surface-100 text-slate-600 hover:bg-surface-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries List */}
      {loading ? (
        <div className="p-12 text-center text-slate-500 font-semibold text-xs">
          Loading customer enquiries...
        </div>
      ) : filteredEnquiries.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredEnquiries.map((enq) => (
            <div
              key={enq._id}
              className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-base text-navy-900">{enq.name}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      enq.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : enq.status === 'Contacted'
                        ? 'bg-blue-100 text-blue-800'
                        : enq.status === 'Confirmed'
                        ? 'bg-purple-100 text-purple-800'
                        : enq.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {enq.status}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {new Date(enq.createdAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600 pt-1">
                  <p>
                    <strong className="text-navy-900">Phone: </strong>
                    <a href={`tel:${enq.phone}`} className="text-brand-600 font-bold hover:underline">
                      {enq.phone}
                    </a>
                  </p>
                  <p>
                    <strong className="text-navy-900">Service: </strong>
                    <span className="text-slate-800 font-semibold">{enq.service}</span>
                  </p>
                  <p>
                    <strong className="text-navy-900">Location: </strong>
                    <span>{enq.location || 'Not specified'}</span>
                  </p>
                  {enq.preferredDate && (
                    <p>
                      <strong className="text-navy-900">Preferred Date: </strong>
                      <span>{new Date(enq.preferredDate).toLocaleDateString('en-IN')}</span>
                    </p>
                  )}
                </div>

                {enq.message && (
                  <div className="p-3 rounded-xl bg-surface-100 border border-slate-200 text-xs text-slate-700 mt-2">
                    <strong className="text-navy-900 block mb-0.5">Customer Message:</strong>
                    <p className="whitespace-pre-wrap">{enq.message}</p>
                  </div>
                )}
              </div>

              {/* Status Update & Direct Action Controls */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${enq.phone}`}
                    className="p-2 rounded-xl bg-brand-50 text-brand-600 hover:bg-brand-100 transition-colors border border-brand-200"
                    title="Call Client"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Hello ${enq.name}, thank you for your enquiry regarding ${enq.service} with Professional Glass Cleaning Service.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors border border-emerald-200"
                    title="Message on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => handleDelete(enq._id)}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors border border-rose-200"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Status Dropdown */}
                <div className="w-36">
                  <select
                    value={enq.status}
                    disabled={updatingId === enq._id}
                    onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                    className="w-full py-1.5 px-2.5 rounded-lg text-xs font-semibold glass-input bg-white border border-slate-300"
                  >
                    {STATUSES.filter((s) => s !== 'All').map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 text-center glass-panel rounded-3xl bg-white border border-slate-200 text-slate-500 text-xs">
          No enquiries matching your filter criteria.
        </div>
      )}
    </div>
  );
}
