const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferProfitandlossDebit = function (transferprofitandlossdebit) {
  this.transferprofitandloss_debit_amount = transferprofitandlossdebit.transferprofitandloss_debit_amount.toString();

  this.transferprofitandloss_debit_remark = transferprofitandlossdebit.transferprofitandloss_debit_remark.toString();

  this.transferprofitandloss_debit_date = transferprofitandlossdebit.transferprofitandloss_debit_date.toString();
};

TransferProfitandlossDebit.createTransferProfitandlossDebit = function (newTransferProfitandlossDebit, result) {
  connection.query(
    "INSERT INTO transferprofitandlossdebit SET ?",
    newTransferProfitandlossDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferprofitandlossdebit: ", error);

        result(error, null);
      } else {
        console.log("transferprofitandlossdebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferProfitandlossDebit.getAllTransferProfitandlossDebit = function (callback) {
  connection.query(
    "SELECT * FROM transferprofitandlossdebit ORDER BY transferprofitandloss_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferprofitandlossdebit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferProfitandlossDebit;
