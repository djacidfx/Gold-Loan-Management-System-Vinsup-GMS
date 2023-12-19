const CapitalCreditdb = require("../models/CapitalCreditdb");

exports.capitalcreditdb = (req, res) => {
  const newCapitalCreditdb = new CapitalCreditdb({
    capital_credit_date: req.body.capital_credit_date,

    capital_credit_receipt: req.body.capital_credit_receipt,

    capital_credit_particular: req.body.capital_credit_particular,

    capital_credit_amount: req.body.capital_credit_amount,
  });

  CapitalCreditdb.createCapitalCreditdb(
    newCapitalCreditdb,
    (err, capitalcreditdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create capitalcreditdb" });
      }

      res
        .status(201)
        .json({
          message: "capitalcreditdb created successfully",
          capitalcreditdb_id,
        });
    }
  );
};

exports.getAllCapitalCreditdb = (req, res) => {
  CapitalCreditdb.getAllCapitalCreditdb((err, capitalcreditdb) => {
    if (err) {
      console.error("Error retrieving jewelloancreditdb:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve jewelloancreditdb" });
    }

    res.status(200).json({ capitalcreditdb });
  });
};

exports.updateCapitalCreditdb = (req, res) => {
  const capitalcreditdbId = req.params.id;

  const updatedCapitalCreditdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedCapitalCreditdb.capitalcreditdb_id;

  CapitalCreditdb.updateCapitalCreditdbById(
    capitalcreditdbId,
    updatedCapitalCreditdb,
    (err, data) => {
      if (err) {
        console.error("Error updating capitalcreditdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update capitalcreditdb" });
      }

      res.status(200).json({ message: "capitalcreditdb updated successfully" });
    }
  );
};
