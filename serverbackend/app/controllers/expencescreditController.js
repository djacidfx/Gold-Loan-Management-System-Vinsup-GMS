const ExpencesCredit = require('../models/ExpencesCredit');
 
exports.expencescredit = (req, res) => {
  const newExpencesCredit = new ExpencesCredit({
    expences_credit_amount: req.body.expences_credit_amount,
    expences_credit_remark: req.body.expences_credit_remark,
    expences_credit_particulars: req.body.expences_credit_particulars,
    expences_credit_date: req.body.expences_credit_date
  });
 
  ExpencesCredit.createExpencesCredit(newExpencesCredit, (err, expences_credit_receipt_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create expencescredit' });
    }
 
    res.status(201).json({ message: 'expencescredit created successfully', expences_credit_receipt_id });
  });
};
 
exports.getAllExpencesCredit = (req, res) => {
    ExpencesCredit.getAllExpencesCredit((err, expencescredit) => {
      if (err) {
        console.error('Error retrieving expencescredit:', err);
        return res.status(500).json({ error: 'Failed to retrieve expencescredit' });
      }
 
      res.status(200).json({ expencescredit });
    });
  };