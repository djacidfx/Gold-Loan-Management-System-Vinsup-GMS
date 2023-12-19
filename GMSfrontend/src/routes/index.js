import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AdminRoutess from './AdminRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

function ThemeRoutes() {
  // Retrieve the user's role from local storage
  const userRole = localStorage.getItem('userRole');
  let routes;

  if (userRole == 'admin') {
    // If the user is a superadmin, show superadmin routes
  
    routes = [AdminRoutess, AuthenticationRoutes];
  } else {
    // For all other users, show admin routes
    routes = [MainRoutes, AuthenticationRoutes];
  }

  const routing = useRoutes(routes);

  return routing;
}

export default ThemeRoutes;