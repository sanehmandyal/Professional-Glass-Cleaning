import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import ContactForm from '../components/common/ContactForm';
import FAQAccordion from '../components/common/FAQAccordion';
import { FALLBACK_SERVICES, FALLBACK_LOCATIONS } from '../data/fallbackData';
import apiClient from '../services/api';
import { useBusiness } from '../context/BusinessContext';

export default function ServiceDetails() {
  const { business } = useBusiness();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState(FALLBACK_SERVICES);
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS);

  useEffect(() => {
    // Look up in fallback data first for instant render
    const matched = FALLBACK_SERVICES.find((s) => s.slug === slug);
    if (matched) setService(matched);

    // Fetch from backend
    apiClient
      .get(`/services/${slug}`)
      .then((res) => {
        if (res.data?.data) {
          setService(res.data.data);
        }
      })
      .catch((err) => {
        if (!matched) {
          navigate('/services', { replace: true });
        }
      });
  }, [slug, navigate]);

  if (!service) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600 font-semibold">Loading service details...</p>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  // Related other services
  const otherServices = allServices.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={service.seoTitle || `${service.title} in Zirakpur, Mohali & Chandigarh`}
        description={
          service.seoDescription ||
          `${service.shortDescription} Professional service in Green Enclave, Zirakpur and Tricity. Call 8539842072.`
        }
        canonical={`https://professionalglasscleaningservice.com/services/${service.slug}`}
        breadcrumbs={breadcrumbs}
        service={service}
        faqs={service.faqs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* 1. HERO BANNER */}
        <div className="glass-panel p-6 sm:p-10 lg:p-12 rounded-3xl border border-white/80 shadow-glass relative overflow-hidden mb-12 bg-gradient-to-r from-white via-surface-100 to-brand-50/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-100 text-brand-700">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Professional Service in Zirakpur & Tricity</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
                {service.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {service.description}
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
                  href={business.whatsappLink(`Hello, I would like to enquire about ${service.title} in Zirakpur / Tricity.`)}
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
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 relative aspect-video sm:aspect-4/3 bg-slate-100">
                <img
                  src={service.image}
                  alt={`${service.title} in Zirakpur and Mohali`}
                  className="w-full h-full object-cover"
                  width="600"
                  height="450"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. PROBLEMS SOLVED & BENEFITS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Problems Solved */}
          {service.problemsSolved && service.problemsSolved.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-100 bg-white">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-500" />
                Problems This Service Resolves
              </h3>
              <ul className="space-y-3">
                {service.problemsSolved.map((prob, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 shrink-0"></span>
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-100 bg-white">
              <h3 className="text-lg sm:text-xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-600" />
                Key Advantages & Value
              </h3>
              <ul className="space-y-3">
                {service.benefits.map((ben, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{ben}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. SERVICE PROCESS & SUITABLE PROPERTIES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Step-by-Step Process */}
          {service.process && service.process.length > 0 && (
            <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
                Our Methodology
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6">
                Step-by-Step Execution Process
              </h3>
              <div className="space-y-4">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3.5 rounded-2xl bg-surface-100/80 border border-slate-200">
                    <span className="w-7 h-7 rounded-xl bg-brand-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Suitable Customers & Properties */}
          <div className="lg:col-span-5 space-y-6">
            {service.suitableFor && service.suitableFor.length > 0 && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl bg-white border border-slate-200">
                <h3 className="text-lg font-bold text-navy-900 mb-4">
                  Suitable Properties & Clients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.suitableFor.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-50 text-brand-800 border border-brand-100"
                    >
                      🏢 {item}
                    </span>
                  ))}
                </div>
                {service.pricingNote && (
                  <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <p className="text-xs font-bold text-navy-900">Pricing Note:</p>
                    <p className="text-xs text-slate-600 mt-0.5">{service.pricingNote}</p>
                  </div>
                )}
              </div>
            )}

            {/* Direct Hotline Quickbox */}
            <div className="glass-panel p-6 rounded-3xl bg-gradient-to-br from-brand-600 to-navy-900 text-white shadow-glass-lg">
              <h4 className="font-bold text-base mb-1">Have Questions or Need Urgent Service?</h4>
              <p className="text-xs text-brand-100 mb-4">
                Speak directly with our field supervisor for instant guidance and on-site booking.
              </p>
              <a
                href={business.phoneHref}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-navy-900 bg-white hover:bg-brand-50 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-brand-600" />
                <span>Direct Call: {business.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. BEFORE & AFTER SLIDER (If available) */}
        {service.beforeAfterImages && (
          <div className="mb-12">
            <BeforeAfterSlider
              title={`${service.title} - Visual Transformation`}
              beforeImage={service.beforeAfterImages.before}
              afterImage={service.beforeAfterImages.after}
              isDemo={true}
            />
          </div>
        )}

        {/* 5. LOCAL SERVICE AREA COVERAGE FOR THIS SERVICE */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl mb-12 bg-white border border-slate-200">
          <h3 className="text-xl font-bold text-navy-900 mb-3">
            Service Availability & Local Coverage for {service.title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm mb-4 leading-relaxed">
            We provide prompt on-site {service.title.toLowerCase()} across our primary service regions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link
              to={`/zirakpur/${service.slug}`}
              className="p-3.5 rounded-2xl bg-surface-100 hover:bg-brand-50 transition-colors border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-xs text-navy-900">Zirakpur Base</p>
                <p className="text-[11px] text-slate-500">Green Enclave, VIP Rd</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
            </Link>

            <Link
              to={`/mohali/${service.slug}`}
              className="p-3.5 rounded-2xl bg-surface-100 hover:bg-brand-50 transition-colors border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-xs text-navy-900">Mohali</p>
                <p className="text-[11px] text-slate-500">Phases, Sectors 66-82</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
            </Link>

            <Link
              to={`/chandigarh/${service.slug}`}
              className="p-3.5 rounded-2xl bg-surface-100 hover:bg-brand-50 transition-colors border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-xs text-navy-900">Chandigarh</p>
                <p className="text-[11px] text-slate-500">Sectors 1-60 & Showrooms</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
            </Link>

            <Link
              to="/locations/punjab"
              className="p-3.5 rounded-2xl bg-surface-100 hover:bg-brand-50 transition-colors border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-xs text-navy-900">Punjab Selected</p>
                <p className="text-[11px] text-slate-500">By advance schedule</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-brand-500" />
            </Link>
          </div>
        </div>

        {/* 6. FAQS */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="mb-12">
            <FAQAccordion
              items={service.faqs}
              title={`Frequently Asked Questions about ${service.title}`}
              subtitle="Specific details regarding preparation, process, and durability."
            />
          </div>
        )}

        {/* 7. CONTACT / ENQUIRY FORM */}
        <div className="max-w-4xl mx-auto mb-12">
          <ContactForm
            initialService={service.title}
            title={`Book / Enquire About ${service.title}`}
            subtitle="Submit your requirements below and we will contact you with a customized estimate."
          />
        </div>

        {/* 8. EXPLORE OTHER SERVICES */}
        <div>
          <h3 className="text-xl font-bold text-navy-900 mb-6">
            Other Cleaning & Repair Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((svc) => (
              <div key={svc.slug} className="glass-panel p-5 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-navy-900 mb-1">{svc.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{svc.shortDescription}</p>
                </div>
                <Link
                  to={`/services/${svc.slug}`}
                  className="mt-4 text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
