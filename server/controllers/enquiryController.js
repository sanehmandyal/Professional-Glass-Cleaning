const Enquiry = require('../models/Enquiry');

// @route POST /api/enquiries (public)
exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, service, location, preferredDate, message } = req.body;
    const enquiry = await Enquiry.create({ name, phone, service, location, preferredDate, message });
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/enquiries (admin)
exports.getEnquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/enquiries/:id (admin)
exports.getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @route PATCH /api/enquiries/:id (admin)
exports.updateEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/enquiries/:id (admin)
exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found' });
    res.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/enquiries/stats/summary (admin)
exports.getEnquiryStats = async (req, res, next) => {
  try {
    const total = await Enquiry.countDocuments();
    const pending = await Enquiry.countDocuments({ status: 'Pending' });
    const completed = await Enquiry.countDocuments({ status: 'Completed' });
    res.json({ success: true, data: { total, pending, completed } });
  } catch (error) {
    next(error);
  }
};
