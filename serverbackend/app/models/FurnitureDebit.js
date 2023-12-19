const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const FurnitureDebit = function (furnituredebit) {
  this.furniture_debit_amount = furnituredebit.furniture_debit_amount.toString();;
  this.furniture_debit_remark = furnituredebit.furniture_debit_remark.toString();;
  this.furniture_debit_date = furnituredebit.furniture_debit_date.toString();;
};

FurnitureDebit.createFurnitureDebit = function (newFurnitureDebit, result) {
    connection.query('INSERT INTO furnituredebit SET ?', newFurnitureDebit, (error, res) => {
      if (error) {
        console.log('Error in creating furnituredebit ', error);
        result(error, null);
      } else {
        console.log('furnituredebit created successfully');
        result(null, res.insertId);
      }
    });
};

FurnitureDebit.getAllFurnitureDebit = function (callback) {
    connection.query('SELECT * FROM furnituredebit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving furnituredebit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = FurnitureDebit;