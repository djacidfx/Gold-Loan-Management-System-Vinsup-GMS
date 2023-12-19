import { Box, Button, Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import img1 from '../../pages/authentication/auth-forms/Login.png';


export default function Capitalaccount() {

  const printRef = useRef(null);
  const tableRef = useRef(null);

  const printTable = () => {
    const printWindow = window.open('', '_blank');

    printWindow.document.open();

    printWindow.document.write('<html><head><title>Print Table</title></head><body>');

    printWindow.document.write(tableRef.current.outerHTML);

    printWindow.document.write('</body></html>');

    printWindow.document.close();

    printWindow.focus(); // Added to ensure the print dialog appears in some browsers

    printWindow.print();

    printWindow.close();
  };

  function calculateDateDifference(dueDate) {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDifference =currentDate - dueDateObj;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  const [outstandingreports, setOutstandingreports] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('${process.env.REACT_APP_BASE_URL}/api/loanapprovals')
  //     .then((response) => {
  //       const loanApprovalsData = response.data.loanapprovaldetails; // Make sure this matches your backend data structure
  //       setOutstandingreports(loanApprovalsData);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching customer data:', error);
  //     });
  // }, []);
  useEffect(() => {
    // Get the current date on the user's device
    const currentDate = new Date();

    // Fetch data from the API
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`)
      .then((response) => {
        const loanapprovalsData = response.data.loanapprovaldetails;

        // Filter the records where date_ss is past the current date and balance is not zero
        const filteredData = loanapprovalsData.filter((loan) => {
          const dueDate = new Date(loan.date_ss);
          return dueDate < currentDate && loan.balance !== 0;
        });

        return axios.get(`${process.env.REACT_APP_BASE_URL}/api/customers`).then((customerResponse) => {
          const customers = customerResponse.data.customers;

          const customerMap = {};

          customers.forEach((customer) => {
            customerMap[customer.customer_id] = customer.customer_name;
          });

          // Update customerName for filtered records
          filteredData.forEach((loan) => {
            loan.customerName = customerMap[loan.customer_id] || 'Unknown';
          });

          setOutstandingreports(filteredData);
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div>
      <Card style={{height:'200px'}}>
      <Typography variant="subtitle1">
          <br></br>

          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;Overdue Notice Report</h2>
        </Typography>

     
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <br />
            <Box display="flex" alignItems="center">&nbsp;&nbsp;&nbsp;
            <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                style={{ marginRight: 20 }}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Box>
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

                  background: '#f0f0f0'
                }}
              >
               Overdue Notice Report {new Date().toLocaleDateString()}
              </h3>
            </Typography>
          </div>
        <div>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                <TableCell align="center" style={{ borderLeft: '1px solid #000', borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>S.No</TableCell>
        <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>Customer Id</TableCell>
        <TableCell align="center" style={{ borderRight: '1px solid #000' ,borderBottom: '1px solid #000' }}>Loan Id</TableCell>
        <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>Due Date</TableCell>
        <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>No.Of.Days</TableCell>
        <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>Phone Number </TableCell>
        <TableCell align="center"style={{borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {outstandingreports
                  .filter((row) => {
                    if (!fromDate && !endDate) return true; // Show all data if no date range is specified
                    const loanDate = new Date(row.date); // Assuming 'date' is the date field in your data
                    const fromDateObj = fromDate ? new Date(fromDate) : null;
                    const endDateObj = endDate ? new Date(endDate) : null;

                    if (fromDateObj && endDateObj) {
                      return loanDate >= fromDateObj && loanDate <= endDateObj;
                    } else if (fromDateObj) {
                      return loanDate >= fromDateObj;
                    } else if (endDateObj) {
                      return loanDate <= endDateObj;
                    }

                    return false; // Default to not showing the row if no valid date range is specified
                  })
                  .map((row, index) => (
                  <TableRow key={row.customer_id}>
                      <TableCell align="center" style={{borderLeft: '1px solid #000',borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>{index + 1}</TableCell>
          <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000' }}> {row.customerName}({row.customer_id})</TableCell>
          <TableCell align="center" style={{ borderRight: '1px solid #000',borderBottom: '1px solid #000'  }}>{row.loan_id}</TableCell>
          <TableCell align="center" style={{ borderRight: '1px solid #000' ,borderBottom: '1px solid #000' }}>{row.date_ss}</TableCell>
         <TableCell align="center" style={{ borderRight: '1px solid #000', borderBottom: '1px solid #000' }}>
  {calculateDateDifference(row.date_ss)}
</TableCell>
<TableCell align="center" style={{ borderRight: '1px solid #000' ,borderBottom: '1px solid #000' }}>{row.mobile_number}</TableCell>
          <TableCell align="center"style={{ borderBottom: '1px solid #000',borderRight: '1px solid #000'  }}>{row.balance}</TableCell> 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </div>
        </div>

        <div style={{ textAlign: 'center' }}>
         <br></br> 
          <ReactToPrint trigger={() => <Button variant="contained">Print Table</Button>} content={() => printRef.current} />
        </div>
      </div>
    </div>
  );
}
