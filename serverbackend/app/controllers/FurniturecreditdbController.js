const FurnitureCreditdb = require('../models/FurnitureCreditdb');

exports.furniturecreditdb = (req, res) => {
  const newFurnitureCreditdb= new FurnitureCreditdb({
    furniture_credit_date: req.body.furniture_credit_date,
    furniture_credit_receipt: req.body.furniture_credit_receipt,
    furniture_credit_particular: req.body.furniture_credit_particular,
    furniture_credit_amount: req.body.furniture_credit_amount
  });

  FurnitureCreditdb.createFurnitureCreditdb(newFurnitureCreditdb, (err, furniturecreditdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create furniturecreditdb' });
    }
    res.status(201).json({ message: 'furniturecreditdb created successfully', furniturecreditdb_id });
  });
};

exports.getAllFurnitureCreditdb= (req, res) => {
    FurnitureCreditdb.getAllFurnitureCreditdb((err, furniturecreditdb) => {
      if (err) {
        console.error('Error retrieving furniturecreditdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve furniturecreditdb' });
      }
      res.status(200).json({ furniturecreditdb });
    });
  };

  exports.updateFurnitureCreditdb = (req, res) => {
    const furniturecreditdbId = req.params.id;
    const updatedFurnitureCreditdb = req.body;
    // Remove the customer_id property from the updatedCustomer object
    delete updatedFurnitureCreditdb.furniturecreditdb_id;
  
    FurnitureCreditdb.updateFurnitureCreditdbById(furniturecreditdbId, updatedFurnitureCreditdb, (err, data) => {
      if (err) {
        console.error("Error updating furniturecreditdb:", err);
        return res.status(500).json({ error: "Failed to update furniturecreditdb" });
      }
      res.status(200).json({ message: "furniturecreditdb updated successfully" });
    });
  };