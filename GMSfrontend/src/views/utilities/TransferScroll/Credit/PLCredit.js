import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MDBInput } from 'mdb-react-ui-kit';

import { Button } from '@mui/material';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const PLCredit = () => {
  const responsivePadding = {
    padding: '20px',

    '@media (max-width: 600px)': {
      padding: '10px'
    },

    '@media (max-width: 400px)': {
      padding: '5px'
    }
  };

  const [pLCredit, setPLCredit] = useState({
    transferprofitandloss_credit_amount: '',

    transferprofitandloss_credit_remark: '',

    transferprofitandloss_credit_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPLCredit((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !pLCredit.transferprofitandloss_credit_amount ||
      !pLCredit.transferprofitandloss_credit_remark ||
      !pLCredit.transferprofitandloss_credit_date
    ) {
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

      .post(`${process.env.REACT_APP_BASE_URL}/api/transferprofitandlosscredit`, pLCredit)

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

        setPLCredit({
          transferprofitandloss_credit_amount: '',

          transferprofitandloss_credit_remark: '',

          transferprofitandloss_credit_date: ''
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
        <form className="container" onSubmit={handleSubmit}>
          <TableContainer component={Paper}>
            <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <b>Credit Account</b>
                  </TableCell>

                  <TableCell align="center">
                    <b>Credit Amount</b>
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
                    <p>Profit and Loss Credit</p>
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transferprofitandloss_credit_amount"
                      placeholder="Credit Amount"
                      value={formatCurrency(pLCredit.transferprofitandloss_credit_amount)}
                      onChange={(event) => {
                  
                        handleChange(event);
                  
                        setPLCredit({ ...pLCredit, transferprofitandloss_credit_amount: unformatCurrency(event.target.value) });
                  
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transferprofitandloss_credit_remark"
                      placeholder="Remarks"
                      value={pLCredit.transferprofitandloss_credit_remark}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="Date"
                      name="transferprofitandloss_credit_date"
                      value={pLCredit.transferprofitandloss_credit_date}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} style={{ backgroundColor: 'gold' }}>
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PLCredit;
