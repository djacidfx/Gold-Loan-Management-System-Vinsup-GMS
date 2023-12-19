import { IconDeviceDesktopAnalytics} from '@tabler/icons';

const icons = { IconDeviceDesktopAnalytics};

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDeviceDesktopAnalytics,
      breadcrumbs: false
    }
  ]
};

export default dashboard;