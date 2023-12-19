const BankDebit = require("../models/BankDebit");

exports.bankdebit = (req, res) => {
  const newBankDebit = new BankDebit({
    bankaccount_debit_amount: req.body.bankaccount_debit_amount,

    bankaccount_debit_remark: req.body.bankaccount_debit_remark,

    bankaccount_debit_date: req.body.bankaccount_debit_date,
  });

  BankDebit.createBankDebit(
    newBankDebit,
    (err, bankaccount_debit_receipt_no) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create goldrate" });
      }

      res
        .status(201)
        .json({
          message: "goldrate created successfully",
          bankaccount_debit_receipt_no,
        });
    }
  );
};

exports.getAllBankDebit = (req, res) => {
  BankDebit.getAllBankDebit((err, bankdebit) => {
    if (err) {
      console.error("Error retrieving bankdebit:", err);

      return res.status(500).json({ error: "Failed to retrieve bankdebit" });
    }

    res.status(200).json({ bankdebit });
  });
};
