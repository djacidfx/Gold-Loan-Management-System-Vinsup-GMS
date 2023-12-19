const LoanApprovalDetails = require("../models/LoanApprovalDetails");

exports.loanapprovaldetails = (req, res) => {
  const {
    customer_id,
    scheme,
    date,
    today_gold_rate,
    loan_amount,
    adjustment_charges,
    additional_charges,
    final_amount,
    due_days,
    date_ss,
    care_of_name,
    address_line_one,
    address_line_two,
    mobile_number,
    balance,
    payed_date,
    netamount,
    newamount
  } = req.body;

  const newLoanApprovalDetails = new LoanApprovalDetails({
    customer_id,
    scheme,
    date,
    today_gold_rate,
    loan_amount,
    adjustment_charges,
    additional_charges,
    final_amount,
    due_days,
    date_ss,
    care_of_name,
    address_line_one,
    address_line_two,
    mobile_number,
    balance,
    payed_date,
    netamount,
    newamount
  });

  LoanApprovalDetails.createLoanApprovalDetails(
    newLoanApprovalDetails,
    (err, loan_id) => {
      if (err) {
        console.error("Error creating loan approval details:", err);
        return res
          .status(500)
          .json({ error: "Failed to create loan approval details" });
      }

      res
        .status(201)
        .json({
          message: "Loan approval details created successfully",
          loan_id,
        });
    }
  );
};

exports.getAllLoanApprovalDetails = (req, res) => {
  LoanApprovalDetails.getAllLoanApprovalDetails((err, loanapprovaldetails) => {
    if (err) {
      console.error("Error retrieving loan approval details:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve loan approval details" });
    }

    res.status(200).json({ loanapprovaldetails });
  });
};

// Inside your controller file
exports.updateLoanApprovalDetails = (req, res) => {
  const loan_id = req.params.loan_id;
  const updatedDetails = req.body;

  // Check for required fields in the updatedDetails, if necessary
  if (!updatedDetails || Object.keys(updatedDetails).length === 0) {
    return res.status(400).json({ error: "Updated details cannot be empty" });
  }

  LoanApprovalDetails.updateLoanApprovalDetails(loan_id, updatedDetails, (err, loanapprovaldetails) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({ error: "Loan approval details not found" });
      }
      console.error("Error updating loan approval details:", err);
      return res.status(500).json({ error: "Failed to update loan approval details" });
    }

    res.status(200).json({ message: "Loan approval details updated successfully", loanapprovaldetails });
  });
};




exports.deleteLoanApprovalDetails = (req, res) => {
  const loanapprovaldetailsId = req.params.id;

  LoanApprovalDetails.deleteLoanApprovalDetailsById(loanapprovaldetailsId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found loanapprovaldetails with id ${loanapprovaldetailsId}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete loanapprovaldetails with id ${loanapprovaldetailsId}`,
        });
      }
    } else res.send({ message: `loanapprovaldetails was deleted successfully!` });
  });
};

