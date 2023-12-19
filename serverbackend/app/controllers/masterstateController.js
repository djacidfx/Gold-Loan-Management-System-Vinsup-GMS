const MasterState = require('../models/MasterState');

exports.masterstate = (req, res) => {
  const newMasterState = new MasterState({
    state_name: req.body.state_name,
  });

  MasterState.createMasterState(newMasterState, (err, state_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new state' });
    }
    res.status(201).json({ message: 'New state created successfully', state_id });
  });
};


exports.getAllMasterState = (req, res) => {
    MasterState.getAllMasterState((err, mastercity) => {
      if (err) {
        console.error('Error retrieving masterstate:', err);
        return res.status(500).json({ error: 'Failed to retrieve masterstate' });
      }
      res.status(200).json({ mastercity });
    });
  };