import { useState } from 'react';

import { Button } from '@mui/material';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { MDBInput } from 'mdb-react-ui-kit';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Suspencedebit = () => {
  const [suspencedebit, setSuspencedebit] = useState({
    transfersuspence_debit_amount: '',

    transfersuspence_debit_remark: '',

    transfersuspence_debit_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSuspencedebit((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !suspencedebit.transfersuspence_debit_amount ||
      !suspencedebit.transfersuspence_debit_remark ||
      !suspencedebit.transfersuspence_debit_date
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
      .post(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencedebit`, suspencedebit, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then((response) => {
        console.log('Response: ', response);

        toast.success('Successfully submitted!', {
          position: 'top-right',

          autoClose: 2000,

          hideProgressBar: true,

          closeOnClick: true,

          pauseOnHover: false,

          draggable: true,

          progress: undefined
        });

        setSuspencedebit({
          transfersuspence_debit_amount: '',

          transfersuspence_debit_remark: '',

          transfersuspence_debit_date: ''
        });
      })

      .catch((error) => {
        console.error('Error: ', error);

        toast.error('Submission failed. Please try again.', {
          position: 'top-right',

          autoClose: 2000,

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
                    <p>Suspence Debit</p>
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transfersuspence_debit_amount"
                      placeholder="Credit Amount"
                      value={formatCurrency(suspencedebit.transfersuspence_debit_amount)}
                      onChange={(event) => {
                  
                        handleChange(event);
                  
                        setSuspencedebit({ ...suspencedebit, transfersuspence_debit_amount: unformatCurrency(event.target.value) });
                  
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transfersuspence_debit_remark"
                      placeholder="Remarks"
                      value={suspencedebit.transfersuspence_debit_remark}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="Date"
                      name="transfersuspence_debit_date"
                      value={suspencedebit.transfersuspence_debit_date}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell align="center">
                    <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: 'gold' }}>
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

export default Suspencedebit;
