const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const JewelLoanCredit = function (jewelloancredit) {
  this.jewelloan_credit_amount =
    jewelloancredit.jewelloan_credit_amount.toString();

  this.jewelloan_credit_remark =
    jewelloancredit.jewelloan_credit_remark.toString();

  this.jewelloan_credit_date = jewelloancredit.jewelloan_credit_date.toString();
};

JewelLoanCredit.createJewelLoanCredit = function (newJewelLoanCredit, result) {
  connection.query(
    "INSERT INTO jewelloancredit SET ?",
    newJewelLoanCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating jewelloancredit: ", error);

        result(error, null);
      } else {
        console.log("jewelloancredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

JewelLoanCredit.getAllJewelLoanCredit = function (callback) {
  connection.query("SELECT * FROM jewelloancredit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving jewelloancredit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = JewelLoanCredit;
