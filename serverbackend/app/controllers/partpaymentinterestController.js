const PartpaymentInterest = require("../models/PartpaymentInterest");

exports.partpaymentinterest = (req, res) => {
  // Validate required fields
  if (
    !req.body.date1 ||
    !req.body.interest ||
    !req.body.loan_id
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newPartpaymentInterest = new PartpaymentInterest({
    date1: req.body.date1,
    interest: req.body.interest,
    loan_id: req.body.loan_id, // Make sure to include loan_id in your request body
  });

  PartpaymentInterest.createPartpaymentInterest(newPartpaymentInterest, (err, partpaymentinterest_id) => {
    if (err) {
      console.error("Failed to create partpaymentinterest:", err);
      return res.status(500).json({ message: "Failed to create partpaymentinterest" });
    }
    res
      .status(201)
      .json({ message: "partpaymentinterest created successfully", partpaymentinterest_id });
  });
};

exports.getAllPartpaymentInterest = (req, res) => {
    PartpaymentInterest.getAllPartpaymentInterest((err, partpaymentinterest) => {
    if (err) {
      console.error("Error retrieving partpaymentinterest:", err);
      return res.status(500).json({ error: "Failed to retrieve partpaymentinterest" });
    }
    res.status(200).json({ partpaymentinterest });
  });
};