const SettlementAdditionalAmount = require("../models/SettlementAdditionalAmount");

exports.settlementadditionalamount = (req, res) => {
  const newSettlementAdditionalAmount = new SettlementAdditionalAmount({
    loan_id: req.body.loan_id, // Include the loan_id field
    additional_charge: req.body.additional_charge,
    date: req.body.date,
  });

  SettlementAdditionalAmount.createSettlementAdditionalAmount(newSettlementAdditionalAmount, (err, settlementadditionalamount_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create settlementadditionalamount", error: err });
    }

    res
      .status(201)
      .json({ message: "settlementadditionalamount created successfully", settlementadditionalamount_id });
  });
};

exports.getAllSettlementAdditionalAmount = (req, res) => {
    SettlementAdditionalAmount.getAllSettlementAdditionalAmount((err, settlementadditionalamount) => {
    if (err) {
      console.error("Error retrieving settlementadditionalamount:", err);

      return res.status(500).json({ error: "Failed to retrieve settlementadditionalamount" });
    }

    res.status(200).json({ settlementadditionalamount });
  });
};
