const BankCreditdb = require("../models/BankCreditdb");

exports.bankcreditdb = (req, res) => {
  const newBankCreditdb = new BankCreditdb({
    bank_credit_date: req.body.bank_credit_date,

    bank_credit_receipt: req.body.bank_credit_receipt,

    bank_credit_particular: req.body.bank_credit_particular,

    bank_credit_amount: req.body.bank_credit_amount,
  });

  BankCreditdb.createBankCreditdb(newBankCreditdb, (err, bankcreditdb_id) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create bankcreditdb" });
    }

    res
      .status(201)
      .json({ message: "bankcreditdb created successfully", bankcreditdb_id });
  });
};

exports.getAllBankCreditdb = (req, res) => {
  BankCreditdb.getAllBankCreditdb((err, bankcreditdb) => {
    if (err) {
      console.error("Error retrieving bankcreditdb:", err);

      return res.status(500).json({ error: "Failed to retrieve bankcreditdb" });
    }

    res.status(200).json({ bankcreditdb });
  });
};

exports.updateBankCreditdb = (req, res) => {
  const bankcreditdbId = req.params.id;

  const updatedBankCreditdb = req.body;

  // Remove the customer_id property from the updatedCustomer object

  delete updatedBankCreditdb.bankcreditdb_id;

  BankCreditdb.updateBankCreditdbById(
    bankcreditdbId,
    updatedBankCreditdb,
    (err, data) => {
      if (err) {
        console.error("Error updating bankcreditdb:", err);

        return res.status(500).json({ error: "Failed to update bankcreditdb" });
      }

      res.status(200).json({ message: "bankcreditdb updated successfully" });
    }
  );
};
