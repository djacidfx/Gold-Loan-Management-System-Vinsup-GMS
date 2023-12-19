const mysql = require("mysql");
 
const config = require("../../config/config");
 
const connection = mysql.createConnection(config.database);
 
const TransferExpencesCredit = function (transferexpencescredit) {
  this.transferexpences_credit_amount = transferexpencescredit.transferexpences_credit_amount;
  this.transferexpences_credit_remark = transferexpencescredit.transferexpences_credit_remark;
  this.transferexpences_credit_date = transferexpencescredit.transferexpences_credit_date;
  this.transferexpences_credit_particular = transferexpencescredit.transferexpences_credit_particular;
};
 
TransferExpencesCredit.createTransferExpencesCredit = function (newTransferExpencesCredit, result) {
  connection.query(
    "INSERT INTO transferexpencescredit SET ?",
    newTransferExpencesCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferexpencescredit: ", error);
 
        result(error, null);
      } else {
        console.log("transferexpencescredit created successfully");
 
        result(null, res.insertId);
      }
    }
  );
};
 
TransferExpencesCredit.getAllTransferExpencesCredit = function (callback) {
  connection.query(
    "SELECT * FROM transferexpencescredit ORDER BY transferexpences_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferexpencescredit: ", error);
 
        return callback(error, null);
      }
 
      callback(null, rows);
    }
  );
};
 
module.exports = TransferExpencesCredit;
 