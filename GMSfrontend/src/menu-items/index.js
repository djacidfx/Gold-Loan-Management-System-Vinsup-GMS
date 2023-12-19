import dashboard from './dashboard';
import utilitiesA from './utilitiesA';
import utilities from './utilities';
import account from './account';
import others from './others';
const menuItems = {
  items: []
};
// Retrieve the user's role from local storage
const userRole = localStorage.getItem('userRole');

if (userRole === 'admin') {
  // If the user is a superadmin, show superadmin menu items
  menuItems.items = [dashboard, utilitiesA, account];
} else {
  // For all other users, show regular menu items
  menuItems.items = [dashboard, utilities, account];
}

export default menuItems;