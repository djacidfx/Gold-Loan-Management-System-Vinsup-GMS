import { useEffect, useState } from 'react';
import img1 from '../pages/authentication/auth-forms/Login.png';
//import { Storage } from 'aws-amplify';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';



import { makeStyles } from '@mui/styles'; // Update the import statement



import EditIcon from '@mui/icons-material/Edit';



import DeleteIcon from '@mui/icons-material/Delete';



import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



import Card from '@mui/material/Card';



import { ImageListItemBar } from '@mui/material';



import { Form } from 'react-bootstrap';



import './Print.css';



import AWS from 'aws-sdk';



AWS.config.update({

  accessKeyId: process.env.REACT_APP_ACCESS_KEY,



  secretAccessKey: process.env.REACT_APP_SECRET_KEY,



  region: process.env.REACT_APP_REGION

});



const s3 = new AWS.S3();



const useStyles = makeStyles({

  dialogContent: {

    fontSize: '58px'

  },



  dialogContainer: {

    minWidth: '1000px'

  },



  tableHeader: {

    backgroundColor: '#f0f0f0',



    color: 'black',



    fontWeight: 'bold',



    border: '1px solid grey'

  },



  TableCell: {

    width: '150px',



    border: '1px solid grey'

  },



  TableRowSpacing: {

    padding: '5px'

  },



  TableRowSpacing1: {

    padding: '45px'

  },



  TableRowSpacing2: {

    padding: '40px'

  },



  TableRowSpacing3: {

    padding: '27px'

  },



  TableRowSpacing4: {

    padding: '46px'

  },



  TableRowSpacing5: {

    padding: '35px'

  },



  TableRowSpacing6: {

    padding: '43px'

  },



  TableRowSpacing7: {

    padding: '45px'

  },



  TableRowSpacing8: {

    padding: '33px'

  },



  TableRowSpacing9: {

    padding: '10px'

  },



  TableRowSpacing10: {

    padding: '20px'

  },



  TableRowSpacing11: {

    padding: '9px'

  }

});



const List = () => {

  const [customers, setCustomers] = useState([]);



  const [searchId, setSearchId] = useState('');



  const [filteredCustomers, setFilteredCustomers] = useState([]);



  const [error, setError] = useState(null);



  const [selectedCustomerId, setSelectedCustomerId] = useState(null);



  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);



  const [customerToDelete, setCustomerToDelete] = useState(null);



  const [selectedCustomer, setSelectedCustomer] = useState(null);



  const [editedCustomerData, setEditedCustomerData] = useState({});



  const [openEditDialog, setOpenEditDialog] = useState(false);



  const classes = useStyles();



  useEffect(() => {

    axios



      .get(`${process.env.REACT_APP_BASE_URL}/api/customers`)



      .then((response) => {

        const customersData = response.data.customers;



        if (!Array.isArray(customersData)) {

          throw new Error('Invalid data format');

        }



        setCustomers(customersData);



        setFilteredCustomers(customersData);

      })



      .catch((error) => {

        console.error('Error fetching customer data:', error);



        if (error.response) {

          console.error('Response data:', error.response.data);



          console.error('Response status:', error.response.status);

        }



        setError('Error fetching customer data');

      });

  }, []);



  useEffect(() => {

    if (searchId) {

      const filtered = customers.filter(

        (customer) =>

          customer.customer_name.toLowerCase().includes(searchId.toLowerCase()) ||

          customer.customer_id.toString().includes(searchId.toLowerCase()) ||

          customer.document_number1.toString().includes(searchId.toLowerCase())

      );



      setFilteredCustomers(filtered);

    } else {

      setFilteredCustomers(customers);

    }

  }, [searchId, customers]);



  const handleSearchChange = (event) => {

    setSearchId(event.target.value);

  };



  const handleDelete = (customerId) => {

    setCustomerToDelete(customerId);



    setDeleteDialogOpen(true);

  };



  const confirmDelete = () => {

    if (customerToDelete) {

      axios



        .delete(`${process.env.REACT_APP_BASE_URL}/api/customers/${customerToDelete}`)



        .then((response) => {

          const newCustomers = customers.filter((customer) => customer.customer_id !== customerToDelete);



          setCustomers(newCustomers);



          setDeleteDialogOpen(false);



          setCustomerToDelete(null);

        })



        .catch((error) => {

          console.error('Error deleting customer data:', error);



          if (error.response) {

            console.error('Response data:', error.response.data);



            console.error('Response status:', error.response.status);

          }



          setError('Error deleting customer data');

        });

    }

  };



  const cancelDelete = () => {

    setDeleteDialogOpen(false);



    setCustomerToDelete(null);

  };



  const handleRename = (customerId) => {

    // Add your logic for handling the rename action

  };



  const handleView = (customer) => {

    setSelectedCustomer(customer);

  };



  const closeDetailsDialog = () => {

    setSelectedCustomer(null);

  };



  const handleEdit = (customerId) => {

    const customer = customers.find((customer) => customer.customer_id === customerId);



    if (customer) {

      setEditedCustomerData(customer);



      setSelectedCustomerId(customerId);



      setOpenEditDialog(true);

    }

  };



  const handleEditChange = (event) => {

    const { name, value, type } = event.target;



    // If the input type is 'file', get the selected file



    if (type === 'file') {

      const file = event.target.files[0];



      setEditedCustomerData({

        ...editedCustomerData,



        [name]: file

      });

    } else {

      // If the input type is not 'file', update the state with the new value



      setEditedCustomerData({

        ...editedCustomerData,



        [name]: value

      });

    }

  };



  const updateCustomerImageInDatabase = (imageUrl) => {

    // Update the customer data with the new image URL



    const updatedCustomerData = {

      ...editedCustomerData,



      customer_image: imageUrl

    };



    // Assuming you have an API endpoint to update the customer data in the database



    axios



      .put(

        `${process.env.REACT_APP_BASE_URL}/api/customers/${selectedCustomerId}`,



        updatedCustomerData

      )



      .then((response) => {

        console.log('Customer data updated with image URL:', response.data);



        // Close the edit dialog



        setOpenEditDialog(false);



        setSelectedCustomerId(null);

      })



      .catch((error) => {

        console.error('Error updating customer data:', error);



        // Handle error and display appropriate message to the user

      });

  };



  const handleSaveEdit = () => {

    // If the customer image is changed, upload the new image to S3 and get the URL



    if (editedCustomerData.customer_image instanceof File) {

      const file = editedCustomerData.customer_image;



      const filename = file.name;



      const key = `${filename}`;



      // Use the custom function to generate the image name



      s3.upload(

        {

          Bucket: process.env.REACT_APP_AWS_BUCKET,



          Key: filename,



          Body: file



          // Set the ACL to allow public read access to the uploaded image

        },



        (err, data) => {

          if (err) {

            console.error('Error uploading image to S3:', err);



            return;

          }



          // Update the customer data with the image name



          setEditedCustomerData({

            ...editedCustomerData,



            customer_image: key

          });



          // Now you can proceed with saving the other customer data to your API



          axios



            .put(`${process.env.REACT_APP_BASE_URL}/api/customers/${selectedCustomerId}`, {

              ...editedCustomerData,



              customer_image: key

            })



            .then((response) => {

              // Update the customer data in the local state or perform any necessary actions



              console.log('Customer data updated:', response.data);



              // Close the edit dialog



              setOpenEditDialog(false);



              setSelectedCustomerId(null);

            })



            .catch((error) => {

              console.error('Error updating customer data:', error);



              // Handle error and display an appropriate message to the user

            });

        }

      );

    } else {

      // If the customer image is not changed, proceed with saving the customer data to your API



      const imageUrlToUpdate = editedCustomerData.customer_image;



      axios



        .put(`${process.env.REACT_APP_BASE_URL}/api/customers/${selectedCustomerId}`, {

          ...editedCustomerData,



          customer_image: imageUrlToUpdate

        })



        .then((response) => {

          // Update the customer data in the local state or perform any necessary actions



          console.log('Customer data updated:', response.data);



          // Close the edit dialog



          setOpenEditDialog(false);



          setSelectedCustomerId(null);

        })



        .catch((error) => {

          console.error('Error updating customer data:', error);



          // Handle error and display an appropriate message to the user

        });

    }

  };



  const handleEditDialogClose = () => {

    setEditedCustomerData({});



    setOpenEditDialog(false);



    setSelectedCustomerId(null);

  };



  const handlePrint = () => {

    window.print();

  };



  return (

    <div>

      <Card>

        <br></br>



        <h3>

          &nbsp;&nbsp;<b>Customer List</b>

        </h3>



        <br></br>



        {error && <div>Error: {error}</div>}



        <TextField

          label="Search by Customer ID or Name"

          value={searchId}

          onChange={handleSearchChange}

          fullWidth

          style={{ marginBottom: '1rem', transform: 'scale(0.8)' }}

        />



        <center><TableContainer component={Paper}>

          <Table

            className="table table-hover table-bordered"

            style={{ size: 'small', transform: 'scale(0.9)' }}

            bordered

            sx={{ minWidth: 300 }}

            aria-label="simple table"

          >

            <TableHead>

              <TableRow>

                <TableCell className={classes.tableHeader} style={{ fontFamily: 'poppins', border: '1px solid #000' }}>

                  Customer ID

                </TableCell>



                <TableCell className={classes.tableHeader} style={{ fontFamily: 'poppins', border: '1px solid #000' }}>

                  Customer Name

                </TableCell>



                <TableCell className={classes.tableHeader} style={{ fontFamily: 'poppins', border: '1px solid #000' }}>

                  Mobile Number

                </TableCell>



                <TableCell className={classes.tableHeader} style={{ fontFamily: 'poppins', border: '1px solid #000' }}>

                  Address

                </TableCell>



                <TableCell className={classes.tableHeader} style={{ fontFamily: 'poppins', border: '1px solid #000' }}>

                  Actions

                </TableCell>

              </TableRow>

            </TableHead>



            <TableBody>

              {filteredCustomers.map((customer, index) => (

                <TableRow key={index}>

                  <TableCell style={{ border: '1px solid #000' }} className={classes.customerID}>

                    {customer.customer_id}

                  </TableCell>



                  <TableCell style={{ border: '1px solid #000' }}>{customer.customer_name}</TableCell>



                  <TableCell style={{ border: '1px solid #000' }}>{customer.mobile_number}</TableCell>



                  <TableCell style={{ border: '1px solid #000' }}>{customer.address_line_one}</TableCell>



                  <TableCell style={{ border: '1px solid #000' }}>

                    <IconButton onClick={() => handleView(customer)} style={{ color: '#007BFF' }}>

                      <RemoveRedEyeIcon />

                    </IconButton>



                    <IconButton onClick={() => handleDelete(customer.customer_id)} style={{ color: '#FF0000' }}>

                      <DeleteIcon />

                    </IconButton>



                    <IconButton onClick={() => handleEdit(customer.customer_id)} style={{ color: '#28A745' }}>

                      <EditIcon />

                    </IconButton>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer></center>



        {selectedCustomerId && (

          <div>

            <Dialog open={openEditDialog} onClose={handleEditDialogClose} classes={{ paper: classes.dialogContainer }}>

              <DialogTitle>

                <h3>

                  <b>Edit Customer</b>

                </h3>

              </DialogTitle>



              <DialogContent>

                <Grid container spacing={2}>

                  <Grid item xs={12} sm={3}>

                    <Form.Label>Customer Name</Form.Label>



                    <TextField

                      name="customer_name"

                      size="small"

                      value={editedCustomerData.customer_name || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Customer Image</Form.Label>



                    <input

                      type="file"

                      name="customer_image"

                      accept="image/*" // Specify the accepted file types (e.g., images only)

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Date of Birth</Form.Label>



                    <TextField

                      type="date"

                      name="date_of_birth"

                      size="small"

                      value={editedCustomerData.date_of_birth || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Gender</Form.Label>



                    <TextField name="gender" size="small" value={editedCustomerData.gender || ''} onChange={handleEditChange} fullWidth />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Mobile Number</Form.Label>



                    <TextField

                      name="mobile_number"

                      size="small"

                      value={editedCustomerData.mobile_number || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Address Line 1</Form.Label>



                    <TextField

                      name="address_line_one"

                      size="small"

                      value={editedCustomerData.address_line_one || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Address Line 2</Form.Label>



                    <TextField

                      name="address_line_one"

                      size="small"

                      value={editedCustomerData.address_line_two || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>city</Form.Label>



                    <TextField name="city" size="small" value={editedCustomerData.city || ''} onChange={handleEditChange} fullWidth />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>State</Form.Label>



                    <TextField name="state" size="small" value={editedCustomerData.state || ''} onChange={handleEditChange} fullWidth />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Document Type</Form.Label>



                    <TextField

                      name="document_type1"

                      size="small"

                      value={editedCustomerData.document_type1 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Document</Form.Label>



                    <TextField

                      name="document1"

                      size="small"

                      value={editedCustomerData.document1 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={15} sm={3}>

                    <Form.Label>Document Number</Form.Label>



                    <TextField

                      name="document_number1"

                      size="small"

                      value={editedCustomerData.document_number1 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <br></br>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Document Type</Form.Label>



                    <TextField

                      name="document_type2"

                      size="small"

                      value={editedCustomerData.document_type2 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Document Copy</Form.Label>



                    <input

                      type="file"

                      name="document_copy1"

                      accept="image/*" // Specify the accepted file types (e.g., images only)

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={12} sm={3}>

                    <Form.Label>Document</Form.Label>



                    <TextField

                      name="document2"

                      size="small"

                      value={editedCustomerData.document2 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={15} sm={3}>

                    <Form.Label>Document Number</Form.Label>



                    <TextField

                      name="document_number2"

                      size="small"

                      value={editedCustomerData.document_number2 || ''}

                      onChange={handleEditChange}

                      fullWidth

                    />

                  </Grid>



                  <Grid item xs={15} sm={3}>

                    <Form.Label>Edited by</Form.Label>



                    <TextField

                      name="verified_by"

                      size="small"

                      value={editedCustomerData.verified_by || ''}

                      onChange={handleEditChange}

                      fullWidth

                      required

                    />

                  </Grid>



                  {/* Add other form fields for editing customer details here */}

                </Grid>

              </DialogContent>



              <DialogActions>

                <Button onClick={handleEditDialogClose}>Cancel</Button>



                <Button onClick={handleSaveEdit} color="primary">

                  Save

                </Button>

              </DialogActions>

            </Dialog>

          </div>

        )}



        <Dialog open={deleteDialogOpen} onClose={cancelDelete}>

          <DialogTitle>

            <b>Delete Confirmation</b>

          </DialogTitle>



          <DialogContent>Are you sure you want to delete this customer data?</DialogContent>



          <DialogActions>

            <Button onClick={cancelDelete} color="primary">

              Cancel

            </Button>



            <Button onClick={confirmDelete} color="primary">

              Delete

            </Button>

          </DialogActions>

        </Dialog>



        <Dialog open={!!selectedCustomer} onClose={closeDetailsDialog} className="print-dialog">
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
                }}
              >
                Customer Details {new Date().toLocaleDateString()}
              </h3>
            </Typography>
          </div>
          <DialogContent className={classes.dialogContent}>
            <Box mt={1}>

              <ImageList rowHeight={160} cols={3}>
                {selectedCustomer?.customer_image ? (
                  <ImageListItem key={selectedCustomer.customer_image}>
                    <img
                      src={`${selectedCustomer.customer_image}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback-image.jpg';
                      }} />
                    <ImageListItemBar title={selectedCustomer.customer_name} />
                  </ImageListItem>
                ) : (
                  <div>No image available</div>
                )}
              </ImageList>
            </Box>
            {/* Display customer details here */}
            <center><TableContainer>

              <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 300 }} aria-label="simple table">

                <TableBody>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Customer Name</b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.customer_name}</TableCell>

                  </TableRow>



                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Customer ID</b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.customer_id}</TableCell>

                  </TableRow>



                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Mobile Number</b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.mobile_number}</TableCell>

                  </TableRow>



                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Address</b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.address_line_one}</TableCell>

                  </TableRow>



                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>City </b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.city}</TableCell>

                  </TableRow>



                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>State</b>

                    </TableCell>



                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.state}</TableCell>

                  </TableRow>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Country</b>

                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.country}</TableCell>

                  </TableRow>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>C/O </b>

                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.care_of_type}</TableCell>

                  </TableRow>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Name </b>

                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.care_of_name}</TableCell>

                  </TableRow>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Document </b>

                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.document1}</TableCell>

                  </TableRow>

                  <TableRow>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>

                      <b>Document Number </b>{' '}

                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '150px' }}>{selectedCustomer?.document_number1}</TableCell>
                  
                  </TableRow>
                
                </TableBody>
              
              </Table>
           
            </TableContainer></center>
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
      </Card>
    </div>
  );
};
export default List;