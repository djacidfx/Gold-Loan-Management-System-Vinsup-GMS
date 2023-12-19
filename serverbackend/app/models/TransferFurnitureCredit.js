const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const TransferFurnitureCredit = function (transferfurniturecredit) {
  this.transferfurniture_credit_amount = transferfurniturecredit.transferfurniture_credit_amount.toString();

  this.transferfurniture_credit_remark = transferfurniturecredit.transferfurniture_credit_remark.toString();

  this.transferfurniture_credit_date = transferfurniturecredit.transferfurniture_credit_date.toString();
};

TransferFurnitureCredit.createTransferFurnitureCredit = function (newTransferFurnitureCredit, result) {
  connection.query(
    "INSERT INTO transferfurniturecredit SET ?",
    newTransferFurnitureCredit,
    (error, res) => {
      if (error) {
        console.log("Error in creating transferfurniturecredit: ", error);

        result(error, null);
      } else {
        console.log("transferfurniturecredit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

TransferFurnitureCredit.getAllTransferFurnitureCredit = function (callback) {
  connection.query(
    "SELECT * FROM transferfurniturecredit ORDER BY transferfurniture_credit_date ASC",
    (error, rows) => {
      if (error) {
        console.log("Error in retrieving transferfurniturecredit: ", error);

        return callback(error, null);
      }

      callback(null, rows);
    }
  );
};

module.exports = TransferFurnitureCredit;
