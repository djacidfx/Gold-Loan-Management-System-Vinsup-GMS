const ProfitAndLossCredit = require("../models/ProfitAndLossCredit");

exports.profitandlosscredit = (req, res) => {
  const newProfitAndLossCredit = new ProfitAndLossCredit({
    profitandloss_credit_amount: req.body.profitandloss_credit_amount,

    profitandloss_credit_remark: req.body.profitandloss_credit_remark,

    profitandloss_credit_date: req.body.profitandloss_credit_date,

  });

  ProfitAndLossCredit.createProfitAndLossCredit(
    newProfitAndLossCredit,
    (err, profitandloss_credit_receipt_no) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create profitandlosscredit" });
      }

      res
        .status(201)
        .json({
          message: "profitandlosscredit created successfully",
          profitandloss_credit_receipt_no,
        });
    }
  );
};

exports.getAllProfitAndLossCredit = (req, res) => {
  ProfitAndLossCredit.getAllProfitAndLossCredit((err, profitandlosscredit) => {
    if (err) {
      console.error("Error retrieving profitandlosscredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve profitandlosscredit" });
    }

    res.status(200).json({ profitandlosscredit });
  });
};
