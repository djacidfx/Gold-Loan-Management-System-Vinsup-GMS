const User = require("../models/User");


exports.signup = (req, res) => {
  const newUser = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    phone_no: req.body.phone_no,
    password: req.body.password,
    flat_no: req.body.flat_no,
    address: req.body.address,
    landmark: req.body.landmark,
    country: req.body.country,
    state: req.body.state,
    district: req.body.district,
    user_type: req.body.user_type,
    branch_code: req.body.branch_code,
  });


  User.createUser(newUser, (err, userId) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create user" });
    }


    res.status(201).json({ message: "User created successfully", userId });
  });
};

