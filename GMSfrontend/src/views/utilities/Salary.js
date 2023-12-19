import { useEffect, useState } from 'react';

 

import { Form, Row } from 'react-bootstrap';

 

import 'bootstrap/dist/css/bootstrap.min.css';

 

import axios from 'axios';

 

import { Card, Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

 

 

export default function Salary() {

  const [salary, setSalary] = useState({

    employee_name: '',

    employee_id: '',

    total_working_days: '',

    total_leave_days: '',

    deduction: '',

    salary_perday: '',

    salary_amount: ''

  });

 

  const [salaryRecords, setSalaryRecords] = useState([]);

  const [filteredSalaryRecords, setFilteredSalaryRecords] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [error, setError] = useState(null);

 

  const handleChange = (event) => {

    const { name, value } = event.target;

    setSalary((prevSalary) => ({

      ...prevSalary,

      [name]: value

    }));

  };

 

  const handleSearchChange = (event) => {

    setSearchTerm(event.target.value);

  };

 

  const handleSubmit = (event) => {

    event.preventDefault();

    const newSalary = { ...salary };

 

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/salarydetail`, newSalary)

      .then((response) => {

        console.log(response.data);

        setSalaryRecords((prevRecords) => [...prevRecords, newSalary]);

        setSalary({

          employee_name: '',

          employee_id: '',

          total_working_days: '',

          total_leave_days: '',

          deduction: '',

          salary_perday: '',

          salary_amount: ''

        });

      })

      .catch((error) => {

        console.error(error);

      });

  };

 

  useEffect(() => {

    axios

      .get(`${process.env.REACT_APP_BASE_URL}/api/salarydetails`)

      .then((response) => {

        console.log(response.data);

        const { salarydetails } = response.data;

        if (Array.isArray(salarydetails)) {

          setSalaryRecords(salarydetails);

          setFilteredSalaryRecords(salarydetails);

        } else {

          throw new Error('Invalid data format');

        }

      })

      .catch((error) => {

        console.error('Error fetching salary data:', error);

        setError('Error fetching salary data');

      });

  }, []);

 

  useEffect(() => {

    const filteredRecords = salaryRecords.filter((record) => {

      const { employee_name,employee_id,total_working_days, total_leave_days, deduction, salary_perday, salary_amount } = record;

 

      const searchFields = [employee_name,employee_id,total_working_days, total_leave_days, deduction, salary_perday, salary_amount];

 

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

 

      return searchFields.some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));

    });

 

    setFilteredSalaryRecords(filteredRecords);

  }, [salaryRecords, searchTerm]);

 

  const responsivePadding = {

    padding: '20px',

    '@media (max-width: 600px)': {

      padding: '10px'

    },

    '@media (max-width: 400px)': {

      padding: '5px'

    }

  };

  return (

    <>

    <h3>PayRoll</h3>

    <div style={{ display: 'flex', height: '80vh' }}>

      <div style={{ flex: 1,  paddingLeft: '1px', display: 'flex' }}>

        <form className="container" onSubmit={handleSubmit}>

          <Paper elevation={20} style={{ width: '100%', height: '550px', marginTop: '04rem', ...responsivePadding }}>

            <Container maxWidth="lg">

              <Grid container spacing={3}>

                <Grid item xs={12}>

                  <Form.Label className="mb">

                    <br />

                    <h3>

                      <b>Salary Details</b>

                    </h3>

                  </Form.Label>

                  <hr className="hori-col-3" />

                  <Row className="mb-2">

                    <Form.Group controlId="formcustomername" className="col col-sm-6">

                      <Form.Label>

                        Employee Name<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="text"

                        className="form-control"

                        placeholder="Employee Name"

                        aria-label="Username"

                        aria-describedby="basic-addon1"

                        name="employee_name"

                        value={salary.employee_name}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                  </Row>

               

                  <Row className="mb-2">

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

                        value={salary.employee_id}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

               

                    <Form.Group controlId="formcustomername" className="col col-sm-6">

                      <Form.Label>

                        Total Working Days<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="text"

                        className="form-control"

                        placeholder="Total Working Days"

                        aria-label="Username"

                        aria-describedby="basic-addon1"

                        name="total_working_days"

                        value={salary.total_working_days}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                  </Row>

                  <Row mb="2">

                    <Form.Group controlId="formemployeerole" className="col col-sm-6">

                      <Form.Label>

                        Leave<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="number"

                        className="form-control"

                        placeholder="Leave"

                        aria-label="Username"

                        aria-describedby="basic-addon1"

                        name="total_leave_days"

                        value={salary.total_leave_days}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                    <Form.Group controlId="formDate" className="col col-sm-6">

                      <Form.Label>

                        Deduction<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="text"

                        className="form-control"

                        placeholder="Deduction"

                        aria-label="Username"

                        aria-describedby="basic-addon1"

                        name="deduction"

                        value={salary.deduction}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                  </Row>

                  <Row className="mb-2">

                    <Form.Group controlId="formGridAddress1" className="col col-sm-6">

                      <Form.Label>

                        Salary Perday<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="text"

                        className="form-control"

                        aria-describedby="basic-addon1"

                        name="salary_perday"

                        placeholder="Salary Perday"

                        value={salary.salary_perday}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                    <Form.Group controlId="formGridAddress2" className="col col-sm-6">

                      <Form.Label>

                        Salary<span style={{ color: 'red' }}>*</span>

                      </Form.Label>

                      <input

                        type="text"

                        className="form-control"

                        aria-describedby="basic-addon1"

                        name="salary_amount"

                        placeholder="Salary"

                        value={salary.salary_amount}

                        onChange={handleChange}

                        required

                      />

                    </Form.Group>

                  </Row>

                  <Row className="mb-3">

                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <Form.Group controlId="formGridCheckbox" className="col col-sm-6">

                      <br />

                      <button

                        type="submit"

                        className="me-4 btn btn-success btn-lg btn-block mx-auto d-block my-50"

                      >

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

    <br></br> <br></br> <br></br> <br></br> <br></br>

    <Card

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

      <Table>

        <TableHead>

          <br />

          <h6> &nbsp;&nbsp; &nbsp;&nbsp;Salary</h6>

          <TableRow>

            <TableCell colSpan={5}>

              <input

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

            <TableCell>Total Working Days</TableCell>

            <TableCell>Leave</TableCell>

            <TableCell>Deduction</TableCell>

            <TableCell>Salary Perday</TableCell>

            <TableCell>Salary</TableCell>

          </TableRow>

       

        </TableHead>

        <TableBody>

          {filteredSalaryRecords.map((salaryRecord, index) => (

            <TableRow key={index}>

                  <TableCell>{salaryRecord.employee_name}</TableCell>

              <TableCell>{salaryRecord.employee_id}</TableCell>

              <TableCell>{salaryRecord.total_working_days}</TableCell>

              <TableCell>{salaryRecord.total_leave_days}</TableCell>

              <TableCell>{salaryRecord.deduction}</TableCell>

              <TableCell>{salaryRecord.salary_perday}</TableCell>

              <TableCell>{salaryRecord.salary_amount}</TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

      {error && <p>Error fetching salary data</p>}

    </Card>

    </>

);

}