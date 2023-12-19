const MasterPurity = require('../models/MasterPurity');

exports.masterpurity = (req, res) => {
  const newMasterPurity = new MasterPurity({
    master_purity: req.body.master_purity,
  });

  MasterPurity.createMasterPurity(newMasterPurity, (err, masterpurity_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new masterpurity' });
    }
    res.status(201).json({ message: 'New masterpurity created successfully', masterpurity_id });
  });
};

exports.getAllMasterPurity = (req, res) => {
    MasterPurity.getAllMasterPurity((err, masterpurity) => {
      if (err) {
        console.error('Error retrieving masterpurity:', err);
        return res.status(500).json({ error: 'Failed to retrieve masterpurity' });
      }
      res.status(200).json({ masterpurity });
    });
  };