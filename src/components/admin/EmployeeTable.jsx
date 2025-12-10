import React, { useEffect, useState, useCallback } from "react";
import employeeService from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

export default function EmployeeTable(){
  const [list,setList]=useState([]);
  const [q,setQ]=useState('');
  const nav = useNavigate();
  const load = useCallback(async ()=>{ const r = await employeeService.list(); setList(r.data.data); },[]);
  useEffect(()=>{ load(); },[load]);
  const del = async (id)=>{ if(!confirm('Delete?')) return; await employeeService.remove(id); load(); };
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
        <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
        <button className="btn" onClick={()=>nav('/admin/employees/add')}>+ Add</button>
      </div>
      <div style={{display:'grid',gap:8}}>
        {list.map(e=>(
          <div key={e.id} className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div>
              <div style={{fontWeight:700}}>{e.name}</div>
              <div className="text-muted" style={{fontSize:13}}>{e.email} • {e.department||'-'}</div>
            </div>
            <div style={{display:'flex',gap:8}}>
              <button className="btn" onClick={()=>nav(`/admin/employees/details/${e.id}`)}>View</button>
              <button className="btn" onClick={()=>nav(`/admin/employees/edit/${e.id}`)}>Edit</button>
              <button className="btn" onClick={()=>del(e.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
