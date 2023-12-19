const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../../config/config");

// Define the unlock time (in milliseconds)
const unlockTime = 60000; // 60 seconds

// Define a dictionary to store login attempts
const loginAttempts = {};

exports.login = (req, res) => {
  const phone_no = req.body.phone_no;
  const password = req.body.password;

  // Check if the user has exceeded login attempts
  if (loginAttempts[phone_no] >= 3) {
    // Check if the user is locked
    if (loginAttempts[`${phone_no}_locked`] && loginAttempts[`${phone_no}_locked`] > Date.now() - unlockTime) {
      // User is locked, return an error
      return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
    }
    // User is not locked, lock the user
    loginAttempts[`${phone_no}_locked`] = Date.now();
    return res.status(429).json({ message: `Please wait for ${unlockTime / 1000} seconds` });
  }

  User.getUserByUsername(phone_no, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Failed to retrieve user" });
    }
    
    if (!user) {
      // Increase login attempts count
      loginAttempts[phone_no] = (loginAttempts[phone_no] || 0) + 1;
      return res.status(401).json({ message: "Invalid phone_no " });
    }

    User.comparePasswords(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: "Failed to compare passwords" });
      }

      if (user && !isMatch) {
        // Increase login attempts count
        loginAttempts[phone_no] = (loginAttempts[phone_no] || 0) + 1;
        return res.status(401).json({ message: "phone_no matched but password wrong" });
      }

      // Reset login attempts and lock for the specified unlock time on unsuccessful login
      loginAttempts[phone_no] = 0;
      loginAttempts[`${phone_no}_locked`] = Date.now();

      // User authentication successful
      // Generate JWT token
      const token = jwt.sign({ phone_no: user.phone_no }, config.jwtSecret, {
        expiresIn: "1h",
      });

      // Return the token and the name
      res.status(200).json({ token, user_name:user.user_name, user_type:user.user_type});
    });
  });
};

exports.validate=(req,res)=>{
  const phone_no=req.body.phone_no;
  User.getUserByUsername(phone_no,(err,user)=>{
    if(err){
      return res.status(500).json({message:"Failed to retrieve user"});
    }
    if(!user){
      return res.status(401).json({ message: "Invalid Email" });
    }
    res.status(200).json({email:user.email,message:"User Found"});
  })
} 