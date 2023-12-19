import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

export default function RelationData() {
  const [relation, setRelation] = useState({
    relation_type: ''
  });

  const [relationRecords, setRelationRecords] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRelation((prevRelation) => ({
      ...prevRelation,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newRelation = { ...relation };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/relationtype`, newRelation)
      .then((response) => {
        console.log(response.data); // Optional: Handle the response as needed
        setRelationRecords((prevRecords) => [...prevRecords, newRelation]);
        setRelation({ relation_type: '' });
        window.location.reload()
      })
      .catch((error) => {
        console.error(error); // Optional: Handle the error
      });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/relationtypes`)
      .then((response) => {
        console.log('API Response Data:', response.data); // Debugging: Check the API response data
        if (response.data.masterrelationship) {
          setRelationRecords(response.data.masterrelationship);
        }
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
          <h2>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Relation Type</h2>
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={handleOpen}>
                Add Relation Type
              </Button>
            </div>
            <br />
          </Grid>
        </Grid>
      </Card>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography variant="h6" component="h2" style={{ marginBottom: '3rem' }}>
            <h1> Relation Type</h1>
            <hr />
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={8}>
              Relation Type
              <TextField
                type="text"
                name="relation_type"
                placeholder="Relation Type"
                value={relation.relation_type}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                &nbsp;&nbsp;
                <Button type="submit" variant="contained" color="primary" onClick={handleClose}>
                  Close
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
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
                <TableCell>Relation Type</TableCell>
                <TableCell>Creation Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {relationRecords &&
                relationRecords.map((relationRecord, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{relationRecord.relation_type}</TableCell>
                    <TableCell>{relationRecord.created_at}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
