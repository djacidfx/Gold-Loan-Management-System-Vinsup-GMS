import { useEffect, useState } from 'react';

 

import { Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

 

import axios from 'axios';

 

import 'bootstrap/dist/css/bootstrap.min.css';

 

import { MDBCardBody } from 'mdb-react-ui-kit';

 

import { Form, Row } from 'react-bootstrap';

 

export default function Attendance() {

  const [attendanceData, setAttendanceData] = useState({

    employee_name: '',

 

    employee_id: '',

 

    employee_role: '',

 

    date: '',

 

    check_in: '',

 

    check_out: ''

  });

 

  const [attendanceRecords, setAttendanceRecords] = useState([]);

 

  const [filteredAttendanceRecords, setFilteredAttendanceRecords] = useState([]);

 

  const [searchTerm, setSearchTerm] = useState('');

 

  const [setError] = useState(null);

 

  const handleChange = (event) => {

    const { name, value } = event.target;

 

    setAttendanceData((prevAttendanceData) => ({

      ...prevAttendanceData,

 

      [name]: value

    }));

  };

 

  const handleSearchChange = (event) => {

    setSearchTerm(event.target.value);

  };

 

  const handleSubmit = (event) => {

    event.preventDefault();

 

    const newAttendance = { ...attendanceData };

 

    axios

 

      .post(`${process.env.REACT_APP_BASE_URL}/api/attendancedetail`, newAttendance)

 

      .then((response) => {

        console.log(response.data);

 

        setAttendanceRecords((prevRecords) => [...prevRecords, newAttendance]);

 

        setAttendanceData({

          employee_name: '',

 

          employee_id: '',

 

          employee_role: '',

 

          date: '',

 

          check_in: '',

 

          check_out: ''

        });

      })

 

      .catch((error) => {

        console.error(error);

      });

  };

 

  useEffect(() => {

    axios

      .get(`${process.env.REACT_APP_BASE_URL}/api/attendancedetails`)

      .then((response) => {

        console.log(response.data); // Log the response data to inspect the format

        const { attendancedetails } = response.data;

        if (Array.isArray(attendancedetails)) {

          setAttendanceRecords(attendancedetails);

          setFilteredAttendanceRecords(attendancedetails);

        } else {

          throw new Error('Invalid data format');

        }

      })

      .catch((error) => {

        console.error('Error fetching attendance data:', error);

        setError('Error fetching attendance data');

      });

  }, []);

 

 

  useEffect(() => {

    const filteredRecords = attendanceRecords.filter((record) => {

      const { employee_name, employee_id, employee_role, date, check_in, check_out } = record;

 

      const searchFields = [employee_name, employee_id, employee_role, date, check_in, check_out];

 

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

 

      return searchFields.some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));

    });

 

    setFilteredAttendanceRecords(filteredRecords);

  }, [attendanceRecords, searchTerm]);

 

  return (

    <>

      <h3>PayRoll</h3>

 

      <div style={{ display: 'flex', height: '69vh' }}>

        <div style={{ flex: 1, paddingLeft: '1px', display: 'flex' }}>

          <form className="container" onSubmit={handleSubmit}>

            <Paper elevation={20} style={{ width: '100%', height: '450px', marginTop: '04rem' }}>

              <Container maxWidth="lg">

                <Grid container spacing={3}>

                  <Grid item xs={12}>

                    <Form.Label className="mb">

                      <br />

 

                      <h3>

                        <b>Attendance Details</b>

                      </h3>

                    </Form.Label>

 

                    <hr className="hori-col-3" />

 

                    <MDBCardBody>

                      <Row className="mb-2">

                        <Form.Group controlId="formcustomername" className="col col-sm-6">

                          <Form.Label>

                            Employee Name<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="text"

                            className="form-control"

                            placeholder="Employee name"

                            aria-label="Username"

                            aria-describedby="basic-addon1"

                            name="employee_name"

                            value={attendanceData.employee_name}

                            onChange={handleChange}

                            pattern="[A-Za-z. ]+" // Regex pattern for alphabets and dots

                            title="Please enter valid input" // Error message to be shown on pattern mismatch

                            required

                          />

                        </Form.Group>

 

                        <Form.Group controlId="formcustomername" className="col col-sm-6">

                          <Form.Label>

                            Employee Id<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="text"

                            className="form-control"

                            placeholder="Employee Id"

                            aria-label="Username"

                            aria-describedby="basic-addon1"

                            name="employee_id"

                            value={attendanceData.employee_id}

                            onChange={handleChange}

                            pattern="[A-Za-z0-9. ]+" // Updated pattern for alphanumeric characters and dots

                            title="Please enter valid input" // Error message to be shown on pattern mismatch

                            required

                          />

                        </Form.Group>

                      </Row>

 

                      <Row mb="2">

                        <Form.Group controlId="formemployeerole" className="col col-sm-6">

                          <Form.Label>

                            Employee Role<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="text"

                            className="form-control"

                            placeholder="Employee Role"

                            aria-label="Username"

                            aria-describedby="basic-addon1"

                            name="employee_role"

                            value={attendanceData.employee_role}

                            onChange={handleChange}

                            pattern="[A-Za-z. ]+" // Regex pattern for alphabets and dots

                            title="Please enter valid input"

                            required

                          />

                        </Form.Group>

 

                        <Form.Group controlId="formDate" className="col col-sm-6">

                          <Form.Label>

                            Date<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="date"

                            className="form-control"

                            placeholder="Date of Birth"

                            aria-label="Username"

                            aria-describedby="basic-addon1"

                            name="date"

                            value={attendanceData.date}

                            onChange={handleChange}

                            required

                          />

                        </Form.Group>

                      </Row>

 

                      <Row className="mb-2">

                        <Form.Group controlId="formGridAddress1" className="col col-sm-6">

                          <Form.Label>

                            Check-In-Time<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="time"

                            className="form-control"

                            aria-describedby="basic-addon1"

                            name="check_in"

                            value={attendanceData.check_in}

                            onChange={handleChange}

                            required

                          />

                        </Form.Group>

 

                        <Form.Group controlId="formGridAddress2" className="col col-sm-6">

                          <Form.Label>

                            Check-Out-Time<span style={{ color: 'red' }}>*</span>

                          </Form.Label>

 

                          <input

                            type="time"

                            className="form-control"

                            aria-describedby="basic-addon1"

                            name="check_out"

                            value={attendanceData.check_out}

                            onChange={handleChange}

                            required

                          />

                        </Form.Group>

                      </Row>

                    </MDBCardBody>

 

                    <Row className="mb-3">

                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                      <Form.Group controlId="formGridCheckbox" className="col col-sm-6">

                        <br />

 

                        <button type="submit" className="me-4 btn btn-success btn-lg btn-block mx-auto d-block my-50">

                          <center>Submit</center>

                        </button>

                      </Form.Group>

                    </Row>

                  </Grid>

                </Grid>

              </Container>

            </Paper>

          </form>

        </div>

      </div>

 

      <Paper elevation={20} style={{ width: '100%', height: '450px', marginTop: '04rem' }}>

        <Table>

          <TableHead>

            <br />

 

            <h6>&nbsp;&nbsp; &nbsp;&nbsp;Attendance</h6>

 

            <TableRow>

              <TableCell colSpan={5}>

                <Form.Control

                  type="text"

                  className="form-control"

                  placeholder="Search"

                  aria-label="Search"

                  aria-describedby="basic-addon1"

                  value={searchTerm}

                  onChange={handleSearchChange}

                />

              </TableCell>

            </TableRow>

 

            <TableRow>

              <TableCell>Employee Name</TableCell>

 

              <TableCell>Employee Id</TableCell>

 

              <TableCell>Employee Role</TableCell>

 

              <TableCell>Date</TableCell>

 

              <TableCell>Check-In-Time</TableCell>

 

              <TableCell>Check-Out-Time</TableCell>

            </TableRow>

          </TableHead>

 

          <TableBody>

            {filteredAttendanceRecords.map((attendanceRecord, index) => (

              <TableRow key={index}>

                <TableCell>{attendanceRecord.employee_name}</TableCell>

 

                <TableCell>{attendanceRecord.employee_id}</TableCell>

 

                <TableCell>{attendanceRecord.employee_role}</TableCell>

 

                <TableCell>{attendanceRecord.date}</TableCell>

 

                <TableCell>{attendanceRecord.check_in}</TableCell>

 

                <TableCell>{attendanceRecord.check_out}</TableCell>

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </Paper>

    </>

  );

}