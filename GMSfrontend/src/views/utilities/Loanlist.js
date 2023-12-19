import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
  const [rowSelectedOptions, setRowSelectedOptions] = useState({});
  const [rowRemarks, setRowRemarks] = useState({});
  const [approvalStatusList, setApprovalStatusList] = useState([]);
  const classes = useStyles();
  const [searchId, setSearchId] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [loans, setLoans] = useState([]); // Assuming you have state variables for loans, jewels, and values
  const [jewels, setJewels] = useState([]);
  const [loanIdToDelete, setLoanIdToDelete] = useState(null); // Change this to null instead of an empty array
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const [data, setData] = useState({
    loanapprovaldetails: [],
    jeweldetails: [],
    totalloanvalue: [],
  });
  const [loanStatus, setLoanStatus] = useState({});
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
  // const [data, setData] = useState(null);
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

  const selectedLoanDetails = data?.loanapprovaldetails.find(item => item.loan_id === selectedLoanId);
  const selectedJewelDetails = data?.jeweldetails.find(item => item.loan_id === selectedLoanId);
  const selectedTotalloanvalue = data?.totalloanvalue.find(item => item.loan_id === selectedLoanId);
  const handleView = (loanapproval) => {
    setSelectedLoanId(loanapproval.loan_id);
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

  const [approvalData, setApprovalData] = useState({
    total_amount: '',
    status: '',
    remark: '',
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

  const successToastStyle = {
    backgroundColor: '#5cb85c',
    color: 'white'
  };

  const errorToastStyle = {
    backgroundColor: '#d9534f',
    color: 'white'
  };

  const handleSubmit2 = (loan_id, selectedOption) => {
    // Check if the loan is already approved
    if (loanStatus[loan_id] === 'Approved') {
      alert('This loan has already been approved. You cannot submit it again.');
      return;
    }

    if (!selectedOption) {
      alert('Please select an option before submitting.');
      return;
    }

    // Rest of your code for submission...
    const data = {
      status: selectedOption,
      // Other data fields as needed
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/totalloanvalue`, data)
      .then((response) => {
        console.log('Data submitted successfully:', response.data);
        // Handle any other actions you need after successful submission
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here
      });
    // Find the selected loan based on the loan_id in the UI table
    //const selectedLoan = loans.find((loan) => loan.loan_id === selectedLoanId);
    //console.log( 'loanid',selectedLoan)
    // if (!selectedLoan) {
    //   alert('Selected loan not found.');
    //   return;
    // }
    // Create a common data object for the POST request
    const commonData = {
      total_amount: '0',
      status: approvalData.status,
      rejectionReason: approvalData.status === 'Rejected' ? approvalData.remark : '',
      final_amount: '0',
      loan_id: loan_id, // Use the loan_id from the selected loan
      lcount500: '0',
      lcount200: '0',
      lcount100: '0',
      lcount50: '0',
      lcount20: '0',
      lcount10: '0',
      lcount5: '0',
      lcount2: '0',
      lcount1: '0',
      remark: approvalData.remark,
    };

    // Perform the common POST request for both "Approved" and "Rejected" options
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/totalloanvalue`, commonData)
      .then((response) => {
        console.log('Totalloanvalue created/updated successfully:', response.data);
        navigate('/utils/util-loanlist'); // Redirect user to /utils/util-list
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error(error);
      });
    if (approvalData.status === 'Rejected') {
      // If status is "Rejected," perform the PUT request to update loanapprovaldetails
      const data = {
        loan_amount: 0,
        adjustment_charges: 0,
        additional_charges: 0,
        final_amount: 0,
        balance: 0,
        // ...other fields
      };

      axios
        .put(`${process.env.REACT_APP_BASE_URL}/api/loanapprovaldetails/${loan_id}`, data)
        .then((response) => {
          console.log('Loan details updated successfully:', response.data);
          navigate('/utils/util-loanlist'); // Redirect user to /utils/util-list
          window.location.reload(); // Refresh the page
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();

  const handleChange2 = (event, index) => {
    const newStatusList = [...approvalStatusList];
    newStatusList[index] = event.target.value;
    setApprovalStatusList(newStatusList);
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
                  <TableCell className={classes.tableHeader}>Approval Status</TableCell>
                  <TableCell className={classes.tableHeader}>Approved/Rejected</TableCell>

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
                    <TableCell style={{ border: '1px solid #000' }}>
                      <IconButton onClick={() => handleView(loanapproval, jewels)} style={{ color: '#28A745' }}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      <IconButton style={{ color: '#FF0000' }} onClick={() => openConfirmationDialog(loanapproval.loan_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tableCell}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNavigate}
                      >
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
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">

                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <Form.Select
                              id={`status-select-${index}`} // Use a unique ID for each select element
                              label="Document type"
                              name="status"
                              value={rowSelectedOptions[index] || ''} // Use the row-specific selected option
                              onChange={(event) => {
                                const selectedOption = event.target.value;
                                // Update the state for this row
                                setRowSelectedOptions({
                                  ...rowSelectedOptions,
                                  [index]: selectedOption,
                                });

                                // Update the approvalData status for the corresponding loan_id
                                const updatedApprovalData = { ...approvalData };
                                updatedApprovalData.status = selectedOption;
                                setApprovalData(updatedApprovalData);
                              }}
                              required
                              style={{ minWidth: '150px', height: '38px' }}
                            >
                              <option value="Choose..."></option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </Form.Select>
                          </Form.Group>

                          {rowSelectedOptions[index] === 'Rejected' && (
                            <Form.Group controlId="rejectedReason" className="col col-sm-3">
                              <br></br>

                              <Form.Control
                                as="textarea"
                                placeholder="Reason for Rejection"
                                value={rowRemarks[index] || ''}
                                onChange={(event) => {
                                  const reason = event.target.value;
                                  setRowRemarks({
                                    ...rowRemarks,
                                    [index]: reason,
                                  });
                                  // Update the approvalData status for the corresponding loan_id
                                  const updatedApprovalData = { ...approvalData };
                                  updatedApprovalData.remark = reason;
                                  setApprovalData(updatedApprovalData);
                                }}
                                style={{ height: '50px', width: '150px' }}
                                rows={2} // Limit to two lines
                                required
                              />
                            </Form.Group>
                          )}

                          <TableCell>
                            {loanStatus[loanapproval.loan_id] === 'Approved' ? (
                              <span style={{ color: 'red' }}>Already Approved</span>
                            ) : loanStatus[loanapproval.loan_id] === 'Rejected' ? (
                              <span style={{ color: 'red' }}>Already Rejected</span>
                            ) : (
                              <Button
                                variant={
                                  loanStatus[loanapproval.loan_id] === 'Approved' || loanStatus[loanapproval.loan_id] === 'Rejected'
                                    ? 'outlined'
                                    : 'contained'
                                }
                                color={
                                  loanStatus[loanapproval.loan_id] === 'Approved' || loanStatus[loanapproval.loan_id] === 'Rejected'
                                    ? 'error'
                                    : 'primary'
                                }
                                onClick={() => handleSubmit2(loanapproval.loan_id, rowSelectedOptions[index])}
                              >
                                Submit
                              </Button>
                            )}
                          </TableCell>

                        </FormControl>
                      </Box>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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

                          {renderRows("Loan ID", selectedTotalloanvalue?.loan_id)}
                          {renderRows("Total Net Weight", selectedTotalloanvalue?.total_amount)}
                          {renderRows("Final Amount", selectedTotalloanvalue?.final_amount)}



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