import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  console.log("Token:", token);
  console.log("User Role:", userRole);
  console.log("Required Role:", role);


  // Redirect unauthenticated users to Landing Page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Redirect users with incorrect roles to Landing Page
  if (role && !role.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
