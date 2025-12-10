import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import employeeService from "../../services/employeeService";
import leaveService from "../../services/leaveService";

export default function EmployeeDashboard(){
  const { user } = useContext(AuthContext);
  const [emp,setEmp]=useState(null);
  const [leaves,setLeaves]=useState([]);
  useEffect(()=>{ if(!user?.employeeId) return; (async()=>{ const r = await employeeService.get(user.employeeId); setEmp(r.data); const l = await leaveService.listByEmployee(user.employeeId); setLeaves(l.data); })() },[user]);
  return (
    <div>
      <h1 style={{color:'var(--green-dark)'}}>Employee Dashboard</h1>
      <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:12,marginTop:12}}>
        <div>
          <div className="card"><div className="text-muted">Name</div><div style={{fontWeight:700}}>{emp?.name}</div></div>
          <div style={{marginTop:8}} className="card"><div className="text-muted">Department</div><div style={{fontWeight:700}}>{emp?.department || "-"}</div></div>
        </div>
        <aside>
          <div className="card"><div className="text-muted">Leaves</div><div style={{fontWeight:700}}>{leaves.length}</div></div>
        </aside>
      </div>
    </div>
  );
}
