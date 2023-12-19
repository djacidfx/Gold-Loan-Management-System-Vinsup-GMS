const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const ProfitAndLossCreditdb = function (profitAndLosscreditdb) {
  this.profitandlossdb_credit_date =
  profitAndLosscreditdb.profitandlossdb_credit_date;

  this.profitandlossdb_credit_receipt =
  profitAndLosscreditdb.profitandlossdb_credit_receipt;

  this.profitandlossdb_credit_particular =
  profitAndLosscreditdb.profitandlossdb_credit_particular;

  this.profitandlossdb_credit_amount =
  profitAndLosscreditdb.profitandlossdb_credit_amount;
};

ProfitAndLossCreditdb.createProfitAndLossCreditdb = function (
  newProfitAndLossCreditdb,
  result
) {
  connection.query(
    "INSERT INTO profitandlosscreditdb SET ?",
    newProfitAndLossCreditdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating profitandlosscreditdb:", error);

        result(error, null);
      } else {
        console.log("Profitandlosscreditdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

ProfitAndLossCreditdb.getAllProfitAndLossCreditdb = function (callback) {
  connection.query("SELECT * FROM profitandlosscreditdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving profitandlosscreditdb:", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

ProfitAndLossCreditdb.updateProfitAndLossCreditdbById = function (
  profitandlosscreditdbId,
  updatedProfitAndLossCreditdb,
  result
) {
  Object.keys(updatedProfitAndLossCreditdb).forEach((key) => {
    if (updatedProfitAndLossCreditdb[key] === "") {
      updatedProfitAndLossCreditdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE profitandlosscreditdb SET ? WHERE profitandlosscreditdb_id = ?",

    [updatedProfitAndLossCreditdb, profitandlosscreditdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating profitandlosscreditdb:", error);

        result(error, null);
      } else {
        console.log("Profitandlosscreditdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = ProfitAndLossCreditdb;
