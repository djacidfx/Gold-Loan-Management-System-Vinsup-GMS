const TransferFurnitureCredit = require("../models/TransferFurnitureCredit");

exports.transferfurniturecredit = (req, res) => {
  const newTransferFurnitureCredit = new TransferFurnitureCredit({
    transferfurniture_credit_amount: req.body.transferfurniture_credit_amount,

    transferfurniture_credit_remark: req.body.transferfurniture_credit_remark,

    transferfurniture_credit_date: req.body.transferfurniture_credit_date,
  });

  TransferFurnitureCredit.createTransferFurnitureCredit(
    newTransferFurnitureCredit,
    (err, transferfurniturecredit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferfurniturecredit" });
      }

      res
        .status(201)
        .json({
          message: "transferfurniturecredit created successfully",
          transferfurniturecredit_receipt_id,
        });
    }
  );
};

exports.getAllTransferFurnitureCredit = (req, res) => {
    TransferFurnitureCredit.getAllTransferFurnitureCredit((err, transferfurniturecredit) => {
    if (err) {
      console.error("Error retrieving transferfurniturecredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferfurniturecredit" });
    }

    res.status(200).json({ transferfurniturecredit });
  });
};
