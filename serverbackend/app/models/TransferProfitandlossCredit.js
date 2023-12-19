const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferProfitandlossCredit = function (transferprofitandlosscredit) {
  this.transferprofitandloss_credit_amount = transferprofitandlosscredit.transferprofitandloss_credit_amount.toString();

  this.transferprofitandloss_credit_remark = transferprofitandlosscredit.transferprofitandloss_credit_remark.toString();

  this.transferprofitandloss_credit_date = transferprofitandlosscredit.transferprofitandloss_credit_date.toString();
};

TransferProfitandlossCredit.createTransferProfitandlossCredit = function (newTransferProfitandlossCredit, result) {
  connection.query(
    "INSERT INTO transferprofitandlosscredit SET ?",
    newTransferProfitandlossCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferprofitandlosscredit: ", error);

        result(error, null);
      } else {
        console.log("transferprofitandlosscredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferProfitandlossCredit.getAllTransferProfitandlossCredit = function (callback) {
  connection.query(
    "SELECT * FROM transferprofitandlosscredit ORDER BY transferprofitandloss_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferprofitandlosscredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferProfitandlossCredit;
