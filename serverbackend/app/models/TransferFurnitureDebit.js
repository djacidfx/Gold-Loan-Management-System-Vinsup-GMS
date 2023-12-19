const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferFurnitureDebit = function (transferfurnituredebit) {
  this.transferfurniture_debit_amount = transferfurnituredebit.transferfurniture_debit_amount.toString();

  this.transferfurniture_debit_remark = transferfurnituredebit.transferfurniture_debit_remark.toString();

  this.transferfurniture_debit_date = transferfurnituredebit.transferfurniture_debit_date.toString();
};

TransferFurnitureDebit.createTransferFurnitureDebit = function (newTransferFurnitureDebit, result) {
  connection.query(
    "INSERT INTO transferfurnituredebit SET ?",
    newTransferFurnitureDebit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferfurnituredebit: ", error);

        result(error, null);
      } else {
        console.log("transferfurnituredebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferFurnitureDebit.getAllTransferFurnitureDebit = function (callback) {
  connection.query(
    "SELECT * FROM transferfurnituredebit ORDER BY transferfurniture_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferfurnituredebit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferFurnitureDebit;
