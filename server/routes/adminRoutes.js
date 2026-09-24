const express = require('express');
const { protect } = require('../middleware/auth');
const { forceSeedAll, autoSeedIfEmpty } = require('../utils/seedData');
const Service = require('../models/Service');
const Location = require('../models/Location');
const Faq = require('../models/Faq');
const Gallery = require('../models/Gallery');
const SEOPage = require('../models/SEOPage');
const Review = require('../models/Review');
const Enquiry = require('../models/Enquiry');
const BusinessInfo = require('../models/BusinessInfo');

const router = express.Router();

// @route   GET /api/admin/system-status
// @desc    Get counts of all database collections
// @access  Private (Admin)
router.get('/system-status', protect, async (req, res) => {
  try {
    const [services, locations, faqs, gallery, seo, reviews, enquiries, businessInfo] = await Promise.all([
      Service.countDocuments(),
      Location.countDocuments(),
      Faq.countDocuments(),
      Gallery.countDocuments(),
      SEOPage.countDocuments(),
      Review.countDocuments(),
      Enquiry.countDocuments(),
      BusinessInfo.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      counts: {
        services,
        locations,
        faqs,
        gallery,
        seo,
        reviews,
        enquiries,
        businessInfo,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// @route   POST /api/admin/seed-all
// @desc    Force re-seed all collections with standard default data
// @access  Private (Admin)
router.post('/seed-all', protect, async (req, res) => {
  try {
    const result = await forceSeedAll();
    res.status(200).json({
      success: true,
      message: 'All collections successfully seeded and synchronized with database!',
      seededCounts: result,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
