const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const GoldRate = function (goldrate) {
  this.date = goldrate.date.toString();;
  this.timing = goldrate.timing.toString();;
  this.carat_22 = goldrate.carat_22.toString();;
  this.carat_24 = goldrate.carat_24.toString();;
};


GoldRate.createGoldRate = function (newGoldRate, result) {

    connection.query('INSERT INTO goldrate SET ?', newGoldRate, (error, res) => {
      if (error) {
        console.log('Error in creating goldrate: ', error);
        result(error, null);
      } else {
        console.log('goldrate created successfully');
        result(null, res.insertId);
      }
    });

};

GoldRate.getAllGoldRate = function (callback) {
    connection.query('SELECT * FROM goldrate', (error, rows) => {
      if (error) {
        console.log('Error in retrieving goldrate: ', error);
        return callback(error, null);
      }
  
      callback(null, rows);
    });
  };

module.exports = GoldRate;
