import { useEffect, useState } from 'react';

import { Grid } from '@material-ui/core';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCardBody } from 'mdb-react-ui-kit';

import { Form, Row } from 'react-bootstrap';

const Personal = ({ onNextStep }) => {
  const [loanData, setLoanData] = useState({
    customer_id: '',
    loan_no: '',
    receipt_no: '',
    scheme: '',
    date: '',
    today_gold_rate: '',
    loan_amount: '',
    adjustment_charges: '',
    additional_charges: '',
    final_amount: '',
    due_days: '',
    date_ss: '',
    care_of_name: '',
    address: '',
    area: '',
    mobile_number: ''
  });

  const handleChange = (event) => {
    setLoanData({
      ...loanData,

      [event.target.name]: event.target.value
    });
  };
  useEffect(() => {
    // Function to calculate final amount
    const calculateFinalAmount = () => {
      const loanAmount = parseFloat(loanData.loan_amount);
      const adjustmentCharges = parseFloat(loanData.adjustment_charges);
      const additionalCharges = parseFloat(loanData.additional_charges);

      if (!isNaN(loanAmount) && !isNaN(adjustmentCharges) && !isNaN(additionalCharges)) {
        const finalAmount = loanAmount + additionalCharges - adjustmentCharges;
        setLoanData({ ...loanData, final_amount: finalAmount.toFixed(2) });
      }
    };

    calculateFinalAmount();
  }, [loanData.loan_amount, loanData.adjustment_charges, loanData.additional_charges]);

  // Handle form submission for Step 1
  const handleSubmit = (event) => {
    const { name, value } = event.target;
    const formData = new FormData();

    formData.append('customer_id', loanData.customer_id);
    formData.append('loan_no', loanData.loan_no);
    formData.append('receipt_no', loanData.receipt_no);
    formData.append('total_grams', loanData.scheme);
    formData.append('date', loanData.date);
    formData.append('today_gold_rate', loanData.today_gold_rate);
    formData.append('settlement_amount', loanData.loan_amount);
    formData.append('adjustment_charges', loanData.adjustment_charges);
    formData.append('additional_charges', loanData.additional_charges);
    formData.append('final_amount', loanData.final_amount);
    formData.append('due_days', loanData.due_days);
    formData.append('date_ss', loanData.date_ss);
    formData.append(' care_of_name', loanData.care_of_name);
    formData.append('address', loanData.address);
    formData.append('area', loanData.area);
    formData.append('mobile_number', loanData.mobile_number);

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/loanapproval`, formData)

      .then((response) => {})

      .catch((error) => {});

    setLoanData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form.Label className="mb">
              <br />
              <h3>
                <b>Loan Details</b>
              </h3>
            </Form.Label>
            <hr className="hori-col-3" />
            <MDBCardBody>
              <br />
              <Row className="mb-2">
                <Form.Group controlId="formcustomername" className="col col-sm-6">
                  <Form.Label>Customer Name(Id)</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Customer"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="customer_id"
                    value={loanData.customer_id}
                    onChange={(event) => setLoanData({ ...loanData, customer_id: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridgender" className="col col-sm-6">
                  <Form.Label>Scheme</Form.Label>

                  <Form.Control
                    as="select" // This sets the input type to "select" for the dropdown
                    name="scheme"
                    value={loanData.scheme}
                    onChange={(event) => setLoanData({ ...loanData, scheme: event.target.value })}
                    required
                  >
                    {/* Dropdown options */}

                    <option value="">Select Scheme</option>

                    <option value="option1">Option 1</option>

                    <option value="option2">Option 2</option>

                    <option value="option3">Option 3</option>

                    {/* Add more options as needed */}
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group controlId="formGridDate" className="col col-sm-6">
                  <Form.Label>Date</Form.Label>

                  <Form.Control
                    type="date" // This sets the input type to "date" for the date picker
                    className="form-control"
                    placeholder=" Date"
                    name="date"
                    value={loanData.date}
                    onChange={(event) => setLoanData({ ...loanData, date: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="col col-sm-6" controlId="formGridName">
                  <Form.Label>Today Gold Rate</Form.Label>

                  <input
                    className="form-control"
                    type="text"
                    name="today_gold_rate"
                    value={loanData.today_gold_rate}
                    onChange={(event) => setLoanData({ ...loanData, today_gold_rate: event.target.value })}
                    required
                    placeholder="Today Gold Rate"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group controlId="formGridAddress1" className="col col-sm-3">
                  <Form.Label>Loan Amount</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Loan Amount"
                    name="loan_amount"
                    value={loanData.loan_amount}
                    onChange={(event) => setLoanData({ ...loanData, loan_amount: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridAddress2" className="col col-sm-3">
                  <Form.Label>Adjustment Charges</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adjustment Charges"
                    name="adjustment_charges"
                    value={loanData.adjustment_charges}
                    onChange={(event) => setLoanData({ ...loanData, adjustment_charges: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridState" className="col col-sm-3">
                  <Form.Label>Additional Charges</Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Additional Charges"
                    name="additional_charges"
                    value={loanData.additional_charges}
                    onChange={(event) => setLoanData({ ...loanData, additional_charges: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridName" className="col col-sm-3">
                  <Form.Label>Final Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="final_amount"
                    placeholder="Final Amount"
                    value={loanData.final_amount}
                    onChange={(event) => setLoanData({ ...loanData, final_amount: event.target.value })}
                    required
                  />
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group controlId="formGridCountry" className="col col-sm-6">
                  <Form.Label>Due Days</Form.Label>

                  <Form.Select
                    defaultValue="Choose..."
                    className="form-control"
                    name="due_days"
                    placeholder="previous Balance"
                    value={loanData.due_days}
                    onChange={(event) => setLoanData({ ...loanData, due_days: event.target.value })}
                    required
                  >
                    <option value="Choose..."></option>

                    <option value="3 Month">3 Month</option>

                    <option value="6 Month">6 Month</option>

                    <option value="1 Year">1 Year</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGridDate" className="col col-sm-6">
                  <Form.Label>Date</Form.Label>

                  <input
                    type="date" // This sets the input type to "date" for the date picker
                    className="form-control"
                    name="date_ss"
                    value={loanData.date_ss}
                    onChange={(event) => setLoanData({ ...loanData, date_ss: event.target.value })}
                    required
                  />
                </Form.Group>
              </Row>
            </MDBCardBody>
          </Grid>
        </Grid>
        <Form.Label className="mb">
          <br></br>

          <h3>
            <b>Address Details</b>
          </h3>
        </Form.Label>

        <hr className="hori-col-3" />

        <Row className="mb-2">
          <Form.Group controlId="formcustomername" className="col col-sm-6">
            <Form.Label>C/O</Form.Label>

            <input
              type="text"
              className="form-control"
              placeholder="Care of Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name=" care_of_name"
              value={loanData.care_of_name}
              onChange={(event) => setLoanData({ ...loanData, care_of_name: event.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDate" className="col col-sm-6">
            <Form.Label>Address</Form.Label>

            <input
              type="text"
              className="form-control"
              placeholder="Address"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="address"
              value={loanData.address}
              onChange={(event) => setLoanData({ ...loanData, address: event.target.value })}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group controlId="formDate" className="col col-sm-6">
            <Form.Label>Area</Form.Label>

            <input
              type="text"
              className="form-control"
              placeholder="Area"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="area"
              value={loanData.area}
              onChange={(event) => setLoanData({ ...loanData, area: event.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="formGridgender" className="col col-sm-6">
            <Form.Label>Mobile number</Form.Label>

            <input
              type="number"
              className="form-control"
              placeholder="Mobile number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="mobile_number"
              value={loanData.mobile_number}
              onChange={(event) => setLoanData({ ...loanData, mobile_number: event.target.value })}
              maxLength="10"
              required
            />
          </Form.Group>
        </Row>

        <button onClick={onNextStep}>Next</button>
        <button onClick={onNextStep}>Submit</button>
      </form>
    </div>
  );
};

export default Personal;