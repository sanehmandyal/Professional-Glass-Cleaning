import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, X, Sparkles, CheckCircle2, Layers } from 'lucide-react';
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
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);

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
      .catch(() => setServices(FALLBACK_SERVICES))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

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
      benefits: Array.isArray(service.benefits) ? service.benefits.join('\n') : '',
      suitableFor: Array.isArray(service.suitableFor) ? service.suitableFor.join(', ') : '',
      process: Array.isArray(service.process) ? service.process.join('\n') : '',
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
      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving service');
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
      load();
    } catch (err) {
      alert('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Services Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Create, update, or edit all 14 individual services and their detailed procedures.
          </p>
        </div>
        <button
          onClick={() => {
            setShowForm(true);
            setForm(emptyForm);
            setEditingId('new');
          }}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white flex items-center gap-1.5 shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {showForm && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-300 bg-white shadow-lg animate-fadeIn">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-navy-900">
              {editingId === 'new' ? 'Add New Service' : `Edit: ${form.title}`}
            </h2>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
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
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  URL Slug *
                </label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Short Description (Cards & Directory) *
              </label>
              <input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Detailed Full Description *
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Key Benefits (One per line)
                </label>
                <textarea
                  name="benefits"
                  rows={3}
                  value={form.benefits}
                  onChange={handleChange}
                  placeholder="Streak-free finish&#10;Safe for all glass&#10;Anti-fungal protection"
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Execution Process (One step per line)
                </label>
                <textarea
                  name="process"
                  rows={3}
                  value={form.process}
                  onChange={handleChange}
                  placeholder="Initial inspection&#10;Dry dusting & frame cleaning&#10;Purified squeegee wash"
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Suitable For (Comma-separated)
                </label>
                <input
                  name="suitableFor"
                  value={form.suitableFor}
                  onChange={handleChange}
                  placeholder="Homes, Offices, Showrooms"
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Icon Name
                </label>
                <input
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  placeholder="Sparkles, Wrench, Droplet, Hammer"
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy-900 mb-1">
                  Pricing Note
                </label>
                <input
                  name="pricingNote"
                  value={form.pricingNote}
                  onChange={handleChange}
                  placeholder="Custom quote upon inspection"
                  className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-900 mb-1">
                Image URL (Cloudinary / WebP)
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://... or /images/services/..."
                className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="svc-active"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-brand-600 rounded"
              />
              <label htmlFor="svc-active" className="text-xs font-semibold text-slate-700">
                Publish service on website
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm"
              >
                {editingId === 'new' ? 'Create Service' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <div
            key={s._id || s.slug}
            className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-bold text-sm text-navy-900">{s.title}</h3>
                <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                  {s.icon || 'Sparkles'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">/services/{s.slug}</p>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                {s.shortDescription || s.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span
                className={`text-[10px] font-bold ${
                  s.isActive !== false ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                {s.isActive !== false ? '● Active' : '○ Draft'}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => startEdit(s)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                  title="Edit Service"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(s)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete Service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
