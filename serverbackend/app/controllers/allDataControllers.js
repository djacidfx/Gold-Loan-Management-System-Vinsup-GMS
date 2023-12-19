//controllers

 

// Import required models

const LoanApprovalDetails = require('../models/LoanApprovalDetails');

const JewelDetail = require('../models/JewelDetail');

const TotalLoanValue = require('../models/TotalLoanValue');

 

// Import the JewelDetail model

const AllJewel = require('../models/allData'); // Adjust the path as needed

 

// Define a function to fetch data from all three tables and return a combined result

const getAllData = (req, res) => {

  // Initialize an object to store the combined data

  const allData = {};

 

  // Fetch data from the LoanApprovalDetails table

  LoanApprovalDetails.getAllLoanApprovalDetails((err, loanapprovaldetails) => {

    if (err) {

      console.error('Error retrieving loan approval details:', err);

      return res.status(500).json({ error: 'Failed to retrieve loan approval details' });

    }

 

    // Store the loan approval details in the combined data object

    allData.loanapprovaldetails = loanapprovaldetails.filter((detail) => {

      // Filter out rows with all null values

      return Object.values(detail).some((val) => val !== null);

    });

 

    // Fetch data from the JewelDetail table

    AllJewel.getAllJewelDetail((err, jeweldetails) => {

      if (err) {

        console.error('Error retrieving jewel details:', err);

        return res.status(500).json({ error: 'Failed to retrieve jewel details' });

      }

 

      // Store the jewel details in the combined data object

      allData.jeweldetails = jeweldetails.filter((detail) => {

        // Filter out rows with all null values

        return Object.values(detail).some((val) => val !== null);

      });

 

      // Fetch data from the TotalLoanValue table

      TotalLoanValue.getAllTotalLoanValue((err, totalloanvalue) => {

        if (err) {

          console.error('Error retrieving totalloanvalue:', err);

          return res.status(500).json({ error: 'Failed to retrieve totalloanvalue' });

        }

 

        // Store the total loan value in the combined data object

        allData.totalloanvalue = totalloanvalue.filter((detail) => {

          // Filter out rows with all null values

          return Object.values(detail).some((val) => val !== null);

        });

 

        // Send the filtered data as a JSON response

        res.status(200).json(allData);

      });

    });

  });

};

 

// Export the function to be used in routes

module.exports = {

  getAllData,

};