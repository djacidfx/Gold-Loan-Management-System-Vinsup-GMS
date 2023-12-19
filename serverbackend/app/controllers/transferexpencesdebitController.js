const TransferExpencesDebit = require("../models/TransferExpencesDebit");
 
exports.transferexpencesdebit = (req, res) => {
  const newTransferExpencesDebit = new TransferExpencesDebit({
    transferexpences_debit_amount: req.body.transferexpences_debit_amount,
    transferexpences_debit_remark: req.body.transferexpences_debit_remark,
    transferexpences_debit_particular: req.body.transferexpences_debit_particular,
    transferexpences_debit_date: req.body.transferexpences_debit_date
  });
 
  TransferExpencesDebit.createTransferExpencesDebit(
    newTransferExpencesDebit,
    (err, transferexpencesdebit_receipt_id) => {
      if (err) {
        return res
          .status(500)  
          .json({ message: "Failed to create transferexpencesdebit" });
      }
 
      res
        .status(201)
        .json({
          message: "transferexpencesdebit created successfully",
          transferexpencesdebit_receipt_id,
        });
    }
  );
};
 
exports.getAllTransferExpencesDebit = (req, res) => {
    TransferExpencesDebit.getAllTransferExpencesDebit((err, transferexpencesdebit) => {
    if (err) {
      console.error("Error retrieving transferexpencesdebit:", err);
 
      return res
        .status(500)
        .json({ error: "Failed to retrieve transferexpencesdebit" });
    }
 
    res.status(200).json({ transferexpencesdebit });
  });
};
 