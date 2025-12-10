import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import leaveService from "../../services/leaveService";

export default function MyLeaveStatus(){
  const { user } = useContext(AuthContext);
  const [list,setList]=useState([]);
  useEffect(()=>{ if(!user?.employeeId) return; (async()=>{ const r=await leaveService.listByEmployee(user.employeeId); setList(r.data) })() },[user]);
  return (
    <div>
      <h1 style={{color:'var(--green-dark)'}}>My Leaves</h1>
      <div style={{marginTop:12,display:'grid',gap:8}}>
        {list.length===0 && <div className="text-muted">No leaves</div>}
        {list.map(l=> <div key={l.id} className="card"><div style={{fontWeight:700}}>{l.fromDate} → {l.toDate}</div><div className="text-muted">{l.reason}</div><div>Status: {l.status}</div></div>)}
      </div>
    </div>
  );
}
