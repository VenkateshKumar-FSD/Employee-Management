import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function EmployeeRoute() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "employee")
    return <Navigate to="/admin/dashboard" replace />;

  return <Outlet />;
}
