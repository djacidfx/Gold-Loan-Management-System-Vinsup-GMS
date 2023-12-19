import { useEffect, useState } from 'react';

import { Form, Row } from 'react-bootstrap';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

function Daybook() {
  const [debitData, setDebitData] = useState(null);

  const [creditData, setCreditData] = useState(null);

  const [selectedDate, setSelectedDate] = useState('');

  const [jewelLoanCreditData, setjewelLoanCreditData] = useState(null);

  const [jewelLoanDebitData, setJewelLoanDebitData] = useState(null);

  const [BankCreditData, setBankCreditData] = useState(null);

  const [BankDebitData, setBankDebitData] = useState(null);

  const [CaptitalCreditData, setCaptitalCreditData] = useState(null);

  const [CapitalDebitData, setCapitalDebitData] = useState(null);

  const [SuspenceCreditData, setSuspenceCreditData] = useState(null);

  const [ExpencesCreditData, setExpencesCreditData] = useState(null);

  const [ExpencesDebitData, setExpencesDebitData] = useState(null);

  const [SuspenceDebitData, setSuspenceDebitData] = useState(null);

  const [FurnitureDebitData, setFurnitureDebitData] = useState(null);

  const [CashScrollData, setCashScrollData] = useState(null);

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    // Fetch debit data for profitandlossdebitdbs

    fetch(`${process.env.REACT_APP_BASE_URL}/api/profitandlossdebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setDebitData(data);

        console.log('Debit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch credit data for profitandlosscreditdbs

    fetch(`${process.env.REACT_APP_BASE_URL}/api/profitandlosscreditdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setCreditData(data);

        console.log('Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch data for jewelloancreditdbs

    fetch(`${process.env.REACT_APP_BASE_URL}/api/jewelloancreditdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setjewelLoanCreditData(data);

        // Handle the fetched data for jewelloancreditdbs

        console.log('Jewel Loan Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    fetch(`${process.env.REACT_APP_BASE_URL}/api/jewelloandebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJewelLoanDebitData(data.jewelloandebitdb); // Make sure you are setting the state correctly
        console.log('Jewel Loan Debit Data:', data.jewelloandebitdb);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch credit data for capitalcredits

    fetch(`${process.env.REACT_APP_BASE_URL}/api/capitalcreditdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setCaptitalCreditData(data);

        console.log('Capital Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch data for capitaldebitdbs
    fetch(`${process.env.REACT_APP_BASE_URL}/api/capitaldebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        setCapitalDebitData(data);

        console.log('Capital Debit Data:', data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch credit data for bankcredits

    fetch(`${process.env.REACT_APP_BASE_URL}/api/bankcreditdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setBankCreditData(data);

        console.log('Capital Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    //bankdebits

    fetch(`${process.env.REACT_APP_BASE_URL}/api/bankdebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then((data) => {
        setBankDebitData(data); // Fix the typo here

        console.log('Bank Debit Data:', data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch credit data for capitalcredits

    fetch(`${process.env.REACT_APP_BASE_URL}/api/suspencecreditsdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setSuspenceCreditData(data);

        console.log('Suspence Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    fetch(`${process.env.REACT_APP_BASE_URL}/api/suspencedebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setSuspenceDebitData(data);

        console.log('Suspence Debit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    // Fetch data for Expences
    fetch(`${process.env.REACT_APP_BASE_URL}/api/expencescreditdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setExpencesCreditData(data);

        console.log('Expences Credit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    fetch(`${process.env.REACT_APP_BASE_URL}/api/expencesdebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setExpencesDebitData(data);

        console.log('Expences Debit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
    // Fetch furnituredebitdb data

    fetch(`${process.env.REACT_APP_BASE_URL}/api/furnituredebitdbs`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        // Handle the fetched data as needed, for example, set it to a state variable
        setFurnitureDebitData(data);

        console.log('Furniture Debit Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });

    // Fetch data for cashscrolls

    fetch(`${process.env.REACT_APP_BASE_URL}/api/cashscrolls`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })

      .then((data) => {
        setCashScrollData(data);
        // Handle the fetched data for jewelloandebitdbs

        console.log('Cashscrolls Data:', data);
      })

      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  useEffect(() => {
    // Get the current date in the format "YYYY-MM-DD"
    const currentDate = new Date().toISOString().split('T')[0];
    setSelectedDate(currentDate);
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredCreditData = creditData?.profitandlosscreditdb.filter(
    (transaction) => transaction.profitandlossdb_credit_date === selectedDate
  );

  let plcAmounts = [];
  let tplcAmounts = [];

  if (filteredCreditData) {
    plcAmounts = filteredCreditData
      .filter(
        (transaction) =>
          transaction.profitandlossdb_credit_receipt.startsWith('SI') ||
          transaction.profitandlossdb_credit_receipt.startsWith('SAA') ||
          transaction.profitandlossdb_credit_receipt.startsWith('PPI') ||
          transaction.profitandlossdb_credit_receipt.startsWith('PLC') ||
          transaction.profitandlossdb_credit_receipt.startsWith('PLADC')
      )
      .map((transaction) => parseFloat(transaction.profitandlossdb_credit_amount));

    tplcAmounts = filteredCreditData
      .filter((transaction) => transaction.profitandlossdb_credit_receipt.startsWith('TPC'))
      .map((transaction) => parseFloat(transaction.profitandlossdb_credit_amount));
  }

  const plcTotal = plcAmounts.reduce((total, amount) => total + amount, 0);
  const tplcTotal = tplcAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumProfit = plcTotal + tplcTotal;

  const filterdebitData = debitData?.profitandlossdebitdb.filter((transaction) => transaction.profitandlossdb_debit_date === selectedDate);

  let pldAmounts = [];
  let tpldAmounts = [];

  if (filterdebitData) {
    pldAmounts = filterdebitData
      .filter(
        (transaction) =>
          transaction.profitandlossdb_debit_receipt.startsWith('LoanId') ||
          transaction.profitandlossdb_debit_receipt.startsWith('SAD') ||
          transaction.profitandlossdb_debit_receipt.startsWith('GLD') ||
          transaction.profitandlossdb_debit_receipt.startsWith('PLD') ||
          transaction.profitandlossdb_debit_receipt.startsWith('PLADJD')
      )
      .map((transaction) => parseFloat(transaction.profitandlossdb_debit_amount));

    tpldAmounts = filterdebitData
      .filter((transaction) => transaction.profitandlossdb_debit_receipt.startsWith('TPD'))
      .map((transaction) => parseFloat(transaction.profitandlossdb_debit_amount));
  }

  const pldTotal = pldAmounts.reduce((total, amount) => total + amount, 0);
  const tpldTotal = tpldAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumProfitdebit = pldTotal + tpldTotal;

  const filterjewelLoanCreditData = jewelLoanCreditData?.jewelloancreditdb.filter((transaction) =>
    transaction.jewelloandb_credit_date.includes(selectedDate)
  );

  let glcAmounts = [];
  let tglcAmounts = [];

  if (jewelLoanCreditData) {
    glcAmounts = filterjewelLoanCreditData
      .filter(
        (transaction) =>
          transaction.jewelloandb_credit_receipt.startsWith('JLC') ||
          transaction.jewelloandb_credit_receipt.startsWith('GLCP') ||
          transaction.jewelloandb_credit_receipt.startsWith('GLCS')
      )
      .map((transaction) => parseFloat(transaction.jewelloandb_credit_amount));

    tglcAmounts = filterjewelLoanCreditData
      .filter((transaction) => transaction.jewelloandb_credit_receipt.startsWith('TJLC'))
      .map((transaction) => parseFloat(transaction.jewelloandb_credit_amount));
  }

  const glcTotal = glcAmounts.reduce((total, amount) => total + amount, 0);
  const tglcTotal = tglcAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumJewel = glcTotal + tglcTotal;

  const filterjewelLoanDebitData = jewelLoanDebitData?.filter((transaction) => transaction.jewelloandb_debit_date.includes(selectedDate));

  let gldAmounts = [];
  let tgldAmounts = [];

  if (jewelLoanDebitData) {
    gldAmounts = filterjewelLoanDebitData
      .filter(
        (transaction) =>
          transaction.jewelloandb_debit_receipt.startsWith('JLD') ||
          transaction.jewelloandb_debit_receipt.startsWith('GLD') ||
          transaction.jewelloandb_debit_receipt.startsWith('GLDP') ||
          transaction.jewelloandb_debit_receipt.startsWith('GLDS')
      )
      .map((transaction) => parseFloat(transaction.jewelloandb_debit_amount));

    tgldAmounts = filterjewelLoanDebitData
      .filter((transaction) => transaction.jewelloandb_debit_receipt.startsWith('TJLD'))
      .map((transaction) => parseFloat(transaction.jewelloandb_debit_amount));
  }

  const gldTotal = gldAmounts.reduce((total, amount) => total + amount, 0);
  const tgldTotal = tgldAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumJeweldebit = gldTotal + tgldTotal;

  // Calculate total of profitandlossdb_credit_amount

  const filterFurnitureDebitData = FurnitureDebitData?.furnituredebitdb.filter(
    (transaction) => transaction.furniture_debit_date === selectedDate
  );

  let fudAmounts = [];
  let tfudAmounts = [];

  // Make sure FurnitureDebitData is not undefined or null
  if (FurnitureDebitData) {
    // Filter and map for FUD amounts
    fudAmounts = FurnitureDebitData.furnituredebitdb
      .filter((transaction) => transaction.furniture_debit_receipt.startsWith('FUD') && transaction.furniture_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.furniture_debit_amount));

    // Filter and map for TFD amounts
    tfudAmounts = FurnitureDebitData.furnituredebitdb
      .filter((transaction) => transaction.furniture_debit_receipt.startsWith('TFUD') && transaction.furniture_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.furniture_debit_amount));
  }

  // Calculate totals
  const fudTotal = fudAmounts.reduce((total, amount) => total + amount, 0);
  const tfudTotal = tfudAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumFurnitureDebit = fudTotal + tfudTotal;

  // const filterjewelLoanDebitData=jewelLoanDebitData?.jewelloandebitdb.filter(

  //   (transaction) => transaction.jewelloandb_debit_date === selectedDate

  // )

  //***********************************************CapitalCreditData*********************************************************************************** *//

  const filterCaptitalCreditData = CaptitalCreditData?.capitalcreditdb.filter(
    (transaction) => transaction.capital_credit_date === selectedDate
  );

  let cacAmounts = [];
  let tccAmounts = [];

  // Make sure CaptitalCreditData is not undefined or null
  if (CaptitalCreditData) {
    // Filter and map for CAC amounts
    cacAmounts = CaptitalCreditData.capitalcreditdb
      .filter((transaction) => transaction.capital_credit_receipt.startsWith('CAC') && transaction.capital_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.capital_credit_amount));

    // Filter and map for TCC amounts
    tccAmounts = CaptitalCreditData.capitalcreditdb
      .filter((transaction) => transaction.capital_credit_receipt.startsWith('TCAC') && transaction.capital_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.capital_credit_amount));
  }

  // Calculate totals
  const cacTotal = cacAmounts.reduce((total, amount) => total + amount, 0);
  const tccTotal = tccAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumCapital = cacTotal + tccTotal;

  const filterCapitalDebitData = CapitalDebitData?.capitaldebitdb.filter((transaction) => transaction.capital_debit_date === selectedDate);

  let cadAmounts = [];
  let tcdAmounts = [];

  // Make sure CaptitalCreditData is not undefined or null
  if (CapitalDebitData) {
    // Filter and map for CAD amounts
    cadAmounts = CapitalDebitData.capitaldebitdb
      .filter((transaction) => transaction.capital_debit_receipt.startsWith('CAD') && transaction.capital_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.capital_debit_amount));

    // Filter and map for TCC amounts
    tcdAmounts = CapitalDebitData.capitaldebitdb
      .filter((transaction) => transaction.capital_debit_receipt.startsWith('TCAD') && transaction.capital_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.capital_debit_amount));
  }

  // Calculate totals
  const cadTotal = cadAmounts.reduce((total, amount) => total + amount, 0);
  const tcdTotal = tcdAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumCapitaldebit = cadTotal + tcdTotal;

  const totalCreditAmount = filteredCreditData?.reduce(
    (total, transaction) => total + Number(transaction.profitandlossdb_credit_amount),

    0
  );

  //const filterBankCreditData = BankCreditData?.bankcreditdb.filter((transaction) => transaction.bank_credit_date === selectedDate);

  //***********************************************BankCreditData*********************************************************************************** *//

  const filterBankCreditData = BankCreditData?.bankcreditdb.filter((transaction) => transaction.bank_credit_date === selectedDate);

  let bacAmounts = [];
  let tbacAmounts = [];

  if (BankCreditData) {
    bacAmounts = filterBankCreditData
      .filter((transaction) => transaction.bank_credit_receipt.startsWith('BAC') && transaction.bank_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.bank_credit_amount));

    tbacAmounts = filterBankCreditData
      .filter((transaction) => transaction.bank_credit_receipt.startsWith('TBAC') && transaction.bank_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.bank_credit_amount));
  }

  const bacTotal = bacAmounts.reduce((total, amount) => total + amount, 0);
  const tbacTotal = tbacAmounts.reduce((total, amount) => total + amount, 0);
  const totalSum = bacTotal + tbacTotal;

  //*********************************************************************************************************************************** *//

  const filterBankDebitData = BankDebitData?.bankdebitdb.filter((transaction) => transaction.bank_debit_date === selectedDate);

  let badAmounts = [];
  let tbadAmounts = [];

  if (BankDebitData) {
    badAmounts = filterBankDebitData
      .filter((transaction) => transaction.bank_debit_receipt.startsWith('BAD') && transaction.bank_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.bank_debit_amount));

    tbadAmounts = filterBankDebitData
      .filter((transaction) => transaction.bank_debit_receipt.startsWith('TBAD') && transaction.bank_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.bank_debit_amount));
  }

  const badTotal = badAmounts.reduce((total, amount) => total + amount, 0);
  const tbadTotal = tbadAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumdebit = badTotal + tbadTotal;

  console.log('Bank Debit Data:', BankDebitData?.bankdebitdb); // Check the structure of your data
  console.log('Selected Date:', selectedDate); // Verify the format of the selected date
  console.log('Filtered Bank Debit Data:', filterBankDebitData); // Check the filtered array

  const filterSuspenceCreditData = SuspenceCreditData?.suspencecreditdb.filter(
    (transaction) => transaction.suspence_credit_date === selectedDate
  );
  let sucAmounts = [];
  let tsucAmounts = [];

  if (SuspenceCreditData) {
    // Filter and map for CAC amounts
    sucAmounts = SuspenceCreditData.suspencecreditdb
      .filter((transaction) => transaction.suspence_credit_receipt.startsWith('SUC') && transaction.suspence_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.suspence_credit_amount));

    // Filter and map for TCC amounts
    tsucAmounts = SuspenceCreditData.suspencecreditdb
      .filter((transaction) => transaction.suspence_credit_receipt.startsWith('TSUC') && transaction.suspence_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.suspence_credit_amount));
  }
  // Calculate totals
  const sucTotal = sucAmounts.reduce((total, amount) => total + amount, 0);
  const tsucTotal = tsucAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumSuspence = sucTotal + tsucTotal;

  //*************************************************************************************************************************************** */

  const filterSuspenceDebitData = SuspenceDebitData?.suspencedebitdb?.filter(
    (transaction) => transaction.suspence_debit_date === selectedDate
  );

  let sudAmounts = [];
  let tsudAmounts = [];

  if (SuspenceDebitData) {
    // Check if SuspenceDebitData and its properties exist before accessing them
    if (SuspenceDebitData.suspencedebitdb) {
      // Filter and map for SUD amounts
      sudAmounts = SuspenceDebitData.suspencedebitdb
        .filter((transaction) => transaction.suspence_debit_receipt.startsWith('SUD') && transaction.suspence_debit_date === selectedDate)
        .map((transaction) => parseFloat(transaction.suspence_debit_amount));

      // Filter and map for TSUD amounts
      tsudAmounts = SuspenceDebitData.suspencedebitdb
        .filter((transaction) => transaction.suspence_debit_receipt.startsWith('TSUD') && transaction.suspence_debit_date === selectedDate)
        .map((transaction) => parseFloat(transaction.suspence_debit_amount));
    }
  }

  // Calculate totals
  const sudTotal = sudAmounts.reduce((total, amount) => total + amount, 0);
  const tsudTotal = tsudAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumSuspencedebit = sudTotal + tsudTotal;

  //////////***************************************************************************** */
  const filterExpencesCreditData = ExpencesCreditData?.expencescreditdb.filter(
    (transaction) => transaction.expences_credit_date === selectedDate
  );
  let excAmounts = [];
  let texcAmounts = [];

  if (ExpencesCreditData) {
    // Filter and map for CAC amounts
    excAmounts = ExpencesCreditData.expencescreditdb
      .filter((transaction) => transaction.expences_credit_receipt.startsWith('EXC') && transaction.expences_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.expences_credit_amount));

    // Filter and map for TCC amounts
    texcAmounts = ExpencesCreditData.expencescreditdb
      .filter((transaction) => transaction.expences_credit_receipt.startsWith('TEXC') && transaction.expences_credit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.expences_credit_amount));
  }
  // Calculate totals
  const excTotal = excAmounts.reduce((total, amount) => total + amount, 0);
  const texcTotal = texcAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumexpences = excTotal + texcTotal;

  ////expencedebit//
  const filterExpencesDebitData = ExpencesDebitData?.expencesdebitdb.filter(
    (transaction) => transaction.expences_debit_date === selectedDate
  );
  let exdAmounts = [];
  let texdAmounts = [];

  if (ExpencesDebitData) {
    // Filter and map for CAC amounts
    exdAmounts = ExpencesDebitData.expencesdebitdb
      .filter((transaction) => transaction.expences_debit_receipt.startsWith('EXD') && transaction.expences_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.expences_debit_amount));

    // Filter and map for TCC amounts
    texdAmounts = ExpencesDebitData.expencesdebitdb
      .filter((transaction) => transaction.expences_debit_receipt.startsWith('TEXD') && transaction.expences_debit_date === selectedDate)
      .map((transaction) => parseFloat(transaction.expences_debit_amount));
  }
  // Calculate totals
  const exdTotal = exdAmounts.reduce((total, amount) => total + amount, 0);
  const texdTotal = texdAmounts.reduce((total, amount) => total + amount, 0);
  const totalSumexpencesdebit = exdTotal + texdTotal;

  const filterCashScrollData = CashScrollData?.cashscrolls.filter((transaction) => transaction.date === selectedDate);

  const totalDebitAmount = filterdebitData?.reduce(
    (total, transaction) => total + (transaction.profitandlossdb_debit_amount ? parseFloat(transaction.profitandlossdb_debit_amount) : 0),
    0
  );

  function calculateDebitSum(debitData) {
    if (!filterdebitData) {
      return 0;
    }

    const debitSum = filterdebitData.reduce((total, transaction) => total + Number(transaction.profitandlossdb_debit_amount), 0);

    return debitSum;
  }

  function calculateJewlcreditSum(jewelLoanCreditData) {
    if (!filterjewelLoanCreditData) {
      return 0;
    }

    const calculateJewlcreditSum = filterjewelLoanCreditData.reduce(
      (total, transaction) => total + Number(transaction.jewelloandb_credit_amount),
      0
    );

    return calculateJewlcreditSum;
  }

  function calculateCapitalcreditSum(CaptitalCreditData) {
    if (!filterCaptitalCreditData) {
      return 0;
    }

    const calculateCapitalcreditSum = filterCaptitalCreditData.reduce(
      (total, transaction) => total + Number(transaction.capital_credit_amount),
      0
    );

    return calculateCapitalcreditSum;
  }

  function calculateCapitalDebitSum(capitalDebitData) {
    if (!filterCapitalDebitData) {
      return 0;
    }

    const capitalDebitSum = filterCapitalDebitData.reduce((total, transaction) => total + Number(transaction.capital_debit_amount), 0);

    return capitalDebitSum;
  }

  // Calculate the sum of values
  const calculateTotalSum = () => {
    let sum = totalCreditAmount;

    if (filterjewelLoanCreditData) {
      sum += filterjewelLoanCreditData.reduce((acc, transaction) => acc + parseFloat(transaction.jewelloandb_credit_amount), 0);
    }

    if (filterBankCreditData) {
      sum += filterBankCreditData.reduce((acc, transaction) => acc + parseFloat(transaction.bank_credit_amount), 0);
    }

    if (filterSuspenceCreditData) {
      sum += filterSuspenceCreditData.reduce((acc, transaction) => acc + parseFloat(transaction.suspence_credit_amount), 0);
    }
    if (filterExpencesCreditData) {
      sum += filterExpencesCreditData.reduce((acc, transaction) => acc + parseFloat(transaction.expences_credit_amount), 0);
    }

    if (filterCaptitalCreditData) {
      sum += filterCaptitalCreditData.reduce((acc, transaction) => acc + parseFloat(transaction.capital_credit_amount), 0);
    }

    return sum;
  };

  const calculateDebitTotalSum = () => {
    let sum = totalDebitAmount;

    if (filterjewelLoanDebitData) {
      sum += filterjewelLoanDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.jewelloandb_debit_amount), 0);
    }

    if (filterCapitalDebitData) {
      sum += filterCapitalDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.capital_debit_amount), 0);
    }
    if (filterBankDebitData) {
      sum += filterBankDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.bank_debit_amount), 0);
    }

    if (filterSuspenceDebitData) {
      sum += filterSuspenceDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.suspence_debit_amount), 0);
    }
    if (filterFurnitureDebitData) {
      sum += filterFurnitureDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.furniture_debit_amount), 0);
    }
    if (filterExpencesDebitData) {
      sum += filterExpencesDebitData.reduce((acc, transaction) => acc + parseFloat(transaction.expences_debit_amount), 0);
    }

    return sum;
  };

  const totalSumPlusOpeningAmount =
    calculateTotalSum() + (filterCashScrollData?.reduce((total, transaction) => total + parseFloat(transaction.opening_amount), 0) || 0);

  const totalSumPlusClosingAmount =
    calculateTotalSum() + (filterCashScrollData?.reduce((total, transaction) => total + parseFloat(transaction.closing_amount), 0) || 0);

  function calculateCombinedTotal() {
    const combinedTotal =
      plcAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      glcAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      bacAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      sucAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      excAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      cacAmounts.reduce((total, amount) => total + parseFloat(amount), 0);

    // Format the combined total with thousands separators
    return combinedTotal.toLocaleString();
  }
  function calculateCombinedTotal1() {
    const combinedTotal =
      pldAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      gldAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      badAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      sudAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      exdAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      fudAmounts.reduce((total, amount) => total + parseFloat(amount), 0) +
      cadAmounts.reduce((total, amount) => total + parseFloat(amount), 0);

    // Format the combined total with thousands separators
    return combinedTotal.toLocaleString();
  }

  function calculateTransferTotal() {
    const combinedTotal = [...tglcAmounts, ...tbacAmounts, ...tsucAmounts, ...tccAmounts, ...tplcAmounts, ...texcAmounts].reduce(
      (total, amount) => total + parseFloat(amount),
      0
    );

    return combinedTotal.toString(); // Convert the total to a string
  }

  function calculateTransferTotalDebit() {
    const combinedTotal = [
      ...tgldAmounts,
      ...tbadAmounts,
      ...tsudAmounts,
      ...tcdAmounts,
      ...tpldAmounts,
      ...texdAmounts,
      ...tfudAmounts
    ].reduce((total, amount) => total + parseFloat(amount), 0);

    return combinedTotal.toString(); // Convert the total to a string
  }

  function calculateOpeningAmountTotal() {
    if (!filterCashScrollData || !Array.isArray(filterCashScrollData)) {
      return 'N/A'; // Handle the case when filterCashScrollData is not available
    }

    const total = filterCashScrollData.reduce((acc, transaction) => acc + parseFloat(transaction.opening_amount), 0);

    return total.toLocaleString(); // Format with thousands separators
  }

  function calculateClosingAmountTotal() {
    if (!filterCashScrollData || !Array.isArray(filterCashScrollData)) {
      return 'N/A'; // Handle the case when filterCashScrollData is not available
    }

    const total1 = filterCashScrollData.reduce((acc, transaction) => acc + parseFloat(transaction.closing_amount), 0);

    return total1.toLocaleString(); // Format with thousands separators
  }

  function calculateCombinedAndOpeningTotal() {
    const combinedTotal = parseFloat(calculateCombinedTotal().replace(/,/g, '')); // Remove thousands separators and parse as a number
    const openingAmountTotal = parseFloat(calculateOpeningAmountTotal().replace(/,/g, '')); // Remove thousands separators and parse as a number

    const sum = combinedTotal + openingAmountTotal;

    // Format the sum with thousands separators
    return sum.toLocaleString();
  }

  function calculateCombinedAndClosingTotal() {
    const combinedTotal1 = parseFloat(calculateCombinedTotal1().replace(/,/g, '')); // Remove thousands separators and parse as a number
    const closingAmountTotal1 = parseFloat(calculateClosingAmountTotal().replace(/,/g, '')); // Remove thousands separators and parse as a number

    const sum1 = combinedTotal1 + closingAmountTotal1;

    // Format the sum with thousands separators
    return sum1.toLocaleString();
  }

  function calculateCombinedAndClosingTotal1() {
    const debitTotalSum = calculateDebitTotalSum();
    const closingAmountTotal = calculateClosingAmountTotal();

    console.log('debitTotalSum:', debitTotalSum);
    console.log('closingAmountTotal:', closingAmountTotal);

    const combinedTotal2 = parseFloat(debitTotalSum);
    const closingAmountTotal2 = parseFloat(closingAmountTotal.replace(/,/g, ''));

    console.log('combinedTotal2:', combinedTotal2);
    console.log('closingAmountTotal2:', closingAmountTotal2);

    const sum1 = combinedTotal2 + closingAmountTotal2;

    console.log('sum1:', sum1); // Add this line to log sum1

    // Format the sum with thousands separators
    return sum1.toLocaleString();
  }

  return (
    <>
    <button
      style={{
        margin: '10px',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={() => window.print()}
    >
      Print Table
    </button>

    <Paper elevation={20} style={{ padding: '20px' }}>
      <div>
        <style>
          {`
            @media print {
              @page {
                size: A4 landscape; /* Set landscape layout for A4 size */
              }
              body * {
                visibility: hidden;
              }
              #printTable, #printTable * {
                visibility: visible;
                page-break-inside: avoid;
              }
              #printTable {
                position: absolute;
                left: 0;
                top: 0;
                width: 297mm; /* A4 landscape width */
                height: 210mm; /* A4 landscape height */
                margin: 0;
                padding: 0;
              }
            }
          `}
        </style>
        <div id="printTable">
          <form>
            <Row>
              <Form.Group controlId="formDate" className="col col-sm-4">
                <Form.Label>Date</Form.Label>
                <br></br>
                <TextField
                  type="date"
                  size="large"
                  className="form-control"
                  aria-label="date"
                  aria-describedby="basic-addon1"
                  value={selectedDate}
                  onChange={handleDateChange} // Attach the event handler
                />
              </Form.Group>
            </Row>

            <br></br>
            <TableContainer component={Paper}>
              <Table style={{ border: '1px solid #000' }} sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {/* First row columns */}

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>PARTICULARS</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>CASH</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>TRF</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>TOTAL</b>
                    </TableCell>

                    {/* Second row columns */}

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>PARTICULARS</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>CASH</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>TRF</b>
                    </TableCell>

                    <TableCell align="center" style={{ border: '1px solid #000', width: '12.5%' }}>
                      <b>TOTAL</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {/* Add your table rows here */}
                    <TableCell colSpan={8} align="center" style={{ border: '1px solid #000' }}>
                      <b>Day Book</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>P&L A/C Credit Receipt:</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {plcAmounts.map((amount, index) => (
                        <div key={`plc-${index}`}>
                          {`${amount}-(${
                            filteredCreditData?.filter(
                              (transaction) =>
                                transaction.profitandlossdb_credit_receipt.startsWith('SI') ||
                                transaction.profitandlossdb_credit_receipt.startsWith('SAA') ||
                                transaction.profitandlossdb_credit_receipt.startsWith('PPI') ||
                                transaction.profitandlossdb_credit_receipt.startsWith('PLC') ||
                                transaction.profitandlossdb_credit_receipt.startsWith('PLADC')
                            )[index]?.profitandlossdb_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filteredCreditData)}
                            {filteredCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tplcAmounts.map((amount, index) => (
                        <div key={`tplc-${index}`}>
                          {`${amount}(${
                            filteredCreditData?.filter((transaction) => transaction.profitandlossdb_credit_receipt.startsWith('TPC'))[index]
                              ?.profitandlossdb_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filteredCreditData)}
                            {filteredCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumProfit}</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>P&L A/C Debit Receipt:</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {pldAmounts.map((amount, index) => (
                        <div key={`pld-${index}`}>
                          {`${amount}-(${
                            filterdebitData?.filter(
                              (transaction) =>
                                transaction.profitandlossdb_debit_receipt.startsWith('LoanId') ||
                                transaction.profitandlossdb_debit_receipt.startsWith('SAD') ||
                                transaction.profitandlossdb_debit_receipt.startsWith('GLD') ||
                                transaction.profitandlossdb_debit_receipt.startsWith('PLD') ||
                                transaction.profitandlossdb_debit_receipt.startsWith('PLADJD')
                            )[index]?.profitandlossdb_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CDebitData:', filterdebitData)}
                            {filterdebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tpldAmounts.map((amount, index) => (
                        <div key={`tpld-${index}`}>
                          {`${amount}(${
                            filterdebitData?.filter((transaction) => transaction.profitandlossdb_debit_receipt.startsWith('TPD'))[index]
                              ?.profitandlossdb_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CDebitData:', filterdebitData)}
                            {filterdebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumProfitdebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '10.5%' }}>Supplementary</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '3.5%' }}>
                      <input type="text" value={totalCreditAmount} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}></TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {/* Add the sum of first and second cell values */}

                      <input type="text" value={totalCreditAmount} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Furniture A/c</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: 'auto', minWidth: '100px' }}>
                      {fudAmounts.map((amount, index) => (
                        <div key={`fud-${index}`}>
                          {`${amount}(${
                            filterFurnitureDebitData?.filter((transaction) => transaction.furniture_debit_receipt.startsWith('FUD'))[index]
                              ?.furniture_debit_receipt
                          })`}
                          <div>
                            {console.log('filterFurnitureDebitData:', filterFurnitureDebitData)}
                            {filterFurnitureDebitData?.map((mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: 'auto', minWidth: '100px' }}>
                      {tfudAmounts.map((amount, index) => (
                        <div key={`fud-${index}`}>
                          {`${amount}(${
                            filterFurnitureDebitData?.filter((transaction) => transaction.furniture_debit_receipt.startsWith('TFUD'))[index]
                              ?.furniture_debit_receipt
                          })`}
                          <div>
                            {console.log('filterFurnitureDebitData:', filterFurnitureDebitData)}
                            {filterFurnitureDebitData?.map((mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}{' '}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumFurnitureDebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Jewel Loan credit Receipt</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {glcAmounts.map((amount, index) => (
                        <div key={`glc-${index}`}>
                          {`${amount}(${
                            filterjewelLoanCreditData?.filter(
                              (transaction) =>
                                transaction.jewelloandb_credit_receipt.startsWith('JLC') ||
                                transaction.jewelloandb_credit_receipt.startsWith('GLCP') ||
                                transaction.jewelloandb_credit_receipt.startsWith('GLCS')
                            )[index]?.jewelloandb_credit_receipt
                          })`}
                          <div>
                            {console.log('filterjewelLoanCreditData:', filterjewelLoanCreditData)}
                            {/* Remove the unnecessary map function here */}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: 'auto', minWidth: '100px' }}>
                      {tglcAmounts.map((amount, index) => (
                        <div key={`tglc-${index}`}>
                          {`${amount}(${
                            filterjewelLoanCreditData?.filter((transaction) => transaction.jewelloandb_credit_receipt.startsWith('TJLC'))[
                              index
                            ]?.jewelloandb_credit_receipt
                          })`}
                          {console.log('filterJewelLoanCreditData:', filterjewelLoanCreditData)}
                          {filterjewelLoanCreditData?.map((item, mapIndex) => (
                            <div key={mapIndex}></div>
                          ))}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumJewel}</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Jewel Loan Debit Receipt:</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {gldAmounts.map((amount, index) => (
                        <div key={`glc-${index}`}>
                          {`${amount}(${
                            filterjewelLoanDebitData?.filter(
                              (transaction) =>
                                transaction.jewelloandb_debit_receipt.startsWith('JLD') ||
                                transaction.jewelloandb_debit_receipt.startsWith('GLD') ||
                                transaction.jewelloandb_debit_receipt.startsWith('GLDP') ||
                                transaction.jewelloandb_debit_receipt.startsWith('GLDS')
                            )[index]?.jewelloandb_debit_receipt
                          })`}
                          <div>
                            {console.log('filterjewelLoanDebitData:', filterjewelLoanDebitData)}
                            {/* Remove the unnecessary map function here */}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: 'auto', minWidth: '100px' }}>
                      {tgldAmounts.map((amount, index) => (
                        <div key={`tglc-${index}`}>
                          {`${amount}(${
                            filterjewelLoanDebitData?.filter((transaction) => transaction.jewelloandb_debit_receipt.startsWith('TJLD'))[
                              index
                            ]?.jewelloandb_debit_receipt
                          })`}
                          {console.log('filterjewelLoanDebitData:', filterjewelLoanDebitData)}
                          {filterjewelLoanDebitData?.map((item, mapIndex) => (
                            <div key={mapIndex}></div>
                          ))}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}> {totalSumJeweldebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Bank credit Receipt</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {bacAmounts.map((amount, index) => (
                        <div key={`bac-${index}`}>
                          {`${amount}(${
                            filterBankCreditData?.filter((transaction) => transaction.bank_credit_receipt.startsWith('BAC'))[index]
                              ?.bank_credit_receipt
                          })`}
                          <div>
                            {console.log('filterBankCreditData:', filterBankCreditData)}
                            {filterBankCreditData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tbacAmounts.map((amount, index) => (
                        <div key={`tbac-${index}`}>
                          {`${amount}(${
                            filterBankCreditData?.filter((transaction) => transaction.bank_credit_receipt.startsWith('TBAC'))[index]
                              ?.bank_credit_receipt
                          })`}
                          <div>
                            {console.log('filterBankCreditData:', filterBankCreditData)}
                            {filterBankCreditData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSum}</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Bank debit Receipt</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {badAmounts.map((amount, index) => (
                        <div key={`bac-${index}`}>
                          {`${amount}(${
                            filterBankDebitData?.filter((transaction) => transaction.bank_debit_receipt.startsWith('BAD'))[index]
                              ?.bank_debit_receipt
                          })`}
                          <div>
                            {console.log('filterBankDebitData:', filterBankDebitData)}
                            {filterBankDebitData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tbadAmounts.map((amount, index) => (
                        <div key={`bac-${index}`}>
                          {`${amount}(${
                            filterBankDebitData?.filter((transaction) => transaction.bank_debit_receipt.startsWith('TBAD'))[index]
                              ?.bank_debit_receipt
                          })`}
                          <div>
                            {console.log('filterBankDebitData:', filterBankDebitData)}
                            {filterBankDebitData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumdebit}</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Suspence credit Receipt</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {sucAmounts.map((amount, index) => (
                        <div key={`suc-${index}`}>
                          {`${amount}(${
                            filterSuspenceCreditData?.filter((transaction) => transaction.suspence_credit_receipt.startsWith('SUC'))[index]
                              ?.suspence_credit_receipt
                          })`}
                          <div>
                            {console.log('filterSuspenceCreditData:', filterSuspenceCreditData)}
                            {filterSuspenceCreditData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tsucAmounts.map((amount, index) => (
                        <div key={`tsuc-${index}`}>
                          {`${amount}(${
                            filterSuspenceCreditData?.filter((transaction) => transaction.suspence_credit_receipt.startsWith('TSUC'))[index]
                              ?.suspence_credit_receipt
                          })`}
                          <div>
                            {console.log('filterSuspenceCreditData:', filterSuspenceCreditData)}
                            {filterSuspenceCreditData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumSuspence}</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Suspence debitAmount Receipt</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {sudAmounts.map((amount, index) => (
                        <div key={`suc-${index}`}>
                          {`${amount}(${
                            filterSuspenceDebitData?.filter((transaction) => transaction.suspence_debit_receipt.startsWith('SUD'))[index]
                              ?.suspence_debit_receipt
                          })`}
                          <div>
                            {console.log('filterSuspenceDebitData:', filterSuspenceDebitData)}
                            {filterSuspenceDebitData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tsudAmounts.map((amount, index) => (
                        <div key={`suc-${index}`}>
                          {`${amount}(${
                            filterSuspenceDebitData?.filter((transaction) => transaction.suspence_debit_receipt.startsWith('TSUD'))[index]
                              ?.suspence_debit_receipt
                          })`}
                          <div>
                            {console.log('filterSuspenceDebitData:', filterSuspenceDebitData)}
                            {filterSuspenceDebitData?.map((index) => (
                              <div key={index}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumSuspencedebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Expence credit Receipt</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {excAmounts.map((amount, index) => (
                        <div key={`exc-${index}`}>
                          {`${amount}-(${
                            filterExpencesCreditData?.filter((transaction) => transaction.expences_credit_receipt.startsWith('EXC'))[index]
                              ?.expences_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterExpencesCreditData)}
                            {filterExpencesCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {texcAmounts.map((amount, index) => (
                        <div key={`texc-${index}`}>
                          {`${amount}-(${
                            filterExpencesCreditData?.filter((transaction) => transaction.expences_credit_receipt.startsWith('TEXC'))[index]
                              ?.expences_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterExpencesCreditData)}
                            {filterExpencesCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumexpences}</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Expence debit Receipt</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {exdAmounts.map((amount, index) => (
                        <div key={`exd-${index}`}>
                          {`${amount}-(${
                            filterExpencesDebitData?.filter((transaction) => transaction.expences_debit_receipt.startsWith('EXD'))[index]
                              ?.expences_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterExpencesDebitData)}
                            {filterExpencesDebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {texdAmounts.map((amount, index) => (
                        <div key={`exd-${index}`}>
                          {`${amount}-(${
                            filterExpencesDebitData?.filter((transaction) => transaction.expences_debit_receipt.startsWith('TEXD'))[index]
                              ?.expences_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterExpencesDebitData)}
                            {filterExpencesDebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{totalSumexpencesdebit}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Capital A/c Capital Credit Receipt:</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {cacAmounts.map((amount, index) => (
                        <div key={`cac-${index}`}>
                          {`${amount}-(${
                            filterCaptitalCreditData?.filter((transaction) => transaction.capital_credit_receipt.startsWith('CAC'))[index]
                              ?.capital_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterCaptitalCreditData)}
                            {filterCaptitalCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tccAmounts.map((amount, index) => (
                        <div key={`tcc-${index}`}>
                          {`${amount}-(${
                            filterCaptitalCreditData?.filter((transaction) => transaction.capital_credit_receipt.startsWith('TCAC'))[index]
                              ?.capital_credit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterCaptitalCreditData)}
                            {filterCaptitalCreditData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={totalSumCapital} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Capital A/c Capital Debit Receipt:</TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {cadAmounts.map((amount, index) => (
                        <div key={`tcc-${index}`}>
                          {`${amount}-(${
                            filterCapitalDebitData?.filter((transaction) => transaction.capital_debit_receipt.startsWith('CAD'))[index]
                              ?.capital_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterCapitalDebitData)}
                            {filterCapitalDebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      {tcdAmounts.map((amount, index) => (
                        <div key={`tcc-${index}`}>
                          {`${amount}-(${
                            filterCapitalDebitData?.filter((transaction) => transaction.capital_debit_receipt.startsWith('TCAD'))[index]
                              ?.capital_debit_receipt
                          })`}
                          <div>
                            {console.log('filterP&LA/CCreditData:', filterCapitalDebitData)}
                            {filterCapitalDebitData?.map((item, mapIndex) => (
                              <div key={mapIndex}></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={totalSumCapitaldebit} readOnly size="8" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Total</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateCombinedTotal()} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateTransferTotal()} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateTotalSum()} style={{ width: '70%' }} readOnly />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Total</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateCombinedTotal1()} style={{ width: '70%' }} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateTransferTotalDebit()} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateDebitTotalSum()} style={{ width: '70%' }} readOnly size="8" />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Opening Cash</TableCell>

                    <TableBody>
                      {filterCashScrollData?.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{transaction.opening_amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}></TableCell>

                    <TableBody>
                      {filterCashScrollData?.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{transaction.opening_amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Closeing Cash</TableCell>

                    <TableBody>
                      {filterCashScrollData?.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{transaction.closing_amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}></TableCell>

                    <TableBody>
                      {filterCashScrollData?.map((transaction, index) => (
                        <TableRow key={index}>
                          <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>{transaction.closing_amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Grand Table</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateCombinedAndOpeningTotal()} style={{ width: '70%' }} readOnly />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateTransferTotal()} readOnly size="8" />
                    </TableCell>
                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={totalSumPlusOpeningAmount} style={{ width: '70%' }} readOnly />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>Grand Table</TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateCombinedAndClosingTotal()} style={{ width: '70%' }} readOnly />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateTransferTotalDebit()} readOnly size="8" />
                    </TableCell>

                    <TableCell style={{ border: '1px solid #000', width: '12.5%' }}>
                      <input type="text" value={calculateCombinedAndClosingTotal1()} style={{ width: '70%' }} readOnly />
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </form>
        </div>
        </div>
      </Paper>
    </>
  );
}

export default Daybook;
