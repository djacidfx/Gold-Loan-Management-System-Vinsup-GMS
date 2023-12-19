const mysql = require('mysql');
const config = require('../../config/config');
 
const connection = mysql.createConnection(config.database);
 
const ExpencesCreditdb = function (expencescreditdb) {
  this.expences_credit_date = expencescreditdb.expences_credit_date;
  this.expences_credit_receipt = expencescreditdb.expences_credit_receipt;
  this.expences_credit_particular = expencescreditdb.expences_credit_particular;
  this.expences_credit_particular1 = expencescreditdb.expences_credit_particular1;
  this.expences_credit_amount = expencescreditdb.expences_credit_amount;
};
 
ExpencesCreditdb.createExpencesCreditdb = function (newExpencesCreditdb, result) {
 
    connection.query('INSERT INTO expencescreditdb SET ?', newExpencesCreditdb, (error, res) => {
      if (error) {
        console.log('Error in creating expencescreditdb: ', error);
        result(error, null);
      } else {
        console.log('expencescreditdb created successfully');
        result(null, res.insertId);
      }
    });
};
 
ExpencesCreditdb.getAllExpencesCreditdb = function (callback) {
    connection.query('SELECT * FROM expencescreditdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving expencescreditdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };
 
  ExpencesCreditdb.updateExpencesCreditdbById = function (expencescreditdbId, updatedExpencesCreditdb, result) {
    Object.keys(updatedExpencesCreditdb).forEach((key) => {
      if (updatedExpencesCreditdb[key] === "") {
        updatedExpencesCreditdb[key] = "none";
      }
    });
 
    connection.query(
      "UPDATE expencescreditdb SET ? WHERE expencescreditdb_id = ?",
      [updatedExpencesCreditdb, expencescreditdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating expencescreditdb: ", error);
          result(error, null);
        } else {
          console.log("expencescreditdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = ExpencesCreditdb;