import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Navigation, Clock, Mail, ShieldCheck } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/common/ContactForm';
import MapSection from '../components/common/MapSection';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const breadcrumbs = [{ name: 'Contact', url: '/contact' }];

  return (
    <>
      <SEO
        title="Contact Professional Glass Cleaning Service | Zirakpur & Tricity"
        description="Contact Professional Glass Cleaning Service in Green Enclave, Zirakpur. Call or WhatsApp 8539842072 for quick service enquiries, quotations, and directions."
        canonical="https://professionalglasscleaningservice.com/contact"
        breadcrumbs={breadcrumbs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Contact Professional Glass Cleaning Service
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Reach out directly for quotations, on-site inspections, or emergency service across Zirakpur, Mohali, Chandigarh, and selected Punjab regions.
          </p>
        </div>

        {/* Top 3 Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 text-center space-y-3 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-navy-900">Direct Phone Helpline</h3>
              <p className="text-xs text-slate-500 mt-1">
                Speak directly with the business owner.
              </p>
              <a
                href="tel:+918539842072"
                className="text-lg font-extrabold text-brand-600 hover:underline block mt-2"
              >
                +91 8539842072
              </a>
            </div>
            <a
              href="tel:+918539842072"
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm text-xs flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now</span>
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-200 text-center space-y-3 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="w-6 h-6 fill-current" />
              </div>
              <h3 className="font-bold text-base text-navy-900">WhatsApp Instant Chat</h3>
              <p className="text-xs text-slate-500 mt-1">
                Send site photos or request quick quotes.
              </p>
              <p className="text-lg font-extrabold text-emerald-600 block mt-2">
                +91 8539842072
              </p>
            </div>
            <a
              href={`https://wa.me/918539842072?text=${encodeURIComponent(
                'Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your services.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors text-xs flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Location & Directions Card */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 text-center space-y-3 bg-white flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-navy-900">Operating Base</h3>
              <p className="text-xs text-slate-500 mt-1">
                Green Enclave, Zirakpur, Punjab 140603, India
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-2">
                Serving Tricity & Nearby Punjab
              </p>
            </div>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Green+Enclave,+Zirakpur,+Punjab+140603"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-navy-900 bg-surface-200 hover:bg-surface-300 transition-colors border border-slate-300 text-xs flex items-center justify-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-brand-600" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Information */}
        <div className="mb-16">
          <ContactForm initialService={initialService} />
        </div>

        {/* Interactive Google Map */}
        <MapSection />
      </div>
    </>
  );
}
