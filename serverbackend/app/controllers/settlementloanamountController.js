const SettlementLoanamount = require("../models/SettlementLoanamount");

exports.settlementloanamount = (req, res) => {
  const newSettlementLoanamount = new SettlementLoanamount({
    loan_id: req.body.loan_id, // Include the loan_id field
    date: req.body.date,
    loanamount: req.body.loanamount,
  });

  SettlementLoanamount.createSettlementLoanamount(newSettlementLoanamount, (err, settlementloanamount_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create settlementloanamount", error: err });
    }

    res
      .status(201)
      .json({ message: "settlementloanamount created successfully", settlementloanamount_id });
  });
};

exports.getAllSettlementLoanamount = (req, res) => {
    SettlementLoanamount.getAllSettlementLoanamount((err, settlementloanamount) => {
    if (err) {
      console.error("Error retrieving settlementloanamount:", err);

      return res.status(500).json({ error: "Failed to retrieve settlementloanamount" });
    }

    res.status(200).json({ settlementloanamount });
  });
};
