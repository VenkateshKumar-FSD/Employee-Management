import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../services/employeeService";

export default function EditEmployee(){
  const { id } = useParams();
  const nav = useNavigate();
  const [form,setForm]=useState(null);
  useEffect(()=>{ (async()=>{ const r = await employeeService.get(id); setForm(r.data); })() },[id]);
  if(!form) return <div className="page">Loading...</div>;
  const submit = async (e)=>{ e.preventDefault(); await employeeService.update(id,form); nav('/admin/employees'); };
  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 style={{color:'var(--green-dark)'}}>Edit Employee</h1>
      <form onSubmit={submit}>
        {['name','email','department','role','salary'].map(f=>(
          <div key={f} style={{marginBottom:8}}><label>{f}</label><input name={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})} /></div>
        ))}
        <button className="btn">Update</button>
      </form>
    </div>
  );
}
