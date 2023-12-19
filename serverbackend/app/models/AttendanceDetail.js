const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const AttendanceDetails = function (attendancedetails) {
  this.employee_name = attendancedetails.employee_name;

  this.employee_role = attendancedetails.employee_role;

  this.date = attendancedetails.date;

  this.check_in = attendancedetails.check_in;

  this.check_out = attendancedetails.check_out;
};

AttendanceDetails.createAttendanceDetails = function (
  newAttendanceDetails,
  result
) {
  connection.query(
    "INSERT INTO attendancedetails SET ?",
    newAttendanceDetails,
    (error, res) => {
      if (error) {
        console.log("Error in attendance: ", error);

        result(error, null);
      } else {
        console.log("attendance created successfully");

        result(null, res.insertId);
      }
    }
  );
};

AttendanceDetails.getAllAttendanceDetails = function (callback) {
  connection.query("SELECT * FROM attendancedetails", (error, rows) => {
    if (error) {
      console.log("Error in retrieving attendancedetails: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

module.exports = AttendanceDetails;
