import React, { useCallback, useEffect, useState } from "react";
import leaveService from "../../services/leaveService";
import LeaveRequestCard from "../../components/admin/LeaveRequestCard";

export default function LeaveRequests(){
  const [list,setList]=useState([]);
  const load = useCallback(async ()=>{ const r = await leaveService.listAll(); setList(r.data); },[]);
  useEffect(()=>{ load(); },[load]);
  return (
    <div>
      <h1 style={{color:'var(--green-dark)'}}>Leave Requests</h1>
      <div style={{marginTop:12,display:'grid',gap:8}}>
        {list.length===0 && <div className="text-muted">No leave requests</div>}
        {list.map(l=> <LeaveRequestCard key={l.id} record={l} onUpdate={load} />)}
      </div>
    </div>
  );
}
