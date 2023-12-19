const MasterCity = require('../models/MasterCity');

exports.mastercity = (req, res) => {
  const newMasterCity = new MasterCity({
    city_name: req.body.city_name,
    pincode: req.body.pincode,
  });

  MasterCity.createMasterCity(newMasterCity, (err, city_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new city' });
    }

    res.status(201).json({ message: 'New city created successfully', city_id });
  });
};


exports.getAllMasterCity = (req, res) => {
    MasterCity.getAllMasterCity((err, mastercity) => {
      if (err) {
        console.error('Error retrieving mastercity:', err);
        return res.status(500).json({ error: 'Failed to retrieve mastercity' });
      }
  
      res.status(200).json({ mastercity });
    });
  };