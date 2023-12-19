import React, { useState,useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TextField from "@mui/material/TextField";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




const uData = [300, 3000, 2000, 2780, 1890, 2390, 3490, 4567, 3456, 3456,234,300, 3000, 2000, 2780, 1890, 2390, 3490, 4567, 3456, 3456,234,300, 3000, 2000, 2780, 1890, 2390, 3490, 4567,678];
const pData = [32000, 1398, 9800, 3908, 4800, 3800, 4300, 2780, 1890, 2390, 234,300, 3000, 2000, 2780, 1890, 2390, 3490, 4567, 3456, 3456, 234,300, 3000, 2000, 2780, 1890, 2390, 3490, 4567,567];
// const xLabels = [
//     '1',
//   '3',
//   '6',
//   '9',
//   '12',
//   '15',
//   '18',
//   '21',
//   '24',
//   '27',
//   '30'
 
// ];

const StyledPaper = styled(Paper)({
  padding: "20px", // Increased padding
  width: "600px", // Increased width
  height: "500px", // Increased height
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly increased opacity
  borderRadius: "20px",
  display: "flex",
  flexDirection: "column", // Allow chart and text to be vertically centered
  alignItems: "center",
});

const chartColors = ['#008000', '#FF0000']; // Line chart colors for 'Profit' and 'Loss'

export default function SimpleLineChart() {
    const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [xLabels, setXLabels] = useState([ '1',
  '3',
  '6',
  '9',
  '12',
  '15',
  '18',
  '21',
  '24',
  '27',
  '30',
]);

const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'



const handleErrorSnackbarOpen = (message) => {
  setSnackbarSeverity('error');
  setSnackbarMessage(message);
  setOpenErrorSnackbar(true);
};

const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpenSuccessSnackbar(false);
  setOpenErrorSnackbar(false);
};

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
 
    if (startDate) {
      const start = dayjs(startDate);
      const end = dayjs(date);
      const daysDiff = end.diff(start, 'day');
 
      if (daysDiff >= 31) {
        handleErrorSnackbarOpen('You can predict only inbetween 30 days')
       
        // You can also set the endDate to null or some other value to reset the selection
        setEndDate(null);
      }
    }
  };
 

  useEffect(() => {
    // Calculate the difference in days between startDate and endDate
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const daysDiff = end.diff(start, 'day');
     
      // Generate xLabels array based on the date range
      const newLabels = Array.from({ length: daysDiff + 1 }, (_, index) => {
        const labelDate = start.add(index, 'day');
        return labelDate.format('D');
      });

      setXLabels(newLabels);
    }
  }, [startDate, endDate]);

  const filteredPData = pData.slice(0, xLabels.length);
  const filteredUData = uData.slice(0, xLabels.length);
 
 
  return (
<div>
   
<div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
      
    <Snackbar
        open={openSuccessSnackbar || openErrorSnackbar}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity={snackbarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>  
     <StyledPaper elevation={3} style={{ padding: "10px", paddingTop: "20px",paddingLeft:"-70px", width: "600px", height: "400px", backgroundColor: "rgba(250, 250, 250, 0.7)" }}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
      <DatePicker
              label="From Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="To Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
      </DemoContainer>
    </LocalizationProvider>
       
     
        <LineChart
          width={600}
          height={350} // Adjusted chart height to fit the header
          series={[
              { data: filteredPData, label: 'Profit', color: chartColors[0] },
              { data: filteredUData, label: 'Loss', color: chartColors[1] },
            ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          yAxis={[{ scaleType: 'linear' }]}
          tooltip={{ show: true, labelFormatter: (value) => `$${value.toFixed(2)}` }}
          legend={{ show: false }} // Hide the legend as series labels are in the header
        />
      </StyledPaper>
    </div>
    </div>
  );
}