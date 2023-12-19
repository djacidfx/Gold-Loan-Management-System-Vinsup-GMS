import { useEffect, useState } from 'react';

import axios from 'axios';

import { Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';

import Autocomplete from '@mui/material/Autocomplete';

import { differenceInCalendarDays, endOfMonth, format } from 'date-fns'; // You may need to install this package

import {
    Box,
    Button,
    Container,
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

const tableContainerStyle = {
  maxWidth: '600px', // Set your desired maximum width

  maxHeight: '200px', // Set your desired maximum height

  overflow: 'auto'

  // Enable scrolling if the table exceeds the maximum dimensions
};

const tableStyle = {
  width: '100%' // Make the table take the full width available within the TableContainer
};

const Repayment = () => {
  const [repledgeData, setRepledgeData] = useState({
    loan_id: '',
    additional_charge: '',
    adjustment_charge: '',
    interest1: '',
    date: new Date().toISOString().split('T')[0],
    date1: new Date().toISOString().split('T')[0],
    total_amount: '',
    interest_balance: '',
    paid_interest: '',
    payment_amount: '',
    loanamount: '',
    start_date: '',
    end_date: '',
    interest_only: '',
    name1: '500',
    count500: '0',
    total1: 0,
    name2: '200',
    count200: '0',
    total2: 0,
    name3: '100',
    count100: '0',
    total3: 0,
    name4: '50',
    count50: '0',
    total4: 0,
    name5: '20',
    count20: '0',
    total5: 0,
    name6: '10',
    count10: '0',
    total6: 0,
    name7: '5',
    count5: '0',
    total7: 0,
    name8: '2',
    count2: '0',
    total8: 0,
    name9: '1',
    count1: '0',
    total9: 0,

    s_name1: '500',

    s_count500: '0',

    s_total1: '',

    s_name2: '200',

    s_count200: '0',

    s_total2: '',

    s_name3: '100',

    s_count100: '0',

    s_total3: '',

    s_name4: '50',

    s_count50: '0',

    s_total4: '',

    s_name5: '20',

    s_count20: '0',

    s_total5: '',

    s_name6: '10',

    s_count10: '0',

    s_total6: '',

    s_name7: '5',
    s_count5: '0',
    s_total7: '',

    s_name8: '2',
    s_count2: '0',
    s_total8: '',
    s_name9: '1',
    s_count1: '0',
    s_total9: ''
    // Add loanamount to state
  });

  const [loanApprovals, setLoanApprovals] = useState([]);

  const [customers, setCustomers] = useState([]);

  const [interestTable, setInterestTable] = useState([]);

  const [settlements, setSettlements] = useState([]);

  const [partpayments, setPartpayments] = useState([]);

  const [lastPaymentDate, setLastPaymentDate] = useState(null);

  const [cashDenominations, setCashDenominations] = useState([0]);

  const [open, setOpen] = useState(false);

  const [open1, setOpen1] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleOpen = () => setOpen(true);

  const handleOpen2 = () => setOpen2(true);

  const handleOpen1 = () => {
    const selectedLoanId = repledgeData.loan_id;

    if (isLoanClosed(selectedLoanId)) {
      alert('Customer loan is closed. Payment not allowed.');

      return;
    }

    if (!selectedLoanId) {
      console.warn('handleOpen1 called without a valid loan_id');

      return; // Exit early if there's no valid loan ID
    }

    setRepledgeData((prevData) => ({
      ...prevData,

      interest1: calculateInterestForSettlement(selectedLoanId),

      loanamount: fetchLoanBalance(selectedLoanId)
    }));

    setOpen1(true);
  };
  const formatAsIndianCurrency = (amount) => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      style: 'decimal'
    }).format(amount);

    return formattedAmount;
  };

  const handleClose = () => setOpen(false);

  const handleClose1 = () => setOpen1(false);

  const handleClose2 = () => setOpen2(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const [whole1Total, setWhole1Total] = useState(0);
  const [wholeTotal, setWholeTotal] = useState(0);
  const [wholeTotal1, setWholeTotal1] = useState(0);
  const [change, setChange] = useState(0);
  const [change1, setChange1] = useState(0);
  const [lastAmount, setLastAmount] = useState(0);
  const [lastAmount1, setLastAmount1] = useState(0);
  const filterInterestByDateRange = (startDate, endDate) => {
    console.log('startDate:', startDate);

    console.log('endDate:', endDate);

    console.log('interestData:', interestTable);

    const filteredInterest = interestTable.filter((item) => {
      const itemDate = new Date(item.date);

      return itemDate >= startDate && itemDate <= endDate;
    });

    console.log('filteredInterest:', filteredInterest);

    const totalFilteredInterest = filteredInterest.reduce((total, item) => {
      const parsedAmount = parseFloat(item.interest_amount);

      if (isNaN(parsedAmount)) {
        console.log('Error parsing interest_amount:', item.interest_amount);
      } else {
        console.log('Adding amount:', parsedAmount);
      }

      return total + parsedAmount;
    }, 0);

    console.log('totalFilteredInterest:', totalFilteredInterest);

    return totalFilteredInterest;
  };

  const calculateTotalInterest = (filteredInterest) => {
    let totalFilteredInterest = 0;

    filteredInterest.forEach((item) => {
      const interestAmount = parseFloat(item.interest_amount);

      if (!isNaN(interestAmount)) {
        totalFilteredInterest += interestAmount;
      } else {
        console.log('Error parsing interest_amount:', item.interest_amount);
      }
    });

    console.log('totalFilteredInterest:', totalFilteredInterest);

    return totalFilteredInterest;
  };

  useEffect(() => {
    // Existing API calls

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`).then((response) => {
      setLoanApprovals(response.data.loanapprovaldetails || []);
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/customers`).then((response) => {
      setCustomers(response.data.customers || []);
    });

   

    // New API calls

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/settlements`).then((response) => {
      setSettlements(response.data.settlement || []); // Assuming the response structure
    });

    axios.get(`${process.env.REACT_APP_BASE_URL}/api/partpayments`).then((response) => {
      console.log('Part payment response:', response); // Log the entire response

      setPartpayments(response.data.partpayment || []); // Corrected path

      console.log('Part payment data:', response.data.partpayment); // Log the part payment data
    });
  }, []);

  const isLoanClosed = (loanId) => {
    const loanDetail = loanApprovals.find((loan) => String(loan.loan_id) === String(loanId));

    return loanDetail ? loanDetail.balance === 0 : false;
  };

  const calculateInterestAmount = (loanId) => {
    // Make sure the loanId is a non-empty string

    if (!loanId) {
      console.warn('Missing or invalid loan ID');

      return 0;
    }

    console.log('Calculating interest for loan ID:', loanId);

    // Log the entire interest table to see what's in it

    console.log('Interest Table:', interestTable);

    const filteredInterest = interestTable.filter((interest) => String(interest.loan_id) === String(loanId));

    // Log the filtered interest to see what's being matched

    console.log('Filtered Interest for loan ID:', loanId, filteredInterest);

    const interestAmount = filteredInterest.reduce((total, interest) => total + parseFloat(interest.interest_amount || 0), 0);

    console.log('Interest amount for loan ID', loanId, 'is', interestAmount);

    return interestAmount.toFixed(2);
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((customer) => customer.customer_id === customerId);

    return customer ? customer.customer_name : 'N/A';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Debugging: Log the values of form fields

    console.log('loan_id:', repledgeData.loan_id);

    console.log('date1:', repledgeData.date1);

    console.log('interest:', repledgeData.interest);

    console.log('payment_amount:', repledgeData.payment_amount);

    console.log('totalpayment_amount:', repledgeData.totalpayment_amount);

    // Check if the loan is closed

    if (isLoanClosed(repledgeData.loan_id)) {
      alert('Customer loan is closed. Payment not allowed.');

      return;
    }

    // Check for required fields

    // Prepare part payment data for submission

    const partpaymentData = {
      date1: repledgeData.date1,

      interest: repledgeData.interest,

      payment_amount: repledgeData.payment_amount,

      paid_interest: repledgeData.paid_interest,

      totalpayment_amount: repledgeData.totalpayment_amount,

      interest_balance: repledgeData.interest_balance,

      loan_id: repledgeData.loan_id,

      count500: repledgeData.count500,
      count200: repledgeData.count200,
      count100: repledgeData.count100,
      count50: repledgeData.count50,
      count20: repledgeData.count20,
      count10: repledgeData.count10,
      count5: repledgeData.count5,
      count2: repledgeData.count2,
      count1: repledgeData.count1
    };

    console.log('Submitting part payment data:', partpaymentData);

    try {
      // Send a POST request to the server to save part payment

      const partpaymentResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/partpayment`, partpaymentData);

      console.log('Part payment saved successfully:', partpaymentResponse.data);

      // Prepare part payment interest data for submission

      const partpaymentInterestData = {
        date1: repledgeData.date1,

        interest: repledgeData.paid_interest,

        loan_id: repledgeData.loan_id
      };

      // Send a POST request to the server to save part payment interest

      const partpaymentInterestResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/partpaymentinterest`, partpaymentInterestData);

      console.log('Part payment interest saved successfully:', partpaymentInterestResponse.data);

      // Prepare part payment payment amount data for submission

      const partpaymentPaymentAmountData = {
        date1: repledgeData.date1,

        payment_amount: repledgeData.payment_amount,

        loan_id: repledgeData.loan_id
      };

      // Send a POST request to the server to save part payment payment amount

      const partpaymentPaymentAmountResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/partpaymentpaymentamount`,

        partpaymentPaymentAmountData
      );

      console.log('Part payment payment amount saved successfully:', partpaymentPaymentAmountResponse.data);

      // Add logic to handle success, like refreshing data or redirecting
    } catch (error) {
      console.error('Error saving part payment:', error);

      // Add logic to display an error message to the user
    }

    // Perform other actions

    setLastPaymentDate(new Date(repledgeData.date1));

    handleClose();
  };

  const handleSubmit1 = async (event) => {
    event.preventDefault();

    if (isLoanClosed(repledgeData.loan_id)) {
      alert('Customer loan is closed. Payment not allowed.');

      return;
    }

    const interestAmount = parseFloat(repledgeData.interest1) || 0;

    const loanBalance = parseFloat(repledgeData.loanamount) || 0;

    const additionalCharges = parseFloat(repledgeData.additional_charge) || 0;

    const adjustmentCharges = parseFloat(repledgeData.adjustment_charge) || 0;

    const totalAmount = interestAmount + loanBalance + additionalCharges - adjustmentCharges;

    const dataToSend = {
      ...repledgeData,

      total_amount: totalAmount
    };

    // Inside your handleSubmit and handleSubmit1 functions

    setLastPaymentDate(new Date(repledgeData.date));

    // Update local state

    setRepledgeData({
      ...dataToSend,

      total_amount: totalAmount.toFixed(2)
    });

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/settlement`, dataToSend);

      console.log('Settlement saved successfully');

      // Store settlement interest

      const settlementInterestData = {
        date: repledgeData.date,

        interest1: repledgeData.interest1,

        loan_id: repledgeData.loan_id,
        s_count500: repledgeData.s_count500,
        s_count200: repledgeData.s_count200,
        s_count100: repledgeData.s_count100,
        s_count50: repledgeData.s_count50,
        s_count20: repledgeData.s_count20,
        s_count10: repledgeData.s_count10,
        s_count5: repledgeData.s_count5,
        s_count2: repledgeData.s_count2,
        s_count1: repledgeData.s_count1
      };

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/settlementinterest`, settlementInterestData);

      console.log('Settlement interest saved successfully');

      // Store settlement loan amount

      const settlementLoanAmountData = {
        date: repledgeData.date,

        loanamount: repledgeData.loanamount,

        loan_id: repledgeData.loan_id
      };

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/settlementloanamount`, settlementLoanAmountData);

      console.log('Settlement loan amount saved successfully');

      // Store settlement additional amount

      const settlementAdditionalAmountData = {
        date: repledgeData.date,

        additional_charge: repledgeData.additional_charge,

        loan_id: repledgeData.loan_id
      };

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/settlementadditionalamount`, settlementAdditionalAmountData);

      console.log('Settlement additional amount saved successfully');

      // Store settlement adjustment amount

      const settlementAdjustmentAmountData = {
        date: repledgeData.date,

        adjustment_charge: repledgeData.adjustment_charge,

        loan_id: repledgeData.loan_id,

        s_count500: repledgeData.s_count500,
        s_count200: repledgeData.s_count200,
        s_count100: repledgeData.s_count100,
        s_count50: repledgeData.s_count50,
        s_count20: repledgeData.s_count20,
        s_count10: repledgeData.s_count10,
        s_count5: repledgeData.s_count5,
        s_count2: repledgeData.s_count2,
        s_count1: repledgeData.s_count1
      };

      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/settlementadjustmentamount`, settlementAdjustmentAmountData);

      console.log('Settlement adjustment amount saved successfully');
    } catch (error) {
      console.error('Error saving settlement:', error);
    }

    handleClose1();
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();

    handleClose1();
  };

  const handleSubmit3 = (event) => {
    event.preventDefault();

    handleClose2();
  };
  const handleRefreshClick = () => {
    window.location.reload();
  };
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const groupInterestByMonth = (interestTable, loanId) => {
    const interestByMonth = {};

    interestTable

      .filter((interest) => String(interest.loan_id) === String(loanId))

      .forEach((interest) => {
        const date = new Date(interest.date);

        let endDate = endOfMonth(date);

        // If the interest entry date is after the last payment date

        if (lastPaymentDate && date > lastPaymentDate) {
          const daysSinceLastPayment = differenceInCalendarDays(date, lastPaymentDate);

          // Assuming interest is proportional, adjust it

          const adjustedInterest = (interest.interest_amount / daysInMonth(date)) * daysSinceLastPayment;

          const key = format(endDate, 'MM/yyyy');

          interestByMonth[key] = (interestByMonth[key] || 0) + adjustedInterest;
        } else {
          const key = format(endDate, 'MM/yyyy');

          interestByMonth[key] = (interestByMonth[key] || 0) + interest.interest_amount;
        }
      });

    return interestByMonth;
  };

  const calculateInterestForSettlement = (loanId) => {
    const interests = groupInterestByMonth(interestTable, loanId);

    const today = new Date();

    const currentMonth = format(today, 'MM/yyyy');

    return interests[currentMonth] || 0; // Return only the current month's interest
  };

  const fetchLoanBalance = (loanId) => {
    const loanDetail = loanApprovals.find((loan) => String(loan.loan_id) === String(loanId));

    return loanDetail ? loanDetail.balance : 0;
  };
  const handleChange = async (event) => {
    const { name, value } = event.target;

    console.log(`Handling change for: ${name} with value: ${value}`);

    // Clone the existing repledgeData object and update the property specified by name
    let updatedRepledgeData = {
      ...repledgeData,
      [name]: value
    };

    if (name === 'date') {
      const loanId = repledgeData.loan_id;

      console.log('Loan ID:', loanId);

      const selectedLoan = loanApprovals.find((loan) => String(loan.loan_id) === String(loanId));

      console.log('Selected Loan:', selectedLoan);

      if (selectedLoan) {
        const loanStartDate = selectedLoan.payed_date ? new Date(selectedLoan.payed_date) : new Date(selectedLoan.date);

        console.log('Loan Start Date:', loanStartDate);

        const endDate = new Date(value);

        console.log('End Date:', endDate);

        // Calculate the interest rate as a decimal

        const interestScheme = selectedLoan.scheme;

        const interestRateMatch = interestScheme.match(/-(\d+)%/);

        console.log('Interest Rate Match:', interestRateMatch);

        if (interestRateMatch) {
          const interestRate = parseFloat(interestRateMatch[1]) / 100;

          console.log('Interest Rate:', interestRate);

          let balance = selectedLoan.payed_date ? selectedLoan.netamount : selectedLoan.loan_amount;

          console.log('Initial Balance:', balance);

          // Initialize A (Total Interest) and interestBalance

          let A = 0;

          let interestBalance = 0;

          // Calculate daily interest and update balance for each day

          const n = 365; // Assuming daily compounding

          const startDate = new Date(loanStartDate);

          while (startDate < endDate) {
            const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            console.log('Days Difference:', daysDifference);

            const dailyInterest = (balance * interestRate) / n;

            console.log('Daily Interest:', dailyInterest);

            // Update balance with daily interest

            balance += dailyInterest;

            console.log('Updated Balance:', balance);

            // Update total interest

            A += dailyInterest;

            console.log('Total Interest (Before Part Payments):', A);

            // Move to the next day

            startDate.setDate(startDate.getDate() + 1);
          }

          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/partpayments?loan_id=${loanId}`);

            const data = await response.json();

            console.log('Part Payment Data:', data);

            if (data.partpayment && data.partpayment.length > 0) {
              for (const partPayment of data.partpayment) {
                const paymentAmount = parseFloat(partPayment.interest);

                const paymentDate = new Date(partPayment.date1);

                if (paymentDate.toDateString() === endDate.toDateString()) {
                  const updatedInterest = A;

                  console.log('Subtracted Part Payment Amount:', paymentAmount);

                  console.log('Updated Interest:', updatedInterest);

                  const partpaymentId = partPayment.partpayment_id;
                }
              }
            } else {
              // If there are no part payments, assign A (Total Interest Before Part Payments) to interest1

              updatedRepledgeData.interest1 = Math.ceil(A);

              console.log('Final Interest Amount (No Part Payments):', updatedRepledgeData.interest1);
            }
          } catch (error) {
            console.error('Error fetching part payments:', error);
          }

          // Fetch all part payments for the given loan_id (Again, without skipping)

          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/partpayments?loan_id=${loanId}`);

            const data = await response.json();

            console.log('Part Payment Data (Again):', data);

            if (data.partpayment && data.partpayment.length > 0) {
              // Filter part payments for the specific loan_id

              const partPaymentsForLoan = data.partpayment.filter((partPayment) => partPayment.loan_id === loanId);

              // Calculate the interest_balance by summing up the interest_balance amounts for the filtered part payments

              const interestBalance = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.interest), 0);

              console.log('interestBalance', interestBalance);
// Declare interestBalanceTotal before the if statement
let interestBalanceTotal;

// Check if there are part payments
if (partPaymentsForLoan.length > 0) {
  // Find the most recent part payment based on created_at
  const mostRecentPartPayment = partPaymentsForLoan.reduce((mostRecent, partPayment) => {
    const date1 = new Date(partPayment.date1);
    const mostRecentDate = new Date(mostRecent.date1);
    
    // Compare based on created_at if dates are equal
    if (date1.getTime() === mostRecentDate.getTime()) {
      const createdAt1 = new Date(partPayment.created_at);
      const createdAt2 = new Date(mostRecent.created_at);
      return createdAt1 > createdAt2 ? partPayment : mostRecent;
    }
    
    return date1 > mostRecentDate ? partPayment : mostRecent;
  }, partPaymentsForLoan[0]); // Initialize with the first part payment

  console.log('Most Recent Part Payment:', mostRecentPartPayment);

  // Assign the value to interestBalanceTotal without re-declaring it
  interestBalanceTotal = parseFloat(mostRecentPartPayment.interest_balance);

  console.log('interestBalanceTotal', interestBalanceTotal);

  // Rest of your code for calculating newbalance, recentInterestBalance, etc.
  // ...
} else {
  // Handle the case where there are no part payments for the given loan_id
  console.log('No part payments found for this loan_id.');
}

// Now interestBalanceTotal should be accessible here as well
console.log('interestBalanceTotal', interestBalanceTotal);

  
              const partpayment_amount = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.payment_amount), 0);

              console.log('partpayment_amount', partpayment_amount);

              // Calculate the final interest by summing up totalInterest and interestBalance

              const finalInterest = Math.ceil(A) + interestBalance;

              // Subtract Part Payment Amount and Add Accumulated Interest

              const newbalance = interestBalanceTotal + selectedLoan.loan_amount - partpayment_amount;

              console.log('balance', newbalance);

              // Filter part payments with interest field not equal to 0
              const filteredPartPayments = partPaymentsForLoan.filter((partPayment) => parseFloat(partPayment.interest) !== 0);

              // Sort the filtered part payments by date1 in descending order
              filteredPartPayments.sort((a, b) => new Date(b.date1) - new Date(a.date1));

              let recentInterestBalance = 0;

              if (filteredPartPayments.length > 0) {
                // Find the most recent part payment based on created_at
                const mostRecentPartPayment = filteredPartPayments.reduce((mostRecent, partPayment) => {
                  const date1 = new Date(partPayment.date1);
                  const mostRecentDate = new Date(mostRecent.date1);
              
                  // Compare based on created_at if dates are equal
                  if (date1.getTime() === mostRecentDate.getTime()) {
                    const createdAt1 = new Date(partPayment.created_at);
                    const createdAt2 = new Date(mostRecent.created_at);
                    return createdAt1 > createdAt2 ? partPayment : mostRecent;
                  }
              
                  return date1 > mostRecentDate ? partPayment : mostRecent;
                }, filteredPartPayments[0]); // Initialize with the first part payment
              
                // Assign the value to recentInterestBalance
                recentInterestBalance = parseFloat(mostRecentPartPayment.interest_balance);

                const mostRecentDate1 = filteredPartPayments[0].date1;
                // Convert the mostRecentDate1 string to a JavaScript Date object
                const dateObject = new Date(mostRecentDate1);

                // Increment the date by one day
                dateObject.setDate(dateObject.getDate());

                // Format the date back to the desired string format (yyyy-MM-dd)
                const updatedDate1 = dateObject.toISOString().split('T')[0];

                console.log('Updated Date1:', updatedDate1);

                // Make a PUT request to update the netamount
                const loanapprovalId = selectedLoan.loan_id; // Assuming loan_id is used in the URL

                const updatedLoanData = {
                  netamount: newbalance,
                  payed_date: updatedDate1
                };

                try {
                  const putResponse = await fetch(`${process.env.REACT_APP_BASE_URL}api/loanapprovaldetails/${loanapprovalId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedLoanData)
                  });

                  if (putResponse.ok) {
                    console.log('Loan Approval Details updated successfully');
                  } else {
                    console.error('Failed to update Loan Approval Details:', putResponse.status, putResponse.statusText);

                    const responseBody = await putResponse.text();

                    console.error('Response Body:', responseBody);
                  }
                } catch (error) {
                  console.error('Error updating Loan Approval Details:', error);
                }
              } else {
                console.log('No rows with non-zero interest found.');
              }

              const totalPartPaymentInterest = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.interest), 0);

              // Subtract totalPartPaymentInterest from finalInterest to get updated interest amount after part payments

              console.log("totalPartPaymentInterest",totalPartPaymentInterest)

              console.log("finalInterest",totalPartPaymentInterest)

              console.log("recentInterestBalance",recentInterestBalance)

              const finalInterestAfterSubtraction = finalInterest - totalPartPaymentInterest + recentInterestBalance;

              // Assign the updated interest amount to updatedRepledgeData.interest1

              updatedRepledgeData.interest1 = Math.ceil(finalInterestAfterSubtraction);

              console.log('Final Interest Amount:', updatedRepledgeData.interest1);
            } else {
              console.log('Interest rate not found in the scheme.');
            }
          } catch (error) {
            console.error('Error fetching part payments (Again):', error);
          }
        } else {
          console.log('Interest rate not found in the scheme.');
        }
      }
    }

    if (name === 'date1') {
      const loanId = repledgeData.loan_id;

      console.log('Loan ID:', loanId);

      const selectedLoan = loanApprovals.find((loan) => String(loan.loan_id) === String(loanId));

      console.log('Selected Loan:', selectedLoan);

      if (selectedLoan) {
        const loanStartDate = selectedLoan.payed_date ? new Date(selectedLoan.payed_date) : new Date(selectedLoan.date);

        console.log('Loan Start Date:', loanStartDate);

        const endDate = new Date(value);

        console.log('End Date:', endDate);

        // Calculate the interest rate as a decimal

        const interestScheme = selectedLoan.scheme;

        const interestRateMatch = interestScheme.match(/-(\d+)%/);

        console.log('Interest Rate Match:', interestRateMatch);

        if (interestRateMatch) {
          const interestRate = parseFloat(interestRateMatch[1]) / 100;

          console.log('Interest Rate:', interestRate);

          let balance = selectedLoan.payed_date ? selectedLoan.netamount : selectedLoan.loan_amount;

          console.log('Initial Balance:', balance);

          // Initialize A (Total Interest) and interestBalance

          let A = 0;

          let interestBalance = 0;

          // Calculate daily interest and update balance for each day

          const n = 365; // Assuming daily compounding

          const startDate = new Date(loanStartDate);

          while (startDate < endDate) {
            const daysDifference = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

            console.log('Days Difference:', daysDifference);

            const dailyInterest = (balance * interestRate) / n;

            console.log('Daily Interest:', dailyInterest);

            // Update balance with daily interest

            balance += dailyInterest;

            console.log('Updated Balance:', balance);

            // Update total interest

            A += dailyInterest;

            console.log('Total Interest (Before Part Payments):', A);

            // Move to the next day

            startDate.setDate(startDate.getDate() + 1);
          }

          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/partpayments?loan_id=${loanId}`);

            const data = await response.json();

            console.log('Part Payment Data:', data);

            if (data.partpayment && data.partpayment.length > 0) {
              for (const partPayment of data.partpayment) {
                const paymentAmount = parseFloat(partPayment.interest);

                const paymentDate = new Date(partPayment.date1);

                if (paymentDate.toDateString() === endDate.toDateString()) {
                  const updatedInterest = A;

                  console.log('Subtracted Part Payment Amount:', paymentAmount);

                  console.log('Updated Interest:', updatedInterest);

                  const partpaymentId = partPayment.partpayment_id;
                }
              }
            } else {
              // If there are no part payments, assign A (Total Interest Before Part Payments) to interest1

              updatedRepledgeData.interest = Math.ceil(A);

              console.log('Final Interest Amount (No Part Payments):', updatedRepledgeData.interest1);
            }
          } catch (error) {
            console.error('Error fetching part payments:', error);
          }

          // Fetch all part payments for the given loan_id (Again, without skipping)

          try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/partpayments?loan_id=${loanId}`);

            const data = await response.json();

            console.log('Part Payment Data (Again):', data);

            
            
            if (data.partpayment && data.partpayment.length > 0) {
              // Filter part payments for the specific loan_id

              const partPaymentsForLoan = data.partpayment.filter((partPayment) => partPayment.loan_id === loanId);

              // Calculate the interest_balance by summing up the interest_balance amounts for the filtered part payments

              const interestBalance = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.interest), 0);

              console.log('interestBalance', interestBalance);
// Declare interestBalanceTotal before the if statement
let interestBalanceTotal;

// Check if there are part payments
if (partPaymentsForLoan.length > 0) {
  // Find the most recent part payment based on created_at
  const mostRecentPartPayment = partPaymentsForLoan.reduce((mostRecent, partPayment) => {
    const date1 = new Date(partPayment.date1);
    const mostRecentDate = new Date(mostRecent.date1);
    
    // Compare based on created_at if dates are equal
    if (date1.getTime() === mostRecentDate.getTime()) {
      const createdAt1 = new Date(partPayment.created_at);
      const createdAt2 = new Date(mostRecent.created_at);
      return createdAt1 > createdAt2 ? partPayment : mostRecent;
    }
    
    return date1 > mostRecentDate ? partPayment : mostRecent;
  }, partPaymentsForLoan[0]); // Initialize with the first part payment

  console.log('Most Recent Part Payment:', mostRecentPartPayment);

  // Assign the value to interestBalanceTotal without re-declaring it
  interestBalanceTotal = parseFloat(mostRecentPartPayment.interest_balance);

  console.log('interestBalanceTotal', interestBalanceTotal);

  // Rest of your code for calculating newbalance, recentInterestBalance, etc.
  // ...
} else {
  // Handle the case where there are no part payments for the given loan_id
  console.log('No part payments found for this loan_id.');
}

// Now interestBalanceTotal should be accessible here as well
console.log('interestBalanceTotal', interestBalanceTotal);

  

              const partpayment_amount = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.payment_amount), 0);

              console.log('partpayment_amount', partpayment_amount);

              // Calculate the final interest by summing up totalInterest and interestBalance

              const finalInterest = Math.ceil(A) + interestBalance;

              // Subtract Part Payment Amount and Add Accumulated Interest

              const newbalance = interestBalanceTotal + selectedLoan.loan_amount - partpayment_amount;

              console.log('balance', newbalance);

              // Filter part payments with interest field not equal to 0
              const filteredPartPayments = partPaymentsForLoan.filter((partPayment) => parseFloat(partPayment.interest) !== 0);

              // Sort the filtered part payments by date1 in descending order
              filteredPartPayments.sort((a, b) => new Date(b.date1) - new Date(a.date1));
              let recentInterestBalance = 0;

              if (filteredPartPayments.length > 0) {
                // Find the most recent part payment based on created_at
                const mostRecentPartPayment = filteredPartPayments.reduce((mostRecent, partPayment) => {
                  const date1 = new Date(partPayment.date1);
                  const mostRecentDate = new Date(mostRecent.date1);
              
                  // Compare based on created_at if dates are equal
                  if (date1.getTime() === mostRecentDate.getTime()) {
                    const createdAt1 = new Date(partPayment.created_at);
                    const createdAt2 = new Date(mostRecent.created_at);
                    return createdAt1 > createdAt2 ? partPayment : mostRecent;
                  }
              
                  return date1 > mostRecentDate ? partPayment : mostRecent;
                }, filteredPartPayments[0]); // Initialize with the first part payment
              
                // Assign the value to recentInterestBalance
                recentInterestBalance = parseFloat(mostRecentPartPayment.interest_balance);

                const mostRecentDate1 = filteredPartPayments[0].date1;
                // Convert the mostRecentDate1 string to a JavaScript Date object
                const dateObject = new Date(mostRecentDate1);


                // Increment the date by one day
                dateObject.setDate(dateObject.getDate());

                // Format the date back to the desired string format (yyyy-MM-dd)
                const updatedDate1 = dateObject.toISOString().split('T')[0];

                console.log('Updated Date1:', updatedDate1);

                // Make a PUT request to update the netamount
                const loanapprovalId = selectedLoan.loan_id; // Assuming loan_id is used in the URL

                const updatedLoanData = {
                  netamount: newbalance,
                  payed_date: updatedDate1
                };

                try {
                  const putResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/loanapprovaldetails/${loanapprovalId}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedLoanData)
                  });

                  if (putResponse.ok) {
                    console.log('Loan Approval Details updated successfully');
                  } else {
                    console.error('Failed to update Loan Approval Details:', putResponse.status, putResponse.statusText);

                    const responseBody = await putResponse.text();

                    console.error('Response Body:', responseBody);
                  }
                } catch (error) {
                  console.error('Error updating Loan Approval Details:', error);
                }
              } else {
                console.log('No rows with non-zero interest found.');
              }

              const totalPartPaymentInterest = partPaymentsForLoan.reduce((sum, partPayment) => sum + parseFloat(partPayment.interest), 0);

              console.log("totalPartPaymentInterest",totalPartPaymentInterest)

              console.log("finalInterest",totalPartPaymentInterest)

              // Subtract totalPartPaymentInterest from finalInterest to get updated interest amount after part payments

              const finalInterestAfterSubtraction = finalInterest - totalPartPaymentInterest + recentInterestBalance;

              // Assign the updated interest amount to updatedRepledgeData.interest1

              updatedRepledgeData.interest = Math.ceil(finalInterestAfterSubtraction);

              console.log('Final Interest Amount:', updatedRepledgeData.interest);
            } else {
              console.log('Interest rate not found in the scheme.');
            }
          } catch (error) {
            console.error('Error fetching part payments (Again):', error);
          }
        } else {
          console.log('Interest rate not found in the scheme.');
        }
      }
    }

    
    // Calculate other components

    const interestAmount = parseFloat(updatedRepledgeData.interest1) || 0;

    const loanBalance = parseFloat(updatedRepledgeData.loanamount) || 0;

    const additionalCharges = parseFloat(updatedRepledgeData.additional_charge) || 0;

    const adjustmentCharges = parseFloat(updatedRepledgeData.adjustment_charge) || 0;

    console.log(`Interest Amount: ${interestAmount}`);

    console.log(`Loan Balance: ${loanBalance}`);

    console.log(`Additional Charges: ${additionalCharges}`);

    console.log(`Adjustment Charges: ${adjustmentCharges}`);

    // Calculate total amount

    const totalAmount = interestAmount + loanBalance + additionalCharges - adjustmentCharges;

    updatedRepledgeData = {
      ...updatedRepledgeData,

      total_amount: totalAmount.toFixed(2) // Update total_amount property
    };

    console.log(`Total amount: ${updatedRepledgeData.total_amount}`);

    // Calculate the total payment amount based on interest and payment_amount
    if (name === 'interest' || name === 'paid_interest') {
      const interest = parseFloat(updatedRepledgeData.interest) || 0;
      const paid_interest = parseFloat(updatedRepledgeData.paid_interest) || 0;
      const interest_balance = interest - paid_interest;
      updatedRepledgeData = {
        ...updatedRepledgeData,
        interest_balance: interest_balance.toString()
      };
    }
    if (name === 'paid_interest' || name === 'payment_amount') {
      const interestValue = parseFloat(updatedRepledgeData.paid_interest) || 0;

      const paymentAmountValue = parseFloat(updatedRepledgeData.payment_amount) || 0;

      const totalPaymentAmount = interestValue + paymentAmountValue;

      updatedRepledgeData = {
        ...updatedRepledgeData,

        totalpayment_amount: totalPaymentAmount.toFixed(2)
      };
    }

    // Update the state with the updated data

    setRepledgeData(updatedRepledgeData);
  };

  const updateBalanceInLoanApprovals = (loan_id, balance) => {
    axios

      .put(`${process.env.REACT_APP_BASE_URL}/api/loanapprovaldetails/${loan_id}`, { balance })

      .then((response) => {
        console.log('Balance updated successfully:', response.data);
      })

      .catch((error) => {
        console.error(`Error updating balance for loan_id ${loan_id}:`, error);
      });
  };

  //CashDenomination Calculation

  //cash Denomination

  const handleCountChange = (event) => {
    const { name, value } = event.target;
    const index = parseInt(name.replace('count', ''), 10);

    setRepledgeData((prevData) => ({
      ...prevData,
      [`count${index}`]: value,
      [`total${index}`]: (parseFloat(value) * prevData[`name${index}`]).toFixed(2)
    }));
  };
  useEffect(() => {
    const calculateTotals = () => {
      const total1 = parseFloat(repledgeData.count500) * repledgeData.name1;
      const total2 = parseFloat(repledgeData.count200) * repledgeData.name2;
      const total3 = parseFloat(repledgeData.count100) * repledgeData.name3; // Calculate other totals similarly
      const total4 = parseFloat(repledgeData.count50) * repledgeData.name4;
      const total5 = parseFloat(repledgeData.count20) * repledgeData.name5;
      const total6 = parseFloat(repledgeData.count10) * repledgeData.name6;
      const total7 = parseFloat(repledgeData.count5) * repledgeData.name7;
      const total8 = parseFloat(repledgeData.count2) * repledgeData.name8;
      const total9 = parseFloat(repledgeData.count1) * repledgeData.name9;

      setRepledgeData((prevData) => ({
        ...prevData,
        total1: total1.toFixed(2),
        total2: total2.toFixed(2),
        total3: total3.toFixed(2),
        total4: total4.toFixed(2),
        total5: total5.toFixed(2),
        total6: total6.toFixed(2),
        total7: total7.toFixed(2),
        total8: total8.toFixed(2),
        total9: total9.toFixed(2)
        // Update other total values here
      }));

      const sum = total1 + total2 + total3 + total4 + total5 + total6 + total7 + total8 + total9; /* Add other total values here */

      setWholeTotal(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    repledgeData.name1,
    repledgeData.count500,
    repledgeData.name2,
    repledgeData.count200,
    repledgeData.name3,
    repledgeData.count100,
    repledgeData.name4,
    repledgeData.count50,
    repledgeData.name5,
    repledgeData.count20,
    repledgeData.name6,
    repledgeData.count10,
    repledgeData.name7,
    repledgeData.count5,
    repledgeData.name8,
    repledgeData.count2,
    repledgeData.name9,
    repledgeData.count1
  ]);
  // Settlement Cash denomination
  const handleCount1Change = (event) => {
    const { name, value } = event.target;
    const index = parseInt(name.replace('s_count', ''), 10);

    setRepledgeData((prevData) => ({
      ...prevData,
      [`s_count${index}`]: value,
      [`s_total${index}`]: (parseFloat(value) * prevData[`s_name${index}`]).toFixed(2)
    }));
  };
  useEffect(() => {
    const calculateTotals = () => {
      const s_total1 = parseFloat(repledgeData.s_count500) * repledgeData.s_name1;
      const s_total2 = parseFloat(repledgeData.s_count200) * repledgeData.s_name2;
      const s_total3 = parseFloat(repledgeData.s_count100) * repledgeData.s_name3; // Calculate other totals similarly
      const s_total4 = parseFloat(repledgeData.s_count50) * repledgeData.s_name4;
      const s_total5 = parseFloat(repledgeData.s_count20) * repledgeData.s_name5;
      const s_total6 = parseFloat(repledgeData.s_count10) * repledgeData.s_name6;
      const s_total7 = parseFloat(repledgeData.s_count5) * repledgeData.s_name7;
      const s_total8 = parseFloat(repledgeData.s_count2) * repledgeData.s_name8;
      const s_total9 = parseFloat(repledgeData.s_count1) * repledgeData.s_name9;

      setRepledgeData((prevData) => ({
        ...prevData,
        s_total1: s_total1.toFixed(2),
        s_total2: s_total2.toFixed(2),
        s_total3: s_total3.toFixed(2),
        s_total4: s_total4.toFixed(2),
        s_total5: s_total5.toFixed(2),
        s_total6: s_total6.toFixed(2),
        s_total7: s_total7.toFixed(2),
        s_total8: s_total8.toFixed(2),
        s_total9: s_total9.toFixed(2)
        // Update other total values here
      }));

      const sum =
        s_total1 + s_total2 + s_total3 + s_total4 + s_total5 + s_total6 + s_total7 + s_total8 + s_total9; /* Add other total values here */

      setWholeTotal1(sum.toFixed(2));
    };

    calculateTotals();
  }, [
    repledgeData.s_name1,
    repledgeData.s_count500,
    repledgeData.s_name2,
    repledgeData.s_count200,
    repledgeData.s_name3,
    repledgeData.s_count100,
    repledgeData.s_name4,
    repledgeData.s_count50,
    repledgeData.s_name5,
    repledgeData.s_count20,
    repledgeData.s_name6,
    repledgeData.s_count10,
    repledgeData.s_name7,
    repledgeData.s_count5,
    repledgeData.s_name8,
    repledgeData.s_count2,
    repledgeData.s_name9,
    repledgeData.s_count1
  ]);
  /////partpayment
  useEffect(() => {
    if (wholeTotal && repledgeData.totalpayment_amount) {
      const newChange = wholeTotal - parseFloat(repledgeData.totalpayment_amount);
      setChange(newChange);
    }
  }, [wholeTotal, repledgeData.totalpayment_amount]);

  useEffect(() => {
    // Calculate lastAmount based on change
    const calculatedLastAmount = wholeTotal - change;
    setLastAmount(calculatedLastAmount);
  }, [wholeTotal, change]);
  const excessValue = wholeTotal - parseFloat(repledgeData.totalpayment_amount);
  // You can use excessValue if needed
  /////settlement
  useEffect(() => {
    if (wholeTotal1 && repledgeData.total_amount) {
      const newChange1 = wholeTotal1 - parseFloat(repledgeData.total_amount);
      setChange1(newChange1);
    }
  }, [wholeTotal1, repledgeData.total_amount]);

  useEffect(() => {
    // Calculate lastAmount based on change
    const calculatedLastAmount1 = wholeTotal1 - change1;
    setLastAmount1(calculatedLastAmount1);
  }, [wholeTotal1, change1]);
  const excessValue1 = wholeTotal1 - parseFloat(repledgeData.total_amount);
  return (
    <>
      <Card sx={{ height: '300px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div style={{ display: 'flex', height: '90vh' }}>
              <div style={{ flex: 1, paddingLeft: '1px' }}>
                <form className="container" onSubmit={handleSubmit2}>
                  <Container maxWidth="lg">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Form.Label className="mb">
                          <br />

                          <h3>
                            <b>Loan Closed Report</b>
                          </h3>
                        </Form.Label>

                        <hr className="hori-col-3" />

                        <br />

                        <Row className="mb-2">
                          <Form.Group controlId="formcustomername" className="col col-sm-5">
                            <Form.Label>
                              Loan No/Name <span style={{ color: 'red' }}>*</span>
                            </Form.Label>

                            <Autocomplete
                              value={loanApprovals.find((loanApproval) => loanApproval.loan_id === repledgeData.loan_id) || null}
                              onChange={(event, newValue) => {
                                const loan_id = newValue ? newValue.loan_id : '';

                                setRepledgeData((prevData) => ({
                                  ...prevData,

                                  loan_id: loan_id,

                                  interest1: calculateInterestAmount(loan_id),

                                  loanamount: fetchLoanBalance(loan_id)
                                }));
                              }}
                              options={loanApprovals}
                              getOptionLabel={(loanApproval) =>
                                loanApproval
                                  ? `Loan ID: ${loanApproval.loan_id}, Customer Name: ${getCustomerName(loanApproval.customer_id)}`
                                  : ''
                              }
                              renderInput={(params) => <TextField {...params} placeholder="Search Loan ID" fullWidth />}
                            />
                          </Form.Group>
                        </Row>
                      </Grid>

                      <Grid item xs={12} sx={{ mt: -2 }}>
                        <Button variant="contained" onClick={handleOpen}>
                          Partpayment
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" onClick={handleOpen1}>
                          Settlement
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="contained" onClick={handleOpen2}>
                          Interest Calculator
                        </Button>
                      </Grid>
                    </Grid>
                  </Container>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>

        <Modal open={open1} onClose={handleClose1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2" style={{ marginBottom: '4rem' }}>
              &nbsp;&nbsp;
              <h5>Settlement</h5>
              <hr />
            </Typography>

            <form onSubmit={handleSubmit1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  Additional Charge
                  <TextField
                    type="text"
                    size="small"
                    name="additional_charge"
                    placeholder="Additional Charge"
                    value={repledgeData.additional_charge}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Adjustment Charge
                  <TextField
                    type="text"
                    size="small"
                    name="adjustment_charge"
                    placeholder="Adjustment Charge"
                    value={repledgeData.adjustment_charge}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Date
                  <TextField type="date" name="date" value={repledgeData.date} onChange={handleChange} fullWidth />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Interest
                  <TextField
                    type="text"
                    name="interest1"
                    placeholder="Amount"
                    value={repledgeData.interest1}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Loan Amount
                  <TextField
                    size="small"
                    type="text"
                    name="loanamount"
                    placeholder="Amount"
                    value={repledgeData.loanamount}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Total Amount
                  <TextField
                    size="small"
                    type="text"
                    name="total_amount"
                    placeholder="Amount"
                    value={formatAsIndianCurrency(repledgeData.total_amount)}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>

                <TableContainer component={Paper} style={tableContainerStyle}>
                  <Table style={tableStyle}>
                    <TableBody>
                      <TableHead></TableHead>
                      <TableRow>
                        <b>Cash Denomination</b>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="name1" readOnly value={repledgeData.s_name1} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count500"
                            value={repledgeData.s_count500}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total1" readOnly value={repledgeData.s_total1} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name2" readOnly value={repledgeData.s_name2} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count200"
                            value={repledgeData.s_count200}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total2" readOnly value={repledgeData.s_total2} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name3" readOnly value={repledgeData.s_name3} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count100"
                            value={repledgeData.s_count100}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total3" readOnly value={repledgeData.s_total3} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name4" readOnly value={repledgeData.s_name4} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count50"
                            value={repledgeData.s_count50}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total4" readOnly value={repledgeData.s_total4} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name5" readOnly value={repledgeData.s_name5} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count20"
                            value={repledgeData.s_count20}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total5" readOnly value={repledgeData.s_total5} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name6" readOnly value={repledgeData.s_name6} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count10"
                            value={repledgeData.s_count10}
                            style={{ width: '60px' }}
                            onChange={handleCount1Change}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total6" readOnly value={repledgeData.s_total6} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name7" readOnly value={repledgeData.s_name7} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count5"
                            value={repledgeData.s_count5}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total7" readOnly value={repledgeData.s_total7} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name8" readOnly value={repledgeData.s_name8} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count2"
                            value={repledgeData.s_count2}
                            onChange={handleCount1Change}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total8" readOnly value={repledgeData.s_total8} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="s_name9" readOnly style={{ width: '60px' }} value={repledgeData.s_name9} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="s_count1"
                            value={repledgeData.s_count1}
                            style={{ width: '60px' }}
                            onChange={handleCount1Change}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="s_total9" readOnly value={repledgeData.s_total9} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Whole Total:</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{wholeTotal1}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Excess:</TableCell>
                        <TableCell></TableCell>
                        <TableCell style={{ color: 'red' }}>
                          <span>{excessValue1}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <span style={{ color: 'green', fontSize: '13px' }}>Last Amount: {lastAmount1} rupees</span>
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item xs={12}>
                  &nbsp;&nbsp;
                  <Button type="button" variant="contained" color="primary" onClick={handleClose1}>
                    Close
                  </Button>
                  &nbsp;&nbsp;
                  <Button type="submit" variant="contained" onClick={handleRefreshClick} disabled={excessValue1 < 0} color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2" style={{ marginBottom: '4rem' }}>
              &nbsp;&nbsp;
              <h5>Partpayment</h5>
              <hr />
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  Date
                  <TextField type="date" name="date1" value={repledgeData.date1} onChange={handleChange} fullWidth required />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Total Interest
                  <TextField
                    type="text"
                    name="interest"
                    placeholder="Interest"
                    value={repledgeData.interest || ''} // Ensure the value is not undefined
                    onChange={handleChange}
                    fullWidth
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  Paid Interest
                  <TextField
                    type="text"
                    name="paid_interest"
                    placeholder="Interest"
                    value={repledgeData.paid_interest || ''} // Ensure the value is not undefined
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  Balance Interest
                  <TextField
                    type="text"
                    name="interest_balance"
                    placeholder="Interest"
                    value={repledgeData.interest_balance || ''} // Ensure the value is not undefined
                    onChange={handleChange}
                    fullWidth
                    readOnly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  Partpayment Amount
                  <TextField
                    type="number"
                    name="payment_amount"
                    placeholder="Partpayment Amount"
                    value={repledgeData.payment_amount || ''} // Ensure the value is not undefined
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  Total Amount
                  <TextField
                    type="number"
                    name="totalpayment_amount"
                    placeholder="Total Amount"
                    value={repledgeData.totalpayment_amount || ''}
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Grid>
                <TableContainer component={Paper} style={tableContainerStyle}>
                  <Table style={tableStyle}>
                    <TableBody>
                      <TableHead></TableHead>
                      <TableRow>
                        <b>Cash Denomination</b>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="name1" readOnly value={repledgeData.name1} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count500"
                            value={repledgeData.count500}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total1" readOnly value={repledgeData.total1} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="name2" readOnly value={repledgeData.name2} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count200"
                            value={repledgeData.count200}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total2" readOnly value={repledgeData.total2} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="name3" readOnly value={repledgeData.name3} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count100"
                            value={repledgeData.count100}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total3" readOnly value={repledgeData.total3} />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <input type="text" name="name4" readOnly value={repledgeData.name4} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count50"
                            value={repledgeData.count50}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total4" readOnly value={repledgeData.total4} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="name5" readOnly value={repledgeData.name5} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count20"
                            value={repledgeData.count20}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total5" readOnly value={repledgeData.total5} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="name6" readOnly value={repledgeData.name6} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count10"
                            value={repledgeData.count10}
                            style={{ width: '60px' }}
                            onChange={handleCountChange}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total6" readOnly value={repledgeData.total6} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="name7" readOnly value={repledgeData.name7} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count5"
                            value={repledgeData.count5}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total7" readOnly value={repledgeData.total7} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="name8" readOnly value={repledgeData.name8} style={{ width: '60px' }} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count2"
                            value={repledgeData.count2}
                            onChange={handleCountChange}
                            style={{ width: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total8" readOnly value={repledgeData.total8} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>
                          <input type="text" name="name9" readOnly style={{ width: '60px' }} value={repledgeData.name9} />
                        </TableCell>
                        <TableCell>
                          <input
                            type="text"
                            name="count1"
                            value={repledgeData.count1}
                            style={{ width: '60px' }}
                            onChange={handleCountChange}
                          />
                        </TableCell>
                        <TableCell>
                          <input type="text" name="total9" readOnly value={repledgeData.total9} />
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell>Whole Total:</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{wholeTotal}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Excess:</TableCell>
                        <TableCell></TableCell>
                        <TableCell style={{ color: 'red' }}>
                          <span>{excessValue}</span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <p>
                            <span style={{ color: 'green', fontSize: '13px' }}>Last Amount: {lastAmount} rupees</span>
                          </p>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>

                <Grid item xs={12}>
                  &nbsp;&nbsp;
                  <Button type="button" variant="contained" color="primary" onClick={handleClose}>
                    Close
                  </Button>
                  &nbsp;&nbsp;
                  <Button type="submit" disabled={excessValue < 0} onClick={handleRefreshClick} variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>
        {/* Intrest  */}
        <Modal open={open2} onClose={handleClose2} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography variant="h6" component="h2" style={{ marginBottom: '4rem' }}>
              <h5>Intrest</h5>

              <hr />
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                Start Date
                <TextField type="date" name="start_date" value={repledgeData.start_date || ''} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                End Date
                <TextField type="date" name="end_date" value={repledgeData.end_date || ''} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                Interest
                <TextField
                  type="number"
                  name="interest_only"
                  placeholder="Interest"
                  value={repledgeData.interest_only || ''}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="button" variant="contained" color="primary" onClick={handleClose2}>
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Card>

      <br></br>

      <Card>
        <Box sx={{ mt: -5 }}>
          <TableContainer component={Card} sx={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>

                  <TableCell>Particulars</TableCell>

                  <TableCell>Debit</TableCell>

                  <TableCell>Credit</TableCell>

                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loanApprovals

                  .filter((loanApproval) => loanApproval.loan_id === repledgeData.loan_id)

                  .map((loanApproval) => {
                    const interestByMonth = groupInterestByMonth(interestTable, loanApproval.loan_id);

                    let balance = parseFloat(loanApproval.loan_amount || 0);

                    const currentDate = new Date();

                    const data = [
                      {
                        date: new Date(loanApproval.date),

                        label: 'To Loan',

                        debit: balance.toFixed(2),

                        credit: '-',

                        balance: balance.toFixed(2)
                      }
                    ];

                    Object.keys(interestByMonth).forEach((key) => {
                      const dateComponents = key.split('/').reverse();

                      const year = parseInt(dateComponents[0]);

                      const month = parseInt(dateComponents[1]) - 1;

                      const date = endOfMonth(new Date(year, month, 1));

                      if (date <= currentDate) {
                        const interest = parseFloat(interestByMonth[key] || 0);

                        data.push({
                          date,

                          label: 'Interest Earned',

                          debit: interest.toFixed(2),

                          credit: '-',

                          balance: balance.toFixed(2)
                        });
                      }
                    });

                    partpayments

                      .filter((partpayment) => partpayment.loan_id === loanApproval.loan_id)

                      .forEach((partpayment) => {
                        const date = new Date(partpayment.date1);

                        const partPaymentInterest = parseFloat(partpayment.paid_interest || 0);

                        data.push({
                          date,

                          label: 'Part Payment Interest',

                          debit: '-',

                          credit: partPaymentInterest.toFixed(2),

                          balance: balance.toFixed(2)
                        });

                        // Subtract part payment amount from balance

                        const partPaymentAmount = parseFloat(partpayment.payment_amount || 0);

                        if (balance - partPaymentAmount < 0) {
                          balance = 0;
                        } else {
                          balance -= partPaymentAmount;
                        }

                        data.push({
                          date,

                          label: 'Part Payment',

                          debit: '-', // This should be in the debit column

                          credit: partPaymentAmount.toFixed(2), // This should be in the credit column

                          balance: balance.toFixed(2)
                        });
                      });

                    settlements

                      .filter((settlement) => settlement.loan_id === loanApproval.loan_id)

                      .forEach((settlement) => {
                        const date = new Date(settlement.date);

                        const totalAmount = parseFloat(settlement.total_amount || 0);

                        const interestAmount = parseFloat(settlement.interest1 || 0);

                        const additionalCharge = parseFloat(settlement.additional_charge || 0);

                        const adjustmentCharge = parseFloat(settlement.adjustment_charge || 0);

                        if (interestAmount > 0) {
                          data.push({
                            date,

                            label: 'Settlement Interest',

                            debit: '-',

                            credit: interestAmount.toFixed(2),

                            balance: balance.toFixed(2)
                          });
                        }

                        if (additionalCharge > 0) {
                          data.push({
                            date,

                            label: 'Additional Charge',

                            debit: '-',

                            credit: additionalCharge.toFixed(2),

                            balance: balance.toFixed(2)
                          });
                        }

                        if (adjustmentCharge > 0) {
                          data.push({
                            date,

                            label: 'Adjustment Charge',

                            debit: '-',

                            credit: adjustmentCharge.toFixed(2),

                            balance: balance.toFixed(2)
                          });
                        }

                        // Calculate effectiveTotalAmount only considering loanamount

                        let effectiveTotalAmount = parseFloat(settlement.loanamount || 0);

                        if (balance - effectiveTotalAmount < 0) {
                          effectiveTotalAmount = balance;
                        }

                        balance -= effectiveTotalAmount;

                        data.push({
                          date,

                          label: 'Settlement',

                          debit: '-',

                          credit: effectiveTotalAmount.toFixed(2),

                          balance: balance.toFixed(2)
                        });
                      });

                    updateBalanceInLoanApprovals(loanApproval.loan_id, balance);
                

               if (balance <= 0) {
                      return (
                    <>
                    <TableRow key={loanApproval.loan_id}>
                    <TableCell colSpan="5" style={{ textAlign: 'center', color: 'red' }}>
                              Warning: Loan is already closed!
                    </TableCell>
                    </TableRow>
                          {data.map((entry, index) => (
                    <TableRow key={index}>
                    <TableCell>{format(entry.date, 'dd/MM/yy')}</TableCell>
                    <TableCell>{entry.label}</TableCell>
                    <TableCell>{entry.debit || '-'}</TableCell>
                    <TableCell>{entry.credit || '-'}</TableCell>
                    <TableCell>{entry.balance}</TableCell>
                    </TableRow>
                          ))}
                    </>
                      );
                    }
                    
                     
                    
                    data.sort((a, b) => a.date - b.date);

                    return data.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(entry.date, 'dd/MM/yy')}</TableCell>

                        <TableCell>{entry.label}</TableCell>

                        <TableCell>{entry.debit || '-'}</TableCell>

                        <TableCell>{entry.credit || '-'}</TableCell>

                        <TableCell>{entry.balance}</TableCell>
                      </TableRow>
                    ));
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </>
  );
};

export default Repayment;
