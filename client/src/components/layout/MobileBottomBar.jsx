import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, FileText } from 'lucide-react';

export default function MobileBottomBar({
  phoneNumber = '8539842072',
  whatsappNumber = '918539842072',
}) {
  const location = useLocation();

  // Don't show inside admin panel
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-2.5 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-8px_25px_rgba(0,0,0,0.08)]">
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* CALL */}
        <a
          href={`tel:+91${phoneNumber}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-navy-900 transition-colors focus:outline-none"
          aria-label="Call Business directly"
        >
          <Phone className="w-4 h-4 text-brand-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">CALL</span>
        </a>

        {/* WHATSAPP */}
        <a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            'Hello, I would like to enquire about Professional Glass Cleaning Service.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 transition-colors border border-emerald-200 focus:outline-none"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5 fill-current" />
          <span className="text-[11px] font-bold tracking-tight">WHATSAPP</span>
        </a>

        {/* GET QUOTE */}
        <Link
          to="/contact"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white transition-colors shadow-sm focus:outline-none"
          aria-label="Get a Service Quote"
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">GET QUOTE</span>
        </Link>
      </div>
    </div>
  );
}
