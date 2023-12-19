const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const MasterPurity = function (masterpurity) {
    this.master_purity = masterpurity.master_purity.toString();;
};

MasterPurity.createMasterPurity = function (newMasterPurity, result) {
    connection.query('INSERT INTO masterpurity SET ?', newMasterPurity, (error, res) => {
      if (error) {
        console.log('Error in creating masterpurity: ', error);
        result(error, null);
      } else {
        console.log('masterpurity created successfully');
        result(null, res.insertId);
      }
    });
};

MasterPurity.getAllMasterPurity = function (callback) {
    connection.query('SELECT * FROM masterpurity', (error, rows) => {
      if (error) {
        console.log('Error in retrieving masterpurity: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
module.exports = MasterPurity;