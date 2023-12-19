import React from 'react';
import { styled } from '@mui/material/styles';
import loadingGif from '../assets/images/loader.gif';  // adjust the path to your GIF

// styles
const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent background
});

// ==============================|| LOADER ||============================== //
const Loader = () => (
  <LoaderWrapper>
    <img src={loadingGif} alt="Loading..." width="150" height="150" style={{ animationDuration: '10s' }} />
  </LoaderWrapper>
);


export default Loader;
