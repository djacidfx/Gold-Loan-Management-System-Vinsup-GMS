const CashScroll = require("../models/CashScroll");

exports.createCashScroll = (req, res) => {
  const newCashScroll = new CashScroll({
    opening_amount: req.body.opening_amount,
    date: req.body.date,
    closing_amount: req.body.closing_amount,
  });

  CashScroll.createCashScroll(newCashScroll, (err, cashscroll_id) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create Cash Scroll" });
    }

    res
      .status(201)
      .json({ message: "Cash Scroll created successfully", cashscroll_id });
  });
};

exports.getAllCashScrolls = (req, res) => {
  CashScroll.getAllCashScroll((err, cashscrolls) => {
    if (err) {
      console.error("Error retrieving Cash Scrolls:", err);
      return res.status(500).json({ error: "Failed to retrieve Cash Scrolls" });
    }

    res.status(200).json({ cashscrolls });
  });
};


exports.updateCashScrollClosingAmount = (req, res) => {
  const { date } = req.params;
  const { closing_amount } = req.body;

  CashScroll.updateClosingAmount(date, closing_amount, (err) => {
    if (err) {
      console.error("Error updating Cash Scroll:", err);
      return res.status(500).json({ error: "Failed to update Cash Scroll" });
    }

    res.status(200).json({ message: "Cash Scroll updated successfully" });
  });
};