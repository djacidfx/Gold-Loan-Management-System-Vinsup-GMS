const JewelLoanCredit = require("../models/JewelLoanCredit");

exports.jewelloancredit = (req, res) => {
  const newJewelLoanCredit = new JewelLoanCredit({
    jewelloan_credit_amount: req.body.jewelloan_credit_amount,

    jewelloan_credit_remark: req.body.jewelloan_credit_remark,

    jewelloan_credit_date: req.body.jewelloan_credit_date,
  });

  JewelLoanCredit.createJewelLoanCredit(
    newJewelLoanCredit,
    (err, jewelloan_credit_receipt_no) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create jewelloancredit" });
      }

      res
        .status(201)
        .json({
          message: "jewelloancredit created successfully",
          jewelloan_credit_receipt_no,
        });
    }
  );
};

exports.getAllJewelLoanCredit = (req, res) => {
  JewelLoanCredit.getAllJewelLoanCredit((err, jewelloancredit) => {
    if (err) {
      console.error("Error retrieving jewelloancredit:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve jewelloancredit" });
    }

    res.status(200).json({ jewelloancredit });
  });
};
