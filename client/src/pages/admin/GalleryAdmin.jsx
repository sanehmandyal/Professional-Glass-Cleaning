import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Image, CheckCircle2 } from 'lucide-react';
import apiClient from '../../services/api';
import { FALLBACK_GALLERY } from '../../data/fallbackData';

const categories = [
  'Glass Cleaning',
  'Glass Repair',
  'Silicone Repair',
  'Water Tank Cleaning',
  'Commercial Cleaning',
  'Residential Cleaning',
];

export default function GalleryAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    category: categories[0],
    imageUrl: '',
    alt: '',
    isDemo: false,
  });
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiClient
      .get('/gallery')
      .then((res) => {
        if (res.data?.data && res.data.data.length > 0) {
          setItems(res.data.data);
        } else {
          setItems(FALLBACK_GALLERY);
        }
      })
      .catch((err) => {
        console.error(err);
        setItems(FALLBACK_GALLERY);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/gallery', form);
      setForm({ title: '', category: categories[0], imageUrl: '', alt: '', isDemo: false });
      load();
    } catch (err) {
      alert('Error uploading/adding image');
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}" from gallery?`)) return;
    try {
      if (item._id && /^[0-9a-fA-F]{24}$/.test(item._id)) {
        await apiClient.delete(`/gallery/${item._id}`);
      } else {
        setItems((prev) => prev.filter((i) => (i._id || i.imageUrl) !== (item._id || item.imageUrl)));
      }
      load();
    } catch (err) {
      alert('Error deleting image');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          Project Gallery Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Upload and manage photos of actual completed projects or high-res WebP visual showcases.
        </p>
      </div>

      {/* Add New Image Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4"
      >
        <h2 className="text-base font-bold text-navy-900">Add New Photo to Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Photo Title *</label>
            <input
              placeholder="e.g. Balcony Glass Cleaning in Maya Garden"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl text-xs glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Image URL (WebP) *</label>
            <input
              placeholder="https://... image address"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl text-xs glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Category *</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs glass-input bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">SEO Alt Text</label>
            <input
              placeholder="e.g. Glass cleaning technician in Zirakpur"
              value={form.alt}
              onChange={(e) => setForm({ ...form, alt: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs glass-input"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isDemo}
              onChange={(e) => setForm({ ...form, isDemo: e.target.checked })}
              className="w-4 h-4 rounded text-brand-600"
            />
            <span>Mark as Sample/Demo Image (Uncheck if this is a verified customer project photo)</span>
          </label>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Gallery</span>
          </button>
        </div>
      </form>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item._id || item.imageUrl}
            className="glass-panel rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.alt || item.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/services/glass-cleaning.jpg';
                }}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.isDemo
                    ? 'bg-amber-500/90 text-white'
                    : 'bg-emerald-600/90 text-white'
                }`}
              >
                {item.isDemo ? 'Sample Photo' : 'Real Project'}
              </span>
            </div>

            <div className="p-3.5 flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="text-[10px] font-bold text-brand-600 uppercase block">
                  {item.category}
                </span>
                <p className="text-xs font-bold text-navy-900 truncate">{item.title}</p>
              </div>

              <button
                onClick={() => remove(item)}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
