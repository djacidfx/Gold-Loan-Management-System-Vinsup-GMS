const ProfitAndLossDebit = require("../models/ProfitAndLossDebit");

exports.profitandlossdebit = (req, res) => {
  const newProfitAndLossDebit = new ProfitAndLossDebit({
    profitandloss_debit_amount: req.body.profitandloss_debit_amount,

    profitandloss_debit_remark: req.body.profitandloss_debit_remark,

    profitandloss_debit_date: req.body.profitandloss_debit_date,
  });

  ProfitAndLossDebit.createProfitAndLossDebit(
    newProfitAndLossDebit,
    (err, profitandloss_debit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create profitandlosscredit" });
      }

      res
        .status(201)
        .json({
          message: "profitandlosscredit created successfully",
          profitandloss_debit_receipt_id,
        });
    }
  );
};

exports.getAllProfitAndLossDebit = (req, res) => {
  ProfitAndLossDebit.getAllProfitAndLossDebit((err, profitandlossdebit) => {
    if (err) {
      console.error("Error retrieving profitandlosscredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve profitandlosscredit" });
    }

    res.status(200).json({ profitandlossdebit });
  });
};
