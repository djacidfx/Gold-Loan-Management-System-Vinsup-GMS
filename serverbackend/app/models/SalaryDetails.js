const mysql = require('mysql');
const config = require('../../config/config');

const connection = mysql.createConnection(config.database);

const SalaryDetails = function (salarydetails) {
  this.employee_name=salarydetails.employee_name;
  this.employee_id=salarydetails.employee_id;
  this.total_working_days = salarydetails.total_working_days;
  this.total_leave_days = salarydetails.total_leave_days;
  this.deduction = salarydetails.deduction;
  this.salary_perday = salarydetails.salary_perday;
  this.salary_amount = salarydetails.salary_amount;
};


SalaryDetails.createSalaryDetails = function (newSalaryDetails, result) {

    connection.query('INSERT INTO salarydetails SET ?', newSalaryDetails, (error, res) => {
      if (error) {
        console.log('Error in salarydetails: ', error);
        result(error, null);
      } else {
        console.log('salarydetails created successfully');
        result(null, res.insertId);
      }
    });

};

SalaryDetails.getAllSalaryDetails = function (callback) {
    connection.query('SELECT * FROM salarydetails', (error, rows) => {
      if (error) {
        console.log('Error in retrieving salarydetails: ', error);
        return callback(error, null);
      }
  
      callback(null, rows);
    });
  };

module.exports = SalaryDetails;