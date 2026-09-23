import React, { useState, useEffect } from 'react';
import { Search, Save, Globe, CheckCircle2, AlertCircle } from 'lucide-react';
import apiClient from '../../services/api';

const DEFAULT_PAGES = [
  { slug: 'home', label: 'Homepage (/)' },
  { slug: 'services', label: 'Services Directory (/services)' },
  { slug: 'locations', label: 'Locations Hub (/locations)' },
  { slug: 'about', label: 'About Us (/about)' },
  { slug: 'gallery', label: 'Project Gallery (/gallery)' },
  { slug: 'faqs', label: 'FAQs (/faqs)' },
  { slug: 'contact', label: 'Contact & Directions (/contact)' },
  { slug: 'zirakpur', label: 'Zirakpur Location Page (/locations/zirakpur)' },
  { slug: 'mohali', label: 'Mohali Location Page (/locations/mohali)' },
  { slug: 'chandigarh', label: 'Chandigarh Location Page (/locations/chandigarh)' },
];

export default function SEOAdmin() {
  const [selectedSlug, setSelectedSlug] = useState('home');
  const [form, setForm] = useState({
    title: '',
    description: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    robots: 'index, follow',
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    setSavedSuccess(false);
    apiClient
      .get(`/seo/${selectedSlug}`)
      .then((res) => {
        if (res.data?.data) {
          const d = res.data.data;
          setForm({
            title: d.title || '',
            description: d.description || '',
            canonicalUrl: d.canonicalUrl || '',
            ogTitle: d.ogTitle || '',
            ogDescription: d.ogDescription || '',
            ogImage: d.ogImage || '',
            robots: d.robots || 'index, follow',
          });
        } else {
          setForm({
            title: '',
            description: '',
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: '',
            robots: 'index, follow',
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);
    try {
      await apiClient.put(`/seo/${selectedSlug}`, form);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      alert('Error updating SEO metadata');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          SEO & Metadata Management
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize search engine title tags, meta descriptions, canonical URLs, and Open Graph cards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Page Selector */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Select Webpage
          </p>
          <div className="space-y-1">
            {DEFAULT_PAGES.map((page) => (
              <button
                key={page.slug}
                onClick={() => setSelectedSlug(page.slug)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  selectedSlug === page.slug
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <span>{page.label}</span>
                <Globe className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Right SEO Meta Form */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">
                Editing SEO For
              </span>
              <h2 className="text-lg font-bold text-navy-900">
                {DEFAULT_PAGES.find((p) => p.slug === selectedSlug)?.label}
              </h2>
            </div>
            {savedSuccess && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved Successfully
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Meta Title */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-navy-900">SEO Page Title</label>
                <span className="text-[11px] text-slate-400">
                  {form.title.length}/60 recommended characters
                </span>
              </div>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Glass Cleaning & Repair Services in Zirakpur | Professional Glass Cleaning"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-medium"
                required
              />
            </div>

            {/* Meta Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-navy-900">Meta Description</label>
                <span className="text-[11px] text-slate-400">
                  {form.description.length}/160 recommended characters
                </span>
              </div>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. Professional glass cleaning, glass repair, silicone repair and water tank cleaning in Zirakpur. Contact 8539842072."
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
                required
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Canonical URL
              </label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                placeholder="https://professionalglasscleaningservice.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>

            {/* Open Graph Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Social Sharing (OG) Title
                </label>
                <input
                  type="text"
                  value={form.ogTitle}
                  onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                  placeholder="Leave blank to use SEO Page Title"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Robots Indexing Directive
                </label>
                <select
                  value={form.robots}
                  onChange={(e) => setForm({ ...form, robots: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input bg-white"
                >
                  <option value="index, follow">index, follow (Recommended for public pages)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow (Hidden/Private)</option>
                </select>
              </div>
            </div>

            {/* Open Graph Image URL */}
            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                OG Image URL
              </label>
              <input
                type="text"
                value={form.ogImage}
                onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                placeholder="https://... image for WhatsApp & Facebook preview"
                className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
              />
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Metadata...' : 'Save SEO Metadata'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
