const FurnitureDebit = require('../models/FurnitureDebit');

exports.furnituredebit = (req, res) => {
  const newFurnitureDebit = new FurnitureDebit({
    furniture_debit_amount: req.body.furniture_debit_amount,
    furniture_debit_remark: req.body.furniture_debit_remark,
    furniture_debit_date: req.body.furniture_debit_date
  });

  FurnitureDebit.createFurnitureDebit(newFurnitureDebit, (err, furniture_debit_receipt_no) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create furnituredebit' });
    }
    
    res.status(201).json({ message: 'furnituredebit created successfully', furniture_debit_receipt_no });
  });
};

exports.getAllFurnitureDebit = (req, res) => {
    FurnitureDebit.getAllFurnitureDebit((err, furnituredebit) => {
      if (err) {
        console.error('Error retrieving furnituredebit:', err);
        return res.status(500).json({ error: 'Failed to retrieve furnituredebit' });
      }
  
      res.status(200).json({ furnituredebit });
    });
  };