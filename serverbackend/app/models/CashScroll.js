const mysql = require("mysql");
const config = require("../../config/config");
const cron = require("node-cron");
const { format } = require("date-fns");

const connection = mysql.createConnection(config.database);

const CashScroll = function (cashscroll) {
  this.opening_amount = cashscroll.opening_amount.toString();
  this.date = cashscroll.date.toString();
  this.closing_amount = cashscroll.closing_amount.toString();
};

CashScroll.createCashScroll = function (newCashScroll, result) {
  connection.query(
    "INSERT INTO cashscroll SET ?",
    newCashScroll,
    (error, res) => {
      if (error) {
        console.log("Error in creating Cash Scroll: ", error);
        result(error, null);
      } else {
        console.log("Cash Scroll created successfully");
        result(null, res.insertId);
      }
    }
  );
};

CashScroll.getAllCashScroll = function (callback) {
  connection.query("SELECT * FROM cashscroll", (error, rows) => {
    if (error) {
      console.log("Error in retrieving Cash Scroll: ", error);
      return callback(error, null);
    }
    callback(null, rows);
  });
};

// CashScroll.updateClosingAmount = function (date, closingAmount, result) {
//   connection.query(
//     "UPDATE cashscroll SET closing_amount = ? WHERE date = ?",
//     [closingAmount, date],
//     (error, res) => {
//       if (error) {
//         console.log("Error in updating Cash Scroll closing amount: ", error);
//         result(error, null);
//       } else {
//         console.log("Cash Scroll closing amount updated successfully");
//         result(null);
//       }
//     }
//   );
// };

// cron.schedule('0 0 * * *', function() {
//   // Get the latest record
//   connection.query("SELECT * FROM cashscroll ORDER BY date DESC LIMIT 1", (error, rows) => {
//     if (error) {
//       console.log("Error in retrieving Cash Scroll: ", error);
//       return;
//     }

//     if (rows.length === 0) {
//       console.log("No records in cashscroll table");
//       return;
//     }

//     const latestRecord = rows[0];
//     const opening_amount = latestRecord.closing_amount;

//     // Calculate the current date in the local timezone
//     const currentDate = new Date();
//     const localDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));
//     const formattedDate = localDate.toISOString().split('T')[0];

//     // Insert a new record with opening_amount = latestRecord.closing_amount and the current date as created_at
//     CashScroll.createCashScroll({
//       opening_amount,
//       date: formattedDate,
//       closing_amount: '', // Set an initial value for closing_amount
//     }, (error, result) => {
//       if (error) {
//         console.log("Error in creating Cash Scroll: ", error);
//         return;
//       }

//       console.log("Cash Scroll created successfully");
//     });
//   });
// });

CashScroll.updateClosingAmount = function (date, closingAmount, result) {
  connection.query(
    "UPDATE cashscroll SET closing_amount = ? WHERE date = ?",
    [closingAmount, date],
    (error, res) => {
      if (error) {
        console.log("Error in updating Cash Scroll closing amount: ", error);
        result(error, null);
      } else {
        console.log("Cash Scroll closing amount updated successfully");
        result(null);
      }
    }
  );
};

cron.schedule('0 0 * * *', function () {
  // Get the latest record
  connection.query("SELECT * FROM cashscroll ORDER BY date DESC LIMIT 1", (error, rows) => {
    if (error) {
      console.log("Error in retrieving Cash Scroll: ", error);
      return;
    }

    if (rows.length === 0) {
      console.log("No records in cashscroll table");
      return;
    }

    const latestRecord = rows[0];
    let opening_amount;

    // Check if the closing_amount is null, 0, or empty
    if (latestRecord.closing_amount === null || latestRecord.closing_amount === 0 || latestRecord.closing_amount === '') {
      // Update the opening_amount to the current day's opening_amount
      opening_amount = latestRecord.opening_amount;
    } else {
      // Update the opening_amount to the current day's closing_amount
      opening_amount = latestRecord.closing_amount;
    }

    // Calculate the current date in the local timezone
    const currentDate = new Date();
    const formattedDate = format(currentDate, "EEE MMM d HH:mm:ss OOOO y");

    console.log(formattedDate);
    // Update the closing_amount of the latest record
    CashScroll.updateClosingAmount(latestRecord.date, opening_amount, (error) => {
      if (error) {
        console.log("Error in updating Cash Scroll closing amount: ", error);
        return;
      }

      // Insert a new record with the updated opening_amount
      CashScroll.createCashScroll({
        opening_amount: opening_amount,
        date: formattedDate,
        closing_amount: opening_amount, // Set the closing_amount to the same value as opening_amount
      }, (error, result) => {
        if (error) {
          console.log("Error in creating Cash Scroll: ", error);
          return;
        }

        console.log("Cash Scroll created successfully");
      });
    });
  });
});


module.exports = CashScroll;