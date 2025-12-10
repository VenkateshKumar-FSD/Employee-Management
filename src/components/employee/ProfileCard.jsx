import React, { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";

export default function ProfileCard({ employeeId }){
  const [emp,setEmp]=useState(null);
  useEffect(()=>{ if(!employeeId) return; (async()=>{ const r=await employeeService.get(employeeId); setEmp(r.data); })() },[employeeId]);
  if(!emp) return <div className="card">No profile</div>;
  return (
    <div className="card">
      <div style={{fontWeight:700,fontSize:18}}>{emp.name}</div>
      <div className="text-muted">{emp.email}</div>
      <div><strong>Department:</strong> {emp.department||'-'}</div>
      <div><strong>Salary:</strong> {emp.salary?`₹${emp.salary}`:'-'}</div>
    </div>
  );
}
