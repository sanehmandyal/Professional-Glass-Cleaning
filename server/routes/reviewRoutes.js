const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {
  getPublicReviews,
  createReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Limiter for public review submissions to prevent spam
const reviewLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many reviews submitted from this IP, please try again later.' },
});

// Public routes
router.get('/', getPublicReviews);
router.post('/', reviewLimiter, createReview);

// Admin-only protected routes
router.get('/admin/all', protect, getAllReviewsAdmin);
router.put('/:id', protect, updateReviewStatus);
router.delete('/:id', protect, deleteReview);

module.exports = router;
