const Review = require('../models/Review');

// @desc    Get all approved public reviews
// @route   GET /api/reviews
// @access  Public
const getPublicReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });
    
    // Calculate aggregate summary
    const totalReviews = reviews.length;
    const avgRating =
      totalReviews > 0
        ? (reviews.reduce((acc, item) => acc + item.rating, 0) / totalReviews).toFixed(1)
        : 5.0;

    res.json({
      success: true,
      count: totalReviews,
      averageRating: Number(avgRating),
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a new customer review (pending admin approval)
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res, next) => {
  try {
    const { name, rating, service, location, comment } = req.body;

    if (!name || !rating || !service || !location || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, rating, service, location, and review comment.',
      });
    }

    const review = await Review.create({
      name,
      rating: Number(rating),
      service,
      location,
      comment,
      isApproved: false, // Must be verified by admin before appearing publicly
      isFeatured: false,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It has been submitted and will appear once verified by our team.',
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews for Admin (approved & pending)
// @route   GET /api/reviews/admin/all
// @access  Private (Admin only)
const getAllReviewsAdmin = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review status (Approve/Reject/Feature/Reply)
// @route   PUT /api/reviews/:id
// @access  Private (Admin only)
const updateReviewStatus = async (req, res, next) => {
  try {
    const { isApproved, isFeatured, adminReply } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (typeof isApproved === 'boolean') review.isApproved = isApproved;
    if (typeof isFeatured === 'boolean') review.isFeatured = isFeatured;
    if (typeof adminReply === 'string') review.adminReply = adminReply;

    const updatedReview = await review.save();

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: updatedReview,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin only)
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    await review.deleteOne();
    res.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPublicReviews,
  createReview,
  getAllReviewsAdmin,
  updateReviewStatus,
  deleteReview,
};
