import React, { useCallback, useEffect, useState } from 'react';

import { Form, Row } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

import IconButton from '@mui/material/IconButton';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import Webcam from 'react-webcam';

import { Container, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const Owner = () => {
  const documentCopy1Ref = React.useRef(null);

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);

  const [owner, setOwner] = useState({
    bank_name: '',

    address: '',

    phone_no: '',

    repledge_date: '',

    packet_no: '',

    count: '',

    total_weight: '',

    interest_rate: '',

    document_copy: '',

    remarks: ''
  });

  const [ownerRecords, setOwnerRecords] = useState([]);

  const [filteredOwnerRecords, setFilteredOwnerRecords] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setOwner({
      ...owner,

      [event.target.name]: event.target.value
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

    formData.append('bank_name', owner.bank_name);

    formData.append('address', owner.address);

    formData.append('phone_no', owner.phone_no);

    formData.append('repledge_date', owner.repledge_date);

    formData.append('packet_no', owner.packet_no);

    formData.append('count', owner.count);

    formData.append('total_weight', owner.total_weight);

    formData.append('interest_rate', owner.interest_rate);

    formData.append('document_copy', owner.document_copy);

    formData.append('remarks', owner.remarks);

    axios

      .post(`${process.env.REACT_APP_BASE_URL}/api/repledgeowner`, formData)

      .then((response) => {})

      .catch((error) => {});

    setOwner((prevData) => ({
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

  useEffect(() => {
    const filteredRecords = ownerRecords.filter((record) => {
      const { bank_name, address, phone_no, repledge_date, packet_no, count, total_weight, interest_rate, document_copy, remarks } = record;

      const searchFields = [
        bank_name,

        address,

        phone_no,

        repledge_date,

        packet_no,

        count,

        total_weight,

        interest_rate,

        document_copy,

        remarks
      ];

      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return searchFields.some((field) => field.toLowerCase().includes(lowerCaseSearchTerm));
    });

    setFilteredOwnerRecords(filteredRecords);
  }, [ownerRecords, searchTerm]);

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
      <h2>Owner</h2>
      <div style={{ display: 'flex', height: '80vh' }}>
        <div style={{ flex: 1, paddingLeft: '1px', display: 'flex' }}>
          <form className="container" onSubmit={handleSubmit}>
            <Paper elevation={20} style={{ width: '100%', height: '650px', marginTop: '02rem', ...responsivePadding }}>
              <Container maxWidth="lg">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Form.Label className="mb">
                      <br />

                      <h3>
                        <b>Bank Account</b>
                      </h3>
                    </Form.Label>

                    <hr className="hori-col-3" />

                    <Row className="mb-2">
                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label>
                          Bank Name<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Bank Name"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="bank_name"
                          value={owner.bank_name}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label>
                          Address<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="address"
                          value={owner.address}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label>
                          Phone No<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Phone Number"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="phone_no"
                          value={owner.phone_no}
                          onChange={handleChange}
                          pattern="[0-9. ]+" // Regex pattern for alphabets and dots
                          title="Please enter valid input"
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formcustomername" className="col col-sm-6">
                        <Form.Label>
                          Repledge Date<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="date"
                          className="form-control"
                          placeholder="Repledge Date"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="repledge_date"
                          value={owner.repledge_date}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row mb="2">
                      <Form.Group controlId="formemployeerole" className="col col-sm-6">
                        <Form.Label>
                          Packet No<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Packet No"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="packet_no"
                          value={owner.packet_no}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formDate" className="col col-sm-6">
                        <Form.Label>
                          Count<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          placeholder="Count"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                          name="count"
                          value={owner.count}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridAddress1" className="col col-sm-6">
                        <Form.Label>
                          Total Weight<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="basic-addon1"
                          name="total_weight"
                          placeholder="Total Weight"
                          value={owner.total_weight}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formGridAddress2" className="col col-sm-6">
                        <Form.Label>
                          Interest Rate<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="basic-addon1"
                          name="interest_rate"
                          placeholder="Interest Rate"
                          value={owner.interest_rate}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-2">
                      <Form.Group controlId="formGridAddress1" className="col col-sm-6">
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

                              <IconButton onClick={handleDocumentCopy1Change}>
                                <PhotoCameraIcon style={{ color: 'blue' }} />

                                <span>Capture</span>
                              </IconButton>
                            </>
                          ) : (
                            <>
                              {selectedImage1 ? (
                                <img src={selectedImage1} alt="Document Copy 1" style={{ width: '30%', height: '30%' }} />
                              ) : (
                                <IconButton onClick={openWebcamForDocumentCopy1}>
                                  <PhotoCameraIcon style={{ color: 'blue' }} />

                                  <span style={{ color: 'black', fontSize: '15px' }}>Webcam</span>
                                </IconButton>
                              )}
                            </>
                          )}
                        </div>
                      </Form.Group>

                      <Form.Group controlId="formGridAddress1" className="col col-sm-6">
                        <Form.Label>
                          Remarks<span style={{ color: 'red' }}>*</span>
                        </Form.Label>

                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="basic-addon1"
                          name="remarks"
                          placeholder="Remarks"
                          value={owner.remarks}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
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
      <br></br> <br></br> <br></br> <br></br> <br></br>
      <Paper elevation={20} style={{ width: '100%', height: '450px', marginTop: '07rem' }}>
        <Table>
          <TableHead>
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
              <TableCell>Bank Name</TableCell>

              <TableCell>Address</TableCell>

              <TableCell>Phone No</TableCell>

              <TableCell>Repledge Date</TableCell>

              <TableCell> Packet No</TableCell>

              <TableCell>Count</TableCell>

              <TableCell> Total Weight</TableCell>

              <TableCell> Interest Rate</TableCell>

              <TableCell> Remarks</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredOwnerRecords.map((ownerRecord, index) => (
              <TableRow key={index}>
                <TableCell>{ownerRecord.bank_name}</TableCell>

                <TableCell>{ownerRecord.address}</TableCell>

                <TableCell>{ownerRecord.phone_no}</TableCell>

                <TableCell>{ownerRecord.repledge_date}</TableCell>

                <TableCell>{ownerRecord.packet_no}</TableCell>

                <TableCell>{ownerRecord.count}</TableCell>

                <TableCell>{ownerRecord.total_weight}</TableCell>

                <TableCell>{ownerRecord.interest_rate}</TableCell>

                <TableCell>{ownerRecord.remarks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {error && <p>Error fetching owner data</p>}
      </Paper>
    </>
  );
};

export default Owner;
