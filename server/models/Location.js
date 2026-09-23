const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    type: {
      type: String,
      enum: ['Primary Base', 'Primary Hub', 'Service Area', 'Coverage Region'],
      default: 'Service Area',
    },
    tagline: { type: String, trim: true },
    h1: { type: String, trim: true },
    heroSubtitle: { type: String, trim: true },
    description: { type: String, required: true },
    coverageAreas: [{ type: String, trim: true }],
    servicesOffered: [{ type: String, trim: true }],
    keyHighlights: [{ type: String, trim: true }],
    localFaqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    mapQuery: { type: String, default: '' },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Location', locationSchema);
