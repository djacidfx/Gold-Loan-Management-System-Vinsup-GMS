import React from 'react';
import { Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

function Biechart() {
  const data = [
    { label: 'Jan', value: 20 },
    { label: 'Feb', value: 15 },
    { label: 'March', value: 25 },
    { label: 'April', value: 15 },
    { label: 'May', value: 15 },
    { label: 'June', value: 10 },
  ];

  const size = {
    width: 350, // Specify your desired width
    height: 350, // Specify your desired height
  };

  // Define an array of colors
  const colors = ['#9A0101', 'red', 'blue', 'yellow', 'orange', 'purple']; // You can add more colors as needed

  return (
    <Paper
    style={{
      width:'365px',
      height:'380px'
    }}
    >
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
            data,
            colors, // Assign colors to data points
          },
        ]}
        sx={{
          '& .MuiPieArcLabel-root': {
            fill: 'white',
            fontWeight: 'bold',
          },
        }}
        {...size}
      />
    </Paper>
  );
}

export default Biechart;