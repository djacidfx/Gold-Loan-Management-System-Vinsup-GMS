const JewelLoanCreditdb = require("../models/JewelLoanCreditdb");

exports.jewelloancreditdb = (req, res) => {
  const newJewelLoanCreditdb = new JewelLoanCreditdb({
    jewelloandb_credit_date: req.body.jewelloandb_credit_date,

    jewelloandb_credit_receipt: req.body.jewelloandb_credit_receipt,

    jewelloandb_credit_particular: req.body.jewelloandb_credit_particular,

    jewelloandb_credit_amount: req.body.jewelloandb_credit_amount,
  });

  JewelLoanCreditdb.createJewelLoanCreditdb(
    newJewelLoanCreditdb,
    (err, jewelloancreditdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create jewelloancreditdb" });
      }

      res
        .status(201)
        .json({
          message: "jewelloancreditdb created successfully",
          jewelloancreditdb_id,
        });
    }
  );
};

exports.getAllJewelLoanCreditdb = (req, res) => {
  JewelLoanCreditdb.getAllJewelLoanCreditdb((err, jewelloancreditdb) => {
    if (err) {
      console.error("Error retrieving jewelloancreditdb:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve jewelloancreditdb" });
    }

    res.status(200).json({ jewelloancreditdb });
  });
};

exports.updateJewelLoanCreditdb = (req, res) => {
  const jewelloancreditdbId = req.params.id;

  const updatedJewelLoanCreditdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedJewelLoanCreditdb.jewelloancreditdb_id;

  JewelLoanCreditdb.updateJewelLoanCreditdbById(
    jewelloancreditdbId,
    updatedJewelLoanCreditdb,
    (err, data) => {
      if (err) {
        console.error("Error updating jewelloancreditdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update jewelloancreditdb" });
      }

      res
        .status(200)
        .json({ message: "jewelloancreditdb updated successfully" });
    }
  );
};
