const ExpencesDebitdb = require('../models/ExpencesDebitdb');
 
exports.expencesdebitdb = (req, res) => {
  const newExpencesDebitdb= new ExpencesDebitdb({
    expences_debit_date: req.body.expences_debit_date,
    expences_debit_receipt: req.body.expences_debit_receipt,
    expences_debit_particular: req.body.expences_debit_particular,
    expences_debit_amount: req.body.expences_debit_amount
  });
 
  ExpencesDebitdb.createExpencesDebitdb(newExpencesDebitdb, (err, expencesdebitdb_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create expencesdebitdb' });
    }
    res.status(201).json({ message: 'expencesdebitdb created successfully', expencesdebitdb_id });
  });
};
 
exports.getAllExpencesDebitdb= (req, res) => {
    ExpencesDebitdb.getAllExpencesDebitdb((err, expencesdebitdb) => {
      if (err) {
        console.error('Error retrieving expencesdebitdb:', err);
        return res.status(500).json({ error: 'Failed to retrieve expencesdebitdb' });
      }
      res.status(200).json({ expencesdebitdb });
    });
  };
 
  exports.updateExpencesDebitdb = (req, res) => {
    const expencesdebitdbId = req.params.id;
    const updatedExpencesDebitdb = req.body;
    // Remove the customer_id property from the updatedCustomer object
    delete updatedExpencesDebitdb.expencesdebitdb_id;
 
    ExpencesDebitdb.updateExpencesDebitdbById(expencesdebitdbId, updatedExpencesDebitdb, (err, data) => {
      if (err) {
        console.error("Error updating expencesdebitdb:", err);
        return res.status(500).json({ error: "Failed to update expencesdebitdb" });
      }
      res.status(200).json({ message: "expencesdebitdb updated successfully" });
    });
  };