const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const SettlementAdditionalAmount = function (settlementadditionalamount) {
  this.loan_id = settlementadditionalamount.loan_id; // Include the loan_id field
  this.additional_charge = settlementadditionalamount.additional_charge.toString();
  this.date = settlementadditionalamount.date.toString();
};

SettlementAdditionalAmount.createSettlementAdditionalAmount = function (newSettlementAdditionalAmount, result) {
  connection.query(
    "INSERT INTO settlementadditionalamount SET ?",
    newSettlementAdditionalAmount,
    (error, res) => {
      if (error) {
        console.log("Error in creating settlementadditionalamount: ", error);
        result(error, null);
      } else {
        console.log("settlementadditionalamount created successfully");
        result(null, res.insertId);
      }
    }
  );
};

SettlementAdditionalAmount.getAllSettlementAdditionalAmount = function (callback) {
  connection.query("SELECT * FROM settlementadditionalamount", (error, rows) => {
    if (error) {
      console.log("Error in retrieving settlementadditionalamount: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = SettlementAdditionalAmount;
