const FurnitureCredit = require('../models/FurnitureCredit');

exports.furniturecredit = (req, res) => {
  const newFurnitureCredit = new FurnitureCredit({
    furniture_credit_amount: req.body.furniture_credit_amount,
    furniture_credit_remark: req.body.furniture_credit_remark,
    furniture_credit_date: req.body.furniture_credit_date
  });

  FurnitureCredit.createFurnitureCredit(newFurnitureCredit, (err, furniture_credit_receipt_no) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create furniturecredit' });
    }
    
    res.status(201).json({ message: 'furniturecredit created successfully', furniture_credit_receipt_no });
  });
};

exports.getAllFurnitureCredit = (req, res) => {
    FurnitureCredit.getAllFurnitureCredit((err, furniturecredit) => {
      if (err) {
        console.error('Error retrieving furniturecredit:', err);
        return res.status(500).json({ error: 'Failed to retrieve furniturecredit' });
      }
  
      res.status(200).json({ furniturecredit });
    });
  };