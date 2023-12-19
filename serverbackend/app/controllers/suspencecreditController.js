const SuspenceCredit = require('../models/SuspenceCredit');

exports.suspencecredit = (req, res) => {
  const newSuspenceCredit = new SuspenceCredit({
    suspence_credit_amount: req.body.suspence_credit_amount,
    suspence_credit_remark: req.body.suspence_credit_remark,
    suspence_credit_date: req.body.suspence_credit_date
  });

  SuspenceCredit.createSuspenceCredit(newSuspenceCredit, (err, suspence_credit_recipt_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create suspencecredit' });
    }
    
    res.status(201).json({ message: 'suspencecredit created successfully', suspence_credit_recipt_id });
  });
};

exports.getAllSuspenceCredit = (req, res) => {
    SuspenceCredit.getAllSuspenceCredit((err, suspencecredit) => {
      if (err) {
        console.error('Error retrieving suspencecredit:', err);
        return res.status(500).json({ error: 'Failed to retrieve suspencecredit' });
      }
  
      res.status(200).json({ suspencecredit });
    });
  };