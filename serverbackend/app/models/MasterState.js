const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const MasterState = function (masterstate) {
    this.state_name = masterstate.state_name.toString();;
};

MasterState.createMasterState = function (newMasterState, result) {

    connection.query('INSERT INTO masterstate SET ?', newMasterState, (error, res) => {
      if (error) {
        console.log('Error in creating masterstate: ', error);
        result(error, null);
      } else {
        console.log('masterstate created successfully');
        result(null, res.insertId);
      }
    });

};

MasterState.getAllMasterState = function (callback) {
    connection.query('SELECT * FROM masterstate', (error, rows) => {
      if (error) {
        console.log('Error in retrieving masterstate: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
module.exports = MasterState;