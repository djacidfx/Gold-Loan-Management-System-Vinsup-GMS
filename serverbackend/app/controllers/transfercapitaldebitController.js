const TransferCapitalDebit = require("../models/TransferCapitalDebit");

exports.transfercapitaldebit = (req, res) => {
  const newTransferCapitalDebit = new TransferCapitalDebit({
    transfercapital_debit_amount: req.body.transfercapital_debit_amount,

    transfercapital_debit_remark: req.body.transfercapital_debit_remark,

    transfercapital_debit_date: req.body.transfercapital_debit_date,
  });

  TransferCapitalDebit.createTransferCapitalDebit(
    newTransferCapitalDebit,
    (err, transfercapitalcredit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transfercapitalcredit" });
      }

      res
        .status(201)
        .json({
          message: "transfercapitalcredit created successfully",
          transfercapitalcredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferCapitalDebit = (req, res) => {
    TransferCapitalDebit.getAllTransferCapitalDebit((err, transfercapitaldebit) => {
    if (err) {
      console.error("Error retrieving transfercapitaldebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transfercapitaldebit " });
    }

    res.status(200).json({ transfercapitaldebit });
  });
};
