import React, { useEffect, useState, useCallback } from "react";
import employeeService from "../../services/employeeService";
import leaveService from "../../services/leaveService";
import attendanceService from "../../services/attendanceService";

export default function AdminDashboard(){
  const [employees,setEmployees]=useState([]);
  const [leaves,setLeaves]=useState([]);
  const [att,setAtt]=useState([]);
  const load = useCallback(async ()=>{ const e = await employeeService.list(); const l = await leaveService.listAll(); const a = await attendanceService.listAll(); setEmployees(e.data.data); setLeaves(l.data); setAtt(a.data); },[]);
  useEffect(()=>{ load(); },[load]);
  return (
    <div>
      <h1 style={{color:'var(--green-dark)'}}>Admin Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:12}}>
        <div className="card"><div className="text-muted">Total employees</div><div style={{fontWeight:700}}>{employees.length}</div></div>
        <div className="card"><div className="text-muted">Pending leaves</div><div style={{fontWeight:700}}>{leaves.filter(x=>x.status==='pending').length}</div></div>
        <div className="card"><div className="text-muted">Attendance logs</div><div style={{fontWeight:700}}>{att.length}</div></div>
      </div>
    </div>
  );
}
