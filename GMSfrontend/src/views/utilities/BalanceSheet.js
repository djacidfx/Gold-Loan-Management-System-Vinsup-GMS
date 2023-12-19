import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import img1 from './Login.png';

function BalanceSheet() {
  const printRef = useRef(null);
  const tableRef = useRef(null);

 const printTable = () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write('<html><head><title>Print Table</title></head><body>');
  // You should use tableRef.current.outerHTML to get the HTML content of the table.
  printWindow.document.write(tableRef.current.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus(); // Added to ensure the print dialog appears in some browsers
    printWindow.print();
    printWindow.close();
  };
};

  const [dateFilter, setDateFilter] = useState({  endDate: new Date().toISOString().split('T')[0] });
  const [creditRecords, setCreditRecords] = useState([]);
  const [debitRecords, setDebitRecords] = useState([]);
  useEffect(() => {
    console.log('Fetching data...');
    console.log('Selected Date Range:', dateFilter.endDate);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/balancesheets`)
      .then((response) => {
        console.log('Response received:', response);
        const responseData = response.data;
        if (responseData && Array.isArray(responseData.balancesheet)) {
          console.log('Data received:', responseData.balancesheet);
          const records = responseData.balancesheet;
          const filteredRecords = records.filter((record) => {
            const recordDate = new Date(record.date).toDateString();
            const selectedDate = new Date(dateFilter.endDate).toDateString();
            return recordDate === selectedDate;
          });
          console.log('Filtered Records:', filteredRecords);
          const creditRecords = filteredRecords.filter(
            (record) => parseFloat(record.capital_balance) >= 0 || parseFloat(record.profitloss_balance) >= 0
          );
          const debitRecords = filteredRecords.filter(
            (record) =>
              parseFloat(record.cash_balance) >= 0 ||
              parseFloat(record.bank_balance) >= 0 ||
              parseFloat(record.jewel_balance) >= 0 ||
              parseFloat(record.suspence_balance) >= 0 ||
              parseFloat(record.furniture_balance) >= 0
          );
          console.log('Credit Records:', creditRecords);
          console.log('Debit Records:', debitRecords);
          setCreditRecords(creditRecords);
          setDebitRecords(debitRecords);
        } else {
          console.error('Invalid response data:', responseData);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [dateFilter]);

  const calculateTotalCreditBalance = () => {
    let totalBalance = 0;

    creditRecords.forEach((record) => {
      totalBalance += parseFloat(record.capital_balance);
      totalBalance += parseFloat(record.profitloss_balance);
    });

    return totalBalance;
  };

  const calculateTotalDebitBalance = () => {
    let totalBalance = 0;

    debitRecords.forEach((record) => {
      totalBalance += parseFloat(record.cash_balance);
      totalBalance += parseFloat(record.bank_balance);
      totalBalance += parseFloat(record.jewel_balance);
      totalBalance += parseFloat(record.suspence_balance);
      totalBalance += parseFloat(record.furniture_balance);
    });

    return totalBalance;
  };



  const filterRecordsByDate = (records) => {
    if (!dateFilter.endDate) {
      return records;
    }
 
    const selectedDate = new Date(dateFilter.endDate).toDateString();
 
    return records.filter((record) => {
      const recordDate = new Date(record.date).toDateString();
      return recordDate === selectedDate;
    });
  };
 
 

  return (
    <div>


      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Date Filter Inputs */}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Box display="flex" alignItems="center">
     

            <TextField
              label="Date"
              type="date"
              variant="outlined"
              value={dateFilter.endDate}
              onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center' }}>
      <div ref={printRef}>
            <img src={img1} alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
            <Typography variant="subtitle1">
              <h2>VINSUP GMS</h2>

              <h3
                style={{
                  borderBottom: '2px solid #000',

                  padding: '10px',

                  borderRadius: '5px',

                  background: '#f0f0f0'
                }}
              >
               Balance sheet {new Date().toLocaleDateString()}
              </h3>
            </Typography>
         
      <Paper elevation={2} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '450px', marginTop: '2rem' }}>
        <div style={{ display: 'flex' }}>

          {/* Credit Table */}
          <TableContainer style={{ flex: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Date</TableCell> */}
                  <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Particulars</TableCell>
                  <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterRecordsByDate(creditRecords).map((record) => (
                  <React.Fragment key={record.balancesheet_id}>
                    <TableRow>
                      {/* <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Capital A/C</TableCell>
                      <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.capital_balance}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>P&L A/C</TableCell>
                      <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.profitloss_balance}</TableCell>
                    </TableRow>
                 
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Debit Table */}
          <TableContainer style={{ flex: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Date</TableCell> */}
                  <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Particulars</TableCell>
                  <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterRecordsByDate(debitRecords).map((record, index) => (
                  <React.Fragment key={record.balancesheet_id}>
                    <TableRow>
                      {/* <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Cash</TableCell>
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.cash_balance}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Bank</TableCell>
                      <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.bank_balance}</TableCell>
                    </TableRow>
                    <TableRow>
                      {/* <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Jewel</TableCell>
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.jewel_balance}</TableCell>
                    </TableRow>

                    <TableRow>
                      {/* <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                      <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Suspense</TableCell>
                      <TableCell align="center" style={{  borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.suspence_balance}</TableCell>
                    </TableRow>

                    <TableRow>
                        {/* <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>Furniture</TableCell>
                        <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000' }}>{record.furniture_balance}</TableCell>
                      </TableRow>
                  </React.Fragment>
                ))}
                {/* Fill empty space with debit records */}
                {creditRecords.length < debitRecords.length &&
                  debitRecords.slice(creditRecords.length).map((record) => (
                    <React.Fragment key={record.balancesheet_id}>
                      <TableRow>
                        {/* <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell>Cash</TableCell>
                        <TableCell>{record.cash_balance}</TableCell>
                      </TableRow>
                      <TableRow>
                        {/* <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell>Bank</TableCell>
                        <TableCell>{record.bank_balance}</TableCell>
                      </TableRow>
                      <TableRow>
                        {/* <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell>Jewel</TableCell>
                        <TableCell>{record.jewel_balance}</TableCell>
                      </TableRow>

                      <TableRow>
                        {/* <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell>Suspense</TableCell>
                        <TableCell>{record.suspence_balance}</TableCell>
                      </TableRow>
                     
                      <TableRow>
                        {/* <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell> */}
                        <TableCell>Furniture</TableCell>
                        <TableCell>{record.furniture_balance}</TableCell>
                      </TableRow>

         
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between',marginTop: '50px' }}>
          <div style={{ textAlign: 'center', flex: 1, marginRight: '1rem' }}>
            <strong>Total Balance:</strong> {calculateTotalCreditBalance()}
          </div>
          <div style={{ textAlign: 'center', flex: 1, marginLeft: '1rem' }}>
            <strong>Total Balance:</strong> {calculateTotalDebitBalance()}
          </div>
        </div>
       
        <div style={{ textAlign: 'center' }}>
         
         <br></br>
          <ReactToPrint trigger={() => <Button variant="contained">Print Table</Button>} content={() => printRef.current} />
        </div>

       
      </Paper>
      </div>
    </div>
    </div>
   
  );
}

export default BalanceSheet;