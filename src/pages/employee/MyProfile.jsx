import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import employeeService from "../../services/employeeService";

export default function MyProfile() {
  const { user } = useContext(AuthContext);
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    if (!user?.employeeId) return;

    (async () => {
      const r = await employeeService.get(user.employeeId);
      setEmp(r.data);
    })();
  }, [user]);

  if (!emp)
    return (
      <div className="page" style={{ textAlign: "center", padding: 40 }}>
        <h3>No Profile Found</h3>
      </div>
    );

  return (
    <div
      className="page"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#2d6a4f",
          marginBottom: "25px",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        My Profile
      </h1>

      {/* Profile Card */}
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* Avatar + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "#d8f3dc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              color: "#2d6a4f",
              fontWeight: "700",
            }}
          >
            {emp.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 style={{ margin: 0, color: "#1b4332" }}>{emp.name}</h2>
            <p
              style={{
                marginTop: "5px",
                color: "#6c757d",
                fontSize: "14px",
              }}
            >
              Employee ID: {user.employeeId}
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div style={{ marginTop: "20px" }}>
          <h3
            style={{
              color: "#2d6a4f",
              marginBottom: "10px",
              borderBottom: "2px solid #b7e4c7",
              paddingBottom: "5px",
              fontSize: "18px",
            }}
          >
            Personal Details
          </h3>

          <div style={{ marginBottom: "12px" }}>
            <strong>Email:</strong>
            <span style={{ marginLeft: "10px", color: "#555" }}>
              {emp.email}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Department:</strong>
            <span style={{ marginLeft: "10px", color: "#555" }}>
              {emp.department || "-"}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Joining Date:</strong>
            <span style={{ marginLeft: "10px", color: "#555" }}>
              {emp.joinedDate || "-"}
            </span>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <strong>Salary:</strong>
            <span style={{ marginLeft: "10px", color: "#555" }}>
              {emp.salary ? `₹${emp.salary}` : "Not Assigned"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
