import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/authContext'; // Assuming you have a custom AuthProvider hook

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth(); // Assuming isAuthenticated is a boolean indicating if the user is logged in

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
