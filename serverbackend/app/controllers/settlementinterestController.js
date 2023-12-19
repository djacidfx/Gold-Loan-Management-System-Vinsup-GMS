const SettlementInterest = require("../models/SettlementInterest");

exports.settlementinterest = (req, res) => {
  const newSettlementInterest = new SettlementInterest({
    loan_id: req.body.loan_id, // Include the loan_id field
    date: req.body.date,
    interest1: req.body.interest1,
  });

  SettlementInterest.createSettlementInterest(newSettlementInterest, (err, settlementinterest_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create SettlementInterest", error: err });
    }
    res
      .status(201)
      .json({ message: "SettlementInterest created successfully", settlementinterest_id });
  });
};

exports.getAllSettlementInterest = (req, res) => {
    SettlementInterest.getAllSettlementInterest((err, SettlementInterest) => {
    if (err) {
      console.error("Error retrieving SettlementInterest:", err);

      return res.status(500).json({ error: "Failed to retrieve SettlementInterest" });
    }

    res.status(200).json({ SettlementInterest });
  });
};
