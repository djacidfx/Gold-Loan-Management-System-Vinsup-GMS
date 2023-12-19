const TransferJewelloanCredit = require("../models/TransferJewelloanCredit");

exports.transferjewelloancredit = (req, res) => {
  const newTransferJewelloanCredit = new TransferJewelloanCredit({
    transferjewelloan_credit_amount: req.body.transferjewelloan_credit_amount,

    transferjewelloan_credit_remark: req.body.transferjewelloan_credit_remark,

    transferjewelloan_credit_date: req.body.transferjewelloan_credit_date,
  });

  TransferJewelloanCredit.createTransferJewelloanCredit(
    newTransferJewelloanCredit,
    (err, transferjewelloancredit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferjewelloancredit" });
      }

      res
        .status(201)
        .json({
          message: "transferjewelloancredit created successfully",
          transferjewelloancredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferJewelloanCredit = (req, res) => {
    TransferJewelloanCredit.getAllTransferJewelloanCredit((err, transferjewelloancredit) => {
    if (err) {
      console.error("Error retrieving transferjewelloancredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferjewelloancredit" });
    }

    res.status(200).json({ transferjewelloancredit });
  });
};
