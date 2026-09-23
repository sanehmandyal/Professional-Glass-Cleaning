import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import LocationCard from '../components/common/LocationCard';
import MapSection from '../components/common/MapSection';
import { FALLBACK_LOCATIONS } from '../data/fallbackData';
import apiClient from '../services/api';

export default function Locations() {
  const [locations, setLocations] = useState(FALLBACK_LOCATIONS);

  useEffect(() => {
    apiClient
      .get('/locations')
      .then((res) => {
        if (res.data?.data?.length > 0) setLocations(res.data.data);
      })
      .catch(() => {});
  }, []);

  const breadcrumbs = [{ name: 'Locations', url: '/locations' }];

  return (
    <>
      <SEO
        title="Service Areas & Locations | Professional Glass Cleaning Zirakpur"
        description="We proudly serve Zirakpur (Green Enclave base), Mohali (SAS Nagar), Chandigarh, and selected areas across Punjab. Fast on-site dispatch. Call 8539842072."
        canonical="https://professionalglasscleaningservice.com/locations"
        breadcrumbs={breadcrumbs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Service Coverage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Our Primary Service Areas & Hubs
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Headquartered in Green Enclave, Zirakpur with mobile service crews operating across Mohali (SAS Nagar), Chandigarh, and selected Punjab commercial hubs.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {locations.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>

        {/* Local Service Hub Explanatory Panel */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl mb-16 border border-slate-200 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-5 rounded-2xl bg-surface-100 border border-slate-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Zirakpur Base
              </span>
              <h3 className="font-bold text-base text-navy-900 mb-2">
                Green Enclave & VIP Road
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Our main headquarters. Same-day service dispatch for high-rise societies, flats, and roadside retail showrooms.
              </p>
              <Link
                to="/locations/zirakpur"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Explore Zirakpur Services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-surface-100 border border-slate-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Mohali Hub
              </span>
              <h3 className="font-bold text-base text-navy-900 mb-2">
                SAS Nagar & IT City
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Comprehensive coverage across Phase 1 to 11, Sectors 66 to 82, corporate IT parks, and residential sectors.
              </p>
              <Link
                to="/locations/mohali"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Explore Mohali Services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-surface-100 border border-slate-200">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                Chandigarh Hub
              </span>
              <h3 className="font-bold text-base text-navy-900 mb-2">
                City Beautiful Sectors
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Sector 17 & 35 commercial showrooms, residential kothis across northern/southern sectors, and Industrial Area.
              </p>
              <Link
                to="/locations/chandigarh"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
              >
                <span>Explore Chandigarh Services</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Verified Map Section */}
        <MapSection />
      </div>
    </>
  );
}
