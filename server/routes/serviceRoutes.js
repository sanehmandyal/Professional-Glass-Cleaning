const express = require('express');
const {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');
const { forceSeedAll, services: defaultServices } = require('../utils/seedData');
const Service = require('../models/Service');

const router = express.Router();

router.get('/', getServices);
router.get('/admin/all', protect, getAllServicesAdmin);

// Seed / Sync endpoints
router.post('/seed', protect, async (req, res) => {
  try {
    for (const svc of defaultServices) {
      await Service.findOneAndUpdate({ slug: svc.slug }, { $setOnInsert: svc }, { upsert: true });
    }
    const count = await Service.countDocuments();
    res.json({ success: true, message: `All ${count} services synchronized!`, count });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/seed-all', protect, async (req, res) => {
  try {
    const result = await forceSeedAll();
    res.json({ success: true, message: 'All collections successfully seeded and synchronized!', seededCounts: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:slug', getServiceBySlug);
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;
