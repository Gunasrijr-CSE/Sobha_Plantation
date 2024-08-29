const QualityControl = require("../../models/Products/qualityControlModel");

// Controller for creating a new inspection report
exports.createQualityControl = async (req, res) => {
  try {
    const { productType, inspectionDate, status, inspectorName } = req.body;

    // Basic validation
    if (
      !productType || 
      !inspectionDate || 
      !status || 
      inspectorName === undefined 
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create new inspection report
    const newInspectionReport = new QualityControl({
      productType,
      inspectionDate,
      status,
      inspectorName,
    });

    await newInspectionReport.save();
    res.status(201).json({ message: "Inspection Report added successfully" });
  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};


// Controller for getting all inspection reports
exports.getAllQualityControl = async (req, res) => {
  try {
    const reports = await QualityControl.find({});
    return res.status(200).json({
      count: reports.length,
      data: reports,
      success: true,
    });
  } catch (error) {
    console.log("Error fetching reports:", error.message);
    res.status(500).send({ success: false, message: error.message });
  }
};

// Controller for getting a single inspection report by ID
exports.getQualityControlById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await QualityControl.findById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json(report);
  } catch (error) {
    console.log("Error fetching report:", error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for updating an inspection report
exports.updateQualityControl = async (req, res) => {
  try {
    const { productType, inspectionDate, status, inspectorName } = req.body;

    if (!productType || !inspectionDate || !status || inspectorName === undefined) {
      return res.status(400).send({
        message: "Send all required fields: productType, inspectionDate, status, inspectorName",
      });
    }

    const { id } = req.params;

    const report = await QualityControl.findByIdAndUpdate(id, req.body, { new: true });

    if (!report) {
      return res.status(404).json({ message: "Inspection report not found" });
    }

    return res.status(200).send({ message: "Inspection Report updated successfully", report });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Controller for deleting an inspection report
exports.deleteQualityControl = async (req, res) => {
  try {
    const { id } = req.params;

    const report = await QualityControl.findByIdAndDelete(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).send({ message: "Inspection Report deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};