import React, { useCallback } from "react";
import leaveService from "../../services/leaveService";

export default function LeaveRequestCard({ record, onUpdate }){
  const approve = useCallback(async ()=>{ await leaveService.approve(record.id); onUpdate(); },[record,onUpdate]);
  const reject = useCallback(async ()=>{ await leaveService.reject(record.id); onUpdate(); },[record,onUpdate]);
  return (
    <div className="card" style={{display:'flex',justifyContent:'space-between',gap:12}}>
      <div>
        <div style={{fontWeight:700}}>{record.employeeName}</div>
        <div className="text-muted">{record.fromDate} → {record.toDate}</div>
        <div style={{marginTop:8}}>{record.reason}</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div style={{fontWeight:700,color: record.status==='pending' ? 'orange' : record.status==='approved' ? 'green' : 'red' }}>{record.status}</div>
        {record.status==='pending' && <>
          <button className="btn" onClick={approve}>Approve</button>
          <button className="btn" onClick={reject}>Reject</button>
        </>}
      </div>
    </div>
  );
}
