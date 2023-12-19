const mysql = require("mysql");

const config = require("../../config/config");

const connection = mysql.createConnection(config.database);

// Define the JewelDetail model

const JewelDetail = {

  // Other model methods...

  // Function to get all jewel details

  getAllJewelDetail: (callback) => {

    connection.query('SELECT * FROM jeweldetail', (error, results) => {

      if (error) {

        callback(error, null);

        return;

      }

      callback(null, results);

    });

  },

};

// Export the JewelDetail model

module.exports = JewelDetail;