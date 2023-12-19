const ProfitAndLossCreditdb = require("../models/ProfitAndLossCreditdb");

exports.profitandlosscreditdb = (req, res) => {
  const newProfitAndLossCreditdb = new ProfitAndLossCreditdb({
    profitandlossdb_credit_date: req.body.profitandlossdb_credit_date,

    profitandlossdb_credit_receipt: req.body.profitandlossdb_credit_receipt,

    profitandlossdb_credit_particular:
      req.body.profitandlossdb_credit_particular,

    profitandlossdb_credit_amount: req.body.profitandlossdb_credit_amount,
  });

  ProfitAndLossCreditdb.createProfitAndLossCreditdb(
    newProfitAndLossCreditdb,
    (err, profitandlosscreditdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create profitandlosscreditdb" });
      }

      res
        .status(201)
        .json({
          message: "profitandlosscreditdb created successfully",
          profitandlosscreditdb_id,
        });
    }
  );
};

exports.getAllProfitAndLossCreditdb = (req, res) => {
  ProfitAndLossCreditdb.getAllProfitAndLossCreditdb(
    (err, profitandlosscreditdb) => {
      if (err) {
        console.error("Error retrieving profitandlosscreditdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to retrieve profitandlosscreditdb" });
      }

      res.status(200).json({ profitandlosscreditdb });
    }
  );
};

exports.updateProfitAndLossCreditdb = (req, res) => {
  const profitandlosscreditdbId = req.params.id;

  const updatedProfitAndLossCreditdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedProfitAndLossCreditdb.profitandlosscreditdb_id;

  ProfitAndLossCreditdb.updateProfitAndLossCreditdbById(
    profitandlosscreditdbId,
    updatedProfitAndLossCreditdb,
    (err, data) => {
      if (err) {
        console.error("Error updating profitandlosscreditdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update profitandlosscreditdb" });
      }

      res
        .status(200)
        .json({ message: "profitandlosscreditdb updated successfully" });
    }
  );
};
