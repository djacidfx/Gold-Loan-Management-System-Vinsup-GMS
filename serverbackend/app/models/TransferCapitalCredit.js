const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferCapitalCredit = function (transfercapitalcredit) {
  this.transfercapital_credit_amount = transfercapitalcredit.transfercapital_credit_amount.toString();

  this.transfercapital_credit_remark = transfercapitalcredit.transfercapital_credit_remark.toString();

  this.transfercapital_credit_date = transfercapitalcredit.transfercapital_credit_date.toString();
};

TransferCapitalCredit.createTransferCapitalCredit = function (newTransferCapitalCredit, result) {
  connection.query(
    "INSERT INTO transfercapitalcredit SET ?",
    newTransferCapitalCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transfercapitalcredit: ", error);

        result(error, null);
      } else {
        console.log("transfercapitalcredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferCapitalCredit.getAllTransferCapitalCredit = function (callback) {
  connection.query(
    "SELECT * FROM transfercapitalcredit ORDER BY transfercapital_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transfercapitalcredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferCapitalCredit;
