const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferCapitalDebit = function (transfercapitaldebit) {
  this.transfercapital_debit_amount = transfercapitaldebit.transfercapital_debit_amount.toString();

  this.transfercapital_debit_remark = transfercapitaldebit.transfercapital_debit_remark.toString();

  this.transfercapital_debit_date = transfercapitaldebit.transfercapital_debit_date.toString();
};

TransferCapitalDebit.createTransferCapitalDebit = function (newTransferCapitalDebit, result) {
  connection.query(
    "INSERT INTO transfercapitaldebit SET ?",
    newTransferCapitalDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transfercapitaldebit: ", error);

        result(error, null);
      } else {
        console.log("transfercapitaldebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferCapitalDebit.getAllTransferCapitalDebit = function (callback) {
  connection.query(
    "SELECT * FROM transfercapitaldebit ORDER BY transfercapital_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transfercapitaldebit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferCapitalDebit;
