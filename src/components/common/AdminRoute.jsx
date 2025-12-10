import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminRoute() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/admin/login" replace />;
  if (user.role !== "admin")
    return <Navigate to="/employee/dashboard" replace />;

  return <Outlet />;
}
