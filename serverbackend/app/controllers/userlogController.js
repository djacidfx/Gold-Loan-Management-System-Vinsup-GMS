const UserLog = require('../models/UserLog');
const IP = require('ip');

exports.userlog = (req, res) => {
  const ipAddress = IP.address();
  const newUserLog = new UserLog({
    name: req.body.name,
    loginTime: req.body.loginTime,
    ip_address:ipAddress,
  });
  
  UserLog.createUserLog(newUserLog, (err, log_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create new userlog' });
    }
    res.status(201).json({ message: 'New userlog created successfully', log_id });
  });
};


exports.getAllUserLog = (req, res) => {
    UserLog.getAllUserLog((err, userlog) => {
      if (err) {
        console.error('Error retrieving userlog:', err);
        return res.status(500).json({ error: 'Failed to retrieve userlog' });
      }
      res.status(200).json({ userlog });
    });
  };

  exports.updateUserLog = (req, res) => {
    const userlogId = req.params.id;
    const updatedUserLog = req.body;

    // Remove the customer_id property from the updatedCustomer object
    delete updatedUserLog.log_id;
  
    UserLog.updateUserLogById(userlogId, updatedUserLog, (err, data) => {
      if (err) {
        console.error("Error updating userlog:", err);
        return res.status(500).json({ error: "Failed to update userlog" });
      }
  
      res.status(200).json({ message: "userlog updated successfully" });
    });
  };