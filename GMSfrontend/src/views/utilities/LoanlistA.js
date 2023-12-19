
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import img1 from '../pages/authentication/auth-forms/Login.png';
import './Print.css';

const useStyles = makeStyles({
    tableHeader: {
        backgroundColor: '#f0f0f0',
        color: 'black',
        fontWeight: 'bold',
        border: '1px solid grey',
        textAlign: 'center'
    },
    tableCell: {
        border: '1px solid grey',
        textAlign: 'center'
    },
    closedLoan: {
        color: 'red',
        fontWeight: 'bold' // Making it bold
    },
    activeLoan: {
        color: 'green',
        fontWeight: 'bold' // Making it bold
    },
    dialogContent: {
        fontSize: '58px',
    },
    dialogContainer: {
        minWidth: '1000px'
    },
});

const Loanlist = () => {

    const classes = useStyles();
    const [searchId, setSearchId] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [error, setError] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [loans, setLoans] = useState([]); // Assuming you have state variables for loans, jewels, and values
    const [jewels, setJewels] = useState([]);
    const [loanIdToDelete, setLoanIdToDelete] = useState(null); // Change this to null instead of an empty array
    const [selectedLoanId, setSelectedLoanId] = useState(null);
    const [denominationDialogOpen, setDenominationDialogOpen] = useState(false);
    const [selectedDenominationLoanId, setSelectedDenominationLoanId] = useState(null);
    const [totalNetWeight, setTotalNetWeight] = useState(0);
    const [data, setData] = useState({
        loanapprovaldetails: [],
        jeweldetails: [],
        totalloanvalue: [],
    });
    const [loanStatus, setLoanStatus] = useState({});
    const [finalamount, setFinalAmount] = useState('')
    const tableContainerStyle = {
        maxWidth: '600px',
        maxHeight: '200px',
        overflow: 'auto'
    };
    const tableStyle = {
        width: '100%'
    };

    useEffect(() => {
        if (searchId) {
            const filtered = loans.filter((customer) =>
                customer.loan_id.toString().includes(searchId.toLowerCase())
            );
            // Debugging: Log the filtered data to the console
            console.log('Filtered Data:', filtered);
            setFilteredCustomers(filtered);
        } else {
            setFilteredCustomers(loans);
        }
    }, [searchId, loans]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/allData`)
            .then((response) => {
                const responseData = response.data;
                console.log(responseData);
                setData(responseData);
                // Extract and map the 'status' values from totalloanvalue into a dictionary
                const statusMap = {};
                responseData.totalloanvalue.forEach((item) => {
                    statusMap[item.loan_id] = item.status;
                });
                setLoanStatus(statusMap);
                console.log('approval or not: ', statusMap);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/api/loanapprovals`)
            .then((response) => {
                const loanapprovalsData = response.data.loanapprovaldetails;
                return axios.get(`${process.env.REACT_APP_BASE_URL}/api/customers`).then((customerResponse) => {
                    const customers = customerResponse.data.customers;
                    const customerMap = {};

                    customers.forEach((customer) => {
                        customerMap[customer.customer_id] = customer.customer_name;
                    });
                    loanapprovalsData.forEach((loan) => {
                        loan.customerName = customerMap[loan.customer_id] || 'Unknown';
                    });
                    setLoans(loanapprovalsData);
                    setFilteredCustomers(loanapprovalsData);
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/jeweldetails`);
                const result = await response.json();
                const data = result.jewelDetails;
                setJewels(data);
                console.log('Jewels data fetched:', data);
                if (Array.isArray(data)) {
                    // Assuming selectedDenominationLoanId contains the loan_id you want to use
                    const selectedLoan = data.find((loan) => loan.loan_id === selectedDenominationLoanId);
                    if (selectedLoan) {
                        // Calculate the total net weight based on the selectedLoan's properties
                        const sum = (
                            selectedLoan.net_weight +
                            selectedLoan.net_weight1 +
                            selectedLoan.net_weight2 +
                            selectedLoan.net_weight3 +
                            selectedLoan.net_weight4 +
                            selectedLoan.net_weight5 +
                            selectedLoan.net_weight6 +
                            selectedLoan.net_weight7 +
                            selectedLoan.net_weight8 +
                            selectedLoan.net_weight9 +
                            selectedLoan.net_weight10
                        );
                        setTotalNetWeight(sum);
                        console.log("sum net weight", sum);
                    } else {
                        console.error(`Loan with id ${selectedDenominationLoanId} not found in data.`);
                        // Handle the case where the loan is not found
                        setTotalNetWeight(0); // Set to a default value or handle it as needed
                    }
                } else {
                    console.error('Data is not an array');
                }
            } catch (error) {
                console.error("Error fetching jewel data:", error);
            }
        };
        fetchData();
    }, [selectedDenominationLoanId]);

    // Function to calculate the total net weight
    const calculateTotalNetWeight = (loanData, selectedLoanId) => {
        const selectedLoan = loanData.find((loan) => loan.loan_id === selectedLoanId);
        if (selectedLoan) {
            const {
                net_weight,
                net_weight1,
                net_weight2,
                net_weight3,
                net_weight4,
                net_weight5,
                net_weight6,
                net_weight7,
                net_weight8,
                net_weight9,
                net_weight10,
            } = selectedLoan;
            // Calculate the sum of net weights
            const sum = net_weight + net_weight1 + net_weight2 + net_weight3 + net_weight4 + net_weight5 + net_weight6 + net_weight7 + net_weight8 + net_weight9 + net_weight10;
            setTotalNetWeight(sum);
            console.log("sum netweight", sum)
        } else {
            setTotalNetWeight(0); // Set to 0 if the selected loan is not found
        }
    };

    const openConfirmationDialog = (loanapprovaldetailsId) => {
        console.log('Opening confirmation dialog');
        setLoanIdToDelete(loanapprovaldetailsId);
        setDeleteDialogOpen(true);

    };

    const confirmDelete = () => {
        // Send a DELETE request to the backend API
        fetch(`${process.env.REACT_APP_BASE_URL}/api/loanapprovaldetails/${loanIdToDelete}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log('Loan approval details deleted successfully');
                    window.location.reload();
                } else {
                    // Handle error response from the server
                    console.error('Error deleting loan approval details');
                }
                // Close the delete dialog
                setDeleteDialogOpen(false);
            })
            .catch((error) => {
                console.error('Error deleting loan approval details:', error);
                // Close the delete dialog
                setDeleteDialogOpen(false);
            });
    };

    const cancelDelete = () => {
        console.log('Canceling deletion');
        setDeleteDialogOpen(false);
    };
    const [selectedLoanApproval, setSelectedLoanApproval] = useState(null);
    const selectedLoanDetails = data?.loanapprovaldetails.find(item => item.loan_id === selectedLoanId);
    const selectedJewelDetails = data?.jeweldetails.find(item => item.loan_id === selectedLoanId);
    const selectedTotalloanvalue = data?.totalloanvalue.find(item => item.loan_id === selectedLoanId);

    const handleView = (loanapproval) => {
        setSelectedLoanId(loanapproval.loan_id);
        setSelectedLoanApproval(loanapproval); // Update selected loan approval
    };

    const closeDetailsDialog = () => {
        setSelectedLoanId(null);
    };

    const handlePrint = () => {
        window.print();
    };

    //search
    const handleSearchChange = (event) => {
        setSearchId(event.target.value);
    };
    // Define the renderRow function
    function renderRow(header, value) {
        if (value !== null && value !== 0) {
            return (
                <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '150px' }}><b>{header}</b></TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{value}</TableCell>
                </TableRow>
            );
        } else {
            return null;
        }
    }

    function renderRows(header, value) {
        if (value !== 0) {
            return (
                <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '150px' }}><b>{header}</b></TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{value}</TableCell>
                </TableRow>
            );
        } else {
            return null;
        }
    }
    // Function to compare dates in descending order
    const compareDatesDescending = (a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA; // Compare in descending order
    };
    // Sort the filteredCustomers array based on date in descending order
    const sortedCustomers = [...filteredCustomers].sort(compareDatesDescending);

    const handleNavigate = () => {
        // Replace the path with the one you want to navigate to within your application
        window.location.href = '/vinsupgms/utils/util-repayment';
    };

    const openDenominationDialog = (loanId) => {
        setSelectedDenominationLoanId(loanId);
        setDenominationDialogOpen(true);
        // Fetch the final_amount for the selected loan
        const selectedLoan = loans.find((loan) => loan.loan_id === loanId);
        if (selectedLoan) {
            setFinalAmount(selectedLoan.final_amount);
        }
    };

    const closeDenominationDialog = () => {
        setSelectedDenominationLoanId(null);
        setDenominationDialogOpen(false);
    };

    const [approvalData, setApprovalData] = useState({
        total_amount: '',
        status: '',
        final_amount: '',
        lname1: '500',
        lcount500: '0',
        ltotal1: '0',
        lname2: '200',
        lcount200: '0',
        ltotal2: '0',
        lname3: '100',
        lcount100: '0',
        ltotal3: '0',
        lname4: '50',
        lcount50: '0',
        ltotal4: '0',
        lname5: '20',
        lcount20: '0',
        ltotal5: '0',
        lname6: '10',
        lcount10: '0',
        ltotal6: '0',
        lname7: '5',
        lcount5: '0',
        ltotal7: '0',
        lname8: '2',
        lcount2: '0',
        ltotal8: '0',
        lname9: '1',
        lcount1: '0',
        ltotal9: '0'
    });

    const [wholeTotal, setWholeTotal] = useState('');
    const [lastAmount, setLastAmount] = useState(0);
    const [change, setChange] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updatedRows, setUpdatedRows] = useState({});

     // Load updated rows from localStorage when the component loads
     useEffect(() => {
        const updatedRowsFromStorage = JSON.parse(localStorage.getItem('updatedRows'));
        if (updatedRowsFromStorage) {
            setUpdatedRows(updatedRowsFromStorage);
        }
    }, []);

    useEffect(() => {
        // Save updated rows to localStorage whenever updatedRows changes
        localStorage.setItem('updatedRows', JSON.stringify(updatedRows));
    }, [updatedRows]);

    const handleSubmit2 = async (selectedDenominationLoanId) => {
        try {
            setIsUpdating(true); // Start the update process
    
            if (!selectedDenominationLoanId) {
                console.log('Please select a loan to update.');
                return;
            }
            const data = {
                total_amount: totalNetWeight,
                final_amount: finalamount,
                lcount500: approvalData.lcount500,
                lcount200: approvalData.lcount200,
                lcount100: approvalData.lcount100,
                lcount50: approvalData.lcount50,
                lcount20: approvalData.lcount20,
                lcount10: approvalData.lcount10,
                lcount5: approvalData.lcount5,
                lcount2: approvalData.lcount2,
                lcount1: approvalData.lcount1
            };
            console.log('commonData:', data);
            axios
                .put(`${process.env.REACT_APP_BASE_URL}/api/totalloanvaludetails/${selectedDenominationLoanId}`, data)
                .then((response) => {
                    console.log('Totalloanvalue created/updated successfully:', response.data);
                    setUpdatedRows((prevRows) => ({
                        ...prevRows,
                        [selectedDenominationLoanId]: true, // Mark the row as updated
                    }));
                    window.location.reload(); // Refresh the page
                  
                })
                .catch((error) => {
                    console.error('An error occurred:', error);
                })
                .finally(() => {
                    setIsUpdating(false); // End the update process
                });
        } catch (error) {
            console.error('An error occurred outside axios:', error);
            setIsUpdating(false); // End the update process
            // Handle the error or show an error message to the user if needed.
        }
    };
    


    // useEffect(() => {
    //     const newChange = wholeTotal - parseFloat(finalamount);
    //     setChange(newChange);
    //   }, [wholeTotal, finalamount]);
    useEffect(() => {
        // Calculate Last Amount whenever Whole Total or Final Amount changes
        const calculatedLastAmount = wholeTotal - parseFloat(finalamount);
        setLastAmount(calculatedLastAmount);
    }, [wholeTotal, finalamount]);


    useEffect(() => {
        // Calculate lastAmount
        const calculatedLastAmount = wholeTotal - change;
        setLastAmount(calculatedLastAmount);
    }, [wholeTotal, change]);

    // Function to check if the button should be enabled
    const excessValue = wholeTotal - parseFloat(finalamount);
    const handleCountChange = (event) => {
        const { name, value } = event.target;
        const index = parseInt(name.replace('lcount', ''), 10);
        setApprovalData((prevData) => ({
            ...prevData,
            [`lcount${index}`]: value,
            [`ltotal${index}`]: (parseFloat(value) * prevData[`lname${index}`]).toFixed(2)
        }));
    };
    // const handleCountChange = (event) => {
    //     const { name, value } = event.target;
    //     const index = parseInt(name.replace('lcount', ''), 10);
    //     const denominationName = `lname${index}`;
    //     const calculatedTotal = (parseFloat(value) * parseFloat(approvalData[denominationName])).toFixed(2);

    //     setApprovalData((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //         [`ltotal${index}`]: calculatedTotal
    //     }));
    // };

    useEffect(() => {
        const calculateTotals = () => {
            const ltotal1 = parseFloat(approvalData.lcount500) * approvalData.lname1;
            const ltotal2 = parseFloat(approvalData.lcount200) * approvalData.lname2;
            const ltotal3 = parseFloat(approvalData.lcount100) * approvalData.lname3;
            const ltotal4 = parseFloat(approvalData.lcount50) * approvalData.lname4;
            const ltotal5 = parseFloat(approvalData.lcount20) * approvalData.lname5;
            const ltotal6 = parseFloat(approvalData.lcount10) * approvalData.lname6;
            const ltotal7 = parseFloat(approvalData.lcount5) * approvalData.lname7;
            const ltotal8 = parseFloat(approvalData.lcount2) * approvalData.lname8;
            const ltotal9 = parseFloat(approvalData.lcount1) * approvalData.lname9;
            setApprovalData((prevData) => ({
                ...prevData,
                ltotal1: ltotal1.toFixed(2),
                ltotal2: ltotal2.toFixed(2),
                ltotal3: ltotal3.toFixed(2),
                ltotal4: ltotal4.toFixed(2),
                ltotal5: ltotal5.toFixed(2),
                ltotal6: ltotal6.toFixed(2),
                ltotal7: ltotal7.toFixed(2),
                ltotal8: ltotal8.toFixed(2),
                ltotal9: ltotal9.toFixed(2)
            }));
            const sum = ltotal1 + ltotal2 + ltotal3 + ltotal4 + ltotal5 + ltotal6 + ltotal7 + ltotal8 + ltotal9;
            setWholeTotal(sum.toFixed(2));
        };
        calculateTotals();
    }, [
        approvalData.lname1,
        approvalData.lcount500,
        approvalData.lname2,
        approvalData.lcount200,
        approvalData.lname3,
        approvalData.lcount100,
        approvalData.lname4,
        approvalData.lcount50,
        approvalData.lname5,
        approvalData.lcount20,
        approvalData.lname6,
        approvalData.lcount10,
        approvalData.lname7,
        approvalData.lcount5,
        approvalData.lname8,
        approvalData.lcount2,
        approvalData.lname9,
        approvalData.lcount1
    ]);

    const handleChange2 = (event) => {
        setApprovalData({
            ...approvalData,
            [event.target.name]: event.target.value
        });
    };

    return (
        <>
            <div>
                <Paper>
                    <TextField
                        label="Search by Loan ID"
                        value={searchId}
                        onChange={handleSearchChange}
                        fullWidth
                        style={{ marginBottom: '1rem', transform: 'scale(0.8)' }}
                    />
                    <TableContainer>
                        <Table style={{ transform: 'scale(0.9)', marginTop: '50px' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableHeader}>Loan No</TableCell>
                                    <TableCell className={classes.tableHeader}>Customer Name (Id)</TableCell>
                                    <TableCell className={classes.tableHeader}>Loan Date</TableCell>
                                    <TableCell className={classes.tableHeader}>Loan Amount</TableCell>
                                    <TableCell className={classes.tableHeader}>Scheme</TableCell>
                                    <TableCell className={classes.tableHeader}>Due Date</TableCell>
                                    <TableCell className={classes.tableHeader}>Loan Status</TableCell>

                                    <TableCell className={classes.tableHeader}>Customize</TableCell>
                                    <TableCell className={classes.tableHeader}>Actions</TableCell>
                                    <TableCell className={classes.tableHeader}>Approved/Rejected</TableCell>
                                    <TableCell className={classes.tableHeader}>Denomination</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedCustomers.map((loanapproval, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={classes.tableCell}>{'GLD' + loanapproval.loan_id}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {loanapproval.customerName} ({loanapproval.customer_id})
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>{new Date(loanapproval.date).toLocaleDateString()}</TableCell>
                                        <TableCell className={classes.tableCell}>{loanapproval.loan_amount}</TableCell>
                                        <TableCell className={classes.tableCell}>{loanapproval.scheme}</TableCell>
                                        <TableCell className={classes.tableCell}>{new Date(loanapproval.date_ss).toLocaleDateString()}</TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {loanapproval.balance <= 0 ? (
                                                <span className={classes.closedLoan}>Closed Loan</span>
                                            ) : (
                                                <span className={classes.activeLoan}>Active Loan</span>
                                            )}
                                        </TableCell>

                                        {/* TableCell for IconButton components */}
                                        <TableCell align="center" style={{ border: '1px solid #000' }}>
                                            <IconButton onClick={() => handleView(loanapproval, jewels)} style={{ color: '#28A745' }}>
                                                <RemoveRedEyeIcon />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleNavigate}>
                                                New Payment
                                            </Button>
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {loanStatus[loanapproval.loan_id] === 'Approved' ? (
                                                <span style={{ color: 'green' }}>Approved</span>
                                            ) : loanStatus[loanapproval.loan_id] === 'Rejected' ? (
                                                <span style={{ color: 'red' }}>Rejected</span>
                                            ) : (
                                                <span style={{ color: 'orange' }}>Waiting for Approval</span>
                                            )}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            <Button
                                                variant="contained"
                                                color={isUpdating ? 'secondary' : 'primary'} // Change color to red when updating
                                                disabled={isUpdating || updatedRows[loanapproval.loan_id] || loanStatus[loanapproval.loan_id] !== 'Approved'}
                                                onClick={() => openDenominationDialog(loanapproval.loan_id)}
                                            >
                                                Denomination
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Dialog open={denominationDialogOpen} onClose={closeDenominationDialog}>
                        <DialogTitle>
                            <b>Denomination Details</b>
                        </DialogTitle>
                        <DialogContent>
                            <TableContainer component={Paper} style={tableContainerStyle}>
                                <Table style={tableStyle}>
                                    <TableBody>
                                        <TableRow>
                                            <b>Cash Denomination</b>
                                        </TableRow>
                                        <br />
                                        <Row className="mb-2">
                                            <Form.Group controlId="formTotalNetWeight" className="col col-sm-6">
                                                <Form.Label>Total Net Weight</Form.Label>
                                                <Input
                                                    type="text"
                                                    //className="form-control"
                                                    placeholder="Total Net Weight"
                                                    //aria-label="Total Net Weight"
                                                    name="total_amount"
                                                    value={totalNetWeight} // Use the updated value here
                                                    onChange={handleChange2}
                                                    required
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Row className="mb-2">
                                            <Form.Group controlId="formFinalAmount" className="col col-sm-6">
                                                <Form.Label>Final Amount</Form.Label>
                                                <Input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Final Amount"
                                                    aria-label="Final Amount"
                                                    name="final_amount"
                                                    value={finalamount}
                                                    onChange={handleChange2}
                                                    required
                                                />
                                            </Form.Group>
                                        </Row>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname1"

                                                    onChange={handleChange2}
                                                    value={approvalData.lname1}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount500"
                                                    value={approvalData.lcount500}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}

                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal1" readOnly value={approvalData.ltotal1} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname2"

                                                    readOnly
                                                    value={approvalData.lname2}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount200"
                                                    value={approvalData.lcount200}
                                                    onChange={handleCountChange}

                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal2" readOnly value={approvalData.ltotal2} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="name3"
                                                    readOnly
                                                    value={approvalData.lname3}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount100"
                                                    value={approvalData.lcount100}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal3" readOnly value={approvalData.ltotal3} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname4"
                                                    readOnly
                                                    value={approvalData.lname4}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount50"
                                                    value={approvalData.lcount50}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal4" readOnly value={approvalData.ltotal4} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname5"
                                                    readOnly
                                                    value={approvalData.lname5}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount20"
                                                    value={approvalData.lcount20}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal5" readOnly value={approvalData.ltotal5} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname6"
                                                    readOnly
                                                    value={approvalData.lname6}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount10"
                                                    value={approvalData.lcount10}
                                                    style={{ width: '60px' }}
                                                    onChange={handleCountChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal6" readOnly value={approvalData.ltotal6} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname7"
                                                    readOnly
                                                    value={approvalData.lname7}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount5"
                                                    value={approvalData.lcount5}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal7" readOnly value={approvalData.ltotal7} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname8"
                                                    readOnly
                                                    value={approvalData.lname8}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount2"
                                                    value={approvalData.lcount2}
                                                    onChange={handleCountChange}
                                                    style={{ width: '60px' }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal8" readOnly value={approvalData.ltotal8} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lname9"
                                                    readOnly
                                                    style={{ width: '60px' }}
                                                    value={approvalData.lname9}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input
                                                    type="text"
                                                    name="lcount1"
                                                    value={approvalData.lcount1}
                                                    style={{ width: '60px' }}
                                                    onChange={handleCountChange}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Input type="text" name="ltotal9" readOnly value={approvalData.ltotal9} />
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
                                            <TableCell>{excessValue}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <p>
                                                    <span style={{ color: 'green', fontSize: '13px' }}>Last Amount: {lastAmount} rupees</span>
                                                </p>
                                                <Button type="submit" disabled={excessValue < 0} className="btn btn-primary" onClick={() => handleSubmit2(selectedDenominationLoanId)}>
                                                    Submit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={closeDenominationDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {error && <div>Error: {error}</div>}
                    <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                        <DialogTitle>
                            <b>Delete Confirmation</b>
                        </DialogTitle>
                        <DialogContent>Are you sure you want to delete this customer data?</DialogContent>
                        <DialogActions>
                            <Button onClick={cancelDelete} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => confirmDelete()} color="primary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={!!selectedLoanDetails} onClose={closeDetailsDialog} className="print-dialog" >
                        <div style={{ textAlign: 'center' }}>
                            <img src={img1} alt="Logo" style={{ width: '100px', marginBottom: '10px' }} />
                            <Typography variant="subtitle1">
                                <h1>VINSUP GMS</h1>
                                <h3
                                    style={{
                                        borderBottom: '2px solid #000',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        background: '#f0f0f0'
                                    }}>
                                    Personal Details {new Date().toLocaleDateString()}
                                </h3>
                            </Typography>
                        </div>
                        <DialogContent className={classes.dialogContent}>
                            {/* Display customer details here */}
                            <TableContainer component={Paper}>
                                <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Customer ID</b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.customer_id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Loan No</b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{'LID' + selectedLoanDetails?.loan_id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Scheme</b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.scheme}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Date </b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.date}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Today Gold Rate</b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.today_gold_rate}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Loan Amount</b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.loan_amount}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Adjustment Charges </b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.adjustment_charges}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Additional Charges </b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.additional_charges}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Final Amount </b>
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.final_amount}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Due Days </b>{' '}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.due_days}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Final Due Date </b>{' '}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.date_ss}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>C/O Name </b>{' '}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.care_of_name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>
                                                <b>Mobile Number </b>{' '}
                                            </TableCell>
                                            <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedLoanDetails?.mobile_number}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="subtitle1">
                                    <h3
                                        style={{
                                            borderBottom: '2px solid #000',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            background: '#f0f0f0'
                                        }}>
                                        Jewel Details
                                    </h3>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 300 }} aria-label="simple table">
                                        <TableBody>
                                            {selectedJewelDetails && (
                                                <>
                                                    {renderRow("1) Jewel Type", selectedJewelDetails?.jewel_type)}
                                                    {renderRow("Count", selectedJewelDetails?.count)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight)}

                                                    {renderRow("2) Jewel Type", selectedJewelDetails?.jewel_type1)}
                                                    {renderRow("Count", selectedJewelDetails?.count1)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight1)}

                                                    {renderRow("3) Jewel Type", selectedJewelDetails?.jewel_type2)}
                                                    {renderRow("Count", selectedJewelDetails?.count2)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight2)}

                                                    {renderRow("4) Jewel Type", selectedJewelDetails?.jewel_type3)}
                                                    {renderRow("Count", selectedJewelDetails?.count3)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight3)}

                                                    {renderRow("5) Jewel Type", selectedJewelDetails?.jewel_type4)}
                                                    {renderRow("Count", selectedJewelDetails?.count4)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight4)}

                                                    {renderRow("6) Jewel Type", selectedJewelDetails?.jewel_type5)}
                                                    {renderRow("Count", selectedJewelDetails?.count5)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight5)}

                                                    {renderRow("7) Jewel Type", selectedJewelDetails?.jewel_type6)}
                                                    {renderRow("Count", selectedJewelDetails?.count6)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight6)}

                                                    {renderRow("8) Jewel Type", selectedJewelDetails?.jewel_type7)}
                                                    {renderRow("Count", selectedJewelDetails?.count7)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight7)}

                                                    {renderRow("9) Jewel Type", selectedJewelDetails?.jewel_type8)}
                                                    {renderRow("Count", selectedJewelDetails?.count8)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight8)}

                                                    {renderRow("10) Jewel Type", selectedJewelDetails?.jewel_type9)}
                                                    {renderRow("Count", selectedJewelDetails?.count9)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight9)}

                                                    {renderRow("11) Jewel Type", selectedJewelDetails?.jewel_type10)}
                                                    {renderRow("Count", selectedJewelDetails?.count10)}
                                                    {renderRow("Net Weight", selectedJewelDetails?.net_weight10)}
                                                    {/* Continue rendering rows for Jewel Types 4 to 11 */}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <Typography variant="subtitle1">
                                    <h3
                                        style={{
                                            borderBottom: '2px solid #000',
                                            padding: '10px',
                                            borderRadius: '5px',
                                            background: '#f0f0f0'
                                        }}>
                                        Loan Amount Denomination
                                    </h3>
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 300 }} aria-label="simple table">
                                        <TableBody>
                                            {selectedTotalloanvalue && (
                                                <>
                                                    {renderRows("500", selectedTotalloanvalue?.lcount500)}
                                                    {renderRows("200", selectedTotalloanvalue?.lcount200)}
                                                    {renderRows("100", selectedTotalloanvalue?.lcount100)}

                                                    {renderRows("50", selectedTotalloanvalue?.lcount50)}
                                                    {renderRows("20", selectedTotalloanvalue?.lcount20)}
                                                    {renderRows("10", selectedTotalloanvalue?.lcount10)}

                                                    {renderRows("5", selectedTotalloanvalue?.lcount5)}
                                                    {renderRows("2", selectedTotalloanvalue?.lcount2)}
                                                    {renderRows("1", selectedTotalloanvalue?.lcount1)}
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <DialogActions>
                                <Button className="print-hidden" onClick={handlePrint} color="primary">
                                    Print
                                </Button>
                                <Button onClick={closeDetailsDialog} color="primary" className="close-hidden">
                                    Close
                                </Button>
                            </DialogActions>
                        </DialogContent>
                    </Dialog>
                </Paper>
            </div>
        </>
    );
};
export default Loanlist;