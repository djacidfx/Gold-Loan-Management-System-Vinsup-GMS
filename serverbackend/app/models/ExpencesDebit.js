const mysql = require('mysql');
const config = require('../../config/config');
 
const connection = mysql.createConnection(config.database);
 
const ExpencesDebit = function (expencesdebit) {
  this.expences_debit_amount = expencesdebit.expences_debit_amount;
  this.expences_debit_remark = expencesdebit.expences_debit_remark;
  this.expences_debit_particulars = expencesdebit.expences_debit_particulars;
  this.expences_debit_date = expencesdebit.expences_debit_date;
};
 
ExpencesDebit.createExpencesDebit = function (newExpencesDebit, result) {
    connection.query('INSERT INTO expencesdebit SET ?', newExpencesDebit, (error, res) => {
      if (error) {
        console.log('Error in creating expencesdebit ', error);
        result(error, null);
      } else {
        console.log('expencesdebit created successfully');
        result(null, res.insertId);
      }
    });
};
 
ExpencesDebit.getAllExpencesDebit = function (callback) {
    connection.query('SELECT * FROM expencesdebit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving expencesdebit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
 
module.exports = ExpencesDebit;