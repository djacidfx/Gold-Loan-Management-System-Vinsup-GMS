const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const SuspenceDebitdb = function (suspencedebitdb) {
  this.suspence_debit_date = suspencedebitdb.suspence_debit_date.toString();;
  this.suspence_debit_receipt = suspencedebitdb.suspence_debit_receipt.toString();;
  this.suspence_debit_particular = suspencedebitdb.suspence_debit_particular.toString();;
  this.suspence_debit_amount = suspencedebitdb.suspence_debit_amount.toString();;
};

SuspenceDebitdb.createSuspenceDebitdb= function (newSuspenceDebitdb, result) {

    connection.query('INSERT INTO suspencedebitdb SET ?', newSuspenceDebitdb, (error, res) => {
      if (error) {
        console.log('Error in creating suspencedebitdb: ', error);
        result(error, null);
      } else {
        console.log('suspencedebitdb created successfully');
        result(null, res.insertId);
      }
    });
};

SuspenceDebitdb.getAllSuspenceDebitdb = function (callback) {
    connection.query('SELECT * FROM suspencedebitdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving suspencedebitdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

  SuspenceDebitdb.updateSuspenceDebitdbById = function (suspencedebitdbId, updatedSuspenceDebitdb, result) {
    Object.keys(updatedSuspenceDebitdb).forEach((key) => {
      if (updatedSuspenceDebitdb[key] === "") {
        updatedSuspenceDebitdb[key] = "none";
      }
    });
  
    connection.query(
      "UPDATE suspencedebitdb SET ? WHERE suspencedebitdb_id = ?",
      [updatedSuspenceDebitdb, suspencedebitdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating suspencedebitdb: ", error);
          result(error, null);
        } else {
          console.log("suspencedebitdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = SuspenceDebitdb;