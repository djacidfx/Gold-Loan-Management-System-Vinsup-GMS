const JewelLoanDebit = require("../models/JewelLoanDebit");

exports.jewelloandebit = (req, res) => {
  const newJewelLoanDebit = new JewelLoanDebit({
    jewelloan_debit_amount: req.body.jewelloan_debit_amount,

    jewelloan_debit_remark: req.body.jewelloan_debit_remark,

    jewelloan_debit_date: req.body.jewelloan_debit_date,
  });

  JewelLoanDebit.createJewelLoanDebit(
    newJewelLoanDebit,
    (err, jewelloan_debit_receipt_no) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create JewelLoanDebit" });
      }

      res
        .status(201)
        .json({
          message: "JewelLoanDebit created successfully",
          jewelloan_debit_receipt_no,
        });
    }
  );
};

exports.getAllJewelLoanDebit = (req, res) => {
  JewelLoanDebit.getAllJewelLoanDebit((err, jewelloandebit) => {
    if (err) {
      console.error("Error retrieving jewelloandebit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve jewelloandebit" });
    }

    res.status(200).json({ jewelloandebit });
  });
};
