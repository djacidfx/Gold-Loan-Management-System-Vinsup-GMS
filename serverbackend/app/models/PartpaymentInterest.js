const mysql = require("mysql");
const config = require("../../config/config");

const pool = mysql.createPool(config.database);

const PartpaymentInterest = function (partpaymentinterest) {
  this.date1 = partpaymentinterest.date1.toString();
  this.interest = partpaymentinterest.interest.toString();
  this.loan_id = partpaymentinterest.loan_id; // Assuming loan_id is part of the partpayment object
};

PartpaymentInterest.createPartpaymentInterest = function (newPartpaymentInterest, result) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting connection: ", err);
      return result(err, null);
    }

    // First, check if the loan_id exists in the loanapprovaldetails table
    connection.query(
      "SELECT 1 FROM loanapprovaldetails WHERE loan_id = ?",
      [newPartpaymentInterest.loan_id],
      (error, rows) => {
        if (error || rows.length === 0) {
          console.log("Invalid loan_id or error in checking loan_id:", error);
          connection.release();
          return result(error || new Error("Invalid loan_id"), null);
        }

        // If loan_id is valid, proceed to insert into partpayment
        connection.query(
          "INSERT INTO partpaymentinterest SET ?",
          newPartpaymentInterest,
          (error, res) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
              console.log("Error in creating partpaymentinterest: ", error);
              return result(error, null);
            }

            console.log("partpaymentinterest created successfully");
            result(null, res.insertId);
          }
        );
      }
    );
  });
};

PartpaymentInterest.getAllPartpaymentInterest = function (callback) {
  pool.query("SELECT * FROM partpaymentinterest", (error, rows) => {
    if (error) {
      console.log("Error in retrieving partpaymentinterest: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = PartpaymentInterest;