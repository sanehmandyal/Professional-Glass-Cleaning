const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, required: true },
    category: {
      type: String,
      enum: [
        'Glass Cleaning',
        'Glass Repair',
        'Silicone Work',
        'Silicone Repair',
        'Water Tank Cleaning',
        'Commercial Cleaning',
        'Residential Cleaning',
      ],
      required: true,
    },
    imageUrl: { type: String, required: true },
    beforeImageUrl: { type: String, default: '' },
    afterImageUrl: { type: String, default: '' },
    alt: { type: String, default: '' },
    isDemo: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
