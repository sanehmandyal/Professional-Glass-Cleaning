const express = require('express');
const { getGallery, addGalleryItem, deleteGalleryItem } = require('../controllers/galleryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, addGalleryItem);
router.delete('/:id', protect, deleteGalleryItem);

module.exports = router;
