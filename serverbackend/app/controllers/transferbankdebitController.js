const TransferBankDebit = require("../models/TransferBankDebit");

exports.transferbankdebit = (req, res) => {
  const newTransferBankDebit = new TransferBankDebit({
    transferbank_debit_amount: req.body.transferbank_debit_amount,

    transferbank_debit_remark: req.body.transferbank_debit_remark,

    transferbank_debit_date: req.body.transferbank_debit_date,
  });

  TransferBankDebit.createTransferBankDebit(
    newTransferBankDebit,
    (err, transferbankdebit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferbankdebit" });
      }

      res.status(201).json({
        message: "transferbankdebit created successfully",
        transferbankdebit_receipt_id,
      });
    }
  );
};

exports.getAllTransferBankDebit = (req, res) => {
  TransferBankDebit.getAllTransferBankDebit((err, transferbankdebit) => {
    if (err) {
      console.error("Error retrieving transferbankdebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferbankdebit" });
    }

    res.status(200).json({ transferbankdebit });
  });
};
