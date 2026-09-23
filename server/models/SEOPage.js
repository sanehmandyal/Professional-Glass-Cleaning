const mongoose = require('mongoose');

const seoPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    canonicalUrl: { type: String, trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    robots: { type: String, default: 'index, follow' },
    isIndexed: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SEOPage', seoPageSchema);
