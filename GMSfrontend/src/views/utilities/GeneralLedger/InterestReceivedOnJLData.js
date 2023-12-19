import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import img1 from '../../pages/authentication/auth-forms/Login.png';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& .MuiTableCell-root': {
      border: '1px solid black',
    },
  },
});

export default function InterestReceivedonJLData() {
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const [interestRes, setInterestRes] = useState([]);
  const classes = useStyles();
  const printRef = useRef(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const [partpaymentResponse, settlementResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/partpayments`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlements`),
        ]);

        const partpaymentData = (partpaymentResponse.data.partpayment || []).map((record) => ({
          date1: record.date1,
          paid_interest: record.paid_interest,
          receipt: 'PL-' + record.loan_id,
          partpayment_id: record.partpayment_id,
        }));

        const settlementData = (settlementResponse.data.settlement || []).map((record) => ({
          date1: record.date,
          paid_interest: record.interest1,
          receipt: 'SL-' + record.loan_id,
          settlement_id: record.settlement_id,
        }));

        // Merge the data from both endpoints
        const mergedData = [...partpaymentData, ...settlementData];

        setInterestRes(mergedData);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <Card
        sx={{
          w: 470,
          ml: 1,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.1000'),
          border: '1px solid',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
          borderRadius: 2,
          margin: '10',
          fontSize: 15,
        }}
      >
        <Typography variant="subtitle1">
          <br />
          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp; Interest Received on JL </h2>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Date Filter Inputs */}
            <br />
            <Box display="flex" alignItems="center">
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                style={{ marginRight: 20 }}
              />
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <br></br>
          </Grid>
        </Grid>
      </Card>
      <div style={{ border: '2px solid #000', borderRadius: '5px', padding: '20px', margin: '10px' }}>
        <div ref={printRef}>
          <div style={{ textAlign: 'center' }}>
            <img src={img1} alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />

            <Typography variant="subtitle1">
              <h2>VINSUP GMS</h2>

              <h3
                style={{
                  borderBottom: '2px solid #000',
                  padding: '10px',
                  borderRadius: '5px',
                  background: '#f0f0f0',
                }}
              >
                Interest Received on JL {new Date().toLocaleDateString()}
              </h3>
            </Typography>
          </div>

          <TableContainer component={Paper} align="center">
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">Receipt</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Interest</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {interestRes
  .filter((record) => {
    // Parse date strings to Date objects
    const recordDate = new Date(record.date1);
    const startDate = new Date(dateFilter.startDate);
    const endDate = new Date(dateFilter.endDate);

    // Check if the record date is within the selected date range
    return (
      (!dateFilter.startDate || recordDate >= startDate) &&
      (!dateFilter.endDate || recordDate <= endDate)
    );
  })
  .map((record, index) => {
    return (
      <TableRow key={index}>
        <TableCell align="center">{record.partpayment_id || record.settlement_id}</TableCell>
        <TableCell align="center">{record.receipt}</TableCell>
        <TableCell align="center">{record.date1}</TableCell>
        <TableCell align="center">{record.paid_interest}</TableCell>
      </TableRow>
    );
  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
