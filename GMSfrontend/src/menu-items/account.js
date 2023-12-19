import { IconUserCircle, IconUserPlus, IconList, IconCheckupList, IconChecklist, 
  IconRepeat, IconHandStop, IconChessKing, IconUser, IconMoneybag,
  IconReportMoney, IconUserCheck, IconCash,IconArmchair2,IconDiamond,IconCalculator,
  IconAddressBook,IconCurrencyRupee,IconTransferIn,IconBook,IconCoins,IconHomeDollar,IconBusinessplan,
  IconListDetails, IconHammer, IconMessageReport, IconMessages, IconDatabaseImport} from '@tabler/icons';

// constant
const icons = {
IconUserCircle,
IconUserPlus,
IconList,
IconListDetails,
IconChecklist,
IconRepeat,
IconHandStop,
IconChessKing,
IconUser,
IconMoneybag,
IconReportMoney,
IconUserCheck,
IconCash,
IconAddressBook,
IconListDetails,
IconHammer,
IconMessageReport,
IconMessages,
IconCurrencyRupee,
IconTransferIn,
IconDatabaseImport,
IconAddressBook,
IconBook,
IconCoins,
IconHomeDollar,
IconArmchair2,
IconDiamond,
IconBusinessplan,
IconCalculator


};
const account = {
  id: 'account',
  title: 'Account',
  type: 'group',
  children: [
      {
        id: 'tabler-icons',
        title: 'Scroll',
        type: 'collapse',
        icon: icons.IconCalculator,
        children: [
          {
            id: 'material-icons',
            title: 'Cash Scroll',
            type: 'item',
            icon: icons.IconCash,
            
            url: '/utils/util-cashscroll',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Transfer Scroll',
            type: 'item',
            icon: icons.IconTransferIn,
            url: '/utils/util-transferscroll',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'material-icons',
        title: 'Day Book',
        type: 'item',
        icon: icons.IconAddressBook,
        url: '/utils/util-daybook',
        breadcrumbs: false
      },
      {
        id: 'material-icons',
        title: 'BalanceSheet',
        type: 'item',
        icon: icons.IconBook        ,
        url: '/utils/util-balancesheet',
        breadcrumbs: false
      },
      {
        id: 'tabler-icons',
        title: 'General Ledger',
        type: 'collapse',
        icon: icons.IconListDetails,
        children: [
          {
            id: 'material-icons',
            title: 'Capital Account',
            type: 'item',
            icon: icons.IconCurrencyRupee,
            url: '/utils/util-capitalaccount',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Profit & Loss Account',
            type: 'item',
            icon: icons.IconCoins,
            url: '/utils/util-placcount',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Bank Account',
            type: 'item',
            icon: icons.IconHomeDollar,
            url: '/utils/util-bankaccount',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Cash on Hand',
            type: 'item',
            icon: icons.IconBusinessplan,
            url: '/utils/util-cashhand',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Jewel Loan',
            type: 'item',
            icon: icons.IconDiamond,
            url: '/utils/util-jewelloan',
            breadcrumbs: false
          },
         
          {
            id: 'material-icons',
            title: 'Suspence',
            type: 'item',
            icon: icons.IconCurrencyRupee,
            url: '/utils/util-suspence',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Expences',
            type: 'item',
            icon: icons.IconCurrencyRupee,
            url: '/utils/util-Expences',   
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Furniture',
            type: 'item',
            icon: icons.IconArmchair2,
            url: '/utils/util-Furniture',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Interest Received on JL',
            type: 'item',
            icon:icons.IconDiamond,
            url: '/utils/util-interestreceivedonjl',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'tabler-icons',
        title: 'Reports',
        type: 'collapse',
        icon: icons.IconListDetails,
        children: [
          {
            id: 'material-icons',
            title: 'OverDue Notice Report',
            type: 'item',
            icon: icons.IconCurrencyRupee,
            url: '/utils/util-Overduenoticereport',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'OutStanding Report',
            type: 'item',
            icon: icons.IconCoins,
            url: '/utils/util-Outstandingreport',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'DailyDueWise Report',
            type: 'item',
            icon: icons.IconHomeDollar,
            url: '/utils/util-Dailydatewisedueloans',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Monthly P&l',
            type: 'item',
            icon: icons.IconBusinessplan,
            url: '/utils/util-Monthlypl',
            breadcrumbs: false
          },
          
        ]
      },
    ]
  }
  
export default account;