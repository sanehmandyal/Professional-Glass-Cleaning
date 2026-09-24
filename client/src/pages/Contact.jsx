import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Navigation, Clock, Mail, ShieldCheck } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/common/ContactForm';
import MapSection from '../components/common/MapSection';
import { useBusiness } from '../context/BusinessContext';

export default function Contact() {
  const { business } = useBusiness();
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const breadcrumbs = [{ name: 'Contact', url: '/contact' }];

  return (
    <>
      <SEO
        title={`Contact ${business.businessName} | Zirakpur & Tricity`}
        description={`Contact ${business.businessName} in ${business.address}. Call or WhatsApp ${business.phone} for quick service enquiries, quotations, and directions.`}
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
            Contact {business.businessName}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Reach out directly for quotations, on-site inspections, or emergency service across {business.serviceArea}.
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
                Speak directly with our team & technicians.
              </p>
              <a
                href={business.phoneHref}
                className="text-lg font-extrabold text-brand-600 hover:underline block mt-2"
              >
                {business.phoneDisplay || business.phone}
              </a>
            </div>
            <a
              href={business.phoneHref}
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                {business.phoneDisplay || business.phone}
              </p>
            </div>
            <a
              href={business.whatsappLink('Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your services.')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                {business.address}
              </p>
              <p className="text-xs font-semibold text-slate-700 mt-2">
                {business.serviceArea}
              </p>
            </div>
            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 py-2.5 px-4 rounded-xl font-bold text-navy-900 bg-surface-200 hover:bg-surface-300 transition-colors border border-slate-300 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
