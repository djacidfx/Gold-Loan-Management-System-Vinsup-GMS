const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);
const MasterRelationship = function (masterrelationship) {
    this.relation_type = masterrelationship.relation_type.toString();;
};

MasterRelationship.createMasterRelationship = function (newMasterRelationship, result) {
    connection.query('INSERT INTO masterrelationship SET ?', newMasterRelationship, (error, res) => {
      if (error) {
        console.log('Error in creating masterrelationship: ', error);
        result(error, null);
      } else {
        console.log('masterrelationship created successfully');
        result(null, res.insertId);
      }
    });
};

MasterRelationship.getAllMasterRelationship = function (callback) {
    connection.query('SELECT * FROM masterrelationship', (error, rows) => {
      if (error) {
        console.log('Error in retrieving masterrelationship: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
module.exports = MasterRelationship;