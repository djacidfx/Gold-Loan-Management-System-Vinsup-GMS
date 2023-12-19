const mysql = require("mysql");

const config = require("../../config/config");

const pool = mysql.createPool(config.database);

const CapitalDepit = function (capitaldepit) {
  this.capital_debit_amount = capitaldepit.capital_debit_amount;

  this.capital_debit_remark = capitaldepit.capital_debit_remark;

  this.capital_debit_date = capitaldepit.capital_debit_date;
};

CapitalDepit.createCapitalDepit = function (newCapitalDepit, result) {
  pool.query(
    "INSERT INTO capitaldebit SET ?",
    newCapitalDepit,
    (error, res) => {
      if (error) {
        console.error("Error creating capitaldebit: ", error);

        result({ message: "Error creating capitaldebit", error }, null);
      } else {
        console.log("Capitaldebit created successfully");

        result(null, res.insertId);
      }
    }
  );
};

CapitalDepit.getAllCapitalDepit = function (callback) {
  pool.query(
    "SELECT * FROM capitaldebit ORDER BY capital_debit_date ASC",
    (error, rows) => {
      if (error) {
        console.error("Error retrieving capitaldebit: ", error);

        callback({ message: "Error retrieving capitaldebit", error }, null);
      } else {
        callback(null, rows);
      }
    }
  );
};

module.exports = CapitalDepit;
