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

export default function PurityData() {
  const [purity, setPurity] = useState({
    date: '',
    purity_type: ''
  });

  const [purityRecords, setPurityRecords] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPurity((prevPurity) => ({
      ...prevPurity,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPurity = { ...purity };

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/purity`, newPurity)

      .then((response) => {
        console.log(response.data); // Optional: Handle the response as needed

        setPurityRecords((prevRecords) => [...prevRecords, newPurity]);

        setPurity({ date: '', purity_type: '' });
        window.location.reload()
      })

      .catch((error) => {
        console.error(error); // Optional: Handle the error
      });
  };

  useEffect(() => {
    axios

      .get(`${process.env.REACT_APP_BASE_URL}/api/purities`)

      .then((response) => {
        console.log(response.data.purities); // Optional: Handle the response as needed

        setPurityRecords(response.data.purities); // Update to access response.data.relationrates
      })

      .catch((error) => {
        console.error(error); // Optional: Handle the error
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
          <h3> &nbsp;&nbsp;&nbsp;purityType</h3>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              <br />
              &nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={handleOpen}>
                Add purity Type
              </Button>
            </div>

            <br />
          </Grid>
        </Grid>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '3rem' }}>
            <h1> purityType</h1>

            <hr />
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={10}>
              Date
              <TextField type="date" name="date" value={purity.date} onChange={handleChange} fullWidth />
            </Grid>

            <Grid item xs={12} sm={8}>
              purityType
              <TextField type="text" name="purity_type" value={purity.purity_type} onChange={handleChange} fullWidth />
            </Grid>

            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                &nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
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
              <TableCell />

              <TableRow>
                <TableCell>S.No</TableCell>

                <TableCell>Creation Date</TableCell>

                <TableCell>purityType</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {purityRecords.map((purityRecord, index) => (
                <TableRow key={index}>
                  <TableCell>{}</TableCell>

                  <TableCell>{purityRecord.date}</TableCell>

                  <TableCell>{purityRecord.purity_type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}