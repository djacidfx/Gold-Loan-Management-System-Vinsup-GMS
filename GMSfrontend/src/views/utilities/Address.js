import { Select } from '@material-ui/core';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import Webcam from 'react-webcam';

const Address = ({ onNextStep }) => {
  const documentCopyRef = React.useRef(null);
  const documentCopyRef1 = React.useRef(null);
  const documentCopyRef2 = React.useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [showWebcamDocumentCopy, setShowWebcamDocumentCopy] = useState(false);
  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);
  const [showWebcamDocumentCopy2, setShowWebcamDocumentCopy2] = useState(false);
  const [jewelData, setJewelData] = useState({
    jewel_type: '',
    purity: '',
    count: '',
    gross_weight: '',
    stone: '',
    wastage: '',
    net_weight: '',
    jewel_photo: '',
    jewel_type1: '',
    purity1: '',
    count1: '',
    gross_weight1: '',
    stone1: '',
    wastage1: '',
    net_weight1: '',
    jewel_photo1: '',
    jewel_type2: '',
    purity2: '',
    count2: '',
    gross_weight2: '',
    stone2: '',
    wastage2: '',
    net_weight2: '',
    jewel_photo2: ''
  });

  const handleDocumentCopyChange = useCallback(() => {
    const imageSrc = documentCopyRef.current.getScreenshot();

    console.log('jewel_photo captured:', imageSrc);

    setSelectedImage(imageSrc);
  }, []);
  const handleDocumentCopyChange1 = useCallback(() => {
    const imageSrc = documentCopyRef1.current.getScreenshot();

    console.log('jewel_photo1 captured:', imageSrc);

    setSelectedImage1(imageSrc);
  }, []);
  const handleDocumentCopyChange2 = useCallback(() => {
    const imageSrc = documentCopyRef2.current.getScreenshot();

    console.log('jewel_photo2 captured:', imageSrc);

    setSelectedImage2(imageSrc);
  }, []);

  const openWebcamForDocumentCopy = () => {
    setShowWebcamDocumentCopy(true);
  };
  const openWebcamForDocumentCopy1 = () => {
    setShowWebcamDocumentCopy1(true);
  };
  const openWebcamForDocumentCopy2 = () => {
    setShowWebcamDocumentCopy2(true);
  };
  const handleChange1 = (event) => {
    const { name, value } = event.target;
    setJewelData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const dataURItoBlob = (dataURI) => {
    if (!dataURI || typeof dataURI !== 'string' || !dataURI.startsWith('data:')) {
      return null; // Return null for invalid dataURIs
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

  const handleSubmit1 = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    const formdata = new FormData();

    const baseAttributes = ['jewel_type', 'purity', 'count', 'gross_weight', 'stone', 'wastage', 'net_weight'];

    // Loop through the images and other attributes
    for (let i = 0; i <= 9; i++) {
      // Looping up to 9 (0 to 9 inclusive)
      // ... rest of your code
      // Looping up to 9 (0 to 9 inclusive)
      const suffix = i.toString(); // Suffix to append to each attribute

      baseAttributes.forEach((attribute) => {
        formdata.append(`${attribute}${suffix}`, jewelData[`${attribute}${suffix}`]);
      });

      const blob = dataURItoBlob(window[`selectedImage${i + 1}`]);
      if (blob instanceof Blob) {
        formdata.append(`jewel_photo${suffix}`, blob, `jewel_photo${suffix}.jpg`);
      }
    }

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/jeweldetail`, formdata)
      .then((response) => {})
      .catch((error) => {});

    setJewelData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <form className="container" onSubmit={handleSubmit1}>
        <TableContainer component={Paper}>
          <Form.Label className="mb">
            <br />
            <h3>
              <b>Jewel Details</b>
            </h3>
          </Form.Label>
          <hr className="hori-col-3" />
          <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Jewel Type</b>
                </TableCell>

                <TableCell>
                  <b>Purity</b>
                </TableCell>

                <TableCell>
                  <b>Count</b>
                </TableCell>

                <TableCell>
                  <b>gross Weight</b>
                </TableCell>

                <TableCell>
                  <b>Stone Weight</b>
                </TableCell>
                <TableCell>
                  <b>Wastage</b>
                </TableCell>
                <TableCell>
                  <b>Net Weight</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow>
                <TableCell>
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-10">
                      <Form.Group controlId="formGridNominee" className="col col-sm-3">
                        <Select
                          name="jewel_type"
                          id="demo-simple-select"
                          value={jewelData.jewel_type}
                          label="Document"
                          onChange={handleChange1}
                          style={{ minWidth: '100px', height: '43px' }}
                        >
                          <MenuItem value="Necklace">Necklace</MenuItem>
                          <MenuItem value="Bracelet">Bracelet</MenuItem>
                          <MenuItem value="Bangles">Bangles</MenuItem>
                          <MenuItem value="Ring">Ring</MenuItem>
                        </Select>
                      </Form.Group>
                    </FormControl>
                  </Box>
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="purity" value={jewelData.purity} onChange={handleChange1} placeholder="purity." />
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="count" value={jewelData.count} onChange={handleChange1} placeholder="count." />
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="gross_weight"
                    value={jewelData.gross_weight}
                    onChange={(e) => setJewelData({ ...jewelData, gross_weight: e.target.value })}
                    placeholder="gross weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="stone"
                    value={jewelData.stone}
                    onChange={(e) => setJewelData({ ...jewelData, stone: e.target.value })}
                    placeholder="stone weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="wastage"
                    value={jewelData.wastage}
                    onChange={(e) => setJewelData({ ...jewelData, wastage: e.target.value })}
                    placeholder="Wastage"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="net_weight" value={jewelData.net_weight} readOnly placeholder="Net Weight" />
                </TableCell>
              </TableRow>
              <TableRow style={{ height: '10px' }}>
                <TableCell colSpan={7}>
                  <div style={{ position: 'relative' }}>
                    {showWebcamDocumentCopy ? (
                      <>
                        <Webcam audio={false} ref={documentCopyRef} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                        {selectedImage && (
                          <div style={{ position: 'absolute', top: 0, left: 0 }}>
                            <img
                              src={selectedImage}
                              alt="Captured"
                              style={{
                                width: '100%', // Adjust the width as needed

                                height: 'auto' // Let the height adjust proportionally
                              }}
                            />
                          </div>
                        )}

                        <IconButton onClick={handleDocumentCopyChange}>
                          <PhotoCameraIcon />
                          <span>Capture</span>
                        </IconButton>
                      </>
                    ) : (
                      <>
                        {selectedImage ? (
                          <img src={selectedImage} alt="jewel_photo" style={{ width: '30%', height: '30%' }} />
                        ) : (
                          <IconButton onClick={openWebcamForDocumentCopy}>
                            <PhotoCameraIcon />
                            <span>Web Cam</span>
                          </IconButton>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-10">
                      <Form.Group controlId="formGridNominee" className="col col-sm-3">
                        <Select
                          name="jewel_type1"
                          id="demo-simple-select"
                          value={jewelData.jewel_type1}
                          label="Document"
                          onChange={handleChange1}
                          style={{ minWidth: '100px', height: '43px' }}
                        >
                          <MenuItem value="Necklace">Necklace</MenuItem>
                          <MenuItem value="Bracelet">Bracelet</MenuItem>
                          <MenuItem value="Bangles">Bangles</MenuItem>
                          <MenuItem value="Ring">Ring</MenuItem>
                        </Select>
                      </Form.Group>
                    </FormControl>
                  </Box>
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="purity1" value={jewelData.purity1} onChange={handleChange1} placeholder="purity." />
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="count1" value={jewelData.count1} onChange={handleChange1} placeholder="count." />
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="gross_weight1"
                    value={jewelData.gross_weight1}
                    onChange={(e) => setJewelData({ ...jewelData, gross_weight1: e.target.value })}
                    placeholder="gross weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="stone1"
                    value={jewelData.stone1}
                    onChange={(e) => setJewelData({ ...jewelData, stone1: e.target.value })}
                    placeholder="stone weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="wastage1"
                    value={jewelData.wastage1}
                    onChange={(e) => setJewelData({ ...jewelData, wastage1: e.target.value })}
                    placeholder="Wastage"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="net_weight1" value={jewelData.net_weight1} readOnly placeholder="Net Weight" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ position: 'relative' }}>
                    {showWebcamDocumentCopy1 ? (
                      <>
                        <Webcam
                          audio={false}
                          ref={documentCopyRef1}
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

                        <IconButton onClick={handleDocumentCopyChange1}>
                          <PhotoCameraIcon />
                          <span>Capture</span>
                        </IconButton>
                      </>
                    ) : (
                      <>
                        {selectedImage1 ? (
                          <img src={selectedImage1} alt="jewel_photo" style={{ width: '30%', height: '30%' }} />
                        ) : (
                          <IconButton onClick={openWebcamForDocumentCopy1}>
                            <PhotoCameraIcon />
                            <span>Web Cam</span>
                          </IconButton>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box sx={{ mr: 2 }}>
                    <FormControl className="col col-sm-10">
                      <Form.Group controlId="formGridNominee" className="col col-sm-3">
                        <Select
                          name="jewel_type2"
                          id="demo-simple-select"
                          value={jewelData.jewel_type2}
                          label="Document"
                          onChange={handleChange1}
                          style={{ minWidth: '100px', height: '43px' }}
                        >
                          <MenuItem value="Necklace">Necklace</MenuItem>
                          <MenuItem value="Bracelet">Bracelet</MenuItem>
                          <MenuItem value="Bangles">Bangles</MenuItem>
                          <MenuItem value="Ring">Ring</MenuItem>
                        </Select>
                      </Form.Group>
                    </FormControl>
                  </Box>
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="purity2" value={jewelData.purity2} onChange={handleChange1} placeholder="purity." />
                </TableCell>

                <TableCell>
                  <MDBInput type="text" name="count2" value={jewelData.count2} onChange={handleChange1} placeholder="count." />
                </TableCell>

                <TableCell>
                  <MDBInput
                    type="text"
                    name="gross_weight2"
                    value={jewelData.gross_weight2}
                    onChange={(e) => setJewelData({ ...jewelData, gross_weight1: e.target.value })}
                    placeholder="gross weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="stone2"
                    value={jewelData.stone2}
                    onChange={(e) => setJewelData({ ...jewelData, stone2: e.target.value })}
                    placeholder="stone weight"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput
                    type="text"
                    name="wastage2"
                    value={jewelData.wastage2}
                    onChange={(e) => setJewelData({ ...jewelData, wastage2: e.target.value })}
                    placeholder="Wastage"
                  />
                </TableCell>
                <TableCell>
                  <MDBInput type="text" name="net_weight2" value={jewelData.net_weight2} readOnly placeholder="Net Weight" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={7}>
                  <div style={{ position: 'relative' }}>
                    {showWebcamDocumentCopy2 ? (
                      <>
                        <Webcam
                          audio={false}
                          ref={documentCopyRef2}
                          screenshotFormat="image/jpeg"
                          style={{ width: '30%', height: '30%' }}
                        />

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

                        <IconButton onClick={handleDocumentCopyChange2}>
                          <PhotoCameraIcon />
                          <span>Capture</span>
                        </IconButton>
                      </>
                    ) : (
                      <>
                        {selectedImage2 ? (
                          <img src={selectedImage2} alt="jewel_photo2" style={{ width: '30%', height: '30%' }} />
                        ) : (
                          <IconButton onClick={openWebcamForDocumentCopy2}>
                            <PhotoCameraIcon />
                            <span>Web Cam</span>
                          </IconButton>
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <button onClick={onNextStep}>Next</button>
        <button onClick={onNextStep}>Submit</button>
      </form>
    </div>
  );
};

export default Address;