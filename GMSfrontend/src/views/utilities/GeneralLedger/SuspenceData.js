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

export default function SuspenceData() {
  const [suspence, setSuspence] = useState({
    date: new Date().toISOString().split('T')[0],

    receipt: '',

    amount: '',

    remarks: '',

    //credit denomination

    bc_name1: '500',

    bc_count500: '0',

    bc_total1: '',

    bc_name2: '200',

    bc_count200: '0',

    bc_total2: '',

    bc_name3: '100',

    bc_count100: '0',

    bc_total3: '',

    bc_name4: '50',

    bc_count50: '0',

    bc_total4: '',

    bc_name5: '20',

    bc_count20: '0',

    bc_total5: '',

    bc_name6: '10',

    bc_count10: '0',

    bc_total6: '',

    bc_name7: '5',

    bc_count5: '0',

    bc_total7: '',

    bc_name8: '2',

    bc_count2: '0',

    bc_total8: '',

    bc_name9: '1',

    bc_count1: '0',

    bc_total9: '',

    //debit denomination

    bd_name1: '500',

    bd_count500: '0',

    bd_total1: '',

    bd_name2: '200',

    bd_count200: '0',

    bd_total2: '',

    bd_name3: '100',

    bd_count100: '0',

    bd_total3: '',

    bd_name4: '50',

    bd_count50: '0',

    bd_total4: '',

    bd_name5: '20',

    bd_count20: '0',

    bd_total5: '',

    bd_name6: '10',

    bd_count10: '0',

    bd_total6: '',

    bd_name7: '5',

    bd_count5: '0',

    bd_total7: '',

    bd_name8: '2',

    bd_count2: '0',

    bd_total8: '',

    bd_name9: '1',

    bd_count1: '0',

    bd_total9: ''
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

    const updatedsuspence = { ...suspence, amount: event.target.value };

    setSuspence(updatedsuspence);
  };

  const [refresh, setRefresh] = useState(false);

  const [whole1Total, setWhole1Total] = useState(0);

  const [action, setAction] = useState('debit'); // 'debit' or 'credit'

  const classes = useStyles();

  const [debouncedRecords, setDebouncedRecords] = useState([]);

  useEffect(() => {
    let debounceTimeout;

    const fetchRecords = async () => {
      try {
        const [debitsRes, creditsRes, transferCreditRes, transferDebitRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/suspencedebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/suspencecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencedebits`)
        ]);

        const debitsData = (debitsRes.data.suspencedebit || []).map((record) => ({
          ...record,

          receipt: 'SUD-' + record.suspence_debit_recipt_id
        }));

        const creditsData = (creditsRes.data.suspencecredit || []).map((record) => ({
          ...record,

          receipt: 'SUC-' + record.suspence_credit_recipt_id
        }));

        const transferCreditsData = (transferCreditRes.data.transfersuspencecredit || []).map((record) => ({
          ...record,

          receipt: 'TSUC-' + record.transfersuspencecredit_receipt_id
        }));

        const transferDebitsData = (transferDebitRes.data.transfersuspencedebit || []).map((record) => ({
          ...record,

          receipt: 'TSUD-' + record.transfersuspencedebit_receipt_id
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
      const debitAmount = parseFloat(record.suspence_debit_amount || record.transfersuspence_debit_amount || 0);

      const creditAmount = parseFloat(record.suspence_credit_amount || record.transfersuspence_credit_amount || 0);

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
        'suspence_debit_date' in record
          ? record.suspence_debit_date
          : 'suspence_credit_date' in record
          ? record.suspence_credit_date
          : 'transfersuspence_credit_date' in record
          ? record.transfersuspence_credit_date
          : 'transfersuspence_debit_date' in record
          ? record.transfersuspence_debit_date
          : '';

      return new Date(date) >= new Date(dateFilter.startDate) && new Date(date) <= new Date(dateFilter.endDate);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSuspence((prevsuspence) => ({
      ...prevsuspence,

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

      const receiptNumberField = action === 'credit' ? 'suspence_credit_recipt_id' : 'suspence_debit_recipt_id';

      const receiptNumber = prefix + (records.length + 1); // Generate receipt number

      if (action === 'debit') {
        newRecord = {
          suspence_debit_date: suspence.date,

          suspence_debit_remark: suspence.remarks,

          suspence_debit_amount: suspence.amount,

          suspence_debit_recipt_id: receiptNumber,

          bd_count500: suspence.count500,

          bd_count200: suspence.count200,

          bd_count100: suspence.count100,

          bd_count50: suspence.count50,

          bd_count20: suspence.count20,

          bd_count10: suspence.count10,

          bd_count5: suspence.count5,

          bd_count2: suspence.count2,

          bd_count1: suspence.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/suspencedebit`, newRecord);
      } else {
        newRecord = {
          suspence_credit_date: suspence.date,

          suspence_credit_remark: suspence.remarks,

          suspence_credit_amount: suspence.amount,

          suspence_credit_recipt_id: receiptNumber,

          bc_count500: suspence.count500,

          bc_count200: suspence.count200,

          bc_count100: suspence.count100,

          bc_count50: suspence.count50,

          bc_count20: suspence.count20,

          bc_count10: suspence.count10,

          bc_count5: suspence.count5,

          bc_count2: suspence.count2,

          bc_count1: suspence.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/suspencecredit`, newRecord);
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
  const excessValue = whole1Total - parseFloat(suspence.amount);
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

    const index = parseInt(name.replace('bc_count', ''), 10);

    setSuspence((prevData) => ({
      ...prevData,

      [`bc_count${index}`]: value,

      [`bc_total${index}`]: (parseFloat(value) * prevData[`bc_name${index}`]).toFixed(2)
    }));
  };

  useEffect(() => {
    const calculateTotals = () => {
      const bc_total1 = parseFloat(suspence.bc_count500) * suspence.bc_name1;

      const bc_total2 = parseFloat(suspence.bc_count200) * suspence.bc_name2;

      const bc_total3 = parseFloat(suspence.bc_count100) * suspence.bc_name3; // Calculate other totals similarly

      const bc_total4 = parseFloat(suspence.bc_count50) * suspence.bc_name4;

      const bc_total5 = parseFloat(suspence.bc_count20) * suspence.bc_name5;

      const bc_total6 = parseFloat(suspence.bc_count10) * suspence.bc_name6;

      const bc_total7 = parseFloat(suspence.bc_count5) * suspence.bc_name7;

      const bc_total8 = parseFloat(suspence.bc_count2) * suspence.bc_name8;

      const bc_total9 = parseFloat(suspence.bc_count1) * suspence.bc_name9;

      setSuspence((prevData) => ({
        ...prevData,

        bc_total1: bc_total1.toFixed(2),

        bc_total2: bc_total2.toFixed(2),

        bc_total3: bc_total3.toFixed(2),

        bc_total4: bc_total4.toFixed(2),

        bc_total5: bc_total5.toFixed(2),

        bc_total6: bc_total6.toFixed(2),

        bc_total7: bc_total7.toFixed(2),

        bc_total8: bc_total8.toFixed(2),

        bc_total9: bc_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        bc_total1 +
        bc_total2 +
        bc_total3 +
        bc_total4 +
        bc_total5 +
        bc_total6 +
        bc_total7 +
        bc_total8 +
        bc_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    suspence.bc_name1,

    suspence.bc_count500,

    suspence.bc_name2,

    suspence.bc_count200,

    suspence.bc_name3,

    suspence.bc_count100,

    suspence.bc_name4,

    suspence.bc_count50,

    suspence.bc_name5,

    suspence.bc_count20,

    suspence.bc_name6,

    suspence.bc_count10,

    suspence.bc_name7,

    suspence.bc_count5,

    suspence.bc_name8,

    suspence.bc_count2,

    suspence.bc_name9,

    suspence.bc_count1
  ]);

  //debit denomination

  const handleCount1Change = (event) => {
    const { name, value } = event.target;

    const index = parseInt(name.replace('bd_count', ''), 10);

    setSuspence((prevData) => ({
      ...prevData,

      [`bd_count${index}`]: value,

      [`bd_total${index}`]: (parseFloat(value) * prevData[`bd_name${index}`]).toFixed(2)
    }));
  };

  const calculateTotals = (prefix, suspenceData) => {
    let sum = 0;

    for (let i = 1; i <= 9; i++) {
      const count = parseFloat(suspenceData[`${prefix}_count${i}`]);

      const name = parseFloat(suspenceData[`${prefix}_name${i}`]);

      const total = count * name;

      suspenceData[`${prefix}_total${i}`] = total.toFixed(2);

      sum += total;
    }

    return sum.toFixed(2);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const bd_total1 = parseFloat(suspence.bd_count500) * suspence.bd_name1;

      const bd_total2 = parseFloat(suspence.bd_count200) * suspence.bd_name2;

      const bd_total3 = parseFloat(suspence.bd_count100) * suspence.bd_name3; // Calculate other totals similarly

      const bd_total4 = parseFloat(suspence.bd_count50) * suspence.bd_name4;

      const bd_total5 = parseFloat(suspence.bd_count20) * suspence.bd_name5;

      const bd_total6 = parseFloat(suspence.bd_count10) * suspence.bd_name6;

      const bd_total7 = parseFloat(suspence.bd_count5) * suspence.bd_name7;

      const bd_total8 = parseFloat(suspence.bd_count2) * suspence.bd_name8;

      const bd_total9 = parseFloat(suspence.bd_count1) * suspence.bd_name9;

      setSuspence((prevData) => ({
        ...prevData,

        bd_total1: bd_total1.toFixed(2),

        bd_total2: bd_total2.toFixed(2),

        bd_total3: bd_total3.toFixed(2),

        bd_total4: bd_total4.toFixed(2),

        bd_total5: bd_total5.toFixed(2),

        bd_total6: bd_total6.toFixed(2),

        bd_total7: bd_total7.toFixed(2),

        bd_total8: bd_total8.toFixed(2),

        bd_total9: bd_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        bd_total1 +
        bd_total2 +
        bd_total3 +
        bd_total4 +
        bd_total5 +
        bd_total6 +
        bd_total7 +
        bd_total8 +
        bd_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    suspence.bd_name1,

    suspence.bd_count500,

    suspence.bd_name2,

    suspence.bd_count200,

    suspence.bd_name3,

    suspence.bd_count100,

    suspence.bd_name4,

    suspence.bd_count50,

    suspence.bd_name5,

    suspence.bd_count20,

    suspence.bd_name6,

    suspence.bd_count10,

    suspence.bd_name7,

    suspence.bd_count5,

    suspence.bd_name8,

    suspence.bd_count2,

    suspence.bd_name9,

    suspence.bd_count1
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

          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;Suspence Account</h2>
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
                <TextField type="date" name="date" value={suspence.date} onChange={handleChange}required fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                Amount:
                <TextField
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={formatCurrency(suspence.amount)}
                  onChange={(event) => {
                    handleChange(event);
                    setSuspence({ ...suspence, amount: unformatCurrency(event.target.value) });
                  }}required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                Remarks:
                <TextField type="text" placeholder="Remarks" name="remarks" value={suspence.remarks} onChange={handleChange}required fullWidth />
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
                      <input type="text" name="bc_name1" readOnly value={suspence.bc_name1} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count500"
                        value={suspence.count500}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total1" readOnly value={suspence.bc_total1} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name2" readOnly value={suspence.bc_name2} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count200"
                        value={suspence.count200}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total2" readOnly value={suspence.bc_total2} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name3" readOnly value={suspence.bc_name3} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count100"
                        value={suspence.count100}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total3" readOnly value={suspence.bc_total3} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name4" readOnly value={suspence.bc_name4} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count50"
                        value={suspence.count50}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total4" readOnly value={suspence.bc_total4} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name5" readOnly value={suspence.bc_name5} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count20"
                        value={suspence.count20}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total5" readOnly value={suspence.bc_total5} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name6" readOnly value={suspence.bc_name6} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="bc_count10"
                        value={suspence.bc_count10}
                        style={{ width: '60px' }}
                        onChange={handleCountChange}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total6" readOnly value={suspence.bc_total6} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name7" readOnly value={suspence.bc_name7} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_count5" value={suspence.count5} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total7" readOnly value={suspence.bc_total7} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name8" readOnly value={suspence.bc_name8} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_count2" value={suspence.count2} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total8" readOnly value={suspence.bc_total8} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="bc_name9" readOnly style={{ width: '60px' }} value={suspence.bc_name9} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_count1" value={suspence.count1} style={{ width: '60px' }} onChange={handleCountChange} />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="bc_total9" readOnly value={suspence.bc_total9} />
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
                Suspence Account {new Date().toLocaleDateString()}
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
                  const isDebitRecord = 'suspence_debit_amount' in record || 'transfersuspence_debit_amount' in record;

                  const debitAmount = isDebitRecord ? Number(record.suspence_debit_amount || record.transfersuspence_debit_amount) : 0;

                  const creditAmount = isDebitRecord ? 0 : Number(record.suspence_credit_amount || record.transfersuspence_credit_amount);

                  const date = isDebitRecord
                    ? record.suspence_debit_date || record.transfersuspence_debit_date
                    : record.suspence_credit_date || record.transfersuspence_credit_date || record.suspence_debit_date || '';

                  const remarks = isDebitRecord
                    ? record.suspence_debit_remark || record.transfersuspence_debit_remark
                    : record.suspence_credit_remark || record.transfersuspence_credit_remark || record.suspence_debit_remark || '';

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
                      const lowerCaseData = data.suspencecreditdb
                        ? data.suspencecreditdb.map((record) => ({
                            ...record,
                            suspence_credit_receipt: record.suspence_credit_receipt.toLowerCase()
                          }))
                        : [];

                      const lowerCaseDataDebit = data.suspencedebitdb
                        ? data.suspencedebitdb.map((record) => ({
                            ...record,
                            suspence_debit_receipt: record.suspence_debit_receipt.toLowerCase()
                          }))
                        : [];

                      console.log('Lowercased credit records:', lowerCaseData);
                      console.log('Lowercased debit records:', lowerCaseDataDebit);

                      // Check if capital_credit_receipt or capital_debit_receipt exists before insertion
                      if (
                        lowerCaseData.some((record) => record.suspence_credit_receipt === fetchedReceipt) ||
                        lowerCaseDataDebit.some((record) => record.suspence_debit_receipt === fetchedReceipt)
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
                      suspence_credit_date: date,
                      suspence_credit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      suspence_credit_particular: remarks,
                      suspence_credit_amount: creditAmount
                    };

                    console.log('Credit Post Data:', creditPostData);

                    checkAndSendPostRequest(creditPostData, 'suspencecreditsdbs', 'suspencecreditdb', creditPostData.suspence_credit_receipt);
                  }

                  // Usage example for debitAmount
                  if (debitAmount !== 0) {
                    const debitPostData = {
                      suspence_debit_date: date,
                      suspence_debit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      suspence_debit_particular: remarks,
                      suspence_debit_amount: debitAmount
                    };

                    console.log('Debit Post Data:', debitPostData);

                    checkAndSendPostRequest(debitPostData, 'suspencedebitdbs', 'suspencedebitdb', debitPostData.suspence_debit_receipt);
                  }

                  if (index === array.length - 1) {
                    const lastBalance = balance;

                    if (lastBalance !== null && lastBalance !== undefined) {
                      const currentDate = new Date().toISOString().split('T')[0];

                      const putApiEndpoint = `${process.env.REACT_APP_BASE_URL}/api/balancesheets/date?date=${currentDate}`;

                      const putData = {
                        suspence_balance: lastBalance
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
