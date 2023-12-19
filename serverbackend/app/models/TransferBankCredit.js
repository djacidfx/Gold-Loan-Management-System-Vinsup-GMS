const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferBankCredit = function (transferbankcredit) {
  this.transferbank_credit_amount = transferbankcredit.transferbank_credit_amount.toString();

  this.transferbank_credit_remark = transferbankcredit.transferbank_credit_remark.toString();

  this.transferbank_credit_date = transferbankcredit.transferbank_credit_date.toString();
};

TransferBankCredit.createTransferBankCredit = function (newTransferBankCredit, result) {
  connection.query(
    "INSERT INTO transferbankcredit SET ?",
    newTransferBankCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferbankcredit: ", error);

        result(error, null);
      } else {
        console.log("transferbankcredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferBankCredit.getAllTransferBankCredit = function (callback) {
  connection.query(
    "SELECT * FROM transferbankcredit ORDER BY transferbank_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferbankcredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferBankCredit;
