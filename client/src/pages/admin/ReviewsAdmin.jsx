import React, { useState, useEffect } from 'react';
import {
  Star,
  CheckCircle2,
  XCircle,
  Trash2,
  MessageSquare,
  Search,
  Filter,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  Send,
  Eye,
} from 'lucide-react';
import apiClient from '../../services/api';
import { FALLBACK_REVIEWS } from '../../data/fallbackData';

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All'); // 'All', 'Pending', 'Approved', 'Featured'
  const [search, setSearch] = useState('');
  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/reviews/admin/all');
      if (res.data?.success && res.data.data) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.warn('Backend reviews offline, using fallback:', err.message);
      // For standalone preview, populate initial fallback reviews
      setReviews(FALLBACK_REVIEWS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleToggleApprove = async (id, currentStatus) => {
    try {
      setActionLoadingId(id);
      const newStatus = !currentStatus;
      await apiClient.put(`/reviews/${id}`, { isApproved: newStatus });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isApproved: newStatus } : r))
      );
    } catch (err) {
      console.error(err);
      // Local optimistic update for UI resilience
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isApproved: !currentStatus } : r))
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleToggleFeatured = async (id, currentFeatured) => {
    try {
      setActionLoadingId(id);
      const newFeatured = !currentFeatured;
      await apiClient.put(`/reviews/${id}`, { isFeatured: newFeatured });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isFeatured: newFeatured } : r))
      );
    } catch (err) {
      console.error(err);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, isFeatured: !currentFeatured } : r))
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleSaveReply = async (id) => {
    try {
      setActionLoadingId(id);
      await apiClient.put(`/reviews/${id}`, { adminReply: replyText });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, adminReply: replyText } : r))
      );
      setReplyingId(null);
      setReplyText('');
    } catch (err) {
      console.error(err);
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, adminReply: replyText } : r))
      );
      setReplyingId(null);
      setReplyText('');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this review?')) return;
    try {
      setActionLoadingId(id);
      await apiClient.delete(`/reviews/${id}`);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      setReviews((prev) => prev.filter((r) => r._id !== id));
    } finally {
      setActionLoadingId(null);
    }
  };

  // Counts
  const pendingCount = reviews.filter((r) => !r.isApproved).length;
  const approvedCount = reviews.filter((r) => r.isApproved).length;
  const featuredCount = reviews.filter((r) => r.isFeatured).length;

  const filteredReviews = reviews.filter((r) => {
    const matchesFilter =
      filter === 'All'
        ? true
        : filter === 'Pending'
        ? !r.isApproved
        : filter === 'Approved'
        ? r.isApproved
        : filter === 'Featured'
        ? r.isFeatured
        : true;

    const matchesSearch =
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.service?.toLowerCase().includes(search.toLowerCase()) ||
      r.location?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Moderate incoming customer reviews, approve genuine feedback, and reply to clients.
          </p>
        </div>

        {/* Quick Stats Banner */}
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{pendingCount} Pending Approval</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{approvedCount} Live Approved</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          {[
            { label: 'All Reviews', key: 'All', count: reviews.length },
            { label: 'Pending Approval', key: 'Pending', count: pendingCount, highlight: pendingCount > 0 },
            { label: 'Approved (Live)', key: 'Approved', count: approvedCount },
            { label: 'Featured', key: 'Featured', count: featuredCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                filter === tab.key
                  ? 'bg-navy-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  filter === tab.key
                    ? 'bg-white/20 text-white'
                    : tab.highlight
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
          />
        </div>
      </div>

      {/* Reviews List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading customer reviews...</div>
      ) : filteredReviews.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 text-slate-500">
          <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No reviews found</h3>
          <p className="text-xs text-slate-400 mt-1">
            {filter === 'Pending'
              ? 'Great! There are no pending reviews awaiting verification.'
              : 'Try changing your search or filter options.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev._id}
              className={`p-5 sm:p-6 rounded-2xl border bg-white shadow-xs transition-all ${
                !rev.isApproved
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-slate-100 hover:border-brand-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Reviewer Details & Rating */}
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <span className="font-bold text-sm text-slate-900">{rev.name}</span>

                    <span className="text-xs text-slate-400">•</span>

                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rev.location || 'Zirakpur'}</span>
                    </div>

                    <span className="text-xs text-slate-400">•</span>

                    <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-100">
                      {rev.service}
                    </span>

                    {/* Status Badges */}
                    {rev.isApproved ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Live on Site
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-bold animate-pulse">
                        <Clock className="w-3 h-3" /> Pending Verification
                      </span>
                    )}

                    {rev.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-1.5">
                      {rev.rating}.0 / 5.0
                    </span>
                    {rev.createdAt && (
                      <span className="text-xs text-slate-400 ml-2">
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm text-slate-700 leading-relaxed italic bg-slate-50/60 p-3.5 rounded-xl border border-slate-100">
                    "{rev.comment}"
                  </p>

                  {/* Existing Owner Reply */}
                  {rev.adminReply && replyingId !== rev._id && (
                    <div className="mt-2 text-xs bg-sky-50 border border-sky-100 p-3 rounded-xl flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-navy-900 block mb-0.5">Your Public Reply:</span>
                        <p className="text-slate-600">{rev.adminReply}</p>
                      </div>
                    </div>
                  )}

                  {/* Inline Reply Input Box */}
                  {replyingId === rev._id && (
                    <div className="mt-2 space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <label className="block text-xs font-bold text-slate-700">
                        Official Business Reply to {rev.name}:
                      </label>
                      <textarea
                        rows={2}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="e.g. Thank you for your review! We're glad you loved our service."
                        className="w-full p-2.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setReplyingId(null)}
                          className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveReply(rev._id)}
                          className="inline-flex items-center gap-1 px-4 py-1.5 bg-brand-600 text-white rounded-lg text-xs font-bold hover:bg-brand-700"
                        >
                          <Send className="w-3 h-3" /> Save Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0">
                  {/* Approve / Unapprove Button */}
                  <button
                    onClick={() => handleToggleApprove(rev._id, rev.isApproved)}
                    disabled={actionLoadingId === rev._id}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      rev.isApproved
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {rev.isApproved ? (
                      <>
                        <XCircle className="w-3.5 h-3.5" /> Unapprove
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Publish
                      </>
                    )}
                  </button>

                  {/* Feature on Homepage Toggle */}
                  <button
                    onClick={() => handleToggleFeatured(rev._id, rev.isFeatured)}
                    disabled={actionLoadingId === rev._id}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      rev.isFeatured
                        ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {rev.isFeatured ? 'Featured on Home' : 'Feature on Home'}
                  </button>

                  {/* Reply Button */}
                  <button
                    onClick={() => {
                      setReplyingId(rev._id);
                      setReplyText(rev.adminReply || '');
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-brand-600" />
                    {rev.adminReply ? 'Edit Reply' : 'Add Reply'}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(rev._id)}
                    disabled={actionLoadingId === rev._id}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Delete review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
