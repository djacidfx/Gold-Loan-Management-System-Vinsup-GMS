const mysql = require('mysql');
const config = require('../../config/config');
const connection = mysql.createConnection(config.database);
const MasterLoanScheme = function (masterloanscheme) {
    this.masterloan_scheme = masterloanscheme.masterloan_scheme.toString();;
};

MasterLoanScheme.createMasterLoanScheme = function (newMasterLoanScheme, result) {
    connection.query('INSERT INTO masterloanscheme SET ?', newMasterLoanScheme, (error, res) => {
      if (error) {
        console.log('Error in creating masterloanscheme: ', error);
        result(error, null);
      } else {
        console.log('masterloanscheme created successfully');
        result(null, res.insertId);
      }
    });
};

MasterLoanScheme.getAllMasterLoanScheme = function (callback) {
    connection.query('SELECT * FROM masterloanscheme', (error, rows) => {
      if (error) {
        console.log('Error in retrieving masterloanscheme: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
module.exports = MasterLoanScheme;