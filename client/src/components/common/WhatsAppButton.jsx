import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton({
  phoneNumber = '918539842072',
  serviceName = '',
  locationName = '',
  customMessage = '',
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Generate dynamic contextual message
  let defaultText =
    'Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your services.';
  
  if (serviceName && locationName) {
    defaultText = `Hello, I would like to enquire about ${serviceName} in ${locationName}. Please share details and pricing.`;
  } else if (serviceName) {
    defaultText = `Hello, I would like to enquire about ${serviceName}. Please share details and availability.`;
  } else if (locationName) {
    defaultText = `Hello, I am looking for glass cleaning and repair services in ${locationName}. Please get in touch.`;
  }

  const finalMessage = customMessage || defaultText;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Quick Preview Popup */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 p-4 rounded-2xl glass-dark text-white shadow-2xl border border-white/20 animate-fadeIn relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Close message preview"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
              WA
            </div>
            <div>
              <p className="font-bold text-xs text-emerald-400">Professional Glass Cleaning</p>
              <p className="text-[10px] text-slate-300">Typically replies instantly</p>
            </div>
          </div>
          <p className="text-xs text-slate-200 bg-white/10 p-2.5 rounded-xl border border-white/10 mb-3">
            "{finalMessage}"
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Open WhatsApp Chat</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger */}
      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-navy-900 shadow-glass border border-slate-200 backdrop-blur-md">
            💬 WhatsApp Us
          </span>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // on mobile just open directly, on desktop user can also click or see tooltip
          }}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-glass-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
          aria-label="Chat with us on WhatsApp at 8539842072"
        >
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current transition-transform group-hover:rotate-12" />
        </a>
      </div>
    </div>
  );
}
