const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const BankDebitdb = function (bankdebitdb) {
  this.bank_debit_date = bankdebitdb.bank_debit_date;

  this.bank_debit_receipt = bankdebitdb.bank_debit_receipt;

  this.bank_debit_particular = bankdebitdb.bank_debit_particular;

  this.bank_debit_amount = bankdebitdb.bank_debit_amount;
};

BankDebitdb.createBankDebitdb = function (newBankDebitdb, result) {
  connection.query(
    "INSERT INTO bankdebitdb SET ?",
    newBankDebitdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating bankdebitdb: ", error);

        result(error, null);
      } else {
        console.log("BankDebitdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

BankDebitdb.getAllBankDebitdb = function (callback) {
  connection.query("SELECT * FROM bankdebitdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving BankDebitdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

BankDebitdb.updateBankDebitdbById = function (
  bankdebitdbId,
  updatedBankDebitdb,
  result
) {
  Object.keys(updatedBankDebitdb).forEach((key) => {
    if (updatedBankDebitdb[key] === "") {
      updatedBankDebitdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE bankdebitdb SET ? WHERE bankdebitdb_id = ?",

    [updatedBankDebitdb, bankdebitdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating bankdebitdb: ", error);

        result(error, null);
      } else {
        console.log("bankdebitdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = BankDebitdb;
