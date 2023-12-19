const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const FurnitureDebitdb = function (furnituredebitdb) {
  this.furniture_debit_date = furnituredebitdb.furniture_debit_date.toString();;
  this.furniture_debit_receipt = furnituredebitdb.furniture_debit_receipt.toString();;
  this.furniture_debit_particular = furnituredebitdb.furniture_debit_particular.toString();;
  this.furniture_debit_amount = furnituredebitdb.furniture_debit_amount.toString();;
};

FurnitureDebitdb.createFurnitureDebitdb = function (newFurnitureDebitdb, result) {

    connection.query('INSERT INTO furnituredebitdb SET ?', newFurnitureDebitdb, (error, res) => {
      if (error) {
        console.log('Error in creating furnituredebitdb: ', error);
        result(error, null);
      } else {
        console.log('furnituredebitdb created successfully');
        result(null, res.insertId);
      }
    });
};

FurnitureDebitdb.getAllFurnitureDebitdb = function (callback) {
    connection.query('SELECT * FROM furnituredebitdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving furnituredebitdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

  FurnitureDebitdb.updateFurnitureDebitdbById = function (furnituredebitdbId, updatedFurnitureDebitdb, result) {
    Object.keys(updatedFurnitureDebitdb).forEach((key) => {
      if (updatedFurnitureDebitdb[key] === "") {
        updatedFurnitureDebitdb[key] = "none";
      }
    });
  
    connection.query(
      "UPDATE furnituredebitdb SET ? WHERE furnituredebitdb_id = ?",
      [updatedFurnitureDebitdb, furnituredebitdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating furnituredebitdb: ", error);
          result(error, null);
        } else {
          console.log("furnituredebitdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = FurnitureDebitdb;