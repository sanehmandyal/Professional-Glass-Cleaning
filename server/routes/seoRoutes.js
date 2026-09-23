const express = require('express');
const router = express.Router();
const { getSEOData, upsertSEOData } = require('../controllers/seoController');
const { protect } = require('../middleware/auth');

router.get('/', getSEOData);
router.get('/:slug', getSEOData);
router.put('/:slug', protect, upsertSEOData);

module.exports = router;
