const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const JewelLoanDebit = function (jewelloandebit) {
  this.jewelloan_debit_amount =
    jewelloandebit.jewelloan_debit_amount.toString();

  this.jewelloan_debit_remark =
    jewelloandebit.jewelloan_debit_remark.toString();

  this.jewelloan_debit_date = jewelloandebit.jewelloan_debit_date.toString();
};

JewelLoanDebit.createJewelLoanDebit = function (newJewelLoanDebit, result) {
  connection.query(
    "INSERT INTO jewelloandebit SET ?",
    newJewelLoanDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating jewelloandebit: ", error);

        result(error, null);
      } else {
        console.log("jewelloandebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

JewelLoanDebit.getAllJewelLoanDebit = function (callback) {
  connection.query("SELECT * FROM jewelloandebit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving jewelloandebit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = JewelLoanDebit;
