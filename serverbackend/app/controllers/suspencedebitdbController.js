const SuspenceDebitdb = require('../models/SuspenceDebitdb');

exports.suspencedebitdb = (req, res) => {
  const newSuspenceDebitdb= new SuspenceDebitdb({
    suspence_debit_date: req.body.suspence_debit_date,
    suspence_debit_receipt: req.body.suspence_debit_receipt,
    suspence_debit_particular: req.body.suspence_debit_particular,
    suspence_debit_amount: req.body.suspence_debit_amount
  });

  SuspenceDebitdb.createSuspenceDebitdb(newSuspenceDebitdb, (err, suspencedebitdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create suspencedebitdb' });
    }
    res.status(201).json({ message: 'suspencedebitdb created successfully', suspencedebitdb_id });
  });
};

exports.getAllSuspenceDebitdb= (req, res) => {
    SuspenceDebitdb.getAllSuspenceDebitdb((err, suspencedebitdb) => {
      if (err) {
        console.error('Error retrieving suspencedebitdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve suspencedebitdb' });
      }
  
      res.status(200).json({ suspencedebitdb });
    });
  };

  exports.updateSuspenceDebitdb = (req, res) => {
    const suspencedebitdbId = req.params.id;
    const updatedSuspenceDebitdb = req.body;

    // Remove the customer_id property from the updatedCustomer object
    delete updatedSuspenceDebitdb.suspencecreditdb_id;
  
    SuspenceDebitdb.updateSuspenceDebitdbById(suspencedebitdbId, updatedSuspenceDebitdb, (err, data) => {
      if (err) {
        console.error("Error updating suspencedebitdb:", err);
        return res.status(500).json({ error: "Failed to update suspencedebitdb" });
      }
  
      res.status(200).json({ message: "suspencedebitdb updated successfully" });
    });
  };