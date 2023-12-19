const SettlementAdjustmentAmount = require("../models/SettlementAdjustmentAmount");

exports.settlementadjustmentamount = (req, res) => {
  const newSettlementAdjustmentAmount = new SettlementAdjustmentAmount({
    loan_id: req.body.loan_id, // Include the loan_id field
    adjustment_charge: req.body.adjustment_charge,
    date: req.body.date,
  });

  SettlementAdjustmentAmount.createSettlementAdjustmentAmount(newSettlementAdjustmentAmount, (err, settlementadjustmentamount_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create settlementadjustmentamount", error: err });
    }

    res
      .status(201)
      .json({ message: "settlementadjustmentamount created successfully", settlementadjustmentamount_id });
  });
};

exports.getAllSettlementAdjustmentAmount = (req, res) => {
    SettlementAdjustmentAmount.getAllSettlementAdjustmentAmount((err, settlementadjustmentamount) => {
    if (err) {
      console.error("Error retrieving settlementadjustmentamount:", err);

      return res.status(500).json({ error: "Failed to retrieve settlementadjustmentamount" });
    }

    res.status(200).json({ settlementadjustmentamount });
  });
};
