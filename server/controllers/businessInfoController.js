const BusinessInfo = require('../models/BusinessInfo');

// Ensures a single BusinessInfo document exists and returns it
const getOrCreate = async () => {
  let info = await BusinessInfo.findOne();
  if (!info) info = await BusinessInfo.create({});
  return info;
};

exports.getBusinessInfo = async (req, res, next) => {
  try {
    const info = await getOrCreate();
    res.json({ success: true, data: info });
  } catch (error) {
    next(error);
  }
};

exports.updateBusinessInfo = async (req, res, next) => {
  try {
    const info = await getOrCreate();
    Object.assign(info, req.body);
    await info.save();
    res.json({ success: true, data: info });
  } catch (error) {
    next(error);
  }
};
