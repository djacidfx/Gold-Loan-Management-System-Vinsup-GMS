import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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
const responsivePadding = {
  padding: '20px',

  '@media (max-width: 100px)': {
    padding: '10px'
  },

  '@media (max-width: 100px)': {
    padding: '5px'
  }
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
  overflow: 'auto' // Enable scrolling if the table exceeds the maximum dimensions
};
const tableStyle = {
  width: '100%' // Make the table take the full width available within the TableContainer
};
export default function MonthlyData() {
  const handleRefreshClick = () => {
    window.location.reload();
  };
  const printRef = useRef(null);
  const [records, setRecords] = useState([]);
  const [dateFilter, setDateFilter] = useState({});

  const [totalInterest, setTotalInterest] = useState(0);

  const fetchInterestData = async () => {
    try {
      const [settlementInterestResponse, partPaymentInterestResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlementinterests`),
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/partpaymentinterests`)
      ]);

      const settlementInterestData = settlementInterestResponse.data.settlementinterest; // Access the array within the object
      const partPaymentInterestData = partPaymentInterestResponse.data.partpaymentinterest; // Access the array within the object

      console.log('settlementInterestData:', settlementInterestData);
      console.log('partPaymentInterestData:', partPaymentInterestData);

      // Calculate the total interest by summing the 'interest' and 'interest1' columns
      const totalInterest = calculateTotalInterest(settlementInterestData, partPaymentInterestData);

      console.log('totalInterest:', totalInterest);

      // Update the state with the total interest
      setTotalInterest(totalInterest);
    } catch (error) {
      console.error('Error fetching interest data:', error);
    }
  };

  const [profitLossBalance, setProfitLossBalance] = useState(0);

  const fetchProfitLossBalance = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/balancesheets`);
      const balanceSheetData = response.data;
      console.log('API Response:', response);
      console.log('balanceSheetData', balanceSheetData);

      if (balanceSheetData && balanceSheetData.balancesheet && balanceSheetData.balancesheet.length > 0) {
        const lastRecord = balanceSheetData.balancesheet[balanceSheetData.balancesheet.length - 1];
        const profitLossBalance = lastRecord.profitloss_balance;

        if (profitLossBalance !== null && profitLossBalance.length > 0) {
          console.log('profitLossBalance', profitLossBalance);
          setProfitLossBalance(profitLossBalance);
        } else {
          console.log('profitLossBalance is empty or not a valid string.');
        }
      } else {
        console.log('No balance sheet data found.');
      }
    } catch (error) {
      console.error('Error fetching profitloss_balance:', error);
    }
  };

  useEffect(() => {
    let debounceTimeout;

    const fetchData = async () => {
      try {
        const [debitResponse, creditResponse, transferCreditRes, transferDebitRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencesdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencescredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencescredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencesdebits`)
        ]);

        const debitsData = (debitResponse.data.expencesdebit || []).map((record) => ({
          ...record,
          receipt: 'EXD-' + record.expences_debit_receipt_id,
          isDebit: true
        }));

        const creditsData = (creditResponse.data.expencescredit || []).map((record) => ({
          ...record,
          receipt: 'EXC-' + record.expences_credit_receipt_id,
          isDebit: false
        }));

        const transferCreditsData = (transferCreditRes.data.transferexpencescredit || []).map((record) => ({
          ...record,
          receipt: 'TEXC-' + record.transferexpencescredit_receipt_id,
          isDebit: false
        }));

        const transferDebitsData = (transferDebitRes.data.transferexpencesdebit || []).map((record) => ({
          ...record,
          receipt: 'TEXD-' + record.transferexpencesdebit_receipt_id,
          isDebit: true
        }));
        const mergedData = [...debitsData, ...creditsData, ...transferCreditsData, ...transferDebitsData].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

        setRecords(mergedData);
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
          processDebouncedRecords(mergedData);
        }, 1000); // Adjust the debounce interval as needed (e.g., 1000ms)
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchData();
    fetchInterestData();
    fetchProfitLossBalance();
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, []);

  const calculateTotalInterest = (settlementData, partPaymentData) => {
    const totalSettlementInterest = settlementData.reduce((total, record) => total + parseFloat(record.interest1), 0);

    const totalPartPaymentInterest = partPaymentData.reduce((total, record) => total + parseFloat(record.interest), 0);

    return totalSettlementInterest + totalPartPaymentInterest;
  };

  const commonParticulars = [
    'Salary',
    'Lighting',
    'Telephone',
    'Stationery & Printing',
    'Fuel',
    'Insurance',
    'Taxes',
    'Sundries Others',
    'Rent',
    'Depreciation'
  ];

  const processDebouncedRecords = (debouncedRecords) => {
    const recordsMap = {};

    // Initialize the recordsMap with zero balances for commonParticulars
    commonParticulars.forEach((particular) => {
      recordsMap[particular] = { credit: 0, debit: 0, balance: 0 };
    });

    // Iterate through the records and categorize them by particular
    debouncedRecords.forEach((record) => {
      const {
        expences_credit_particulars,
        expences_debit_particulars,
        transferexpences_credit_particular,
        transferexpences_debit_particular,
      } = record;

      // Check if the properties exist and if the particular matches commonParticulars
      if (commonParticulars.includes(expences_credit_particulars)) {
        recordsMap[expences_credit_particulars].credit += parseFloat(record.expences_credit_amount);
      }

      if (commonParticulars.includes(expences_debit_particulars)) {
        recordsMap[expences_debit_particulars].debit += parseFloat(record.expences_debit_amount);
      }

      if (commonParticulars.includes(transferexpences_credit_particular)) {
        recordsMap[transferexpences_credit_particular].credit += parseFloat(record.transferexpences_credit_amount);
      }

      if (commonParticulars.includes(transferexpences_debit_particular)) {
        recordsMap[transferexpences_debit_particular].debit += parseFloat(record.transferexpences_debit_amount);
      }
    });
    console.log("recordsMap before balance calculation:", recordsMap);
    commonParticulars.forEach((particular) => {
      recordsMap[particular].balance = recordsMap[particular].debit - recordsMap[particular].credit;
    });
    console.log("Final Balance :", totalCommonParticularsAmount);

    // Now, recordsMap should contain the correct balances for commonParticulars
    console.log("recordsMap after balance calculation:", recordsMap);

    const recordsWithBalance = commonParticulars.map((particular, index) => ({
      'S.no': index + 1,
      Particular: particular,
      Amount: recordsMap[particular].balance,
    }));
    console.log("record", recordsWithBalance);
    setRecords(recordsWithBalance);
  };

  const calculateBalance = (records) => {
    let balance = 0;
    const recordsWithBalance = records.map((record) => {
      const amount = parseFloat(
        record.isDebit
          ? record.expences_debit_amount || record.transferexpences_debit_amount
          : record.expences_credit_amount || record.transferexpences_credit_amount
      );
      balance += record.isDebit ? amount : -amount;
      return { ...record, balance };
    });
    return recordsWithBalance;
  };

  const recordsWithBalance = calculateBalance(records);

  const totalCommonParticularsAmount = commonParticulars.reduce((total, particular) => {
    const record = recordsWithBalance.find((r) => r.Particular === particular);
    return total + (record ? record.Amount : 0);
  }, 0);

  
  
  // Calculate the total amount
  // const totalAmount = totalInterest + totalCommonParticularsAmount;

  // Calculate the total amount, including modified commonParticulars and interest
  //const totalAmount = totalInterest + totalModifiedCommonParticularsAmount;


  // Calculate the total amount
  //const totalAmount = records.reduce((total, record) => total + (record.Amount || 0), 0);

  return (
    <div>
      <Card
        style={{ height: '120px' }}
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
          <h2 style={{ fontFamily: 'poppins' }}> &nbsp;&nbsp;&nbsp;MonthlyP&L</h2>
        </Typography>

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
                MonthlyP&L {new Date().toLocaleDateString()}
              </h3>
            </Typography>
          </div>
          <Paper elevation={2} style={{ margin: '2rem 0' }}>
            <div style={{ display: 'flex', flexDirection: ' row', width: '100%' }}>
              <TableContainer>
                <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>S.No</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>Particular</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>Amount</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>1</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>INT RECD ON JL</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: 'center' }}>{totalInterest}</TableCell>
                  </TableRow>
                  <TableBody></TableBody>
                </Table>
              </TableContainer>
              <TableContainer>
                <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 200 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>S.No</TableCell>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>Particular</TableCell>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((record, index) => (
                      <TableRow key={index}>
                        <TableCell style={{ border: '1px solid #000', align: 'center' }}>{record['S.no']}</TableCell>
                        <TableCell style={{ border: '1px solid #000', align: 'center' }}>{record.Particular}</TableCell>
                        <TableCell style={{ border: '1px solid #000', align: 'center' }}>{record.Amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>10</TableCell>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>Gross Profit</TableCell>
                      <TableCell style={{ border: '1px solid #000', align: 'center' }}>{profitLossBalance}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Paper elevation={2} style={{ flex: '1', margin: '2rem 1rem', maxWidth: '500px' }}>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Total  :</TableCell>
                <TableCell style={{ textAlign: 'center' }}>{totalInterest}</TableCell>
              </TableRow>
            </Paper>

            <Paper elevation={2} style={{ flex: '1', margin: '2rem 1rem', maxWidth: '500px' }}>
              <TableRow>
                <TableCell style={{ textAlign: 'center' }}>Total  :</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {parseFloat(totalCommonParticularsAmount) + parseFloat(profitLossBalance)}
                </TableCell>
              </TableRow>
            </Paper>
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