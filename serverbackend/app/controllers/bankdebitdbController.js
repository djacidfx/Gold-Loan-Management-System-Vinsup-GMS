const BankDebitdb = require("../models/BankDebitdb");

exports.bankdebitdb = (req, res) => {
  const newBankDebitdb = new BankDebitdb({
    bank_debit_date: req.body.bank_debit_date,

    bank_debit_receipt: req.body.bank_debit_receipt,

    bank_debit_particular: req.body.bank_debit_particular,

    bank_debit_amount: req.body.bank_debit_amount,
  });

  BankDebitdb.createBankDebitdb(newBankDebitdb, (err, bankdebitdb_id) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create bankdebitdb" });
    }

    res
      .status(201)
      .json({ message: "bankdebitdb created successfully", bankdebitdb_id });
  });
};

exports.getAllBankDebitdb = (req, res) => {
  BankDebitdb.getAllBankDebitdb((err, bankdebitdb) => {
    if (err) {
      console.error("Error retrieving bankdebitdb:", err);

      return res.status(500).json({ error: "Failed to retrieve bankdebitdb" });
    }

    res.status(200).json({ bankdebitdb });
  });
};

exports.updateBankDebitdb = (req, res) => {
  const bankdebitdbId = req.params.id;

  const updatedBankDebitdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedBankDebitdb.bankdebitdb_id;

  BankDebitdb.updateBankDebitdbById(
    bankdebitdbId,
    updatedBankDebitdb,
    (err, data) => {
      if (err) {
        console.error("Error updating bankdebitdb:", err);

        return res.status(500).json({ error: "Failed to update bankdebitdb" });
      }

      res.status(200).json({ message: "bankdebitdb updated successfully" });
    }
  );
};
