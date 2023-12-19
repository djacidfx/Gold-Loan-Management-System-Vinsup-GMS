const mysql = require("mysql");
 
const config = require("../../config/config");
 
const connection = mysql.createConnection(config.database);
 
const TransferExpencesDebit = function (transferexpencesdebit) {
  this.transferexpences_debit_amount = transferexpencesdebit.transferexpences_debit_amount.toString();
  this.transferexpences_debit_remark = transferexpencesdebit.transferexpences_debit_remark.toString();
  this.transferexpences_debit_date = transferexpencesdebit.transferexpences_debit_date.toString();
  this.transferexpences_debit_particular = transferexpencesdebit.transferexpences_debit_particular.toString();
};
 
TransferExpencesDebit.createTransferExpencesDebit = function (newTransferExpencesDebit, result) {
  connection.query(
    "INSERT INTO transferexpencesdebit SET ?",
    newTransferExpencesDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferexpencesdebit: ", error);
 
        result(error, null);
      } else {
        console.log("transferexpencesdebit created successfully");
 
        result(null, res.insertId);
      }
    }
  );
};
 
TransferExpencesDebit.getAllTransferExpencesDebit = function (callback) {
  connection.query(
    "SELECT * FROM transferexpencesdebit ORDER BY transferexpences_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferexpencesdebit: ", error);
 
        return callback(error, null);
      }
 
      callback(null, rows);
    }
  );
};
 
module.exports = TransferExpencesDebit;
 