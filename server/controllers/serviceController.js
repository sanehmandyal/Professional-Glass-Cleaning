const Service = require('../models/Service');
const { services: defaultServices } = require('../utils/seedData');

// @route GET /api/services (public)
exports.getServices = async (req, res, next) => {
  try {
    let services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    
    // If fewer than 14 services exist, auto-insert missing default services so the catalog is always complete
    if (services.length < defaultServices.length) {
      for (const def of defaultServices) {
        if (!services.some((s) => s.slug === def.slug)) {
          await Service.findOneAndUpdate({ slug: def.slug }, { $setOnInsert: def }, { upsert: true });
        }
      }
      services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    }

    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/services/:slug (public)
exports.getServiceBySlug = async (req, res, next) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isActive: true });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/services/admin/all (admin - includes inactive)
exports.getAllServicesAdmin = async (req, res, next) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/services (admin)
exports.createService = async (req, res, next) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @route PUT /api/services/:id (admin)
exports.updateService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
};

// @route DELETE /api/services/:id (admin)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    res.json({ success: true, message: 'Service deleted' });
  } catch (error) {
    next(error);
  }
};
