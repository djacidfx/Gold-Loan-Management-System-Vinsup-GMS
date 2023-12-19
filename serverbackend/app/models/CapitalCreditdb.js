const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const CapitalCreditdb = function (capitalcreditdb) {
  // Check if properties are defined before trying to convert to string

  this.capital_credit_date = capitalcreditdb.capital_credit_date
    ? capitalcreditdb.capital_credit_date.toString()
    : "";

  this.capital_credit_receipt = capitalcreditdb.capital_credit_receipt
    ? capitalcreditdb.capital_credit_receipt.toString()
    : "";

  this.capital_credit_particular = capitalcreditdb.capital_credit_particular
    ? capitalcreditdb.capital_credit_particular.toString()
    : "";

  this.capital_credit_amount = capitalcreditdb.capital_credit_amount
    ? capitalcreditdb.capital_credit_amount.toString()
    : "";
};

CapitalCreditdb.createCapitalCreditdb = function (newCapitalCreditdb, result) {
  connection.query(
    "INSERT INTO capitalcreditdb SET ?",
    newCapitalCreditdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating capitalcreditdb: ", error);

        result(error, null);
      } else {
        console.log("capitalcreditdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

CapitalCreditdb.getAllCapitalCreditdb = function (callback) {
  connection.query("SELECT * FROM capitalcreditdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving capitalcreditdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

CapitalCreditdb.updateCapitalCreditdbById = function (
  capitalcreditdbId,
  updatedCapitalCreditdb,
  result
) {
  Object.keys(updatedCapitalCreditdb).forEach((key) => {
    if (updatedCapitalCreditdb[key] === "") {
      updatedCapitalCreditdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE capitalcreditdb SET ? WHERE capitalcreditdb_id = ?",

    [updatedCapitalCreditdb, capitalcreditdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating capitalcreditdb: ", error);

        result(error, null);
      } else {
        console.log("capitalcreditdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = CapitalCreditdb;
