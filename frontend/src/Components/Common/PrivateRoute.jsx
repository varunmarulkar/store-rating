import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; 
  }

  // Check if the user is authenticated and has an allowed role
  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  // If not authenticated or not authorized, redirect to the login page
  return <Navigate to="/signin" />;
};

export default PrivateRoute;