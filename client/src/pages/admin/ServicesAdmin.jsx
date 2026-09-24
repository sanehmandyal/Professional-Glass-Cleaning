import React, { useEffect, useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  Search,
  RefreshCw,
  ExternalLink,
  Image as ImageIcon,
  Check,
  AlertCircle,
} from 'lucide-react';
import apiClient from '../../services/api';
import { FALLBACK_SERVICES } from '../../data/fallbackData';

const emptyForm = {
  title: '',
  slug: '',
  shortDescription: '',
  description: '',
  benefits: '',
  suitableFor: '',
  process: '',
  pricingNote: '',
  icon: 'Sparkles',
  image: '',
  isActive: true,
};

export default function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedback, setFeedback] = useState(null);

  const load = () => {
    setLoading(true);
    apiClient
      .get('/services?all=true')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setServices(res.data.data);
        } else {
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch(() => {
        setServices(FALLBACK_SERVICES);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSyncDatabase = async () => {
    if (!window.confirm('This will synchronize all 14 standard services with the database. Continue?')) return;
    setSyncLoading(true);
    try {
      await apiClient.post('/admin/seed-all');
      setFeedback({ type: 'success', message: 'All 14 services successfully synchronized with database!' });
      load();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Failed to sync database.' });
    } finally {
      setSyncLoading(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const startEdit = (service) => {
    setForm({
      title: service.title || '',
      slug: service.slug || '',
      shortDescription: service.shortDescription || '',
      description: service.description || '',
      benefits: Array.isArray(service.benefits) ? service.benefits.join('\n') : (service.benefits || ''),
      suitableFor: Array.isArray(service.suitableFor) ? service.suitableFor.join(', ') : (service.suitableFor || ''),
      process: Array.isArray(service.process) ? service.process.join('\n') : (service.process || ''),
      pricingNote: service.pricingNote || '',
      icon: service.icon || 'Sparkles',
      image: service.image || '',
      isActive: service.isActive !== false,
    });
    setEditingId(service._id || service.slug);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      benefits: form.benefits
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      process: form.process
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      suitableFor: form.suitableFor
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const isMongoId = editingId && /^[0-9a-fA-F]{24}$/.test(editingId);
      if (isMongoId) {
        await apiClient.put(`/services/${editingId}`, payload);
      } else {
        await apiClient.post('/services', payload);
      }
      setFeedback({ type: 'success', message: `Service "${form.title}" saved successfully!` });
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      load();
    } catch (err) {
      setFeedback({ type: 'error', message: err.response?.data?.message || 'Error saving service' });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const remove = async (service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.title}"?`)) return;
    try {
      if (service._id && /^[0-9a-fA-F]{24}$/.test(service._id)) {
        await apiClient.delete(`/services/${service._id}`);
      } else {
        setServices((prev) => prev.filter((s) => (s._id || s.slug) !== (service._id || service.slug)));
      }
      setFeedback({ type: 'success', message: `Service "${service.title}" removed.` });
      load();
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to delete service' });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  const filteredServices = services.filter((s) =>
    (s.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.slug || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.shortDescription || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-1.5">
            Catalog Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Services Catalog ({services.length} Total)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage all 14 individual service pages, procedures, descriptions, and pricing notes.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSyncDatabase}
            disabled={syncLoading}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            title="Synchronize all 14 standard services with MongoDB"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-brand-500 ${syncLoading ? 'animate-spin' : ''}`} />
            <span>{syncLoading ? 'Syncing...' : 'Sync 14 Services'}</span>
          </button>

          <button
            onClick={() => {
              setShowForm(true);
              setForm(emptyForm);
              setEditingId('new');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-1.5 shadow-sm cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="text-xs font-medium text-slate-500 self-end sm:self-auto">
          Showing <span className="font-bold text-navy-900">{filteredServices.length}</span> of{' '}
          <span className="font-bold text-navy-900">{services.length}</span> services
        </div>
      </div>

      {/* Service Create / Edit Drawer/Form Modal */}
      {showForm && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-300 bg-white shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-navy-900">
                {editingId === 'new' ? 'Create New Service' : `Edit: ${form.title}`}
              </h2>
              <p className="text-xs text-slate-500">
                Update the service content displayed on the website and client bookings.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Service Title *
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    setForm((prev) => ({ ...prev, title, slug: prev.slug || slug }));
                  }}
                  placeholder="e.g., High Rise Glass Cleaning"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  URL Slug (Unique path) *
                </label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="e.g., high-rise-glass-cleaning"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Short Summary (Used in cards & directory) *
              </label>
              <input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                placeholder="Brief 1-line description of the service"
                className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Detailed Full Description *
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Comprehensive service description explaining tools, techniques, and results..."
                className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Key Benefits (One per line)
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  value={form.benefits}
                  onChange={handleChange}
                  placeholder="Streak-free finish&#10;Safe for all glass&#10;Anti-fungal protection"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Execution Process (One step per line)
                </label>
                <textarea
                  name="process"
                  rows={3}
                  value={form.process}
                  onChange={handleChange}
                  placeholder="Initial inspection&#10;Dry dusting & frame cleaning&#10;Purified squeegee wash"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Suitable For (Comma-separated)
                </label>
                <input
                  name="suitableFor"
                  value={form.suitableFor}
                  onChange={handleChange}
                  placeholder="Homes, Offices, Showrooms"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Icon Identifier
                </label>
                <input
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="Sparkles, Wrench, Droplet"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy-900 mb-1">
                  Pricing Note
                </label>
                <input
                  name="pricingNote"
                  value={form.pricingNote}
                  onChange={handleChange}
                  placeholder="Custom quote upon inspection"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy-900 mb-1">
                Image URL (JPG / WebP)
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/services/glass-cleaning.jpg"
                className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="svc-active"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-brand-600 rounded cursor-pointer"
              />
              <label htmlFor="svc-active" className="text-xs font-semibold text-slate-700 cursor-pointer">
                Publish service on public website
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm cursor-pointer"
              >
                {editingId === 'new' ? 'Create Service' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Grid */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="w-8 h-8 border-3 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs font-medium text-slate-500">Loading services catalog...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-600">No services match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((s) => (
            <div
              key={s._id || s.slug}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-200 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                      {s.image ? (
                        <img
                          src={s.image}
                          alt={s.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/services/glass-cleaning.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-brand-500">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-navy-900 leading-snug">{s.title}</h3>
                      <p className="text-[10px] text-slate-400 font-mono">/services/{s.slug}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      s.isActive !== false
                        ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                        : 'text-slate-500 bg-slate-100'
                    }`}
                  >
                    {s.isActive !== false ? 'Active' : 'Draft'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2 mb-3">
                  {s.shortDescription || s.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {Array.isArray(s.benefits) && s.benefits.length > 0 && (
                    <span className="text-[10px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded">
                      {s.benefits.length} benefits
                    </span>
                  )}
                  {Array.isArray(s.process) && s.process.length > 0 && (
                    <span className="text-[10px] font-medium text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">
                      {s.process.length} steps
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`/services/${s.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(s)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => remove(s)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Service"
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
