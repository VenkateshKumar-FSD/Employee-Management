import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onToggle }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/select-login"); // ⬅ always redirect here
  };

  return (
    <header className="navbar">
      <div>
        <button className="btn" onClick={onToggle}>
          ☰
        </button>
        <span className="logo">EMS</span>
      </div>

      <div>
        <span>
          {user?.name} ({user?.role})
        </span>
        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
