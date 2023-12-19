const mysql = require("mysql");
const config = require("../../config/config");

const pool = mysql.createPool(config.database);

const Partpayment = function (partpayment) {
  this.date1 = partpayment.date1;
  this.interest = partpayment.interest;
  this.payment_amount = partpayment.payment_amount;
  this.totalpayment_amount = partpayment.totalpayment_amount;
  this.interest_balance = partpayment.interest_balance;
  this.paid_interest = partpayment.paid_interest;
  this.loan_id = partpayment.loan_id; // Assuming loan_id is part of the partpayment object
  this.count500 = partpayment.count500;
  this.count200 = partpayment.count200;
  this.count100 = partpayment.count100;
  this.count50 = partpayment.count50;
  this.count20 = partpayment.count20;
  this.count10 = partpayment.count10;
  this.count5 = partpayment.count5;
  this.count2 = partpayment.count2;
  this.count1 = partpayment.count1;
};
Partpayment.createPartpayment = function (newPartpayment, result) {
  // Set a default value for interest_balance if it's not provided
  if (typeof newPartpayment.interest_balance === 'undefined') {
    newPartpayment.interest_balance = 0;
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.log("Error getting connection: ", err);
      return result(err, null);
    }

    // First, check if the loan_id exists in the loanapprovaldetails table
    pool.query(
      "SELECT 1 FROM loanapprovaldetails WHERE loan_id = ?",
      [newPartpayment.loan_id],
      (error, rows) => {
        if (error || rows.length === 0) {
          console.log("Invalid loan_id or error in checking loan_id:", error);
          connection.release();
          return result(error || new Error("Invalid loan_id"), null);
        }

        // If loan_id is valid, proceed to insert into partpayment
        pool.query(
          "INSERT INTO partpayment SET ?",
          newPartpayment,
          (error, res) => {
            connection.release(); // Release the connection back to the pool

            if (error) {
              console.log("Error in creating partpayment: ", error);
              return result(error, null);
            }

            console.log("Partpayment created successfully");
            result(null, res.insertId);
          }
        );
      }
    );
  });
};


Partpayment.getAllPartpayment = function (callback) {
  pool.query("SELECT * FROM partpayment", (error, rows) => {
    if (error) {
      console.log("Error in retrieving partpayment: ", error);
      return callback(error, null);
    }

    callback(null, rows);
  });
};

Partpayment.updatePartpaymentById = function (partpaymentId, updatedPartpayment, result) {
  Object.keys(updatedPartpayment).forEach((key) => {
    if (updatedPartpayment[key] === "") {
      updatedPartpayment[key] = "none";
    }
  });

  pool.query(
    "UPDATE partpayment SET ? WHERE partpayment_id = ?", // Use 'partpayment_id' instead of 'date1'

    [updatedPartpayment, partpaymentId],

    (error, res) => {
      if (error) {
        console.log("Error in updating partpayment: ", error);
        result(error, null);
      } else {
        console.log("partpayment updated successfully");
        result(null, res);
      }
    }
  );
};


module.exports = Partpayment;
