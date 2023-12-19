import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Transferlist() {
  const [creditData, setCreditData] = useState([]);
  const [debitData, setDebitData] = useState([]);
  const currentDate = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(currentDate); // Single date state
  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  // Styled component for credit cell
  const CreditTableCell = styled.td`
  border: 1px solid #000;
  color: green;
  font-weight: bold;`;
  // Styled component for debit cell
  const DebitTableCell = styled.td`
  border: 1px solid #000;
  color: red;
  font-weight: bold;`;

// Function to filter records by date
const filterRecordsByDate = (records, date) => {
  return records.filter((record) => {
    const recordDate = new Date(record.C_date || record.D_date); // Adjust the field based on whether it's credit or debit
    const selectedDateObj = new Date(date);
    return recordDate.toDateString() === selectedDateObj.toDateString();
  });
};
  useEffect(() => {
    const fetchCreditAndDebitRecords = async () => {
      try {
        console.log('Fetching records...');
        let capitalcredits, bankcredits, jewelloancredits, profitandlosscredits, suspencecredits, furniturecredits, expencescredits;
        
        const responsecredit = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfercapitalcredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferbankcredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferjewelloancredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferprofitandlosscredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencecredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferfurniturecredits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencescredits`)
        ]);

        // Destructure the responses after defining the variables
        [
          capitalcredits,
          bankcredits,
          jewelloancredits,
          profitandlosscredits,
          suspencecredits,
          furniturecredits,
          expencescredits
        ] = responsecredit;

       // Example for handling empty credit data
        const capitalcreditsArray = capitalcredits.data.transfercapitalcredit || [];
        console.log('capitalcredits data:', capitalcreditsArray);
        const capitalcreditsData = capitalcreditsArray.map((approval) => ({
          C_receipt_id:'Capital Credit-' +approval.transfercapitalcredit_receipt_id,
          C_credit_amount:approval.transfercapital_credit_amount,
          C_remark:  approval.transfercapital_credit_remark,
          C_date:approval.transfercapital_credit_date
        }));

        const bankcreditsArray = bankcredits.data.transferbankcredit|| [];
        console.log('bankcredits data:', bankcreditsArray);
        const bankcreditsData = bankcreditsArray.map((approval) => ({
          C_receipt_id:'Bank Credit-' + approval.transferbankcredit_receipt_id,
          C_credit_amount: approval.transferbank_credit_amount,
          C_remark:  approval.transferbank_credit_remark,
          C_date: approval.transferbank_credit_date
        }));

        const jewelloancreditsArray = jewelloancredits.data.transferjewelloancredit|| [];
        console.log('jewelloancredits data:', jewelloancreditsArray);
        const jewelloancreditsData = jewelloancreditsArray.map((approval) => ({
          C_receipt_id: 'Jewel Loan Cedit-' +approval.transferjewelloancredit_receipt_id,
          C_credit_amount: approval.transferjewelloan_credit_amount,
          C_remark:  approval.transferjewelloan_credit_remark,
          C_date: approval.transferjewelloan_credit_date
        }));

        const profitandlosscreditsArray = profitandlosscredits.data.transferprofitandlosscredit|| [];
        console.log('profitandlosscredits data:', profitandlosscreditsArray);
        const profitandlosscreditsData = profitandlosscreditsArray.map((approval) => ({
          C_receipt_id:  'Profit and Loss Credit-' +approval.transferprofitandlosscredit_receipt_id,
          C_credit_amount: approval.transferprofitandloss_credit_amount,
          C_remark: approval.transferprofitandloss_credit_remark,
          C_date: approval.transferprofitandloss_credit_date
        }));

        const suspencecreditsArray = suspencecredits.data.transfersuspencecredit|| [];
        console.log('suspencecredits data:', suspencecreditsArray);
        const suspencecreditsData = suspencecreditsArray.map((approval) => ({
          C_receipt_id: 'Suspence Credit-' +  approval.transfersuspencecredit_receipt_id,
          C_credit_amount: approval.transfersuspence_credit_amount,
          C_remark:approval.transfersuspence_credit_remark,
          C_date: approval.transfersuspence_credit_date
        }));

        const furniturecreditsArray = furniturecredits.data.transferfurniturecredit|| [];
        console.log('furniturecredits data:', furniturecreditsArray);
        const furniturecreditsData = furniturecreditsArray.map((approval) => ({
          C_receipt_id:  'Furniture Credit-' + approval.transferfurniturecredit_receipt_id ,
          C_credit_amount: approval.transferfurniture_credit_amount,
          C_remark:approval.transferfurniture_credit_remark,
          C_date: approval.transferfurniture_credit_date
        }));

        const expencescreditsArray = expencescredits.data.transferexpencescredit|| [];
        console.log('expencescredits data:', expencescreditsArray);
        const expencescreditsData = expencescreditsArray.map((approval) => ({
          C_receipt_id:  'Expences Credit-' +approval.transferexpencescredit_receipt_id  ,
          C_credit_amount: approval.transferexpences_credit_amount,
          C_remark: approval.transferexpences_credit_remark,
          C_date: approval.transferexpences_credit_date
        }));
        const datacredit = responsecredit.data;

        let capitaldebits,
        bankdebits,
        jewelloandebits,
        profitandlossdebits,
        suspencedebits,
        furnituredebits,
        expencesdebits;
        
        const responsedebit = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfercapitaldebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferbankdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferjewelloandebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferprofitandlossdebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transfersuspencedebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferfurnituredebits`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/transferexpencesdebits`)
        ]);

        // Destructure the responses after defining the variables
        [
          capitaldebits,
          bankdebits,
          jewelloandebits,
          profitandlossdebits,
          suspencedebits,
          furnituredebits,
          expencesdebits
        ] = responsedebit;

        const capitaldebitsArray = capitaldebits.data.transfercapitaldebit|| [];
        console.log('capitaldebits data:', capitaldebitsArray);
        const capitaldebitsData = capitaldebitsArray.map((approval) => ({
          D_receipt_id: 'Capital Debit-' + approval.transfercapitaldebit_receipt_id  ,
          D_debit_amount: approval.transfercapital_debit_amount,
          D_remark: approval.transfercapital_debit_remark,
          D_date: approval.transfercapital_debit_date
        }));

        const bankdebitsArray = bankdebits.data.transferbankdebit|| [];
        console.log('bankdebits data:', bankdebitsArray);
        const bankdebitsData = bankdebitsArray.map((approval) => ({
          D_receipt_id:'Bank Debit-' + approval.transferbankdebit_receipt_id ,
          D_debit_amount: approval.transferbank_debit_amount,
          D_remark:  approval.transferbank_debit_remark,
          D_date: approval.transferbank_debit_date
        }));

        const jewelloandebitsArray = jewelloandebits.data.transferjewelloandebit|| [];
        console.log('jewelloandebits data:', jewelloandebitsArray);
        const jewelloandebitsData = jewelloandebitsArray.map((approval) => ({
          D_receipt_id: 'Jewel Loan Debit-' +approval.transferjewelloandebit_receipt_id   ,
          D_debit_amount: approval.transferjewelloan_debit_amount,
          D_remark: approval.transferjewelloan_debit_remark,
          D_date: approval.transferjewelloan_debit_date
        }));

        const profitandlossdebitsArray = profitandlossdebits.data.transferprofitandlossdebit|| [];
        console.log('profitandlossdebits data:', profitandlossdebitsArray);
        const profitandlossdebitsData = profitandlossdebitsArray.map((approval) => ({
          D_receipt_id:  'Profit and Loss Debit-' + approval.transferprofitandlossdebit_receipt_id   ,
          D_debit_amount: approval.transferprofitandloss_debit_amount,
          D_remark:approval.transferprofitandloss_debit_remark,
          D_date: approval.transferprofitandloss_debit_date
        }));

        const suspencedebitsArray = suspencedebits.data.transfersuspencedebit|| [];
        console.log('suspencedebits data:', suspencedebitsArray);
        const suspencedebitsData = suspencedebitsArray.map((approval) => ({
          D_receipt_id: 'Suspence Debit-' +approval.transfersuspencedebit_receipt_id  ,
          D_debit_amount: approval.transfersuspence_debit_amount,
          D_remark: approval.transfersuspence_debit_remark,
          D_date: approval.transfersuspence_debit_date
        }));

        const furnituredebitsArray = furnituredebits.data.transferfurnituredebit|| [];
        console.log('furnituredebits data:', furnituredebitsArray);
        const furnituredebitsData = furnituredebitsArray.map((approval) => ({
          D_receipt_id:'Furniture Debit-' + approval.transferfurnituredebit_receipt_id ,
          D_debit_amount: approval.transferfurniture_debit_amount,
          D_remark:approval.transferfurniture_debit_remark,
          D_date: approval.transferfurniture_debit_date
        }));

        const expencesdebitsArray = expencesdebits.data.transferexpencesdebit|| [];
        console.log('expencesdebits data:', expencesdebitsArray);
        const expencesdebitsData = expencesdebitsArray.map((approval) => ({
          D_receipt_id: 'Expences Debit-' +approval.transferexpencesdebit_receipt_id   ,
          D_debit_amount: approval.transferexpences_debit_amount,
          D_remark: approval.transferexpences_debit_remark,
          D_date: approval.transferexpences_debit_date
        }));
        const datadebit = responsedebit.data;
        const mergedcreditData = [...capitalcreditsData, ...bankcreditsData, ...jewelloancreditsData, ...profitandlosscreditsData, ...suspencecreditsData, ...furniturecreditsData, ...expencescreditsData];
        
        const mergeddebitData = [...capitaldebitsData, ...bankdebitsData, ...jewelloandebitsData, ...profitandlossdebitsData, ...suspencedebitsData, ...furnituredebitsData, ...expencesdebitsData];

        setCreditData(mergedcreditData);
        setDebitData(mergeddebitData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCreditAndDebitRecords();
  }, []);
  useEffect(() => {
    console.log('Selected Date:', selectedDate);
    console.log('Credit Data:', creditData);
    console.log('Debit Data:', debitData);
  }, [selectedDate, creditData, debitData]);

 // Filter credit and debit data based on the selected date
  const filteredCreditData = filterRecordsByDate(creditData, selectedDate);
  const filteredDebitData = filterRecordsByDate(debitData, selectedDate);

  return (
    <div>
      <br />
      <h4 style={{ fontFamily: 'Poppins' }}>Transfer List</h4>
      {/* Credit Table */}
      <div style={{ display: 'flex', justifyContent: '', marginBottom: '1rem' }}>
      <TextField
          label="Date"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <Paper elevation={2} style={{ margin: '2rem 0' }}>
        <div style={{ display: 'flex', flexDirection: ' row', width: '100%' }}>
          <TableContainer>
            <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 200 }} aria-label="simple table">
              <TableRow>
                <TableCell style={{ border: '1px solid #000' }} colSpan={5}>
                  Transferlist
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ border: '1px solid #000', align: "center" }} colSpan={5}>Credit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>S.NO</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Date</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>H.ID</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Particulars</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Amount</TableCell>
              </TableRow>
              <TableBody>
                {filteredCreditData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ border: '1px solid #000', align: "center" }} >{index + 1}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record.C_date}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record.C_receipt_id}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record.C_remark}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record.C_credit_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TableContainer>
            <Table style={{ border: '1px solid #000', align: "center" }} sx={{ minWidth: 200 }} aria-label="simple table">
              <TableRow>
                <TableCell style={{ border: '1px solid #000', align: "center" }} colSpan={5}>
                  Transferlist
                </TableCell>
              </TableRow>
              <TableRow >
                <TableCell style={{ border: '1px solid #000', align: "center" }} colSpan={5}>Debit</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>S.NO</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Date</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>H.ID</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Particulars</TableCell>
                <TableCell style={{ border: '1px solid #000', align: "center" }}>Amount</TableCell>
              </TableRow>
              <TableBody>
                {filteredDebitData.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{index + 1}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record. D_date}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record. D_receipt_id}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record. D_remark}</TableCell>
                    <TableCell style={{ border: '1px solid #000', align: "center" }}>{record. D_debit_amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
}
export default Transferlist;