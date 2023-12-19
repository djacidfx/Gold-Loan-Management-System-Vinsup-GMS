const AttendanceDetails = require("../models/AttendanceDetail");

exports.attendancedetails = (req, res) => {
  const newAttendanceDetails = new AttendanceDetails({
    employee_name: req.body.employee_name,

    employee_role: req.body.employee_role,

    date: req.body.date,

    check_in: req.body.check_in,

    check_out: req.body.check_out,
  });

  AttendanceDetails.createAttendanceDetails(
    newAttendanceDetails,
    (err, employee_id) => {
      if (err) {
        return res.status(500).json({ message: "Failed to check in" });
      }

      res.status(201).json({ message: "check in successfully", employee_id });
    }
  );
};

exports.getAllAttendanceDetails = (req, res) => {
  AttendanceDetails.getAllAttendanceDetails((err, attendancedetails) => {
    if (err) {
      console.error("Error retrieving attendancedetails:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve attendancedetails" });
    }

    res.status(200).json({ attendancedetails });
  });
};
