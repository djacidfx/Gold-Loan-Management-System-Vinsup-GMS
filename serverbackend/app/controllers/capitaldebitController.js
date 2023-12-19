const CapitalDepit = require("../models/CapitalDebit");

exports.capitaldepit = (req, res) => {
  const newCapitalDepit = {
    capital_debit_amount: req.body.capital_debit_amount,

    capital_debit_remark: req.body.capital_debit_remark,

    capital_debit_date: req.body.capital_debit_date,
  };

  CapitalDepit.createCapitalDepit(
    newCapitalDepit,
    (err, capital_debit_receipt_no) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create capitalamount" });
      }

      res
        .status(201)
        .json({
          message: "capitalamount created successfully",
          capital_debit_receipt_no,
        });
    }
  );
};

exports.getAllCapitalDepit = (req, res) => {
  CapitalDepit.getAllCapitalDepit((err, capitaldepit) => {
    if (err) {
      console.error("Error retrieving capitaldepit:", err);

      return res.status(500).json({ error: "Failed to retrieve capitaldepit" });
    }

    res.status(200).json({ capitaldepit });
  });
};
