const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferSuspenceDebit = function (transfersuspencedebit) {
  this.transfersuspence_debit_amount = transfersuspencedebit.transfersuspence_debit_amount.toString();
  this.transfersuspence_debit_remark = transfersuspencedebit.transfersuspence_debit_remark.toString();
  this.transfersuspence_debit_date = transfersuspencedebit.transfersuspence_debit_date.toString();
};

TransferSuspenceDebit.createTransferSuspenceDebit = function (newTransferSuspenceDebit, result) {
  connection.query(
    "INSERT INTO transfersuspencedebit SET ?",
    newTransferSuspenceDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transfersuspencedebit: ", error);
        result(error, null);
      } else {
        console.log("transfersuspencedebit created successfully");
        result(null, res.insertId);
      }
    }
  );
};

TransferSuspenceDebit.getAllTransferSuspenceDebit = function (callback) {
  connection.query(
    "SELECT * FROM transfersuspencedebit ORDER BY transfersuspencedebit_receipt_id ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transfersuspencedebit: ", error);
        return callback(error, null);
      }
      callback(null, rows);
    }
  );
};

module.exports = TransferSuspenceDebit;
