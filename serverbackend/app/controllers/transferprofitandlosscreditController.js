const TransferProfitandlossCredit = require("../models/TransferProfitandlossCredit");

exports.transferprofitandlosscredit = (req, res) => {
  const newTransferProfitandlossCredit = new TransferProfitandlossCredit({
    transferprofitandloss_credit_amount: req.body.transferprofitandloss_credit_amount,

    transferprofitandloss_credit_remark: req.body.transferprofitandloss_credit_remark,

    transferprofitandloss_credit_date: req.body.transferprofitandloss_credit_date,
  });

  TransferProfitandlossCredit.createTransferProfitandlossCredit(
    newTransferProfitandlossCredit,
    (err, transferprofitandlosscredit_receipt_id	) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferprofitandlosscredit" });
      }

      res
        .status(201)
        .json({
          message: "transferprofitandlosscredit created successfully",
          transferprofitandlosscredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferProfitandlossCredit = (req, res) => {
    TransferProfitandlossCredit.getAllTransferProfitandlossCredit((err, transferprofitandlosscredit) => {
    if (err) {
      console.error("Error retrieving transferprofitandlosscredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferprofitandlosscredit" });
    }

    res.status(200).json({ transferprofitandlosscredit });
  });
};
