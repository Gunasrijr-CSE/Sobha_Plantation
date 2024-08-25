const SalesAnalytics = require('../../models/SalesAndFinance/SalesAnalyticsModel');

// Create a new sales analytics record
exports.createSalesAnalytics = async (req, res, next) => {
  try {
    const newSalesAnalytics = await SalesAnalytics.create(req.body);
    res.status(201).json({ success: true, data: newSalesAnalytics });
  } catch (error) {
    next(error);
  }
};

// Get all sales analytics records
exports.getAllSalesAnalytics = async (req, res, next) => {
  try {
    const salesAnalyticsRecords = await SalesAnalytics.find().populate('sale');
    res.status(200).json({ success: true, data: salesAnalyticsRecords });
  } catch (error) {
    next(error);
  }
};

// Get a sales analytics record by ID
exports.getSalesAnalyticsById = async (req, res, next) => {
  try {
    const salesAnalytics = await SalesAnalytics.findById(req.params.id).populate('sale');
    if (!salesAnalytics) {
      return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
    }
    res.status(200).json({ success: true, data: salesAnalytics });
  } catch (error) {
    next(error);
  }
};

// Update a sales analytics record
exports.updateSalesAnalytics = async (req, res, next) => {
  try {
    const updatedSalesAnalytics = await SalesAnalytics.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('sale');
    if (!updatedSalesAnalytics) {
      return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
    }
    res.status(200).json({ success: true, data: updatedSalesAnalytics });
  } catch (error) {
    next(error);
  }
};

// Delete a sales analytics record
exports.deleteSalesAnalytics = async (req, res, next) => {
  try {
    const deletedSalesAnalytics = await SalesAnalytics.findByIdAndDelete(req.params.id);
    if (!deletedSalesAnalytics) {
      return res.status(404).json({ success: false, message: 'Sales analytics record not found' });
    }
    res.status(200).json({ success: true, message: 'Sales analytics record deleted successfully' });
  } catch (error) {
    next(error);
  }
};