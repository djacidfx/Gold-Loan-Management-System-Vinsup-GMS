const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const FurnitureCreditdb = function (furniturecreditdb) {
  this.furniture_credit_date = furniturecreditdb.furniture_credit_date;
  this.furniture_credit_receipt = furniturecreditdb.furniture_credit_receipt;
  this.furniture_credit_particular = furniturecreditdb.furniture_credit_particular;
  this.furniture_credit_amount = furniturecreditdb.furniture_credit_amount;
};

FurnitureCreditdb.createFurnitureCreditdb = function (newFurnitureCreditdb, result) {

    connection.query('INSERT INTO furniturecreditdb SET ?', newFurnitureCreditdb, (error, res) => {
      if (error) {
        console.log('Error in creating furniturecreditdb: ', error);
        result(error, null);
      } else {
        console.log('furniturecreditdb created successfully');
        result(null, res.insertId);
      }
    });
};

FurnitureCreditdb.getAllFurnitureCreditdb = function (callback) {
    connection.query('SELECT * FROM furniturecreditdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving furniturecreditdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

  FurnitureCreditdb.updateFurnitureCreditdbById = function (furniturecreditdbId, updatedFurnitureCreditdb, result) {
    Object.keys(updatedFurnitureCreditdb).forEach((key) => {
      if (updatedFurnitureCreditdb[key] === "") {
        updatedFurnitureCreditdb[key] = "none";
      }
    });
  
    connection.query(
      "UPDATE furniturecreditdb SET ? WHERE furniturecreditdb_id = ?",
      [updatedFurnitureCreditdb, furniturecreditdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating furniturecreditdb: ", error);
          result(error, null);
        } else {
          console.log("furniturecreditdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = FurnitureCreditdb;