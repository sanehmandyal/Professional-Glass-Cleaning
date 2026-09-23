import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check, X, Shield } from 'lucide-react';
import apiClient from '../../services/api';
import { FALLBACK_LOCATIONS } from '../../data/fallbackData';

export default function LocationsAdmin() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLoc, setEditingLoc] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    type: 'Service Area',
    tagline: '',
    heroSubtitle: '',
    description: '',
    coverageAreas: '',
    isActive: true,
  });

  const fetchLocations = () => {
    setLoading(true);
    apiClient
      .get('/locations?all=true')
      .then((res) => {
        if (res.data?.data) {
          setLocations(res.data.data);
        } else {
          setLocations(FALLBACK_LOCATIONS);
        }
      })
      .catch(() => setLocations(FALLBACK_LOCATIONS))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleEdit = (loc) => {
    setEditingLoc(loc);
    setForm({
      name: loc.name || '',
      slug: loc.slug || '',
      type: loc.type || 'Service Area',
      tagline: loc.tagline || '',
      heroSubtitle: loc.heroSubtitle || '',
      description: loc.description || '',
      coverageAreas: Array.isArray(loc.coverageAreas) ? loc.coverageAreas.join(', ') : '',
      isActive: loc.isActive !== false,
    });
  };

  const handleNew = () => {
    setEditingLoc({ _id: 'new' });
    setForm({
      name: '',
      slug: '',
      type: 'Service Area',
      tagline: '',
      heroSubtitle: '',
      description: '',
      coverageAreas: '',
      isActive: true,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      coverageAreas: form.coverageAreas
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingLoc._id === 'new') {
        await apiClient.post('/locations', payload);
      } else {
        await apiClient.put(`/locations/${editingLoc._id}`, payload);
      }
      setEditingLoc(null);
      fetchLocations();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving location');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service location?')) return;
    try {
      await apiClient.delete(`/locations/${id}`);
      fetchLocations();
    } catch (err) {
      alert('Error deleting location');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Service Areas & Locations
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage local SEO hubs, neighborhoods, and active coverage areas.
          </p>
        </div>
        <button
          onClick={handleNew}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-1.5 shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Location</span>
        </button>
      </div>

      {/* Editor Modal / Card */}
      {editingLoc && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-300 bg-white shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy-900">
              {editingLoc._id === 'new' ? 'Create New Location Hub' : `Edit Location: ${form.name}`}
            </h2>
            <button
              onClick={() => setEditingLoc(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Location Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setForm((prev) => ({ ...prev, name, slug: prev.slug || slug }));
                  }}
                  className="w-full px-3 py-2 rounded-xl text-xs glass-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  URL Slug *
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs glass-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Location Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl text-xs glass-input bg-white"
                >
                  <option value="Primary Base">Primary Base (Zirakpur)</option>
                  <option value="Primary Hub">Primary Hub (Mohali / Chandigarh)</option>
                  <option value="Service Area">Service Area</option>
                  <option value="Coverage Region">Coverage Region (Punjab)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Tagline / Subtitle
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="e.g. Our Home Base & Primary Operations Hub"
                className="w-full px-3 py-2 rounded-xl text-xs glass-input"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Detailed Local Description *
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Coverage Neighborhoods (Comma-separated)
              </label>
              <input
                type="text"
                value={form.coverageAreas}
                onChange={(e) => setForm({ ...form, coverageAreas: e.target.value })}
                placeholder="e.g. Green Enclave, VIP Road, High Ground Road, Baltana, Peer Muchalla"
                className="w-full px-3 py-2 rounded-xl text-xs glass-input"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="loc-active"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <label htmlFor="loc-active" className="text-xs font-semibold text-slate-700">
                Publish this location on public website
              </label>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingLoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm"
              >
                Save Location
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Locations List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {locations.map((loc) => (
          <div
            key={loc._id || loc.slug}
            className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <h3 className="font-bold text-base text-navy-900">{loc.name}</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    loc.type === 'Primary Base'
                      ? 'bg-brand-100 text-brand-800'
                      : 'bg-surface-200 text-slate-700'
                  }`}
                >
                  {loc.type}
                </span>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {loc.heroSubtitle || loc.description}
              </p>

              {loc.coverageAreas && loc.coverageAreas.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {loc.coverageAreas.slice(0, 3).map((a, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      {a}
                    </span>
                  ))}
                  {loc.coverageAreas.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-400">
                      +{loc.coverageAreas.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">/locations/{loc.slug}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(loc)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                  title="Edit Location"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                {loc.type !== 'Primary Base' && (
                  <button
                    onClick={() => handleDelete(loc._id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                    title="Delete Location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
