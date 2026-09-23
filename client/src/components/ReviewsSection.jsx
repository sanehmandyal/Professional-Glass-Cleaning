import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, MessageSquare, Plus, ThumbsUp, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import apiClient from '../services/api';
import { FALLBACK_REVIEWS } from '../data/fallbackData';
import WriteReviewModal from './WriteReviewModal';

export default function ReviewsSection({ title = 'Verified Customer Reviews', subtitle = 'Real feedback from homeowners, businesses & showrooms across Zirakpur, Mohali & Chandigarh' }) {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get('/reviews');
      if (res.data?.success && res.data.data?.length > 0) {
        setReviews(res.data.data);
      }
    } catch (err) {
      console.warn('Using fallback customer reviews:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReviewSubmitted = (newReview) => {
    // Optionally alert or refresh
    fetchReviews();
  };

  // Calculations
  const totalCount = reviews.length;
  const avgRating =
    totalCount > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount).toFixed(1)
      : '5.0';

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fourStarCount = reviews.filter((r) => r.rating === 4).length;

  const filteredReviews =
    selectedFilter === 'All'
      ? reviews
      : selectedFilter === '5 Stars'
      ? reviews.filter((r) => r.rating === 5)
      : selectedFilter === 'Featured'
      ? reviews.filter((r) => r.isFeatured)
      : reviews;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-white to-sky-50/40 relative overflow-hidden" id="reviews">
      {/* Ambient background blur circles */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-brand-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>Customer Satisfaction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
            {title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            {subtitle}
          </p>
        </div>

        {/* Rating Summary Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 sm:p-8 mb-12 border border-brand-100 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Average Score */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-slate-200/80 pb-6 md:pb-0 md:pr-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-navy-900 tracking-tight">{avgRating}</span>
                <span className="text-lg font-bold text-slate-400">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Based on {totalCount} verified service reviews
              </span>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold text-slate-700">5 Stars</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${totalCount ? (fiveStarCount / totalCount) * 100 : 100}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-slate-500">{fiveStarCount}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-12 font-bold text-slate-700">4 Stars</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-300 rounded-full"
                    style={{ width: `${totalCount ? (fourStarCount / totalCount) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-8 text-right font-medium text-slate-500">{fourStarCount}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-12">1-3 Stars</span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-300 rounded-full" style={{ width: '0%' }} />
                </div>
                <span className="w-8 text-right">0</span>
              </div>
            </div>

            {/* Write Review CTA Button */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-3 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Customer Feedback</span>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-sky-500 hover:from-brand-700 hover:to-sky-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                <span>Write a Customer Review</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {['All', '5 Stars', 'Featured'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedFilter === filter
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredReviews.map((rev, idx) => (
            <div
              key={rev._id || idx}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Header: Customer Name & Verified Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-sky-400 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 leading-snug">{rev.name}</h4>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{rev.location || 'Zirakpur / Tricity'}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                {/* Star Rating & Service Tag */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
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
                  </div>

                  {rev.service && (
                    <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md truncate max-w-[150px]">
                      {rev.service}
                    </span>
                  )}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Admin Official Response (if available) */}
              {rev.adminReply && (
                <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/80 -mx-6 -mb-6 p-4 rounded-b-2xl">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-navy-900 mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-brand-500" />
                    <span>Response from Owner:</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {rev.adminReply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      <WriteReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}
