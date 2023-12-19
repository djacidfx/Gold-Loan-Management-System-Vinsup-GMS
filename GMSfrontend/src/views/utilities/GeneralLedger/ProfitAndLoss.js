import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
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
  overflow: 'auto'// Enable scrolling if the table exceeds the maximum dimensions
};

const tableStyle = {
  width: '100%' // Make the table take the full width available within the TableContainer
};

export default function PlAccount() {
  const [placcount, setPlAccount] = useState({
    date: new Date().toISOString().split('T')[0],
    receipt: '',
    amount: '',
    remarks: '',
    //credit denomination
    plc_name1: '500',
    plc_count500: '0',
    plc_total1: '',
    plc_name2: '200',
    plc_count200: '0',
    plc_total2: '',
    plc_name3: '100',
    plc_count100: '0',
    plc_total3: '',
    plc_name4: '50',
    plc_count50: '0',
    plc_total4: '',
    plc_name5: '20',
    plc_count20: '0',
    plc_total5: '',
    plc_name6: '10',
    plc_count10: '0',
    plc_total6: '',
    plc_name7: '5',
    plc_count5: '0',
    plc_total7: '',
    plc_name8: '2',
    plc_count2: '0',
    plc_total8: '',
    plc_name9: '1',
    plc_count1: '0',
    plc_total9: '',
    //debit denomination
    pld_name1: '500',
    pld_count500: '0',
    pld_total1: '',
    pld_name2: '200',
    pld_count200: '0',
    pld_total2: '',
    pld_name3: '100',
    pld_count100: '0',
    pld_total3: '',
    pld_name4: '50',
    pld_count50: '0',
    pld_total4: '',
    pld_name5: '20',
    pld_count20: '0',
    pld_total5: '',
    pld_name6: '10',
    pld_count10: '0',
    pld_total6: '',
    pld_name7: '5',
    pld_count5: '0',
    pld_total7: '',
    pld_name8: '2',
    pld_count2: '0',
    pld_total8: '',
    pld_name9: '1',
    pld_count1: '0',
    pld_total9: ''
  });

  const handleRefreshClick = () => {
    window.location.reload();
  };

  const printRef = useRef(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState({
    startDate:new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });
  const [refresh, setRefresh] = useState(false);
  const [whole1Total, setWhole1Total] = useState(0);
  const [action, setAction] = useState('debit'); // 'debit' or 'credit'
  const classes = useStyles();
  
  useEffect(() => {
    let debounceTimeout;
    const fetchRecords = async () => {
      try {
        const [debitsRes,
          creditsRes,
          interestsRes,
          additionalAmountsRes,
          adjustmentAmountsRes,
          partPaymentInterestsRes,
          transferCreditRes,
          transferDebitRes,
          loanAmountsRes,
          loanAdditionalRes,
          loanAdjustmentRes,
          expencesDebitRes,
          expencesCreditRes,
          expencesTransferCreditRes,
          expencesTransferDebitRes,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/profiflossdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/profitlosscredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlementinterests`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlementadditionalamounts`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlementadjustmentamounts`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/partpaymentinterests`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferprofitandlosscredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferprofitandlossdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencesdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencescredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencescredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencesdebits`)
        ]);
            // Fetch customer data
            const customersRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/customers`);
            const customersData = customersRes.data.customers || [];
           // Create a map of customer_id to customer_name
              const customerMap = {};
             customersData.forEach((customer) => {
      customerMap[customer.customer_id] = customer.customer_name;
           });
        console.log('Fetched Interests Data:', interestsRes.data);
        console.log('Fetched Additional Amounts Data:', additionalAmountsRes.data);
        console.log('Fetched Adjustment Amounts Data:', adjustmentAmountsRes.data);
        console.log('Fetched Part Payment Interests Data:', partPaymentInterestsRes.data);
        console.log('Fetched Transfer Credit Data:', transferCreditRes.data);
        console.log('Fetched Transfer Debit Data:', transferDebitRes.data);
        console.log('Fetched Loan Approvals Data:', loanAmountsRes.data);
        console.log('Fetched Expences Credit Data:', expencesCreditRes.data);
        console.log('Fetched Expences Debit Data:', expencesDebitRes.data);
        console.log('Fetched Transfer Expences Credit Data:', expencesTransferCreditRes.data);
        console.log('Fetched Transfer Expences Debit Data:', expencesTransferDebitRes.data);
        const debitsData = (debitsRes.data.profitandlossdebit || []).map((record) => ({
          ...record,
          date: record.profitandloss_debit_date,
          receipt: 'PLD-' + record.profitandloss_debit_receipt_id
        }));
        const creditsData = (creditsRes.data.profitandlosscredit || []).map((record) => ({
          ...record,
          date: record.profitandloss_credit_date,
          receipt: 'PLC-' + record.profitandloss_credit_receipt_no
        }));
        const interestsData = (interestsRes.data.SettlementInterest || []).map((record) => ({
          ...record,
          date: record.date,
          amount:record.interest1,
          particulars:'Settlement Interest',
          receipt: 'SI-' + record.settlementinterest_id
        }));
        const additionalAmountsData = (additionalAmountsRes.data.settlementadditionalamount || []).map((record) => ({
          ...record,
          date: record.date,
          amount:record.additional_charge,
          particulars:'Settlement Additional Amount',
          receipt: 'SAA-' + record.settlementadditionalamount_id
        }));
        const loanApprovalData1 = (loanAdditionalRes.data.loanapprovaldetails || []).map((record) => ({
          created_at: record.created_at,
          date: record.date,
          additional_charges: record.additional_charges,
          receipt: 'PLADC-' + record.loan_id,
          particulars: "ADC-" + (customerMap[record.customer_id] || 'Unknown Customer')
        }));
        const loanApprovalData2 = (loanAdjustmentRes.data.loanapprovaldetails || []).map((record) => ({
          created_at: record.created_at,
          date: record.date,
          adjustment_charges: record.adjustment_charges,
          receipt: 'PLADJD-' + record.loan_id,
          particulars: "ADJD-" + (customerMap[record.customer_id] || 'Unknown Customer')
        }));
        const adjustmentAmountsData = (adjustmentAmountsRes.data.settlementadjustmentamount || []).map((record) => ({
          ...record,
          date: record.date,
          amount: record.adjustment_charge,
          receipt: 'SAD-' + record.settlementadjustmentamount_id,
          particulars:'Settlement Adjustment Amount'
        }));
        const partPaymentInterestsData = (partPaymentInterestsRes.data.partpaymentinterest || []).map((record) => ({
          ...record,
          date: record.date1,
          amount: record.paid_interest,
          receipt: 'PPI-' + record.partpaymentinterest_id,
          particulars:'partpayment Interest'
        }));
        const transferCreditData = (transferCreditRes.data.transferprofitandlosscredit || []).map((record) => ({
          ...record,
          receipt: 'TPC-' + record.transferprofitandlosscredit_receipt_id,
          date: record.transferprofitandloss_credit_date,
          amount: record.transferprofitandloss_credit_amount// Add other necessary fields from your API response
        }));
        const transferDebitData = (transferDebitRes.data.transferprofitandlossdebit || []).map((record) => ({
          ...record,
          receipt: 'TPD-' + record.transferprofitandlossdebit_receipt_id,
          date: record.transferprofitandloss_debit_date,
          amount: record.transferprofitandloss_debit_amount  // Add other necessary fields from your API response
        }));
        const expenxesDebitData = (expencesDebitRes.data.expencesdebit || []).map((record) => ({
          ...record,
          date: record.expences_debit_date,
          receipt: 'EXD-' + record.expences_debit_receipt_id,
          amount: record.expences_debit_amount,
          particulars: record.expences_debit_particulars +"("+ record.expences_debit_remark+")"
        }));
        const expenxesCreditData = (expencesCreditRes.data.expencescredit || []).map((record) => ({
          ...record,
          date: record.expences_credit_date,
          receipt: 'EXC-' + record.expences_credit_receipt_id,
          amount: record.expences_credit_amount,
          particulars: record.expences_credit_particulars+"("+ record.expences_credit_remark+")"
        }));
        const expenxesTransferCreditData = (expencesTransferCreditRes.data.transferexpencescredit || []).map((record) => ({
          ...record,
          date: record.transferexpences_credit_date,
          receipt: 'TEXC-' + record.transferexpencescredit_receipt_id,
          amount: record.transferexpences_credit_amount,
          particulars: record.transferexpences_credit_particular+"("+ record.transferexpences_credit_remark+")"
        }));
        const expenxesTransferDebitData = (expencesTransferDebitRes.data.transferexpencesdebit || []).map((record) => ({
          ...record,
          date: record.transferexpences_debit_date,
          receipt: 'TEXD-' + record.transferexpencesdebit_receipt_id,
          amount: record.transferexpences_debit_amount,
          particulars: record.transferexpences_debit_particular+"("+ record.transferexpences_debit_remark+")"
        }));
        console.log('Expenxes Debit Data:', expenxesDebitData);
        const mergedData = [
          ...debitsData,
          ...creditsData,
          ...interestsData,
          ...additionalAmountsData,
          ...adjustmentAmountsData,
          ...partPaymentInterestsData,
          ...transferCreditData,
          ...transferDebitData,
          ...loanApprovalData1,
          ...loanApprovalData2,
          ...expenxesDebitData,
          ...expenxesCreditData,
          ...expenxesTransferCreditData,
          ...expenxesTransferDebitData
        ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        // Update the records after fetchin
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
  }, [refresh, dateFilter]);

  const processDebouncedRecords = (debouncedRecords) => {
    let balance = 0;
    const processedData = debouncedRecords.map((record) => {
      const debitAmount = parseFloat(record.profitandloss_debit_amount || record.transferprofitandloss_debit_amount || record.adjustment_charge|| record.adjustment_charges|| record.expences_debit_amount|| record.transferexpences_debit_amount|| 0);
      const creditAmount = parseFloat(record.profitandloss_credit_amount || record.transferprofitandloss_credit_amount || record.additional_charge || record.interest || record.interest1 || record.additional_charges|| record.expences_credit_amount|| record.transferexpences_credit_amount|| 0);
      balance += creditAmount - debitAmount ;
      return { ...record, balance };
    });
    setRecords(processedData);
  };

  const filterRecordsByDate = (records) => {
    if (!dateFilter.startDate || !dateFilter.endDate) {
      return records;
    }
    return records.filter((record) => {
      const date =
        'profitandloss_debit_date' in record
          ? record.profitandloss_debit_date
          : 'date' in record
          ? record.date
          : 'date1' in record
          ? record.date1
          : 'profitandloss_credit_date' in record
          ? record.profitandloss_credit_date
          : 'transferprofitandloss_credit_date' in record
          ? record.transferprofitandloss_credit_date
          : 'transferprofitandloss_debit_date' in record
          ? record.transferprofitandloss_debit_date
          : '';
      return new Date(date) >= new Date(dateFilter.startDate) && new Date(date) <= new Date(dateFilter.endDate);
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPlAccount((prevPlAccount) => ({
      ...prevPlAccount,
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
      const prefix = action === 'credit' ? 'PLC-' : 'PLD-';
      const receiptNumberField = action === 'credit' ? 'transferprofitandlosscredit_recipt_id' : 'transferprofitandlossdebit_recipt_id';
      const receiptNumber = prefix + (records.length + 1); // Generate receipt number
      if (action === 'debit') {
        newRecord = {
          profitandloss_debit_date: placcount.date,
          profitandloss_debit_remark: placcount.remarks,
          profitandloss_debit_amount: placcount.amount,
          profitandloss_debit_recipt_no: receiptNumber,
          pld_count500: placcount.count500,
          pld_count200: placcount.count200,
          pld_count100: placcount.count100,
          pld_count50: placcount.count50,
          pld_count20: placcount.count20,
          pld_count10: placcount.count10,
          pld_count5: placcount.count5,
          pld_count2: placcount.count2,
          pld_count1: placcount.count1
        };
        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/profiflossdebit`, newRecord);
      } else {
        newRecord = {
          profitandloss_credit_date: placcount.date,
          profitandloss_credit_remark: placcount.remarks,
          profitandloss_credit_amount: placcount.amount,
          profitandloss_credit_recipt_id: receiptNumber,
          plc_count500: placcount.count500,
          plc_count200: placcount.count200,
          plc_count100: placcount.count100,
          plc_count50: placcount.count50,
          plc_count20: placcount.count20,
          plc_count10: placcount.count10,
          plc_count5: placcount.count5,
          plc_count2: placcount.count2,
          plc_count1: placcount.count1
        };
        res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/profiflosscredit`, newRecord);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleOpen = (selectedAction) => {
    setAction(selectedAction);
    setOpen(true);
  };
  const excessValue = whole1Total - parseFloat(placcount.amount);
  const handleClose = () => setOpen(false);
  const sortedRecords = filterRecordsByDate([...records]).sort((a, b) => {
    const dateA = new Date(a.date + ' ' + a.created_at);
    const dateB = new Date(b.date + ' ' + b.created_at);
    return dateA - dateB;
  });

  const handleCountChange = (event) => {
    const { name, value } = event.target;
    const index = parseInt(name.replace('plc_count', ''), 10);
    setPlAccount((prevData) => ({
      ...prevData,
      [`plc_count${index}`]: value,
      [`plc_total${index}`]: (parseFloat(value) * prevData[`plc_name${index}`]).toFixed(2)
    }));
  };

  useEffect(() => {
    const calculateTotals = () => {
      const plc_total1 = parseFloat(placcount.plc_count500) * placcount.plc_name1;
      const plc_total2 = parseFloat(placcount.plc_count200) * placcount.plc_name2;
      const plc_total3 = parseFloat(placcount.plc_count100) * placcount.plc_name3; // Calculate other totals similarly
      const plc_total4 = parseFloat(placcount.plc_count50) * placcount.plc_name4;
      const plc_total5 = parseFloat(placcount.plc_count20) * placcount.plc_name5;
      const plc_total6 = parseFloat(placcount.plc_count10) * placcount.plc_name6;
      const plc_total7 = parseFloat(placcount.plc_count5) * placcount.plc_name7;
      const plc_total8 = parseFloat(placcount.plc_count2) * placcount.plc_name8;
      const plc_total9 = parseFloat(placcount.plc_count1) * placcount.plc_name9;
      setPlAccount((prevData) => ({
        ...prevData,
        plc_total1: plc_total1.toFixed(2),
        plc_total2: plc_total2.toFixed(2),
        plc_total3: plc_total3.toFixed(2),
        plc_total4: plc_total4.toFixed(2),
        plc_total5: plc_total5.toFixed(2),
        plc_total6: plc_total6.toFixed(2),
        plc_total7: plc_total7.toFixed(2),
        plc_total8: plc_total8.toFixed(2),
        plc_total9: plc_total9.toFixed(2)
        // Update other total values here
      }));
      const sum =
        plc_total1 +
        plc_total2 +
        plc_total3 +
        plc_total4 +
        plc_total5 +
        plc_total6 +
        plc_total7 +
        plc_total8 +
        plc_total9; /* Add other total values here */
      setWhole1Total(sum.toFixed(2));
    };
    calculateTotals();
  }, [
    placcount.plc_name1,
    placcount.plc_count500,
    placcount.plc_name2,
    placcount.plc_count200,
    placcount.plc_name3,
    placcount.plc_count100,
    placcount.plc_name4,
    placcount.plc_count50,
    placcount.plc_name5,
    placcount.plc_count20,
    placcount.plc_name6,
    placcount.plc_count10,
    placcount.plc_name7,
    placcount.plc_count5,
    placcount.plc_name8,
    placcount.plc_count2,
    placcount.plc_name9,
    placcount.plc_count1
  ]);

  useEffect(() => {
    const calculateTotals = () => {
      const pld_total1 = parseFloat(placcount.pld_count500) * placcount.pld_name1;
      const pld_total2 = parseFloat(placcount.pld_count200) * placcount.pld_name2;
      const pld_total3 = parseFloat(placcount.pld_count100) * placcount.pld_name3; // Calculate other totals similarly
      const pld_total4 = parseFloat(placcount.pld_count50) * placcount.pld_name4;
      const pld_total5 = parseFloat(placcount.pld_count20) * placcount.pld_name5;
      const pld_total6 = parseFloat(placcount.pld_count10) * placcount.pld_name6;
      const pld_total7 = parseFloat(placcount.pld_count5) * placcount.pld_name7;
      const pld_total8 = parseFloat(placcount.pld_count2) * placcount.pld_name8;
      const pld_total9 = parseFloat(placcount.pld_count1) * placcount.pld_name9;
      setPlAccount((prevData) => ({
        ...prevData,
        pld_total1: pld_total1.toFixed(2),
        pld_total2: pld_total2.toFixed(2),
        pld_total3: pld_total3.toFixed(2),
        pld_total4: pld_total4.toFixed(2),
        pld_total5: pld_total5.toFixed(2),
        pld_total6: pld_total6.toFixed(2),
        pld_total7: pld_total7.toFixed(2),
        pld_total8: pld_total8.toFixed(2),
        pld_total9: pld_total9.toFixed(2)
        // Update other total values here
      }));
      const sum =
        pld_total1 +
        pld_total2 +
        pld_total3 +
        pld_total4 +
        pld_total5 +
        pld_total6 +
        pld_total7 +
        pld_total8 +
        pld_total9; /* Add other total values here */
      setWhole1Total(sum.toFixed(2));
    };
    calculateTotals();
  }, [
    placcount.pld_name1,
    placcount.pld_count500,
    placcount.pld_name2,
    placcount.pld_count200,
    placcount.pld_name3,
    placcount.pld_count100,
    placcount.pld_name4,
    placcount.pld_count50,
    placcount.pld_name5,
    placcount.pld_count20,
    placcount.pld_name6,
    placcount.pld_count10,
    placcount.pld_name7,
    placcount.pld_count5,
    placcount.pld_name8,
    placcount.pld_count2,
    placcount.pld_name9,
    placcount.pld_count1
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
        }}>
        <Typography variant="subtitle1"><br></br>
          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;Profit and Loss Account</h2>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}><br></br>
            <Box display="flex" alignItems="center">&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
              <TextField
                label="Start Date"
                type="date"
                variant="outlined"
                value={dateFilter.startDate}
                onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                InputLabelProps={{ shrink: true }}
                style={{ marginRight: 20 }} />
              <TextField
                label="End Date"
                type="date"
                variant="outlined"
                value={dateFilter.endDate}
                onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                InputLabelProps={{ shrink: true }}/>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div><br></br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={() => handleOpen('debit')}>
                Debit
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={() => handleOpen('credit')}>
                Credit
              </Button>
            </div><br></br>
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
                <TextField type="date" name="date" value={placcount.date} onChange={handleChange} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                Amount:
                <TextField
                  type="text"
                  placeholder="Amount"
                  name="amount"
                  value={formatCurrency(placcount.amount)}
                  onChange={(event) => {
                    handleChange(event);
                    setPlAccount({ ...placcount, amount: unformatCurrency(event.target.value) });
                  }} required
                  fullWidth/>
              </Grid>
              <Grid item xs={12} sm={6}>
                Remarks:
                <TextField type="text" placeholder="Remarks" name="remarks" value={placcount.remarks} onChange={handleChange} required fullWidth />
              </Grid>
            </Grid><br />
            <TableContainer component={Paper} style={tableContainerStyle}>
              <Table style={tableStyle}>
                <TableBody>
                  <TableHead></TableHead>
                  <TableRow>
                    <b>Cash Denomination</b>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name1" readOnly value={placcount.plc_name1} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count500"
                        value={placcount.count500}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total1" readOnly value={placcount.plc_total1} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name2" readOnly value={placcount.plc_name2} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count200"
                        value={placcount.count200}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total2" readOnly value={placcount.plc_total2} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name3" readOnly value={placcount.plc_name3} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count100"
                        value={placcount.count100}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total3" readOnly value={placcount.plc_total3} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name4" readOnly value={placcount.plc_name4} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count50"
                        value={placcount.count50}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total4" readOnly value={placcount.plc_total4} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name5" readOnly value={placcount.plc_name5} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count20"
                        value={placcount.count20}
                        onChange={handleCountChange}
                        style={{ width: '60px' }}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total5" readOnly value={placcount.plc_total5} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name6" readOnly value={placcount.plc_name6} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="plc_count10"
                        value={placcount.plc_count10}
                        style={{ width: '60px' }}
                        onChange={handleCountChange}/>
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total6" readOnly value={placcount.plc_total6} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name7" readOnly value={placcount.plc_name7} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_count5" value={placcount.count5} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total7" readOnly value={placcount.plc_total7} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name8" readOnly value={placcount.plc_name8} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_count2" value={placcount.count2} onChange={handleCountChange} style={{ width: '60px' }} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total8" readOnly value={placcount.plc_total8} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <input type="text" name="plc_name9" readOnly style={{ width: '60px' }} value={placcount.plc_name9} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_count1" value={placcount.count1} style={{ width: '60px' }} onChange={handleCountChange} />
                    </TableCell>
                    <TableCell>
                      <input type="text" name="plc_total9" readOnly value={placcount.plc_total9} />
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
                }}>
                Profit and Loss Account {new Date().toLocaleDateString()}
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
                  const isDebitRecord = 'profitandloss_debit_amount' in record || 'transferprofitandloss_debit_amount' in record ||'loan_amount' in record || 'adjustment_charge' in record|| 'adjustment_charges' in record|| "expences_debit_amount"in record ||"transferexpences_debit_amount"in record;
                  const debitAmount = isDebitRecord ? Number(record.profitandloss_debit_amount || record.transferprofitandloss_debit_amount || record.loan_amount || record.adjustment_charge|| record.adjustment_charges|| record.expences_debit_amount|| record.transferexpences_debit_amount) : 0;
                  const creditAmount = isDebitRecord ? 0 : Number(record.profitandloss_credit_amount || record.transferprofitandloss_credit_amount || record.additional_charge || record.interest1 || record.interest || record.additional_charges || record.expences_credit_amount || record.transferexpences_credit_amount);
                  const date = isDebitRecord
                    ? record.profitandloss_debit_date || record.transferprofitandloss_debit_date ||record.date
                    : record.profitandloss_credit_date || record.transferprofitandloss_credit_date || record.profitandloss_debit_date || record.date || record.date1 || record.expences_debit_date || record.expences_credit_date || record.transferexpences_credit_date|| record.transferexpences_debit_date|| '';
                  const remarks = isDebitRecord
                    ? record.profitandloss_debit_remark || record.transferprofitandloss_debit_remark
                    : record.profitandloss_credit_remark || record.transferprofitandloss_credit_remark || record.profitandloss_debit_remark || '';
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
                      const lowerCaseData = data.profitandlosscreditdb
                        ? data.profitandlosscreditdb.map((record) => ({
                            ...record,
                            profitandlossdb_credit_receipt: record.profitandlossdb_credit_receipt.toLowerCase()
                          }))
                        : [];
                      const lowerCaseDataDebit = data.profitandlossdebitdb
                        ? data.profitandlossdebitdb.map((record) => ({
                            ...record,
                            profitandlossdb_debit_receipt: record.profitandlossdb_debit_receipt.toLowerCase()
                          }))
                        : [];
                      console.log('Lowercased credit records:', lowerCaseData);
                      console.log('Lowercased debit records:', lowerCaseDataDebit);
                      // Check if capital_credit_receipt or capital_debit_receipt exists before insertion
                      if (
                        lowerCaseData.some((record) => record.profitandlossdb_credit_receipt === fetchedReceipt) ||
                        lowerCaseDataDebit.some((record) => record.profitandlossdb_debit_receipt === fetchedReceipt)
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
                  if (creditAmount !== 0) {
                    const creditPostData = {
                      profitandlossdb_credit_date: date,
                      profitandlossdb_credit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      profitandlossdb_credit_particular: remarks ||record.particulars,
                      profitandlossdb_credit_amount: creditAmount
                    };
                    console.log('Credit Post Data:', creditPostData);
                    checkAndSendPostRequest(creditPostData, 'profitandlosscreditdbs', 'profitandlosscreditdb', creditPostData.profitandlossdb_credit_receipt);
                  }
                  if (debitAmount !== 0) {
                    const debitPostData = {
                      profitandlossdb_debit_date: date,
                      profitandlossdb_debit_receipt: record.receipt.toUpperCase(), // Ensure the case matches the database
                      profitandlossdb_debit_particular: remarks ||record.particulars,
                      profitandlossdb_debit_amount: debitAmount  
                    };
                    console.log('Debit Post Data:', debitPostData);
                    checkAndSendPostRequest(debitPostData, 'profitandlossdebitdbs', 'profitandlossdebitdb', debitPostData.profitandlossdb_debit_receipt);
                  }
                  if (index === array.length - 1) {
                    const lastBalance = balance;
                    if (lastBalance !== null && lastBalance !== undefined) {
                      const currentDate = new Date().toISOString().split('T')[0];
                      const putApiEndpoint = `${process.env.REACT_APP_BASE_URL}/api/balancesheets/date?date=${currentDate}`;
                      const putData = {
                        profitloss_balance: lastBalance
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
                      <TableCell align="center">{remarks ||record.particulars}</TableCell>
                      <TableCell align="center">{debitAmount || "0"}</TableCell>
                      <TableCell align="center">{creditAmount || "0"}</TableCell>
                      <TableCell align="center">{balance}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ textAlign: 'center' }}>  <br></br>        
          <ReactToPrint trigger={() => <Button variant="contained">Print Table</Button>} content={() => printRef.current} />
        </div>
      </div>
    </div>
  );
}