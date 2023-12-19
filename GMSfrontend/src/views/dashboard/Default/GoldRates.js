import axios from 'axios';
import { useEffect, useState } from 'react';

function GoldRates() {
  const [goldRates, setGoldRates] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/goldrates`)
      .then((response) => {
        console.log(response.data.goldrates); // Optional: Handle the response as needed

        const goldRatesData = response.data.goldrates;
        if (goldRatesData.length > 0) {
          setGoldRates(goldRatesData);
        }
      })
      .catch((error) => {
        console.error(error); // Optional: Handle the error
      });
  }, []);

  // Display the latest gold rate data from the end of the array
  const latestGoldRate = goldRates[goldRates.length - 1];

  return (
    <div>
      <marquee direction="left" scrollamount="3">
        {latestGoldRate && (
          <h2 style={{  fontSize: '28px' }} >
          <span style={{ color: '#9A0101' }}>
          <strong>Gold Rate (Carat 22):</strong> Rs.{latestGoldRate.carat_22}
          </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={{ color: '#E5B617' }}>
            <strong>Gold Rate (Carat 24):</strong> Rs.{latestGoldRate.carat_24}
          </span>
        </h2>
        )}
      </marquee>
    </div>
  );
}

export default GoldRates;