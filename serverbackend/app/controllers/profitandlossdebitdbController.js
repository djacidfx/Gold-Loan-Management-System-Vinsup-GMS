const ProfitAndLossDebitdb = require("../models/ProfitAndLossDebitdb");

exports.profitandlossdebitdb = (req, res) => {
  const newProfitAndLossDebitdb = new ProfitAndLossDebitdb({
    profitandlossdb_debit_date: req.body.profitandlossdb_debit_date,

    profitandlossdb_debit_receipt: req.body.profitandlossdb_debit_receipt,

    profitandlossdb_debit_particular: req.body.profitandlossdb_debit_particular,

    profitandlossdb_debit_amount: req.body.profitandlossdb_debit_amount,
  });

  ProfitAndLossDebitdb.createProfitAndLossDebitdb(
    newProfitAndLossDebitdb,
    (err, profitandlossdebitdb_id) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Failed to create profitandlossdebitdb" });
      }
      res
        .status(201)
        .json({
          message: "profitandlossdebitdb created successfully",
          profitandlossdebitdb_id,
        });
    }
  );
};

exports.getAllProfitAndLossDebitdb = (req, res) => {
  ProfitAndLossDebitdb.getAllProfitAndLossDebitdb(
    (err, profitandlossdebitdb) => {
      if (err) {
        console.error("Error retrieving profitandlossdebitdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to retrieve profitandlossdebitdb" });
      }

      res.status(200).json({ profitandlossdebitdb });
    }
  );
};

exports.updateProfitAndLossDebitdb = (req, res) => {
  const profitandlossdebitdbId = req.params.id;

  const updatedProfitAndLossDebitdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedProfitAndLossDebitdb.profitandlossdebitdb_id;

  ProfitAndLossDebitdb.updateProfitAndLossDebitdbById(
    profitandlossdebitdbId,
    updatedProfitAndLossDebitdb,
    (err, data) => {
      if (err) {
        console.error("Error updating profitandlossdebitdb:", err);

        return res
          .status(500)
          .json({ error: "Failed to update profitandlossdebitdb" });
      }

      res
        .status(200)
        .json({ message: "profitandlossdebitdb updated successfully" });
    }
  );
};
