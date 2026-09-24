import React from 'react';
import { MapPin, Navigation, Phone, Clock, ExternalLink } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function MapSection({
  title,
  subtitle,
  className = '',
}) {
  const { business } = useBusiness();

  const activeTitle = title || `Verified Business Base & Service Hub`;
  const activeSubtitle = subtitle || `Headquartered at ${business.address.split(',')[0] || 'Green Enclave'}, with active service coverage across ${business.serviceArea || 'Zirakpur, Mohali, and Chandigarh'}.`;

  return (
    <div className={`glass-panel p-6 sm:p-8 rounded-3xl ${className}`}>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left Information Card */}
        <div className="lg:w-5/12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-brand-100 text-brand-700 mb-3">
              <MapPin className="w-3.5 h-3.5" />
              <span>Verified Local Business Base</span>
            </div>
            <h3 className="text-2xl font-bold text-navy-900 tracking-tight mb-2">{activeTitle}</h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{activeSubtitle}</p>

            <div className="space-y-4 text-sm text-slate-700 bg-surface-100/80 p-5 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy-900">Operating Address</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {business.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy-900">Direct Helpline & WhatsApp</p>
                  <a href={business.phoneHref} className="text-brand-600 font-semibold text-xs hover:underline mt-0.5 block">
                    {business.phoneDisplay || business.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy-900">Working Hours</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {business.workingHours || 'Monday – Sunday: 8:00 AM – 8:00 PM (Emergency calls attended)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={business.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Google Maps Directions</span>
            </a>
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-navy-900 bg-white hover:bg-surface-200 transition-colors border border-slate-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ExternalLink className="w-4 h-4 text-slate-500" />
              <span>View On Maps</span>
            </a>
          </div>
        </div>

        {/* Right Embedded Interactive Map */}
        <div className="lg:w-7/12 min-h-[320px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative bg-slate-100">
          <iframe
            title={`${business.businessName} Location Map`}
            src={business.mapEmbedUrl}
            className="w-full h-full min-h-[320px] border-0"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
