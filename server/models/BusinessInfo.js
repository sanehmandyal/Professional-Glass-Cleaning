const mongoose = require('mongoose');

// Singleton document holding editable business/contact info and UI settings
const businessInfoSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Professional Glass Cleaning Service' },
    phone: { type: String, default: '8539842072' },
    secondaryPhone: { type: String, default: '' },
    whatsapp: { type: String, default: '918539842072' },
    email: { type: String, default: 'contact@professionalglasscleaning.com' },
    address: { type: String, default: 'Green Enclave, Zirakpur, Punjab 140603, India' },
    serviceArea: { type: String, default: 'Zirakpur, Mohali (SAS Nagar), Chandigarh, Tricity & nearby areas' },
    workingHours: { type: String, default: 'Monday – Sunday: 8:00 AM – 8:00 PM (Emergency 24/7 Available)' },
    showAnnouncement: { type: Boolean, default: false },
    announcementText: { type: String, default: '⚡ Special Offer: Fast Response & Reliable Glass Cleaning in Zirakpur & Mohali — Call Now!' },
    mapEmbedUrl: { type: String, default: '' },
    googleMapsUrl: { type: String, default: 'https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603' },
    googleReviewsUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessInfo', businessInfoSchema);
