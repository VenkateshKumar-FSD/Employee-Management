import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import EmployeeSidebar from "../components/employee/EmployeeSidebar";
import { AuthContext } from "../context/AuthContext";

export default function EmployeeLayout(){
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const loc = useLocation();
  if(!user) return <Navigate to="/login" state={{from:loc}} replace />;
  if(user.role !== "employee") return <Navigate to="/admin/dashboard" replace />;
  return (
    <div className="app-root">
      <Navbar onToggle={()=>setOpen(o=>!o)} />
      <EmployeeSidebar open={open} />
      <main className={`page ${open ? "page--with-sidebar": ""}`}><Outlet /></main>
    </div>
  );
}
