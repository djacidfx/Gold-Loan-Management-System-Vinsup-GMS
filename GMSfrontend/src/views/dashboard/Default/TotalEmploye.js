import { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function TotalEmploye() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountData = async () => {
      try {
        // Make an API request to fetch user data
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/user`); // Replace with your API endpoint

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.user) {
          // Count the number of records where user_type is 'admin'
          const adminCount = data.user.filter(user => user.user_type === 'admin').length;
          setCount(adminCount);
        } else {
          throw new Error('Invalid API response format');
        }

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCountData();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <div className="circle">
        <Paper
          elevation={8}
          className="dashboard-box"
          sx={{
            p: '3',
            height: '160px',
            width: '230px',
            background:' linear-gradient( #F87A1F, #FCA829, #ED5F0F)',
          }}
        >
          <br />
          <center>
            <h2 style={{ fontSize: '24px',color: '#9A0101' }}>Total Employee</h2>
          </center>
          <hr />
          <center>
            <h4 style={{ fontFamily: 'Popin', fontSize: '16px',color:'white' }}>
              {/* <PersonIcon className="mui-human-icon" />{' '} */}
              <span style={{ fontFamily: 'Popin', fontSize: '16px', color: '#9A0101' }}>
              Total Admin:
            </span>{' '}
              {count}
            </h4>
          </center>
        </Paper>
      </div>
    </Box>
  );
}

export default TotalEmploye;