const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const CashOnHandCredit = function (cashonhandcredit) {
  this.cashonhand_credit_amount = cashonhandcredit.cashonhand_credit_amount.toString();;
  this.cashonhand_credit_remark = cashonhandcredit.cashonhand_credit_remark.toString();;
  this.cashonhand_credit_date = cashonhandcredit.cashonhand_credit_date.toString();;
};

CashOnHandCredit.createCashOnHandCredit = function (newCashOnHandCredit, result) {

    connection.query('INSERT INTO cashonhandcredit SET ?', newCashOnHandCredit, (error, res) => {
      if (error) {
        console.log('Error in creating cashonhandcredit: ', error);
        result(error, null);
      } else {
        console.log('cashonhandcredit created successfully');
        result(null, res.insertId);
      }
    });
};

CashOnHandCredit.getAllCashOnHandCredit = function (callback) {
    connection.query('SELECT * FROM cashonhandcredit', (error, rows) => {
      if (error) {
        console.log('Error in retrieving cashonhandcredit: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

module.exports = CashOnHandCredit;