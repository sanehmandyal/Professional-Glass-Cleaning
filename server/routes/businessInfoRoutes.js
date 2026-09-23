const express = require('express');
const { getBusinessInfo, updateBusinessInfo } = require('../controllers/businessInfoController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', getBusinessInfo);
router.put('/', protect, updateBusinessInfo);

module.exports = router;
