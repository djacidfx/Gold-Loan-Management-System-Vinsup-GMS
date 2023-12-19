import React, { useEffect } from 'react';

import { readAndCompressImage } from 'react-image-file-resizer';

import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';

import { Button, Form, FormGroup, InputGroup, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import FormControl from '@mui/material/FormControl';

import Box from '@mui/material/Box';

import { useState } from 'react';

import axios from 'axios';

import { Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { MDBCardBody, MDBCardTitle, MDBInput } from 'mdb-react-ui-kit';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import IconButton from '@mui/material/IconButton';

import Webcam from 'react-webcam';

import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const customerImageRef = React.useRef(null);

  const documentCopy1Ref = React.useRef(null);

  const documentCopy2Ref = React.useRef(null);

  const [selectedCustomerImage, setSelectedCustomerImage] = useState(null);

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);

  const [showWebcamCustomerImage, setShowWebcamCustomerImage] = useState(false);

  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);

  const [showWebcamDocumentCopy2, setShowWebcamDocumentCopy2] = useState(false);

  const [showChosenImage, setShowChosenImage] = useState(false);
  const [showChosenImage1, setShowChosenImage1] = useState(false);
  const [showChosenImage2, setShowChosenImage2] = useState(false);
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState({
    customer_name: '',

    date_of_birth: '',

    gender: '',

    phonenumber: '',

    phonenumber_type: '',

    mobile_number: '',

    number: '',

    address_line_one: '',

    address_line_two: '',

    city: '',

    state: '',

    country: '',

    registration_date: new Date().toISOString().split('T')[0],

    care_of_type: '',

    care_of_name: '',

    document1: '',

    document_type1: '',

    document_copy1: '',

    expire_date1: '',

    document_number1: '',

    document2: '',

    document_type2: '',

    document_copy2: '',

    expire_date2: '',

    document_number2: '',

    verified_by: ''
  });

  const handleCustomerImageChange = async () => {
    if (customerImageRef.current) {
      const imageSrc = customerImageRef.current.getScreenshot();

      const resizedImage = await resizeImage(imageSrc);

      setSelectedCustomerImage(resizedImage);

      setShowWebcamCustomerImage(false);
    }
  };
  const handleDocumentCopy1Change = async () => {
    if (documentCopy1Ref.current) {
      const imageSrc = documentCopy1Ref.current.getScreenshot();

      const resizedImage = await resizeImage(imageSrc);

      setSelectedImage1(resizedImage);

      setShowWebcamDocumentCopy1(false);
    }
  };
  const handleDocumentCopy2Change = async () => {
    if (documentCopy2Ref.current) {
      const imageSrc = documentCopy2Ref.current.getScreenshot();

      const resizedImage = await resizeImage(imageSrc);

      setSelectedImage2(resizedImage);

      setShowWebcamDocumentCopy2(false);
    }
  };

  const openWebcamForCustomerImage = () => {
    setShowWebcamCustomerImage(true);
    setSelectedCustomerImage(null);
    setShowChosenImage(false);
  };
  const openWebcamForDocumentCopy1 = () => {
    setShowWebcamDocumentCopy1(true);
    setSelectedImage1(null);
    setShowChosenImage1(false);
  };

  const openWebcamForDocumentCopy2 = () => {
    setShowWebcamDocumentCopy2(true);
    setSelectedImage2(null);
    setShowChosenImage2(false);
  };

  const handleChange = (event) => {
    setCustomerData({
      ...customerData,

      [event.target.name]: event.target.value
    });
  };

  const clearSelectedImage = () => {
    setSelectedCustomerImage(null);

    setShowChosenImage(false);

    setShowWebcamCustomerImage(false);
  };
  const clearSelectedImage1 = () => {
    setSelectedImage1(null);

    setShowChosenImage1(false);

    setShowWebcamDocumentCopy1(false);
  };
  const clearSelectedImage2 = () => {
    setSelectedImage2(null);

    setShowChosenImage2(false);

    setShowWebcamDocumentCopy2(false);
  };
  const dataURItoBlob = (dataURI) => {
    if (!dataURI) {
      return null; // Return null or another appropriate value if dataURI is not provided
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
  //Resize the Image(Compressor)
  const resizeImage = async (imageData) => {
    try {
      const resizedImage = await readAndCompressImage(imageData, 300, 400, 80); // Adjust dimensions and quality

      return resizedImage;
    } catch (error) {
      console.error('Error resizing image:', error);
      return imageData; // Return the original image in case of error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedCustomerImage) {
      formData.append('customer_image', dataURItoBlob(selectedCustomerImage), 'customer_image.jpg');
    }

    formData.append('customer_name', customerData.customer_name);

    formData.append('date_of_birth', customerData.date_of_birth);

    formData.append('gender', customerData.gender);

    formData.append('phonenumber', customerData.phonenumber);

    formData.append('phonenumber_type', customerData.phonenumber_type);

    formData.append('mobile_number', customerData.mobile_number);

    formData.append('address_line_one', customerData.address_line_one);

    formData.append('address_line_two', customerData.address_line_two);

    formData.append('city', customerData.city);

    formData.append('state', customerData.state);

    formData.append('country', customerData.country);

    formData.append('registration_date', customerData.registration_date);

    formData.append('care_of_type', customerData.care_of_type);

    formData.append('care_of_name', customerData.care_of_name);

    formData.append('document1', customerData.document1);

    formData.append('document_type1', customerData.document_type1);

    if (selectedImage1) {
      formData.append('document_copy1', dataURItoBlob(selectedImage1), 'document_copy1.jpg');
    }

    formData.append('expire_date1', customerData.expire_date1);

    formData.append('document_number1', customerData.document_number1);

    formData.append('document2', customerData.document2);

    formData.append('document_type2', customerData.document_type2);

    if (selectedImage2) {
      formData.append('document_copy2', dataURItoBlob(selectedImage2), 'document_copy2.jpg');
    }

    formData.append('expire_date2', customerData.expire_date2);

    formData.append('document_number2', customerData.document_number2);

    formData.append('verified_by', customerData.verified_by);

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/customer`, formData)

      .then((response) => {
        navigate('/utils/util-list'); // Redirect user to /utils/util-list
      })

      .catch((error) => {});

    const { name, value } = event.target;

    setCustomerData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageSrc = event.target.result;
        const resizedImage = await resizeImage(imageSrc);
        setSelectedCustomerImage(resizedImage);
        setShowWebcamCustomerImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput1Change = (event) => {
    const selectedFile1 = event.target.files[0];

    if (selectedFile1) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log('Selected file name:', selectedFile1.name);

        setSelectedImage1(reader.result);

        setShowWebcamDocumentCopy1(false);
      };

      reader.readAsDataURL(selectedFile1); // Use selectedFile1 instead of file1
    }
  };

  const retakeImage = () => {
    setSelectedCustomerImage(null);
    setShowWebcamCustomerImage(true);
  };
  const retakeImage1 = () => {
    setSelectedImage1(null);
    setShowWebcamDocumentCopy1(true);
  };
  const retakeImage2 = () => {
    setSelectedImage2(null);
    setShowWebcamDocumentCopy2(true);
  };
  const handleFileInput2Change = (event) => {
    const selectedFile2 = event.target.files[0];

    if (selectedFile2) {
      const reader = new FileReader();

      reader.onloadend = () => {
        console.log('Selected file name:', selectedFile2.name);

        setSelectedImage2(reader.result);

        setShowWebcamDocumentCopy2(false);
      };

      reader.readAsDataURL(selectedFile2); // Use selectedFile2 instead of file2
    }
  };

  const [relationData, setRelationData] = useState({
    care_of_type: ''
  });

  const [relationTypes, setRelationTypes] = useState([]);

  const webcamConstraints = {
    width: 220, // Adjust the webcam width to match the box width
    height: 230 // Adjust the webcam height to match the box height
  };

  const handleChange1 = (event) => {
    const { name, value } = event.target;

    setRelationData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  const [cityData, setCityData] = useState({
    city: ''
  });

  const [cities, setCities] = useState([]);

  const handleChange2 = (event) => {
    const { name, value } = event.target;

    setCityData((prevData) => ({
      ...prevData,

      [name]: value
    }));
  };

  useEffect(() => {
    // Fetch relation types from the API

    axios

      .get(`${process.env.REACT_APP_BASE_URL}/api/relationtypes`)

      .then((response) => {
        if (response.status === 200) {
          console.log('API Response Data:', response.data);

          //   if (response.data.masterrelationship) {
          //     setRelationTypes(response.data.masterrelationship);
          //   }
          // })

          // .catch((error) => {
          //   console.error(error);
          // });
          const fetchedSchemes = response.data.masterrelationship;
          console.log('Fetched schemes:', fetchedSchemes);
          // setSchemes(fetchedSchemes);
          setName(fetchedSchemes || []);
        } else {
          console.error('Error fetching jewel types. Status:', response.status);
        }
      });

    axios

      .get(`${process.env.REACT_APP_BASE_URL}/api/cities`)

      .then((response) => {
        console.log('API Response Data:', response.data);

        if (response.data.mastercity) {
          setCities(response.data.mastercity);
        }
      })

      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [name, setName] = useState([]);
  const handleSchemeChange = (event) => {
    const { name, value } = event.target;
    // Update the form values
    setCustomerData((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };
  const authPersonOptions = name.map((person) => (
    <option key={person.relation_type} value={person.relation_type}>
      {person.relation_type}
    </option>
  ));

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, paddingLeft: '1px', display: 'flex' }}>
        <form className="container" onSubmit={handleSubmit}>
          <Paper elevation={20} style={{ width: '100%', height: '2050px', marginTop: '04rem' }}>
            <Container maxWidth="lg">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Form.Label className="mb" style={{ fontFamily: 'Poppins' }}>
                    <br></br>

                    <h3>
                      <b>Personal Details</b>
                    </h3>
                  </Form.Label>

                  <hr className="hori-col-3" />

                  <MDBCardBody>
                    <div>
                      <Form.Label style={{ fontFamily: 'Poppins' }}>
                        <b>Customer Image</b>
                        <span style={{ color: 'red' }}>*</span>
                      </Form.Label>
                      <div>
                        <div style={{ position: 'relative', width: '200px', height: '250px', border: '1px solid black' }}>
                          {selectedCustomerImage && (
                            <div>
                              <img
                                src={selectedCustomerImage}
                                alt="Captured"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  width: 'auto',
                                  height: 'auto',
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)'
                                  // Fit the image within the box without stretching
                                }}
                              />
                              <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                <IconButton onClick={clearSelectedImage}>
                                  <ClearIcon style={{ color: 'red' }} />
                                </IconButton>
                                {showWebcamCustomerImage && (
                                  <IconButton onClick={retakeImage}>
                                    <PhotoCameraIcon style={{ color: 'blue' }} />
                                  </IconButton>
                                )}
                              </div>
                            </div>
                          )}
                          {showWebcamCustomerImage && (
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                              <Webcam
                                audio={false}
                                ref={customerImageRef}
                                screenshotFormat="image/jpeg"
                                style={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  width: 'auto',
                                  height: 'auto',
                                  position: 'absolute',
                                  top: '50%',
                                  left: '50%',
                                  transform: 'translate(-50%, -50%)'
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          {showWebcamCustomerImage || selectedCustomerImage ? (
                            <div>
                              {showWebcamCustomerImage && (
                                <div style={{ marginTop: '10px' }}>
                                  <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                    <IconButton onClick={handleCustomerImageChange}>
                                      <PhotoCameraIcon style={{ color: 'blue' }} />
                                      Capture
                                    </IconButton>
                                  </label>
                                </div>
                              )}
                              {selectedCustomerImage && (
                                <div style={{ marginTop: '10px' }}>
                                  <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                    <IconButton onClick={openWebcamForCustomerImage}>
                                      <PhotoCameraIcon style={{ color: 'blue' }} />
                                      Retake
                                    </IconButton>
                                  </label>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div style={{ marginTop: '10px' }}>
                              <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                <IconButton component="span">
                                  <InsertDriveFileIcon style={{ color: '#f6980d' }} />
                                  Choose File
                                </IconButton>
                              </label>
                              <input
                                type="file"
                                accept="image/*"
                                id="file-input"
                                style={{ display: 'none' }}
                                onChange={handleFileInputChange}
                              />
                              <div style={{ marginTop: '10px' }}>
                                <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                  <IconButton onClick={openWebcamForCustomerImage} style={{ cursor: 'pointer' }}>
                                    <PhotoCameraIcon style={{ color: 'blue' }} />
                                    Use Webcam
                                  </IconButton>
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <br></br>

                    <br></br>

                    <Row className="mb-2">
                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>
                          Customer Name<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Customer name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="customer_name"
                          value={customerData.customer_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formDate" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Date of Birth</Form.Label>

                        <input
                          type="date"
                          className="form-control"
                          placeholder="Date of Birth"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="date_of_birth"
                          value={customerData.date_of_birth}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridgender" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>
                          {' '}
                          Gender<span style={{ color: 'red' }}>*</span>{' '}
                        </Form.Label>

                        <FormControl fullWidth>
                          <Form.Select value={customerData.gender} onChange={handleChange} name="gender" displayEmpty required>
                            <option value="" disabled>
                              {' '}
                              Select Gender{' '}
                            </option>

                            <option value="Male">Male</option>

                            <option value="Female">Female</option>

                            <option value="Other">Other</option>
                          </Form.Select>
                        </FormControl>
                      </Form.Group>

                      <Form.Group className="col col-sm-6" controlId="formGridName">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Mobile Number</Form.Label>

                        <InputGroup>
                          <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>

                          <Form.Control
                            className="form-control"
                            type="text"
                            name="mobile_number"
                            value={customerData.mobile_number}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridgender" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Phone Number Type</Form.Label>

                        <Form.Select
                          defaultValue="Choose..."
                          className="form-control"
                          name="phonenumber_type"
                          value={customerData.phonenumber_type}
                          onChange={handleChange}
                        >
                          {' '}
                          <option value="Choose"></option>
                          <option value="Office no">Office no</option>
                          <option value="Residence no">Residence no</option>
                          <option value=" None">None</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="col col-sm-6" controlId="formGridName">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Phone Number</Form.Label>

                        <InputGroup>
                          <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>

                          <Form.Control
                            className="form-control"
                            type="text"
                            name="phonenumber"
                            value={customerData.phonenumber}
                            onChange={handleChange}
                            placeholder="Mobile Number"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridAddress1" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Address Line1</Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address line1"
                          aria-describedby="basic-addon1"
                          name="address_line_one"
                          value={customerData.address_line_one}
                          onChange={handleChange}
                        />
                      </Form.Group>

                      <Form.Group controlId="formGridAddress2" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Address Line2</Form.Label>

                        <input
                          type=" text"
                          className="form-control"
                          placeholder="Address line2"
                          aria-describedby="basic-addon1"
                          name="address_line_two"
                          value={customerData.address_line_two}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <FormGroup controlId="formGridgender" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>City</Form.Label>

                        <FormControl fullWidth>
                          <Form.Select value={customerData.city} onChange={handleSchemeChange} name="city" displayEmpty>
                            <option value="" disabled>
                              Select City
                            </option>

                            {cities.map((city) => (
                              <option key={city.city_id} value={city.city_name}>
                                {city.city_name}
                              </option>
                            ))}
                          </Form.Select>
                        </FormControl>
                      </FormGroup>

                      <Form.Group controlId="formGridgender" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}> State</Form.Label>

                        <FormControl fullWidth>
                          <Form.Select value={customerData.state} onChange={handleChange} name="state" displayEmpty>
                            <option value="" disabled>
                              {' '}
                              Select State{' '}
                            </option>

                            <option value="TamilNadu">TamilNadu</option>

                            <option value="Other">Other</option>
                          </Form.Select>
                        </FormControl>
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridCountry" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Country</Form.Label>

                        <Form.Select
                          defaultValue="Choose..."
                          className="form-control"
                          name="country"
                          value={customerData.country}
                          onChange={handleChange}
                        >
                          <option value="Choose..."></option>

                          <option value="India">India</option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group controlId="formGridState" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>Registration Date</Form.Label>

                        <Form.Control
                          type="date"
                          className="form-control"
                          name="registration_date"
                          value={customerData.registration_date}
                          onChange={handleChange}
                          placeholder="Registration Date"
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridC/O" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>
                          C/O<span style={{ color: 'red' }}>*</span>{' '}
                        </Form.Label>

                        <FormControl fullWidth>
                          <Form.Select
                            value={customerData.care_of_type}
                            onChange={handleSchemeChange}
                            name="care_of_type"
                            displayEmpty
                            required
                          >
                            {/* <option value="" disabled>
                              Select Care Of Type
                            </option>

                            {relationTypes.map((relationType) => (
                              <option key={relationType.id} value={relationType.relation_type}>
                                {relationType.relation_type}
                              </option>
                            ))} */}
                            <option value="" disabled selected>
                              Select Care Of Type
                            </option>
                            {authPersonOptions}
                          </Form.Select>
                        </FormControl>
                      </Form.Group>

                      <Form.Group controlId="formGridName" className="col col-sm-6">
                        <Form.Label style={{ fontFamily: 'Poppins' }}>
                          Name<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <Form.Control
                          type="text"
                          name="care_of_name"
                          value={customerData.care_of_name}
                          onChange={handleChange}
                          required
                          placeholder="Care Name"
                        />
                      </Form.Group>
                    </Row>
                  </MDBCardBody>
                </Grid>

                <Grid item xs={12}>
                  <br></br>

                  <MDBCardBody>
                    <MDBCardTitle>
                      Id/Address Proof<span style={{ color: 'red' }}>*</span>
                    </MDBCardTitle>

                    <br></br>

                    <TableContainer component={Paper}>
                      <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>DOCUMENT</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT TYPE</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT COPY</b>
                            </TableCell>

                            <TableCell>
                              <b>EXPIRE DATE</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT NO</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Box sx={{ mr: 2 }}>
                                <FormControl className="col col-sm-10">
                                  <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                    <Form.Select
                                      name="document1"
                                      id="demo-simple-select"
                                      value={customerData.document1}
                                      label="Document"
                                      onChange={handleChange}
                                      style={{ minWidth: '150px', height: '43px' }}
                                    >
                                      <option value="Choose..."></option>
                                      <option value="Aadhar Card">Aadhar card</option>

                                      <option value="Pan Card">Pan Card</option>

                                      <option value="Voter Id">Voter Id</option>

                                      <option value="Driving License">Driving License</option>

                                      <option value="Ration Card">Ration Card</option>
                                    </Form.Select>
                                  </Form.Group>
                                </FormControl>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ mr: 2 }}>
                                <FormControl className="col col-sm-10">
                                  <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                    <Form.Select
                                      id="demo-simple-select"
                                      value={customerData.document_type1}
                                      label="Document type"
                                      name="document_type1"
                                      onChange={handleChange}
                                      style={{ minWidth: '150px', height: '38px' }}
                                    >
                                      <option value="Choose..."></option>
                                      <option value="ID">ID</option>

                                      <option value="Address">Address</option>
                                    </Form.Select>
                                  </Form.Group>
                                </FormControl>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <div>
                                <div style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid black' }}>
                                  {selectedImage1 && (
                                    <div>
                                      <img
                                        src={selectedImage1}
                                        alt="Captured"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          width: 'auto',
                                          height: 'auto',
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                          // Fit the image within the box without stretching
                                        }}
                                      />
                                      <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                        <IconButton onClick={clearSelectedImage1}>
                                          <ClearIcon style={{ color: 'red' }} />
                                        </IconButton>
                                        {showWebcamDocumentCopy1 && (
                                          <IconButton onClick={retakeImage1}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                          </IconButton>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {showWebcamDocumentCopy1 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                      <Webcam
                                        audio={false}
                                        ref={documentCopy1Ref}
                                        screenshotFormat="image/jpeg"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          width: 'auto',
                                          height: 'auto',
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  {showWebcamDocumentCopy1 || selectedImage1 ? (
                                    <div>
                                      {showWebcamDocumentCopy1 && (
                                        <div style={{ marginTop: '10px' }}>
                                          <IconButton onClick={handleDocumentCopy1Change}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                          </IconButton>
                                          <label>Capture</label>
                                        </div>
                                      )}
                                      {selectedImage1 && (
                                        <div style={{ marginTop: '10px' }}>
                                          <IconButton onClick={openWebcamForDocumentCopy1}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                            Retake
                                          </IconButton>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                        <IconButton component="span">
                                          <InsertDriveFileIcon style={{ color: '#f6980d' }} />
                                        </IconButton>
                                        Choose File
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        style={{ display: 'none' }}
                                        onChange={handleFileInput1Change}
                                      />
                                      <div style={{ marginTop: '10px' }}>
                                        <IconButton onClick={openWebcamForDocumentCopy1} style={{ cursor: 'pointer' }}>
                                          <PhotoCameraIcon style={{ color: 'blue' }} />
                                          Use Webcam
                                        </IconButton>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Form.Group controlId="formGridNominee" className="col col-sm-10">
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Expire_date1"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  name="expire_date1"
                                  value={customerData.expire_date1}
                                  onChange={handleChange}
                                />
                              </Form.Group>
                            </TableCell>

                            <TableCell>
                              <MDBInput
                                type="text"
                                name="document_number1"
                                value={customerData.document_number1}
                                onChange={handleChange}
                                placeholder="Document no"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <MDBCardTitle>Additional Id/Address Proof</MDBCardTitle>

                    <br></br>

                    <TableContainer component={Paper}>
                      <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              <b>DOCUMENT</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT TYPE</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT COPY</b>
                            </TableCell>

                            <TableCell>
                              <b>EXPIRE DATE</b>
                            </TableCell>

                            <TableCell>
                              <b>DOCUMENT NO</b>
                            </TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          <TableRow>
                            <TableCell>
                              <Box sx={{ mr: 2 }}>
                                <FormControl className="col col-sm-10">
                                  <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                    <Form.Select
                                      name="document2"
                                      id="demo-simple-select"
                                      value={customerData.document2}
                                      onChange={handleChange}
                                      style={{ minWidth: '150px', height: '43px' }}
                                    >
                                      <option value="Choose..."></option>
                                      <option value="Aadhar Card">Aadhar card</option>

                                      <option value="Pan Card">Pan Card</option>

                                      <option value="Voter Id">Voter Id</option>

                                      <option value="Driving License">Driving License</option>

                                      <option value="Ration Card">Ration Card</option>
                                    </Form.Select>
                                  </Form.Group>
                                </FormControl>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <Box sx={{ mr: 2 }}>
                                <FormControl className="col col-sm-10">
                                  <Form.Group controlId="formGridNominee" className="col col-sm-3">
                                    <Form.Select
                                      id="demo-simple-select"
                                      value={customerData.document_type2}
                                      label="Document type"
                                      name="document_type2"
                                      onChange={handleChange}
                                      style={{ minWidth: '150px', height: '38px' }}
                                    >
                                      <option value="Choose..."></option>

                                      <option value="ID">ID</option>

                                      <option value="Address">Address</option>
                                    </Form.Select>
                                  </Form.Group>
                                </FormControl>
                              </Box>
                            </TableCell>

                            <TableCell>
                              <div>
                                <div style={{ position: 'relative', width: '200px', height: '100px', border: '1px solid black' }}>
                                  {selectedImage2 && (
                                    <div>
                                      <img
                                        src={selectedImage2}
                                        alt="Captured"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          width: 'auto',
                                          height: 'auto',
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                          // Fit the image within the box without stretching
                                        }}
                                      />
                                      <div style={{ position: 'absolute', top: 0, right: 0 }}>
                                        <IconButton onClick={clearSelectedImage2}>
                                          <ClearIcon style={{ color: 'red' }} />
                                        </IconButton>
                                        {showWebcamDocumentCopy2 && (
                                          <IconButton onClick={retakeImage2}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                          </IconButton>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {showWebcamDocumentCopy2 && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                                      <Webcam
                                        audio={false}
                                        ref={documentCopy2Ref}
                                        screenshotFormat="image/jpeg"
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: '100%',
                                          width: 'auto',
                                          height: 'auto',
                                          position: 'absolute',
                                          top: '50%',
                                          left: '50%',
                                          transform: 'translate(-50%, -50%)'
                                        }}
                                      />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  {showWebcamDocumentCopy2 || selectedImage2 ? (
                                    <div>
                                      {showWebcamDocumentCopy2 && (
                                        <div style={{ marginTop: '10px' }}>
                                          <IconButton onClick={handleDocumentCopy2Change}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                          </IconButton>
                                          <label>Capture</label>
                                        </div>
                                      )}
                                      {selectedImage2 && (
                                        <div style={{ marginTop: '10px' }}>
                                          <IconButton onClick={openWebcamForDocumentCopy2}>
                                            <PhotoCameraIcon style={{ color: 'blue' }} />
                                            Retake
                                          </IconButton>
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <label htmlFor="file-input" style={{ cursor: 'pointer' }}>
                                        <IconButton component="span">
                                          <InsertDriveFileIcon style={{ color: '#f6980d' }} />
                                        </IconButton>
                                        Choose File
                                      </label>
                                      <input
                                        type="file"
                                        accept="image/*"
                                        id="file-input"
                                        style={{ display: 'none' }}
                                        onChange={handleFileInput2Change}
                                      />
                                      <div style={{ marginTop: '10px' }}>
                                        <IconButton onClick={openWebcamForDocumentCopy2} style={{ cursor: 'pointer' }}>
                                          <PhotoCameraIcon style={{ color: 'blue' }} />
                                          Use Webcam
                                        </IconButton>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <Form.Group controlId="formGridNominee" className="col col-sm-10">
                                <input
                                  type="date"
                                  class="form-control"
                                  placeholder="Expire_date"
                                  aria-label="Username"
                                  aria-describedby="basic-addon1"
                                  name="expire_date2"
                                  value={customerData.expire_date2}
                                  onChange={handleChange}
                                />{' '}
                              </Form.Group>
                            </TableCell>

                            <TableCell>
                              {' '}
                              <MDBInput
                                type="text"
                                name="document_number2"
                                value={customerData.document_number2}
                                onChange={handleChange}
                                placeholder="Document no"
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MDBCardBody>

                  <br></br>

                  <Form.Group controlId="verifiedname" className="col col-sm-3">
                    <Form.Label style={{ fontFamily: 'Poppins' }}>
                      Verified By<span style={{ color: 'red' }}>*</span>
                    </Form.Label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter name"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      name="verified_by"
                      value={customerData.verified_by}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <MDBCardBody>
                    <Row className="mb-3">
                      <Form.Group className="mb-3">
                        <div style={{ justifyContent: 'center', display: 'flex', paddingLeft: '30px', margin: '25px' }}>
                          <Button type="submit" variant="primary" style={{ margin: '10px' }}>
                            Submit
                          </Button>

                          <Link to="/Customer">
                            <Button type="submit" variant="secondary" style={{ margin: '10px' }}>
                              Cancel
                            </Button>
                          </Link>
                        </div>
                      </Form.Group>
                    </Row>
                  </MDBCardBody>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default Registration;
