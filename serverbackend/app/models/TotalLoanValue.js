const mysql = require('mysql');
const config = require('../../config/config');

// Use a connection pool
const pool = mysql.createPool(config.database);

const TotalLoanValue = function (totalloanvalue) {
  this.loan_id = totalloanvalue.loan_id; // Include loan_id
  this.total_amount = totalloanvalue.total_amount;//It is total net Weight
  this.final_amount = totalloanvalue.final_amount;
  this.status = totalloanvalue.status;
  this.remark = totalloanvalue.remark;
  this.lcount500 = totalloanvalue.lcount500;
  this.lcount200 = totalloanvalue.lcount200;
  this.lcount100 = totalloanvalue.lcount100;
  this.lcount50 = totalloanvalue.lcount50;
  this.lcount20 = totalloanvalue.lcount20;
  this.lcount10 = totalloanvalue.lcount10;
  this.lcount5 = totalloanvalue.lcount5;
  this.lcount2 = totalloanvalue.lcount2;
  this.lcount1 = totalloanvalue.lcount1
};

TotalLoanValue.createTotalLoanValue = function (newTotalLoanValue, result) {
  Object.keys(newTotalLoanValue).forEach((key) => {
    if (newTotalLoanValue[key] === "") {
      newTotalLoanValue[key] = "none";
    }
  });
  pool.query('INSERT INTO totalloanvalue SET ?', newTotalLoanValue, (error, res) => {
    if (error) {
      console.log('Error in creating totalloanvalue: ', error.sqlMessage);
      result(error, null);
    } else {
      console.log('totalloanvalue created successfully');
      result(null, res.insertId);
    }
  });
};

TotalLoanValue.getAllTotalLoanValue = function (callback) {
  pool.query('SELECT * FROM totalloanvalue', (error, rows) => {
    if (error) {
      console.log('Error in retrieving totalloanvalue: ', error.sqlMessage);
      return callback(error, null);
    }
    callback(null, rows);
  });
};


TotalLoanValue.deleteTotalLoanValueById = function (totalloanvalueId, result) {
  pool.query(
    "DELETE FROM totalloanvalue WHERE totalloanvalue_id = ?",
    [totalloanvalueId],
    (error, res) => {
      if (error) {
        console.log("Error in deleting totalloanvalue: ", error);
        result(error, null);
      } else {
        console.log("totalloanvalue deleted successfully");
        result(null, res);
      }
    }
  );
};
TotalLoanValue.updateTotalLoanValueById = function (loan_id, updatedDetails, result) {
  // Define the columns you want to update. In this case, I'm assuming that updatedDetails is an object with keys that match your table's columns.
  const updates = Object.keys(updatedDetails).map(key => `${key} = ?`).join(', ');

  const query = `UPDATE totalloanvalue SET ${updates} WHERE loan_id = ?`;
  const values = [...Object.values(updatedDetails), loan_id];

  pool.query(query, values, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Updated totalloan value details: ", { loan_id, ...updatedDetails });
    result(null, { loan_id, ...updatedDetails });
  });
};

module.exports = TotalLoanValue;