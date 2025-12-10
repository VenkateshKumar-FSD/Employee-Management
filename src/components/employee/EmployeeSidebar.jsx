import React from "react";
import { NavLink } from "react-router-dom";
export default function EmployeeSidebar({open=true}){ if(!open) return null;
  return (
    <aside className="sidebar">
      <h3 style={{color:'white'}}>Employee</h3>
      <nav>
        <NavLink to="/employee/dashboard">Dashboard</NavLink>
        <NavLink to="/employee/profile">My Profile</NavLink>
        <NavLink to="/employee/attendance">Attendance</NavLink>
        <NavLink to="/employee/apply-leave">Apply Leave</NavLink>
        <NavLink to="/employee/my-leaves">My Leaves</NavLink>
        <NavLink to="/employee/salary">Salary</NavLink>
      </nav>
    </aside>
  );
}


