const TotalLoanValue = require('../models/TotalLoanValue');

exports.totalloanvalue = (req, res) => {
  // Validate the request body
  // if (!req.body.loan_id || !req.body.total_amount || !req.body.final_amount || !req.body.status) {
  //   console.log('Request body:', req.body); // Log the request body
  //   return res.status(400).json({ message: 'Missing required fields' });
  // }

  // You may want to add additional validation here
  const{
    total_amount,
    final_amount,
    status,
    remark,
    lcount500,
    lcount200,
    lcount100,
    lcount50,
    lcount20,
    lcount10,
    lcount5,
    lcount2,
    lcount1
  } = req.body;

  const newTotalLoanValue = new TotalLoanValue({
    loan_id: req.body.loan_id,
    total_amount: req.body.total_amount, //It is total net Weight
    final_amount: req.body.final_amount,
    status: req.body.status,
    remark: req.body.remark,
    lcount500: req.body.lcount500,
    lcount200: req.body.lcount200,
    lcount100: req.body.lcount100,
    lcount50: req.body.lcount50,
    lcount20: req.body.lcount20,
    lcount10: req.body.lcount10,
    lcount5: req.body.lcount5,
    lcount2: req.body.lcount2,
    lcount1: req.body.lcount1,
  });

  TotalLoanValue.createTotalLoanValue(newTotalLoanValue, (err, totalloanvalue_id) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create totalloanvalue', error: err.message });
    }

    res.status(201).json({ message: 'totalloanvalue created successfully', totalloanvalue_id });
  });
};

exports.getAllTotalLoanValue = (req, res) => {
  TotalLoanValue.getAllTotalLoanValue((err, totalloanvalue) => {
    if (err) {
      console.error('Error retrieving totalloanvalue:', err);
      return res.status(500).json({ error: 'Failed to retrieve totalloanvalue' });
    }

    res.status(200).json({ totalloanvalue });
  });
};


exports.deleteTotalLoanValue = (req, res) => {
  const totalloanvalueId = req.params.id;

  TotalLoanValue.deleteTotalLoanValueById(totalloanvalueId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found totalloanvalue with id ${totalloanvalueId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete totalloanvalue with id ${totalloanvalueId}`,
        });
      }
    } else res.send({ message: `totalloanvalue was deleted successfully!` });
  });
};

// Inside your controller file
exports.updateTotalLoanValueById = (req, res) => {
  const loan_id = req.params.loan_id;
  const updatedDetails = req.body;

  // Check for required fields in the updatedDetails, if necessary
  if (!updatedDetails || Object.keys(updatedDetails).length === 0) {
    return res.status(400).json({ error: "Updated details cannot be empty" });
  }

  TotalLoanValue.updateTotalLoanValueById(loan_id, updatedDetails, (err, loanapprovaldetails) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ error: "Totalloan Value details not found" });
      }
      console.error("Error updating Totalloan Value details:", err);
      return res.status(500).json({ error: "Failed to update Totalloan Value details" });
    }

    res.status(200).json({ message: "Totalloan Value details updated successfully", loanapprovaldetails });
  });
};