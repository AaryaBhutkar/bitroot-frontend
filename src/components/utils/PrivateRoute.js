// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // Adjust the path based on your file structure

function PrivateRoute({ element, ...rest }) {
  const { user } = useAuth();

  return (
    <Route {...rest} element={user ? element : <Navigate to="/login" />} />
  );
}

export default PrivateRoute;
