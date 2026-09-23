const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    preferredDate: { type: Date },
    message: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ['Pending', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', enquirySchema);
