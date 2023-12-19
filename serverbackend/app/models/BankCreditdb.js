const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const BankCreditdb = function (bankcreditdb) {
  this.bank_credit_date = bankcreditdb.bank_credit_date;

  this.bank_credit_receipt = bankcreditdb.bank_credit_receipt;

  this.bank_credit_particular = bankcreditdb.bank_credit_particular;

  this.bank_credit_amount = bankcreditdb.bank_credit_amount;
};

BankCreditdb.createBankCreditdb = function (newBankCreditdb, result) {
  connection.query(
    "INSERT INTO bankcreditdb SET ?",
    newBankCreditdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating bankcreditdb: ", error);

        result(error, null);
      } else {
        console.log("bankcreditdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

BankCreditdb.getAllBankCreditdb = function (callback) {
  connection.query("SELECT * FROM bankcreditdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving bankcreditdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

BankCreditdb.updateBankCreditdbById = function (
  bankcreditdbId,
  updatedBankCreditdb,
  result
) {
  Object.keys(updatedBankCreditdb).forEach((key) => {
    if (updatedBankCreditdb[key] === "") {
      updatedBankCreditdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE bankcreditdb SET ? WHERE bankcreditdb_id = ?",

    [updatedBankCreditdb, bankcreditdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating bankcreditdb: ", error);

        result(error, null);
      } else {
        console.log("bankcreditdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = BankCreditdb;
