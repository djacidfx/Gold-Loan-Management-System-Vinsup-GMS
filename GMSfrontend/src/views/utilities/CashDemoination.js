import React, { useState, useEffect } from 'react';

import { TableContainer, Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';

import { Form } from 'react-bootstrap';

const CashDemoination = () => {

  const [tableData, setTableData] = useState([

    { id: 1, amount: 500, count: 0 },
    { id: 2, amount: 200, count: 0 },
    { id: 3, amount: 100, count: 0 },
    { id: 4, amount: 50, count: 0 },
    { id: 5, amount: 20, count: 0 },
    { id: 6, amount: 10, count: 0 },

  ]);

  const [coinsData, setCoinsData] = useState([

    { id: 1, denomination: 10, quantity: 0 },
    { id: 2, denomination: 5, quantity: 0 },
    { id: 3, denomination: 2, quantity: 0 },
    { id: 4, denomination: 1, quantity: 0 },

  ]);

  const calculateCashTotalAmount = () => {

    return tableData.reduce((total, row) => {

      return total + row.amount * row.count;

    }, 0);

  };

  const calculateCoinsTotalAmount = () => {

    return coinsData.reduce((total, coin) => {

      return total + coin.denomination * coin.quantity;

    }, 0);
  };

  const calculateTotalAmount = () => {
    
    const cashTotal = calculateCashTotalAmount();
    const coinsTotal = calculateCoinsTotalAmount();
    return cashTotal + coinsTotal;
  };

  const handleCountChange = (id, isCoin, event) => {
    const { value } = event.target;
    if (isCoin) {
      const updatedCoinsData = coinsData.map((coin) =>
        coin.id === id ? { ...coin, quantity: parseInt(value, 10) } : coin
      );
      setCoinsData(updatedCoinsData);
    } else {
      const updatedTableData = tableData.map((row) =>
        row.id === id ? { ...row, count: parseInt(value, 10) } : row
      );
      setTableData(updatedTableData);
    }
  };

  useEffect(() => {
    // Calculate the total amount when the table data changes
    const totalAmount = calculateTotalAmount();
    console.log('Total Amount:', totalAmount);
  }, [tableData, coinsData]);

  const cashTotalAmount = calculateCashTotalAmount();
  // Calculate the total amount for coins
  const coinsTotalAmount = calculateCoinsTotalAmount();

  const finalAmount = cashTotalAmount + coinsTotalAmount; // Calculate the final amount

  return (
    <div>
   
      <TableContainer component={Paper}>
        <br></br>
      <h3>Cash Denomination Table</h3>
      <hr className="hori-col-3" />
        {/* Cash Denomination Table */}
        <Table className="table table-hover table-bordered" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>S.No</b>
              </TableCell>
              <TableCell>
                <b>Amount</b>
              </TableCell>
              <TableCell>
                <b>Count</b>
              </TableCell>
              <TableCell>
                <b>Total Amount</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  <Form.Group controlId={`formGridCount_${row.id}`} className="col col-sm-10">
                    <input
                      type="number"
                      style={{ minWidth: '120px', height: '38px' }}
                      className="form-control"
                      placeholder="Count"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={row.count}
                      onChange={(event) => handleCountChange(row.id, false, event)}
                      required
                    />
                  </Form.Group>
                </TableCell>
                <TableCell>{row.amount * row.count}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <b>Final Amount</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <b>{calculateCashTotalAmount}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
<br></br>
      <TableContainer component={Paper}>
        {/* Coins Table */}
        
      <h2>Coins Table</h2>
      <hr className="hori-col-3" />
      <br></br>
        <Table className="table table-hover table-bordered" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>S.No</b>
              </TableCell>
              <TableCell>
                <b>Denomination</b>
              </TableCell>
              <TableCell>
                <b>Count</b>
              </TableCell>
              <TableCell>
                <b>Total Amount</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinsData.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.id}</TableCell>
                <TableCell>{coin.denomination}</TableCell>
                <TableCell>
                  <Form.Group controlId={`formGridCount_${coin.id}`} className="col col-sm-10">
                    <input
                      type="number"
                      style={{ minWidth: '120px', height: '38px' }}
                      className="form-control"
                      placeholder="Count"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={coin.quantity}
                      onChange={(event) => handleCountChange(coin.id, true, event)}
                      required
                    />
                  </Form.Group>
                </TableCell>
                <TableCell>{coin.denomination * coin.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <b>Final Amount</b>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <b>{calculateCoinsTotalAmount}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
    
    <div>
     
       
        <p><b>Whole Final Amount:</b> {finalAmount}</p>
   
    </div>
    </div>
  );
};

export default CashDemoination;
