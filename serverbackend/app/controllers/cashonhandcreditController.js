const CashOnHandCredit = require('../models/CashOnHandCredit');

exports.cashonhandcredit = (req, res) => {
  const newCashOnHandCredit = new CashOnHandCredit({
    cashonhand_credit_amount: req.body.cashonhand_credit_amount,
    cashonhand_credit_remark: req.body.cashonhand_credit_remark,
    cashonhand_credit_date: req.body.cashonhand_credit_date
  });

  CashOnHandCredit.createCashOnHandCredit(newCashOnHandCredit, (err, cash_on_hand_credit_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create cashonhandcredit' });
    }

    res.status(201).json({ message: 'cashonhandcredit created successfully', cash_on_hand_credit_id });
  });
};

exports.getAllCashOnHandCredit = (req, res) => {
  CashOnHandCredit.getAllCashOnHandCredit((err, cashonhandcredit) => {
      if (err) {
        console.error('Error retrieving cashonhandcredit:', err);
        return res.status(500).json({ error: 'Failed to retrieve cashonhandcredit' });
      }
  
      res.status(200).json({ cashonhandcredit });
    }); 
  };