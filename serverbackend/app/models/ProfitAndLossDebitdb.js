const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

const ProfitAndLossDebitdb = function (profitandlossdebitdb) {
  this.profitandlossdb_debit_date = profitandlossdebitdb.profitandlossdb_debit_date;
  this.profitandlossdb_debit_receipt = profitandlossdebitdb.profitandlossdb_debit_receipt;
  this.profitandlossdb_debit_particular = profitandlossdebitdb.profitandlossdb_debit_particular;
  this.profitandlossdb_debit_amount = profitandlossdebitdb.profitandlossdb_debit_amount;
};

ProfitAndLossDebitdb.createProfitAndLossDebitdb = function (
  newProfitAndLossDebitdb,
  result
) {
  connection.query(
    "INSERT INTO profitandlossdebitdb SET ?",
    newProfitAndLossDebitdb,
    (error, res) => {
      if (error) {
        console.log("Error in creating profitandlossdebitdb: ", error);

        result(error, null);
      } else {
        console.log("profitandlossdebitdb created successfully");

        result(null, res.insertId);
      }
    }
  );
};

ProfitAndLossDebitdb.getAllProfitAndLossDebitdb = function (callback) {
  connection.query("SELECT * FROM profitandlossdebitdb", (error, rows) => {
    if (error) {
      console.log("Error in retrieving profitandlossdebitdb: ", error);

      return callback(error, null);
    }

    callback(null, rows);
  });
};

ProfitAndLossDebitdb.updateProfitAndLossDebitdbById = function (
  profitandlossdebitdbId,
  updatedProfitAndLossDebitdb,
  result
) {
  Object.keys(updatedProfitAndLossDebitdb).forEach((key) => {
    if (updatedProfitAndLossDebitdb[key] === "") {
      updatedProfitAndLossDebitdb[key] = "none";
    }
  });

  connection.query(
    "UPDATE profitandlossdebitdb SET ? WHERE profitandlossdebitdb_id = ?",

    [updatedProfitAndLossDebitdb, profitandlossdebitdbId],

    (error, res) => {
      if (error) {
        console.log("Error in updating profitandlossdebitdb: ", error);

        result(error, null);
      } else {
        console.log("profitandlossdebitdb updated successfully");

        result(null, res);
      }
    }
  );
};

module.exports = ProfitAndLossDebitdb;
