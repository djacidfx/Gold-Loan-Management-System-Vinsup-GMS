const MasterLoanScheme = require('../models/MasterLoanScheme');

exports.masterloanscheme = (req, res) => {
  const newMasterLoanScheme = new MasterLoanScheme({
    masterloan_scheme: req.body.masterloan_scheme,
  });

  MasterLoanScheme.createMasterLoanScheme(newMasterLoanScheme, (err, masterloanscheme_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new masterloanscheme' });
    }
    res.status(201).json({ message: 'New masterloanscheme created successfully', masterloanscheme_id });
  });
};

exports.getAllMasterLoanScheme = (req, res) => {
    MasterLoanScheme.getAllMasterLoanScheme((err, masterloanscheme) => {
      if (err) {
        console.error('Error retrieving masterloanscheme:', err);
        return res.status(500).json({ error: 'Failed to retrieve masterloanscheme' });
      }
      res.status(200).json({ masterloanscheme });
    });
  };