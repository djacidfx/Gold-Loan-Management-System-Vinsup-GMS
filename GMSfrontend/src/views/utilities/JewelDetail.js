import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBInput } from 'mdb-react-ui-kit';
import React, { useCallback, useState } from 'react';
import { Form } from 'react-bootstrap';
import Webcam from 'react-webcam';

import axios from 'axios';
const JewelDetail = () => {

  const documentCopy1Ref = React.useRef(null);

  const documentCopy2Ref = React.useRef(null);

  const documentCopy3Ref = React.useRef(null);

  const documentCopy4Ref = React.useRef(null);

  const documentCopy5Ref = React.useRef(null);

  const documentCopy6Ref = React.useRef(null);

  const documentCopy7Ref = React.useRef(null);

  const documentCopy8Ref = React.useRef(null);

  const documentCopy9Ref = React.useRef(null);

  const documentCopy10Ref = React.useRef(null);

  const [selectedImage1, setSelectedImage1] = useState(null);

  const [selectedImage2, setSelectedImage2] = useState(null);

  const [selectedImage3, setSelectedImage3] = useState(null);

  const [selectedImage4, setSelectedImage4] = useState(null);

  const [selectedImage5, setSelectedImage5] = useState(null);

  const [selectedImage6, setSelectedImage6] = useState(null);

  const [selectedImage7, setSelectedImage7] = useState(null);

  const [selectedImage8, setSelectedImage8] = useState(null);

  const [selectedImage9, setSelectedImage9] = useState(null);

  const [selectedImage10, setSelectedImage10] = useState(null);

  const [showWebcamDocumentCopy1, setShowWebcamDocumentCopy1] = useState(false);

  const [showWebcamDocumentCopy2, setShowWebcamDocumentCopy2] = useState(false);

  const [showWebcamDocumentCopy3, setShowWebcamDocumentCopy3] = useState(false);

  const [showWebcamDocumentCopy4, setShowWebcamDocumentCopy4] = useState(false);

  const [showWebcamDocumentCopy5, setShowWebcamDocumentCopy5] = useState(false);

  const [showWebcamDocumentCopy6, setShowWebcamDocumentCopy6] = useState(false);

  const [showWebcamDocumentCopy7, setShowWebcamDocumentCopy7] = useState(false);

  const [showWebcamDocumentCopy8, setShowWebcamDocumentCopy8] = useState(false);

  const [showWebcamDocumentCopy9, setShowWebcamDocumentCopy9] = useState(false);

  const [showWebcamDocumentCopy10, setShowWebcamDocumentCopy10] = useState(false);

  const [jewelData, setJewelData] = useState({

    jewel_type: '',
    purity: '',
    count: '',
    gross_weight: '',
    stone: '',
    wastage: '',
    net_weight: '',
    jewel_type1: '',
    purity1: '',
    count1: '',
    gross_weight1: '',
    stone1: '',
    wastage1: '',
    net_weight1: '',
    jewel_type2: '',
    purity2: '',
    count2: '',
    gross_weight2: '',
    stone2: '',
    wastage2: '',
    net_weight2: '',
    jewel_type3: '',
    purity3: '',
    count3: '',
    gross_weight3: '',
    stone3: '',
    wastage3: '',
    net_weight3: '',
    jewel_type4: '',
    purity4: '',
    count4: '',
    gross_weight4: '',
    stone4: '',
    wastage4: '',
    net_weight4: '',
    jewel_type5: '',
    purity5: '',
    count5: '',
    gross_weight5: '',
    stone5: '',
    wastage5: '',
    net_weight5: '',
    jewel_type6: '',
    purity6: '',
    count6: '',
    gross_weight6: '',
    stone6: '',
    wastage6: '',
    net_weight6: '',
    jewel_type7: '',
    purity7: '',
    count7: '',
    gross_weight7: '',
    stone7: '',
    wastage7: '',
    net_weight7: '',
    jewel_type8: '',
    purity8: '',
    count8: '',
    gross_weight8: '',
    stone8: '',
    wastage8: '',
    net_weight8: '',
    jewel_type9: '',
    purity9: '',
    count9: '',
    gross_weight9: '',
    stone9: '',
    wastage9: '',
    net_weight9: '',
    la1_copy: '',
    la2_copy: '',
    la3_copy: '',
    la4_copy: '',
    la5_copy: '',
    la6_copy: '',
    la7_copy: '',
    la8_copy: '',
    la9_copy: '',
    la10_copy: ''
  });

  const [showContent, setShowContent] = useState(false);

  const [showContent1, setShowContent1] = useState(false);

  const [showContent2, setShowContent2] = useState(false);

  const [showContent3, setShowContent3] = useState(false);

  const [showContent4, setShowContent4] = useState(false);

  const [showContent5, setShowContent5] = useState(false);

  const [showContent6, setShowContent6] = useState(false);

  const [showContent7, setShowContent7] = useState(false);

  const [showContent8, setShowContent8] = useState(false);

  const [showContent9, setShowContent9] = useState(false);

  const handleDocumentCopy1Change = useCallback(() => {

    const imageSrc = documentCopy1Ref.current.getScreenshot();

    console.log('Document Copy 1 captured:', imageSrc);

    setSelectedImage1(imageSrc);

  }, []);

  const handleDocumentCopy2Change = useCallback(() => {

    const imageSrc = documentCopy1Ref.current.getScreenshot();

    console.log('Document Copy 2 captured:', imageSrc);

    setSelectedImage2(imageSrc);

  }, []);

  const handleDocumentCopy3Change = useCallback(() => {

    const imageSrc = documentCopy3Ref.current.getScreenshot();

    console.log('Document Copy 3 captured:', imageSrc);

    setSelectedImage3(imageSrc);

  }, []);

  const handleDocumentCopy4Change = useCallback(() => {

    const imageSrc = documentCopy4Ref.current.getScreenshot();

    console.log('Document Copy 4 captured:', imageSrc);

    setSelectedImage4(imageSrc);

  }, []);

  const handleDocumentCopy5Change = useCallback(() => {

    const imageSrc = documentCopy5Ref.current.getScreenshot();

    console.log('Document Copy 5 captured:', imageSrc);

    setSelectedImage5(imageSrc);

  }, []);

  const handleDocumentCopy6Change = useCallback(() => {

    const imageSrc = documentCopy6Ref.current.getScreenshot();

    console.log('Document Copy 6 captured:', imageSrc);

    setSelectedImage6(imageSrc);

  }, []);

  const handleDocumentCopy7Change = useCallback(() => {

    const imageSrc = documentCopy7Ref.current.getScreenshot();

    console.log('Document Copy 7 captured:', imageSrc);

    setSelectedImage7(imageSrc);

  }, []);

  const handleDocumentCopy8Change = useCallback(() => {

    const imageSrc = documentCopy8Ref.current.getScreenshot();

    console.log('Document Copy 8 captured:', imageSrc);

    setSelectedImage8(imageSrc);

  }, []);

  const handleDocumentCopy9Change = useCallback(() => {

    const imageSrc = documentCopy9Ref.current.getScreenshot();

    console.log('Document Copy 9 captured:', imageSrc);

    setSelectedImage9(imageSrc);

  }, []);

  const handleDocumentCopy10Change = useCallback(() => {

    const imageSrc = documentCopy10Ref.current.getScreenshot();

    console.log('Document Copy 10 captured:', imageSrc);

    setSelectedImage10(imageSrc);

  }, []);

  const openWebcamForDocumentCopy1 = () => {

    setShowWebcamDocumentCopy1(true);

  };

  const openWebcamForDocumentCopy2 = () => {

    setShowWebcamDocumentCopy2(true);

  };

  const openWebcamForDocumentCopy3 = () => {

    setShowWebcamDocumentCopy3(true);

  };

  const openWebcamForDocumentCopy4 = () => {

    setShowWebcamDocumentCopy4(true);

  };
 
  const openWebcamForDocumentCopy5 = () => {

    setShowWebcamDocumentCopy5(true);

  };

  const openWebcamForDocumentCopy6 = () => {

    setShowWebcamDocumentCopy6(true);

  };

  const openWebcamForDocumentCopy7 = () => {

    setShowWebcamDocumentCopy7(true);

  };

  const openWebcamForDocumentCopy8 = () => {

    setShowWebcamDocumentCopy8(true);

  };

  const openWebcamForDocumentCopy9 = () => {

    setShowWebcamDocumentCopy9(true);

  };

  const openWebcamForDocumentCopy10 = () => {

    setShowWebcamDocumentCopy10(true);

  };
  const handleChange = (event) => {

    setJewelData({

      ...jewelData,

      [event.target.name]: event.target.value
    });
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
  const responsivePadding = {

    padding: '20px',

    '@media (max-width: 600px)': {

      padding: '10px'

    },

    '@media (max-width: 400px)': {

      padding: '5px'

    }

  };

  const toggleContent = () => {
    setShowContent(!showContent);
  };
  const toggleContent1 = () => {
    setShowContent1(!showContent1);
  };
  const toggleContent2 = () => {
    setShowContent2(!showContent2);
  };
  const toggleContent3 = () => {
    setShowContent3(!showContent3);
  };
  const toggleContent4 = () => {
    setShowContent4(!showContent4);
  };
  const toggleContent5 = () => {
    setShowContent5(!showContent5);
  };
  const toggleContent6 = () => {
    setShowContent6(!showContent6);
  };
  const toggleContent7 = () => {
    setShowContent7(!showContent7);
  };
  const toggleContent8 = () => {
    setShowContent8(!showContent8);
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    const formData = new FormData();
    formData.append('jewel_type', jewelData.jewel_type);
    formData.append('purity', jewelData.purity);
    formData.append('count', jewelData.count);
    formData.append('gross_weight', jewelData.gross_weight);
    formData.append('stone', jewelData.stone);
    formData.append('wastage', jewelData.wastage);
    formData.append('net_weight', jewelData.net_weight);
    formData.append('la1_copy', dataURItoBlob(selectedImage1), 'la1_copy.jpg');
    formData.append('jewel_type1', jewelData.jewel_type1);
    formData.append('purity1', jewelData.purity1);
    formData.append('count1', jewelData.count1);
    formData.append('gross_weight1', jewelData.gross_weight1);
    formData.append('stone1', jewelData.stone1);
    formData.append('wastage1', jewelData.wastage1);
    formData.append('net_weight1', jewelData.net_weight1); 
    formData.append('la2_copy', dataURItoBlob(selectedImage2), 'la2_copy.jpg');
    formData.append('jewel_type2', jewelData.jewel_type2);
    formData.append('purity2', jewelData.purity2);
    formData.append('count2', jewelData.count2);
    formData.append('gross_weight2', jewelData.gross_weight2);
    formData.append('stone2', jewelData.stone2);
    formData.append('wastage2', jewelData.wastage2);
    formData.append('net_weight2', jewelData.net_weight2); 
    formData.append('la3_copy', dataURItoBlob(selectedImage3), 'la3_copy.jpg');
    formData.append('jewel_type3', jewelData.jewel_type3);
    formData.append('purity3', jewelData.purity3);
    formData.append('count3', jewelData.count3);
    formData.append('gross_weight3', jewelData.gross_weight3);
    formData.append('stone3', jewelData.stone3);
    formData.append('wastage3', jewelData.wastage3);
    formData.append('net_weight3', jewelData.net_weight3); 
    formData.append('la4_copy', dataURItoBlob(selectedImage4), 'la4_copy.jpg');
    formData.append('jewel_type4', jewelData.jewel_type4);
    formData.append('purity4', jewelData.purity4);
    formData.append('count4', jewelData.count4);
    formData.append('gross_weight4', jewelData.gross_weight4);
    formData.append('stone4', jewelData.stone4);
    formData.append('wastage4', jewelData.wastage4);
    formData.append('net_weight4', jewelData.net_weight4); 
    formData.append('la5_copy', dataURItoBlob(selectedImage5), 'la5_copy.jpg');
    formData.append('jewel_type5', jewelData.jewel_type5);
    formData.append('purity5', jewelData.purity5);
    formData.append('count5', jewelData.count5);
    formData.append('gross_weight5', jewelData.gross_weight5);
    formData.append('stone5', jewelData.stone5);
    formData.append('wastage5', jewelData.wastage5);
    formData.append('net_weight5', jewelData.net_weight5); 
    formData.append('la6_copy', dataURItoBlob(selectedImage6), 'la6_copy.jpg');
    formData.append('jewel_type6', jewelData.jewel_type6);
    formData.append('purity6', jewelData.purity6);
    formData.append('count6', jewelData.count6);
    formData.append('gross_weight6', jewelData.gross_weight6);
    formData.append('stone6', jewelData.stone6);
    formData.append('wastage6', jewelData.wastage6);
    formData.append('net_weight6', jewelData.net_weight6); 
    formData.append('la7_copy', dataURItoBlob(selectedImage7), 'la7_copy.jpg');
    formData.append('jewel_type7', jewelData.jewel_type7);
    formData.append('purity7', jewelData.purity7);
    formData.append('count7', jewelData.count7);
    formData.append('gross_weight7', jewelData.gross_weight7);
    formData.append('stone7', jewelData.stone7);
    formData.append('wastage7', jewelData.wastage7);
    formData.append('net_weight7', jewelData.net_weight7); 
    formData.append('la8_copy', dataURItoBlob(selectedImage8), 'la8_copy.jpg');
    formData.append('jewel_type8', jewelData.jewel_type8);
    formData.append('purity8', jewelData.purity8);
    formData.append('count8', jewelData.count8);
    formData.append('gross_weight8', jewelData.gross_weight8);
    formData.append('stone8', jewelData.stone8);
    formData.append('wastage8', jewelData.wastage8);
    formData.append('net_weight8', jewelData.net_weight8); 
    formData.append('la9_copy', dataURItoBlob(selectedImage9), 'la9_copy.jpg');
    formData.append('jewel_type9', jewelData.jewel_type9);
    formData.append('purity9', jewelData.purity9);
    formData.append('count9', jewelData.count9);
    formData.append('gross_weight9', jewelData.gross_weight9);
    formData.append('stone9', jewelData.stone9);
    formData.append('wastage9', jewelData.wastage9);
    formData.append('net_weight9', jewelData.net_weight9); 
    formData.append('la10_copy', dataURItoBlob(selectedImage10), 'la10_copy.jpg');
    axios

    .post(`${process.env.REACT_APP_BASE_URL}/api/jeweldetail`, formData)

    .then((response) => {})

    .catch((error) => {});

  setJewelData((prevData) => ({
    ...prevData,

    [name]: value
  }));
};
  return (
    <>
      <br></br>
      <Card {...responsivePadding}>
        <Container maxWidth="lg">
          <form className="container" onSubmit={handleSubmit}>
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
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type"
                              id="demo-simple-select"
                              value={jewelData.jewel_type}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity" value={jewelData.purity} onChange={handleChange} placeholder="purity." />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count" value={jewelData.count} onChange={handleChange} placeholder="count." />
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
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy1 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy1Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

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
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage1 ? (
                              <img src={selectedImage1} alt="Document Copy 1" style={{ width: '30%', height: '30%' }} />
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
                </TableBody>
              </Table>
            </TableContainer>
            <div>
      <Button onClick={toggleContent} type="button">Add Jewel</Button>
      {showContent && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type1"
                              id="demo-simple-select"
                              value={jewelData.jewel_type1}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity1" value={jewelData.purity1} onChange={handleChange} placeholder="purity." />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count1" value={jewelData.count1} onChange={handleChange} placeholder="count." />
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
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage2 ? (
                              <img src={selectedImage2} alt="Document Copy 2" style={{ width: '30%', height: '30%' }} />
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
            
        
      <Button onClick={toggleContent1} type="button">Add Jewel</Button>
      {showContent1 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type2"
                              id="demo-simple-select"
                              value={jewelData.jewel_type2}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity2" value={jewelData.purity2} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count2" value={jewelData.count2} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight2"
                        value={jewelData.gross_weight2}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight2: e.target.value })}
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
                        {showWebcamDocumentCopy3 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy3Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

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

                            <IconButton onClick={handleDocumentCopy3Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage3 ? (
                              <img src={selectedImage3} alt="Document Copy 3" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy3}>
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
            
        </div>}
        <Button onClick={toggleContent2} type="button">Add Jewel</Button>
      {showContent2 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type3"
                              id="demo-simple-select"
                              value={jewelData.jewel_type3}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity3" value={jewelData.purity3} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count3" value={jewelData.count3} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight3"
                        value={jewelData.gross_weight3}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight3: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone3"
                        value={jewelData.stone3}
                        onChange={(e) => setJewelData({ ...jewelData, stone3: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage3"
                        value={jewelData.wastage3}
                        onChange={(e) => setJewelData({ ...jewelData, wastage3: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight3" value={jewelData.net_weight3} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy4 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy4Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage4 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage4}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy4Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage4 ? (
                              <img src={selectedImage4} alt="Document Copy 3" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy4}>
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
            
        </div>}
        <Button onClick={toggleContent3} type="button">Add Jewel</Button>
      {showContent3 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type4"
                              id="demo-simple-select"
                              value={jewelData.jewel_type4}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity4" value={jewelData.purity4} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count4" value={jewelData.count4} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight4"
                        value={jewelData.gross_weight4}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight4: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone4"
                        value={jewelData.stone4}
                        onChange={(e) => setJewelData({ ...jewelData, stone4: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage4"
                        value={jewelData.wastage4}
                        onChange={(e) => setJewelData({ ...jewelData, wastage4: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight4" value={jewelData.net_weight4} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy5 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy5Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage5 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage5}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy5Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage5 ? (
                              <img src={selectedImage5} alt="Document Copy 5" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy5}>
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
            
        </div>}
        <Button onClick={toggleContent4} type="button">Add Jewel</Button>
      {showContent4 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type5"
                              id="demo-simple-select"
                              value={jewelData.jewel_type5}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity5" value={jewelData.purity5} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count5" value={jewelData.count5} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight5"
                        value={jewelData.gross_weight5}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight5: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone5"
                        value={jewelData.stone5}
                        onChange={(e) => setJewelData({ ...jewelData, stone5: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage5"
                        value={jewelData.wastage5}
                        onChange={(e) => setJewelData({ ...jewelData, wastage5: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight5" value={jewelData.net_weight5} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy6 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy6Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage6 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage6}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy6Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage6 ? (
                              <img src={selectedImage6} alt="Document Copy 6" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy6}>
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
            
        </div>}
        <Button onClick={toggleContent5} type="button">Add Jewel</Button>
      {showContent5 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type6"
                              id="demo-simple-select"
                              value={jewelData.jewel_type6}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity6" value={jewelData.purity6} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count6" value={jewelData.count6} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight6"
                        value={jewelData.gross_weight6}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight6: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone6"
                        value={jewelData.stone6}
                        onChange={(e) => setJewelData({ ...jewelData, stone6: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage6"
                        value={jewelData.wastage6}
                        onChange={(e) => setJewelData({ ...jewelData, wastage6: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight6" value={jewelData.net_weight6} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy7 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy7Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage7 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage7}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy7Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage7 ? (
                              <img src={selectedImage7} alt="Document Copy 7" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy7}>
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
            
            <Button onClick={toggleContent6} type="button">Add Jewel</Button>
      {showContent6 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type8"
                              id="demo-simple-select"
                              value={jewelData.jewel_type8}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity8" value={jewelData.purity8} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count8" value={jewelData.count8} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight8"
                        value={jewelData.gross_weight8}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight8: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone8"
                        value={jewelData.stone8}
                        onChange={(e) => setJewelData({ ...jewelData, stone8: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage8"
                        value={jewelData.wastage8}
                        onChange={(e) => setJewelData({ ...jewelData, wastage8: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight8" value={jewelData.net_weight8} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy8 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy8Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage8 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage8}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy8Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage8 ? (
                              <img src={selectedImage9} alt="Document Copy 8" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy8}>
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
            
        </div>}
        </div>}
        <Button onClick={toggleContent7} type="button">Add Jewel</Button>
      {showContent7 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type9"
                              id="demo-simple-select"
                              value={jewelData.jewel_type9}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity9" value={jewelData.purity9} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count9" value={jewelData.count9} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight9"
                        value={jewelData.gross_weight9}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight9: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone9"
                        value={jewelData.stone9}
                        onChange={(e) => setJewelData({ ...jewelData, stone9: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage9"
                        value={jewelData.wastage9}
                        onChange={(e) => setJewelData({ ...jewelData, wastage9: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight9" value={jewelData.net_weight9} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy9 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy9Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage9 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage9}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy9Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage9 ? (
                              <img src={selectedImage9} alt="Document Copy 9" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy9}>
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
            
        </div>}
        <Button onClick={toggleContent8} type="button">Add Jewel</Button>
      {showContent8 && <div>
        <TableContainer>
        <Table className="table table-hover table-bordered" bordered sx={{ minWidth: 750 }} aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ mr: 2 }}>
                        <FormControl className="col col-sm-10">
                          <Form.Group controlId="formGridNominee" className="col col-sm-3">
                            <InputLabel id="demo-simple-select-label">Jewel Type</InputLabel>

                            <Select
                              name="jewel_type10"
                              id="demo-simple-select"
                              value={jewelData.jewel_type10}
                              label="Document"
                              onChange={handleChange}
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
                      <MDBInput type="text" name="purity10" value={jewelData.purity10} onChange={handleChange} placeholder="purity" />
                    </TableCell>

                    <TableCell>
                      <MDBInput type="text" name="count10" value={jewelData.count10} onChange={handleChange} placeholder="count" />
                    </TableCell>

                    <TableCell>
                      <MDBInput
                        type="text"
                        name="gross_weight10"
                        value={jewelData.gross_weight10}
                        onChange={(e) => setJewelData({ ...jewelData, gross_weight10: e.target.value })}
                        placeholder="gross weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="stone10"
                        value={jewelData.stone10}
                        onChange={(e) => setJewelData({ ...jewelData, stone10: e.target.value })}
                        placeholder="stone weight"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput
                        type="text"
                        name="wastage10"
                        value={jewelData.wastage10}
                        onChange={(e) => setJewelData({ ...jewelData, wastage10: e.target.value })}
                        placeholder="Wastage"
                      />
                    </TableCell>
                    <TableCell>
                      <MDBInput type="text" name="net_weight10" value={jewelData.net_weight10} readOnly placeholder="Net Weight" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <div style={{ position: 'relative' }}>
                        {showWebcamDocumentCopy10 ? (
                          <>
                            <Webcam audio={false} ref={documentCopy10Ref} screenshotFormat="image/jpeg" style={{ width: '30%', height: '30%' }} />

                            {selectedImage10 && (
                              <div style={{ position: 'absolute', top: 0, left: 0 }}>
                                <img
                                  src={selectedImage10}
                                  alt="Captured"
                                  style={{
                                    width: '100%', // Adjust the width as needed

                                    height: 'auto' // Let the height adjust proportionally
                                  }}
                                />
                              </div>
                            )}

                            <IconButton onClick={handleDocumentCopy10Change}>
                              <PhotoCameraIcon />
                              <span>Capture</span>
                            </IconButton>
                          </>
                        ) : (
                          <>
                            {selectedImage10 ? (
                              <img src={selectedImage10} alt="Document Copy 10" style={{ width: '30%', height: '30%' }} />
                            ) : (
                              <IconButton onClick={openWebcamForDocumentCopy10}>
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
            
        </div>}
</div>}
    </div>
          </form>

        </Container>
      </Card>
    </>
  );
}
export default JewelDetail;
