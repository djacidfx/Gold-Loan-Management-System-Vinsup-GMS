const mysql = require('mysql');
const config = require('../../config/config');
 
const connection = mysql.createConnection(config.database);
 
const ExpencesDebitdb = function (expencesdebitdb) {
  this.expences_debit_date = expencesdebitdb.expences_debit_date;
  this.expences_debit_receipt = expencesdebitdb.expences_debit_receipt;
  this.expences_debit_particular = expencesdebitdb.expences_debit_particular;
  this.expences_debit_amount = expencesdebitdb.expences_debit_amount;
};
 
ExpencesDebitdb.createExpencesDebitdb = function (newExpencesDebitdb, result) {
 
    connection.query('INSERT INTO expencesdebitdb SET ?', newExpencesDebitdb, (error, res) => {
      if (error) {
        console.log('Error in creating expencesdebitdb: ', error);
        result(error, null);
      } else {
        console.log('expencesdebitdb created successfully');
        result(null, res.insertId);
      }
    });
};
 
ExpencesDebitdb.getAllExpencesDebitdb = function (callback) {
    connection.query('SELECT * FROM expencesdebitdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving expencesdebitdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
 
  ExpencesDebitdb.updateExpencesDebitdbById = function (expencesdebitdbId, updatedExpencesDebitdb, result) {
    Object.keys(updatedExpencesDebitdb).forEach((key) => {
      if (updatedExpencesDebitdb[key] === "") {
        updatedExpencesDebitdb[key] = "none";
      }
    });
 
    connection.query(
      "UPDATE expencesdebitdb SET ? WHERE expencesdebitdb_id = ?",
      [updatedExpencesDebitdb, expencesdebitdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating expencesdebitdb: ", error);
          result(error, null);
        } else {
          console.log("expencesdebitdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = ExpencesDebitdb;