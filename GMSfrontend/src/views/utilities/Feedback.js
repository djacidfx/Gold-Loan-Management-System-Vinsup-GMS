import axios from 'axios';
import { useEffect, useState } from 'react';

const JewelDetailsForPerson = ({ loanId, customerId }) => {
  const [jewelDetails, setJewelDetails] = useState([]);
  useEffect(() => {
    // Fetch all jewel details from the API
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/jeweldetails`)
      .then((response) => {
        // Filter jewel details based on loanId and customerId
        const filteredJewelDetails = response.data.filter((item) => {
          return item.loanId === loanId && item.customerId === customerId;
        });
        setJewelDetails(filteredJewelDetails);
      })
      .catch((error) => {
        console.error('Error fetching jewel details:', error);
      });
  }, [loanId, customerId]);
  return (
    <div>
      <h2>Jewel Details for Person</h2>
      <ul>
        {jewelDetails.map((item) => (
          <li key={item.id}>
            <p>Jewel Type: {item.jewel_type}</p>
            <p>Purity: {item.purity}</p>
            <p>Count: {item.count}</p>
            {/* Display other jewel details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JewelDetailsForPerson;
