const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferBankDebit = function (transferbankdebit) {
  this.transferbank_debit_amount = transferbankdebit.transferbank_debit_amount.toString();

  this.transferbank_debit_remark = transferbankdebit.transferbank_debit_remark.toString();

  this.transferbank_debit_date = transferbankdebit.transferbank_debit_date.toString();
};

TransferBankDebit.createTransferBankDebit = function (newTransferBankDebit, result) {
  connection.query(
    "INSERT INTO transferbankdebit SET ?",
    newTransferBankDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferbankdebit: ", error);

        result(error, null);
      } else {
        console.log("transferbankdebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferBankDebit.getAllTransferBankDebit = function (callback) {
  connection.query(
    "SELECT * FROM transferbankdebit ORDER BY transferbank_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferbankdebit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferBankDebit;
