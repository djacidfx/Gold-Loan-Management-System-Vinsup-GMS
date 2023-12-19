const TransferSuspenceCredit = require("../models/TransferSuspenceCredit");

exports.transfersuspencecredit = (req, res) => {
  const newTransferSuspenceCredit = new TransferSuspenceCredit({
    transfersuspence_credit_amount: req.body.transfersuspence_credit_amount,
    transfersuspence_credit_remark: req.body.transfersuspence_credit_remark,
    transfersuspence_credit_date: req.body.transfersuspence_credit_date,
  });

  TransferSuspenceCredit.createTransferSuspenceCredit(
    newTransferSuspenceCredit,
    (err, transfersuspencecredit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transfersuspencecredit" });
      }
      res
        .status(201)
        .json({
        message: "transfersuspencecredit created successfully",
          transfersuspencecredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferSuspenceCredit = (req, res) => {
    TransferSuspenceCredit.getAllTransferSuspenceCredit((err, transfersuspencecredit) => {
    if (err) {
      console.error("Error retrieving transfersuspencecredit:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve transfersuspencecredit" });
    }
    res.status(200).json({ transfersuspencecredit });
  });
};