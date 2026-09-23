import React, { useEffect, useState } from 'react';
import { Trash2, Plus, Edit2, X, HelpCircle, Save } from 'lucide-react';
import apiClient from '../../services/api';

const categories = [
  'General',
  'Booking & Pricing',
  'Residential',
  'Commercial',
  'Silicone & Sealing',
  'Glass Repair',
  'Water Tank Cleaning',
  'Repair Services',
];

export default function FaqsAdmin() {
  const [faqs, setFaqs] = useState([]);
  const [form, setForm] = useState({ question: '', answer: '', category: 'General' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    apiClient
      .get('/faqs')
      .then((res) => {
        if (res.data?.data) setFaqs(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await apiClient.put(`/faqs/${editingId}`, form);
      } else {
        await apiClient.post('/faqs', form);
      }
      setForm({ question: '', answer: '', category: 'General' });
      setEditingId(null);
      load();
    } catch (err) {
      alert('Error saving FAQ');
    }
  };

  const startEdit = (faq) => {
    setForm({
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'General',
    });
    setEditingId(faq._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this FAQ?')) return;
    try {
      await apiClient.delete(`/faqs/${id}`);
      load();
    } catch (err) {
      alert('Error deleting FAQ');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          FAQ Knowledgebase
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage questions and answers displayed across the website and FAQPage Schema.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-navy-900">
            {editingId ? 'Edit Existing Question' : 'Add New Question'}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ question: '', answer: '', category: 'General' });
              }}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Question Title *
            </label>
            <input
              placeholder="e.g. Do you provide glass repair in Zirakpur?"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              required
              className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-xs glass-input bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Factual & Clear Answer *
          </label>
          <textarea
            placeholder="Write a clear, locally accurate answer..."
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
            rows={3}
            className="w-full px-3.5 py-2 rounded-xl text-xs glass-input"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            <span>{editingId ? 'Save Changes' : 'Add FAQ'}</span>
          </button>
        </div>
      </form>

      {/* FAQ List */}
      <div className="space-y-3">
        {faqs.map((f) => (
          <div
            key={f._id}
            className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-start justify-between gap-4"
          >
            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded">
                {f.category || 'General'}
              </span>
              <p className="font-bold text-sm text-navy-900 mt-1">{f.question}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{f.answer}</p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => startEdit(f)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-brand-600 hover:bg-brand-50"
                title="Edit FAQ"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => remove(f._id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50"
                title="Delete FAQ"
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
