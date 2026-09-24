import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle2, AlertCircle, Phone, MapPin } from 'lucide-react';
import apiClient from '../../services/api';
import { useBusiness } from '../../context/BusinessContext';

export default function BusinessInfoAdmin() {
  const { updateBusinessInfo } = useBusiness();
  const [form, setForm] = useState({
    businessName: 'Professional Glass Cleaning Service',
    phone: '8539842072',
    whatsapp: '918539842072',
    address: 'Green Enclave, Zirakpur, Punjab 140603, India',
    serviceArea: 'Zirakpur, Mohali (SAS Nagar), Chandigarh, Tricity & selected areas of Punjab',
    mapEmbedUrl: 'https://maps.google.com/maps?q=Green%20Enclave,%20Zirakpur,%20Punjab%20140603&t=&z=14&ie=UTF8&iwloc=&output=embed',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603',
  });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/business-info')
      .then((res) => {
        if (res.data?.data) setForm(res.data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBusinessInfo(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert('Error updating business info');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 tracking-tight">
          Business Contact & Location Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Manage public contact phone numbers, operating base address, and Google Maps links.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 max-w-3xl">
        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-bold">Important Business Verification Policy:</strong>
          Primary phone is set to <strong>8539842072</strong> and location to <strong>Green Enclave, Zirakpur</strong> as verified by the business owner. Do not replace with unconfirmed third-party numbers.
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 bg-white max-w-3xl space-y-5"
      >
        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Business Trade Name *
          </label>
          <input
            name="businessName"
            value={form.businessName || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              Primary Phone Number *
            </label>
            <input
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-bold text-brand-600"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy-900 mb-1">
              WhatsApp Number (Country code prefixed, e.g. 918539842072) *
            </label>
            <input
              name="whatsapp"
              value={form.whatsapp || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input font-bold text-emerald-600"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Physical Base Address *
          </label>
          <input
            name="address"
            value={form.address || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Primary Service Region
          </label>
          <input
            name="serviceArea"
            value={form.serviceArea || ''}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Google Maps Embed URL
          </label>
          <input
            name="mapEmbedUrl"
            value={form.mapEmbedUrl || ''}
            onChange={handleChange}
            placeholder="https://maps.google.com/maps?q=..."
            className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-navy-900 mb-1">
            Google Maps Search / Directions Link
          </label>
          <input
            name="googleMapsUrl"
            value={form.googleMapsUrl || ''}
            onChange={handleChange}
            placeholder="https://www.google.com/maps/search/?api=1&query=..."
            className="w-full px-3.5 py-2.5 rounded-xl text-xs glass-input"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" /> Changes saved successfully!
            </span>
          ) : (
            <span></span>
          )}

          <button
            type="submit"
            className="py-2.5 px-6 rounded-xl font-bold text-xs text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
