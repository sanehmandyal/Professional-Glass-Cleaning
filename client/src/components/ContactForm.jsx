import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import apiClient from '../services/api';
import { servicesData } from '../data/servicesData';

const initialState = {
  name: '',
  phone: '',
  service: '',
  location: '',
  preferredDate: '',
  message: '',
};

const ContactForm = ({ defaultService = '' }) => {
  const [form, setForm] = useState({ ...initialState, service: defaultService });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name.';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) errs.phone = 'Enter a valid 10-digit Indian phone number.';
    if (!form.service) errs.service = 'Please select a service.';
    if (form.message && form.message.length > 1000) errs.message = 'Message is too long.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      await apiClient.post('/enquiries', form);
      setStatus('success');
      setForm(initialState);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-7 sm:p-8 space-y-5" noValidate>
      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="Your name"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Phone Number</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="98765 43210"
          inputMode="numeric"
        />
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Service Required</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
        >
          <option value="">Select a service</option>
          {servicesData.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
        {errors.service && <p className="text-xs text-red-500 mt-1">{errors.service}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy-900 mb-1.5">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
            placeholder="Zirakpur, Mohali..."
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy-900 mb-1.5">Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={form.preferredDate}
            onChange={handleChange}
            className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy-900 mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-skyline-100 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-skyline-400"
          placeholder="Tell us more about what you need..."
        />
        {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">
        <Send size={17} />
        {status === 'submitting' ? 'Sending...' : 'Request a Quote'}
      </button>

      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
          <CheckCircle2 size={17} /> Thank you! Your request has been received. We'll contact you shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm text-red-500 font-medium">
          <AlertCircle size={17} /> Something went wrong. Please call or WhatsApp us directly.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
