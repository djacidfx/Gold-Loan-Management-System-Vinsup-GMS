const mysql = require("mysql");
const bcrypt = require("bcrypt");
const config = require("../../config/config");


const connection = mysql.createConnection(config.database);


const User = function (user) {
  this.user_name = user.user_name;
  this.email = user.email;
  this.phone_no = user.phone_no;
  this.password = user.password;
  this.flat_no = user.flat_no;
  this.address = user.address;
  this.landmark = user.landmark;
  this.country = user.country;
  this.state = user.state;
  this.district = user.district;
  this.user_type = user.user_type;
  this.branch_code = user.branch_code;
};


User.createUser = function (newUser, result) {
  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      throw err;
    }
    newUser.password = hash;
    Object.keys(newUser).forEach((key) => {
      if (newUser[key] === "") {
        newUser[key] = "none";
      }
    });
    connection.query("INSERT INTO users SET ?", newUser, (error, res) => {
      if (error) {
        console.log("Error in creating user: ", error);
        result(error, null);
      } else {
        console.log("User created successfully");
        result(null, res.insertId);
      }
    });
  });
};


User.getUserByUsername = function (phone_no, result) {
  connection.query(
    "SELECT * FROM users WHERE phone_no = ?",
    phone_no,
    (error, res) => {
      if (error) {
        console.log("Error in retrieving user: ", error);
        result(error, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};


User.comparePasswords = function (password, hash, result) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) {
      throw err;
    }


    result(null, isMatch);
  });
};


module.exports = User;



