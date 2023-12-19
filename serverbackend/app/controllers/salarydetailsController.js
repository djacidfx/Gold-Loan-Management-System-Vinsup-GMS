const SalaryDetails = require('../models/SalaryDetails');

exports.salarydetails = (req, res) => {
  const newSalaryDetails = new SalaryDetails({
    employee_name:req.body.employee_name,
    employee_id:req.body.employee_id,
    total_working_days: req.body.total_working_days,
    total_leave_days: req.body.total_leave_days,
    deduction: req.body.deduction,
    salary_perday: req.body.salary_perday,
    salary_amount:req.body.salary_amount
  });

  SalaryDetails.createSalaryDetails(newSalaryDetails, (err, salary_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create salarydetails' });
    }

    res.status(201).json({ message: 'salary Crideted in successfully', salary_id });
  });
};


exports.getAllSalaryDetails = (req, res) => {
    SalaryDetails.getAllSalaryDetails((err, salarydetails) => {
      if (err) {
        console.error('Error retrieving attendancedetails:', err);
        return res.status(500).json({ error: 'Failed to retrieve attendancedetails' });
      }
  
      res.status(200).json({ salarydetails });
    });
  };