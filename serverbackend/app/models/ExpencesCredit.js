const mysql = require('mysql');
const config = require('../../config/config');
 
const connection = mysql.createConnection(config.database);
 
const ExpencesCredit = function (expencescredit) {
  this.expences_credit_amount = expencescredit.expences_credit_amount;
  this.expences_credit_remark = expencescredit.expences_credit_remark;
  this.expences_credit_particulars = expencescredit.expences_credit_particulars;
  this.expences_credit_date = expencescredit.expences_credit_date;
};
 
ExpencesCredit.createExpencesCredit = function (newExpencesCredit, result) {
    connection.query('INSERT INTO expencescredit SET ?', newExpencesCredit, (error, res) => {
      if (error) {
        console.log('Error in creating expencescredit ', error);
        result(error, null);
      } else {
        console.log('expencescredit created successfully');
        result(null, res.insertId);
      }
    });
};
 
ExpencesCredit.getAllExpencesCredit = function (callback) {
    connection.query('SELECT * FROM expencescredit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving expencescredit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
 
module.exports = ExpencesCredit;