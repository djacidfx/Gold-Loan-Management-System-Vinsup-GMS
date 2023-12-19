const mysql = require("mysql");
const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const CashScrollDenomination = function (CashScrollDenomination) {
  this.csc_count500 = CashScrollDenomination.csc_count500;
  this.csc_count200 = CashScrollDenomination.csc_count200;
  this.csc_count100 = CashScrollDenomination.csc_count100;
  this.csc_count50 = CashScrollDenomination.csc_count50;
  this.csc_count20 = CashScrollDenomination.csc_count20;
  this.csc_count10 = CashScrollDenomination.csc_count10;
  this.csc_count5 = CashScrollDenomination.csc_count5;
  this.csc_count2 = CashScrollDenomination.csc_count2;
  this.csc_count1 = CashScrollDenomination.csc_count1;
};

CashScrollDenomination.createCashScrollDenomination = function (newCashScrollDenomination, result) {
  connection.query(
    "INSERT INTO CashScrollDenomination SET ?",
    newCashScrollDenomination,
    (error, res) => {
      if (error) {
        console.log("Error in creating CashScrollDenomination: ", error);
        result(error, null);
      } else {
        console.log("CashScrollDenomination created successfully");
        result(null, res.insertId);
      }
    }
  );
};

CashScrollDenomination.getAllCashScrollDenomination = function (callback) {
  connection.query("SELECT * FROM CashScrollDenomination", (error, rows) => {
    if (error) {
      console.log("Error in retrieving CashScrollDenomination: ", error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};

module.exports = CashScrollDenomination;
