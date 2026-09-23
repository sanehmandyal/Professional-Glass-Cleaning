const express = require('express');
const { body } = require('express-validator');
const { login, getMe, updatePassword, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');

const router = express.Router();

router.post(
  '/login',
  [body('email').isEmail().withMessage('Valid email required'), body('password').notEmpty()],
  validate,
  login
);

router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);
router.put('/profile', protect, updateProfile);

module.exports = router;
