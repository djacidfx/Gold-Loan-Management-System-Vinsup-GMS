const BankCredit = require("../models/BankCredit");

exports.bankcredit = (req, res) => {
  const newBankCredit = new BankCredit({
    bankaccount_credit_amount: req.body.bankaccount_credit_amount,

    bankaccount_credit_remark: req.body.bankaccount_credit_remark,

    bankaccount_credit_date: req.body.bankaccount_credit_date,
  });

  BankCredit.createBankCredit(
    newBankCredit,
    (err, bankaccount_credit_receipt_no) => {
      if (err) {
        return res.status(500).json({ message: "Failed to create bankcredit" });
      }

      res
        .status(201)
        .json({
          message: "bankcredit created successfully",
          bankaccount_credit_receipt_no,
        });
    }
  );
};

exports.getAllBankCredit = (req, res) => {
  BankCredit.getAllBankCredit((err, bankcredit) => {
    if (err) {
      console.error("Error retrieving bankcredit:", err);

      return res.status(500).json({ error: "Failed to retrieve bankcredit" });
    }

    res.status(200).json({ bankcredit });
  });
};
