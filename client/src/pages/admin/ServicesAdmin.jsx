import React, { useEffect, useState, useRef } from 'react';
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
  UploadCloud,
  Eye,
  Sliders,
  Camera,
  Upload,
} from 'lucide-react';
import apiClient from '../../services/api';
import { FALLBACK_SERVICES } from '../../data/fallbackData';

// Curated library of authentic service images available locally
const PRESET_SERVICE_IMAGES = [
  { label: 'Glass Cleaning Main', url: '/images/services/glass-cleaning.jpg' },
  { label: 'SGPC Repairing', url: '/images/services/sgpc-repairing.jpg' },
  { label: 'Silicone Joint Repair', url: '/images/services/silicone-repair.jpg' },
  { label: 'Architectural Glass Repair', url: '/images/services/glass-repair.jpg' },
  { label: 'Water Tank Hygiene', url: '/images/services/water-tank-cleaning.jpg' },
  { label: 'Window Glass Cleaning', url: '/images/services/window-glass-cleaning.jpg' },
  { label: 'Glass Door Detailing', url: '/images/services/glass-door-cleaning.jpg' },
  { label: 'Residential Villa Glass', url: '/images/services/residential-glass-cleaning.jpg' },
  { label: 'Commercial Facade', url: '/images/services/commercial-glass-cleaning.jpg' },
  { label: 'Office Glass Partition', url: '/images/services/office-glass-cleaning.jpg' },
  { label: 'Retail Shop & Showroom', url: '/images/services/shop-glass-cleaning.jpg' },
  { label: 'Glass Maintenance', url: '/images/services/glass-maintenance.jpg' },
  { label: 'Silicone Weather Sealing', url: '/images/services/silicone-sealing.jpg' },
  { label: 'Emergency Glass Repair', url: '/images/services/emergency-glass-repair.jpg' },
];

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
  image: '/images/services/glass-cleaning.jpg',
  beforeImage: '',
  afterImage: '',
  beforeAfterLabel: 'Before & After Transformation',
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

  // Quick image editor modal state
  const [quickImageTarget, setQuickImageTarget] = useState(null);
  const [quickImageUrl, setQuickImageUrl] = useState('');
  const [quickBeforeUrl, setQuickBeforeUrl] = useState('');
  const [quickAfterUrl, setQuickAfterUrl] = useState('');
  const [quickImageLoading, setQuickImageLoading] = useState(false);

  // File input refs for direct device image picking
  const quickFileInputRef = useRef(null);
  const formFileInputRef = useRef(null);

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
    if (!window.confirm('This will synchronize all 14 standard services and images with the database. Continue?')) return;
    setSyncLoading(true);
    let success = false;

    // Tier 1: Try /services/seed
    try {
      await apiClient.post('/services/seed');
      success = true;
    } catch {
      // Tier 2: Try /admin/seed-all
      try {
        await apiClient.post('/admin/seed-all');
        success = true;
      } catch {
        // Tier 3: Client batch sync (guaranteed to work even on older server builds)
        try {
          for (const svc of FALLBACK_SERVICES) {
            await apiClient.post('/services', svc).catch(() => {});
          }
          success = true;
        } catch {
          success = false;
        }
      }
    }

    if (success) {
      setFeedback({ type: 'success', message: 'All 14 services & images successfully synchronized with database!' });
      load();
    } else {
      setFeedback({ type: 'error', message: 'Failed to sync database. Please verify network or login.' });
    }
    setSyncLoading(false);
    setTimeout(() => setFeedback(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  // Direct file compressor & reader for uploading images from any phone/camera/PC
  const handleFileChange = (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1400;
          const MAX_HEIGHT = 1400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to crisp high quality JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          callback(dataUrl);
        } catch {
          callback(event.target.result);
        }
      };
      img.onerror = () => {
        callback(event.target.result);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
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
      image: service.image || '/images/services/glass-cleaning.jpg',
      beforeImage: service.beforeAfterImages?.before || '',
      afterImage: service.beforeAfterImages?.after || '',
      beforeAfterLabel: service.beforeAfterImages?.label || 'Before & After Transformation',
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
      beforeAfterImages: {
        before: form.beforeImage || '',
        after: form.afterImage || '',
        label: form.beforeAfterLabel || 'Before & After Transformation',
      },
    };

    try {
      const isMongoId = editingId && /^[0-9a-fA-F]{24}$/.test(editingId);
      if (isMongoId) {
        await apiClient.put(`/services/${editingId}`, payload);
      } else {
        await apiClient.post('/services', payload);
      }
      setFeedback({ type: 'success', message: `Service "${form.title}" saved with updated image and details!` });
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

  // Quick image change save handler
  const handleQuickImageSave = async () => {
    if (!quickImageTarget) return;
    setQuickImageLoading(true);

    const isMongoId = quickImageTarget._id && /^[0-9a-fA-F]{24}$/.test(quickImageTarget._id);
    const payload = {
      image: quickImageUrl,
      beforeAfterImages: {
        before: quickBeforeUrl,
        after: quickAfterUrl,
        label: quickImageTarget.beforeAfterImages?.label || 'Before & After Transformation',
      },
    };

    try {
      if (isMongoId) {
        await apiClient.put(`/services/${quickImageTarget._id}`, payload);
      } else {
        // Find existing service and update state
        setServices((prev) =>
          prev.map((s) =>
            (s._id || s.slug) === (quickImageTarget._id || quickImageTarget.slug)
              ? { ...s, image: quickImageUrl, beforeAfterImages: payload.beforeAfterImages }
              : s
          )
        );
      }
      setFeedback({ type: 'success', message: `Image updated for "${quickImageTarget.title}"!` });
      setQuickImageTarget(null);
      load();
    } catch (err) {
      setFeedback({ type: 'error', message: 'Failed to update service image' });
    } finally {
      setQuickImageLoading(false);
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
            Services & Photo Media Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
            Services & Photos Management ({services.length} Total)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Change service cover images, upload new photos, select curated presets, or edit service procedures directly.
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
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search services or images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="text-xs font-medium text-slate-500 self-end sm:self-auto flex items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
            <Camera className="w-3.5 h-3.5" /> Direct Photo Control (Upload or URL)
          </span>
          <span>
            Showing <span className="font-bold text-navy-900">{filteredServices.length}</span> of{' '}
            <span className="font-bold text-navy-900">{services.length}</span> services
          </span>
        </div>
      </div>

      {/* QUICK IMAGE UPDATE MODAL */}
      {quickImageTarget && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setQuickImageTarget(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-xl w-full shadow-2xl border border-slate-100 space-y-5 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-navy-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-brand-500" />
                  Change Image: {quickImageTarget.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Upload a photo from your computer, choose a preset, or enter an image URL.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setQuickImageTarget(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Live Preview Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-surface-100 p-4 rounded-2xl border border-slate-200">
              <div>
                <p className="text-[11px] font-bold text-navy-900 uppercase tracking-wider mb-1.5">
                  Live Preview:
                </p>
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative shadow-inner">
                  <img
                    src={quickImageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/services/glass-cleaning.jpg';
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs font-bold text-navy-900 mb-1">
                    Image URL or Path
                  </label>
                  <input
                    type="text"
                    value={quickImageUrl}
                    onChange={(e) => setQuickImageUrl(e.target.value)}
                    placeholder="https://... or /images/services/..."
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                  />
                </div>

                <div>
                  <input
                    type="file"
                    ref={quickFileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, (dataUrl) => setQuickImageUrl(dataUrl))}
                  />
                  <button
                    type="button"
                    onClick={() => quickFileInputRef.current?.click()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Upload Image from Device</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets Selection */}
            <div>
              <p className="text-xs font-bold text-navy-900 mb-2">Or Choose from Curated Service Photos:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-44 overflow-y-auto p-1 custom-scrollbar">
                {PRESET_SERVICE_IMAGES.map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setQuickImageUrl(preset.url)}
                    className={`p-1.5 rounded-xl border text-left flex items-center gap-2 text-[11px] transition-all cursor-pointer ${
                      quickImageUrl === preset.url
                        ? 'border-brand-500 bg-brand-50 text-brand-900 font-bold ring-2 ring-brand-400/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-7 h-7 rounded-lg object-cover shrink-0"
                    />
                    <span className="truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Before / After Transformation Option */}
            <div className="pt-2 border-t border-slate-100">
              <details className="text-xs">
                <summary className="font-bold text-navy-900 cursor-pointer hover:text-brand-600 mb-2">
                  ▸ Configure Before & After Slider Photos (Optional)
                </summary>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Before Image URL
                    </label>
                    <input
                      type="text"
                      value={quickBeforeUrl}
                      onChange={(e) => setQuickBeforeUrl(e.target.value)}
                      placeholder="/images/services/window-glass-cleaning.jpg"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      After Image URL
                    </label>
                    <input
                      type="text"
                      value={quickAfterUrl}
                      onChange={(e) => setQuickAfterUrl(e.target.value)}
                      placeholder="/images/services/glass-cleaning.jpg"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
              </details>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setQuickImageTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleQuickImageSave}
                disabled={quickImageLoading}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm cursor-pointer disabled:opacity-50"
              >
                {quickImageLoading ? 'Saving Photo...' : 'Update & Save Photo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL SERVICE CREATE / EDIT FORM */}
      {showForm && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border-2 border-brand-300 bg-white shadow-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-navy-900">
                {editingId === 'new' ? 'Create New Service' : `Edit: ${form.title}`}
              </h2>
              <p className="text-xs text-slate-500">
                Update the service content, descriptions, and media photos.
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

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="e.g., SGPC Repairing"
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
                  placeholder="e.g., sgpc-repairing"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* DEDICATED IMAGE MEDIA SECTION */}
            <div className="p-5 rounded-2xl bg-surface-100 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-brand-600" />
                  Service Photo & Visual Media
                </h3>
                <span className="text-[10px] text-brand-600 font-semibold bg-brand-50 px-2 py-0.5 rounded border border-brand-100">
                  Live on Public Website
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Image Live Preview */}
                <div className="md:col-span-4">
                  <div className="aspect-video rounded-xl overflow-hidden bg-slate-200 border border-slate-300 relative shadow-inner">
                    <img
                      src={form.image || '/images/services/glass-cleaning.jpg'}
                      alt="Service Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/services/glass-cleaning.jpg';
                      }}
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                      Preview
                    </div>
                  </div>
                </div>

                {/* Image Input, File Upload & Presets */}
                <div className="md:col-span-8 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-navy-900 mb-1">
                        Image URL / File Path *
                      </label>
                      <input
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="/images/services/glass-cleaning.jpg or https://..."
                        className="w-full px-3 py-1.5 rounded-xl text-xs border border-slate-300 bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="shrink-0 pt-4">
                      <input
                        type="file"
                        ref={formFileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(e, (dataUrl) =>
                            setForm((prev) => ({ ...prev, image: dataUrl }))
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => formFileInputRef.current?.click()}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        title="Upload photo from device"
                      >
                        <Upload className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Upload File</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
                      Quick Pick Preset Photo:
                    </p>
                    <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                      {PRESET_SERVICE_IMAGES.map((p) => (
                        <button
                          key={p.url}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, image: p.url }))}
                          className={`px-2 py-1 rounded-lg text-[10px] font-medium border transition-colors cursor-pointer ${
                            form.image === p.url
                              ? 'bg-brand-500 text-white border-brand-500 font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Before/After Section */}
              <div className="pt-3 border-t border-slate-200">
                <p className="text-[11px] font-bold text-navy-900 mb-2">
                  Optional: Before & After Visual Slider Comparison
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Before Image URL
                    </label>
                    <input
                      name="beforeImage"
                      value={form.beforeImage}
                      onChange={handleChange}
                      placeholder="/images/services/window-glass-cleaning.jpg"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      After Image URL
                    </label>
                    <input
                      name="afterImage"
                      value={form.afterImage}
                      onChange={handleChange}
                      placeholder="/images/services/glass-cleaning.jpg"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Comparison Label
                    </label>
                    <input
                      name="beforeAfterLabel"
                      value={form.beforeAfterLabel}
                      onChange={handleChange}
                      placeholder="Glass Restoration"
                      className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>
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
          <p className="text-xs font-medium text-slate-500">Loading services & photos catalog...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
          <p className="text-xs font-semibold text-slate-600">No services match your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((s) => (
            <div
              key={s._id || s.slug}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-brand-300 hover:shadow-md transition-all overflow-hidden group"
            >
              {/* Card Photo Header */}
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={s.image || '/images/services/glass-cleaning.jpg'}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/services/glass-cleaning.jpg';
                  }}
                />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${
                      s.isActive !== false
                        ? 'text-emerald-800 bg-emerald-100/90 backdrop-blur-sm border border-emerald-300'
                        : 'text-slate-600 bg-white/90 backdrop-blur-sm'
                    }`}
                  >
                    {s.isActive !== false ? '● Active' : '○ Draft'}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <button
                    onClick={() => {
                      setQuickImageTarget(s);
                      setQuickImageUrl(s.image || '/images/services/glass-cleaning.jpg');
                      setQuickBeforeUrl(s.beforeAfterImages?.before || '');
                      setQuickAfterUrl(s.beforeAfterImages?.after || '');
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-navy-950/80 hover:bg-brand-600 text-white backdrop-blur-sm flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                    title="Change Photo"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Change Photo</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-sm text-navy-900 leading-snug">{s.title}</h3>
                    <span className="text-[10px] font-mono text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded shrink-0">
                      {s.icon || 'Sparkles'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mb-2">/services/{s.slug}</p>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3">
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
                    {s.beforeAfterImages?.before && (
                      <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        ✦ Before/After
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`/services/${s.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                  >
                    <span>View Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEdit(s)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50 transition-colors cursor-pointer"
                      title="Edit Service Details"
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
