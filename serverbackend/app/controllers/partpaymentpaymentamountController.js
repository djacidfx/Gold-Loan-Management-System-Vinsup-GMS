const PartpaymentPaymentamount = require("../models/PartpaymentPaymentamount");

exports.partpaymentpaymentamount = (req, res) => {
  // Validate required fields
  if (
    !req.body.date1 ||
    !req.body.payment_amount ||
    !req.body.loan_id
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Include loan_id from the request body
  const newPartpaymentPaymentamount = new PartpaymentPaymentamount({
    date1: req.body.date1,
    payment_amount: req.body.payment_amount,
    loan_id: req.body.loan_id, // Make sure to include loan_id in your request body
  });

  PartpaymentPaymentamount.createPartpaymentPaymentamount(newPartpaymentPaymentamount, (err, partpaymentpaymentamount_id) => {
    if (err) {
      console.error("Failed to create partpaymentpaymentamount:", err);
      return res.status(500).json({ message: "Failed to create partpaymentpaymentamount" });
    }

    res
      .status(201)
      .json({ message: "partpaymentpaymentamount created successfully", partpaymentpaymentamount_id });
  });
};

exports.getAllPartpaymentPaymentamount = (req, res) => {
    PartpaymentPaymentamount.getAllPartpaymentPaymentamount((err, partpaymentpaymentamount) => {
    if (err) {
      console.error("Error retrieving partpaymentpaymentamount:", err);
      return res.status(500).json({ error: "Failed to retrieve partpaymentpaymentamount" });
    }

    res.status(200).json({ partpaymentpaymentamount });
  });
};
