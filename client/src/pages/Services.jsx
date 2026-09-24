import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ServiceCard from '../components/common/ServiceCard';
import ContactForm from '../components/common/ContactForm';
import { FALLBACK_SERVICES } from '../data/fallbackData';
import apiClient from '../services/api';
import { useBusiness } from '../context/BusinessContext';

export default function Services() {
  const { business } = useBusiness();
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    apiClient
      .get('/services')
      .then((res) => {
        if (res.data?.data?.length > 0) setServices(res.data.data);
      })
      .catch(() => {});
  }, []);

  const filteredServices =
    activeFilter === 'All'
      ? services
      : activeFilter === 'Cleaning'
      ? services.filter((s) => s.slug.includes('cleaning'))
      : activeFilter === 'Repair & Sealing'
      ? services.filter(
          (s) =>
            s.slug.includes('repair') ||
            s.slug.includes('sealing') ||
            s.slug === 'sgpc-repairing' ||
            s.slug.includes('maintenance')
        )
      : services;

  const breadcrumbs = [{ name: 'Services', url: '/services' }];

  return (
    <>
      <SEO
        title="Glass Cleaning & Repair Services | Professional Glass Cleaning"
        description="Comprehensive glass cleaning, SGPC repairing, silicone repair, glass repair, and water tank cleaning in Zirakpur, Mohali & Chandigarh. Call 8539842072."
        canonical="https://professionalglasscleaningservice.com/services"
        breadcrumbs={breadcrumbs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Full Service Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Professional Cleaning & Repair Services
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From high-rise residential windows and showroom facades to silicone weatherproofing, hardware repair, SGPC repairing, and water tank hygiene across Zirakpur, Mohali, and Chandigarh.
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {['All', 'Cleaning', 'Repair & Sealing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-brand-500 text-white shadow-glass'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>

        {/* Bottom Booking Consultation Box */}
        <div className="mt-16 glass-panel p-8 sm:p-10 rounded-3xl border border-brand-200 bg-gradient-to-r from-brand-50/70 to-cyan-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-white px-3 py-1 rounded-full border border-brand-200 inline-block">
                Custom Requirements?
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                Need a Tailored Quote for Your Building or Society?
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
                We provide custom on-site inspections for commercial facilities, housing societies, retail showrooms, and residential villas across Zirakpur and Tricity.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Free On-Site Assessment
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  Direct Transparent Pricing
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-600" />
                  GST Invoice Available
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={business.phoneHref}
                className="py-3 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-glass text-center text-sm cursor-pointer"
              >
                Call {business.phone}
              </a>
              <Link
                to="/contact"
                className="py-3 px-6 rounded-xl font-bold text-navy-900 bg-white hover:bg-surface-200 transition-colors border border-slate-200 shadow-sm text-center text-sm"
              >
                Submit Enquiry Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
