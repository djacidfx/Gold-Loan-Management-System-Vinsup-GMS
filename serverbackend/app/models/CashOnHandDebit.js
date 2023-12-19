const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const CashOnHandDebit = function (cashonhanddebit) {
  this.cashonhand_debit_amount = cashonhanddebit.cashonhand_debit_amount.toString();;
  this.cashonhand_debit_remark = cashonhanddebit.cashonhand_debit_remark.toString();;
  this.cashonhand_debit_date = cashonhanddebit.cashonhand_debit_date.toString();;
};

CashOnHandDebit.createCashOnHandDebit = function (newCashOnHandDebit, result) {

    connection.query('INSERT INTO cashonhanddebit SET ?', newCashOnHandDebit, (error, res) => {
      if (error) {
        console.log('Error in creating cashonhanddebit: ', error);
        result(error, null);
      } else {
        console.log('cashonhanddebit created successfully');
        result(null, res.insertId);
      }
    });
};

CashOnHandDebit.getAllCashOnHandDebit = function (callback) {
    connection.query('SELECT * FROM cashonhanddebit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving cashonhanddebit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = CashOnHandDebit;