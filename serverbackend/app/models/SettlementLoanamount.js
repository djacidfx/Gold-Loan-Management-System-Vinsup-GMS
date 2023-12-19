const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const SettlementLoanamount = function (settlementloanamount) {
  this.loan_id = settlementloanamount.loan_id; // Include the loan_id field
  this.date = settlementloanamount.date.toString();
  this.loanamount = settlementloanamount.loanamount.toString();
  };

  SettlementLoanamount.createSettlementLoanamount = function (newSettlementLoanamount, result) {
  connection.query(
    "INSERT INTO settlementloanamount SET ?",
    newSettlementLoanamount,
    (error, res) => {
      if (error) {
        console.log("Error in creating settlementloanamount: ", error);
        result(error, null);
      } else {
        console.log("settlementloanamount created successfully");
        result(null, res.insertId);
      }
    }
  );
};

SettlementLoanamount.getAllSettlementLoanamount = function (callback) {
  connection.query("SELECT * FROM settlementloanamount", (error, rows) => {
    if (error) {
      console.log("Error in retrieving settlementloanamount: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = SettlementLoanamount;
