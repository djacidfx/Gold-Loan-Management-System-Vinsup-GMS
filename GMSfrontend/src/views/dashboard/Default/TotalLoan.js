import { Box, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

function TotalLoan({ onLoanCountChange }) {
  const [loans, setLoans] = useState([]);
  const [activeLoanCount, setActiveLoanCount] = useState(0);
  const [closedLoanCount, setClosedLoanCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`)
      .then((response) => {
        const loanapprovalsData = response.data.loanapprovaldetails;

        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/customers`)
          .then((customerResponse) => {
            const customers = customerResponse.data.customers;

            const customerMap = {};

            customers.forEach((customer) => {
              customerMap[customer.customer_id] = customer.customer_name;
            });

            loanapprovalsData.forEach((loan) => {
              loan.customerName = customerMap[loan.customer_id] || 'Unknown';
            });

            setLoans(loanapprovalsData);

            // Calculate active and closed loan counts
            const activeCount = loanapprovalsData.filter((loan) => loan.balance > 0).length;
            setActiveLoanCount(activeCount);
            setClosedLoanCount(loanapprovalsData.length - activeCount);

            // Pass the counts to the parent component
            onLoanCountChange(activeCount, loanapprovalsData.length - activeCount);
          })
          .catch((error) => {
            console.error('Error fetching customer data:', error);
            setError('Error fetching customer data');
          });
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error);
        setError('Error fetching loan data');
      });
  }, [onLoanCountChange]);

  return (
    <Box sx={{ p: 2 }}>
     <Paper
        elevation={8}
        className="dashboard-box"
        sx={{
          p: '3',
          height: '160px',
            width: '230px',
            background:' linear-gradient( #F87A1F, #FCA829, #ED5F0F)',
          color: 'white',
        }}
      >
        <br/>
        <center><h2 style={{  fontSize: '24px',color: '#9A0101' }}>Loan Details</h2></center>
        <hr />
        <center>
          <h4 style={{ fontFamily: 'Popin', fontSize: '16px' }}>
            <span style={{ fontFamily: 'Popin', fontSize: '16px', color: '#9A0101' }}>
              Total Active Loans:
            </span>{' '}
            {activeLoanCount}
          </h4>

          <h4 style={{ fontFamily: 'Popin', fontSize: '16px' }}>
            <span style={{ fontFamily: 'Popin', fontSize: '16px', color: '#9A0101' }}>
              Total Closed Loans:
            </span>{' '}
            {closedLoanCount}
          </h4>
        </center>
      </Paper>
    </Box>
  );
}

export default TotalLoan;
