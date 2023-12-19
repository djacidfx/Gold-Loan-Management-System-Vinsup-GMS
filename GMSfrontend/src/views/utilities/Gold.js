import { useEffect, useState } from 'react';

import axios from 'axios';

import { Form } from 'react-bootstrap';

import Button from '@mui/material/Button';

import Typography from '@mui/material/Typography';

import Modal from '@mui/material/Modal';

import {
    Box,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';

import { TextField } from '@mui/material';

import Card from '@mui/material/Card';

import { makeStyles } from '@mui/styles';

const style = {
  position: 'absolute',

  top: '25%',

  left: '50%',

  transform: 'translate(-50%, -50%)',

  width: 400,

  bgcolor: 'background.paper',

  border: '1px solid #000',

  boxShadow: 24,

  p: 4
};

const useStyles = makeStyles({
  table: {
    minWidth: 650,

    '& .MuiTableCell-root': {
      border: '1px solid black'
    }
  }
});

export default function Gold() {
  const [gold, setGold] = useState({
    date: '',

    timing: '',

    carat_22: '',

    carat_24: ''
  });

  const [goldRecords, setGoldRecords] = useState([]);

  const classes = useStyles();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setGold((prevGold) => ({
      ...prevGold,

      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newGold = { ...gold };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/goldrate`, newGold)

      .then((response) => {
        console.log(response.data); // Optional: Handle the response as needed

        setGoldRecords((prevRecords) => [...prevRecords, newGold]);

        setGold({ date: '', timing: '', carat_22: '', carat_24: '' });
      })

      .catch((error) => {
        console.error(error); // Optional: Handle the error
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/goldrates`)

      .then((response) => {
        console.log(response.data.goldrates); // Optional: Handle the response as needed

        setGoldRecords(response.data.goldrates); // Update to access response.data.goldrates
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
          <h2> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Today Gold Rate</h2>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={handleOpen}>
                Gold Rate Update
              </Button>
            </div>

            <br />
          </Grid>
        </Grid>
      </Card>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '3rem' }}>
            <h1> Gold Rate</h1>

            <hr />
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                Date:
                <TextField type="date" name="date" value={gold.date} onChange={handleChange} fullWidth />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Group controlId="formGridC/O" className="col col-sm-2">
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-6">
                      <Form.Label>Timing</Form.Label>

                      <InputLabel id="demo-simple-select-label" />

                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gold.timing}
                        name="timing"
                        onChange={handleChange}
                        style={{ minWidth: '140px', height: '53px' }}
                      >
                        <MenuItem value="Morning">Morning</MenuItem>

                        <MenuItem value="Evening">Evening</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Form.Group>
              </Grid>

              <Grid item xs={12} sm={6}>
                22 Carat:
                <TextField
                  type="text"
                  name="carat_22"
                  placeholder="Today Gold Rate"
                  value={gold.carat_22}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                24 carat:
                <TextField
                  type="text"
                  name="carat_24"
                  placeholder="Today Gold Rate"
                  value={gold.carat_24}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

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
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <h2><b>Today Gold Rate</b></h2>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableRow>
              <TableCell align="center"><h3>Date</h3></TableCell>

              <TableCell align="center"><h3>Timing</h3></TableCell>

              <TableCell align="center"><h3>22 Carat</h3></TableCell>

              <TableCell align="center"><h3>24 Carat</h3></TableCell>
            </TableRow>

            <TableBody>
              {goldRecords.map((goldRecord, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{goldRecord.date}</TableCell>

                  <TableCell align="center">{goldRecord.timing}</TableCell>

                  <TableCell align="center">{goldRecord.carat_22}</TableCell>

                  <TableCell align="center">{goldRecord.carat_24}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}