const CashScrollDenomination = require("../models/CashScrollDenomination");

exports.createCashScrolldenomination = (req, res) => {
  const newCashScrollDenomination = new CashScrollDenomination({
    csc_count500: req.body.csc_count500,
    csc_count200: req.body.csc_count200,
    csc_count100: req.body.csc_count100,
    csc_count50: req.body.csc_count50,
    csc_count20: req.body.csc_count20,
    csc_count10: req.body.csc_count10,
    csc_count5: req.body.csc_count5,
    csc_count2: req.body.csc_count2,
    csc_count1: req.body.csc_count1,
  });

  CashScrollDenomination.createCashScrollDenomination(newCashScrollDenomination, (err, CashScrolldenomination_id) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create CashScrolldenomination" });
    }

    res
      .status(201)
      .json({ message: "CashScrolldenomination created successfully", CashScrolldenomination_id });
  });
};

exports.getAllCashScrollDenomination = (req, res) => {
    CashScrollDenomination.getAllCashScrollDenomination((err, CashScrolldenomination) => {
    if (err) {
      console.error("Error retrieving CashScrolldenomination:", err);
      return res.status(500).json({ error: "Failed to retrieve CashScrolldenomination" });
    }

    res.status(200).json({ CashScrolldenomination });
  });
};
