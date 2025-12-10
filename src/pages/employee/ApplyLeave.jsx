import React from "react";
import LeaveForm from "../../components/employee/LeaveForm";

export default function ApplyLeave() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "25px",
      }}
    >
      {/* Page Title */}
      <h1
        style={{
          color: "#2d6a4f",
          marginBottom: "20px",
          textAlign: "center",
          fontWeight: "700",
        }}
      >
        Apply for Leave
      </h1>

      {/* Card Layout for the Leave Form */}
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <LeaveForm />
      </div>
    </div>
  );
}
