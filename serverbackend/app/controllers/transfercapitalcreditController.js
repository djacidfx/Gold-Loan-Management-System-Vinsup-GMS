const TransferCapitalCredit = require("../models/TransferCapitalCredit");

exports.transfercapitalcredit = (req, res) => {
  const newTransferCapitalCredit = new TransferCapitalCredit({
    transfercapital_credit_amount: req.body.transfercapital_credit_amount,

    transfercapital_credit_remark: req.body.transfercapital_credit_remark,

    transfercapital_credit_date: req.body.transfercapital_credit_date,
  });

  TransferCapitalCredit.createTransferCapitalCredit(
    newTransferCapitalCredit,
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

exports.getAllTransferCapitalCredit = (req, res) => {
    TransferCapitalCredit.getAllTransferCapitalCredit((err, transfercapitalcredit) => {
    if (err) {
      console.error("Error retrieving capitalcredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve capitalcredit" });
    }

    res.status(200).json({ transfercapitalcredit });
  });
};
