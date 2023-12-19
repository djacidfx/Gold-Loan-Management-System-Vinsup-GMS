import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Suspencecredit = () => {
  const [suspencecredit, setSuspencecredit] = useState({
    transfersuspence_credit_amount: '',

    transfersuspence_credit_remark: '',

    transfersuspence_credit_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSuspencecredit((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !suspencecredit.transfersuspence_credit_amount ||
      !suspencecredit.transfersuspence_credit_remark ||
      !suspencecredit.transfersuspence_credit_date
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

      .post(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencecredit`, suspencecredit)

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
  
          setSuspencecredit({
            transfersuspence_credit_amount: '',
  
            transfersuspence_credit_remark: '',
  
            transfersuspence_credit_date: ''
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
                    <p>Suspence Credit</p>
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transfersuspence_credit_amount"
                      placeholder="Credit Amount"
                      value={formatCurrency(suspencecredit.transfersuspence_credit_amount)}
                      onChange={(event) => {
                  
                        handleChange(event);
                  
                        setSuspencecredit({ ...suspencecredit, transfersuspence_credit_amount: unformatCurrency(event.target.value) });
                  
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transfersuspence_credit_remark"
                      placeholder="Remarks"
                      value={suspencecredit.transfersuspence_credit_remark}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="Date"
                      name="transfersuspence_credit_date"
                      value={suspencecredit.transfersuspence_credit_date}
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
      </div>
    </>
  );
};

export default Suspencecredit;
