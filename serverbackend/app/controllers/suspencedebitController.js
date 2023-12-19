const SuspenceDepit = require('../models/SuspenceDebit');

exports.suspencedebit = (req, res) => {
  const newSuspenceDepit = new SuspenceDepit({
    suspence_debit_amount: req.body.suspence_debit_amount,
    suspence_debit_remark: req.body.suspence_debit_remark,
    suspence_debit_date: req.body.suspence_debit_date
  });

  SuspenceDepit.createSuspenceDepit(newSuspenceDepit, (err, suspence_debit_recipt_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create suspencedebit' });
    }
    
    res.status(201).json({ message: 'suspencedebit created successfully', suspence_debit_recipt_id });
  });
};

exports.getAllSuspenceDepit = (req, res) => {
    SuspenceDepit.getAllSuspenceDepit((err, suspencedebit) => {
      if (err) {
        console.error('Error retrieving suspencedebit:', err);
        return res.status(500).json({ error: 'Failed to retrieve suspencedebit' });
      }
  
      res.status(200).json({ suspencedebit });
    });
  };