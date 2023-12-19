const ExpencesDebit = require('../models/ExpencesDebit');
 
exports.expencesdebit = (req, res) => {
  const newExpencesDebit = new ExpencesDebit({
    expences_debit_amount: req.body.expences_debit_amount,
    expences_debit_remark: req.body.expences_debit_remark,
    expences_debit_particulars: req.body.expences_debit_particulars,
    expences_debit_date: req.body.expences_debit_date
  });
 
  ExpencesDebit.createExpencesDebit(newExpencesDebit, (err, expences_debit_receipt_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create expencesdebit' });
    }
 
    res.status(201).json({ message: 'expencesdebit created successfully', expences_debit_receipt_id });
  });
};
 
exports.getAllExpencesDebit = (req, res) => {
    ExpencesDebit.getAllExpencesDebit((err, expencesdebit) => {
      if (err) {
        console.error('Error retrieving expencesdebit:', err);
        return res.status(500).json({ error: 'Failed to retrieve expencesdebit' });
      }
 
      res.status(200).json({ expencesdebit });
    });
  };