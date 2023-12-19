const mysql = require("mysql");
const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const LoanApprovalDetails = function (loanapprovaldetails) {
  this.customer_id = loanapprovaldetails.customer_id;
  this.scheme = loanapprovaldetails.scheme;
  this.date = loanapprovaldetails.date;
  this.today_gold_rate = loanapprovaldetails.today_gold_rate;
  this.loan_amount = loanapprovaldetails.loan_amount;
  this.adjustment_charges = loanapprovaldetails.adjustment_charges;
  this.additional_charges = loanapprovaldetails.additional_charges;
  this.final_amount = loanapprovaldetails.final_amount;
  this.due_days = loanapprovaldetails.due_days;
  this.date_ss = loanapprovaldetails.date_ss;
  this.care_of_name = loanapprovaldetails.care_of_name;
  this.address_line_one = loanapprovaldetails.address_line_one;
  this.address_line_two = loanapprovaldetails.address_line_two;
  this.mobile_number = loanapprovaldetails.mobile_number;
  this.balance=loanapprovaldetails.balance;
  this.payed_date=loanapprovaldetails.payed_date;
  this.netamount=loanapprovaldetails.netamount;
  this.newamount=loanapprovaldetails.newamount;
    
  
};

LoanApprovalDetails.createLoanApprovalDetails = function (newLoanApprovalDetails,result) {
  Object.keys(newLoanApprovalDetails).forEach((key) => {
    if (newLoanApprovalDetails[key] === "") {
      newLoanApprovalDetails[key] = "none";
    }
  });
  connection.query(
    "INSERT INTO loanapprovaldetails SET ?",
    newLoanApprovalDetails,
    (error, res) => {
      if (error) {
        console.log("Error in creating loanapprovaldetails: ", error);
        result(error, null);
      } else {
        console.log("Loan approval details created successfully");
        result(null, res.insertId);
      }
    }
  );
};

LoanApprovalDetails.getAllLoanApprovalDetails = function (callback) {
  connection.query("SELECT * FROM loanapprovaldetails", (error, rows) => {
    if (error) {
      console.log("Error in retrieving loanapprovaldetails: ", error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};


LoanApprovalDetails.updateLoanApprovalDetails = function (loan_id, updatedDetails, result) {
  // Define the columns you want to update. In this case, I'm assuming that updatedDetails is an object with keys that match your table's columns.
  const updates = Object.keys(updatedDetails).map(key => `${key} = ?`).join(', ');

  const query = `UPDATE loanapprovaldetails SET ${updates} WHERE loan_id = ?`;
  const values = [...Object.values(updatedDetails), loan_id];

  connection.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Updated loan approval details: ", { loan_id, ...updatedDetails });
    result(null, { loan_id, ...updatedDetails });
  });
};


LoanApprovalDetails.deleteLoanApprovalDetailsById = function (loanapprovaldetailsId, result) {
  connection.query(
    "DELETE FROM loanapprovaldetails WHERE loan_id = ?",
    [loanapprovaldetailsId],
    (error, res) => {
      if (error) {
        console.log("Error in deleting loanapprovaldetails: ", error);
        result(error, null);
      } else {
        console.log("loanapprovaldetails deleted successfully");
        result(null, res);
      }
    }
  );
};


module.exports = LoanApprovalDetails;