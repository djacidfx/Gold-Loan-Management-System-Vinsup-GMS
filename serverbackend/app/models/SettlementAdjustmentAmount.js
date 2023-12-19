const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const SettlementAdjustmentAmount = function (settlementadjustmentamount) {
  this.loan_id = settlementadjustmentamount.loan_id; // Include the loan_id field
  this.adjustment_charge = settlementadjustmentamount.adjustment_charge.toString();
  this.date = settlementadjustmentamount.date.toString();
};

SettlementAdjustmentAmount.createSettlementAdjustmentAmount = function (newSettlementAdjustmentAmount, result) {
  connection.query(
    "INSERT INTO settlementadjustmentamount SET ?",
    newSettlementAdjustmentAmount,
    (error, res) => {
      if (error) {
        console.log("Error in creating settlementadjustmentamount: ", error);
        result(error, null);
      } else {
        console.log("settlementadjustmentamount created successfully");
        result(null, res.insertId);
      }
    }
  );
};

SettlementAdjustmentAmount.getAllSettlementAdjustmentAmount = function (callback) {
  connection.query("SELECT * FROM settlementadjustmentamount", (error, rows) => {
    if (error) {
      console.log("Error in retrieving settlementadjustmentamount: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = SettlementAdjustmentAmount;
