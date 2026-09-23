import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Home as HomeIcon,
  Navigation,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/common/ContactForm';
import FAQAccordion from '../components/common/FAQAccordion';
import { FALLBACK_LOCATIONS, FALLBACK_SERVICES } from '../data/fallbackData';
import apiClient from '../services/api';

export default function LocationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState(null);
  const [allLocations, setAllLocations] = useState(FALLBACK_LOCATIONS);

  useEffect(() => {
    const matched = FALLBACK_LOCATIONS.find((l) => l.slug === slug);
    if (matched) setLocationData(matched);

    apiClient
      .get(`/locations/${slug}`)
      .then((res) => {
        if (res.data?.data) {
          setLocationData(res.data.data);
        }
      })
      .catch((err) => {
        if (!matched) {
          navigate('/locations', { replace: true });
        }
      });
  }, [slug, navigate]);

  if (!locationData) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-semibold">Loading location details...</p>
      </div>
    );
  }

  const isBase = locationData.slug === 'zirakpur';
  const breadcrumbs = [
    { name: 'Locations', url: '/locations' },
    { name: locationData.name, url: `/locations/${locationData.slug}` },
  ];

  const mapEmbedUrl = isBase
    ? 'https://maps.google.com/maps?q=Green%20Enclave,%20Zirakpur,%20Punjab%20140603&t=&z=14&ie=UTF8&iwloc=&output=embed'
    : locationData.slug === 'mohali'
    ? 'https://maps.google.com/maps?q=Sahibzada%20Ajit%20Singh%20Nagar,%20Mohali,%20Punjab&t=&z=13&ie=UTF8&iwloc=&output=embed'
    : locationData.slug === 'chandigarh'
    ? 'https://maps.google.com/maps?q=Chandigarh,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed'
    : 'https://maps.google.com/maps?q=Punjab,%20India&t=&z=9&ie=UTF8&iwloc=&output=embed';

  return (
    <>
      <SEO
        title={locationData.seoTitle || `Glass Cleaning & Repair Services in ${locationData.name}`}
        description={
          locationData.seoDescription ||
          `Professional glass cleaning, glass repair, silicone repair and water tank cleaning in ${locationData.name}. Call 8539842072.`
        }
        canonical={`https://professionalglasscleaningservice.com/locations/${locationData.slug}`}
        breadcrumbs={breadcrumbs}
        faqs={locationData.localFaqs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* 1. HERO BANNER */}
        <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/80 shadow-glass relative overflow-hidden mb-12 bg-gradient-to-r from-white via-surface-100 to-brand-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>{locationData.type || 'Service Hub'} • {locationData.name}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
                {locationData.h1 || `Glass Cleaning & Repair in ${locationData.name}`}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {locationData.heroSubtitle || locationData.description}
              </p>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+918539842072"
                  className="py-3 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-glass flex items-center gap-2 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 8539842072</span>
                </a>

                <a
                  href={`https://wa.me/918539842072?text=${encodeURIComponent(
                    `Hello, I would like to enquire about glass cleaning / repair services in ${locationData.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors border border-emerald-300 flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </div>
            </div>

            {/* Base Highlights Card */}
            <div className="lg:col-span-4">
              <div className="p-6 rounded-2xl glass-dark text-white shadow-glass-lg space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  {isBase ? 'Verified Operations Base' : 'Active Mobile Units'}
                </span>
                <p className="text-sm font-semibold text-slate-200">
                  {isBase
                    ? 'Green Enclave, Zirakpur, Punjab 140603'
                    : `Dispatched daily from our Zirakpur headquarters to all ${locationData.name} sectors.`}
                </p>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span>Fast On-Site Dispatch</span>
                  <span className="font-bold text-brand-300">8:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. IN-DEPTH LOCAL SERVICE CONTEXT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Detailed Local Service Need Discussion */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 bg-white border border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
                Local Focus
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
                Service Capabilities & Specifics in {locationData.name}
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              {locationData.description}
            </p>

            {/* Key Highlights */}
            {locationData.keyHighlights && locationData.keyHighlights.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-sm text-navy-900">
                  Why Customers in {locationData.name} Choose Us:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {locationData.keyHighlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-100 border border-slate-200 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Targeted Service Landing Combinations for this Location */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-navy-900 mb-3">
                Direct Service Solutions in {locationData.name}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { name: 'Glass Cleaning', slug: 'glass-cleaning' },
                  { name: 'Glass Repair', slug: 'glass-repair' },
                  { name: 'Silicone Repair', slug: 'silicone-repair' },
                  { name: 'Water Tank Cleaning', slug: 'water-tank-cleaning' },
                ].map((s) => (
                  <Link
                    key={s.slug}
                    to={`/${locationData.slug}/${s.slug}`}
                    className="p-3 rounded-xl bg-brand-50/50 hover:bg-brand-50 border border-brand-100 transition-colors flex items-center justify-between text-xs font-semibold text-brand-900"
                  >
                    <span>{locationData.name} {s.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-600" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Local Neighborhood Coverage Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 sm:p-7 rounded-3xl bg-white border border-slate-200">
              <h3 className="font-bold text-base text-navy-900 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" />
                Coverage Neighborhoods
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Active service coverage across the following key areas:
              </p>
              <div className="space-y-2">
                {locationData.coverageAreas?.map((area, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-xs text-slate-700 p-2 rounded-lg bg-surface-100 border border-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                    <span className="font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Call Box */}
            <div className="glass-panel p-6 rounded-3xl bg-surface-100 border border-slate-200 text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Direct Location Helpline
              </p>
              <a
                href="tel:+918539842072"
                className="text-xl font-extrabold text-brand-600 hover:underline block"
              >
                8539842072
              </a>
              <p className="text-[11px] text-slate-500">
                Call now for same-day booking or quotation in {locationData.name}.
              </p>
            </div>
          </div>
        </div>

        {/* 3. LOCAL FAQS */}
        {locationData.localFaqs && locationData.localFaqs.length > 0 && (
          <div className="mb-12">
            <FAQAccordion
              items={locationData.localFaqs}
              title={`Local FAQs for ${locationData.name}`}
              subtitle={`Common queries about service dispatch, timings, and property types in ${locationData.name}.`}
            />
          </div>
        )}

        {/* 4. CONTACT FORM & LOCAL MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-7">
            <ContactForm
              initialLocation={`${locationData.name} Area`}
              title={`Book Service in ${locationData.name}`}
              subtitle={`Tell us your location in ${locationData.name} and requirements for a fast quote.`}
            />
          </div>

          <div className="lg:col-span-5 glass-panel p-6 rounded-3xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-navy-900 mb-2">
                {locationData.name} Map & Area
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Service radius and route coverage for {locationData.name}.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-200 h-72 sm:h-80 w-full relative bg-slate-100">
              <iframe
                title={`${locationData.name} Service Area Map`}
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* 5. EXPLORE OTHER LOCATIONS */}
        <div className="pt-8 border-t border-slate-200">
          <h3 className="font-bold text-lg text-navy-900 mb-4">Other Service Areas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allLocations
              .filter((l) => l.slug !== locationData.slug)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="p-4 rounded-2xl glass-panel hover:bg-white transition-colors border border-slate-200 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-sm text-navy-900">{loc.name}</h4>
                    <p className="text-[11px] text-slate-500">{loc.tagline || loc.type}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
