import { useState } from 'react';

import { Card, Container, Button, Paper } from '@mui/material';

import CapitalAccount from './TransferScroll/Debit/CapitalAccount';

import BankLoan from './TransferScroll/Debit/BankLoan';

import Jewel from './TransferScroll/Debit/Jewel';

import Capital from './TransferScroll/Credit/Capital';

import Bank from './TransferScroll/Credit/Bank';

import Jewels from './TransferScroll/Credit/Jewels';
import PLCredit from './TransferScroll/Credit/PLCredit';
import PLDebit from './TransferScroll/Debit/PLDebit';
import Suspencecredit from './TransferScroll/Credit/Suspencecredit';
import Suspencedebit from './TransferScroll/Debit/Suspencedebit';
import Transferlist from './TransferScroll/Transferlist';
import Furniturecredit from './TransferScroll/Credit/Furniturecredit';
import Furnituredebit from './TransferScroll/Debit/Furnituredebit';
import Expencesdebit from './TransferScroll/Debit/Expencesdebit';
import Expencescredit from './TransferScroll/Credit/Expencescredit';

const Transferscroll = () => {
  const responsivePadding = {
    padding: '20px',

    '@media (max-width: 600px)': {
      padding: '10px'
    },

    '@media (max-width: 400px)': {
      padding: '5px'
    }
  };

  const [isTableOpen, setIsTableOpen] = useState(false);

  const handleButtonClick = () => {
    setIsTableOpen(!isTableOpen);
  };

  const [isTable1Open, setIsTable1Open] = useState(false);

  const handleButton1Click = () => {
    setIsTable1Open(!isTable1Open);
  };

  return (
    <>
      <h2>Transferscroll</h2>

      <Paper elevation={20} style={{ width: 'auto', height: 'auto', padding: '10px' }}>
        <div>
          <Button variant="contained" onClick={handleButtonClick}>
            Debit
          </Button>
          {isTableOpen && (
            <Card {...responsivePadding}>
              <Container maxWidth="lg">
                <h3>Debit Part</h3>

                <CapitalAccount />
                <BankLoan />
                <Jewel />
                <PLDebit />
                <Suspencedebit />
                <Furnituredebit />
                <Expencesdebit />
              </Container>
            </Card>
          )}
          &nbsp;
          <Button variant="contained" onClick={handleButton1Click}>
            Credit
          </Button>
          {isTable1Open && (
            <Card {...responsivePadding}>
              <Container maxWidth="lg">
                <h3>Credit</h3>
                <Capital />
                <Bank />
                <Jewels />
                <PLCredit />
                <Furniturecredit />
                <Suspencecredit />
                <Expencescredit />
              </Container>
              <br></br>
            </Card>
          )}
        </div>
      </Paper>
      <br></br>
      <Transferlist />
    </>
  );
};

export default Transferscroll;
