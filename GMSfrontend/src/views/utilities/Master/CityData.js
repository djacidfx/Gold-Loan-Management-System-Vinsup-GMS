import { useEffect, useState } from 'react';

import axios from 'axios';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';

import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { TextField } from '@mui/material';

import Card from '@mui/material/Card';

const style = {
  position: 'absolute',

  top: '35%',

  left: '50%',

  transform: 'translate(-50%, -50%)',

  width: 400,

  bgcolor: 'background.paper',

  border: '1px solid #000',

  boxShadow: 24,

  p: 4
};

export default function City() {
  const [city, setCity] = useState({
    city_name: '',

    pincode: '',

    creation_date: ''
  });

  const [cityRecords, setCityRecords] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCity((prevCity) => ({
      ...prevCity,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCity = { ...city };

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/city`, newCity)

      .then((response) => {
        console.log(response.data); // Optional: Handle the response as needed

        setCityRecords((prevRecords) => [...prevRecords, newCity]);

        setCity({ city_name: '', pincode: '' });
        window.location.reload()
      })

      .catch((error) => {
        console.error(error); // Optional: Handle the error
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/cities`)
      .then((response) => {
        console.log('Response Data:', response.data);
        setCityRecords(response.data.mastercity); // Using the key 'mastercity' here
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <div>
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
        <Typography variant="subtitle1">
          <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City Name</h2>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={handleOpen}>
                Add City
              </Button>
            </div>

            <br />
          </Grid>
        </Grid>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '3rem' }}>
            <h1> Add City</h1>

            <hr />
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={8}>
              City Name
              <TextField
                type="text"
                name="city_name"
                placeholder="Today city Rate"
                value={city.city_name}
                onChange={handleChange}
                fullWidth
              />
            </Grid>


              <Grid item xs={12} sm={8}>
                <br></br>
                Pincode
                <TextField
                  type="text"
                  name="pincode"
                  placeholder="Today city Rate"
                  value={city.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <br></br>
                &nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
   
          </form>
        </Box>
      </Modal>

      <br />

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
        <TableContainer component={Paper}>
          <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>City Name</TableCell>
                <TableCell>Pincode</TableCell>
                <TableCell>Date</TableCell> {/* Status header */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cityRecords &&
                cityRecords.map((cityRecord, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{cityRecord.city_name}</TableCell>
                    <TableCell>{cityRecord.pincode}</TableCell>
                    <TableCell>{cityRecord.created_at}</TableCell>
                    <TableCell>{/* Actions here */}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
