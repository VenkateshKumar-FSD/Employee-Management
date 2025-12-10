import React, { useCallback, useState, useContext } from "react";
import leaveService from "../../services/leaveService";
import { AuthContext } from "../../context/AuthContext";

export default function LeaveForm({ onRequested }){
  const { user } = useContext(AuthContext);
  const [fromDate,setFromDate]=useState('');
  const [toDate,setToDate]=useState('');
  const [reason,setReason]=useState('');
  const [loading,setLoading]=useState(false);
  const submit = useCallback(async (e)=>{ e.preventDefault();
    if(!user?.employeeId) return alert('No employee linked');
    setLoading(true);
    await leaveService.apply({ employeeId: user.employeeId, employeeName: user.name, fromDate, toDate, reason });
    setFromDate(''); setToDate(''); setReason('');
    setLoading(false);
    if(onRequested) onRequested();
    alert('Leave requested');
  },[fromDate,toDate,reason,user,onRequested]);
  return (
    <form className="card" onSubmit={submit}>
      <div style={{marginBottom:8}}><label>From</label><input type="date" value={fromDate} onChange={e=>setFromDate(e.target.value)} required/></div>
      <div style={{marginBottom:8}}><label>To</label><input type="date" value={toDate} onChange={e=>setToDate(e.target.value)} required/></div>
      <div style={{marginBottom:8}}><label>Reason</label><textarea value={reason} onChange={e=>setReason(e.target.value)} rows={3} required/></div>
      <div><button className="btn" type="submit" disabled={loading}>{loading?'Requesting...':'Request Leave'}</button></div>
    </form>
  );
}
