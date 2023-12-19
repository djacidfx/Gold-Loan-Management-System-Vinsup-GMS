const Partpayment = require("../models/PartPayment");


exports.partpayment = (req, res) => {
  // Validate required fields

  // Include loan_id from the request body
  const newPartpayment = new Partpayment({
    date1: req.body.date1,
    interest: req.body.interest,
    payment_amount: req.body.payment_amount,
    totalpayment_amount: req.body.totalpayment_amount,
    interest_balance: req.body.interest_balance,
    paid_interest: req.body.paid_interest,
    loan_id: req.body.loan_id, // Make sure to include loan_id in your request body
    count500: req.body.count500,
    count200: req.body.count200,
    count100: req.body.count100,
    count50: req.body.count50,
    count20: req.body.count20,
    count10: req.body.count10,
    count5: req.body.count5,
    count2: req.body.count2,
    count1: req.body.count1,
  });

  Partpayment.createPartpayment(newPartpayment, (err, partpayment_id) => {
    if (err) {
      console.error("Failed to create partpayment:", err);
      return res.status(500).json({ message: "Failed to create partpayment" });
    }

    res
      .status(201)
      .json({ message: "Partpayment created successfully", partpayment_id });
  });
};

exports.getAllPartpayment = (req, res) => {
  Partpayment.getAllPartpayment((err, partpayment) => {
    if (err) {
      console.error("Error retrieving partpayment:", err);
      return res.status(500).json({ error: "Failed to retrieve partpayment" });
    }
    res.status(200).json({ partpayment });
  });
};

exports.updatePartpayment = (req, res) => {
  const partpaymentId = req.params.id;
  const updatedPartpayment = req.body;

  // Remove the partpayment_id property from the updatedPartpayment object
  delete updatedPartpayment.partpayment_id;

  Partpayment.updatePartpaymentById(partpaymentId, updatedPartpayment, (error, data) => {
    if (error) {
      console.error("Error updating part payment:", error);
      return res.status(500).json({ error: "Failed to update part payment" });
    }

    res.status(200).json({ message: "Part payment updated successfully" });
  });
};
