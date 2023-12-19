import { useState } from 'react';

import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { MDBInput } from 'mdb-react-ui-kit';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const BankLoan = () => {
  const [bankData, setBankData] = useState({
    transferbank_debit_amount: '',

    transferbank_debit_remark: '',

    transferbank_debit_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setBankData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!bankData.transferbank_debit_amount || !bankData.transferbank_debit_remark || !bankData.transferbank_debit_date) {
      toast.error('Please fill in all the required fields.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
      });
      return; // Stop submission if validation fails
    }
    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/transferbankdebit`, bankData)

      .then((response) => {
        toast.success('Successfully submitted!', {
          position: 'top-right',
          autoClose: 3000, // Auto close after 3 seconds
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        });
        // Clear the form after successful submission
        setBankData({
          transferbank_debit_amount: '',
          transferbank_debit_remark: '',
          transferbank_debit_date: ''
        });
      })

      .catch((error) => {
        toast.error('Submission failed. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined
        });
      });
  };
  const formatCurrency = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const unformatCurrency = (value) => {
    return value.replace(/,/g, '');
  };
  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <b>Debit Account</b>
                </TableCell>

                <TableCell align="center">
                  <b>Debit Amount</b>
                </TableCell>

                <TableCell align="center">
                  <b>Remarks</b>
                </TableCell>

                <TableCell align="center">
                  <b>Date</b>
                </TableCell>

                <TableCell align="center">
                  <b>Submit</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell align="center">
                  <p>Bank Account</p>
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="transferbank_debit_amount"
                    placeholder="Debit Amount"
                    value={formatCurrency(bankData.transferbank_debit_amount)}
                    onChange={(event) => {
                  
                      handleChange(event);
                
                      setBankData({ ...bankData, transferbank_debit_amount: unformatCurrency(event.target.value) });
                
                    }}
                  />
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="transferbank_debit_remark"
                    placeholder="Remarks"
                    value={bankData.transferbank_debit_remark}
                    onChange={handleChange}
                  />
                </TableCell>

                <TableCell>
                  <MDBInput type="Date" name="transferbank_debit_date" value={bankData.transferbank_debit_date} onChange={handleChange} />
                </TableCell>

                <TableCell align="center">
                  <Button type="submit" variant="contained" color="inherit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <ToastContainer />
      </div>
    </>
  );
};

export default BankLoan;
