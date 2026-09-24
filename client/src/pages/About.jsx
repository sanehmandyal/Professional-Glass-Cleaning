import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Droplet,
  Waves,
  Hammer,
} from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import MapSection from '../components/common/MapSection';
import { useBusiness } from '../context/BusinessContext';

export default function About() {
  const { business } = useBusiness();
  const breadcrumbs = [{ name: 'About Us', url: '/about' }];

  return (
    <>
      <SEO
        title="About Professional Glass Cleaning Service | Zirakpur, Punjab"
        description="Learn about Professional Glass Cleaning Service based in Green Enclave, Zirakpur. Dependable glass cleaning, silicone repair, SGPC repairing, and water tank cleaning. Call 8539842072."
        canonical="https://professionalglasscleaningservice.com/about"
        breadcrumbs={breadcrumbs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Company Profile
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            About Professional Glass Cleaning Service
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            A dedicated local service provider based in Green Enclave, Zirakpur, delivering dependable glass cleaning, silicone waterproofing, SGPC repairing, and hygienic water tank maintenance across Tricity.
          </p>
        </div>

        {/* Core Profile Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          <div className="lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl space-y-5 bg-white border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900">
              Who We Are & What We Do
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              Professional Glass Cleaning Service was established to address the real maintenance needs of residential societies, commercial showrooms, corporate offices, and independent homes in Zirakpur, Mohali (SAS Nagar), and Chandigarh.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Modern buildings in the Tricity region feature extensive glass facades, balcony glass panels, sliding doors, and water storage systems that require specialized care. We provide trained technicians equipped with professional squeegees, telescopic reach systems, neutral-cure architectural silicone, and hygienic tank disinfection machinery.
            </p>
            <p className="text-slate-700 text-sm leading-relaxed">
              Our business operates on simple, honest principles: punctual attendance, transparent quotations provided directly by the owner, careful execution without damage to premises, and complete client satisfaction upon completion.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Verified Local Business
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Proper Safety Equipment
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-600" />
                Direct Contact: 8539842072
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl glass-dark text-white space-y-4 shadow-glass-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-300">
                Primary Business Information
              </span>
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Physical Location:</strong>
                    <span>{business.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Owner Phone Helpline:</strong>
                    <a href={business.phoneHref} className="text-brand-300 hover:underline font-bold">
                      {business.phoneDisplay || business.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">WhatsApp Channel:</strong>
                    <a href={business.whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-300 hover:underline">
                      {business.phoneDisplay || business.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-[11px] text-slate-400">
                  Daily Service Hours: {business.workingHours || 'Monday – Sunday (8:00 AM – 8:00 PM)'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Services We Deliver Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-900">
              Our Core Service Capabilities
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Executed with authentic materials, proper tools, and dedicated attention.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Professional Glass Cleaning',
                desc: 'Streak-free window, partition, and balcony glass cleaning removing stains safely.',
              },
              {
                icon: Wrench,
                title: 'SGPC Repairing',
                desc: 'Dedicated SGPC repairing service carried out with appropriate tools and precision.',
              },
              {
                icon: Droplet,
                title: 'Silicone Repair & Sealing',
                desc: 'Waterproof anti-mold re-caulking for glass joints, windows, and shower stalls.',
              },
              {
                icon: Waves,
                title: 'Water Tank Sanitization',
                desc: 'Hygienic multi-stage deep cleaning and disinfection for overhead and underground sumps.',
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-navy-900 mb-1">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Verified Map & Location */}
        <MapSection />
      </div>
    </>
  );
}
