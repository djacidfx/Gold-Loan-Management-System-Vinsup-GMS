const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const Settlement = function (settlement) {
  this.loan_id = settlement.loan_id; // Include the loan_id field
  this.additional_charge = settlement.additional_charge;
  this.adjustment_charge = settlement.adjustment_charge;
  this.date = settlement.date;
  this.interest1 = settlement.interest1;
  this.loanamount = settlement.loanamount;
  this.total_amount = settlement.total_amount;
  this.s_count500 = settlement.s_count500;
  this.s_count200 = settlement.s_count200;
  this.s_count100 = settlement.s_count100;
  this.s_count50 = settlement.s_count50;
  this.s_count20 = settlement.s_count20;
  this.s_count10 = settlement.s_count10;
  this.s_count5 = settlement.s_count5;
  this.s_count2 = settlement.s_count2;
  this.s_count1 = settlement.s_count1;
};

Settlement.createSettlement = function (newSettlement, result) {
  connection.query(
    "INSERT INTO settlement SET ?",
    newSettlement,
    (error, res) => {
      if (error) {
        console.log("Error in creating settlement: ", error);
        result(error, null);
      } else {
        console.log("settlement created successfully");
        result(null, res.insertId);
      }
    }
  );
};

Settlement.getAllSettlement = function (callback) {
  connection.query("SELECT * FROM settlement", (error, rows) => {
    if (error) {
      console.log("Error in retrieving settlement: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = Settlement;
