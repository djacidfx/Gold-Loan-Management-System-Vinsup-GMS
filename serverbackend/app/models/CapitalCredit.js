const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const CapitalCredit = function (capitalcredit) {
  this.capital_credit_amount = capitalcredit.capital_credit_amount.toString();

  this.capital_credit_remark = capitalcredit.capital_credit_remark.toString();

  this.capital_credit_date = capitalcredit.capital_credit_date.toString();
};

CapitalCredit.createCapitalCredit = function (newCapitalCredit, result) {
  connection.query(
    "INSERT INTO capitalcredit SET ?",
    newCapitalCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating capitalcredit: ", error);

        result(error, null);
      } else {
        console.log("capitalcredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

CapitalCredit.getAllCapitalCredit = function (callback) {
  connection.query(
    "SELECT * FROM capitalcredit ORDER BY capital_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving capitalcredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = CapitalCredit;
