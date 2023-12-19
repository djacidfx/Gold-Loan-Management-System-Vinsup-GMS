const CashOnHandDebit = require('../models/CashOnHandDebit');

exports.cashonhandcredit = (req, res) => {
  const newCashOnHandDebit = new CashOnHandDebit({
    cashonhand_debit_amount: req.body.cashonhand_debit_amount,
    cashonhand_debit_remark: req.body.cashonhand_debit_remark,
    cashonhand_debit_date: req.body.cashonhand_debit_date
  });

  CashOnHandDebit.createCashOnHandDebit(newCashOnHandDebit, (err, cash_on_hand_debit_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create cashonhanddebit' });
    }

    res.status(201).json({ message: 'cashonhanddebit created successfully', cash_on_hand_debit_id });
  });
};

exports.getAllCashOnHandDebit = (req, res) => {
    CashOnHandDebit.getAllCashOnHandDebit((err, cashonhanddebit) => {
      if (err) {
        console.error('Error retrieving cashonhanddebit:', err);
        return res.status(500).json({ error: 'Failed to retrieve cashonhanddebit' });
      }
  
      res.status(200).json({ cashonhanddebit });
    }); 
  };