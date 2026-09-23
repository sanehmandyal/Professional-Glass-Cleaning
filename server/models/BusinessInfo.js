const mongoose = require('mongoose');

// Singleton document holding editable business/contact info
const businessInfoSchema = new mongoose.Schema(
  {
    businessName: { type: String, default: 'Professional Glass Cleaning Service' },
    phone: { type: String, default: '8539842072' },
    whatsapp: { type: String, default: '918539842072' },
    address: { type: String, default: 'Green Enclave, Zirakpur, Punjab 140603, India' },
    serviceArea: { type: String, default: 'Zirakpur, Mohali, Chandigarh and nearby areas' },
    mapEmbedUrl: { type: String, default: '' },
    googleMapsUrl: { type: String, default: '' },
    googleReviewsUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('BusinessInfo', businessInfoSchema);
