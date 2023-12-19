const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const FurnitureCredit = function (furniturecredit) {
  this.furniture_credit_amount = furniturecredit.furniture_credit_amount.toString();;
  this.furniture_credit_remark = furniturecredit.furniture_credit_remark.toString();;
  this.furniture_credit_date = furniturecredit.furniture_credit_date.toString();;
};

FurnitureCredit.createFurnitureCredit = function (newFurnitureCredit, result) {
    connection.query('INSERT INTO furniturecredit SET ?', newFurnitureCredit, (error, res) => {
      if (error) {
        console.log('Error in creating furniturecredit ', error);
        result(error, null);
      } else {
        console.log('furniturecredit created successfully');
        result(null, res.insertId);
      }
    });
};

FurnitureCredit.getAllFurnitureCredit = function (callback) {
    connection.query('SELECT * FROM furniturecredit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving furniturecredit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = FurnitureCredit;