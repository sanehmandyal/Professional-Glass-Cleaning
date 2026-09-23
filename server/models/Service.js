const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    problemsSolved: [{ type: String, trim: true }],
    benefits: [{ type: String, trim: true }],
    suitableFor: [{ type: String, trim: true }],
    process: [{ type: String, trim: true }],
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
    icon: { type: String, default: 'Sparkles' },
    image: { type: String, default: '' },
    beforeAfterImages: {
      before: { type: String, default: '' },
      after: { type: String, default: '' },
      label: { type: String, default: 'Before & After' },
    },
    pricingNote: { type: String, default: 'Call for instant custom quote' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
