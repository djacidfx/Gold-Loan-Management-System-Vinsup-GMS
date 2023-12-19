const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferJewelloanCredit = function (transferjewelloancredit) {
  this.transferjewelloan_credit_amount = transferjewelloancredit.transferjewelloan_credit_amount.toString();

  this.transferjewelloan_credit_remark = transferjewelloancredit.transferjewelloan_credit_remark.toString();

  this.transferjewelloan_credit_date = transferjewelloancredit.transferjewelloan_credit_date.toString();
};

TransferJewelloanCredit.createTransferJewelloanCredit = function (newTransferJewelloanCredit, result) {
  connection.query(
    "INSERT INTO transferjewelloancredit SET ?",
    newTransferJewelloanCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferjewelloancredit: ", error);

        result(error, null);
      } else {
        console.log("transferjewelloancredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferJewelloanCredit.getAllTransferJewelloanCredit = function (callback) {
  connection.query(
    "SELECT * FROM transferjewelloancredit ORDER BY transferjewelloan_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferjewelloancredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferJewelloanCredit;
