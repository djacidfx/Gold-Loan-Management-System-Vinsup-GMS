import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import ReactToPrint from 'react-to-print';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { TextField } from '@mui/material';

import Card from '@mui/material/Card';

import { makeStyles } from '@mui/styles';


import img1 from '../../pages/authentication/auth-forms/Login.png';

const style = {
  position: 'absolute',

  top: '50%',

  left: '50%',

  transform: 'translate(-50%, -50%)',

  width: 600,

  bgcolor: 'background.paper',

  border: '1px solid #000',

  boxShadow: 24,

  p: 4
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,

    '& .MuiTableCell-root': {
      border: '1px solid black'
    }
  },

  firstCell: {
    paddingcenter: '40px'
  },

  lastCell: {
    paddingLeft: '40px'
  }
});

const tableContainerStyle = {
  maxWidth: '600px', // Set your desired maximum width

  maxHeight: '200px', // Set your desired maximum height

  overflow: 'auto'

  // Enable scrolling if the table exceeds the maximum dimensions
};

const tableStyle = {
  width: '100%' // Make the table take the full width available within the TableContainer
};

export default function Furniture() {
  const [furniture, setFurniture] = useState({
    date: new Date().toISOString().split('T')[0],

    receipt: '',

    amount: '',

    remarks: '',

    //credit denomination

    fc_name1: '500',

    fc_count500: '0',

    fc_total1: '',

    fc_name2: '200',

    fc_count200: '0',

    fc_total2: '',

    fc_name3: '100',

    fc_count100: '0',

    fc_total3: '',

    fc_name4: '50',

    fc_count50: '0',

    fc_total4: '',

    fc_name5: '20',

    fc_count20: '0',

    fc_total5: '',

    fc_name6: '10',

    fc_count10: '0',

    fc_total6: '',

    fc_name7: '5',

    fc_count5: '0',

    fc_total7: '',

    fc_name8: '2',

    fc_count2: '0',

    fc_total8: '',

    fc_name9: '1',

    fc_count1: '0',

    fc_total9: '',

    //debit denomination

    fd_name1: '500',

    fd_count500: '0',

    fd_total1: '',

    fd_name2: '200',

    fd_count200: '0',

    fd_total2: '',

    fd_name3: '100',

    fd_count100: '0',

    fd_total3: '',

    fd_name4: '50',

    fd_count50: '0',

    fd_total4: '',

    fd_name5: '20',

    fd_count20: '0',

    fd_total5: '',

    fd_name6: '10',

    fd_count10: '0',

    fd_total6: '',

    fd_name7: '5',

    fd_count5: '0',

    fd_total7: '',

    fd_name8: '2',

    fd_count2: '0',

    fd_total8: '',

    fd_name9: '1',

    fd_count1: '0',

    fd_total9: ''
  });

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const printRef = useRef(null);

  const tableRef = useRef(null);

  const [isTally, setIsTally] = useState(false);

  const [records, setRecords] = useState([]);

  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [dateFilter, setDateFilter] = useState({
    startDate: new Date().toISOString().split('T')[0],

    endDate: new Date().toISOString().split('T')[0],
  });

  //tally

  const handleAmountChange = (event) => {
    // Handle the amount input change here

    const updatedfurniture = { ...furniture, amount: event.target.value };

    setFurniture(updatedfurniture);
  };

  const [refresh, setRefresh] = useState(false);

  const [whole1Total, setWhole1Total] = useState(0);

  const [action, setAction] = useState('debit'); // 'debit' or 'credit'

  const classes = useStyles();

  const [debouncedRecords, setDebouncedRecords] = useState([]);
  const excessValue = whole1Total - parseFloat(furniture.amount);
  useEffect(() => {
    let debounceTimeout;

    const fetchRecords = async () => {
      try {
        const [debitsRes, creditsRes, transferCreditRes, transferDebitRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/furnituredebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/furniturecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferfurniturecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferfurnituredebits`)
        ]);

        const debitsData = (debitsRes.data.furnituredebit || []).map((record) => ({
          ...record,

          receipt: 'FUD-' + record.furniture_debit_receipt_no
        }));

        const creditsData = (creditsRes.data.furniturecredit || []).map((record) => ({
          ...record,

          receipt: 'FUC-' + record.furniture_credit_receipt_no
        }));

        const transferCreditsData = (transferCreditRes.data.transferfurniturecredit || []).map((record) => ({
          ...record,

          receipt: 'TFUC-' + record.transferfurniturecredit_receipt_id
        }));

        const transferDebitsData = (transferDebitRes.data.transferfurnituredebit || []).map((record) => ({
          ...record,

          receipt: 'TFUD-' + record.transferfurnituredebit_receipt_id
        }));

        const mergedData = [...debitsData, ...creditsData, ...transferCreditsData, ...transferDebitsData].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        // Update the records after fetching

        setRecords(mergedData);

        // Clear the previous debounce timeout and set a new one

        clearTimeout(debounceTimeout);

        debounceTimeout = setTimeout(() => {
          processDebouncedRecords(mergedData);
        }, 1000); // Adjust the debounce interval as needed (e.g., 1000ms)
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();

    // Cleanup function to clear the debounce timeout if component unmounts

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, []);

  const processDebouncedRecords = (debouncedRecords) => {
    let balance = 0;

    const recordsWithBalance = debouncedRecords.map((record) => {
      const debitAmount = parseFloat(record.furniture_debit_amount || record.transferfurniture_debit_amount || 0);

      const creditAmount = parseFloat(record.furniture_credit_amount || record.transferfurniture_credit_amount || 0);

      balance += debitAmount - creditAmount;

      return { ...record, balance };
    });

    setRecords(recordsWithBalance);
  };

  const filterRecordsByDate = (records) => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      return records;
    }

    return records.filter((record) => {
      const date =
        'furniture_debit_date' in record
          ? record.furniture_debit_date
          : 'furniture_credit_date' in record
          ? record.furniture_credit_date
          : 'transferfurniture_credit_date' in record
          ? record.transferfurniture_credit_date
          : 'transferfurniture_debit_date' in record
          ? record.transferfurniture_debit_date
          : '';

      return new Date(date) >= new Date(dateFilter.startDate) && new Date(date) <= new Date(dateFilter.endDate);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFurniture((prevfurniture) => ({
      ...prevfurniture,

      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      let newRecord;

      let res;

      // Determine the prefix based on the action

      const prefix = action === 'credit' ? 'FUC-' : 'FUD-';

      const receiptNumberField = action === 'credit' ? 'furniture_credit_receipt_no' : 'furniture_debit_receipt_no';

      const receiptNumber = prefix + (records.length + 1); // Generate receipt number

      if (action === 'debit') {
        newRecord = {
          furniture_debit_date: furniture.date,

          furniture_debit_remark: furniture.remarks,

          furniture_debit_amount: furniture.amount,

          furniture_debit_receipt_no: receiptNumber,

          fd_count500: furniture.count500,

          fd_count200: furniture.count200,

          fd_count100: furniture.count100,

          fd_count50: furniture.count50,

          fd_count20: furniture.count20,

          fd_count10: furniture.count10,

          fd_count5: furniture.count5,

          fd_count2: furniture.count2,

          fd_count1: furniture.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/furnituredebit`, newRecord);
      } else {
        newRecord = {
          furniture_credit_date: furniture.date,

          furniture_credit_remark: furniture.remarks,

          furniture_credit_amount: furniture.amount,

          furniture_credit_receipt_no: receiptNumber,

          fc_count500: furniture.count500,

          fc_count200: furniture.count200,

          fc_count100: furniture.count100,

          fc_count50: furniture.count50,

          fc_count20: furniture.count20,

          fc_count10: furniture.count10,

          fc_count5: furniture.count5,

          fc_count2: furniture.count2,

          fc_count1: furniture.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/furniturecredit`, newRecord);
      }

      // ...
    } catch (error) {
      console.error('Error:', error);
    }

    setLoading(false);
  };

  const handleOpen = (selectedAction) => {
    setAction(selectedAction);

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const sortedRecords = filterRecordsByDate([...records]).sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.created_at);

    const dateB = new Date(b.date + ' ' + b.created_at);

    return dateA - dateB;
  });

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

  //cash denomination credit

  const handleCountChange = (event) => {
    const { name, value } = event.target;

    const index = parseInt(name.replace('fc_count', ''), 10);

    setFurniture((prevData) => ({
      ...prevData,

      [`fc_count${index}`]: value,

      [`fc_total${index}`]: (parseFloat(value) * prevData[`fc_name${index}`]).toFixed(2)
    }));
  };

  useEffect(() => {
    const calculateTotals = () => {
      const fc_total1 = parseFloat(furniture.fc_count500) * furniture.fc_name1;

      const fc_total2 = parseFloat(furniture.fc_count200) * furniture.fc_name2;

      const fc_total3 = parseFloat(furniture.fc_count100) * furniture.fc_name3; // Calculate other totals similarly

      const fc_total4 = parseFloat(furniture.fc_count50) * furniture.fc_name4;

      const fc_total5 = parseFloat(furniture.fc_count20) * furniture.fc_name5;

      const fc_total6 = parseFloat(furniture.fc_count10) * furniture.fc_name6;

      const fc_total7 = parseFloat(furniture.fc_count5) * furniture.fc_name7;

      const fc_total8 = parseFloat(furniture.fc_count2) * furniture.fc_name8;

      const fc_total9 = parseFloat(furniture.fc_count1) * furniture.fc_name9;

      setFurniture((prevData) => ({
        ...prevData,

        fc_total1: fc_total1.toFixed(2),

        fc_total2: fc_total2.toFixed(2),

        fc_total3: fc_total3.toFixed(2),

        fc_total4: fc_total4.toFixed(2),

        fc_total5: fc_total5.toFixed(2),

        fc_total6: fc_total6.toFixed(2),

        fc_total7: fc_total7.toFixed(2),

        fc_total8: fc_total8.toFixed(2),

        fc_total9: fc_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        fc_total1 +
        fc_total2 +
        fc_total3 +
        fc_total4 +
        fc_total5 +
        fc_total6 +
        fc_total7 +
        fc_total8 +
        fc_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    furniture.fc_name1,

    furniture.fc_count500,

    furniture.fc_name2,

    furniture.fc_count200,

    furniture.fc_name3,

    furniture.fc_count100,

    furniture.fc_name4,

    furniture.fc_count50,

    furniture.fc_name5,

    furniture.fc_count20,

    furniture.fc_name6,

    furniture.fc_count10,

    furniture.fc_name7,

    furniture.fc_count5,

    furniture.fc_name8,

    furniture.fc_count2,

    furniture.fc_name9,

    furniture.fc_count1
  ]);

  //debit denomination

  const handleCount1Change = (event) => {
    const { name, value } = event.target;

    const index = parseInt(name.replace('fd_count', ''), 10);

    setFurniture((prevData) => ({
      ...prevData,

      [`fd_count${index}`]: value,

      [`fd_total${index}`]: (parseFloat(value) * prevData[`fd_name${index}`]).toFixed(2)
    }));
  };

  const calculateTotals = (prefix, furnitureData) => {
    let sum = 0;

    for (let i = 1; i <= 9; i++) {
      const count = parseFloat(furnitureData[`${prefix}_count${i}`]);

      const name = parseFloat(furnitureData[`${prefix}_name${i}`]);

      const total = count * name;

      furnitureData[`${prefix}_total${i}`] = total.toFixed(2);

      sum += total;
    }

    return sum.toFixed(2);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const fd_total1 = parseFloat(furniture.fd_count500) * furniture.fd_name1;

      const fd_total2 = parseFloat(furniture.fd_count200) * furniture.fd_name2;

      const fd_total3 = parseFloat(furniture.fd_count100) * furniture.fd_name3; // Calculate other totals similarly

      const fd_total4 = parseFloat(furniture.fd_count50) * furniture.fd_name4;

      const fd_total5 = parseFloat(furniture.fd_count20) * furniture.fd_name5;

      const fd_total6 = parseFloat(furniture.fd_count10) * furniture.fd_name6;

      const fd_total7 = parseFloat(furniture.fd_count5) * furniture.fd_name7;

      const fd_total8 = parseFloat(furniture.fd_count2) * furniture.fd_name8;

      const fd_total9 = parseFloat(furniture.fd_count1) * furniture.fd_name9;

      setFurniture((prevData) => ({
        ...prevData,

        fd_total1: fd_total1.toFixed(2),

        fd_total2: fd_total2.toFixed(2),

        fd_total3: fd_total3.toFixed(2),

        fd_total4: fd_total4.toFixed(2),

        fd_total5: fd_total5.toFixed(2),

        fd_total6: fd_total6.toFixed(2),

        fd_total7: fd_total7.toFixed(2),

        fd_total8: fd_total8.toFixed(2),

        fd_total9: fd_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        fd_total1 +
        fd_total2 +
        fd_total3 +
        fd_total4 +
        fd_total5 +
        fd_total6 +
        fd_total7 +
        fd_total8 +
        fd_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    furniture.fd_name1,

    furniture.fd_count500,

    furniture.fd_name2,

    furniture.fd_count200,

    furniture.fd_name3,

    furniture.fd_count100,

    furniture.fd_name4,

    furniture.fd_count50,

    furniture.fd_name5,

    furniture.fd_count20,

    furniture.fd_name6,

    furniture.fd_count10,

    furniture.fd_name7,

    furniture.fd_count5,

    furniture.fd_name8,

    furniture.fd_count2,

    furniture.fd_name9,

    furniture.fd_count1
  ]);
  const formatCurrency = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const unformatCurrency = (value) => {
    return value.replace(/,/g, '');
  };

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

          fontSize: 15
        }}
      >
        <Typography variant="subtitle1">
          <br></br>

          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;Furniture Account</h2>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Date Filter Inputs */}

            <br></br>

            <Box display="flex" alignItems="center">
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                style={{ marginRight: 20 }} // Add some margin to the right of the Start Date field
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
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={() => handleOpen('debit')}>
                Debit
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={() => handleOpen('credit')}>
                Credit
              </Button>
            </div>

            <br></br>
          </Grid>
        </Grid>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '3rem' }}>
            <h1>{action === 'debit' ? 'Debit Account' : 'Credit Account'}</h1>

            <hr />
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                Date:
                <TextField type="date" name="date" value={furniture.date} onChange={handleChange}required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                Amount:
                <TextField
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={formatCurrency(furniture.amount)}
                  onChange={(event) => {
                    handleChange(event);

                    setFurniture({ ...furniture, amount: unformatCurrency(event.target.value) });
                  }}required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                Remarks:
                <TextField type="text" placeholder="Remarks" name="remarks" value={furniture.remarks} onChange={handleChange}required fullWidth />
              </Grid>
            </Grid>

            <br />

            <TableContainer component={Paper} style={tableContainerStyle}>
              <Table style={tableStyle}>
                <TableBody>
                  <TableHead></TableHead>

                  <TableRow>
                    <b>Cash Denomination</b>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name1" readOnly value={furniture.fc_name1} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count500"
                        value={furniture.count500}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total1" readOnly value={furniture.fc_total1} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name2" readOnly value={furniture.fc_name2} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count200"
                        value={furniture.count200}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total2" readOnly value={furniture.fc_total2} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name3" readOnly value={furniture.fc_name3} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count100"
                        value={furniture.count100}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total3" readOnly value={furniture.fc_total3} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name4" readOnly value={furniture.fc_name4} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count50"
                        value={furniture.count50}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total4" readOnly value={furniture.fc_total4} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name5" readOnly value={furniture.fc_name5} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count20"
                        value={furniture.count20}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total5" readOnly value={furniture.fc_total5} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name6" readOnly value={furniture.fc_name6} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="fc_count10"
                        value={furniture.fc_count10}
                        style={{ width: '60px' }}
                        onChange={handleCountChange}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total6" readOnly value={furniture.fc_total6} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name7" readOnly value={furniture.fc_name7} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_count5" value={furniture.count5} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total7" readOnly value={furniture.fc_total7} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name8" readOnly value={furniture.fc_name8} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_count2" value={furniture.count2} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total8" readOnly value={furniture.fc_total8} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="fc_name9" readOnly style={{ width: '60px' }} value={furniture.fc_name9} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_count1" value={furniture.count1} style={{ width: '60px' }} onChange={handleCountChange} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="fc_total9" readOnly value={furniture.fc_total9} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Whole Total:</TableCell>

                    <TableCell></TableCell>

                    <TableCell>{whole1Total}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Excess:</TableCell>

                    <TableCell></TableCell>

                    <TableCell>{excessValue}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Button onClick={handleRefreshClick} disabled={excessValue > 0 || excessValue < 0} type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

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
                Furniture Account {new Date().toLocaleDateString()}
              </h3>
            </Typography>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Date</TableCell>

                  <TableCell align="center">Receipt</TableCell>

                  <TableCell align="center">Particulars</TableCell>

                  <TableCell align="center">Debit</TableCell>

                  <TableCell align="center">Credit</TableCell>

                  <TableCell align="center">Balance</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedRecords.map((record, index, array) => {
                  const isDebitRecord = 'furniture_debit_amount' in record || 'transferfurniture_debit_amount' in record;

                  const debitAmount = isDebitRecord ? Number(record.furniture_debit_amount || record.transferfurniture_debit_amount) : 0;

                  const creditAmount = isDebitRecord ? 0 : Number(record.furniture_credit_amount || record.transferfurniture_credit_amount);

                  const date = isDebitRecord
                    ? record.furniture_debit_date || record.transferfurniture_debit_date
                    : record.furniture_credit_date || record.transferfurniture_credit_date || record.furniture_debit_date || '';

                  const remarks = isDebitRecord
                    ? record.furniture_debit_remark || record.transferfurniture_debit_remark
                    : record.furniture_credit_remark || record.transferfurniture_credit_remark || record.furniture_debit_remark || '';

                  const balance = record.balance;

                  const checkAndSendPostRequest = async (postData, getApiEndpoint, postApiEndpoint, receipt) => {
                    try {
                      console.log('Starting checkAndSendPostRequest...');
                      const fetchedReceipt = receipt.toLowerCase();
                      console.log('Fetched receipt (lowercase):', fetchedReceipt);

                      // Check if the receipt already exists in the database
                      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${getApiEndpoint}?receipt=${fetchedReceipt}`);
                      console.log(`Fetch request to ${getApiEndpoint} status:`, response.status);

                      if (!response.ok) {
                        throw new Error(`Error fetching data from ${getApiEndpoint}: ${response.statusText}`);
                      }

                      const data = await response.json();
                      console.log(`Fetched records from ${getApiEndpoint}:`, data);

                      // Check if capitalcreditdb or capitaldebitdb exists before mapping
                      const lowerCaseData = data.furniturecreditdb
                        ? data.furniturecreditdb.map((record) => ({
                            ...record,
                            furniture_credit_receipt: record.furniture_credit_receipt.toLowerCase()
                          }))
                        : [];

                      const lowerCaseDataDebit = data.furnituredebitdb
                        ? data.furnituredebitdb.map((record) => ({
                            ...record,
                            furniture_debit_receipt: record.furniture_debit_receipt.toLowerCase()
                          }))
                        : [];

                      console.log('Lowercased credit records:', lowerCaseData);
                      console.log('Lowercased debit records:', lowerCaseDataDebit);

                      // Check if capital_credit_receipt or capital_debit_receipt exists before insertion
                      if (
                        lowerCaseData.some((record) => record.furniture_credit_receipt === fetchedReceipt) ||
                        lowerCaseDataDebit.some((record) => record.furniture_debit_receipt === fetchedReceipt)
                      ) {
                        console.log(`Receipt ${fetchedReceipt} already exists in the database. Skipping insertion.`);
                      } else {
                        console.log('Receipt does not exist in the database. Proceeding with insertion...');

                        // Use the appropriate data for credit or debit
                        const postDataResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${postApiEndpoint}`, {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(postData)
                        });

                        console.log(`POST request to ${postApiEndpoint} status:`, postDataResponse.status);

                        if (!postDataResponse.ok) {
                          throw new Error(`Error inserting data into ${postApiEndpoint}: ${postDataResponse.statusText}`);
                        }

                        const insertedData = await postDataResponse.json();
                        console.log('Data inserted:', insertedData);
                      }
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  };

                  // ... (Usage examples for creditAmount and debitAmount)

                  // Usage example for creditAmount
                  if (creditAmount !== 0) {
                    const creditPostData = {
                      furniture_credit_date: date,
                      furniture_credit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      furniture_credit_particular: remarks,
                      furniture_credit_amount: creditAmount
                    };

                    console.log('Credit Post Data:', creditPostData);

                    checkAndSendPostRequest(creditPostData, 'furniturecreditdbs', 'furniturecreditdb', creditPostData.furniture_credit_receipt);
                  }

                  // Usage example for debitAmount
                  if (debitAmount !== 0) {
                    const debitPostData = {
                      furniture_debit_date: date,
                      furniture_debit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      furniture_debit_particular: remarks,
                      furniture_debit_amount: debitAmount
                    };

                    console.log('Debit Post Data:', debitPostData);

                    checkAndSendPostRequest(debitPostData, 'furnituredebitdbs', 'furnituredebitdb', debitPostData.furniture_debit_receipt);
                  }

                  if (index === array.length - 1) {
                    const lastBalance = balance;

                    if (lastBalance !== null && lastBalance !== undefined) {
                      const currentDate = new Date().toISOString().split('T')[0];

                      const putApiEndpoint = `${process.env.REACT_APP_BASE_URL}/api/balancesheets/date?date=${currentDate}`;

                      const putData = {
                        furniture_balance: lastBalance
                      };

                      fetch(putApiEndpoint, {
                        method: 'PUT',

                        headers: {
                          'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(putData)
                      })
                        .then((response) => response.json())

                        .then((data) => {
                          console.log('Balance updated:', data);
                        })

                        .catch((error) => {
                          console.error('Error updating balance:', error);
                        });
                    }
                  }

                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{date}</TableCell>

                      <TableCell align="center">{record.receipt}</TableCell>

                      <TableCell align="center">{remarks}</TableCell>

                      <TableCell align="center">{debitAmount}</TableCell>

                      <TableCell align="center">{creditAmount}</TableCell>

                      <TableCell align="center">{balance}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div style={{ textAlign: 'center' }}>
          <br></br>

          <ReactToPrint trigger={() => <Button variant="contained">Print Table</Button>} content={() => printRef.current} />
        </div>
      </div>
    </div>
  );
}
