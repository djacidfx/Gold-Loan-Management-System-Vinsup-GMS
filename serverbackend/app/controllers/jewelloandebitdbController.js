const JewelLoanDebitdb = require("../models/JewelLoanDebitdb");

exports.jewelloandebitdb = (req, res) => {
  const newJewelLoanDebitdb = new JewelLoanDebitdb({
    jewelloandb_debit_date: req.body.jewelloandb_debit_date,

    jewelloandb_debit_receipt: req.body.jewelloandb_debit_receipt,

    jewelloandb_debit_particular: req.body.jewelloandb_debit_particular,

    jewelloandb_debit_amount: req.body.jewelloandb_debit_amount,
  });

  JewelLoanDebitdb.createJewelLoanDebitdb(
    newJewelLoanDebitdb,
    (err, jewelloandebitdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create jewelloandebitdb" });
      }

      res
        .status(201)
        .json({
          message: "jewelloandebitdb created successfully",
          jewelloandebitdb_id,
        });
    }
  );
};

exports.getAllJewelLoanDebitdb = (req, res) => {
  JewelLoanDebitdb.getAllJewelLoanDebitdb((err, jewelloandebitdb) => {
    if (err) {
      console.error("Error retrieving jewelloandebitdb:", err);

      return res
        .status(500)
        .json({ error: "Failed to retrieve jewelloandebitdb" });
    }

    res.status(200).json({ jewelloandebitdb });
  });
};

exports.updateJewelLoanDebitdb = (req, res) => {
  const jewelloandebitdbId = req.params.id;

  const updatedJewelLoanDebitdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedJewelLoanDebitdb.jewelloandebitdb_id;

  JewelLoanDebitdb.updateJewelLoanDebitdbById(
    jewelloandebitdbId,
    updatedJewelLoanDebitdb,
    (err, data) => {
      if (err) {
        console.error("Error updating jewelloandebitdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update jewelloandebitdb" });
      }

      res
        .status(200)
        .json({ message: "jewelloandebitdb updated successfully" });
    }
  );
};