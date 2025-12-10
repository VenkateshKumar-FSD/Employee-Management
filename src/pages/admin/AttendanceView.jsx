import React, { useEffect, useState } from "react";
import attendanceService from "../../services/attendanceService";

export default function AttendanceView(){
  const [logs,setLogs]=useState([]);
  useEffect(()=>{ (async()=>{ const r = await attendanceService.listAll(); setLogs(r.data); })() },[]);
  return (
    <div>
      <h1 style={{color:'var(--green-dark)'}}>Attendance (All)</h1>
      <div style={{marginTop:12,display:'grid',gap:8}}>
        {logs.length===0 && <div className="text-muted">No logs</div>}
        {logs.map(l=>(
          <div key={l.id} className="card" style={{display:'flex',gap:12,alignItems:'flex-start'}}>
            <div style={{width:120}}>
              <div style={{fontSize:13,color:'var(--muted)'}}>{l.employeeId}</div>
              <div style={{fontWeight:700}}>{l.date}</div>
            </div>
            <div style={{flex:1}}>
              <div><strong>In:</strong> {l.clockIn?new Date(l.clockIn).toLocaleString():'-'}</div>
              <div><strong>Out:</strong> {l.clockOut?new Date(l.clockOut).toLocaleString():'-'}</div>
            </div>
            <div style={{width:180}}>
              {l.photoIn ? <img src={l.photoIn} style={{width:160}} alt="in" /> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
