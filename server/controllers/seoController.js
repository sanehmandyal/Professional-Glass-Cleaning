const SEOPage = require('../models/SEOPage');

// @desc    Get SEO metadata by slug or get all
// @route   GET /api/seo / GET /api/seo/:slug
// @access  Public
exports.getSEOData = async (req, res) => {
  try {
    const { slug } = req.params;
    if (slug) {
      const seo = await SEOPage.findOne({ slug });
      if (!seo) {
        return res.json({ success: true, data: null });
      }
      return res.json({ success: true, data: seo });
    }
    const allSeo = await SEOPage.find().sort({ slug: 1 });
    res.json({ success: true, data: allSeo });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// @desc    Update or create SEO metadata for a slug
// @route   PUT /api/seo/:slug
// @access  Private (Admin)
exports.upsertSEOData = async (req, res) => {
  try {
    const { slug } = req.params;
    const update = { ...req.body, slug };
    const seo = await SEOPage.findOneAndUpdate({ slug }, update, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ success: true, data: seo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
