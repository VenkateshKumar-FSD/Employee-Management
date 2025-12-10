import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      if (res.role === "admin") {
        nav("/admin/dashboard");
      } else {
        alert("This is not an admin account!");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="login-container"
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
        className="login-card"
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "10px",
          padding: "35px 30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#2d6a4f",
          }}
        >
          Admin Login
        </h2>

        <form onSubmit={submit}>
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
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "5px",
              marginBottom: "20px",
              borderRadius: "6px",
              border: "1px solid #b7e4c7",
            }}
          />

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
            }}
          >
            Login
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Don’t have an account?{" "}
          <Link
            to="/admin/signup"
            style={{ color: "#2d6a4f", fontWeight: "600" }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
