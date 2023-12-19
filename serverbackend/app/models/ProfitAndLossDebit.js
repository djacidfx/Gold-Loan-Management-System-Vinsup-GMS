const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const ProfitAndLossDebit = function (profitandlossdebit) {
  this.profitandloss_debit_amount =
    profitandlossdebit.profitandloss_debit_amount.toString();

  this.profitandloss_debit_remark =
    profitandlossdebit.profitandloss_debit_remark.toString();

  this.profitandloss_debit_date =
    profitandlossdebit.profitandloss_debit_date.toString();
};

ProfitAndLossDebit.createProfitAndLossDebit = function (
  newProfitAndLossDebit,
  result
) {
  connection.query(
    "INSERT INTO profitandlossdebit SET ?",
    newProfitAndLossDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating profitandlossdebit: ", error);

        result(error, null);
      } else {
        console.log("profitandlossdebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

ProfitAndLossDebit.getAllProfitAndLossDebit = function (callback) {
  connection.query("SELECT * FROM profitandlossdebit", (error, rows) => {
    if (error) {
      console.log("Error in retrieving profitandlossdebit: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = ProfitAndLossDebit;
