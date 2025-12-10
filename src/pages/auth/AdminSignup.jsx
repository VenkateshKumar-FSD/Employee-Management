import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function AdminSignup() {
  const { signup } = useContext(AuthContext);
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await signup({
        name,
        email,
        password,
        role: "admin",
        profile: { department: "Admin" },
      });

      nav("/admin/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5fdf5",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          padding: "35px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#2d6a4f",
            marginBottom: "25px",
          }}
        >
          Admin Signup
        </h2>

        <form onSubmit={submit}>
          {/* NAME */}
          <label style={{ fontWeight: "600", color: "#2d6a4f" }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "18px",
              borderRadius: "6px",
              border: "1px solid #b7e4c7",
            }}
          />

          {/* EMAIL */}
          <label style={{ fontWeight: "600", color: "#2d6a4f" }}>Email</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "18px",
              borderRadius: "6px",
              border: "1px solid #b7e4c7",
            }}
          />

          {/* PASSWORD */}
          <label style={{ fontWeight: "600", color: "#2d6a4f" }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "22px",
              borderRadius: "6px",
              border: "1px solid #b7e4c7",
            }}
          />

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#2d6a4f",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              fontSize: "16px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Create Admin Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p style={{ textAlign: "center", marginTop: "18px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to="/admin/login"
            style={{ color: "#2d6a4f", fontWeight: "600" }}
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
