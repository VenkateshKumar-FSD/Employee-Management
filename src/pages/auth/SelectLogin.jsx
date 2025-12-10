import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // <-- Make sure logo exists

export default function SelectLogin() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E8F5E9", // Light green background
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {/* LOGO */}
      <img
        src="https://png.pngtree.com/element_our/sm/20180413/sm_5ad0cc74293e1.jpg"
        alt="EMS Logo"
        style={{
          width: "150px",
          height: "150px",
          marginBottom: "20px",
          borderRadius:"100px"
        }}
      />

      {/* TITLE */}
      <h1
        style={{
          color: "#1B5E20",
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        Welcome to the Employee Management System
      </h1>

      <p
        style={{
          color: "#2E7D32",
          fontSize: "18px",
          marginBottom: "30px",
        }}
      >
        Choose your portal to continue
      </p>

      {/* LOGIN BUTTONS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "25px" }}>
        {/* Employee Login */}
        <Link
          to="/login"
          style={{
            padding: "12px 28px",
            background: "#FFFFFF",
            border: "2px solid #4CAF50",
            color: "#2E7D32",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            minWidth: "170px",
          }}
        >
          Employee Login
        </Link>

        {/* Admin Login */}
        <Link
          to="/admin/login"
          style={{
            padding: "12px 28px",
            background: "#4CAF50",
            color: "white",
            fontSize: "18px",
            borderRadius: "8px",
            fontWeight: "600",
            textDecoration: "none",
            minWidth: "170px",
          }}
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
}
