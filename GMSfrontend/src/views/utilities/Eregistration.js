import React, { useCallback, useState } from 'react';

import axios from 'axios';

import {
    Box,

    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Step,

    StepLabel,
    Stepper,
    Table,

    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

import { Form } from 'react-bootstrap';

import IconButton from '@mui/material/IconButton';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import Webcam from 'react-webcam';



const useStyles = makeStyles({

  button: {

    marginRight: '10px'

  }

});



function getSteps() {

  return ['Personal Details', 'Employee Details', 'Login Details', 'Education Qualification'];

}



const LinearStepper = () => {

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const documentCopy1Ref = React.useRef(null);

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);

  const documentCopy2Ref = React.useRef(null);

  const [selectedImage2, setSelectedImage2] = useState(null);

  const [showWebcamDocumentCopy2, setShowWebcamDocumentCopy2] = useState(false);

  const documentCopy3Ref = React.useRef(null);

  const [selectedImage3, setSelectedImage3] = useState(null);

  const [showWebcamDocumentCopy3, setShowWebcamDocumentCopy3] = useState(false);

  const steps = getSteps();

  const [employeeData, setEmployeeData] = useState({

    employee_name: '',

    employee_id: '',

    date_of_birth: '',

    email_id: '',

    mobile_no: '',

    address_line: '',

    city: '',

    state: '',

    pincode: '',

    employee_document: '',

    employee_document_type: '',

    employee_document_copy: '',

    employee_expire_date: '',

    employee_document_number: '',

    company: '',

    date_of_joining: '',

    role: '',

    branch: '',

    employee_photo: '',

    name: '',

    email: '',

    password: '',

    institute_name: '',

    year_of_passing: '',

    degree: '',

    employee_attached_document: ''

  });



  const handleChange = (event) => {

    const { name, value } = event.target;

    setEmployeeData((prevData) => ({

      ...prevData,

      [name]: value

    }));

  };



  const handleDocumentCopy1Change = useCallback(() => {

    const imageSrc = documentCopy1Ref.current.getScreenshot();

    console.log('Document Copy 1 captured:', imageSrc);

    setSelectedImage1(imageSrc);

  }, []);



  const openWebcamForDocumentCopy1 = () => {

    setShowWebcamDocumentCopy1(true);

  };



  const handleDocumentCopy2Change = useCallback(() => {

    const imageSrc = documentCopy2Ref.current.getScreenshot();

    console.log('Document Copy 2 captured:', imageSrc);

    setSelectedImage2(imageSrc);

  }, []);



  const openWebcamForDocumentCopy2 = () => {

    setShowWebcamDocumentCopy2(true);

  };





  const handleDocumentCopy3Change = useCallback(() => {

    const imageSrc = documentCopy3Ref.current.getScreenshot();

    console.log('Document Copy 3 captured:', imageSrc);

    setSelectedImage3(imageSrc);

  }, []);



  const openWebcamForDocumentCopy3 = () => {

    setShowWebcamDocumentCopy3(true);

  };





  const dataURItoBlob = (dataURI) => {

    const byteString = atob(dataURI.split(',')[1]);



    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];



    const ab = new ArrayBuffer(byteString.length);



    const ia = new Uint8Array(ab);



    for (let i = 0; i < byteString.length; i++) {

      ia[i] = byteString.charCodeAt(i);

    }



    return new Blob([ab], { type: mimeString });

  };



  const handleSubmit = (event) => {

    event.preventDefault();

    const { name, value } = event.target;

    const formData = new FormData();



    formData.append('employee_name', employeeData.employee_name);

    formData.append('employee_id', employeeData.employee_id);

    formData.append('date_of_birth', employeeData.date_of_birth);

    formData.append('email_id', employeeData.email_id);

    formData.append('mobile_no', employeeData.mobile_no);

    formData.append('address_line', employeeData.address_line);

    formData.append('city', employeeData.city);

    formData.append('state', employeeData.state);

    formData.append('pincode', employeeData.pincode);

    formData.append('employee_document', employeeData.employee_document);

    formData.append('employee_document_type', employeeData.employee_document_type);



    if (selectedImage1) {

      formData.append('employee_document_copy', dataURItoBlob(selectedImage1), 'employee_document_copy.jpg');

    }

    formData.append('employee_expire_date', employeeData.employee_expire_date);

    formData.append('employee_document_number', employeeData.employee_document_number);

    formData.append('company', employeeData.company);

    formData.append('date_of_joining', employeeData.date_of_joining);

    formData.append('role', employeeData.role);

    formData.append('branch', employeeData.branch);

    if (selectedImage2) {

      formData.append('employee_photo', dataURItoBlob(selectedImage2), 'employee_photo.jpg');

    }

    formData.append('name', employeeData.name);

    formData.append('email', employeeData.email);

    formData.append('password', employeeData.password);

    formData.append('institute_name', employeeData.institute_name);

    formData.append('year_of_passing', employeeData.year_of_passing);

    formData.append('degree', employeeData.degree);



    if (selectedImage3) {

      formData.append('employee_attached_document', dataURItoBlob(selectedImage3), 'employee_attached_document.jpg');

    }







    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/signup`, {

        name: employeeData.name,

        email: employeeData.email,

        password: employeeData.password

      })

      .then((response) => {

        // Handle success response of signup API

        // ...



        // Now, make the API call for linearstepper

        axios

          .post(`${process.env.REACT_APP_BASE_URL}/api/employeeregistration`, formData)

          .then((response) => {

            // Handle success response of linearstepper API

            // ...

          })

          .catch((error) => {

            // Handle error response of linearstepper API

            // ...

          });

      })

      .catch((error) => {

        // Handle error response of signup API

        // ...

      });



    setEmployeeData((prevData) => ({

      ...prevData,

      [name]: value

    }));

  };



  const handleNext = () => {

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

  };



  const handleBack = () => {

    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  };



  function getStepContent(step) {

    switch (step) {

      case 0:

        return (

          <>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your Name"

                  fullWidth

                  margin="normal"

                  size="small"

                  value={employeeData.employee_name}

                  onChange={handleChange}

                  name="employee_name"

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  type="date"

                  variant="outlined"

                  fullWidth

                  margin="normal"

                  name="date_of_birth"

                  size="small"

                  value={employeeData.date_of_birth}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Mobile Number"

                  size="small"

                  margin="normal"

                  name="mobile_no"

                  value={employeeData.mobile_no}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your E-mail"

                  fullWidth

                  margin="normal"

                  size="small"

                  name="email_id"

                  value={employeeData.email_id}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  type="text"

                  variant="outlined"

                  placeholder="Enter Address "

                  fullWidth

                  margin="normal"

                  name="address_line"

                  size="small"

                  value={employeeData.address_line}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your City"

                  fullWidth

                  margin="normal"

                  size="small"

                  value={employeeData.city}

                  onChange={handleChange}

                  name="city"

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  type="text"

                  placeholder="Enter State"

                  variant="outlined"

                  fullWidth

                  margin="normal"

                  name="state"

                  size="small"

                  value={employeeData.state}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Pincode"

                  size="small"

                  margin="normal"

                  name="pincode"

                  value={employeeData.pincode}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <br></br>

            <br></br>



            <Form.Label className="mb">

              <h3>Id/Address proof</h3>

            </Form.Label>



            <hr className="hori-col-3" />



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

                            <InputLabel id="demo-simple-select-label">Document</InputLabel>



                            <Select

                              name="employee_document"

                              id="demo-simple-select"

                              value={employeeData.employee_document}

                              label="Document"

                              onChange={handleChange}

                              style={{ minWidth: '100px', height: '43px' }}

                            >

                              <MenuItem value="Aadhar Card">Aadhar card</MenuItem>



                              <MenuItem value="Pan Card">Pan Card</MenuItem>



                              <MenuItem value="Voter Id">Voter Id</MenuItem>



                              <MenuItem value="Driving License">Driving License</MenuItem>



                              <MenuItem value="Ration Card">Ration Card</MenuItem>

                            </Select>

                          </Form.Group>

                        </FormControl>

                      </Box>

                    </TableCell>



                    <TableCell>

                      <Box sx={{ mr: 2 }}>

                        <FormControl className="col col-sm-10">

                          <Form.Group controlId="formGridNominee" className="col col-sm-3">

                            <InputLabel id="demo-simple-select-label">Document Type</InputLabel>



                            <Select

                              id="demo-simple-select"

                              value={employeeData.employee_document_type}

                              label="Document type"

                              name="employee_document_type"

                              onChange={handleChange}

                              style={{ minWidth: '150px', height: '38px' }}

                            >

                              <MenuItem value="ID">ID</MenuItem>



                              <MenuItem value="Address">Address</MenuItem>

                            </Select>

                          </Form.Group>

                        </FormControl>

                      </Box>

                    </TableCell>



                    <TableCell>

                      <div style={{ position: 'relative' }}>

                        {showWebcamDocumentCopy1 ? (

                          <>

                            <Webcam

                              audio={false}

                              ref={documentCopy1Ref}

                              screenshotFormat="image/jpeg"

                              style={{ width: '30%', height: '30%' }}

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



                            <IconButton color="secondary" aria-label="capture" onClick={handleDocumentCopy1Change}>

                              <PhotoCameraIcon />

                            </IconButton>

                          </>

                        ) : (

                          <>

                            {selectedImage1 ? (

                              <img src={selectedImage1} alt="Document Copy 1" style={{ width: '30%', height: '30%' }} />

                            ) : (

                              <IconButton color="primary" onClick={openWebcamForDocumentCopy1}>

                                <PhotoCameraIcon />

                              </IconButton>

                            )}

                          </>

                        )}

                      </div>

                    </TableCell>



                    <TableCell>

                      <Form.Group controlId="formGridNominee" className="col col-sm-10">

                        <TextField

                          type="date"

                          class="form-control"

                          placeholder="Expire_date"

                          size="small"

                          aria-label="Username"

                          aria-describedby="basic-addon1"

                          name="employee_expire_date"

                          value={employeeData.employee_expire_date}

                          onChange={handleChange}

                          required

                        />

                      </Form.Group>

                    </TableCell>



                    <TableCell>

                      <TextField

                        type="text"

                        name="employee_document_number"

                        value={employeeData.employee_document_number}

                        onChange={handleChange}

                        size="small"

                        placeholder="Document_no"

                      />

                    </TableCell>

                  </TableRow>

                </TableBody>

              </Table>

            </TableContainer>

          </>

        );



      case 1:

        return (

          <>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Company Name"

                  fullWidth

                  margin="normal"

                  name="company"

                  size="small"

                  value={employeeData.company}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Date of Joining"

                  fullWidth

                  margin="normal"

                  name="date_of_joining"

                  size="small"

                  value={employeeData.date_of_joining}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your Role"

                  fullWidth

                  margin="normal"

                  size="small"

                  name="role"

                  value={employeeData.role}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Branch"

                  fullWidth

                  margin="normal"

                  name="branch"

                  size="small"

                  value={employeeData.branch}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <div style={{ position: 'relative' }}>

                  {showWebcamDocumentCopy2 ? (

                    <>

                      <Webcam audio={false} ref={documentCopy2Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />



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



                      <IconButton onClick={handleDocumentCopy2Change}>

                        <PhotoCameraIcon />

                      </IconButton>

                    </>

                  ) : (

                    <>

                      {selectedImage2 ? (

                        <img src={selectedImage2} alt="Document Copy 2" style={{ width: '30%', height: '30%' }} />

                      ) : (

                        <IconButton onClick={openWebcamForDocumentCopy2}>

                          <PhotoCameraIcon />

                        </IconButton>

                      )}

                    </>

                  )}

                </div>

              </Grid>

            </Grid>

          </>

        );



      case 2:

        return (

          <>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Name"

                  fullWidth

                  margin="normal"

                  size="small"

                  name="name"

                  value={employeeData.name}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="E-mail"

                  fullWidth

                  margin="normal"

                  name="email"

                  size="small"

                  value={employeeData.email}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder=" Password"

                  size="small"

                  margin="normal"

                  name="password"

                  value={employeeData.password}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>

          </>

        );



      case 3:

        return (

          <>

            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your College Name"

                  fullWidth

                  margin="normal"

                  size="small"

                  value={employeeData.institute_name}

                  onChange={handleChange}

                  name="institute_name"

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <TextField

                  placeholder="Year of Passing"

                  variant="outlined"

                  fullWidth

                  margin="normal"

                  name="year_of_passing"

                  size="small"

                  value={employeeData.year_of_passing}

                  onChange={handleChange}

                />

              </Grid>

            </Grid>



            <Grid container spacing={2}>

              <Grid item xs={12} sm={4}>

                <TextField

                  variant="outlined"

                  placeholder="Enter Your Degree"

                  fullWidth

                  margin="normal"

                  size="small"

                  name="degree"

                  value={employeeData.degree}

                  onChange={handleChange}

                />

              </Grid>



              <Grid item xs={12} sm={4}>

                <div style={{ position: 'relative' }}>

                  {showWebcamDocumentCopy3 ? (

                    <>

                      <Webcam

                        audio={false}

                        ref={documentCopy3Ref}

                        screenshotFormat="image/jpeg"

                        style={{ width: '30%', height: '30%' }}

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



                      <IconButton color="secondary" aria-label="capture" onClick={handleDocumentCopy3Change}>

                        <PhotoCameraIcon />

                      </IconButton>

                    </>

                  ) : (

                    <>

                      {selectedImage3 ? (

                        <img src={selectedImage3} alt="Document Copy 3" style={{ width: '30%', height: '30%' }} />

                      ) : (

                        <IconButton color="primary" onClick={openWebcamForDocumentCopy3}>

                          <PhotoCameraIcon />

                        </IconButton>

                      )}

                    </>

                  )}

                </div>

              </Grid>

            </Grid>

          </>

        );



      default:

        return 'unknown step';

    }

  }



  return (

    <div>

      <Paper elevation={3} style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>

        <form className="container" onSubmit={handleSubmit}>

          <Stepper alternativeLabel activeStep={activeStep}>

            {steps.map((step, index) => {

              return (

                <Step key={index}>

                  <StepLabel>{step}</StepLabel>

                </Step>

              );

            })}

          </Stepper>



          {activeStep === steps.length ? (

            <Typography variant="h3" align="center">

              Thank You

            </Typography>

          ) : (

            <>

              {getStepContent(activeStep, employeeData, handleChange)}



              <Button className={classes.button} disabled={activeStep === 0} onClick={handleBack}>

                Back

              </Button>



              <Button className={classes.button} variant="contained" color="primary" onClick={handleNext}>

                Next

              </Button>

            </>

          )}



          {activeStep === steps.length - 1 && (

            <Button className={classes.button} type="submit" variant="contained" color="primary" onClick={handleSubmit}>

              Submit

            </Button>

          )}

        </form>

      </Paper>

    </div>

  );

};



export default LinearStepper;