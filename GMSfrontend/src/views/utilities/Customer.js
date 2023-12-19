import React from 'react';

import { Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Card from '@mui/material/Card';
import { Container, Grid } from '@mui/material';
import { Paper, Table, TableCell, TableContainer, TableRow, TableHead, TableBody } from '@mui/material';
import { MDBCardBody, MDBCardTitle } from 'mdb-react-ui-kit';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import CashDemoination from './CashDemoination';

const Customer = () => {
  const [repledgeData, setRepledgeData] = useState({
    customer_name: '',

    new_loan_id: '',

    cr_receipt_no: '',

    settlement_amount: '',

    repledge_amount: '',

    previous_balance: '',

    payment_type: '',

    amount: '',

    debit_receipt_no: '',

    charges: '',

    additional_charges: '',

    final_amount: '',

    address: '',

    area: '',

    mobile_number: '',

    s_no: '',

    ornaments_type: '',

    carat: '',

    count: '',

    weight: '',

    loan_amount: '',

    paid_amount: '',

    paid_date: ''
  });

  const handleChange = (event) => {
    setRepledgeData({
      ...repledgeData,

      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('customer_name', repledgeData.customer_name);

    formData.append('new_loan_id', repledgeData.new_loan_id);

    formData.append('cr_receipt_no', repledgeData.cr_receipt_no);

    formData.append('settlement_amount', repledgeData.settlement_amount);

    formData.append('repledge_amount', repledgeData.repledge_amount);

    formData.append('previous_balance', repledgeData.previous_balance);

    formData.append('payment_type', repledgeData.payment_type);

    formData.append('amount', repledgeData.amount);

    formData.append('receipt_no1', repledgeData.debit_receipt_no);

    formData.append('charges', repledgeData.charges);

    formData.append('additional_charges', repledgeData.additional_charges);

    formData.append('final_amount', repledgeData.final_amount);

    formData.append('care_of_name', repledgeData.care_of_name);

    formData.append('address', repledgeData.address);

    formData.append('area', repledgeData.area);

    formData.append('mobile_number', repledgeData.mobile_number);

    formData.append('s_no', repledgeData.s_no);

    formData.append('ornaments_type', repledgeData.ornaments_type);

    formData.append('carat', repledgeData.carat);

    formData.append('count', repledgeData.count);

    formData.append('weight', repledgeData.weight);

    formData.append('loan_amount', repledgeData.loan_amount);

    formData.append('paid_amount', repledgeData.paid_amount);

    formData.append('customer1_id', repledgeData.customer1_id);

    formData.append('new_loan1_id', repledgeData.new_loan1_id);

    const { name, value } = event.target;

    setRepledgeData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const responsivePadding = {
    padding: '20px',

    '@media (max-width: 600px)': {
      padding: '10px'
    },

    '@media (max-width: 400px)': {
      padding: '5px'
    }
  };

  return (
    <>
      <div style={{ display: 'flex', height: '90vh' }}>
        <div style={{ flex: 1, paddingLeft: '1px' }}>
          <form className="container" onSubmit={handleSubmit}>
            <Card {...responsivePadding}>
              <Container maxWidth="lg">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Form.Label className="mb">
                      <br></br>

                      <h3>
                        <b>Customer</b>
                      </h3>
                    </Form.Label>

                    <hr className="hori-col-3" />

                    <MDBCardBody>
                      <br />

                      <Row className="mb-2">
                        <Form.Group controlId="formcustomername" className="col col-sm-6">
                          <Form.Label>
                            Customer Name(Id) <span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Customer Id"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="customer_name"
                            value={repledgeData.customer_name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formDate" className="col col-sm-3">
                          <Form.Label>
                            New Loan ID<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="New Loan ID"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="new_loan_id"
                            value={repledgeData.new_loan_id}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formDate" className="col col-sm-3">
                          <Form.Label>
                            Receipt No.<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Receipt No."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="cr_receipt_no"
                            value={repledgeData.cr_receipt_no}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-2">
                        <Form.Group controlId="formGridAddress1" className="col col-sm-6">
                          <Form.Label>
                            Settlement Amount<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Settlement Amount"
                            aria-describedby="basic-addon1"
                            name="settlement_amount"
                            value={repledgeData.settlement_amount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2" className="col col-sm-6">
                          <Form.Label>
                            Repledge Amount<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Repledge Amount"
                            aria-describedby="basic-addon1"
                            name="repledge_amount"
                            value={repledgeData.repledge_amount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-2">
                        <Form.Group controlId="formGridState" className="col col-sm-2">
                          <Form.Label>
                            previous Loan No.<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="previous Balance"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="previous_balance"
                            value={repledgeData.previous_balance}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridState" className="col col-sm-2">
                          <Form.Label>
                            previous Balance<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            placeholder="previous Balance"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            name="previous_balance"
                            value={repledgeData.previous_balance}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridCountry" className="col col-sm-2">
                          <Form.Label>
                            Payment Type<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <Form.Select
                            defaultValue="Choose..."
                            className="form-control"
                            name="payment_type"
                            placeholder="previous Balance"
                            value={repledgeData.payment_type}
                            onChange={handleChange}
                            required
                          >
                            <option value="Choose..."></option>

                            <option value="India">Settlement</option>

                            <option value="India">Partpayment</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="formGridState" className="col col-sm-3">
                          <Form.Label>
                            Amount<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            name="amount"
                            value={repledgeData.amount}
                            onChange={handleChange}
                            required
                            placeholder="Amount"
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridState" className="col col-sm-3">
                          <Form.Label>
                            Receipt No.<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <input
                            type="text"
                            className="form-control"
                            name="receipt_no"
                            value={repledgeData.receipt_no}
                            onChange={handleChange}
                            required
                            placeholder="Receipt No."
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-2">
                        <Form.Group controlId="formGridName" className="col col-sm-6">
                          <Form.Label>
                            Charges<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="charges"
                            value={repledgeData.charges}
                            onChange={handleChange}
                            required
                            placeholder="Charges"
                          />
                        </Form.Group>

                        <Form.Group controlId="formGridName" className="col col-sm-6">
                          <Form.Label>
                            Additional Charges<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="additional_charges"
                            placeholder="Additional Charges"
                            value={repledgeData.additional_charges}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-2">
                        <Form.Group controlId="formGridName" className="col col-sm-10">
                          <Form.Label>
                            Final Amount<span style={{ color: 'red' }}>*</span>
                          </Form.Label>

                          <Form.Control
                            type="text"
                            name="final_amount"
                            placeholder="Final Amount"
                            value={repledgeData.final_amount}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Row>
                    </MDBCardBody>
                  </Grid>

                  <br></br>
                </Grid>
              </Container>
            </Card>
          </form>
        </div>
      </div>

      <div style={{ flex: 1, paddingLeft: '1px', display: 'flex' }}>
        <form className="container" onSubmit={handleSubmit}>
          <Card {...responsivePadding}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Form.Label className="mb">
                    <br></br>

                    <h3>
                      <b>Address Details</b>
                    </h3>
                  </Form.Label>

                  <hr className="hori-col-3" />

                  <MDBCardBody>
                    <br />

                    <Row className="mb-2">
                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label>
                          C/O <span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Employee Name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="c"
                          value={repledgeData.c}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formDate" className="col col-sm-6">
                        <Form.Label>
                          Address<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="address"
                          value={repledgeData.address}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formDate" className="col col-sm-6">
                        <Form.Label>
                          Area<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Area"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="area"
                          value={repledgeData.area}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formGridgender" className="col col-sm-6">
                        <Form.Label>
                          Mobile number<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile number"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="mobile_number"
                          value={repledgeData.mobile_number}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <br></br>
                  </MDBCardBody>
                </Grid>
              </Grid>
            </Container>
          </Card>
        </form>
      </div>

      <br></br>

      <br></br>

      <Card>
        <Grid item xs={12}>
          <MDBCardTitle>
            <Form.Label className="mb">
              <br></br>

              <h3>
                <b>Jewel Details</b>
              </h3>
            </Form.Label>

            <hr className="hori-col-3" />
          </MDBCardTitle>

          <br></br>

          <TableContainer component={Paper}>
            <Table className="table table-hover table-bordered" aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>S.No</b>
                  </TableCell>

                  <TableCell>
                    <b>ORNAMENTS TYPE</b>
                  </TableCell>

                  <TableCell>
                    <b>CARAT</b>
                  </TableCell>

                  <TableCell>
                    <b>Count</b>
                  </TableCell>

                  <TableCell>
                    <b>WEIGHT</b>
                  </TableCell>

                  <TableCell>
                    <b>LOAN AMOUNT</b>
                  </TableCell>

                  <TableCell>
                    <b>PAID AMOUNT</b>
                  </TableCell>

                  <TableCell>
                    <b>PAID DATE</b>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="S.No"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="s_no"
                        value={repledgeData.s_no}
                        onChange={handleChange}
                        style={{ minWidth: '75px', height: '38px' }}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ mr: 2 }}>
                      <FormControl className="col col-sm-10">
                        <Form.Group controlId="formGridNominee" className="col col-sm-3">
                          <Form.Select
                            defaultValue="Choose..."
                            className="form-control"
                            name="ornaments_type"
                            placeholder="previous Balance"
                            value={repledgeData.ornaments_type}
                            onChange={handleChange}
                            style={{ minWidth: '120px', height: '38px' }}
                          >
                            <option value="Choose..."></option>

                            <option value="Necklace">Necklace</option>

                            <option value="Bracelet">Bracelet</option>

                            <option value="Bangles">Bangles</option>

                            <option value="Ring">Ring</option>

                            <MenuItem value="Earing">Earing</MenuItem>
                          </Form.Select>
                        </Form.Group>
                      </FormControl>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ mr: 2 }}>
                      <FormControl className="col col-sm-10">
                        <Form.Group controlId="formGridNominee" className="col col-sm-3">
                          <Form.Select
                            defaultValue="Choose..."
                            className="form-control"
                            name="carat"
                            placeholder="previous Balance"
                            value={repledgeData.carat}
                            onChange={handleChange}
                            style={{ minWidth: '150px', height: '38px' }}
                          >
                            <option value="Choose..."></option>

                            <option value="Settlement">Settlement</option>

                            <option value="Partpayment">Partpayment</option>
                          </Form.Select>
                        </Form.Group>
                      </FormControl>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="text"
                        style={{ minWidth: '120px', height: '38px' }}
                        class="form-control"
                        placeholder="Count"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="count"
                        value={repledgeData.count}
                        onChange={handleChange}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>

                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="text"
                        style={{ minWidth: '100px', height: '38px' }}
                        class="form-control"
                        placeholder="Weight"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="weight"
                        value={repledgeData.expire_date2}
                        onChange={handleChange}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>

                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="text"
                        style={{ minWidth: '100px', height: '38px' }}
                        class="form-control"
                        placeholder="Loan Amount"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="loan_amount"
                        value={repledgeData.loan_amount}
                        onChange={handleChange}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>

                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="text"
                        style={{ minWidth: '110px', height: '38px' }}
                        class="form-control"
                        placeholder="Paid Amount"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="paid_amount"
                        value={repledgeData.paid_amount}
                        onChange={handleChange}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>

                  <TableCell>
                    <Form.Group controlId="formGridNominee" className="col col-sm-10">
                      <input
                        type="date"
                        style={{ minWidth: '100px', height: '38px' }}
                        class="form-control"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        name="paid_date"
                        value={repledgeData.paid_date}
                        onChange={handleChange}
                        required
                      />{' '}
                    </Form.Group>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Card>

      <br></br>

      <div>
        <CashDemoination />
      </div>

      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1, paddingLeft: '1px' }}>
          <Grid item xs={1}>
            <br></br>

            <Row className="mb-3">
              <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="me-4 btn btn-success btn-lg btn-block mx-auto d-block my-50">
                  <center>Submit</center>
                </button>
                <br></br>
              </Form.Group>
            </Row>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Customer;
