const CapitalCredit = require("../models/CapitalCredit");

exports.capitalcredit = (req, res) => {
  const newCapitalCredit = new CapitalCredit({
    capital_credit_amount: req.body.capital_credit_amount,

    capital_credit_remark: req.body.capital_credit_remark,

    capital_credit_date: req.body.capital_credit_date,
  });

  CapitalCredit.createCapitalCredit(
    newCapitalCredit,
    (err, capital_credit_receipt_no) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create capitalcredit" });
      }

      res
        .status(201)
        .json({
          message: "capitalcredit created successfully",
          capital_credit_receipt_no,
        });
    }
  );
};

exports.getAllCapitalCredit = (req, res) => {
  CapitalCredit.getAllCapitalCredit((err, capitalcredit) => {
    if (err) {
      console.error("Error retrieving capitalcredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve capitalcredit" });
    }

    res.status(200).json({ capitalcredit });
  });
};
