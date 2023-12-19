import { useEffect, useState } from 'react';

import { Box, Paper } from '@mui/material';

import './TotalCustomer.css';

import PersonIcon from '@mui/icons-material/Person';

function TotalCustomers() {
  const [customerCount, setCustomerCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/customers`); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if data is an object with a "customers" property (assuming this is the structure)

        if (data && data.customers && Array.isArray(data.customers)) {
          const uniqueCustomerIds = new Set(data.customers.map((customer) => customer.customer_id));

          setCustomerCount(uniqueCustomerIds.size);
        } else {
          throw new Error('Invalid API response format');
        }

        setLoading(false); // Set loading to false after successful data fetch
      } catch (error) {
        setError(error.message);

        setLoading(false); // Set loading to false on error
      }
    };

    fetchCustomerData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <div className="circle">
      <Paper
          elevation={8}
          className="dashboard-box"
          sx={{ p: '3',
          height: '160px',
          width: '230px',
          background: 'radial-gradient( #FF0000, #4B0202)',
           }}
        >
          <br></br>

          <center><h2 style={{  fontSize: '24px',color:'white' }}>Customer List</h2></center>


          <hr />

         

          <center>
          <h4 style={{ fontFamily: 'Popin', fontSize: '16px',color:'white' }}>
              {/* <PersonIcon className="mui-human-icon" />{' '} */}
              <span style={{ fontFamily: 'Popin', fontSize: '16px', color: 'white' }}>Total Customers:</span> {customerCount}
            </h4>
          </center>
        </Paper>
      </div>
    </Box>
  );
}

export default TotalCustomers;