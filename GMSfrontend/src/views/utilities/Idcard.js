import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper } from '@mui/material';

const initialData = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 20 },
];

const MyTable = () => {
  const [data, setData] = useState(initialData);

  const handleAddRow = () => {
    const newRow = {
      id: data.length + 1,
      name: `Item ${data.length + 1}`,
      price: Math.floor(Math.random() * 100) + 1,
    };
    setData([...data, newRow]);
  };

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={handleAddRow}>
        Add New Row
      </Button>
    </Paper>
  );
};

export default MyTable;
