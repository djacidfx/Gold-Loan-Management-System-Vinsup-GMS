const mysql = require("mysql");
const config = require("../../config/config");

const pool = mysql.createPool(config.database);

const PartpaymentPaymentamount = function (partpaymentpaymentamount) {
  this.date1 = partpaymentpaymentamount.date1.toString();
  this.payment_amount = partpaymentpaymentamount.payment_amount.toString();
  this.loan_id = partpaymentpaymentamount.loan_id; // Assuming loan_id is part of the partpayment object
};

PartpaymentPaymentamount.createPartpaymentPaymentamount= function (newPartpaymentPaymentamount, result) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting connection: ", err);
      return result(err, null);
    }

    // First, check if the loan_id exists in the loanapprovaldetails table
    connection.query(
      "SELECT 1 FROM loanapprovaldetails WHERE loan_id = ?",
      [newPartpaymentPaymentamount.loan_id],
      (error, rows) => {
        if (error || rows.length === 0) {
          console.log("Invalid loan_id or error in checking loan_id:", error);
          connection.release();
          return result(error || new Error("Invalid loan_id"), null);
        }

        // If loan_id is valid, proceed to insert into partpayment
        connection.query(
          "INSERT INTO partpaymentpaymentamount SET ?",
          newPartpaymentPaymentamount,
          (error, res) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
              console.log("Error in creating partpaymentpaymentamount: ", error);
              return result(error, null);
            }

            console.log("partpaymentpaymentamount created successfully");
            result(null, res.insertId);
          }
        );
      }
    );
  });
};

PartpaymentPaymentamount.getAllPartpaymentPaymentamount = function (callback) {
  pool.query("SELECT * FROM partpaymentpaymentamount", (error, rows) => {
    if (error) {
      console.log("Error in retrieving partpaymentpaymentamount: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = PartpaymentPaymentamount;