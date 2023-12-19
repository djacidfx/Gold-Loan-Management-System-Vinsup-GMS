const CapitalDebitdb = require("../models/CapitalDebitdb");

exports.capitaldebitdb = (req, res) => {
  const newCapitalDebitdb = new CapitalDebitdb({
    capital_debit_date: req.body.capital_debit_date,

    capital_debit_receipt: req.body.capital_debit_receipt,

    capital_debit_particular: req.body.capital_debit_particular,

    capital_debit_amount: req.body.capital_debit_amount,
  });

  CapitalDebitdb.createCapitalDebitdb(
    newCapitalDebitdb,
    (err, capitaldebitdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create capitaldebitdb" });
      }

      res
        .status(201)
        .json({
          message: "capitaldebitdb created successfully",
          capitaldebitdb_id,
        });
    }
  );
};

exports.getAllCapitalDebitdb = (req, res) => {
  CapitalDebitdb.getAllCapitalDebitdb((err, capitaldebitdb) => {
    if (err) {
      console.error("Error retrieving capitaldebitdb:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve capitaldebitdb" });
    }

    res.status(200).json({ capitaldebitdb });
  });
};

exports.updateCapitalDebitdb = (req, res) => {
  const capitaldebitdbId = req.params.id;

  const updatedCapitalDebitdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedCapitalDebitdb.capitaldebitdb_id;

  CapitalDebitdb.updateCapitalDebitdbById(
    capitaldebitdbId,
    updatedCapitalDebitdb,
    (err, data) => {
      if (err) {
        console.error("Error updating capitaldebitdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update capitaldebitdb" });
      }

      res.status(200).json({ message: "capitaldebitdb updated successfully" });
    }
  );
};
