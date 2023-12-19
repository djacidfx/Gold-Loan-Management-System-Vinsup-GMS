import { lazy } from 'react';

import { AuthContext } from './AuthContext';

import { useContext, useEffect, useState } from 'react';

import { useNavigate, Navigate } from 'react-router-dom';

// project imports

import MainLayout from 'layout/MainLayout';

import Loadable from 'ui-component/Loadable';
import Lazy from 'yup/lib/Lazy';

// dashboard routing

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing

//Customer Registration

const UtilsList = Loadable(lazy(() => import('views/utilities/ListA')));

const UtilsColor = Loadable(lazy(() => import('views/utilities/Registration')));

//Loan Process

const UtilsLoanApproval = Loadable(lazy(() => import('views/utilities/LoanApprovalA')));

const UtilsLoanlist = Loadable(lazy(() => import('views/utilities/LoanlistA')));

const UtilsRepayment = Loadable(lazy(() => import('views/utilities/Repayment')));

//Repledge

const UtilsCustomer = Loadable(lazy(() => import('views/utilities/Customer')));

const UtilsOwner = Loadable(lazy(() => import('views/utilities/Owner')));

// Goldrate Update

const UtilsGold = Loadable(lazy(() => import('views/utilities/Gold')));

//PayRoll

const UtilsAttendance = Loadable(lazy(() => import('views/utilities/Attendance')));

const UtilsSalary = Loadable(lazy(() => import('views/utilities/Salary')));

//Employee Registration

const UtilsEregistration = Loadable(lazy(() => import('views/utilities/Eregistration')));

//Master
const UtilsJewelType = Loadable(lazy(() => import('views/utilities/Jeweltype')));

const UtilsCity = Loadable(lazy(() => import('views/utilities/City')));

const UtilsState = Loadable(lazy(() => import('views/utilities/State')));

const UtilsPurity = Loadable(lazy(() => import('views/utilities/Purity')));

const UtilsLoanScheme = Loadable(lazy(() => import('views/utilities/Loanscheme')));

const UtilsRelationType = Loadable(lazy(() => import('views/utilities/Relationtype')));

const UtilsIdCard = Loadable(lazy(() => import('views/utilities/Idcard')));

const UtilsBranch = Loadable(lazy(() => import('views/utilities/Branch')));

const UtilsRole = Loadable(lazy(() => import('views/utilities/Role')));

const UtilsSuspence =Loadable(lazy(() => import('views/utilities/Suspence')));

//Accounts

const UtilsCashScroll = Loadable(lazy(() => import('views/utilities/Cashscroll')));

const UtilsTransferScroll = Loadable(lazy(() => import('views/utilities/Transferscroll')));

const UtilsDayBook = Loadable(lazy(() => import('views/utilities/Daybook')));

const UtilsCapitalAccount = Loadable(lazy(() => import('views/utilities/Capitalaccount')));

const UtilsPlAccount = Loadable(lazy(() => import('views/utilities/Placcount')));

const UtilsCashHand = Loadable(lazy(() => import('views/utilities/Cashhand')));

const UtilsJewelLoan = Loadable(lazy(() => import('views/utilities/Jewelloan')));

const UtilsBalanceSheet = Loadable(lazy(() => import('views/utilities/BalanceSheet')));

const UtilsBankAccount=Loadable(lazy(()=> import('views/utilities/Bankaccount')));

const UtilsExpences=Loadable(lazy(()=> import('views/utilities/Expences')));

const UtilsFurniture=Loadable(lazy(()=> import('views/utilities/Furniture')));


const UtilsInterestReceivedOnJL=Loadable(lazy(()=> import('views/utilities/InterestReceivedOnJL')));
//Complaints&Feedback

const UtilsFeedback = Loadable(lazy(() => import('views/utilities/Feedback')));

const SamplePage = Loadable(lazy(() => import('views/sample-page')));

const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));

const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
//report
const UtilsDailyDateWiseDueLoans = Loadable(lazy(() => import('views/utilities/DailyDateWiseDueLoans')));

const UtilsOutStandingReport= Loadable(lazy(() => import('views/utilities/OutStandingReport')));

const UtilsMonthlyPL = Loadable(lazy(() => import('views/utilities/MonthlyPL')));

const UtilsOverdueNoticeReport = Loadable(lazy(() => import('views/utilities/OverDueNoticeReport')));




const ProtectedMainLayout = (props) => {
  const { isLoggedIn, verifyToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      verifyToken().finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, verifyToken]);

  if (isLoading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (!isLoggedIn) {
    return <Navigate to="/pages/login/login3" />;
  }

  return <MainLayout {...props} />;
};
const AdminRoutess = {
  path: '/',
  element: <ProtectedMainLayout />,
  children: [
    {
      path: '/',

      element: <DashboardDefault />
    },

    {
      path: 'dashboard',

      children: [
        {
          path: 'default',

          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-cashhand',

          element: <UtilsCashHand />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-list',

          element: <UtilsList />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-daybook',

          element: <UtilsDayBook />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-suspence',

          element: <UtilsSuspence />
        }
      ]
    }, 
    {
      path: 'utils',

      children: [
        {
          path: 'util-expences',

          element: <UtilsExpences />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-furniture',

          element: <UtilsFurniture/>
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-balancesheet',

          element: <UtilsBalanceSheet />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-placcount',

          element: <UtilsPlAccount />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-jewelloan',
          element: <UtilsJewelLoan />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-bankaccount',
          element: <UtilsBankAccount />
        }
      ]
    },

   

    {
      path: 'utils',

      children: [
        {
          path: 'util-transferscroll',

          element: <UtilsTransferScroll />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-daybook',

          element: <UtilsDayBook />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-capitalaccount',

          element: <UtilsCapitalAccount />
        }
      ]
    },

    // {
    //   path: 'utils',

    //   children: [
    //     {
    //       path: 'util-feedback',

    //       element: <UtilsFeedback />
    //     }
    //   ]
    // },

    {
      path: 'utils',

      children: [
        {
          path: 'util-Loanlist',

          element: <UtilsLoanlist />
        }
      ]
    },

    {
      path: 'utils',
      children: [
        {
          path: 'util-LoanlistA',
          element: <UtilsLoanlist />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-Cashscroll',
          element: <UtilsCashScroll />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-transferscroll',
          element: <UtilsTransferScroll />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-Registration',
          element: <UtilsColor />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-loanapprovalA',
          element: <UtilsLoanApproval />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-repayment',
          element: <UtilsRepayment />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-owner',
          element: <UtilsOwner />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-customer',

          element: <UtilsCustomer />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-gold',

          element: <UtilsGold />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-attendance',

          element: <UtilsAttendance />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-salary',

          element: <UtilsSalary />
        }
      ]
    },

    // {
    //   path: 'utils',

    //   children: [
    //     {
    //       path: 'util-eregistration',

    //       element: <UtilsEregistration />
    //     }
    //   ]
    // },

    // {
    //   path: 'utils',

    //   children: [
    //     {
    //       path: 'util-details',

    //       element: <UtilsDetails />
    //     }
    //   ]
    // },

    {
      path: 'utils',

      children: [
        {
          path: 'util-shadow',

          element: <UtilsShadow />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-jeweltype',

          element: <UtilsJewelType />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-city',

          element: <UtilsCity />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-state',

          element: <UtilsState />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-purity',

          element: <UtilsPurity />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-loanscheme',

          element: <UtilsLoanScheme />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-relationtype',

          element: <UtilsRelationType />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-idcard',

          element: <UtilsIdCard />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-branch',

          element: <UtilsBranch />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-role',

          element: <UtilsRole />
        }
      ]
    },

    {
      path: 'icons',

      children: [
        {
          path: 'tabler-icons',

          element: <UtilsTablerIcons />
        }
      ]
    },

    {
      path: 'icons',

      children: [
        {
          path: 'material-icons',

          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-dailydateWisedueloans',

          element: <UtilsDailyDateWiseDueLoans />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-outstandingreport',

          element: <UtilsOutStandingReport />
        }
      ]
    },

    {
      path: 'utils',

      children: [
        {
          path: 'util-monthlypl',

          element: <UtilsMonthlyPL />
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-overduenoticereport',

          element: <UtilsOverdueNoticeReport/>
        }
      ]
    },
    {
      path: 'utils',

      children: [
        {
          path: 'util-Interestreceivedonjl',

          element: <UtilsInterestReceivedOnJL/>
        }
      ]
    },
    

    {
      path: 'sample-page',

      element: <SamplePage />
    }
  ]
};

export default AdminRoutess;
  