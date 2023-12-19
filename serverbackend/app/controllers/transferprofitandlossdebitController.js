const TransferProfitandlossDebit = require("../models/TransferProfitandlossDebit");

exports.transferprofitandlossdebit = (req, res) => {
  const newTransferProfitandlossDebit = new TransferProfitandlossDebit({
    transferprofitandloss_debit_amount: req.body.transferprofitandloss_debit_amount,

    transferprofitandloss_debit_remark: req.body.transferprofitandloss_debit_remark,

    transferprofitandloss_debit_date: req.body.transferprofitandloss_debit_date,
  });

  TransferProfitandlossDebit.createTransferProfitandlossDebit(
    newTransferProfitandlossDebit,
    (err, transferprofitandlossdebit_receipt_id	) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create transferprofitandlossdebit" });
      }

      res
        .status(201)
        .json({
          message: "transferprofitandlossdebit created successfully",
          transferprofitandlossdebit_receipt_id,
        });
    }
  );
};

exports.getAllTransferProfitandlossDebit = (req, res) => {
    TransferProfitandlossDebit.getAllTransferProfitandlossDebit((err, transferprofitandlossdebit) => {
    if (err) {
      console.error("Error retrieving transferprofitandlossdebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve transferprofitandlossdebit" });
    }

    res.status(200).json({ transferprofitandlossdebit });
  });
};
