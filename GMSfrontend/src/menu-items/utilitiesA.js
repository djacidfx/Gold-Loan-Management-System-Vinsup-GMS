import {
    IconUserCircle,
    IconUserPlus,
    IconList,
    IconCheckupList,
    IconChecklist,
    IconRepeat,
    IconReplace ,
    IconUser,
    IconUsers,
    IconMoneybag,
    IconReportMoney,
    IconUserCheck,
    IconCoinRupee,
    IconAddressBook,
    IconListDetails,
    IconHammer,
    IconMessageReport,
    IconMessages,
    IconDatabaseImport,
    IconHeartHandshake,
    IconHomeSearch,
    IconDiamond,
    IconReceipt,
    IconBuildingEstate
  } from '@tabler/icons';
  
  // constant
  const icons = {
    IconUserCircle,
    IconUserPlus,
    IconList,
    IconCheckupList,
    IconChecklist,
    IconRepeat,
    IconReplace,
    IconUser,
    IconUsers,
    IconMoneybag,
    IconReportMoney,
    IconUserCheck,
    IconCoinRupee,
    IconAddressBook,
    IconListDetails,
    IconHammer,
    IconMessageReport,
    IconMessages,
    IconDatabaseImport,
    IconHeartHandshake,
    IconHomeSearch,
    IconDiamond,
    IconReceipt,
    IconBuildingEstate
  };
  const utilities = {
    id: 'utilities',
    title: 'Master',
    type: 'group',
    children: [
      {
        id: 'registration',
        title: 'Customer Registration',
        type: 'collapse',
        icon: icons.IconUserCircle,
        children: [
          {
            id: 'tabler-icons',
            title: 'Add Customer',
            type: 'item',
            icon: icons.IconUserPlus,
            url: '/utils/util-registration',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'List Customer',
            type: 'item',
            icon: icons.IconList,
            url: '/utils/util-list',
            breadcrumbs: false
          }
        ]
      },
      {
        id: 'icons',
        title: 'Loan Process',
        type: 'collapse',
        icon: icons.IconCheckupList,
        children: [
          {
            id: 'tabler-icons',
            title: 'Loan Approval',
            type: 'item',
            icon: icons.IconChecklist,
            url: '/utils/util-loanapprovalA',
            breadcrumbs: false
          },
          {
            id: 'tabler-icons',
            title: 'Loan List',
            type: 'item',
            icon: icons.IconChecklist,
            url: '/utils/util-loanlistA',
            breadcrumbs: false
          },
          {
            id: 'material-icons',
            title: 'Repayment',
            type: 'item',
            icon: icons.IconRepeat,
            url: '/utils/util-repayment',
            breadcrumbs: false
          }
        ]
      },
     
      {
        id: 'util-gold',
        title: 'Gold Rate Update',
        type: 'item',
        url: '/utils/util-gold',
        icon: icons.IconMoneybag,
        breadcrumbs: false
      },
     
  
      {
        id: 'icons',
        title: 'Master',
        type: 'collapse',
        icon: icons.IconDatabaseImport,
  
        children: [
          {
            id: 'tabler-icons',
            title: 'Jewel Type',
            type: 'item',
            icon: icons.IconDiamond,
            url: '/utils/util-jeweltype',
            breadcrumbs: false
          },
          {
            id: 'tabler-icons',
            title: 'City',
            type: 'item',
            icon: icons.IconHomeSearch,
            url: '/utils/util-city',
            breadcrumbs: false
          },
          // {
          //   id: 'tabler-icons',
          //   title: 'State',
          //   type: 'item',
          //   icon: icons.IconBuildingEstate,
          //   url: '/utils/util-state',
          //   breadcrumbs: false
          // },
         
          {
            id: 'tabler-icons',
            title: 'Loan Scheme',
            type: 'item',
            icon: icons.IconReceipt,
            url: '/utils/util-loanscheme',
            breadcrumbs: false
          },
          {
            id: 'tabler-icons',
            title: 'Relation Type',
            type: 'item',
            icon: icons.IconHeartHandshake,
            url: '/utils/util-relationtype',
            breadcrumbs: false
          },
         
        ]
      }
    ]
  };
  
  export default utilities;