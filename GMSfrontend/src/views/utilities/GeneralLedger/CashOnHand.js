import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import Card from '@mui/material/Card';

import Modal from '@mui/material/Modal';

import { makeStyles } from '@mui/styles';

import { Box } from '@mui/system';

import axios from 'axios';

import { useEffect, useRef, useState } from 'react';

import ReactToPrint from 'react-to-print';

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

export default function CashOnHand() {
  const [cashonhand, setCashOnHand] = useState({
    date: new Date().toISOString().split('T')[0],

    receipt: '',

    amount: '',

    remarks: '',

    //credit denomination

    chc_name1: '500',

    chc_count500: '0',

    chc_total1: '',

    chc_name2: '200',

    chc_count200: '0',

    chc_total2: '',

    chc_name3: '100',

    chc_count100: '0',

    chc_total3: '',

    chc_name4: '50',

    chc_count50: '0',

    chc_total4: '',

    chc_name5: '20',

    chc_count20: '0',

    chc_total5: '',

    chc_name6: '10',

    chc_count10: '0',

    chc_total6: '',

    chc_name7: '5',

    chc_count5: '0',

    chc_total7: '',

    chc_name8: '2',

    chc_count2: '0',

    chc_total8: '',

    chc_name9: '1',

    chc_count1: '0',

    chc_total9: '',

    //debit denomination

    chd_name1: '500',

    chd_count500: '0',

    chd_total1: '',

    chd_name2: '200',

    chd_count200: '0',

    chd_total2: '',

    chd_name3: '100',

    chd_count100: '0',

    chd_total3: '',

    chd_name4: '50',

    chd_count50: '0',

    chd_total4: '',

    chd_name5: '20',

    chd_count20: '0',

    chd_total5: '',

    chd_name6: '10',

    chd_count10: '0',

    chd_total6: '',

    chd_name7: '5',

    chd_count5: '0',

    chd_total7: '',

    chd_name8: '2',

    chd_count2: '0',

    chd_total8: '',

    chd_name9: '1',

    chd_count1: '0',

    chd_total9: ''
  });

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const printRef = useRef(null);

  const tableRef = useRef(null);

  const [records, setRecords] = useState([]);

  const [open, setOpen] = useState(false);

  const [whole1Total, setWhole1Total] = useState(0);

  const [lastAmount, setLastAmount] = useState(0);

  const [finalsAmount, setFinalsAmount] = useState(0);

  const [change, setChange] = useState(0);

  const [dateFilter, setDateFilter] = useState({
    startDate: new Date().toISOString().split('T')[0],

    endDate: new Date().toISOString().split('T')[0],
  });

  const [refresh, setRefresh] = useState(false);

  const [action, setAction] = useState('debit');

  const classes = useStyles();

  //denomination Calculation

  const excessValue = whole1Total - parseFloat(cashonhand.amount);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const [debitsRes, creditsRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/cashonhanddebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/cashonhandcredits`)
        ]);

        const debitsData = (debitsRes.data.cashonhanddebit || []).map((record) => ({
          ...record,

          receipt: 'COHD-' + record.cash_on_hand_debit_id,

          date: record.cashonhand_debit_date,

          remarks: record.cashonhand_debit_remark
        }));

        const creditsData = (creditsRes.data.cashonhandcredit || []).map((record) => ({
          ...record,

          receipt: 'COHC-' + record.cash_on_hand_credit_id
        }));

        let mergedData = [...debitsData, ...creditsData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        let balance = 0;

        const processedData = mergedData.map((record) => {
          const isDebitRecord = 'cashonhand_debit_amount' in record;

          const debitAmount = isDebitRecord ? Number(record.cashonhand_debit_amount) : 0;

          const creditAmount = !isDebitRecord ? Number(record.cashonhand_credit_amount) : 0;

          if (isDebitRecord) {
            balance -= debitAmount;
          } else {
            balance += creditAmount;
          }

          return { ...record, balance };
        });

        setRecords(processedData);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, [refresh]);

  const filterRecordsByDate = (records) => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      return records;
    }

    return records.filter((record) => {
      const date = 'cashonhand_debit_date' in record ? record.cashonhand_debit_date : record.cashonhand_credit_date;

      return new Date(date) >= new Date(dateFilter.startDate) && new Date(date) <= new Date(dateFilter.endDate);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCashOnHand((prevCapital) => ({
      ...prevCapital,

      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let newRecord;

      let res;

      // Determine the prefix based on the action

      const prefix = action === 'credit' ? 'COHC-' : 'COHD-';

      const receiptNumberField = action === 'credit' ? 'cash_on_hand_credit_id' : 'cash_on_hand_debit_id';

      const receiptNumber = prefix + (records.length + 1); // Generate receipt number

      if (action === 'debit') {
        newRecord = {
          cashonhand_debit_date: cashonhand.date,

          cashonhand_debit_remark: cashonhand.remarks,

          cashonhand_debit_amount: cashonhand.amount,

          cash_on_hand_debit_id: receiptNumber,

          chd_count500: cashonhand.count500,

          chd_count200: cashonhand.count200,

          chd_count100: cashonhand.count100,

          chd_count50: cashonhand.count50,

          chd_count20: cashonhand.count20,

          chd_count10: cashonhand.count10,

          chd_count5: cashonhand.count5,

          chd_count2: cashonhand.count2,

          chd_count1: cashonhand.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cashonhanddebit`, newRecord);
      } else {
        newRecord = {
          cashonhand_credit_date: cashonhand.date,

          cashonhand_credit_remark: cashonhand.remarks,

          cashonhand_credit_amount: cashonhand.amount,

          cash_on_hand_credit_id: receiptNumber,

          chc_count500: cashonhand.count500,

          chc_count200: cashonhand.count200,

          chc_count100: cashonhand.count100,

          chc_count50: cashonhand.count50,

          chc_count20: cashonhand.count20,

          chc_count10: cashonhand.count10,

          chc_count5: cashonhand.count5,

          chc_count2: cashonhand.count2,

          chc_count1: cashonhand.count1
        };

        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cashonhancredit`, newRecord);
      }

      // ...
    } catch (error) {
      console.error('Error:', error);
    }
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

    const index = parseInt(name.replace('chc_count', ''), 10);

    setCashOnHand((prevData) => ({
      ...prevData,

      [`chc_count${index}`]: value,

      [`chc_total${index}`]: (parseFloat(value) * prevData[`chc_name${index}`]).toFixed(2)
    }));
  };

  useEffect(() => {
    const calculateTotals = () => {
      const chc_total1 = parseFloat(cashonhand.chc_count500) * cashonhand.chc_name1;

      const chc_total2 = parseFloat(cashonhand.chc_count200) * cashonhand.chc_name2;

      const chc_total3 = parseFloat(cashonhand.chc_count100) * cashonhand.chc_name3; // Calculate other totals similarly

      const chc_total4 = parseFloat(cashonhand.chc_count50) * cashonhand.chc_name4;

      const chc_total5 = parseFloat(cashonhand.chc_count20) * cashonhand.chc_name5;

      const chc_total6 = parseFloat(cashonhand.chc_count10) * cashonhand.chc_name6;

      const chc_total7 = parseFloat(cashonhand.chc_count5) * cashonhand.chc_name7;

      const chc_total8 = parseFloat(cashonhand.chc_count2) * cashonhand.chc_name8;

      const chc_total9 = parseFloat(cashonhand.chc_count1) * cashonhand.chc_name9;

      setCashOnHand((prevData) => ({
        ...prevData,

        chc_total1: chc_total1.toFixed(2),

        chc_total2: chc_total2.toFixed(2),

        chc_total3: chc_total3.toFixed(2),

        chc_total4: chc_total4.toFixed(2),

        chc_total5: chc_total5.toFixed(2),

        chc_total6: chc_total6.toFixed(2),

        chc_total7: chc_total7.toFixed(2),

        chc_total8: chc_total8.toFixed(2),

        chc_total9: chc_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        chc_total1 +
        chc_total2 +
        chc_total3 +
        chc_total4 +
        chc_total5 +
        chc_total6 +
        chc_total7 +
        chc_total8 +
        chc_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    cashonhand.chc_name1,

    cashonhand.chc_count500,

    cashonhand.chc_name2,

    cashonhand.chc_count200,

    cashonhand.chc_name3,

    cashonhand.chc_count100,

    cashonhand.chc_name4,

    cashonhand.chc_count50,

    cashonhand.chc_name5,

    cashonhand.chc_count20,

    cashonhand.chc_name6,

    cashonhand.chc_count10,

    cashonhand.chc_name7,

    cashonhand.chc_count5,

    cashonhand.chc_name8,

    cashonhand.chc_count2,

    cashonhand.chc_name9,

    cashonhand.chc_count1
  ]);

  //debit denomination

  const handleCount1Change = (event) => {
    const { name, value } = event.target;

    const index = parseInt(name.replace('chd_count', ''), 10);

    setCashOnHand((prevData) => ({
      ...prevData,

      [`chd_count${index}`]: value,

      [`chd_total${index}`]: (parseFloat(value) * prevData[`chd_name${index}`]).toFixed(2)
    }));
  };

  const calculateTotals = (prefix, bankData) => {
    let sum = 0;

    for (let i = 1; i <= 9; i++) {
      const count = parseFloat(bankData[`${prefix}_count${i}`]);

      const name = parseFloat(bankData[`${prefix}_name${i}`]);

      const total = count * name;

      bankData[`${prefix}_total${i}`] = total.toFixed(2);

      sum += total;
    }

    return sum.toFixed(2);
  };

  useEffect(() => {
    const calculateTotals = () => {
      const chd_total1 = parseFloat(cashonhand.chd_count500) * cashonhand.chd_name1;

      const chd_total2 = parseFloat(cashonhand.chd_count200) * cashonhand.chd_name2;

      const chd_total3 = parseFloat(cashonhand.chd_count100) * cashonhand.chd_name3; // Calculate other totals similarly

      const chd_total4 = parseFloat(cashonhand.chd_count50) * cashonhand.chd_name4;

      const chd_total5 = parseFloat(cashonhand.chd_count20) * cashonhand.chd_name5;

      const chd_total6 = parseFloat(cashonhand.chd_count10) * cashonhand.chd_name6;

      const chd_total7 = parseFloat(cashonhand.chd_count5) * cashonhand.chd_name7;

      const chd_total8 = parseFloat(cashonhand.chd_count2) * cashonhand.chd_name8;

      const chd_total9 = parseFloat(cashonhand.chd_count1) * cashonhand.chd_name9;

      setCashOnHand((prevData) => ({
        ...prevData,

        chd_total1: chd_total1.toFixed(2),

        chd_total2: chd_total2.toFixed(2),

        chd_total3: chd_total3.toFixed(2),

        chd_total4: chd_total4.toFixed(2),

        chd_total5: chd_total5.toFixed(2),

        chd_total6: chd_total6.toFixed(2),

        chd_total7: chd_total7.toFixed(2),

        chd_total8: chd_total8.toFixed(2),

        chd_total9: chd_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        chd_total1 +
        chd_total2 +
        chd_total3 +
        chd_total4 +
        chd_total5 +
        chd_total6 +
        chd_total7 +
        chd_total8 +
        chd_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    cashonhand.chd_name1,

    cashonhand.chd_count500,

    cashonhand.chd_name2,

    cashonhand.chd_count200,

    cashonhand.chd_name3,

    cashonhand.chd_count100,

    cashonhand.chd_name4,

    cashonhand.chd_count50,

    cashonhand.chd_name5,

    cashonhand.chd_count20,

    cashonhand.chd_name6,

    cashonhand.chd_count10,

    cashonhand.chd_name7,

    cashonhand.chd_count5,

    cashonhand.chd_name8,

    cashonhand.chd_count2,

    cashonhand.chd_name9,

    cashonhand.chd_count1
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
          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;Cash On Hand</h2>
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                <TextField type="date" name="date" value={cashonhand.date} onChange={handleChange} required fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                Amount:
                <TextField
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={formatCurrency(cashonhand.amount)}
                  onChange={(event) => {
                    handleChange(event);

                    setCashOnHand({
                      ...cashonhand,

                      amount: unformatCurrency(event.target.value)
                    });
                  }}
                  required
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                Remarks:
                <TextField
                  type="text"
                  placeholder="Remarks"
                  name="remarks"
                  value={cashonhand.remarks}
                  onChange={handleChange}
                  required
                  fullWidth
                />
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
                      <input type="text" name="chc_name1" readOnly value={cashonhand.chc_name1} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count500"
                        value={cashonhand.count500}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total1" readOnly value={cashonhand.chc_total1} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name2" readOnly value={cashonhand.chc_name2} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count200"
                        value={cashonhand.count200}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total2" readOnly value={cashonhand.chc_total2} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name3" readOnly value={cashonhand.chc_name3} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count100"
                        value={cashonhand.count100}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total3" readOnly value={cashonhand.chc_total3} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name4" readOnly value={cashonhand.chc_name4} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count50"
                        value={cashonhand.count50}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total4" readOnly value={cashonhand.chc_total4} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name5" readOnly value={cashonhand.chc_name5} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count20"
                        value={cashonhand.count20}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total5" readOnly value={cashonhand.chc_total5} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name6" readOnly value={cashonhand.chc_name6} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count10"
                        value={cashonhand.chc_count10}
                        style={{ width: '60px' }}
                        onChange={handleCountChange}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total6" readOnly value={cashonhand.chc_total6} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name7" readOnly value={cashonhand.chc_name7} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count5"
                        value={cashonhand.count5}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total7" readOnly value={cashonhand.chc_total7} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name8" readOnly value={cashonhand.chc_name8} style={{ width: '60px' }} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count2"
                        value={cashonhand.count2}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total8" readOnly value={cashonhand.chc_total8} />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <input type="text" name="chc_name9" readOnly style={{ width: '60px' }} value={cashonhand.chc_name9} />
                    </TableCell>

                    <TableCell>
                      <input
                        type="text"
                        name="chc_count1"
                        value={cashonhand.count1}
                        style={{ width: '60px' }}
                        onChange={handleCountChange}
                      />
                    </TableCell>

                    <TableCell>
                      <input type="text" name="chc_total9" readOnly value={cashonhand.chc_total9} />
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

            <Button disabled={excessValue > 0 || excessValue < 0} onClick={handleRefreshClick} type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>

      <div
        style={{
          border: '2px solid #000',

          borderRadius: '5px',

          padding: '20px',

          margin: '10px'
        }}
      >
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
                Cash On Hand Account {new Date().toLocaleDateString()}
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
                  const isDebitRecord = 'capital_debit_amount' in record;

                  const debitAmount = isDebitRecord ? 0 : Number(record.cashonhand_debit_amount);

                  const creditAmount = isDebitRecord ? 0 : Number(record.cashonhand_credit_amount);

                  const date = isDebitRecord
                    ? record.cashonhand_debit_date
                    : record.cashonhand_credit_date || record.cashonhand_debit_date || '0';

                  const remarks = isDebitRecord
                    ? record.cashonhand_debit_remark
                    : record.cashonhand_credit_remark || record.cashonhand_debit_remark || '0';

                  const balance = record.balance;

                  // const checkAndSendPostRequest = async (postData, getApiEndpoint, postApiEndpoint, receipt) => {

                  //   try {

                  //     // Convert both the fetched receipt and input receipt to lowercase for case-insensitive comparison

                  //     const fetchedReceipt = receipt.toLowerCase();

                  //     // Check if the receipt already exists in the database

                  //     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${getApiEndpoint}?receipt=${fetchedReceipt}`);

                  //     if (!response.ok) {

                  //       throw new Error(`Error fetching data from ${getApiEndpoint}: ${response.statusText}`);

                  //     }

                  //     const data = await response.json();

                  //     console.log(`Fetched records from ${getApiEndpoint}:`, data);

                  //     // Convert all fetched receipts to lowercase for comparison

                  //     const lowerCaseData = data.cashonhandcreditdb.map((record) => {

                  //       return {

                  //         ...record,

                  //         cashonhanddb_credit_receipt: record.cashonhanddb_credit_receipt.toLowerCase()

                  //       };

                  //     });

                  //     if (lowerCaseData.some((record) => record.cashonhanddb_credit_receipt === fetchedReceipt)) {

                  //       // Receipt already exists in the database, show a message

                  //       console.log(`Receipt ${fetchedReceipt} already exists in the database. Skipping insertion.`);

                  //     } else {

                  //       // Receipt doesn't exist in the database, proceed with insertion

                  //       const postResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/${postApiEndpoint}`, {

                  //         method: 'POST',

                  //         headers: {

                  //           'Content-Type': 'application/json'

                  //         },

                  //         body: JSON.stringify(postData)

                  //       });

                  //       if (!postResponse.ok) {

                  //         throw new Error(`Error inserting data into ${postApiEndpoint}: ${postResponse.statusText}`);

                  //       }

                  //       const insertedData = await postResponse.json();

                  //       console.log('Data inserted:', insertedData);

                  //     }

                  //   } catch (error) {

                  //     console.error('Error:', error);

                  //   }

                  // };

                  // if (creditAmount !== 0) {

                  //   const creditPostData = {

                  //     cashonhanddb_credit_date: date,

                  //     cashonhanddb_credit_receipt: record.receipt,

                  //     cashonhanddb_credit_particular: remarks,

                  //     cashonhanddb_credit_amount: creditAmount

                  //   };

                  //   checkAndSendPostRequest(

                  //     creditPostData,

                  //     'cashonhandcreditdbs',

                  //     'cashonhandcreditdb',

                  //     creditPostData.cashonhanddb_credit_receipt.toLowerCase()

                  //   );

                  // }

                  // if (debitAmount !== 0) {

                  //   const debitPostData = {

                  //     cashonhanddb_debit_date: date,

                  //     cashonhanddb_debit_receipt: record.receipt,

                  //     cashonhanddb_debit_particular: remarks,

                  //     cashonhanddb_debit_amount: debitAmount

                  //   };

                  //   checkAndSendPostRequest(

                  //     debitPostData,

                  //     'cashonhanddebitdbs',

                  //     'cashonhanddebitdb',

                  //     debitPostData.cashonhanddb_debit_receipt.toLowerCase()

                  //   );

                  // }

                  if (index === array.length - 1) {
                    const lastBalance = balance;

                    if (lastBalance !== null && lastBalance !== undefined) {
                      const currentDate = new Date().toISOString().split('T')[0];

                      const putApiEndpoint = `${process.env.REACT_APP_BASE_URL}/api/balancesheets/date?date=${currentDate}`;

                      const putData = {
                        cash_balance: lastBalance
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

        <br></br>

        <div style={{ textAlign: 'center' }}>
          <ReactToPrint trigger={() => <Button variant="contained">Print Table</Button>} content={() => printRef.current} />
        </div>
      </div>
    </div>
  );
}
