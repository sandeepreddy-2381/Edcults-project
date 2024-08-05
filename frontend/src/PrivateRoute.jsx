// PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { MyContext } from './App';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(MyContext);

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
