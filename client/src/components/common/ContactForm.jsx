import React, { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle, Phone, Calendar, MapPin, User, MessageSquare, Briefcase } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SERVICE_OPTIONS = [
  'Professional Glass Cleaning',
  'SGPC Repairing',
  'Silicone Repair / Sealing',
  'Glass Repair',
  'Water Tank Cleaning',
  'Window Glass Cleaning',
  'Glass Door Cleaning',
  'Residential Glass Cleaning',
  'Commercial Glass Cleaning',
  'Office Glass Cleaning',
  'Shop/Showroom Glass Cleaning',
  'Glass Maintenance',
  'Emergency Glass Repair',
  'Other / Custom Requirement',
];

const LOCATION_OPTIONS = [
  'Zirakpur (Green Enclave / VIP Rd / High Ground)',
  'Mohali (Phases / Sectors / Aerocity / IT City)',
  'Chandigarh (All Sectors / Industrial Area)',
  'Peer Muchalla / Dhakoli / Baltana',
  'Dera Bassi / Kharar / New Chandigarh',
  'Other Punjab Location',
];

export default function ContactForm({
  initialService = '',
  initialLocation = '',
  className = '',
  title = 'Request a Fast Quotation / Service Enquiry',
  subtitle = 'Fill in your details below and our service supervisor will get back to you promptly.',
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: initialService || '',
    location: initialLocation || '',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const [responseMsg, setResponseMsg] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    
    // Validate Indian phone number (10 digits, optionally prefixed with +91 or 0)
    const cleanPhone = formData.phone.replace(/[\s\-\(\)\+]/g, '');
    const indianPhoneRegex = /^(?:91|0)?[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      errs.phone = 'Please enter your contact phone number';
    } else if (!indianPhoneRegex.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian phone number (e.g. 8539842072)';
    }

    if (!formData.service.trim()) errs.service = 'Please select a required service';
    if (!formData.location.trim()) errs.location = 'Please select or enter your location';
    if (!formData.message.trim()) errs.message = 'Please provide brief details of your request';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    setResponseMsg('');

    try {
      const payload = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        location: formData.location,
        preferredDate: formData.preferredDate || undefined,
        message: formData.message.trim(),
      };

      const res = await axios.post(`${API_BASE_URL}/enquiries`, payload);
      if (res.data && res.data.success) {
        setSubmitStatus('success');
        setResponseMsg('Thank you. Your enquiry has been received. We will contact you shortly.');
        setFormData({
          name: '',
          phone: '',
          service: '',
          location: '',
          preferredDate: '',
          message: '',
        });
      } else {
        throw new Error(res.data?.message || 'Failed to submit enquiry');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmitStatus('error');
      setResponseMsg('Something went wrong. Please call us directly at 8539842072.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden ${className}`}>
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-navy-900 tracking-tight">{title}</h3>
        {subtitle && <p className="text-slate-600 text-sm mt-1.5">{subtitle}</p>}
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3.5 animate-fadeIn">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-900">{responseMsg}</p>
            <p className="text-xs text-emerald-700 mt-1">
              Need immediate urgent assistance? Call us directly on{' '}
              <a href="tel:+918539842072" className="underline font-bold">
                8539842072
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3.5 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-rose-900">{responseMsg}</p>
            <p className="text-xs text-rose-700 mt-1">
              Or connect instantly on WhatsApp at{' '}
              <a href="https://wa.me/918539842072" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                +91 8539842072
              </a>
              .
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs font-semibold text-navy-900 mb-1.5">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Gurpreet Singh"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input ${
                  errors.name ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''
                }`}
                required
              />
            </div>
            {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="contact-phone" className="block text-xs font-semibold text-navy-900 mb-1.5">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 8539842072"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input ${
                  errors.phone ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''
                }`}
                required
              />
            </div>
            {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Service Required */}
          <div>
            <label htmlFor="contact-service" className="block text-xs font-semibold text-navy-900 mb-1.5">
              Service Required <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="contact-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input appearance-none bg-white ${
                  errors.service ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''
                }`}
                required
              >
                <option value="">Select a Service...</option>
                {SERVICE_OPTIONS.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc}
                  </option>
                ))}
              </select>
            </div>
            {errors.service && <p className="text-rose-600 text-xs mt-1">{errors.service}</p>}
          </div>

          {/* Location / Area */}
          <div>
            <label htmlFor="contact-location" className="block text-xs font-semibold text-navy-900 mb-1.5">
              Service Location / Area <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="contact-location"
                type="text"
                name="location"
                list="locations-datalist"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Green Enclave, Zirakpur"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input ${
                  errors.location ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''
                }`}
                required
              />
              <datalist id="locations-datalist">
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc} />
                ))}
              </datalist>
            </div>
            {errors.location && <p className="text-rose-600 text-xs mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Preferred Date */}
        <div>
          <label htmlFor="contact-date" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Preferred Service Date <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="contact-date"
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input"
            />
          </div>
        </div>

        {/* Message / Details */}
        <div>
          <label htmlFor="contact-message" className="block text-xs font-semibold text-navy-900 mb-1.5">
            Project Description & Requirements <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Need glass cleaning for 3BHK balcony and living room windows, plus silicone sealing check..."
              className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl text-sm glass-input ${
                errors.message ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200' : ''
              }`}
              required
            ></textarea>
          </div>
          {errors.message && <p className="text-rose-600 text-xs mt-1">{errors.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-brand-500 to-cyan-500 hover:from-brand-600 hover:to-cyan-600 shadow-glass-hover transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer glass-shine"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></span>
              <span>Sending Enquiry...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Service Enquiry</span>
            </>
          )}
        </button>

        <p className="text-center text-[11px] text-slate-500 pt-1">
          🔒 Your contact info is strictly confidential. No spam guaranteed.
        </p>
      </form>
    </div>
  );
}
