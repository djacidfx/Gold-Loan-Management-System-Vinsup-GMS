import { Button, Grid, Select, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { Box, Card, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import AWS from 'aws-sdk';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const steps = ['Personal Detail', 'Jewel Detail']; // Replace with your actual step names
const responsivePadding = {
  padding: '20px',

  '@media (max-width: 600px)': {
    padding: '10px'
  },

  '@media (max-width: 400px)': {
    padding: '5px'
  }
};

AWS.config.update({

  accessKeyId: process.env.REACT_APP_ACCESS_KEY,



  secretAccessKey: process.env.REACT_APP_SECRET_KEY,



  region: process.env.REACT_APP_REGION

});

const StepOneForm = ({ onNext, setFinalAmount }) => {
  // Step 1 form fields and state
  const [loanData, setLoanData] = useState({
    customer_id: '',
    loan_no: '',
    receipt_no: '',
    scheme: '',
    date: new Date().toISOString().split('T')[0],
    today_gold_rate: '',
    loan_amount: '',
    adjustment_charges: '',
    additional_charges: '',
    final_amount: '',
    due_days: '',
    date_ss: '',
    care_of_name: '',
    address_line_one: '',
    address_line_two: '',
    mobile_number: ''
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/customers`)
      .then((response) => {
        // Assuming response.data.customers is an array of customer objects
        const customerArray = response.data.customers || [];

        if (Array.isArray(customerArray)) {
          const combinedCustomers = customerArray.map((customer) => ({
            ...customer,
            id_name_combined: `${customer.customer_id} - ${customer.customer_name}` // combining id and name
          }));

          setCustomers(combinedCustomers);
        } else {
          console.error('Unexpected response data:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleCustomerChange = (e) => {
    const selectedCustomerId = e.target.value;

    // Find the customer with the matching ID
    const selectedCustomer = customers.find((customer) => customer.customer_id.toString() === selectedCustomerId.toString());

    if (selectedCustomer) {
      setLoanData({
        ...loanData,
        customer_id: selectedCustomerId,
        care_of_name: selectedCustomer.care_of_name, // Make sure these fields exist
        address_line_one: selectedCustomer.address_line_one,
        address_line_two: selectedCustomer.address_line_two,
        mobile_number: selectedCustomer.mobile_number
      });
    } else {
      console.error('Customer not found:', selectedCustomerId);
    }
  };

  useEffect(() => {
    // Function to calculate final amount
    const calculateFinalAmount = () => {
      const loanAmount = parseFloat(loanData.loan_amount);
      const adjustmentCharges = parseFloat(loanData.adjustment_charges);
      const additionalCharges = parseFloat(loanData.additional_charges);

      if (!isNaN(loanAmount) && !isNaN(adjustmentCharges) && !isNaN(additionalCharges)) {
        const finalAmount = loanAmount + additionalCharges - adjustmentCharges;
        setLoanData({ ...loanData, final_amount: finalAmount.toFixed(2) });
        setFinalAmount(finalAmount.toFixed(2)); // Update finalAmount in parent component
      }
    };

    calculateFinalAmount();
  }, [loanData.loan_amount, loanData.adjustment_charges, loanData.additional_charges, setLoanData, setFinalAmount]);

  // Handle form submission for Step 1
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check required fields, excluding loan_no if it's auto-generated
    if (!loanData.customer_id || !loanData.scheme || !loanData.loan_amount/* other required fields */) {
      alert('Please fill all required fields.');
      console.log(loanData)
      return;
    }

    const dataToSend = {
      customer_id: loanData.customer_id,
      scheme: loanData.scheme,
      date: loanData.date,
      today_gold_rate: loanData.today_gold_rate,
      loan_amount: loanData.loan_amount, // Make sure to match the correct name
      adjustment_charges: loanData.adjustment_charges,
      additional_charges: loanData.additional_charges,
      final_amount: loanData.final_amount,
      due_days: loanData.due_days,
      date_ss: loanData.date_ss,
      care_of_name: loanData.care_of_name,
      address_line_one: loanData.address_line_one,
      address_line_two: loanData.address_line_two,
      mobile_number: loanData.mobile_number,
      balance: loanData.loan_amount
    };

    // Log the data to send
    console.log(dataToSend);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/loanapproval`, dataToSend)
      .then((response) => {
        // Assuming response.data.loan_id contains the loan_id
        const loan_id = response.data.loan_id;

        // If loan_id is present in the response
        if (loan_id) {
          // Store the loan_id in the sessionStorage
          sessionStorage.setItem('loan_id', loan_id);
          console.log('Loan details submitted successfully.');
          onNext(); // Move to the next step
        } else {
          alert('Loan details submitted, but loan_id was not received.');
        }
      })
      .catch((error) => {
        alert('Error submitting loan details: ' + error.message);
      });
  };

  // const [SchemeData, setSchemeData] = useState({
  //   scheme: ''
  // });
  // const [loanSchemes, setLoanSchemes] = useState([]);

  // useEffect(() => {
  //   // Fetch loan schemes from the API
  //   axios
  //     .get('${process.env.REACT_APP_BASE_URL}/api/loanschemes')
  //     .then((response) => {
  //       console.log('API Response Data:', response.data);
  //       if (response.data.masterloanscheme) {
  //         setLoanSchemes(response.data.masterloanscheme);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const handleDueDaysChange = (event) => {
    setLoanData({ ...loanData, due_days: event.target.value });

    const currentDate = new Date();
    let dueDate = new Date(currentDate);

    if (event.target.value === '3 Month') {
      dueDate.setMonth(currentDate.getMonth() + 3);
    } else if (event.target.value === '6 Month') {
      dueDate.setMonth(currentDate.getMonth() + 6);
    } else if (event.target.value === '1 Year') {
      dueDate.setFullYear(currentDate.getFullYear() + 1);
    }

    const formattedDueDate = dueDate.toISOString().substr(0, 10);
    setLoanData({ ...loanData, date_ss: formattedDueDate });
  };

  const formatCurrency = (value) => {
    return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const unformatCurrency = (value) => {
    return value.replace(/,/g, '');
  };

  const [loanScheme, setLoanScheme] = useState({
    scheme: '' // Make sure 'scheme' matches the name of your form field
    // other form fields
  });

  const [schemes, setSchemes] = useState([]);

  useEffect(() => {
    // Fetch schemes from your API endpoint
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/loanschemes`) // Replace with your actual API endpoint
      .then((response) => {
        const fetchedSchemes = response.data.masterloanscheme;
        console.log('Fetched schemes:', fetchedSchemes);
        // setSchemes(fetchedSchemes);
        setName(fetchedSchemes)
      })
      .catch((error) => {
        console.error('Error fetching schemes:', error);
      });
  }, []);

  // const handleSchemeChange = (event) => {
  //   const selectedScheme = event.target.value;
  //   console.log('Selected Value:', event.target.value);
  //   // Update the 'scheme' field in the 'loanScheme' state
  //   setLoanScheme({ ...loanData, scheme: selectedScheme });
  // };
  const [name, setName] = useState([])
  const handleSchemeChange = (event) => {
    const { name, value } = event.target;
    // Update the form values
    setLoanData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   // Here, you can access the selected scheme using 'loanScheme.scheme'
  //   console.log('Selected Scheme:', loanScheme.scheme);

  //   // Perform any further actions, such as submitting the form data
  // };

  const authPersonOptions = name.map((person) => (
    <option key={person.masterloan_scheme} value={person.masterloan_scheme}>
      {person.masterloan_scheme}
    </option>
  ));

  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Form.Label className="mb">
              <br />
              <h3>
                <b>Loan Details</b>
              </h3>
            </Form.Label>
            <hr className="hori-col-3" />
            <MDBCardBody>
              <br />
              <Row className="mb-2">
                <Form.Group controlId="formcustomername" className="col col-sm-6">
                  <Form.Label>Customer Name(Id)<span style={{ color: 'red' }}>*</span></Form.Label>
                  <select
                    className="form-control"
                    name="customer_id"
                    value={loanData.customer_id}
                    onChange={handleCustomerChange} // Implement this function
                    required
                    isSearchable
                  >
                    <option value="" disabled>
                      Select a customer
                    </option>
                    {customers.map((customer) => (
                      <option key={customer.customer_id} value={customer.customer_id}>
                        {customer.customer_name} ({customer.customer_id})
                      </option>
                    ))}
                  </select>
                </Form.Group>
                <Form.Group controlId="formGridScheme" className="col col-sm-6">
                  <Form.Label>Scheme<span style={{ color: 'red' }}>*</span></Form.Label>
                  <Form.Control as="select" name="scheme" value={loanData.scheme} onChange={handleSchemeChange} required>
                    <option value="" disabled selected>
                      Select Scheme
                    </option>
                    {authPersonOptions}
                  </Form.Control>
                  {/* <Form.Control as="select" name="scheme" value={loanData.scheme} onChange={handleSchemeChange} required>
                    <option value="">Select Scheme</option>
                    {schemes.map((scheme) => (
                      <option key={scheme.masterloanscheme_id} value={scheme.masterloan_scheme}>
                        {scheme.masterloan_scheme}
                      </option>
                    ))}
                  </Form.Control> */}
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group controlId="formGridDate" className="col col-sm-6">
                  <Form.Label>Date<span style={{ color: 'red' }}>*</span></Form.Label>

                  <Form.Control
                    type="date" // This sets the input type to "date" for the date picker
                    className="form-control"
                    placeholder=" Date"
                    name="date"
                    value={loanData.date}
                    onChange={(event) => setLoanData({ ...loanData, date: event.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group className="col col-sm-6" controlId="formGridName">
                  <Form.Label>Today Gold Rate</Form.Label>

                  <input
                    className="form-control"
                    type="text"
                    name="today_gold_rate"
                    value={loanData.today_gold_rate}
                    onChange={(event) => setLoanData({ ...loanData, today_gold_rate: event.target.value })}
                    placeholder="Today Gold Rate"
                  />
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group controlId="formGridAddress1" className="col col-sm-3">
                  <Form.Label>Loan Amount<span style={{ color: 'red' }}>*</span></Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Loan Amount"
                    name="loan_amount"
                    value={formatCurrency(loanData.loan_amount)}
                    onChange={(event) => setLoanData({ ...loanData, loan_amount: unformatCurrency(event.target.value) })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridAddress2" className="col col-sm-3">
                  <Form.Label>Adjustment Charges<span style={{ color: 'red' }}>*</span></Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Adjustment Charges"
                    name="adjustment_charges"
                    value={formatCurrency(loanData.adjustment_charges)}
                    onChange={(event) => setLoanData({ ...loanData, adjustment_charges: unformatCurrency(event.target.value) })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridState" className="col col-sm-3">
                  <Form.Label>Additional Charges<span style={{ color: 'red' }}>*</span></Form.Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Additional Charges"
                    name="additional_charges"
                    value={formatCurrency(loanData.additional_charges)}
                    onChange={(event) => setLoanData({ ...loanData, additional_charges: unformatCurrency(event.target.value) })}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridName" className="col col-sm-3">
                  <Form.Label>Final Amount</Form.Label>
                  <Form.Control
                    type="text"
                    name="final_amount"
                    placeholder="Final Amount"
                    value={loanData.final_amount}
                    onChange={(event) => setLoanData({ ...loanData, final_amount: event.target.value })}
                    required
                    readyonly
                  />
                </Form.Group>
              </Row>{' '}
              <Row className="mb-2">
                <Form.Group controlId="formGridCountry" className="col col-sm-6">
                  <Form.Label>Due Days<span style={{ color: 'red' }}>*</span></Form.Label>

                  <Form.Select
                    defaultValue={loanData.due_days}
                    className="form-control"
                    name="due_days"
                    onChange={handleDueDaysChange}
                    required
                  >
                    <option value="Choose..."></option>
                    <option value="3 Month">3 Month</option>
                    <option value="6 Month">6 Month</option>
                    <option value="1 Year">1 Year</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group controlId="formGridDate" className="col col-sm-6">
                  <Form.Label>Due Date</Form.Label>
                  <input
                    type="date"
                    className="form-control"
                    name="date_ss"
                    value={loanData.date_ss}
                    onChange={(event) => setLoanData({ ...loanData, date_ss: event.target.value })}
                    required
                  />
                </Form.Group>
              </Row>
            </MDBCardBody>
          </Grid>
        </Grid>
        <Form.Label className="mb">
          <br></br>

          <h3>
            <b>Address Details</b>
          </h3>
        </Form.Label>

        <hr className="hori-col-3" />

        <Row className="mb-2">
          <Form.Group controlId="formcustomername" className="col col-sm-6">
            <Form.Label>C/O</Form.Label>
            <input
              type="text"
              className="form-control"
              placeholder="Care of Name"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="care_of_name" // Removed the extra space here
              value={loanData.care_of_name}
              onChange={(event) => setLoanData({ ...loanData, care_of_name: event.target.value })}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formDate" className="col col-sm-6">
            <Form.Label>Address</Form.Label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="address_line_one"
              value={loanData.address_line_one}
              onChange={(event) => setLoanData({ ...loanData, address_line_one: event.target.value })}
              readOnly
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group controlId="formDate" className="col col-sm-6">
            <Form.Label>Area</Form.Label>

            <Form.Label>Area</Form.Label>
            <input
              type="text"
              className="form-control"
              placeholder="Area"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="address_line_two"
              value={loanData.address_line_two}
              onChange={(event) => setLoanData({ ...loanData, address_line_two: event.target.value })}
              readOnly
            />
          </Form.Group>

          <Form.Group controlId="formGridgender" className="col col-sm-6">
            <Form.Label>Mobile number</Form.Label>
            <input
              type="text"
              className="form-control"
              placeholder="mobile number"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="mobile_number"
              value={loanData.mobile_number}
              onChange={(event) => setLoanData({ ...loanData, mobile_number: event.target.value })}
              readOnly
            />
          </Form.Group>
        </Row>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

const StepTwoForm = ({ onNext, onBack, totalNetWeight, setTotalNetWeight }) => {
  const documentCopyRef = React.useRef(null);
  const documentCopy1Ref = React.useRef(null);

  const documentCopy2Ref = React.useRef(null);

  const documentCopy3Ref = React.useRef(null);

  const documentCopy4Ref = React.useRef(null);

  const documentCopy5Ref = React.useRef(null);

  const documentCopy6Ref = React.useRef(null);

  const documentCopy7Ref = React.useRef(null);

  const documentCopy8Ref = React.useRef(null);

  const documentCopy9Ref = React.useRef(null);

  const documentCopy10Ref = React.useRef(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);

  const [selectedImage3, setSelectedImage3] = useState(null);

  const [selectedImage4, setSelectedImage4] = useState(null);

  const [selectedImage5, setSelectedImage5] = useState(null);

  const [selectedImage6, setSelectedImage6] = useState(null);

  const [selectedImage7, setSelectedImage7] = useState(null);

  const [selectedImage8, setSelectedImage8] = useState(null);

  const [selectedImage9, setSelectedImage9] = useState(null);

  const [selectedImage10, setSelectedImage10] = useState(null);

  const [showWebcamDocumentCopy, setShowWebcamDocumentCopy] = useState(false);
  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);

  const [showWebcamDocumentCopy2, setShowWebcamDocumentCopy2] = useState(false);

  const [showWebcamDocumentCopy3, setShowWebcamDocumentCopy3] = useState(false);

  const [showWebcamDocumentCopy4, setShowWebcamDocumentCopy4] = useState(false);

  const [showWebcamDocumentCopy5, setShowWebcamDocumentCopy5] = useState(false);

  const [showWebcamDocumentCopy6, setShowWebcamDocumentCopy6] = useState(false);

  const [showWebcamDocumentCopy7, setShowWebcamDocumentCopy7] = useState(false);

  const [showWebcamDocumentCopy8, setShowWebcamDocumentCopy8] = useState(false);

  const [showWebcamDocumentCopy9, setShowWebcamDocumentCopy9] = useState(false);

  const [showWebcamDocumentCopy10, setShowWebcamDocumentCopy10] = useState(false);

  const [jewelData, setJewelData] = useState({
    jewel_type: '',
    purity: '',
    count: '',
    gross_weight: '',
    stone: '',
    wastage: '',
    net_weight: '',
    jewel_photo: '',
    jewel_type1: '',
    purity1: '',
    count1: '',
    gross_weight1: '',
    stone1: '',
    wastage1: '',
    net_weight1: '',
    jewel_photo1: '',
    jewel_type2: '',
    purity2: '',
    count2: '',
    gross_weight2: '',
    stone2: '',
    wastage2: '',
    net_weight2: '',
    jewel_photo2: '',
    jewel_type3: '',
    purity3: '',
    count3: '',
    gross_weight3: '',
    stone3: '',
    wastage3: '',
    net_weight3: '',
    jewel_photo3: '',
    jewel_type4: '',
    purity4: '',
    count4: '',
    gross_weight4: '',
    stone4: '',
    wastage4: '',
    net_weight4: '',
    jewel_photo4: '',
    jewel_type5: '',
    purity5: '',
    count5: '',
    gross_weight5: '',
    stone5: '',
    wastage5: '',
    net_weight5: '',
    jewel_photo5: '',
    jewel_type6: '',
    purity6: '',
    count6: '',
    gross_weight6: '',
    stone6: '',
    wastage6: '',
    net_weight6: '',
    jewel_photo6: '',
    jewel_type7: '',
    purity7: '',
    count7: '',
    gross_weight7: '',
    stone7: '',
    wastage7: '',
    net_weight7: '',
    jewel_photo7: '',
    jewel_type8: '',
    purity8: '',
    count8: '',
    gross_weight8: '',
    stone8: '',
    wastage8: '',
    net_weight8: '',
    jewel_photo8: '',
    jewel_type9: '',
    purity9: '',
    count9: '',
    gross_weight9: '',
    stone9: '',
    wastage9: '',
    net_weight9: '',
    jewel_photo9: '',
    jewel_type10: '',
    purity10: '',
    count10: '',
    gross_weight10: '',
    stone10: '',
    wastage10: '',
    net_weight10: '',
    jewel_photo10: ''
  });

  const [showContent, setShowContent] = useState(false);

  const [showContent1, setShowContent1] = useState(false);

  const [showContent2, setShowContent2] = useState(false);

  const [showContent3, setShowContent3] = useState(false);

  const [showContent4, setShowContent4] = useState(false);

  const [showContent5, setShowContent5] = useState(false);

  const [showContent6, setShowContent6] = useState(false);

  const [showContent7, setShowContent7] = useState(false);

  const [showContent8, setShowContent8] = useState(false);

  const [showContent9, setShowContent9] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = React.useRef(null);
  ///
  const [showWebcam1, setShowWebcam1] = useState(false);
  const [capturedImage1, setCapturedImage1] = useState(null);
  const webcamRef1 = React.useRef(null);
  const navigate = useNavigate();

  const handleDocumentCopyChange = useCallback(() => {
    const imageSrc = documentCopyRef.current.getScreenshot();

    console.log('jewel_photo captured:', imageSrc);

    setSelectedImage(imageSrc);
  }, []);

  const handleDocumentCopy1Change = useCallback(() => {
    const imageSrc = documentCopy1Ref.current.getScreenshot();

    console.log('jewel_photo1 captured:', imageSrc);

    setSelectedImage1(imageSrc);
  }, []);

  const handleDocumentCopy2Change = useCallback(() => {
    const imageSrc = documentCopy2Ref.current.getScreenshot();

    console.log('jewel_photo2 captured:', imageSrc);

    setSelectedImage2(imageSrc);
  }, []);

  const handleDocumentCopy3Change = useCallback(() => {
    const imageSrc = documentCopy3Ref.current.getScreenshot();

    console.log('jewel_photo3 captured:', imageSrc);

    setSelectedImage3(imageSrc);
  }, []);

  const handleDocumentCopy4Change = useCallback(() => {
    const imageSrc = documentCopy4Ref.current.getScreenshot();

    console.log('jewel_photo4 captured:', imageSrc);

    setSelectedImage4(imageSrc);
  }, []);

  const handleDocumentCopy5Change = useCallback(() => {
    const imageSrc = documentCopy5Ref.current.getScreenshot();

    console.log('jewel_photo5 captured:', imageSrc);

    setSelectedImage5(imageSrc);
  }, []);

  const handleDocumentCopy6Change = useCallback(() => {
    const imageSrc = documentCopy6Ref.current.getScreenshot();

    console.log('jewel_photo6 captured:', imageSrc);

    setSelectedImage6(imageSrc);
  }, []);

  const handleDocumentCopy7Change = useCallback(() => {
    const imageSrc = documentCopy7Ref.current.getScreenshot();

    console.log('jewel_photo7 captured:', imageSrc);

    setSelectedImage7(imageSrc);
  }, []);

  const handleDocumentCopy8Change = useCallback(() => {
    const imageSrc = documentCopy8Ref.current.getScreenshot();

    console.log('jewel_photo8 captured:', imageSrc);

    setSelectedImage8(imageSrc);
  }, []);

  const handleDocumentCopy9Change = useCallback(() => {
    const imageSrc = documentCopy9Ref.current.getScreenshot();

    console.log('jewel_photo9 captured:', imageSrc);

    setSelectedImage9(imageSrc);
  }, []);

  const handleDocumentCopy10Change = useCallback(() => {
    const imageSrc = documentCopy10Ref.current.getScreenshot();

    console.log('jewel_photo10 captured:', imageSrc);

    setSelectedImage10(imageSrc);
  }, []);

  const openWebcamForDocumentCopy = () => {
    setShowWebcamDocumentCopy(true);
  };
  const openWebcamForDocumentCopy1 = () => {
    setShowWebcamDocumentCopy1(true);
  };

  const openWebcamForDocumentCopy2 = () => {
    setShowWebcamDocumentCopy2(true);
  };

  const openWebcamForDocumentCopy3 = () => {
    setShowWebcamDocumentCopy3(true);
  };

  const openWebcamForDocumentCopy4 = () => {
    setShowWebcamDocumentCopy4(true);
  };

  const openWebcamForDocumentCopy5 = () => {
    setShowWebcamDocumentCopy5(true);
  };

  const openWebcamForDocumentCopy6 = () => {
    setShowWebcamDocumentCopy6(true);
  };

  const openWebcamForDocumentCopy7 = () => {
    setShowWebcamDocumentCopy7(true);
  };

  const openWebcamForDocumentCopy8 = () => {
    setShowWebcamDocumentCopy8(true);
  };

  const openWebcamForDocumentCopy9 = () => {
    setShowWebcamDocumentCopy9(true);
  };

  const openWebcamForDocumentCopy10 = () => {
    setShowWebcamDocumentCopy10(true);
  };

  const dataURItoBlob = (dataURI) => {
    if (!dataURI || typeof dataURI !== 'string' || !dataURI.startsWith('data:')) {
      return null; // Return null for invalid dataURIs
    }

    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };
  const toggleContent1 = () => {
    setShowContent1(!showContent1);
  };
  const toggleContent2 = () => {
    setShowContent2(!showContent2);
  };
  const toggleContent3 = () => {
    setShowContent3(!showContent3);
  };
  const toggleContent4 = () => {
    setShowContent4(!showContent4);
  };
  const toggleContent5 = () => {
    setShowContent5(!showContent5);
  };
  const toggleContent6 = () => {
    setShowContent6(!showContent6);
  };
  const toggleContent7 = () => {
    setShowContent7(!showContent7);
  };
  const toggleContent8 = () => {
    setShowContent8(!showContent8);
  };
  const toggleContent9 = () => {
    setShowContent9(!showContent9);
  };
  const clearCapture = () => {
    //// clear the image
    setCapturedImage(null);
  };
  const openWebcam = () => {
    setShowWebcam(true);
  };
  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot(); //// capture the image
    setCapturedImage(imageSrc);
    setShowWebcam(false);
  };
  const handleCapture1 = () => {
    const imageSrc = webcamRef1.current.getScreenshot(); //// capture the image
    setCapturedImage1(imageSrc);
    setShowWebcam(false);
  };

  const updateNetWeight = (index = 0) => {
    const gross_weight_key = index === 0 ? 'gross_weight' : `gross_weight${index}`;
    const stone_key = index === 0 ? 'stone' : `stone${index}`;
    const wastage_key = index === 0 ? 'wastage' : `wastage${index}`;
    const net_weight_key = index === 0 ? 'net_weight' : `net_weight${index}`;

    const gross_weight = parseFloat(jewelData[gross_weight_key] || '0');
    const stone = parseFloat(jewelData[stone_key] || '0');
    const wastage = parseFloat(jewelData[wastage_key] || '0');
    const net_weight = gross_weight - (stone + wastage);
    setJewelData((prevData) => ({
      ...prevData,
      [net_weight_key]: net_weight.toString()
    }));
  };

  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setJewelData({
      ...jewelData,
      [name]: value
    });
  };

  const calculateTotalNetWeight = () => {
    let total = 0;
    for (let i = 0; i <= 10; i++) {
      const key = i === 0 ? 'net_weight' : `net_weight${i}`;
      total += parseFloat(jewelData[key] || '0');
    }
    return total;
  };

  // Use useEffect to recalculate totalNetWeight whenever jewelData changes
  useEffect(() => {
    setTotalNetWeight(calculateTotalNetWeight());
  }, [jewelData]); // Verify that this logs the correct value

  const dependencies = [jewelData.gross_weight, jewelData.stone, jewelData.wastage];
  for (let i = 1; i <= 10; i++) {
    dependencies.push(jewelData[`gross_weight${i}`], jewelData[`stone${i}`], jewelData[`wastage${i}`]);
  }

  // Use the dependencies array in the useEffect hook
  useEffect(() => {
    updateNetWeight(); // Update the net weight for index 0
    for (let i = 1; i <= 10; i++) {
      updateNetWeight(i); // Update the net weight for other indices
    }
  }, dependencies);

  const handleSubmit1 = (event) => {
    event.preventDefault();

    const formdata = new FormData();

    const baseAttributes = ['jewel_type', 'purity', 'count', 'gross_weight', 'stone', 'wastage', 'net_weight'];

    const loan_id = sessionStorage.getItem('loan_id');
    if (!loan_id) {
      alert('No loan_id found. Please complete the previous step first.');
      return;
    }

    formdata.append('loan_id', loan_id);

    for (let i = 0; i <= 10; i++) {
      baseAttributes.forEach((attribute) => {
        const key = i === 0 ? attribute : `${attribute}${i}`;
        const value = jewelData[key];

        if (value !== undefined && value !== null && value !== '') {
          formdata.append(key, value);
          console.log(`Appending to formdata: ${key} = ${value}`);
        }
      });

      const selectedImageState = i === 0 ? selectedImage : window[`selectedImage${i}`];
      if (selectedImageState) {
        const blob = dataURItoBlob(selectedImageState);
        const photoKey = i === 0 ? 'jewel_photo' : `jewel_photo${i}`;
        formdata.append(photoKey, blob, `${photoKey}.jpg`);
        console.log(`Appending image to formdata: ${photoKey}.jpg`);
      }
    }

    // Log the contents of jewelData for debugging
    console.log('jewelData:', jewelData);
    for (let pair of formdata.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/jeweldetail`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log('Response:', response);
        onNext(); // Move to the next step only after successful response
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleBack = (e) => {
    e.preventDefault();

    // Clear any temporary or local storage of form values if necessary
    // ...

    // Call the onBack function to navigate to the previous page
    onBack();
  };

  const handleDocumentCopyClear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy(false);
    setSelectedImage(null);
  };
  const handleDocumentCopyRetake = () => {
    if (documentCopyRef.current) {
      const newScreenshot = documentCopyRef.current.getScreenshot();
      setSelectedImage(newScreenshot);
    }
  };
  const handleDocumentCopy1Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy1(false);
    setSelectedImage1(null);
  };
  const handleDocumentCopy1Retake = () => {
    if (documentCopy1Ref.current) {
      const newScreenshot = documentCopy1Ref.current.getScreenshot();
      setSelectedImage1(newScreenshot);
    }
  };
  const handleDocumentCopy2Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy2(false);
    setSelectedImage2(null);
  };
  const handleDocumentCopy2Retake = () => {
    if (documentCopy1Ref.current) {
      const newScreenshot = documentCopy2Ref.current.getScreenshot();
      setSelectedImage2(newScreenshot);
    }
  };
  const handleDocumentCopy3Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy3(false);
    setSelectedImage3(null);
  };
  const handleDocumentCopy3Retake = () => {
    if (documentCopy3Ref.current) {
      const newScreenshot = documentCopy3Ref.current.getScreenshot();
      setSelectedImage3(newScreenshot);
    }
  };
  const handleDocumentCopy4Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy4(false);
    setSelectedImage4(null);
  };
  const handleDocumentCopy4Retake = () => {
    if (documentCopy4Ref.current) {
      const newScreenshot = documentCopy4Ref.current.getScreenshot();
      setSelectedImage4(newScreenshot);
    }
  };
  const handleDocumentCopy5Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy5(false);
    setSelectedImage5(null);
  };
  const handleDocumentCopy5Retake = () => {
    if (documentCopy5Ref.current) {
      const newScreenshot = documentCopy5Ref.current.getScreenshot();
      setSelectedImage5(newScreenshot);
    }
  };
  const handleDocumentCopy6Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy6(false);
    setSelectedImage1(null);
  };
  const handleDocumentCopy6Retake = () => {
    if (documentCopy6Ref.current) {
      const newScreenshot = documentCopy6Ref.current.getScreenshot();
      setSelectedImage6(newScreenshot);
    }
  };

  const handleDocumentCopy7Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy7(false);
    setSelectedImage7(null);
  };
  const handleDocumentCopy7Retake = () => {
    if (documentCopy7Ref.current) {
      const newScreenshot = documentCopy7Ref.current.getScreenshot();
      setSelectedImage7(newScreenshot);
    }
  };

  const handleDocumentCopy8Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy8(false);
    setSelectedImage8(null);
  };
  const handleDocumentCopy8Retake = () => {
    if (documentCopy8Ref.current) {
      const newScreenshot = documentCopy8Ref.current.getScreenshot();
      setSelectedImage8(newScreenshot);
    }
  };

  const handleDocumentCopy9Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy9(false);
    setSelectedImage9(null);
  };
  const handleDocumentCopy9Retake = () => {
    if (documentCopy9Ref.current) {
      const newScreenshot = documentCopy9Ref.current.getScreenshot();
      setSelectedImage9(newScreenshot);
    }
  };

  const handleDocumentCopy10Clear = () => {
    // Implement logic to clear the captured image or reset the webcam.
    setShowWebcamDocumentCopy10(false);
    setSelectedImage10(null);
  };
  const handleDocumentCopy10Retake = () => {
    if (documentCopy10Ref.current) {
      const newScreenshot = documentCopy10Ref.current.getScreenshot();
      setSelectedImage10(newScreenshot);
    }
  };


  // Define a state variable to hold the selected jewel type
  useEffect(() => {
    // Fetch jewel types from your API endpoint
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/jeweltypes`)
      .then((response) => {
        if (response.status === 200) {
          console.log('API Response:', response.data);
          const fetchedJewelTypes = response.data.masterjeweltype; // Assuming it's an array
          console.log('Fetched jewel types:', fetchedJewelTypes);
          setJewelTypes(fetchedJewelTypes || []);
        } else {
          console.error('Error fetching jewel types. Status:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error fetching jewel types:', error);
      });
  }, []);

  const [jewelTypes, setJewelTypes] = useState([]);
  // Define a function to handle dropdown value changes
  const handleJewelTypeChange = (event) => {
    const { name, value } = event.target;
    // Update the form values
    setJewelData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const jeweltypesall = jewelTypes?.map((jewelType) => (
    <MenuItem key={jewelType.jeweltype_id} value={jewelType.jeweltype_name}>
      {jewelType.jeweltype_name}
    </MenuItem >
  ));

  return (
    <div>
      <form className="container" onSubmit={handleSubmit1}>
        <TableContainer component={Paper}>
          <Form.Label className="mb">
            <br />
            <h3>
              <b>Jewel Details</b>
            </h3>
          </Form.Label>
          <hr className="hori-col-3" />
          <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Jewel Type</b>
                </TableCell>

                <TableCell>
                  <b>Purity</b>
                </TableCell>

                <TableCell>
                  <b>Count</b>
                </TableCell>

                <TableCell>
                  <b>gross Weight</b>
                </TableCell>

                <TableCell>
                  <b>Stone Weight</b>
                </TableCell>
                <TableCell>
                  <b>Wastage</b>
                </TableCell>
                <TableCell>
                  <b>Net Weight</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-10">
                      <Form.Group controlId="formGridNominee" className="col col-sm-3">
                        <InputLabel id="demo-simple-select-label"></InputLabel>

                        <Select
                          name="jewel_type"
                          id="demo-simple-select"
                          value={jewelData.jewel_type}
                          onChange={handleJewelTypeChange}
                          style={{ minWidth: '120px', height: '38px' }}
                        >{jeweltypesall}

                        </Select>
                      </Form.Group>
                    </FormControl>
                  </Box>
                </TableCell>

                <TableCell>
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-10">
                      <Form.Group controlId="formGridNominee" className="col col-sm-3">
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                          type="text"
                          name="purity"
                          value={jewelData.purity}
                          onChange={handleChange1}
                          style={{ minWidth: '120px', height: '38px' }}
                        >
                          <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                          <MenuItem value="24 CT">24 CT</MenuItem>
                          <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                        </Select>
                      </Form.Group>
                    </FormControl>
                  </Box>
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="count" value={jewelData.count} onChange={handleChange1} placeholder="count." />
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="gross_weight"
                    value={jewelData.gross_weight}
                    onChange={handleChange1}
                    placeholder="gross weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="stone" value={jewelData.stone} onChange={handleChange1} placeholder="stone weight" />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="wastage" value={jewelData.wastage} onChange={handleChange1} placeholder="Wastage" />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="net_weight" value={jewelData.net_weight || '0'} readOnly placeholder="Net_Weight" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div style={{ position: 'relative' }}>
                    {showWebcamDocumentCopy ? (
                      <>
                        <Webcam
                          audio={false}
                          ref={documentCopyRef}
                          screenshotFormat="image/jpeg"
                          style={{ width: '70%', height: '100%' }}
                        />

                        {selectedImage && (
                          <div style={{ position: 'absolute', top: 0, left: 0 }}>
                            <img
                              src={selectedImage}
                              alt="Captured"
                              style={{
                                width: '100%', // Adjust the width as needed
                                height: 'auto' // Let the height adjust proportionally
                              }}
                            />
                          </div>
                        )}
                        <div>
                          <Button variant="contained" color="primary" onClick={handleDocumentCopyRetake}>
                            Retake
                          </Button>
                          <Button variant="contained" color="secondary" onClick={handleDocumentCopyClear}>
                            Clear
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        {selectedImage ? (
                          <>
                            <img src={selectedImage} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                            <div>
                              <br></br>
                              <br></br>
                              <Button variant="contained" color="secondary" onClick={handleDocumentCopyClear}>
                                Clear
                              </Button>
                            </div>
                          </>
                        ) : (
                          <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy}>
                            Capture
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button onClick={toggleContent} type="button">
            Add Jewel
          </Button>
          {showContent && (
            <div>
              <TableContainer>
                <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>

                              <Select
                                name="jewel_type1"
                                id="demo-simple-select"
                                value={jewelData.jewel_type1}
                                onChange={handleJewelTypeChange}
                                style={{ minWidth: '120px', height: '38px' }}
                              >{jeweltypesall}

                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Select
                                name="purity1"
                                value={jewelData.purity1}
                                onChange={handleChange1}
                                style={{ minWidth: '120px', height: '38px' }}
                              >
                                <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                <MenuItem value="24 CT">24 CT</MenuItem>
                                <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <MDBInput type="text" name="count1" value={jewelData.count1} onChange={handleChange1} placeholder="count." />
                      </TableCell>

                      <TableCell>
                        <MDBInput
                          type="text"
                          name="gross_weight1"
                          value={jewelData.gross_weight1}
                          onChange={handleChange1}
                          placeholder="gross weight"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput type="text" name="stone1" value={jewelData.stone1} onChange={handleChange1} placeholder="stone weight" />
                      </TableCell>
                      <TableCell>
                        <MDBInput type="text" name="wastage1" value={jewelData.wastage1} onChange={handleChange1} placeholder="Wastage" />
                      </TableCell>
                      <TableCell>
                        <MDBInput
                          type="text"
                          name="net_weight1"
                          value={jewelData.net_weight1}
                          onChange={(e) => setJewelData({ ...jewelData, net_weight1: e.target.value })}
                          placeholder="Net_Weight"
                          readonly
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div style={{ position: 'relative' }}>
                          {showWebcamDocumentCopy1 ? (
                            <>
                              <Webcam
                                audio={false}
                                ref={documentCopy1Ref}
                                screenshotFormat="image/jpeg"
                                style={{ width: '70%', height: '100%' }}
                              />

                              {selectedImage1 && (
                                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                  <img
                                    src={selectedImage1}
                                    alt="Captured"
                                    style={{
                                      width: '100%', // Adjust the width as needed
                                      height: 'auto' // Let the height adjust proportionally
                                    }}
                                  />
                                </div>
                              )}
                              <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleDocumentCopy1Retake}>
                                  Retake
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleDocumentCopy1Clear}>
                                  Clear
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              {selectedImage1 ? (
                                <>
                                  <img src={selectedImage1} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                  <div>
                                    <br></br>
                                    <br></br>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy1Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy1}>
                                  Capture
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Button onClick={toggleContent1} type="button">
                Add Jewel
              </Button>
              {showContent1 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type2"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type2}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity2"
                                    value={jewelData.purity2}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count2" value={jewelData.count2} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight2"
                              value={jewelData.gross_weight2}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight2: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone2"
                              value={jewelData.stone2}
                              onChange={(e) => setJewelData({ ...jewelData, stone2: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              name="wastage2"
                              value={jewelData.wastage2}
                              onChange={(e) => setJewelData({ ...jewelData, wastage2: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight2" value={jewelData.net_weight2} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy2 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy2Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage2 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage2}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy2Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy2Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage2 ? (
                                    <>
                                      <img src={selectedImage2} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy2Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy2}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              <Button onClick={toggleContent2} type="button">
                Add Jewel
              </Button>
              {showContent2 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type3"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type3}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity3"
                                    value={jewelData.purity3}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count3" value={jewelData.count3} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight3"
                              value={jewelData.gross_weight3}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight3: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone3"
                              value={jewelData.stone3}
                              onChange={(e) => setJewelData({ ...jewelData, stone3: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="wastage3"
                              value={jewelData.wastage3}
                              onChange={(e) => setJewelData({ ...jewelData, wastage3: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight3" value={jewelData.net_weight3} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy3 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy3Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage3 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage3}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy3Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy3Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage3 ? (
                                    <>
                                      <img src={selectedImage3} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy3Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy3}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              <Button onClick={toggleContent3} type="button">
                Add Jewel
              </Button>
              {showContent3 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type4"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type4}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity4"
                                    value={jewelData.purity4}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count4" value={jewelData.count4} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight4"
                              value={jewelData.gross_weight4}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight4: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone4"
                              value={jewelData.stone4}
                              onChange={(e) => setJewelData({ ...jewelData, stone4: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="wastage4"
                              value={jewelData.wastage4}
                              onChange={(e) => setJewelData({ ...jewelData, wastage4: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight4" value={jewelData.net_weight4} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy4 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy4Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage4 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage4}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy4Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy4Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage4 ? (
                                    <>
                                      <img src={selectedImage4} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy4Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy4}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              <Button onClick={toggleContent4} type="button">
                Add Jewel
              </Button>
              {showContent4 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type5"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type5}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity5"
                                    value={jewelData.purity5}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count5" value={jewelData.count5} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight5"
                              value={jewelData.gross_weight5}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight5: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone5"
                              value={jewelData.stone5}
                              onChange={(e) => setJewelData({ ...jewelData, stone5: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="wastage5"
                              value={jewelData.wastage5}
                              onChange={(e) => setJewelData({ ...jewelData, wastage5: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight5" value={jewelData.net_weight5} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy5 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy5Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage5 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage5}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy5Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy5Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage5 ? (
                                    <>
                                      <img src={selectedImage5} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy5Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy5}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
              <Button onClick={toggleContent5} type="button">
                Add Jewel
              </Button>
              {showContent5 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type6"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type6}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity6"
                                    value={jewelData.purity6}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count6" value={jewelData.count6} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight6"
                              value={jewelData.gross_weight6}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight6: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone6"
                              value={jewelData.stone6}
                              onChange={(e) => setJewelData({ ...jewelData, stone6: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="wastage6"
                              value={jewelData.wastage6}
                              onChange={(e) => setJewelData({ ...jewelData, wastage6: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight6" value={jewelData.net_weight6} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy6 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy6Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage6 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage6}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy6Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy6Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage6 ? (
                                    <>
                                      <img src={selectedImage6} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy6Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy6}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button onClick={toggleContent6} type="button">
                    Add Jewel
                  </Button>
                  {showContent6 && (
                    <div>
                      <TableContainer>
                        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <Box sx={{ mr: 2 }}>
                                  <FormControl className="col col-sm-10">
                                    <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                      <InputLabel id="demo-simple-select-label"></InputLabel>

                                      <Select
                                        name="jewel_type7"
                                        id="demo-simple-select"
                                        value={jewelData.jewel_type7}
                                        onChange={handleJewelTypeChange}
                                        style={{ minWidth: '120px', height: '38px' }}
                                      >{jeweltypesall}

                                      </Select>
                                    </Form.Group>
                                  </FormControl>
                                </Box>
                              </TableCell>

                              <TableCell>
                                <Box sx={{ mr: 2 }}>
                                  <FormControl className="col col-sm-10">
                                    <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                      <InputLabel id="demo-simple-select-label"></InputLabel>
                                      <Select
                                        name="purity7"
                                        value={jewelData.purity7}
                                        onChange={handleChange1}
                                        style={{ minWidth: '120px', height: '38px' }}
                                      >
                                        <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                        <MenuItem value="24 CT">24 CT</MenuItem>
                                        <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                      </Select>
                                    </Form.Group>
                                  </FormControl>
                                </Box>
                              </TableCell>

                              <TableCell>
                                <MDBInput type="text" name="count7" value={jewelData.count7} onChange={handleChange1} placeholder="count" />
                              </TableCell>

                              <TableCell>
                                <MDBInput
                                  type="text"
                                  name="gross_weight7"
                                  value={jewelData.gross_weight7}
                                  onChange={(e) => setJewelData({ ...jewelData, gross_weight7: e.target.value })}
                                  placeholder="gross weight"
                                />
                              </TableCell>
                              <TableCell>
                                <MDBInput
                                  type="text"
                                  name="stone7"
                                  value={jewelData.stone7}
                                  onChange={(e) => setJewelData({ ...jewelData, stone7: e.target.value })}
                                  placeholder="stone weight"
                                />
                              </TableCell>
                              <TableCell>
                                <MDBInput
                                  type="text"
                                  name="wastage7"
                                  value={jewelData.wastage7}
                                  onChange={(e) => setJewelData({ ...jewelData, wastage7: e.target.value })}
                                  placeholder="Wastage"
                                />
                              </TableCell>
                              <TableCell>
                                <MDBInput type="text" name="net_weight7" value={jewelData.net_weight7} readOnly placeholder="Net Weight" />
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell colSpan={7}>
                                <div style={{ position: 'relative' }}>
                                  {showWebcamDocumentCopy7 ? (
                                    <>
                                      <Webcam
                                        audio={false}
                                        ref={documentCopy7Ref}
                                        screenshotFormat="image/jpeg"
                                        style={{ width: '70%', height: '100%' }}
                                      />

                                      {selectedImage7 && (
                                        <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                          <img
                                            src={selectedImage7}
                                            alt="Captured"
                                            style={{
                                              width: '100%', // Adjust the width as needed
                                              height: 'auto' // Let the height adjust proportionally
                                            }}
                                          />
                                        </div>
                                      )}
                                      <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                        <Button variant="contained" color="primary" onClick={handleDocumentCopy7Retake}>
                                          Retake
                                        </Button>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy7Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {selectedImage7 ? (
                                        <>
                                          <img src={selectedImage7} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                          <div>
                                            <br></br>
                                            <br></br>
                                            <Button variant="contained" color="secondary" onClick={handleDocumentCopy7Clear}>
                                              Clear
                                            </Button>
                                          </div>
                                        </>
                                      ) : (
                                        <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy7}>
                                          Capture
                                        </Button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  )}
                </div>
              )}
              <Button onClick={toggleContent7} type="button">
                Add Jewel
              </Button>
              {showContent7 && (
                <div>
                  <TableContainer>
                    <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>

                                  <Select
                                    name="jewel_type8"
                                    id="demo-simple-select"
                                    value={jewelData.jewel_type8}
                                    onChange={handleJewelTypeChange}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >{jeweltypesall}

                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={{ mr: 2 }}>
                              <FormControl className="col col-sm-10">
                                <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                  <InputLabel id="demo-simple-select-label"></InputLabel>
                                  <Select
                                    name="purity8"
                                    value={jewelData.purity8}
                                    onChange={handleChange1}
                                    style={{ minWidth: '120px', height: '38px' }}
                                  >
                                    <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                    <MenuItem value="24 CT">24 CT</MenuItem>
                                    <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                                  </Select>
                                </Form.Group>
                              </FormControl>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <MDBInput type="text" name="count8" value={jewelData.count8} onChange={handleChange1} placeholder="count" />
                          </TableCell>

                          <TableCell>
                            <MDBInput
                              type="text"
                              name="gross_weight8"
                              value={jewelData.gross_weight8}
                              onChange={(e) => setJewelData({ ...jewelData, gross_weight8: e.target.value })}
                              placeholder="gross weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="stone8"
                              value={jewelData.stone8}
                              onChange={(e) => setJewelData({ ...jewelData, stone8: e.target.value })}
                              placeholder="stone weight"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput
                              type="text"
                              name="wastage8"
                              value={jewelData.wastage8}
                              onChange={(e) => setJewelData({ ...jewelData, wastage8: e.target.value })}
                              placeholder="Wastage"
                            />
                          </TableCell>
                          <TableCell>
                            <MDBInput type="text" name="net_weight8" value={jewelData.net_weight8} readOnly placeholder="Net Weight" />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={7}>
                            <div style={{ position: 'relative' }}>
                              {showWebcamDocumentCopy8 ? (
                                <>
                                  <Webcam
                                    audio={false}
                                    ref={documentCopy8Ref}
                                    screenshotFormat="image/jpeg"
                                    style={{ width: '70%', height: '100%' }}
                                  />

                                  {selectedImage8 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                      <img
                                        src={selectedImage8}
                                        alt="Captured"
                                        style={{
                                          width: '100%', // Adjust the width as needed
                                          height: 'auto' // Let the height adjust proportionally
                                        }}
                                      />
                                    </div>
                                  )}
                                  <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                    <Button variant="contained" color="primary" onClick={handleDocumentCopy8Retake}>
                                      Retake
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy8Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {selectedImage8 ? (
                                    <>
                                      <img src={selectedImage8} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                      <div>
                                        <br></br>
                                        <br></br>
                                        <Button variant="contained" color="secondary" onClick={handleDocumentCopy8Clear}>
                                          Clear
                                        </Button>
                                      </div>
                                    </>
                                  ) : (
                                    <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy8}>
                                      Capture
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </div>
          )}
          <Button onClick={toggleContent8} type="button">
            Add Jewel
          </Button>
          {showContent8 && (
            <div>
              <TableContainer>
                <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>

                              <Select
                                name="jewel_type9"
                                id="demo-simple-select"
                                value={jewelData.jewel_type9}
                                onChange={handleJewelTypeChange}
                                style={{ minWidth: '120px', height: '38px' }}
                              >{jeweltypesall}

                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Select
                                name="purity9"
                                value={jewelData.purity9}
                                onChange={handleChange1}
                                style={{ minWidth: '120px', height: '38px' }}
                              >
                                <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                <MenuItem value="24 CT">24 CT</MenuItem>
                                <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <MDBInput type="text" name="count9" value={jewelData.count9} onChange={handleChange1} placeholder="count" />
                      </TableCell>

                      <TableCell>
                        <MDBInput
                          type="text"
                          name="gross_weight9"
                          value={jewelData.gross_weight9}
                          onChange={(e) => setJewelData({ ...jewelData, gross_weight9: e.target.value })}
                          placeholder="gross weight"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput
                          type="text"
                          name="stone9"
                          value={jewelData.stone9}
                          onChange={(e) => setJewelData({ ...jewelData, stone9: e.target.value })}
                          placeholder="stone weight"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput
                          type="text"
                          name="wastage9"
                          value={jewelData.wastage9}
                          onChange={(e) => setJewelData({ ...jewelData, wastage9: e.target.value })}
                          placeholder="Wastage"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput type="text" name="net_weight9" value={jewelData.net_weight9} readOnly placeholder="Net Weight" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div style={{ position: 'relative' }}>
                          {showWebcamDocumentCopy9 ? (
                            <>
                              <Webcam
                                audio={false}
                                ref={documentCopy9Ref}
                                screenshotFormat="image/jpeg"
                                style={{ width: '70%', height: '100%' }}
                              />

                              {selectedImage9 && (
                                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                  <img
                                    src={selectedImage9}
                                    alt="Captured"
                                    style={{
                                      width: '100%', // Adjust the width as needed
                                      height: 'auto' // Let the height adjust proportionally
                                    }}
                                  />
                                </div>
                              )}
                              <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleDocumentCopy9Retake}>
                                  Retake
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleDocumentCopy9Clear}>
                                  Clear
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              {selectedImage9 ? (
                                <>
                                  <img src={selectedImage9} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                  <div>
                                    <br></br>
                                    <br></br>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy9Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy9}>
                                  Capture
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          <Button onClick={toggleContent9} type="button">
            Add Jewel
          </Button>
          {showContent9 && (
            <div>
              <TableContainer>
                <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>

                              <Select
                                name="jewel_type10"
                                id="demo-simple-select"
                                value={jewelData.jewel_type10}
                                onChange={handleJewelTypeChange}
                                style={{ minWidth: '120px', height: '38px' }}
                              >{jeweltypesall}

                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box sx={{ mr: 2 }}>
                          <FormControl className="col col-sm-10">
                            <Form.Group controlId="formGridNominee" className="col col-sm-3">
                              <InputLabel id="demo-simple-select-label"></InputLabel>
                              <Select
                                name="purity10"
                                value={jewelData.purity10}
                                onChange={handleChange1}
                                style={{ minWidth: '120px', height: '38px' }}
                              >
                                <MenuItem value="22 CT(916 KDM)">22 CT(916 KDM)</MenuItem>
                                <MenuItem value="24 CT">24 CT</MenuItem>
                                <MenuItem value="916 Hallmark">916 Hallmark</MenuItem>
                              </Select>
                            </Form.Group>
                          </FormControl>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <MDBInput type="text" name="count10" value={jewelData.count10} onChange={handleChange1} placeholder="count" />
                      </TableCell>

                      <TableCell>
                        <MDBInput
                          type="text"
                          name="gross_weight10"
                          value={jewelData.gross_weight10}
                          onChange={(e) => setJewelData({ ...jewelData, gross_weight10: e.target.value })}
                          placeholder="gross weight"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput
                          type="text"
                          name="stone10"
                          value={jewelData.stone10}
                          onChange={(e) => setJewelData({ ...jewelData, stone10: e.target.value })}
                          placeholder="stone weight"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput
                          type="text"
                          name="wastage10"
                          value={jewelData.wastage10}
                          onChange={(e) => setJewelData({ ...jewelData, wastage10: e.target.value })}
                          placeholder="Wastage"
                        />
                      </TableCell>
                      <TableCell>
                        <MDBInput type="text" name="net_weight10" value={jewelData.net_weight10} readOnly placeholder="Net Weight" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div style={{ position: 'relative' }}>
                          {showWebcamDocumentCopy10 ? (
                            <>
                              <Webcam
                                audio={false}
                                ref={documentCopy10Ref}
                                screenshotFormat="image/jpeg"
                                style={{ width: '70%', height: '100%' }}
                              />

                              {selectedImage10 && (
                                <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                  <img
                                    src={selectedImage10}
                                    alt="Captured"
                                    style={{
                                      width: '100%', // Adjust the width as needed
                                      height: 'auto' // Let the height adjust proportionally
                                    }}
                                  />
                                </div>
                              )}
                              <div style={{ position: 'absolute', bottom: 10, left: 10, zIndex: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleDocumentCopy10Retake}>
                                  Retake
                                </Button>
                                <Button variant="contained" color="secondary" onClick={handleDocumentCopy10Clear}>
                                  Clear
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              {selectedImage10 ? (
                                <>
                                  <img src={selectedImage10} alt="Document Copy 1" style={{ width: '50%', height: '50%' }} />
                                  <div>
                                    <br></br>
                                    <br></br>
                                    <Button variant="contained" color="secondary" onClick={handleDocumentCopy10Clear}>
                                      Clear
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <Button variant="contained" color="primary" onClick={openWebcamForDocumentCopy10}>
                                  Capture
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
        <Button onClick={handleBack}>Back</Button>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
};

// const StepThreeForm = ({ onBack, totalNetWeight, finalAmount }) => {
//   const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '1px solid #000',
//     boxShadow: 24,
//     p: 4
//   };

//   const tableContainerStyle = {
//     maxWidth: '600px',
//     maxHeight: '200px',
//     overflow: 'auto'
//   };

//   const tableStyle = {
//     width: '100%'
//   };

//   const [approvalData, setApprovalData] = useState({
//     total_amount: totalNetWeight || '',
//     status: '',
//     final_amount: finalAmount || '',
//     lname1: '500',
//     lcount500: '0',
//     ltotal1: '0',
//     lname2: '200',
//     lcount200: '0',
//     ltotal2: '0',
//     lname3: '100',
//     lcount100: '0',
//     ltotal3: '0',
//     lname4: '50',
//     lcount50: '0',
//     ltotal4: '0',
//     lname5: '20',
//     lcount20: '0',
//     ltotal5: '0',
//     lname6: '10',
//     lcount10: '0',
//     ltotal6: '0',
//     lname7: '5',
//     lcount5: '0',
//     ltotal7: '0',
//     lname8: '2',
//     lcount2: '0',
//     ltotal8: '0',
//     lname9: '1',
//     lcount1: '0',
//     ltotal9: '0'
//   });
//   const [wholeTotal, setWholeTotal] = useState('');
//   const [lastAmount, setLastAmount] = useState(0);
//   const [cashDenominationEnabled, setCashDenominationEnabled] = useState(false);
//   const [finalsAmount, setFinalsAmount] = useState(0);
//   const [change, setChange] = useState(0);

//   useEffect(() => {
//     setApprovalData((prevData) => ({
//       ...prevData,
//       total_amount: totalNetWeight || ''
//     }));
//   }, [totalNetWeight]);

//   const successToastStyle = {
//     backgroundColor: '#5cb85c',
//     color: 'white'
//   };

//   const errorToastStyle = {
//     backgroundColor: '#d9534f',
//     color: 'white'
//   };

//   const handleSubmit2 = (event) => {
//     event.preventDefault();
//     if (!approvalData.total_amount || !approvalData.status || !approvalData.final_amount) {
//       alert('Please fill all fields before submitting.');
//       return;
//     }

//     const loan_id = sessionStorage.getItem('loan_id');

//     const data = {
//       total_amount: approvalData.total_amount,
//       status: approvalData.status,
//       final_amount: approvalData.final_amount,
//       loan_id: loan_id,
//       lcount500: approvalData.lcount500,
//       lcount200: approvalData.lcount200,
//       lcount100: approvalData.lcount100,
//       lcount50: approvalData.lcount50,
//       lcount20: approvalData.lcount20,
//       lcount10: approvalData.lcount10,
//       lcount5: approvalData.lcount5,
//       lcount2: approvalData.lcount2,
//       lcount1: approvalData.lcount1
//     };
//     axios

//       .post('${process.env.REACT_APP_BASE_URL}/api/totalloanvalue', data)

//       .then((response) => {
//         toast.success('Form submitted successfully!', {
//           position: toast.POSITION.BOTTOM_RIGHT,

//           style: successToastStyle
//         });

//         navigate('/utils/util-loanlist'); // Redirect user to /utils/util-list
//       })

//       .catch((error) => {
//         console.error(error);

//         toast.error('Form submission failed!', {
//           position: toast.POSITION.BOTTOM_RIGHT,

//           style: errorToastStyle
//         });
//       });
//   };

//   // If both conditions are met, the form submission logic is executed.
//   // Your form submission logic here

//   useEffect(() => {
//     const newChange = wholeTotal - parseFloat(approvalData.final_amount);
//     setChange(newChange);
//   }, [wholeTotal, approvalData.final_amount]);
//   useEffect(() => {
//     // Calculate lastAmount

//     const calculatedLastAmount = wholeTotal - change;

//     setLastAmount(calculatedLastAmount);
//   }, [wholeTotal, change]);

//   // Function to check if the button should be enabled

//   const excessValue = wholeTotal - parseFloat(approvalData.final_amount);
//   const handleCountChange = (event) => {
//     const { name, value } = event.target;
//     const index = parseInt(name.replace('lcount', ''), 10);

//     setApprovalData((prevData) => ({
//       ...prevData,
//       [`lcount${index}`]: value,
//       [`ltotal${index}`]: (parseFloat(value) * prevData[`lname${index}`]).toFixed(2)
//     }));
//   };

//   useEffect(() => {
//     const calculateTotals = () => {
//       const ltotal1 = parseFloat(approvalData.lcount500) * approvalData.lname1;
//       const ltotal2 = parseFloat(approvalData.lcount200) * approvalData.lname2;
//       const ltotal3 = parseFloat(approvalData.lcount100) * approvalData.lname3;
//       const ltotal4 = parseFloat(approvalData.lcount50) * approvalData.lname4;
//       const ltotal5 = parseFloat(approvalData.lcount20) * approvalData.lname5;
//       const ltotal6 = parseFloat(approvalData.lcount10) * approvalData.lname6;
//       const ltotal7 = parseFloat(approvalData.lcount5) * approvalData.lname7;
//       const ltotal8 = parseFloat(approvalData.lcount2) * approvalData.lname8;
//       const ltotal9 = parseFloat(approvalData.lcount1) * approvalData.lname9;

//       setApprovalData((prevData) => ({
//         ...prevData,
//         ltotal1: ltotal1.toFixed(2),
//         ltotal2: ltotal2.toFixed(2),
//         ltotal3: ltotal3.toFixed(2),
//         ltotal4: ltotal4.toFixed(2),
//         ltotal5: ltotal5.toFixed(2),
//         ltotal6: ltotal6.toFixed(2),
//         ltotal7: ltotal7.toFixed(2),
//         ltotal8: ltotal8.toFixed(2),
//         ltotal9: ltotal9.toFixed(2)
//       }));

//       const sum = ltotal1 + ltotal2 + ltotal3 + ltotal4 + ltotal5 + ltotal6 + ltotal7 + ltotal8 + ltotal9;

//       setWholeTotal(sum.toFixed(2));
//     };

//     calculateTotals();
//   }, [
//     approvalData.lname1,
//     approvalData.lcount500,
//     approvalData.lname2,
//     approvalData.lcount200,
//     approvalData.lname3,
//     approvalData.lcount100,
//     approvalData.lname4,
//     approvalData.lcount50,
//     approvalData.lname5,
//     approvalData.lcount20,
//     approvalData.lname6,
//     approvalData.lcount10,
//     approvalData.lname7,
//     approvalData.lcount5,
//     approvalData.lname8,
//     approvalData.lcount2,
//     approvalData.lname9,
//     approvalData.lcount1
//   ]);

//   const navigate = useNavigate();
//   const handleChange2 = (event) => {
//     setApprovalData({
//       ...approvalData,
//       [event.target.name]: event.target.value
//     });

//     if (event.target.name === 'status') {
//       setCashDenominationEnabled(event.target.value === 'Approved');
//     }
//   };

//   return (
//     <div>
//       {/* Step 3 form fields */}
//       <form className="container" onSubmit={handleSubmit2}>
//         <Grid container spacing={3}>
//           <Grid item xs={12}>
//             <Form.Label className="mb">
//               <br />
//               <h3>
//                 <b>Total Value</b>
//               </h3>
//             </Form.Label>
//             <hr className="hori-col-3" />

//             <MDBCardBody>
//               <br />
//               <Row className="mb-2">
//                 <Form.Group controlId="formTotalNetWeight" className="col col-sm-6">
//                   <Form.Label>Total Net Weight</Form.Label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Total Net Weight"
//                     aria-label="Total Net Weight"
//                     name="total_amount"
//                     value={approvalData.total_amount} // Use the updated value here
//                     onChange={handleChange2}
//                     required
//                     readOnly
//                   />
//                 </Form.Group>
//               </Row>

//               <Row className="mb-2">
//                 <Form.Group controlId="formFinalAmount" className="col col-sm-6">
//                   <Form.Label>Final Amount</Form.Label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Final Amount"
//                     aria-label="Final Amount"
//                     name="final_amount"
//                     value={approvalData.final_amount}
//                     onChange={handleChange2}
//                     required
//                     readOnly
//                   />
//                 </Form.Group>
//               </Row>

//               <Row className="mb-2">
//                 <Form.Group controlId="formStatus" className="col col-sm-4">
//                   <Form.Label>Status</Form.Label>
//                   <Form.Select className="form-select" name="status" value={approvalData.status} onChange={handleChange2} required>
//                     <option value="" disabled>
//                       Choose...
//                     </option>
//                     <option value="Approved">Approved</option>
//                     <option value="Rejected">Rejected</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Row>

//               <TableContainer component={Paper} style={tableContainerStyle}>
//                 <Table style={tableStyle}>
//                   <TableBody>
//                     <TableRow>
//                       <b>Cash Denomination</b>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname1"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname1}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount500"
//                           value={approvalData.lcount500}
//                           onChange={handleCountChange}
//                           style={{ width: '60px' }}
//                           disabled={!cashDenominationEnabled}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal1" readOnly value={approvalData.ltotal1} disabled={!cashDenominationEnabled} />
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname2"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname2}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount200"
//                           value={approvalData.lcount200}
//                           onChange={handleCountChange}
//                           disabled={!cashDenominationEnabled}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal2" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal2} />
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="name3"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname3}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount100"
//                           disabled={!cashDenominationEnabled}
//                           value={approvalData.lcount100}
//                           onChange={handleCountChange}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal3" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal3} />
//                       </TableCell>
//                     </TableRow>
//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname4"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname4}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount50"
//                           value={approvalData.lcount50}
//                           disabled={!cashDenominationEnabled}
//                           onChange={handleCountChange}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal4" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal4} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname5"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname5}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount20"
//                           disabled={!cashDenominationEnabled}
//                           value={approvalData.lcount20}
//                           onChange={handleCountChange}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" disabled={!cashDenominationEnabled} name="ltotal5" readOnly value={approvalData.ltotal5} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname6"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname6}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount10"
//                           value={approvalData.lcount10}
//                           style={{ width: '60px' }}
//                           disabled={!cashDenominationEnabled}
//                           onChange={handleCountChange}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal6" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal6} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname7"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname7}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount5"
//                           value={approvalData.lcount5}
//                           disabled={!cashDenominationEnabled}
//                           onChange={handleCountChange}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal7" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal7} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname8"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           value={approvalData.lname8}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount2"
//                           value={approvalData.lcount2}
//                           onChange={handleCountChange}
//                           disabled={!cashDenominationEnabled}
//                           style={{ width: '60px' }}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal8" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal8} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lname9"
//                           disabled={!cashDenominationEnabled}
//                           readOnly
//                           style={{ width: '60px' }}
//                           value={approvalData.lname9}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input
//                           type="text"
//                           name="lcount1"
//                           value={approvalData.lcount1}
//                           style={{ width: '60px' }}
//                           onChange={handleCountChange}
//                           disabled={!cashDenominationEnabled}
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <input type="text" name="ltotal9" disabled={!cashDenominationEnabled} readOnly value={approvalData.ltotal9} />
//                       </TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>Whole Total:</TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>{wholeTotal}</TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>Excess:</TableCell>
//                       <TableCell></TableCell>
//                       <TableCell>{excessValue}</TableCell>
//                     </TableRow>

//                     <TableRow>
//                       <TableCell>
//                         <p>
//                           <span style={{ color: 'green', fontSize: '13px' }}>Last Amount: {lastAmount} rupees</span>
//                         </p>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </MDBCardBody>
//           </Grid>
//         </Grid>

//         <Button onClick={onBack}>Back</Button>
//         <Button type="submit" disabled={excessValue < 0} className="btn btn-primary">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

const LoanApproval = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [totalNetWeight, setTotalNetWeight] = useState(null);
  const [finalAmount, setFinalAmount] = useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Card>
        <Container maxWidth="lg">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === steps.length ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <Typography variant="h5">Loan process completed, waiting for approval</Typography>
              </div>
            ) : (
              <div>
                {activeStep === 0 && <StepOneForm onNext={handleNext} setFinalAmount={setFinalAmount} />}
                {activeStep === 1 && (
                  <StepTwoForm
                    onNext={handleNext}
                    onBack={handleBack}
                    totalNetWeight={totalNetWeight}
                    setTotalNetWeight={setTotalNetWeight}
                  />
                )}
                {/* {activeStep === 2 && <StepThreeForm onBack={handleBack} totalNetWeight={totalNetWeight} finalAmount={finalAmount} />} */}
              </div>
            )}
          </div>
        </Container>
      </Card>
    </div>
  );
};

export default LoanApproval;