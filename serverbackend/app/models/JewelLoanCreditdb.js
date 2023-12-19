const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const JewelLoanCreditdb = function (jewelloancreditdb) {
  this.jewelloandb_credit_date =
    jewelloancreditdb.jewelloandb_credit_date.toString();

  this.jewelloandb_credit_receipt =
    jewelloancreditdb.jewelloandb_credit_receipt.toString();

  this.jewelloandb_credit_particular =
    jewelloancreditdb.jewelloandb_credit_particular.toString();

  this.jewelloandb_credit_amount =
    jewelloancreditdb.jewelloandb_credit_amount.toString();
};

JewelLoanCreditdb.createJewelLoanCreditdb = function (
  newJewelLoanCreditdb,
  result
) {
  connection.query(
    "INSERT INTO jewelloancreditdb SET ?",
    newJewelLoanCreditdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating jewelloancreditdb: ", error);

        result(error, null);
      } else {
        console.log("jewelloancreditdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

JewelLoanCreditdb.getAllJewelLoanCreditdb = function (callback) {
  connection.query("SELECT * FROM jewelloancreditdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving jewelloancreditdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

JewelLoanCreditdb.updateJewelLoanCreditdbById = function (
  jewelloancreditdbId,
  updatedJewelLoanCreditdb,
  result
) {
  Object.keys(updatedJewelLoanCreditdb).forEach((key) => {
    if (updatedJewelLoanCreditdb[key] === "") {
      updatedJewelLoanCreditdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE jewelloancreditdb SET ? WHERE jewelloancreditdb_id = ?",

    [updatedJewelLoanCreditdb, jewelloancreditdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating jewelloancreditdb: ", error);

        result(error, null);
      } else {
        console.log("jewelloancreditdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = JewelLoanCreditdb;
