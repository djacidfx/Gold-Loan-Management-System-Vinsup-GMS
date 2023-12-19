const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const ProfitAndLossCredit = function (profitandlosscredit) {
  this.profitandloss_credit_amount =
    profitandlosscredit.profitandloss_credit_amount;

  this.profitandloss_credit_remark =
    profitandlosscredit.profitandloss_credit_remark;

  this.profitandloss_credit_date =
    profitandlosscredit.profitandloss_credit_date;

};

ProfitAndLossCredit.createProfitAndLossCredit = function (
  newProfitAndLossCredit,
  result
) {
  connection.query(
    "INSERT INTO profitandlosscredit SET ?",
    newProfitAndLossCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating profitandlosscredit: ", error);

        result(error, null);
      } else {
        console.log("profitandlosscredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

ProfitAndLossCredit.getAllProfitAndLossCredit = function (callback) {
  connection.query("SELECT * FROM profitandlosscredit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving profitandlosscredit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = ProfitAndLossCredit;
