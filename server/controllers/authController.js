const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_jwt_secret_glass_cleaning', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const token = generateToken(admin._id);
    res.json({ success: true, token, admin });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    res.json({ success: true, admin: req.admin });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/auth/update-password
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both current and new password',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    // Verify current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password',
      });
    }

    admin.password = newPassword;
    await admin.save();

    const token = generateToken(admin._id);

    res.json({
      success: true,
      message: 'Password updated successfully! Please keep your new password safe.',
      token,
    });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/auth/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    if (email && email.toLowerCase() !== admin.email) {
      const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'An admin with this email already exists',
        });
      }
      admin.email = email.toLowerCase().trim();
    }

    if (name) {
      admin.name = name.trim();
    }

    await admin.save();

    res.json({
      success: true,
      message: 'Admin profile updated successfully',
      admin,
    });
  } catch (error) {
    next(error);
  }
};
