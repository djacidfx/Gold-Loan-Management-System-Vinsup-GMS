const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const SuspenceCreditdb = function (suspencecreditdb) {
  this.suspence_credit_date = suspencecreditdb.suspence_credit_date;
  this.suspence_credit_receipt = suspencecreditdb.suspence_credit_receipt;
  this.suspence_credit_particular = suspencecreditdb.suspence_credit_particular;
  this.suspence_credit_amount = suspencecreditdb.suspence_credit_amount;
};

SuspenceCreditdb.createSuspenceCreditdb = function (newSuspenceCreditdb, result) {

    connection.query('INSERT INTO suspencecreditdb SET ?', newSuspenceCreditdb, (error, res) => {
      if (error) {
        console.log('Error in creating suspencecreditdb: ', error);
        result(error, null);
      } else {
        console.log('suspencecreditdb created successfully');
        result(null, res.insertId);
      }
    });
};

SuspenceCreditdb.getAllSuspenceCreditdb = function (callback) {
    connection.query('SELECT * FROM suspencecreditdb', (error, rows) => {
      if (error) {
        console.log('Error in retrieving suspencecreditdb: ', error);
        return callback(error, null);
      }
      callback(null, rows);
    });
  };

  SuspenceCreditdb.updateSuspenceCreditdbById = function (suspencecreditdbId, updatedSuspenceCreditdb, result) {
    Object.keys(updatedSuspenceCreditdb).forEach((key) => {
      if (updatedSuspenceCreditdb[key] === "") {
        updatedSuspenceCreditdb[key] = "none";
      }
    });
  
    connection.query(
      "UPDATE suspencecreditdb SET ? WHERE suspencecreditdb_id = ?",
      [updatedSuspenceCreditdb, suspencecreditdbId],
      (error, res) => {
        if (error) {
          console.log("Error in updating suspencecreditdb: ", error);
          result(error, null);
        } else {
          console.log("suspencecreditdb updated successfully");
          result(null, res);
        }
      }
    );
  };
module.exports = SuspenceCreditdb;