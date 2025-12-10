import React, { useState } from "react";
import employeeService from "../../services/employeeService";
import { useNavigate } from "react-router-dom";

export default function AddEmployee(){
  const [form,setForm]=useState({name:'',email:'',department:'',role:'',salary:''});
  const nav = useNavigate();
  const submit = async (e)=>{ e.preventDefault(); await employeeService.create(form); nav('/admin/employees'); };
  return (
    <div className="page" style={{maxWidth:700}}>
      <h1 style={{color:'var(--green-dark)'}}>Add Employee</h1>
      <form onSubmit={submit}>
        {['name','email','department','role','salary'].map(f=>(
          <div key={f} style={{marginBottom:8}}><label>{f}</label><input name={f} value={form[f]} onChange={e=>setForm({...form,[f]:e.target.value})} required/></div>
        ))}
        <button className="btn">Save</button>
      </form>
    </div>
  );
}
