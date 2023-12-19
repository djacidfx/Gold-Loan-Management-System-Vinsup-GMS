const BalanceSheet = require("../models/BalanceSheet");

exports.balancesheet = (req, res) => {
  const newBalanceSheet = new BalanceSheet({
    date: req.body.date,

    capitai_balance: req.body.capitai_balance,

    cash_balance: req.body.cash_balance,

    profitloss_balance: req.body.profitloss_balance,

    bank_balance: req.body.bank_balance,

    jewel_balance: req.body.jewel_balance,

    expences_balance: req.body.expences_balance,

    suspence_balance: req.body.suspence_balance,

    furniture_balance: req.body.furniture_balance
  });

  BalanceSheet.createBalanceSheet(newBalanceSheet, (err, balancesheet_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create new balancesheet" });
    }

    res
      .status(201)
      .json({
        message: "New balancesheet created successfully",
        balancesheet_id,
      });
  });
};

exports.getAllBalanceSheet = (req, res) => {
  BalanceSheet.getAllBalanceSheet((err, balancesheet) => {
    if (err) {
      console.error("Error retrieving masterjeweltype:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve masterjeweltype" });
    }

    res.status(200).json({ balancesheet });
  });
};

exports.getBalanceSheetsByDate = function (req, res) {
  const date = req.query.date; // Assuming the date is passed as a query parameter

  BalanceSheet.getBalanceSheetsByDate(date, (error, balancesheets) => {
    if (error) {
      console.log("Error retrieving balance sheets by date:", error);

      return res
        .status(500)
        .json({ error: "Failed to retrieve balance sheets by date" });
    }

    res.status(200).json({ balancesheets });
  });
};

exports.updateBalanceSheetByDate = (req, res) => {
  const date = req.query.date; // Get the date from the query parameter

  const updatedBalanceSheet = req.body;

  // Remove the date property from the updatedBalanceSheet object

  delete updatedBalanceSheet.date;

  BalanceSheet.updateBalanceSheetByDate(
    date,
    updatedBalanceSheet,
    (err, data) => {
      if (err) {
        console.error("Error updating balancesheet:", err);

        return res.status(500).json({ error: "Failed to update balancesheet" });
      }

      res.status(200).json({ message: "balancesheet updated successfully" });
    }
  );
};
