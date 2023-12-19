const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferSuspenceCredit = function (transfersuspencecredit) {
  this.transfersuspence_credit_amount = transfersuspencecredit.transfersuspence_credit_amount.toString();
  this.transfersuspence_credit_remark = transfersuspencecredit.transfersuspence_credit_remark.toString();
  this.	transfersuspence_credit_date = transfersuspencecredit.	transfersuspence_credit_date.toString();
};

TransferSuspenceCredit.createTransferSuspenceCredit = function (newTransferSuspenceCredit, result) {
  connection.query(
    "INSERT INTO transfersuspencecredit SET ?",
    newTransferSuspenceCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transfersuspencecredit: ", error);
        result(error, null);
      } else {
        console.log("transfersuspencecredit created successfully");
        result(null, res.insertId);
      }
    }
  );
};

TransferSuspenceCredit.getAllTransferSuspenceCredit = function (callback) {
  connection.query(
    "SELECT * FROM transfersuspencecredit ORDER BY transfersuspencecredit_receipt_id ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transfersuspencecredit: ", error);
        return callback(error, null);
      }
      callback(null, rows);
    }
  );
};

module.exports = TransferSuspenceCredit;
