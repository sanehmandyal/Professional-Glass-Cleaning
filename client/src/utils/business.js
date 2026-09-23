// Central place for business constants used across the site.
// Update here if the phone number, address or WhatsApp link ever changes.
export const BUSINESS = {
  name: 'Professional Glass Cleaning Service',
  phone: '8539842072',
  phoneDisplay: '+91 85398 42072',
  phoneHref: 'tel:+918539842072',
  whatsappNumber: '918539842072',
  address: 'Green Enclave, Zirakpur, Punjab 140603, India',
  serviceArea: 'Zirakpur, Mohali, Chandigarh and nearby areas',
};

export const whatsappLink = (message) =>
  `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your service.';

export const serviceWhatsappMessage = (serviceName) =>
  `Hello, I need ${serviceName} in Zirakpur. Please share the details and quotation.`;
