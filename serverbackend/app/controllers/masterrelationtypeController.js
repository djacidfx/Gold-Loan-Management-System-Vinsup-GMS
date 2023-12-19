const  MasterRelationship= require('../models/MasterRelationship');

exports.masterrelationship = (req, res) => {
  const newMasterRelationship = new MasterRelationship({
    relation_type: req.body.relation_type,
  });

  MasterRelationship.createMasterRelationship(newMasterRelationship, (err, relationship_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new reltionship' });
    }
    res.status(201).json({ message: 'New reltionship created successfully', relationship_id });
  });
};

exports.getAllMasterRelationship = (req, res) => {
    MasterRelationship.getAllMasterRelationship((err, masterrelationship) => {
      if (err) {
        console.error('Error retrieving masterreltionship:', err);
        return res.status(500).json({ error: 'Failed to retrieve masterrelationship' });
      }
      res.status(200).json({ masterrelationship });
    });
  };