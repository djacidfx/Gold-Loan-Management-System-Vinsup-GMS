const SuspenceCreditdb = require('../models/SuspenceCreditdb');

exports.suspencecreditdb = (req, res) => {
  const newSuspenceCreditdb= new SuspenceCreditdb({
    suspence_credit_date: req.body.suspence_credit_date,
    suspence_credit_receipt: req.body.suspence_credit_receipt,
    suspence_credit_particular: req.body.suspence_credit_particular,
    suspence_credit_amount: req.body.suspence_credit_amount
  });

  SuspenceCreditdb.createSuspenceCreditdb(newSuspenceCreditdb, (err, suspencecreditdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create suspencecreditdb' });
    }
    res.status(201).json({ message: 'suspencecreditdb created successfully', suspencecreditdb_id });
  });
};

exports.getAllSuspenceCreditdb = (req, res) => {
    SuspenceCreditdb.getAllSuspenceCreditdb((err, suspencecreditdb) => {
      if (err) {
        console.error('Error retrieving suspencecreditdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve suspencecreditdb' });
      }
  
      res.status(200).json({ suspencecreditdb });
    });
  };

  exports.updateSuspenceCreditdb = (req, res) => {
    const suspencecreditdbId = req.params.id;
    const updatedSuspenceCreditdb = req.body;

    // Remove the customer_id property from the updatedCustomer object
    delete updatedSuspenceCreditdb.suspencecreditdb_id;
  
    SuspenceCreditdb.updateSuspenceCreditdbById(suspencecreditdbId, updatedSuspenceCreditdb, (err, data) => {
      if (err) {
        console.error("Error updating suspencecreditdb:", err);
        return res.status(500).json({ error: "Failed to update suspencecreditdb" });
      }
  
      res.status(200).json({ message: "suspencecreditdb updated successfully" });
    });
  };