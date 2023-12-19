const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const MasterJewelType = function (masterjeweltype) {
    this.jeweltype_name = masterjeweltype.jeweltype_name.toString();;
};

MasterJewelType.createMasterJewelType = function (newMasterJewelType, result) {

    connection.query('INSERT INTO masterjeweltype SET ?', newMasterJewelType, (error, res) => {
      if (error) {
        console.log('Error in creating masterjeweltype: ', error);
        result(error, null);
      } else {
        console.log('masterjeweltype created successfully');
        result(null, res.insertId);
      }
    });
};

MasterJewelType.getAllMasterJewelType = function (callback) {
    connection.query('SELECT * FROM masterjeweltype', (error, rows) => {
      if (error) {
        console.log('Error in retrieving masterjeweltype: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
module.exports = MasterJewelType;