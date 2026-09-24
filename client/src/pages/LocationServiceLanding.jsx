import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Home as HomeIcon,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ContactForm from '../components/common/ContactForm';
import FAQAccordion from '../components/common/FAQAccordion';
import { FALLBACK_SERVICES, FALLBACK_LOCATIONS } from '../data/fallbackData';
import { useBusiness } from '../context/BusinessContext';

export default function LocationServiceLanding() {
  const { business } = useBusiness();
  const { city, serviceSlug } = useParams();
  const navigate = useNavigate();

  const matchedLocation = FALLBACK_LOCATIONS.find((l) => l.slug === city?.toLowerCase());
  const matchedService = FALLBACK_SERVICES.find((s) => s.slug === serviceSlug?.toLowerCase());

  useEffect(() => {
    if (!matchedLocation || !matchedService) {
      navigate('/services', { replace: true });
    }
  }, [matchedLocation, matchedService, navigate]);

  if (!matchedLocation || !matchedService) return null;

  const cityName = matchedLocation.name;
  const serviceName = matchedService.title;

  const pageTitle = `${serviceName} in ${cityName} | Professional Glass Cleaning`;
  const pageDescription = `Looking for expert ${serviceName.toLowerCase()} in ${cityName}? Professional Glass Cleaning Service provides fast, high-quality on-site ${serviceName.toLowerCase()} in ${cityName}. Call 8539842072 for instant quote.`;

  const breadcrumbs = [
    { name: 'Locations', url: '/locations' },
    { name: cityName, url: `/locations/${matchedLocation.slug}` },
    { name: serviceName, url: `/${matchedLocation.slug}/${matchedService.slug}` },
  ];

  // Unique local combination FAQs
  const combinationFaqs = [
    {
      question: `How quickly can you provide ${serviceName.toLowerCase()} in ${cityName}?`,
      answer: `Our service crews are active across ${cityName} and neighboring sectors daily. We typically offer same-day or next-day scheduled on-site dispatch for ${serviceName.toLowerCase()} in ${cityName}.`,
    },
    {
      question: `What property types do you serve for ${serviceName.toLowerCase()} in ${cityName}?`,
      answer: `In ${cityName}, we cater to independent houses, apartment societies, retail showrooms, corporate offices, and commercial facilities with specialized equipment suitable for your building layout.`,
    },
    {
      question: `How is the price calculated for ${serviceName.toLowerCase()} in ${cityName}?`,
      answer: `Pricing is transparent and based on square footage, accessibility, and current condition. We provide a firm quote following initial consultation or on-site inspection in ${cityName}.`,
    },
  ];

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDescription}
        canonical={`https://professionalglasscleaningservice.com/${matchedLocation.slug}/${matchedService.slug}`}
        breadcrumbs={breadcrumbs}
        service={matchedService}
        faqs={combinationFaqs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero Section */}
        <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/80 shadow-glass relative overflow-hidden mb-12 bg-gradient-to-r from-white via-surface-100 to-brand-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                <MapPin className="w-3.5 h-3.5" />
                <span>Local Service in {cityName}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
                Professional {serviceName} in{' '}
                <span className="text-brand-500">{cityName}</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Reliable on-site {serviceName.toLowerCase()} for residential homes, housing societies, shops, and commercial offices across {cityName}. Prompt service, proper equipment, and transparent pricing.
              </p>

              {/* CTAs */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <a
                  href={business.phoneHref}
                  className="py-3 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-glass flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {business.phone}</span>
                </a>

                <a
                  href={business.whatsappLink(`Hello, I need ${serviceName} in ${cityName}. Please share details.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 rounded-xl font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors border border-emerald-300 flex items-center gap-2 text-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>WhatsApp Enquire</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 aspect-video sm:aspect-4/3 bg-slate-100">
                <img
                  src={matchedService.image}
                  alt={`${serviceName} in ${cityName}`}
                  className="w-full h-full object-cover"
                  width="600"
                  height="450"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Localized Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Main content body */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-3xl space-y-6 bg-white border border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
                Service Details
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900">
                Why Choose Our {serviceName} in {cityName}?
              </h2>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed">
              Properties in {cityName} face environmental challenges such as highway dust, high-rise wind exposure, hard water mineral scaling, and monsoon moisture seepage. Our specialized {serviceName.toLowerCase()} utilizes professional tools and materials engineered to restore clarity and structural durability.
            </p>

            {/* Service Benefits */}
            {matchedService.benefits && (
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-navy-900">Key Service Advantages:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {matchedService.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-100 border border-slate-200 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coverage neighborhoods */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-bold text-sm text-navy-900 mb-2">
                Serving All Key Neighborhoods Across {cityName}:
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {matchedLocation.coverageAreas?.join(', ')}
              </p>
            </div>
          </div>

          {/* Sidebar CTA & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <span className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto">
                <Phone className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-base text-navy-900">Direct Service Booking</h3>
              <p className="text-xs text-slate-500">
                Call our supervisor directly for quick scheduling in {cityName}.
              </p>
              <a
                href={business.phoneHref}
                className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm block shadow-sm cursor-pointer"
              >
                Call {business.phone}
              </a>
            </div>

            <div className="glass-panel p-6 rounded-3xl bg-surface-100 border border-slate-200 space-y-2">
              <p className="text-xs font-bold text-navy-900">Explore Related {cityName} Services:</p>
              <div className="space-y-1.5 pt-1">
                {FALLBACK_SERVICES.filter((s) => s.slug !== matchedService.slug)
                  .slice(0, 4)
                  .map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/${matchedLocation.slug}/${svc.slug}`}
                      className="block text-xs font-medium text-slate-700 hover:text-brand-600 truncate py-1"
                    >
                      • {cityName} {svc.title}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Local FAQs */}
        <div className="mb-12">
          <FAQAccordion
            items={combinationFaqs}
            title={`${serviceName} FAQs in ${cityName}`}
            subtitle={`Common questions about getting ${serviceName.toLowerCase()} in ${cityName}.`}
          />
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <ContactForm
            initialService={serviceName}
            initialLocation={`${cityName} Area`}
            title={`Get Quote for ${serviceName} in ${cityName}`}
            subtitle={`Submit your details and we will reach out promptly to confirm service in ${cityName}.`}
          />
        </div>
      </div>
    </>
  );
}
