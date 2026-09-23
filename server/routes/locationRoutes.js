const express = require('express');
const router = express.Router();
const {
  getLocations,
  getLocationBySlug,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');
const { protect } = require('../middleware/auth');

router.route('/').get(getLocations).post(protect, createLocation);
router
  .route('/:id')
  .put(protect, updateLocation)
  .delete(protect, deleteLocation);
router.route('/slug/:slug').get(getLocationBySlug);
router.route('/:slug').get(getLocationBySlug);

module.exports = router;
