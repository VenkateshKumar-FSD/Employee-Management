import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import employeeService from "../../services/employeeService";

export default function EmployeeDetails(){
  const { id } = useParams();
  const [emp,setEmp]=useState(null);
  useEffect(()=>{ (async()=>{ const r = await employeeService.get(id); setEmp(r.data); })() },[id]);
  if(!emp) return <div className="page">Loading...</div>;
  return (
    <div className="page">
      <h1>Employee Details</h1>
      <div className="card">
        <p><strong>Name:</strong> {emp.name}</p>
        <p><strong>Email:</strong> {emp.email}</p>
        <p><strong>Department:</strong> {emp.department}</p>
        <p><strong>Salary:</strong> {emp.salary}</p>
      </div>
    </div>
  );
}
