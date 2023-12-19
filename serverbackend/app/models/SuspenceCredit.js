const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const SuspenceCredit = function (suspencecredit) {
  this.suspence_credit_amount = suspencecredit.suspence_credit_amount.toString();;
  this.suspence_credit_remark = suspencecredit.suspence_credit_remark.toString();;
  this.suspence_credit_date = suspencecredit.suspence_credit_date.toString();;
};

SuspenceCredit.createSuspenceCredit = function (newSuspenceCredit, result) {

    connection.query('INSERT INTO suspencecredit SET ?', newSuspenceCredit, (error, res) => {
      if (error) {
        console.log('Error in creating suspencecredit: ', error);
        result(error, null);
      } else {
        console.log('suspencecredit created successfully');
        result(null, res.insertId);
      }
    });
};

SuspenceCredit.getAllSuspenceCredit = function (callback) {
    connection.query('SELECT * FROM suspencecredit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving suspencecredit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = SuspenceCredit;