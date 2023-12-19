import { useEffect, useState } from 'react';

import { Box, Paper } from '@mui/material';
import './TotalCustomer.css';



function Loan() {

  const [loanCount, setLoanCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  useEffect(() => {

    const fetchLoanData = async () => {

      try {

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`); // Replace with your API endpoint

        if (!response.ok) {

          throw new Error('Network response was not ok');

        }



        const data = await response.json();



        // Check if loan data is valid

        if (data && data.loanapprovaldetails && Array.isArray(data.loanapprovaldetails)) {

          const uniqueLoanIds = new Set(data.loanapprovaldetails.map(loan => loan.loan_id));

          setLoanCount(uniqueLoanIds.size);

        } else {

          throw new Error('Invalid API response format');

        }



        setLoading(false); // Set loading to false after successful data fetch

      } catch (error) {

        setError(error.message);

        setLoading(false); // Set loading to false on error

      }

    };



    fetchLoanData();

  }, []);



  return (

    <>

      <Box sx={{ p: 2 }}>
        <Paper
          elevation={8}
          className="dashboard-box"
          sx={{
            p: '3',
            height: '160px',
            width: '230px',
            background: 'radial-gradient( #FF0000, #4B0202)',
          }}
        >
          <br />
          <center><h2 style={{ fontSize: '24px', color: 'white' }} >Total Loans</h2></center>
          <hr />
          <center>

            <h4 style={{ fontFamily: 'Popin', fontSize: '16px' ,color:'white'}}>
              <span style={{ fontFamily: 'Popin', fontSize: '16px', color: 'white' }}>Total Loans:</span>  {loading ? 'Loading...' : error ? 'Error fetching data' : loanCount}</h4>

          </center>

        </Paper>

      </Box>

    </>

  );

}

export default Loan;