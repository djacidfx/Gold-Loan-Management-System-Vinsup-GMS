const TransferBankCredit = require("../models/TransferBankCredit");

exports.transferbankcredit = (req, res) => {
  const newTransferBankCredit = new TransferBankCredit({
    transferbank_credit_amount: req.body.transferbank_credit_amount,

    transferbank_credit_remark: req.body.transferbank_credit_remark,

    transferbank_credit_date: req.body.transferbank_credit_date,
  });

  TransferBankCredit.createTransferBankCredit(
    newTransferBankCredit,
    (err, transferbankcredit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferbankcredit" });
      }

      res
        .status(201)
        .json({
          message: "transferbankcredit created successfully",
          transferbankcredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferBankCredit = (req, res) => {
    TransferBankCredit.getAllTransferBankCredit((err, transferbankcredit) => {
    if (err) {
      console.error("Error retrieving transferbankcredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferbankcredit" });
    }

    res.status(200).json({ transferbankcredit });
  });
};
