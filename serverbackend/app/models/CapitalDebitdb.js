const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const CapitalDebitdb = function (capitaldebitdb) {
  this.capital_debit_date = capitaldebitdb.capital_debit_date
    ? capitaldebitdb.capital_debit_date.toString()
    : "";

  this.capital_debit_receipt = capitaldebitdb.capital_debit_receipt
    ? capitaldebitdb.capital_debit_receipt.toString()
    : "";

  this.capital_debit_particular = capitaldebitdb.capital_debit_particular
    ? capitaldebitdb.capital_debit_particular.toString()
    : "";

  this.capital_debit_amount = capitaldebitdb.capital_debit_amount
    ? capitaldebitdb.capital_debit_amount.toString()
    : "";
};

CapitalDebitdb.createCapitalDebitdb = function (newCapitalDebitdb, result) {
  connection.query(
    "INSERT INTO capitaldebitdb SET ?",
    newCapitalDebitdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating capitaldebitdb: ", error);

        result(error, null);
      } else {
        console.log("capitaldebitdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

CapitalDebitdb.getAllCapitalDebitdb = function (callback) {
  connection.query("SELECT * FROM capitaldebitdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving capitaldebitdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

CapitalDebitdb.updateCapitalDebitdbById = function (
  capitaldebitdbId,
  updatedCapitalDebitdb,
  result
) {
  Object.keys(updatedCapitalDebitdb).forEach((key) => {
    if (updatedCapitalDebitdb[key] === "") {
      updatedCapitalDebitdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE capitaldebitdb SET ? WHERE capitaldebitdb_id = ?",

    [updatedCapitalDebitdb, capitaldebitdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating capitaldebitdb: ", error);

        result(error, null);
      } else {
        console.log("capitaldebitdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = CapitalDebitdb;
