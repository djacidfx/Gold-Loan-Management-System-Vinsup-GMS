import {
    Box,
    Button,
    Grid,
    Modal,
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
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import img1 from './Login.png';
import './Print.css';

import { Form, Row } from 'react-bootstrap';

import { makeStyles } from '@mui/styles';

const paperStyle = {
  padding: 20,

  height: 'auto',

  width: '100%',

  margin: '30px auto'
};

const style = {
  position: 'absolute',

  top: '50%',

  left: '50%',

  transform: 'translate(-50%, -50%)',

  width: 500,

  bgcolor: 'background.paper',

  border: '1px solid #000',

  boxShadow: 24,

  p: 4
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,

    borderCollapse: 'collapse',

    '& .MuiTableCell-root': {
      border: '1px solid black',

      padding: '10px',

      fontSize: '18px'
    }
  },

  amountCell: {
    background: '#f0f0f0',

    textAlign: 'right',

    '&.Amount': {
      background: '#e0e0e0',

      textAlign: 'right',

      fontWeight: 'bold'
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

const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();

  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const tomorrow = new Date();

tomorrow.setDate(tomorrow.getDate() + 1);

function CashScroll() {
  const [formValues, setFormValues] = useState({
    particulars: '',

    opening_amount: '',

    date: tomorrow.toISOString().split('T')[0],

    closing_amount: '',

    credit_total_amount: '',

    debit_total_amount: '',

    //credit denomination

    csc_name1: '500',

    csc_count500: '0',

    csc_total1: '',

    csc_name2: '200',

    csc_count200: '0',

    csc_total2: '',

    csc_name3: '100',

    csc_count100: '0',

    csc_total3: '',

    csc_name4: '50',

    csc_count50: '0',

    csc_total4: '',

    csc_name5: '20',

    csc_count20: '0',

    csc_total5: '',

    csc_name6: '10',

    csc_count10: '0',

    csc_total6: '',

    csc_name7: '5',

    csc_count5: '0',

    csc_total7: '',

    csc_name8: '2',

    csc_count2: '0',

    csc_total8: '',

    csc_name9: '1',

    csc_count1: '0',

    csc_total9: '',

    selectedDate: getCurrentDate()
  });

  const [cashRecords, setCashRecords] = useState([]);

  const [cashScrolls, setCashScrolls] = useState([]);

  const [whole1Total, setWhole1Total] = useState(0);
  const printRef = useRef(null);

  const tableRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);

    setFormValues((prevFormValues) => ({
      ...prevFormValues,

      date: getCurrentDate(), // Set current date

      closing_amount: differenceAmount.toFixed(2) // Set closing balance
    }));
  };

  const handleClose = () => setOpen(false);

  const classes = useStyles();

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          debitsRes,

          creditsRes,

          loanApprovalsRes,

          cashScrollsRes,

          bankCreditsRes,

          bankDebitsRes,

          capitalCreditsRes,

          capitalDebitsRes,

          furnitureCreditsRes,

          furnitureDebitsRes,

          jewelloanCreditsRes,

          jewelloanDebitsRes,

          expencesDebitsRes,

          expencesCreditsRes,

          suspenceCreditsRes,

          suspenceDebitsRes,

          profitlossCreditsRes,

          profitlossDebitsRes,

          PartpaymentCreditsRes,

         SettlementCreditsRes
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/jewelloandebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/jewelloancredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/cashscrolls`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/bankcredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/bankdebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/capitalcredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/capitaldebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/furniturecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/furnituredebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/jewelloancredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/jewelloandebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencesdebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/expencescredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/suspencecredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/suspencedebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/profitlosscredits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/profiflossdebits`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/partpayments`),

          axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlements`)
        ]);

        const debitsData = debitsRes.data.jewelloandebit || [];

        const creditsData = creditsRes.data.jewelloancredit || [];

        const loanApprovalsData = loanApprovalsRes.data.loanapprovaldetails || [];

        const cashScrollsData = cashScrollsRes.data.cashscrolls || [];

        

        const bankCreditData = bankCreditsRes.data.bankcredit || [];

        const bankDebitData = bankDebitsRes.data.bankdebit || [];

        const CapitalCreditData = capitalCreditsRes.data.capitalcredit || [];

        const CapitalDebitData = capitalDebitsRes.data.capitaldepit || [];

        const furnitureCreditData = furnitureCreditsRes.data.furniturecredit || [];

        const furnitureDebitData = furnitureDebitsRes.data.furnituredebit || [];

        const jewelloanCreditData = jewelloanCreditsRes.data.jewelloancredit || [];

        const jewelloanDebitData = jewelloanDebitsRes.data.jewelloandebit || [];

        const expencesDebitData = expencesDebitsRes.data.expencesdebit || [];

        console.log('Expense', expencesDebitsRes.data);

        const expencesCreditData = expencesCreditsRes.data.expencescredit || [];

        const suspenceCreditData = suspenceCreditsRes.data.suspencecredit || [];

        const suspenceDebitData = suspenceDebitsRes.data.suspencedebit || [];

        const profitlossCreditData = profitlossCreditsRes.data.profitandlosscredit || [];

        console.log('ProfitlossCredits Response', profitlossCreditsRes.data);

        console.log('ProfitlossCreditData', profitlossCreditData);

        const profitlossDebitData = profitlossDebitsRes.data.profitandlossdebit || [];

        const partpaymentCreditData =PartpaymentCreditsRes.data.partpayment || [];

        console.log('partpaymentCreditData', partpaymentCreditData);


        const settlementCreditData = SettlementCreditsRes.data.settlement || [];

        const cashScrollsDataWithFormattedDates = cashScrollsData.map((cashscroll) => ({
          ...cashscroll,

          date: new Date(cashscroll.date)
        }));


// Fetch customer data
      const customersRes = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/customers`);
      const customersData = customersRes.data.customers || [];

      // Create a map of customer_id to customer_name
      const customerMap = {};
      customersData.forEach((customer) => {
        customerMap[customer.customer_id] = customer.customer_name;
      });



        const mergedData = [

          ...loanApprovalsData.map((approval) => ({
            date: approval.created_at,

            id: 'GLD-' + approval.loan_id,

            particulars: customerMap[approval.customer_id] || 'Unknown Customer',

            jewelloan_debit_amount: approval.loan_amount
          })),

          ...loanApprovalsData.map((approval) => ({
            date: approval.created_at,

            id: 'PLADJD-' + approval.loan_id,

            particulars: 'Adj-'+customerMap[approval.customer_id] || 'Unknown Customer' ,

            jewelloan_debit_amount: approval.adjustment_charges
          })),
          ...loanApprovalsData.map((approval) => ({
            date: approval.created_at,

            id: 'PLADC-' + approval.loan_id,

            particulars: 'Adc-' +customerMap[approval.customer_id] || 'Unknown Customer',

            jewelloan_credit_amount: approval.additional_charges
          })),


          ...cashScrollsDataWithFormattedDates.map((cashscroll) => ({
            date: cashscroll.date,

            particulars: 'OpeningCash',

            jewelloan_credit_amount: cashscroll.opening_amount
          })),

          ...bankCreditData.map((bankcredit) => ({
            date: bankcredit.bankaccount_credit_date,

            id: 'BAC-' + bankcredit.bankaccount_credit_receipt_no,

            particulars: bankcredit.bankaccount_credit_remark,

            jewelloan_credit_amount: bankcredit.bankaccount_credit_amount
          })),

          ...bankDebitData.map((bankdebit) => ({
            date: bankdebit.bankaccount_debit_date,

            id: 'BAD-'+ bankdebit.bankaccount_debit_receipt_no,

            particulars: bankdebit.bankaccount_debit_remark,

            jewelloan_debit_amount: bankdebit.bankaccount_debit_amount
          })),

          ...CapitalCreditData.map((capitalcredit) => ({
            date: capitalcredit.capital_credit_date,

            id: 'CAC-'+capitalcredit.capital_credit_receipt_no,

            particulars: capitalcredit.capital_credit_remark,

            jewelloan_credit_amount: capitalcredit.capital_credit_amount
          })),

          ...CapitalDebitData.map((capitaldebit) => ({
            date: capitaldebit.capital_debit_date,

            id: 'CAD-'+capitaldebit.capital_debit_receipt_no,

            particulars: capitaldebit.capital_debit_remark,

            jewelloan_debit_amount: capitaldebit.capital_debit_amount
          })),

          ...furnitureCreditData.map((furniturecredit) => ({
            date: furniturecredit.furniture_credit_date,

            id: 'FC-'+furniturecredit.furniture_credit_receipt_no,

            particulars: furniturecredit.furniture_credit_remark,

            jewelloan_credit_amount: furniturecredit.furniture_credit_amount
          })),

          ...furnitureDebitData.map((furnituredebit) => ({
            date: furnituredebit.furniture_debit_date,

            id: 'FD-'+furnituredebit.furniture_debit_receipt_no,

            particulars: furnituredebit.furniture_debit_remark,

            jewelloan_debit_amount: furnituredebit.furniture_debit_amount
          })),

          ...jewelloanDebitData.map((jewelloandebit) => ({
            date: jewelloandebit.jewelloan_debit_date,

            id: 'JLD-'+jewelloandebit.jewelloan_debit_receipt_no,

            particulars: 	jewelloandebit.jewelloan_debit_remark,

            jewelloan_debit_amount: jewelloandebit.jewelloan_debit_amount
          })),

          ...jewelloanCreditData.map((jewelloancredit) => ({
            date: jewelloancredit.jewelloan_credit_date,

            id:'JLC-'+ jewelloancredit.jewelloan_credit_receipt_no,

            particulars: jewelloancredit.jewelloan_credit_remark,

            jewelloan_credit_amount: jewelloancredit.jewelloan_credit_amount
          })),

          ...expencesCreditData.map((expencescredit) => ({
            date: expencescredit.expences_credit_date,

            id: 'EC-'+ expencescredit.expences_credit_receipt_id,

            particulars: expencescredit.expences_credit_remark,

            jewelloan_credit_amount: expencescredit.expences_credit_amount
          })),

          ...expencesDebitData.map((expencesdebit) => ({
            date: expencesdebit.expences_debit_date,

            id: 'ED-'+ expencesdebit.expences_debit_receipt_id,

            particulars: expencesdebit.expences_debit_remark,

            jewelloan_debit_amount: expencesdebit.expences_debit_amount
          })),

          ...suspenceDebitData.map((suspencedebit) => ({
            date: suspencedebit.suspence_debit_date,

            id: 'SD-'+ suspencedebit.suspence_debit_recipt_id,

            particulars: suspencedebit.suspence_debit_remark ,

            jewelloan_debit_amount: suspencedebit.suspence_debit_amount
          })),

          ...suspenceCreditData.map((suspencecredit) => ({
            date: suspencecredit.suspence_credit_date,

            id:'SC-'+  suspencecredit.suspence_credit_recipt_id,

            particulars: suspencecredit.suspence_credit_remark,

            jewelloan_credit_amount: suspencecredit.suspence_credit_amount
          })),

          ...profitlossCreditData.map((profitandlosscredit) => ({
            date: profitandlosscredit.profitandloss_credit_date,

            id:'PLC-'+  profitandlosscredit.profitandloss_credit_receipt_no,

            particulars: profitandlosscredit.profitandloss_credit_remark,

            jewelloan_credit_amount: profitandlosscredit.profitandloss_credit_amount
          })),

          ...profitlossDebitData.map((profitandlossdebit) => ({
            date: profitandlossdebit.profitandloss_debit_date,

          id:'PLD-'+  profitandlossdebit.profitandloss_debit_receipt_id,

            particulars: profitandlossdebit.profitandloss_debit_remark,

            jewelloan_debit_amount: profitandlossdebit.profitandloss_debit_amount
          })),

          ...partpaymentCreditData.map((partpayment) => ({
            date: partpayment.date1,

            id:'PPC-'+  partpayment.partpayment_id,

            particulars: "PaymentAmount-LoadID-"+partpayment.loan_id,

            jewelloan_credit_amount: partpayment.payment_amount
          })),
          ...partpaymentCreditData.map((partpayment) => ({
            date: partpayment.date1,

            id:'PPIC-'+  partpayment.partpayment_id,

            particulars: "PaymentIntrest-LoadID-"+partpayment.loan_id,

            jewelloan_credit_amount: partpayment.interest
          })),

          ...settlementCreditData.map((settlement) => ({
            date: settlement.date,

            id:'SPIC-'+  settlement.settlement_id ,

            particulars: "SettlementIntrest-LoadID-"+settlement.loan_id,

            jewelloan_credit_amount: settlement.interest1
          })),

          ...settlementCreditData.map((settlement) => ({
            date: settlement.date,

            id:'SPC-'+  settlement.settlement_id ,

            particulars: "SettlementAmount-LoadID-"+settlement.loan_id,

            jewelloan_credit_amount: settlement.loanamount
          })),
          ...settlementCreditData.map((settlement) => ({
            date: settlement.date,

            id:'SPAC-'+  settlement.settlement_id ,

            particulars: "AdditionalCharge-LoadID-"+settlement.loan_id,

            jewelloan_credit_amount: settlement.additional_charge
          })),
          ...settlementCreditData.map((settlement) => ({
            date: settlement.date,

            id:'SPAD-'+  settlement.settlement_id ,

            particulars: "AdjustmentCharge-LoadID-"+settlement.loan_id,

            jewelloan_debit_amount: settlement.adjustment_charge
          }))

        ].sort((a, b) => new Date(a.date) - new Date(b.date));

        setCashRecords(mergedData);
      } catch (error) {
        console.error(error);
      }
    }

    function formatDateString(date) {
      const options = { month: 'short', day: 'numeric' };

      return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    fetchData();
  }, []);

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,

      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('Fetching existing records...');

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/cashscrolls`);

      const existingRecords = response.data.cashscrolls;

      console.log('Existing Records:', existingRecords);

      const matchingRecord = existingRecords.find((record) => record.date === formValues.date);

      // if (matchingRecord && matchingRecord.closing_amount !== '') {
      //   console.log('Closing Amount:', matchingRecord.closing_amount);

      //   alert('Closing amount for this date has already been updated.');

      //   return;
      // }

      const updatedRecord = {
        closing_amount: formValues.closing_amount
      };

      console.log('Updating record...');

      const putResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/${formValues.date}`, updatedRecord);

      console.log('Response:', putResponse.data);

      // Assuming putResponse.data has cashscroll_id

      const cashscrollId = putResponse.data.cashscroll_id;

      // Here is the new POST API call

      const cscValues = {
        cashscroll_id: cashscrollId,

        csc_count500: formValues.csc_count500,

        csc_count200: formValues.csc_count200,

        csc_count100: formValues.csc_count100,

        csc_count50: formValues.csc_count50,

        csc_count20: formValues.csc_count20,

        csc_count10: formValues.csc_count10,

        csc_count5: formValues.csc_count5,

        csc_count2: formValues.csc_count2,

        csc_count1: formValues.csc_count1
      };

      console.log('Inserting csc values into the database...');

      const postResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/cashscrolldenomination`, cscValues);

      console.log('POST Response:', postResponse.data);

      // Reset form values

      setFormValues({
        particulars: '',

        opening_amount: '',

        date: tomorrow.toISOString().split('T')[0],

        closing_amount: '',

        credit_total_amount: '',

        debit_total_amount: '',

        selectedDate: getCurrentDate(),

        csc_count500: '',

        csc_count200: '',

        csc_count100: '',

        csc_count50: '',

        csc_count20: '',

        csc_count10: '',

        csc_count5: '',

        csc_count2: '',

        csc_count1: ''
      });

      setOpen(false); // Close the modal after submitting
    } catch (error) {
      console.error(error);
    }
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prevFormValues) => ({
      ...prevFormValues,

      [name]: value
    }));
  };

  const formatDate = (date) => {
    const d = new Date(date);

    const year = d.getUTCFullYear();

    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2);

    const day = ('0' + d.getUTCDate()).slice(-2);

    return `${year}-${month}-${day}`;
  };

  const filteredCreditRecords = cashRecords.filter((record) => {
    const recordDate = formatDate(record.date);

    const selectedDate = formatDate(formValues.selectedDate);

    return record.jewelloan_credit_amount !== undefined && (!formValues.selectedDate || recordDate === selectedDate);
  });

  const filteredDebitRecords = cashRecords.filter((record) => {
    const recordDate = formatDate(record.date);

    const selectedDate = formatDate(formValues.selectedDate);

    return record.jewelloan_debit_amount !== undefined && (!formValues.selectedDate || recordDate === selectedDate);
  });

  // Calculate total credit amount based on the selected date

  const totalCreditAmount = filteredCreditRecords.reduce((total, record) => total + (parseFloat(record.jewelloan_credit_amount) || 0), 0);

  // Calculate total debit amount

  const totalDebitAmount = filteredDebitRecords.reduce((total, record) => total + (parseFloat(record.jewelloan_debit_amount) || 0), 0);

  // Calculate the difference between total credit and total debit

  const differenceAmount = totalCreditAmount - totalDebitAmount;

  const thirdInputValue = differenceAmount + totalDebitAmount;

  //cash denomination credit

  const handleCountChange = (event) => {
    const { name, value } = event.target;

    const index = parseInt(name.replace('csc_count', ''), 10);

    setFormValues((prevData) => ({
      ...prevData,

      [`csc_count${index}`]: value,

      [`csc_total${index}`]: (parseFloat(value) * prevData[`csc_name${index}`]).toFixed(2)
    }));
  };
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
  useEffect(() => {
    const calculateTotals = () => {
      const csc_total1 = parseFloat(formValues.csc_count500) * formValues.csc_name1;

      const csc_total2 = parseFloat(formValues.csc_count200) * formValues.csc_name2;

      const csc_total3 = parseFloat(formValues.csc_count100) * formValues.csc_name3; // Calculate other totals similarly

      const csc_total4 = parseFloat(formValues.csc_count50) * formValues.csc_name4;

      const csc_total5 = parseFloat(formValues.csc_count20) * formValues.csc_name5;

      const csc_total6 = parseFloat(formValues.csc_count10) * formValues.csc_name6;

      const csc_total7 = parseFloat(formValues.csc_count5) * formValues.csc_name7;

      const csc_total8 = parseFloat(formValues.csc_count2) * formValues.csc_name8;

      const csc_total9 = parseFloat(formValues.csc_count1) * formValues.csc_name9;

      setFormValues((prevData) => ({
        ...prevData,

        csc_total1: csc_total1.toFixed(2),

        csc_total2: csc_total2.toFixed(2),

        csc_total3: csc_total3.toFixed(2),

        csc_total4: csc_total4.toFixed(2),

        csc_total5: csc_total5.toFixed(2),

        csc_total6: csc_total6.toFixed(2),

        csc_total7: csc_total7.toFixed(2),

        csc_total8: csc_total8.toFixed(2),

        csc_total9: csc_total9.toFixed(2)

        // Update other total values here
      }));

      const sum =
        csc_total1 +
        csc_total2 +
        csc_total3 +
        csc_total4 +
        csc_total5 +
        csc_total6 +
        csc_total7 +
        csc_total8 +
        csc_total9; /* Add other total values here */

      setWhole1Total(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    formValues.csc_name1,

    formValues.csc_count500,

    formValues.csc_name2,

    formValues.csc_count200,

    formValues.csc_name3,

    formValues.csc_count100,

    formValues.csc_name4,

    formValues.csc_count50,

    formValues.csc_name5,

    formValues.csc_count20,

    formValues.csc_name6,

    formValues.csc_count10,

    formValues.csc_name7,

    formValues.csc_count5,

    formValues.csc_name8,

    formValues.csc_count2,

    formValues.csc_name9,

    formValues.csc_count1
  ]);

  return (
   
    <Grid container justifyContent="center">
      <Paper elevation={5} style={{ height: 'auto', marginTop: '04rem', ...paperStyle }}>
      <div style={{ border: '2px solid #000', borderRadius: '5px', padding: '20px', margin: '10px' }}>
    <div ref={printRef}>
      <div style={{ textAlign: 'center' }}>
        <img src={img1} alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
        <form onSubmit={handleSubmit}>
          <Form.Label className="mb">
            <br />

            <h3>
              <b>&nbsp;&nbsp; CashScroll</b>
            </h3>
          </Form.Label>

          <hr className="hori-col-3" />

          <Grid item xs={12} sm={3}>
            <Typography style={{ marginBottom: '0.5rem' }}>Select Date</Typography>

            <TextField
              type="date"
              fullWidth
              variant="outlined"
              name="selectedDate"
              size="small"
              value={formValues.selectedDate}
              onChange={handleDateChange}
            />
          </Grid>

          <br />

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4}>
                    <b>Receipts</b>
                  </TableCell>

                  <TableCell colSpan={4}>
                    <b>Payments</b>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>H.ID</TableCell>
                  <TableCell>Particulars</TableCell>

                  <TableCell>Credit Amount</TableCell>

                  <TableCell>Date</TableCell>
                  <TableCell>H.ID</TableCell>
                  <TableCell>Particulars</TableCell>

                  <TableCell>Debit Amount</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
  {filteredCreditRecords.map((creditRecord, index) => (
    <TableRow key={`record-${index}`}>
      <TableCell align="center">
        {creditRecord.date
          ? new Date(creditRecord.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC'
            })
          : '-'}
      </TableCell>

      <TableCell align="center">{creditRecord.id}</TableCell> {/* Add id here */}
      <TableCell align="center">{creditRecord.particulars}</TableCell>

      <TableCell align="center">
        {creditRecord.jewelloan_credit_amount !== undefined ? creditRecord.jewelloan_credit_amount : ''}
      </TableCell>

      {filteredDebitRecords[index] ? (
        <>
          <TableCell align="center">
            {filteredDebitRecords[index].date
              ? new Date(filteredDebitRecords[index].date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  timeZone: 'UTC'
                })
              : '-'}
          </TableCell>

          <TableCell align="center">{filteredDebitRecords[index].id}</TableCell> {/* Add id here */}
          <TableCell align="center">{filteredDebitRecords[index].particulars}</TableCell>

          <TableCell align="center">
            {filteredDebitRecords[index].jewelloan_debit_amount !== undefined
              ? filteredDebitRecords[index].jewelloan_debit_amount
              : ''}
          </TableCell>
        </>
      ) : (
        <>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
          <TableCell align="center"></TableCell>
        </>
      )}
    </TableRow>
  ))}

  {/* Handle any extra debit records */}
  {filteredDebitRecords.slice(filteredCreditRecords.length).map((debitRecord, index) => (
    <TableRow key={`debit-record-${index}`}>
      <TableCell align="center"></TableCell>

      <TableCell align="center"></TableCell>

      <TableCell align="center"></TableCell>
      <TableCell align="center"></TableCell>
      <TableCell align="center">
        {debitRecord.date
          ? new Date(debitRecord.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              timeZone: 'UTC'
            })
          : '-'}
      </TableCell>

      <TableCell align="center">{debitRecord.id}</TableCell> {/* Add id here */}
      <TableCell align="center">{debitRecord.particulars}</TableCell>

      <TableCell align="center">
        {debitRecord.jewelloan_debit_amount !== undefined ? debitRecord.jewelloan_debit_amount : ''}
      </TableCell>
      
     
    </TableRow>
  ))}

                <TableRow>
                  <TableCell className={`${classes.amountCell} Amount`} colSpan={4}>
                    {/* Total Credit Amount */}
                    <label>Total Amount</label> <br></br>
                    <input type="text" value={!isNaN(totalCreditAmount) ? totalCreditAmount.toFixed(2) : ''} readOnly />
                  </TableCell>

                  <TableCell className={`${classes.amountCell} Amount`} colSpan={4}>
                    {/* Difference Amount */}

                    <label>Closing Balance</label>

                    <br></br>

                    <input type="text" value={!isNaN(differenceAmount) ? differenceAmount.toFixed(2) : ''} readOnly />

                    <br></br>

                    <br></br>

                    <label>Total Amount</label>

                    <br></br>

                    <input type="text" value={!isNaN(thirdInputValue) ? thirdInputValue.toFixed(2) : ''} readOnly />
                  </TableCell>

                  {/* Third Input Box */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Row></Row>

          <br></br>

          <Button variant="contained"  className="print-hidden" style={{ marginLeft: '850px' }} onClick={handleOpen}>
            Done
          </Button>

          <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h3">Closing Amount</Typography>

                  <br />

                  <TextField
                    type="text"
                    size="small"
                    placeholder="Closing Amount"
                    name="closing_amount" // Add this line to link the input with state
                    value={formValues.closing_amount} // Bind the value to the state
                    onChange={handleFormChange} // Handle changes to update the state
                  />
                </Grid>

                <br></br>

                <Grid item style={{ marginTop: '0.7in', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography
                        style={{
                          marginBottom: '0.9rem',
                          textAlign: 'center', // Center the text horizontally
                          whiteSpace: 'nowrap' // Ensure the text stays on a single line
                        }}
                        variant="h4"
                      >
                        Cash Denomination
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <TableContainer component={Paper} style={tableContainerStyle}>
                  <Table style={tableStyle}>
                    <TableBody>
                      <br></br>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name1" readOnly value={formValues.csc_name1} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count500"
                            value={formValues.count500}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total1" readOnly value={formValues.csc_total1} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name2" readOnly value={formValues.csc_name2} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count200"
                            value={formValues.count200}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total2" readOnly value={formValues.csc_total2} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name3" readOnly value={formValues.csc_name3} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count100"
                            value={formValues.count100}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total3" readOnly value={formValues.csc_total3} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name4" readOnly value={formValues.csc_name4} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count50"
                            value={formValues.count50}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total4" readOnly value={formValues.csc_total4} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name5" readOnly value={formValues.csc_name5} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count20"
                            value={formValues.count20}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total5" readOnly value={formValues.csc_total5} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name6" readOnly value={formValues.csc_name6} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count10"
                            value={formValues.csc_count10}
                            style={{ width: '60px' }}
                            onChange={handleCountChange}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total6" readOnly value={formValues.csc_total6} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name7" readOnly value={formValues.csc_name7} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count5"
                            value={formValues.count5}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total7" readOnly value={formValues.csc_total7} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name8" readOnly value={formValues.csc_name8} style={{ width: '60px' }} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count2"
                            value={formValues.count2}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total8" readOnly value={formValues.csc_total8} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="csc_name9" readOnly style={{ width: '60px' }} value={formValues.csc_name9} />
                        </TableCell>

                        <TableCell>
                          <input
                            type="text"
                            name="csc_count1"
                            value={formValues.count1}
                            style={{ width: '60px' }}
                            onChange={handleCountChange}
                          />
                        </TableCell>

                        <TableCell>
                          <input type="text" name="csc_total9" readOnly value={formValues.csc_total9} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Whole Total:</TableCell>

                        <TableCell></TableCell>

                        <TableCell>{whole1Total}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item xs={12}>
                  &nbsp;&nbsp;
                  <Button variant="contained" color="primary" onClick={handleClose}>
                    Close
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={formValues.closing_amount !== String(whole1Total)}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Modal>
        </form>
        <div style={{ textAlign: 'center' }}>
          <br></br>
          <ReactToPrint trigger={() => <Button  className="print-hidden" variant="contained">Print Table</Button>} content={() => printRef.current} />
          </div>
        </div>
      </div>
    </div>
      </Paper>
    </Grid>
   
  );
}
export default CashScroll;
