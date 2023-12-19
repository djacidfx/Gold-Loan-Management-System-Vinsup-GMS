const TransferFurnitureDebit = require("../models/TransferFurnitureDebit");

exports.transferfurnituredebit = (req, res) => {
  const newTransferFurnitureDebit = new TransferFurnitureDebit({
    transferfurniture_debit_amount: req.body.transferfurniture_debit_amount,

    transferfurniture_debit_remark: req.body.transferfurniture_debit_remark,

    transferfurniture_debit_date: req.body.transferfurniture_debit_date,
  });

  TransferFurnitureDebit.createTransferFurnitureDebit(
    newTransferFurnitureDebit,
    (err, transferfurnituredebit_receipt_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferfurnituredebit" });
      }

      res
        .status(201)
        .json({
          message: "transferfurnituredebit created successfully",
          transferfurnituredebit_receipt_id,
        });
    }
  );
};

exports.getAllTransferFurnitureDebit = (req, res) => {
    TransferFurnitureDebit.getAllTransferFurnitureDebit((err, transferfurnituredebit) => {
    if (err) {
      console.error("Error retrieving transferfurnituredebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferfurnituredebit" });
    }

    res.status(200).json({ transferfurnituredebit });
  });
};
