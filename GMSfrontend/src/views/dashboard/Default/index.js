import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import GoldRates from './GoldRates';
import Loan from './Loan';
import TotalCustomers from './TotalCustomers';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalLoan from './TotalLoan';
import TotalEmploye from './TotalEmploye';
import Chat from './Chat';
import './index.css';
import CircleChart from './CircleChart';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <GoldRates />
      <div className='inline'>
        <div>
        <Grid container spacing={gridSpacing}>
       <div>
       <Grid item xs={12} lg={8} md={6} sm={6}>
          <TotalCustomers isLoading={isLoading} />
        </Grid>

       </div>
       <div>
       <Grid item xs={12} md={6}>
          <TotalLoan isLoading={isLoading} />
          </Grid>
        
       </div>
       <div>
       <Grid>
          <Loan isLoading={isLoading} />
          </Grid>
       </div>
        <div>
        <Grid item xs={15} md={8}>
          <TotalEmploye isLoading={isLoading} />
        </Grid>
       
        </div>
      </Grid>


     <div>
     <Grid container spacing={gridSpacing}>
        <Grid item xs={12} md={6} style={{ width: '100px' }}>
          <TotalGrowthBarChart isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalIncomeDarkCard isLoading={isLoading} />
        </Grid>

      </Grid>
     </div>
        </div>
      </div>
      
      <div className='chat'>
      <div>
        <Chat/>
       </div>
       <div className='biechart'>
      <CircleChart />
    </div>
      </div>
       
    </>

  );
};

export default Dashboard;