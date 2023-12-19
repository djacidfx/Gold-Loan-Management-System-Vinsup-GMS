const TransferExpencesCredit = require("../models/TransferExpencesCredit");
 
exports.transferexpencescredit = (req, res) => {
  const newTransferExpencesCredit = new TransferExpencesCredit({
    transferexpences_credit_amount: req.body.transferexpences_credit_amount,
    transferexpences_credit_remark: req.body.transferexpences_credit_remark,
    transferexpences_credit_particular: req.body.transferexpences_credit_particular,
    transferexpences_credit_date: req.body.transferexpences_credit_date
  });
 
  TransferExpencesCredit.createTransferExpencesCredit(
    newTransferExpencesCredit,
    (err, transferexpencescredit_receipt_id) => {
      if (err) {
        return res
          .status(500)  
          .json({ message: "Failed to create transferexpencescredit" });
      }
 
      res
        .status(201)
        .json({
          message: "transferexpencescredit created successfully",
          transferexpencescredit_receipt_id,
        });
    }
  );
};
 
exports.getAllTransferExpencesCredit = (req, res) => {
    TransferExpencesCredit.getAllTransferExpencesCredit((err, transferexpencescredit) => {
    if (err) {
      console.error("Error retrieving transferexpencescredit:", err);
 
      return res
        .status(500)
        .json({ error: "Failed to retrieve transferexpencescredit" });
    }
 
    res.status(200).json({ transferexpencescredit });
  });
};
 