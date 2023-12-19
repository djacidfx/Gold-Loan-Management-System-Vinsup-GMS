const MasterJewelType = require('../models/MasterJewelType');

exports.masterjeweltype = (req, res) => {
  const newMasterJewelType = new MasterJewelType({
    jeweltype_name: req.body.jeweltype_name,
  });

  MasterJewelType.createMasterJewelType(newMasterJewelType, (err, jeweltype_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new masterjeweltype' });
    }
    res.status(201).json({ message: 'New masterjeweltype created successfully', jeweltype_id });
  });
};

exports.getAllMasterJewelType = (req, res) => {
    MasterJewelType.getAllMasterJewelType((err, masterjeweltype) => {
      if (err) {
        console.error('Error retrieving masterjeweltype:', err);
        return res.status(500).json({ error: 'Failed to retrieve masterjeweltype' });
      }
      res.status(200).json({ masterjeweltype });
    });
  };