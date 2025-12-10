import React from "react";
import { NavLink } from "react-router-dom";
export default function AdminSidebar({open=true}){
  if(!open) return null;
  return (
    <aside className="sidebar">
      <h3 style={{color:'white'}}>Admin</h3>
      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/employees">Employees</NavLink>
        <NavLink to="/admin/leave-requests">Leave Requests</NavLink>
        <NavLink to="/admin/attendance">Attendance</NavLink>
        <NavLink to="/admin/salary">Salary</NavLink>
      </nav>
    </aside>
  );
}
