const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const SettlementInterest = function (settlementinterest) {
  this.loan_id = settlementinterest.loan_id; // Include the loan_id field
  this.date = settlementinterest.date.toString();
  this.interest1 = settlementinterest.interest1.toString();
  };

  SettlementInterest.createSettlementInterest = function (newSettlementInterest, result) {
  connection.query(
    "INSERT INTO settlementinterest SET ?",
    newSettlementInterest,
    (error, res) => {
      if (error) {
        console.log("Error in creating settlementinterest: ", error);
        result(error, null);
      } else {
        console.log("settlementinterest created successfully");
        result(null, res.insertId);
      }
    }
  );
};

SettlementInterest.getAllSettlementInterest = function (callback) {
  connection.query("SELECT * FROM settlementinterest", (error, rows) => {
    if (error) {
      console.log("Error in retrieving settlementinterest: ", error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};

module.exports = SettlementInterest;
