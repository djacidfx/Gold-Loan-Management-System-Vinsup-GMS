const Settlement = require("../models/Settlement");

exports.settlement = (req, res) => {
  const newSettlement = new Settlement({
    loan_id: req.body.loan_id, // Include the loan_id field
    additional_charge: req.body.additional_charge,
    adjustment_charge: req.body.adjustment_charge,
    date: req.body.date,
    interest1: req.body.interest1,
    loanamount: req.body.loanamount,
    total_amount:req.body.total_amount,
    s_count500: req.body.s_count500,
    s_count200: req.body.s_count200,
    s_count100: req.body.s_count100,
    s_count50: req.body.s_count50,
    s_count20: req.body.s_count20,
    s_count10: req.body.s_count10,
    s_count5: req.body.s_count5,
    s_count2: req.body.s_count2,
    s_count1: req.body.s_count1,
  });

  Settlement.createSettlement(newSettlement, (err, settlement_id) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Failed to create settlement", error: err });
    }

    res
      .status(201)
      .json({ message: "settlement created successfully", settlement_id });
  });
};

exports.getAllSettlement = (req, res) => {
  Settlement.getAllSettlement((err, settlement) => {
    if (err) {
      console.error("Error retrieving settlement:", err);

      return res.status(500).json({ error: "Failed to retrieve settlement" });
    }

    res.status(200).json({ settlement });
  });
};
