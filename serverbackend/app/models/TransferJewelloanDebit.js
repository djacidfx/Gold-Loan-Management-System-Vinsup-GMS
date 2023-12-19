const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferJewelloanDebit = function (transferjewelloandebit) {
  this.transferjewelloan_debit_amount = transferjewelloandebit.transferjewelloan_debit_amount.toString();

  this.transferjewelloan_debit_remark = transferjewelloandebit.transferjewelloan_debit_remark.toString();

  this.transferjewelloan_debit_date = transferjewelloandebit.transferjewelloan_debit_date.toString();
};

TransferJewelloanDebit.createTransferJewelloanDebit = function (newTransferJewelloanDebit, result) {
  connection.query(
    "INSERT INTO transferjewelloandebit SET ?",
    newTransferJewelloanDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferjewelloandebit: ", error);

        result(error, null);
      } else {
        console.log("transferjewelloandebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferJewelloanDebit.getAllTransferJewelloanDebit = function (callback) {
  connection.query(
    "SELECT * FROM transferjewelloandebit ORDER BY transferjewelloan_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferjewelloandebit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferJewelloanDebit;
