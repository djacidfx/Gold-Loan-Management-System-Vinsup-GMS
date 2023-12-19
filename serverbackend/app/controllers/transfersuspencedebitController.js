const TransferSuspenceDebit = require("../models/TransferSuspenceDebit");

exports.transfersuspencedebit = (req, res) => {
  const newTransferSuspenceDebit = new TransferSuspenceDebit({
    transfersuspence_debit_amount: req.body.transfersuspence_debit_amount,
    transfersuspence_debit_remark: req.body.transfersuspence_debit_remark,
    transfersuspence_debit_date	: req.body.transfersuspence_debit_date,
  });

  TransferSuspenceDebit.createTransferSuspenceDebit(
    newTransferSuspenceDebit,
    (err, transfersuspencedebit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transfersuspencedebit" });
      }
      res
        .status(201)
        .json({
        message: "transfersuspencedebit created successfully",
        transfersuspencedebit_receipt_id,
        });
    }
  );
};

exports.getAllTransferSuspenceDebit = (req, res) => {
    TransferSuspenceDebit.getAllTransferSuspenceDebit((err, transfersuspencedebit) => {
    if (err) {
      console.error("Error retrieving transfersuspencedebit:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve transfersuspencedebit" });
    }
    res.status(200).json({ transfersuspencedebit });
  });
};