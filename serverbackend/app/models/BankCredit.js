const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const BankCredit = function (bankcredit) {
  this.bankaccount_credit_amount =
    bankcredit.bankaccount_credit_amount.toString();

  this.bankaccount_credit_remark =
    bankcredit.bankaccount_credit_remark.toString();

  this.bankaccount_credit_date = bankcredit.bankaccount_credit_date.toString();
};

BankCredit.createBankCredit = function (newBankCredit, result) {
  connection.query(
    "INSERT INTO bankcredit SET ?",
    newBankCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating bankcredit ", error);

        result(error, null);
      } else {
        console.log("bankcredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

BankCredit.getAllBankCredit = function (callback) {
  connection.query("SELECT * FROM bankcredit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving bankcredit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = BankCredit;
