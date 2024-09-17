const mongoose = require('mongoose');
const MaintenanceRecords = require('../../models/Inventory/maintenance'); // Ensure this path is correct


exports.createMaintenanceRecords = async (req, res) => {
    try {
        const { reffereddate,eqname,quantity,referredlocation,receiveddate,status } = req.body;

        // Validate required fields
        if (!reffereddate || !eqname || !quantity || !referredlocation || !receiveddate || !status ) {
            return res.status(400).json({
                message: 'Please provide all required fields: reffereddate,eqname,quantity,referredlocation,receiveddate,status',
            });
        }

        // Create a new yield record
        const newRecord = new MaintenanceRecords({
            reffereddate,
            eqname,
            quantity,
            referredlocation,
            receiveddate,
            status

            // Ensure id field is either auto-generated or removed if not required
        });

        // Save the record to the database
        const savedRecord = await newRecord.save();
        return res.status(201).json(savedRecord);
    } catch (error) {
        console.error('Error creating  fertilizer record:', error);
        res.status(500).json({ message: 'Failed to create maintenance record.', error: error.message });
    }
};


// Controller for getting all Yield Records
exports.getAllMaintenanceRecords = async (req, res) => {
    try {
        const records = await MaintenanceRecords.find({});
        return res.status(200).json({
            count: records.length,
            data: records,
        });
    } catch (error) {
        console.error('Error fetching records:', error);
        res.status(500).json({ message: 'Failed to fetch records.', error: error.message });
    }
};

// Controller for getting a single Yield Record by Id
exports.getMaintenanceRecordsById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        const record = await MaintenanceRecords.findById(id);

        if (!record) {
            return res.status(404).json({ message: 'Record not found' });
        }

        return res.status(200).json(record);
    } catch (error) {
        console.error('Error fetching record by id:', error);
        res.status(500).json({ message: 'Failed to fetch record.', error: error.message });
    }
};

// Controller for updating a Yield Record by Id
exports.updateMaintenanceRecords = async (req, res) => {
    try {
        const { id } = req.params;
        const { reffereddate,eqname,quantity,referredlocation,receiveddate,status } = req.body;

        // Check for a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }

        // Ensure all required fields are present
        if (!reffereddate || !eqname || !quantity || !referredlocation || !receiveddate || !status ) {
            return res.status(400).json({
                message: 'Please provide all required fields: reffereddate,eqname,quantity,referredlocation,receiveddate,status ',
            });
        }

        // Update the record
        const result = await MaintenanceRecords.findByIdAndUpdate(
            id,
            { reffereddate,eqname,quantity,referredlocation,receiveddate,status },
            { new: true, runValidators: true }
        );

        // Handle case where record is not found
        if (!result) {
            return res.status(404).json({ message: 'Maintenance Record not found' });
        }

        // Successfully updated the record
        return res.status(200).json({ message: 'Maintenance Record updated successfully', data: result });
    } catch (error) {
        console.error('Error updating record:', error);
        res.status(500).json({ message: 'Failed to update record.', error: error.message });
    }
};

// Controller for deleting a Yield Record by Id
exports.deleteMaintenanceRecords = async (req, res) => {
    try {
      const { id } = req.params; // Ensure this is correctly obtained
      const deletedRecord = await MaintenanceRecords.findByIdAndDelete(id);
  
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
  
      return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error('Error deleting record:', error.message);
      res.status(500).json({ message: 'Failed to delete record.' });
    }
  };