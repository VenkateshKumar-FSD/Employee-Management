import React, { useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import AdminSidebar from "../components/admin/AdminSidebar";
import { AuthContext } from "../context/AuthContext";

export default function AdminLayout(){
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const loc = useLocation();
  if(!user) return <Navigate to="/admin/login" state={{from:loc}} replace />;
  if(user.role !== "admin") return <Navigate to="/employee/dashboard" replace />;
  return (
    <div className="app-root">
      <Navbar onToggle={()=>setOpen(o=>!o)} />
      <AdminSidebar open={open} />
      <main className={`page ${open ? "page--with-sidebar": ""}`}><Outlet /></main>
    </div>
  );
}
