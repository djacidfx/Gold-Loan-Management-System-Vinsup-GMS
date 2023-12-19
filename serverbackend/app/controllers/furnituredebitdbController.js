const FurnitureDebitdb = require('../models/FurnitureDebitdb');

exports.furnituredebitdb = (req, res) => {
  const newFurnitureDebitdb = new FurnitureDebitdb({
    furniture_debit_date: req.body.furniture_debit_date,
    furniture_debit_receipt: req.body.furniture_debit_receipt,
    furniture_debit_particular: req.body.furniture_debit_particular,
    furniture_debit_amount: req.body.furniture_debit_amount
  });

  FurnitureDebitdb.createFurnitureDebitdb(newFurnitureDebitdb, (err, furnituredebitdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create furnituredebitdb' });
    }
    res.status(201).json({ message: 'furnituredebitdb created successfully', furnituredebitdb_id });
  });
};

exports.getAllFurnitureDebitdb = (req, res) => {
    FurnitureDebitdb.getAllFurnitureDebitdb((err, furnituredebitdb) => {
      if (err) {
        console.error('Error retrieving furnituredebitdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve furnituredebitdb' });
      }
  
      res.status(200).json({ furnituredebitdb });
    });
  };

  exports.updateFurnitureDebitdb = (req, res) => {
    const furnituredebitdbId = req.params.id;
    const updatedFurnitureDebitdb = req.body;

    // Remove the customer_id property from the updatedCustomer object
    delete updatedFurnitureDebitdb.furnituredebitdb_id;
  
    FurnitureDebitdb.updateFurnitureDebitdbById(furnituredebitdbId, updatedFurnitureDebitdb, (err, data) => {
      if (err) {
        console.error("Error updating furnituredebitdb:", err);
        return res.status(500).json({ error: "Failed to update furnituredebitdb" });
      }
  
      res.status(200).json({ message: "furnituredebitdb updated successfully" });
    });
};