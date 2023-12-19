import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  const verifyToken = async () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      try {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/protected`, {
          headers: { 'authorization': savedToken }
        });
        const decoded = jwt_decode(savedToken);
        const currentTime = Date.now().valueOf() / 1000;
        if (decoded.hasOwnProperty('exp') && decoded.exp >= currentTime) {
          setToken(savedToken);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setToken(null);
        }
      } catch (error) {
        console.error('Failed to verify token:', error);
        setIsLoggedIn(false);
        setToken(null);
      }
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, verifyToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
