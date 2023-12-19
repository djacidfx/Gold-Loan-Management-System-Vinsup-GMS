import { useState } from 'react';
 
import 'bootstrap/dist/css/bootstrap.min.css';
 
import { MDBInput } from 'mdb-react-ui-kit';
 
import { Button } from '@mui/material';
 
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
 
import { FormControl, MenuItem, Select } from '@mui/material';
 
import axios from 'axios';
 
import { ToastContainer, toast } from 'react-toastify';
 
import 'react-toastify/dist/ReactToastify.css';
 
const Expencesdebit = () => {
  const [expencesdebit, setExpencesdebit] = useState({
    transferexpences_debit_amount: '',
    transferexpences_debit_remark: '',
    transferexpences_debit_particular: '',
    transferexpences_debit_date: new Date().toISOString().split('T')[0]
  });
 
  const handleChange = (event) => {
    const { name, value } = event.target;
 
    if (name === 'transferexpences_debit_remark') {
      setExpencesdebit((prevData) => ({
        ...prevData,
        [name]: value,
        transferexpences_debit_particular: value, // Set the same value
      }));
    } else {
      setExpencesdebit((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };
 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
        !expencesdebit.transferexpences_debit_amount ||
        !expencesdebit.transferexpences_debit_remark ||
        !expencesdebit.transferexpences_debit_date
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
 
      .post(`${process.env.REACT_APP_BASE_URL}/api/transferexpencesdebit`, expencesdebit)
 
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
 
        setExpencesdebit({
        transferexpences_debit_amount: '',
 
        transferexpences_debit_remark: '',
 
        transferexpences_debit_date: ''
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
                    <b>debit Account</b>
                  </TableCell>
 
                  <TableCell align="center">
                    <b>debit Amount</b>
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
                    <p>Expences debit</p>
                  </TableCell>
 
                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transferexpences_debit_amount"
                      placeholder="debit Amount"
                      value={formatCurrency(expencesdebit.transferexpences_debit_amount)}
                      onChange={(event) => {
                 
                        handleChange(event);
                 
                        setExpencesdebit({ ...expencesdebit, transferexpences_debit_amount: unformatCurrency(event.target.value) });
                 
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={expencesdebit.transferexpences_debit_remark}
                        name="transferexpences_debit_remark"
                        onChange={handleChange}
                      >
                        <MenuItem value={'Salary'}>Salary</MenuItem>
                        <MenuItem value={'Lighting'}>Lighting</MenuItem>
                        <MenuItem value={'Telephone'}>Telephone</MenuItem>
                        <MenuItem value={'Stationery & Printing'}>Stationery & Printing</MenuItem>
                        <MenuItem value={'Fuel'}>Fuel</MenuItem>
                        <MenuItem value={'Insurance'}>Insurance</MenuItem>
                        <MenuItem value={'Taxes'}>Taxes</MenuItem>
                        <MenuItem value={'Sundries Others'}>Sundries Others</MenuItem>
                        <MenuItem value={'Rent'}>Rent</MenuItem>
                        <MenuItem value={'Depreciation'}>Depreciation</MenuItem>
                        </Select>
                    </FormControl>
                  </TableCell>
                  {/* <TableCell>
                    <MDBInput
                      type="text"
                      name="transferexpences_debit_remark"
                      placeholder="Remarks"
                      value={expencesdebit.transferexpences_debit_remark}
                      onChange={handleChange}
                    />
                  </TableCell> */}
 
                  <TableCell>
                    <MDBInput
                      type="Date"
                      name="transferexpences_debit_date"
                      value={expencesdebit.transferexpences_debit_date}
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
        <ToastContainer/>
      </div>
    </>
  );
};
 
export default Expencesdebit;
 