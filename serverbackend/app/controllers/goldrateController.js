const GoldRate = require('../models/GoldRate');

exports.goldrateupdate = (req, res) => {
  const newGoldRate = new GoldRate({
    date: req.body.date,
    timing: req.body.timing,
    carat_22: req.body.carat_22,
    carat_24: req.body.carat_24
  });

  GoldRate.createGoldRate(newGoldRate, (err, goldrate_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create goldrate' });
    }

    res.status(201).json({ message: 'goldrate created successfully', goldrate_id });
  });
};


exports.getAllGoldRate = (req, res) => {
    GoldRate.getAllGoldRate((err, goldrates) => {
      if (err) {
        console.error('Error retrieving goldrate:', err);
        return res.status(500).json({ error: 'Failed to retrieve goldrate' });
      }
  
      res.status(200).json({ goldrates });
    });
  };