
import {
  IconUserCircle,
  IconUserPlus,
  IconList,
  IconCheckupList,
  IconChecklist,
  IconRepeat,
  IconHandStop,
  IconChessKing,
  IconUser,
  IconMoneybag,
  IconReportMoney,
  IconUserCheck,
  IconCurrencyRupee,
  IconAddressBook,
  IconListDetails,
  IconHammer,
  IconMessageReport,
  IconMessages,
  IconDatabaseImport
} from '@tabler/icons';

// constant
const icons = {
  IconUserCircle,
  IconUserPlus,
  IconList,
  IconCheckupList,
  IconChecklist,
  IconRepeat,
  IconHandStop,
  IconChessKing,
  IconUser,
  IconMoneybag,
  IconReportMoney,
  IconUserCheck,
  IconCurrencyRupee,
  IconAddressBook,
  IconListDetails,
  IconHammer,
  IconMessageReport,
  IconMessages,
  IconDatabaseImport
};
const others = {
  id: 'others',
  title: 'Other',
  type: 'group',
  children: [
    {
      id: 'icons',
      title: 'Employee Registration',
      type: 'collapse',
      icon: icons.IconUserCircle,
      children: [
        {
          id: 'tabler-icons',
          title: 'Employee Registration',
          type: 'item',
          icon: icons.IconUserPlus,
          url: '/utils/util-eregistration',
          breadcrumbs: false
        },
        // {
        //   id: 'material-icons',
        //   title: 'Employee Details',
        //   type: 'item',
        //   icon: icons.IconListDetails,
        //   url: '/utils/util-employeedetails',
        //   breadcrumbs: false
        // }
      ]
    },
    // {
    //   id: 'util-shadow',
    //   title: 'Auction',
    //   type: 'item',
    //   url: '/utils/util-auction',
    //   icon: icons.IconHammer,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'util-report',
    //   title: 'Report',
    //   type: 'item',
    //   url: '/utils/util-report',
    //   icon: icons.IconMessageReport,
    //   breadcrumbs: false
    // },
    {
      id: 'util-feedback',
      title: 'Complaints & Feedback',
      type: 'item',
      url: '/utils/util-feedback',
      icon: icons.IconMessages,
      breadcrumbs: false
    }
  ]
};
export default others;