const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const MasterCity = function (mastercity) {
  this.city_name = mastercity.city_name.toString();;
  this.pincode = mastercity.pincode.toString();;
};

MasterCity.createMasterCity = function (newMasterCity, result) {

    connection.query('INSERT INTO mastercity SET ?', newMasterCity, (error, res) => {
      if (error) {
        console.log('Error in creating mastercity: ', error);
        result(error, null);
      } else {
        console.log('mastercity created successfully');
        result(null, res.insertId);
      }
    });

};

MasterCity.getAllMasterCity = function (callback) {
    connection.query('SELECT * FROM mastercity', (error, rows) => {
      if (error) {
        console.log('Error in retrieving mastercity: ', error);
        return callback(error, null);
      }
  
      callback(null, rows);
    });
  };
module.exports = MasterCity;