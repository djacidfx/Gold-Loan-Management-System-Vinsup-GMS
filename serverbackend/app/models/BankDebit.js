const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const BankDebit = function (bankdebit) {
  this.bankaccount_debit_amount = bankdebit.bankaccount_debit_amount.toString();

  this.bankaccount_debit_remark = bankdebit.bankaccount_debit_remark.toString();

  this.bankaccount_debit_date = bankdebit.bankaccount_debit_date.toString();
};

BankDebit.createBankDebit = function (newBankDebit, result) {
  connection.query(
    "INSERT INTO bankdebit SET ?",
    newBankDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating bankdebit ", error);

        result(error, null);
      } else {
        console.log("bankdebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

BankDebit.getAllBankDebit = function (callback) {
  connection.query("SELECT * FROM bankdebit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving bankdebit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = BankDebit;
