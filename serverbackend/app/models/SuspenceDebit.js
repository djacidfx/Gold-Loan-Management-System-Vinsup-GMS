const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const SuspenceDepit = function (suspencedebit) {
  this.suspence_debit_amount = suspencedebit.suspence_debit_amount.toString();;
  this.suspence_debit_remark = suspencedebit.suspence_debit_remark.toString();;
  this.suspence_debit_date = suspencedebit.suspence_debit_date.toString();;
};

SuspenceDepit.createSuspenceDepit = function (newSuspenceDepit, result) {

    connection.query('INSERT INTO suspencedebit SET ?', newSuspenceDepit, (error, res) => {
      if (error) {
        console.log('Error in creating suspencedebit: ', error);
        result(error, null);
      } else {
        console.log('suspencedebit created successfully');
        result(null, res.insertId);
      }
    });
};

SuspenceDepit.getAllSuspenceDepit = function (callback) {
    connection.query('SELECT * FROM suspencedebit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving suspencedebit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = SuspenceDepit;