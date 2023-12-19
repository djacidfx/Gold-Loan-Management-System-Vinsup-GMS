const mysql = require("mysql");

const config = require("../../config/config");

const cron = require("node-cron");

const connection = mysql.createConnection(config.database);

const BalanceSheet = function (balancesheet) {
  this.date = balancesheet.date.toString();

  this.capital_balance = balancesheet.capital_balance.toString();

  this.cash_balance = balancesheet.cash_balance.toString();

  this.profitloss_balance = balancesheet.profitloss_balance.toString();

  this.bank_balance = balancesheet.bank_balance.toString();

  this.jewel_balance = balancesheet.jewel_balance.toString();

  this.expences_balance = balancesheet.expences_balance.toString();

  this.suspence_balance = balancesheet.suspence_balance.toString();

  this.furniture_balance = balancesheet.furniture_balance.toString();
};

BalanceSheet.createBalanceSheet = function (newBalanceSheet, result) {
  connection.query(
    "INSERT INTO balancesheet SET ?",
    newBalanceSheet,
    (error, res) => {
      if (error) {
        console.log("Error in creating balancesheet: ", error);

        result(error, null);
      } else {
        console.log("balancesheet created successfully");

        result(null, res.insertId);
      }
    }
  );
};

BalanceSheet.getAllBalanceSheet = function (callback) {
  connection.query("SELECT * FROM balancesheet", (error, rows) => {
    if (error) {
      console.log("Error in retrieving balancesheet: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

BalanceSheet.getBalanceSheetsByDate = function (date, result) {
  connection.query(
    "SELECT * FROM balancesheet WHERE DATE(date) = ?",

    [date],

    (error, res) => {
      if (error) {
        console.log("Error retrieving balance sheets:", error);

        result(error, null);
      } else {
        result(null, res);
      }
    }
  );
};

BalanceSheet.updateBalanceSheetByDate = function (
  date,
  updatedBalanceSheet,
  result
) {
  Object.keys(updatedBalanceSheet).forEach((key) => {
    if (updatedBalanceSheet[key] === "") {
      updatedBalanceSheet[key] = "none";
    }
  });

  connection.query(
    "UPDATE balancesheet SET ? WHERE date = ?",

    [updatedBalanceSheet, date],

    (error, res) => {
      if (error) {
        console.log("Error in updating balancesheet: ", error);

        result(error, null);
      } else {
        console.log("balancesheet updated successfully");

        console.log("Update result:", res);

        result(null, res);
      }
    }
  );
};

// Schedule a cron job to run every day at 12 AM

cron.schedule("0 0 * * *", () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate()); // Add one day to the current date
  const nextDate = currentDate.toISOString().slice(0, 10); // Get the next date in YYYY-MM-DD format

  const newBalanceSheet = {
    date: currentDate,

    capital_balance: "0",

    cash_balance: "0",

    profitloss_balance: "0",

    bank_balance: "0",

    jewel_balance: "0",

    expences_balance: "0",

    suspence_balance: "0",

    furniture_balance : "0"
  };

  BalanceSheet.createBalanceSheet(newBalanceSheet, (error, result) => {
    if (error) {
      console.log("Error in creating balancesheet: ", error);
    } else {
      console.log("balancesheet created successfully");
    }
  });
});

module.exports = BalanceSheet;