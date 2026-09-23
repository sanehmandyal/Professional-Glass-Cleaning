import { MessageCircle } from 'lucide-react';
import { whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

export const WhatsAppButton = ({ className = '', message = DEFAULT_WHATSAPP_MESSAGE, label = 'WhatsApp Us' }) => (
  <a
    href={whatsappLink(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn-whatsapp ${className}`}
  >
    <MessageCircle size={18} />
    {label}
  </a>
);

// Floating action button shown on every page
export const WhatsAppFloatingButton = () => (
  <a
    href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-glass-lg transition-transform hover:scale-105"
  >
    <MessageCircle size={26} />
  </a>
);

export default WhatsAppButton;
