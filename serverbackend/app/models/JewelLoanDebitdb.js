const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const JewelLoanDebitdb = function (jewelloandebitdb) {
  this.jewelloandb_debit_date =
    jewelloandebitdb.jewelloandb_debit_date.toString();

  this.jewelloandb_debit_receipt =
    jewelloandebitdb.jewelloandb_debit_receipt.toString();

  this.jewelloandb_debit_particular =
    jewelloandebitdb.jewelloandb_debit_particular.toString();

  this.jewelloandb_debit_amount =
    jewelloandebitdb.jewelloandb_debit_amount.toString();
};

JewelLoanDebitdb.createJewelLoanDebitdb = function (
  newJewelLoanDebitdb,
  result
) {
  connection.query(
    "INSERT INTO jewelloandebitdb SET ?",
    newJewelLoanDebitdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating jewelloandebitdb: ", error);

        result(error, null);
      } else {
        console.log("jewelloandebitdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

JewelLoanDebitdb.getAllJewelLoanDebitdb = function (callback) {
  connection.query("SELECT * FROM jewelloandebitdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving jewelloandebitdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

JewelLoanDebitdb.updateJewelLoanDebitdbById = function (
  jewelloandebitdbId,
  updatedJewelLoanDebitdb,
  result
) {
  Object.keys(updatedJewelLoanDebitdb).forEach((key) => {
    if (updatedJewelLoanDebitdb[key] === "") {
      updatedJewelLoanDebitdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE jewelloandebitdb SET ? WHERE jewelloandebitdb_id = ?",

    [updatedJewelLoanDebitdb, jewelloandebitdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating jewelloandebitdb: ", error);

        result(error, null);
      } else {
        console.log("jewelloandebitdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = JewelLoanDebitdb;
