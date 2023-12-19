const ExpencesCreditdb = require('../models/ExpencesCreditdb');
 
exports.expencescreditdb = (req, res) => {
  const newExpencesCreditdb= new ExpencesCreditdb({
    expences_credit_date: req.body.expences_credit_date,
    expences_credit_receipt: req.body.expences_credit_receipt,
    expences_credit_particular: req.body.expences_credit_particular,
    expences_credit_particular1: req.body.expences_credit_particular1,
    expences_credit_amount: req.body.expences_credit_amount
  });
 
  ExpencesCreditdb.createExpencesCreditdb(newExpencesCreditdb, (err, expencescreditdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create expencescreditdb' });
    }
    res.status(201).json({ message: 'expencescreditdb created successfully', expencescreditdb_id });
  });
};
 
exports.getAllExpencesCreditdb= (req, res) => {
    ExpencesCreditdb.getAllExpencesCreditdb((err, expencescreditdb) => {
      if (err) {
        console.error('Error retrieving expencescreditdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve expencescreditdb' });
      }
      res.status(200).json({ expencescreditdb });
    });
  };
 
  exports.updateExpencesCreditdb = (req, res) => {
    const expencescreditdbId = req.params.id;
    const updatedExpencesCreditdb = req.body;
    // Remove the customer_id property from the updatedCustomer object
    delete updatedExpencesCreditdb.expencescreditdb_id;
 
    ExpencesCreditdb.updateExpencesCreditdbById(expencescreditdbId, updatedExpencesCreditdb, (err, data) => {
      if (err) {
        console.error("Error updating expencescreditdb:", err);
        return res.status(500).json({ error: "Failed to update expencescreditdb" });
      }
      res.status(200).json({ message: "expencescreditdb updated successfully" });
    });
  };