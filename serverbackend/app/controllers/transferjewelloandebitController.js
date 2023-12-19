const TransferJewelloanDebit = require("../models/TransferJewelloanDebit");

exports.transferjewelloandebit = (req, res) => {
  const newTransferJewelloanDebit = new TransferJewelloanDebit({
    transferjewelloan_debit_amount: req.body.transferjewelloan_debit_amount,

    transferjewelloan_debit_remark: req.body.transferjewelloan_debit_remark,

    transferjewelloan_debit_date: req.body.transferjewelloan_debit_date,
  });

  TransferJewelloanDebit.createTransferJewelloanDebit(
    newTransferJewelloanDebit,
    (err, transferjewelloan_debit_date) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferjewelloandebit" });
      }
      res
        .status(201)
        .json({
          message: "transferjewelloandebit created successfully",
          transferjewelloan_debit_date,
        });
    }
  );
};

exports.getAllTransferJewelloanDebit = (req, res) => {
    TransferJewelloanDebit.getAllTransferJewelloanDebit((err, transferjewelloandebit) => {
    if (err) {
      console.error("Error retrieving transferjewelloandebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferjewelloandebit" });
    }

    res.status(200).json({ transferjewelloandebit });
  });
};
