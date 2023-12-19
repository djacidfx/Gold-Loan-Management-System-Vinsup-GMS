import React, { useContext, useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isLoggedIn, verifyToken } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);

  useEffect(() => {
    if (!isAuthenticated) {
      verifyToken()
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    }
  }, [isAuthenticated, verifyToken]);

  if(isAuthenticated === null) {
    // In case we don't know yet if user is authenticated
    // This should return some loading state
    return null;
  }

  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/pages/login/login3" replace />}
    />
  );
};

export default ProtectedRoute;
