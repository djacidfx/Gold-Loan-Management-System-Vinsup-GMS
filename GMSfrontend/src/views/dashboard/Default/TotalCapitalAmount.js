import { Box, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import './TotalCustomer.css';

function TotalCapitalAmount() {
  const [capitalAmount, setCapitalAmount] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCapitalData = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/balancesheets`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Extract capital_balance from the API response
    if (data && data.balancesheet && data.balancesheet.length > 0) {
      const capitalBalance = data.balancesheet[0].capital_balance;
      if (capitalBalance !== undefined) {
        setCapitalAmount(capitalBalance);
      } else {
        throw new Error('Invalid API response format: capital_balance not found');
      }
    } else {
      throw new Error('Invalid API response format');
    }

    setLoading(false);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={8}
        className="dashboard-box"
        sx={{ p: '3',
        height: '160px',
        width: '230px',
          backgroundColor: '#9A0101', color: 'white' }}
      >
        <br></br>
        <center> <h2 style={{  fontSize: '24px' }}>Total Capital Amount</h2></center>
        <hr />
        <br />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : capitalAmount === '0' ? (
          <center>
           <h4 style={{ fontFamily: 'Popin', fontSize: '16px', color: '#9A0101' }}>
              No Data Available
            </h4>
          </center>
        ) : (
          <center>
           <h4 style={{ fontFamily: 'Popin', fontSize: '16px' }}>
           <span style={{ fontFamily: 'Popin', fontSize: '16px', color: '#9A0101' }}>Total Capital Amount: {capitalAmount}</span>
            </h4>
          </center>
        )}
      </Paper>
    </Box>
  );
}

export default TotalCapitalAmount;


