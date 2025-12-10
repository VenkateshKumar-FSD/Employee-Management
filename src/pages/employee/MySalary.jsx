import React, { useEffect, useState } from "react";
import employeeService from "../../services/employeeService";
import { AuthContext } from "../../context/AuthContext";
import ReactContext from "react";

export default function MySalary(){
  return <div><h1 style={{color:'var(--green-dark)'}}>My Salary</h1><div className="text-muted">Salary details will appear here.</div></div>
}
