import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Wrench,
  Droplet,
  Hammer,
  Waves,
  Maximize2,
  DoorClosed,
  Home,
  Building2,
  Briefcase,
  Store,
  ShieldCheck,
  Layers,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Phone,
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Wrench,
  Droplet,
  Hammer,
  Waves,
  Maximize2,
  DoorClosed,
  Home,
  Building2,
  Briefcase,
  Store,
  ShieldCheck,
  Layers,
  AlertTriangle,
};

// Fallback high-res realistic images based on service slug
const DEFAULT_IMAGES = {
  'glass-cleaning': '/images/services/glass-cleaning.jpg',
  'sgpc-repairing': '/images/services/sgpc-repairing.jpg',
  'silicone-repair': '/images/services/silicone-repair.jpg',
  'glass-repair': '/images/services/glass-repair.jpg',
  'water-tank-cleaning': '/images/services/water-tank-cleaning.jpg',
  'window-glass-cleaning': '/images/services/window-glass-cleaning.jpg',
  'glass-door-cleaning': '/images/services/glass-door-cleaning.jpg',
  'residential-glass-cleaning': '/images/services/residential-glass-cleaning.jpg',
  'commercial-glass-cleaning': '/images/services/commercial-glass-cleaning.jpg',
  'office-glass-cleaning': '/images/services/office-glass-cleaning.jpg',
  'shop-glass-cleaning': '/images/services/shop-glass-cleaning.jpg',
  'glass-maintenance': '/images/services/glass-maintenance.jpg',
  'silicone-sealing': '/images/services/silicone-sealing.jpg',
  'emergency-glass-repair': '/images/services/emergency-glass-repair.jpg',
};

export default function ServiceCard({ service, onEnquireClick }) {
  const IconComponent = ICON_MAP[service.icon] || Sparkles;
  const imageSrc = service.image?.startsWith('http') || service.image?.startsWith('/')
    ? service.image
    : DEFAULT_IMAGES[service.slug] || DEFAULT_IMAGES['glass-cleaning'];

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full group border border-white/80">
      {/* Top Image Container with Badge */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={imageSrc}
          alt={`${service.title} in Zirakpur, Mohali & Chandigarh`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width="400"
          height="250"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-black/20"></div>

        {/* Floating Service Icon */}
        <div className="absolute top-3.5 left-3.5 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-brand-500 shadow-glass flex items-center justify-center border border-white">
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Title over Image Bottom */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow-sm line-clamp-1">
            {service.title}
          </h3>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
            {service.shortDescription || service.description}
          </p>

          {/* Key Benefits */}
          {service.benefits && service.benefits.length > 0 && (
            <div className="space-y-2 mb-5">
              {service.benefits.slice(0, 3).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-1 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
          <Link
            to={`/services/${service.slug}`}
            className="flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold text-navy-900 bg-surface-100 hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => {
              if (onEnquireClick) {
                onEnquireClick(service.title);
              } else {
                window.location.href = `/contact?service=${encodeURIComponent(service.title)}`;
              }
            }}
            className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Get Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
}
