import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { MDBInput } from 'mdb-react-ui-kit';

import { Button } from '@mui/material';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Furnituredebit = () => {
  const responsivePadding = {
    padding: '20px',

    '@media (max-width: 600px)': {
      padding: '10px'
    },

    '@media (max-width: 400px)': {
      padding: '5px'
    }
  };

  const [furnituredebit, setFurnituredebit] = useState({
    transferfurniture_debit_amount: '',

    transferfurniture_debit_remark: '',

    transferfurniture_debit_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFurnituredebit((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
        if (
          !furnituredebit.transferfurniture_debit_amount ||
          !furnituredebit.transferfurniture_debit_remark ||
          !furnituredebit.transferfurniture_debit_date
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

      .post(`${process.env.REACT_APP_BASE_URL}/api/transferfurnituredebit`, furnituredebit)

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

        setFurnituredebit({
          transferfurniture_debit_amount: '',

          transferfurniture_debit_remark: '',

          transferfurniture_debit_date: ''
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
                    <p>Furniture debit</p>
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transferfurniture_debit_amount"
                      placeholder="debit Amount"
                      value={formatCurrency(furnituredebit.transferfurniture_debit_amount)}
                      onChange={(event) => {
                  
                        handleChange(event);
                  
                        setFurnituredebit({ ...furnituredebit, transferfurniture_debit_amount: unformatCurrency(event.target.value) });
                  
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="text"
                      name="transferfurniture_debit_remark"
                      placeholder="Remarks"
                      value={furnituredebit.transferfurniture_debit_remark}
                      onChange={handleChange}
                    />
                  </TableCell>

                  <TableCell>
                    <MDBInput
                      type="Date"
                      name="transferfurniture_debit_date"
                      value={furnituredebit.transferfurniture_debit_date}
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

export default Furnituredebit;
