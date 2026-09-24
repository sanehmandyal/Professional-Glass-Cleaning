import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Phone,
  MessageCircle,
  MapPin,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Droplets,
  Layers,
  Wrench,
  Waves,
  Building,
  Home as HomeIcon,
  Search,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import ServiceCard from '../components/common/ServiceCard';
import LocationCard from '../components/common/LocationCard';
import BeforeAfterSlider from '../components/common/BeforeAfterSlider';
import ContactForm from '../components/common/ContactForm';
import MapSection from '../components/common/MapSection';
import FAQAccordion from '../components/common/FAQAccordion';
import ReviewsSection from '../components/ReviewsSection';
import { FALLBACK_SERVICES, FALLBACK_LOCATIONS, FALLBACK_FAQS } from '../data/fallbackData';
import apiClient from '../services/api';
import { useBusiness } from '../context/BusinessContext';

export default function Home() {
  const { business } = useBusiness();
  const [services, setServices] = useState(FALLBACK_SERVICES);
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS);
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch live services if available
    apiClient
      .get('/services')
      .then((res) => {
        if (res.data?.data?.length > 0) setServices(res.data.data);
      })
      .catch(() => {});

    apiClient
      .get('/locations')
      .then((res) => {
        if (res.data?.data?.length > 0) setLocations(res.data.data);
      })
      .catch(() => {});

    apiClient
      .get('/faqs')
      .then((res) => {
        if (res.data?.data?.length > 0) setFaqs(res.data.data);
      })
      .catch(() => {});
  }, []);

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : selectedCategory === 'Cleaning'
      ? services.filter((s) => s.slug.includes('cleaning'))
      : selectedCategory === 'Repair'
      ? services.filter((s) => s.slug.includes('repair') || s.slug.includes('sealing') || s.slug === 'sgpc-repairing')
      : services;

  return (
    <>
      <SEO
        title="Professional Glass Cleaning Service in Zirakpur | Glass Repair & Cleaning"
        description="Professional glass cleaning, glass repair, silicone repair, SGPC repairing and water tank cleaning services in Zirakpur, Mohali and Chandigarh. Call 8539842072 for service enquiries."
        canonical="https://professionalglasscleaningservice.com/"
        faqs={faqs.slice(0, 6)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-hero-gradient">
        {/* Subtle decorative glow orbs */}
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-brand-300/25 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 text-navy-900 border border-slate-200 shadow-sm backdrop-blur-md">
                <MapPin className="w-4 h-4 text-rose-500 fill-rose-100" />
                <span>📍 Green Enclave, Zirakpur, Punjab 140603</span>
              </div>

              {/* Main H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-[1.15]">
                Professional Glass Cleaning & Repair Services in{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-cyan-500">
                  Zirakpur & Tricity
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
                Professional cleaning, repair and maintenance solutions for residential and commercial properties. Specialized in streak-free window cleaning, silicone waterproofing, SGPC repairing, glass repair, and hygienic water tank sanitization.
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  '✨ Glass Cleaning',
                  '🔧 SGPC Repairing',
                  '💧 Silicone Repair',
                  '🔨 Glass Repair',
                  '🌊 Water Tank Cleaning',
                ].map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/80 text-navy-900 border border-slate-200 shadow-sm"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={business.phoneHref}
                  className="py-3.5 px-6 rounded-2xl font-bold text-white bg-brand-500 hover:bg-brand-600 shadow-glass-hover transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base glass-shine cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {business.phone}</span>
                </a>

                <a
                  href={business.whatsappLink('Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your services.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 rounded-2xl font-bold text-emerald-800 bg-emerald-100/90 hover:bg-emerald-200 transition-all duration-200 border border-emerald-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                  <span>WhatsApp Us</span>
                </a>

                <Link
                  to="/contact"
                  className="py-3.5 px-6 rounded-2xl font-bold text-navy-900 bg-white hover:bg-surface-200 transition-all duration-200 border border-slate-200 shadow-sm flex items-center justify-center gap-1.5 text-sm sm:text-base"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 text-brand-500" />
                </Link>
              </div>

              {/* Trust Indicators Note */}
              <div className="pt-3 flex items-center gap-6 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  On-Site Inspection
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  Trained Technicians
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-brand-500" />
                  Direct Owner Pricing
                </span>
              </div>
            </div>

            {/* Hero Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden glass-panel p-2 shadow-glass-lg border border-white">
                <img
                  src="/images/services/glass-cleaning.jpg"
                  alt="Professional technician cleaning large architectural glass windows in Zirakpur"
                  className="w-full h-80 sm:h-[420px] object-cover rounded-2xl"
                  width="600"
                  height="420"
                />

                {/* Floating Floating Stat Card */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-dark text-white border border-white/20 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
                        Primary Service Region
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                        Zirakpur • Mohali • Chandigarh
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-brand-500/80 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST & CREDIBILITY PILLARS */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900">Green Enclave Base</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Locally based in Zirakpur for fast dispatch across VIP Road, Baltana, & Tricity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900">Streak-Free Method</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Purified water rinse & architectural squeegees for crystal-clear results.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900">Durable Silicone & Hardware</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Neutral-cure anti-fungal silicone and heavy-duty patch fittings for lasting safety.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl glass-panel border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-900">Direct Owner Contact</h4>
                <p className="text-xs text-slate-500 mt-1">
                  No middlemen. Speak directly with the service team on 8539842072.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
                What We Do
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
                Our Professional Cleaning & Repair Services
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
                Comprehensive maintenance solutions for glass, hardware, waterproofing seals, and water tanks across Zirakpur and Tricity.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-200 border border-slate-200 shrink-0 self-start md:self-auto">
              {['All', 'Cleaning', 'Repair'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-brand-600 shadow-sm'
                      : 'text-slate-600 hover:text-navy-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.slice(0, 6).map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          {/* View All Services CTA */}
          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl font-bold text-navy-900 bg-white hover:bg-brand-50 hover:text-brand-600 border border-slate-200 shadow-sm transition-all"
            >
              <span>Explore All 14 Individual Services</span>
              <ArrowRight className="w-4 h-4 text-brand-500" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BEFORE & AFTER SHOWCASE */}
      <section className="py-16 bg-gradient-to-b from-surface-100 to-white border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block">
                Visible Results
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900 tracking-tight">
                Transforming Dull, Stained Glass Into Spotless Clarity
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether dealing with hard water deposits, monsoon dirt runoff, black moldy silicone joints, or mud sediment inside water tanks, our systematic process restores optimal cleanliness.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-navy-900">Zero Swirl Marks:</strong> Professional rubber squeegee blades leave zero scratches or hazing.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-navy-900">Watertight Joint Finish:</strong> Anti-fungal silicone stops drafts and monsoon wall dampness.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-navy-900">Hygienic Water Tanks:</strong> Disinfected and vacuumed overhead and underground sumps.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <BeforeAfterSlider
                title="Glass Panel Cleaning Transformation"
                beforeLabel="Before (Hard Water & Dust)"
                afterLabel="After (Pristine Streak-Free)"
                isDemo={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. 4-STEP SERVICE PROCESS */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
              Simple & Transparent
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Our 4-Step Service Process
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From your initial call to the final sparkling inspection, here is how we work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Contact & Requirement',
                desc: 'Call or WhatsApp 8539842072 or submit your online enquiry with your location.',
              },
              {
                step: '02',
                title: 'Transparent Estimate',
                desc: 'We review your requirements and provide a clear quote with no hidden extras.',
              },
              {
                step: '03',
                title: 'On-Site Precision Work',
                desc: 'Our technician crew arrives on time with professional tools and safety equipment.',
              },
              {
                step: '04',
                title: 'Quality Check & Sign-off',
                desc: 'You inspect the completed work and confirm satisfaction before payment.',
              },
            ].map((p, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden border border-slate-100">
                <span className="text-3xl font-extrabold text-brand-200 block mb-3 font-display">
                  {p.step}
                </span>
                <h3 className="font-bold text-base text-navy-900 mb-2">{p.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. LOCAL SERVICE AREAS */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200 inline-block mb-2">
              Local Service Coverage
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 tracking-tight">
              Areas We Actively Serve
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Fast technician dispatch across Zirakpur, Mohali, Chandigarh, and selected Punjab regions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {locations.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <FAQAccordion
            items={faqs.slice(0, 6)}
            title="Frequently Asked Questions"
            subtitle="Clear answers about our services, booking process, pricing, and service coverage."
          />
          <div className="text-center mt-8">
            <Link to="/faqs" className="text-sm font-bold text-brand-600 hover:underline">
              View All FAQs & Booking Guide →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. CONTACT FORM & GOOGLE MAPS SECTION */}
      <section className="py-16 bg-gradient-to-b from-surface-100 to-white border-t border-slate-100">
        <div className="container-custom space-y-12">
          {/* Contact Form Card */}
          <div className="max-w-4xl mx-auto">
            <ContactForm />
          </div>

          {/* Google Maps Embed Section */}
          <MapSection />
        </div>
      </section>
    </>
  );
}
