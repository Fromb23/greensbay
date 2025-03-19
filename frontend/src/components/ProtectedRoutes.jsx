import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const adminToken = localStorage.getItem("adminToken");
  const customerToken = JSON.parse(localStorage.getItem("accessToken"));
  console.log("ProtectedRoute userInfo:", customerToken);

  if (role === "ADMIN") {
    return adminToken ? <Outlet /> : <Navigate to="/auth/admin/login" />;
  } else if (role === "CUSTOMER") {
    return customerToken ? <Outlet /> : <Navigate to="/auth/login" />;
  }

  return <Navigate to="/" />;
};

export default ProtectedRoute;