// src/components/Navbar.jsx
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/Logout";

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const Navbar = () => {
  const [showmenu, setShowmenu] = React.useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => setShowmenu(!showmenu);
  const handleLogoutClick = () => {
    setShowmenu(false);
    handleLogout(navigate);
  };
  const handleNavigateTouser = () => {
    navigate("/userdetails");
  };

  const NavigateDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "80px",
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "5px",
        color: "#fff",
        zIndex: 10,
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)"
        
      }}
      
    >
      <div style={{ fontSize: "2rem", fontWeight: "bold" }} onClick = { NavigateDashboard }>
        WeCode 
      </div>

      <div style={{ display: "flex", gap: "25px", fontSize: "15px" }}>
        <a href="#home" style={linkStyle}>Home</a>
        <a href="#courses" style={linkStyle}>Courses</a>
        <a href="#about" style={linkStyle}>About</a>
        <a href="#webdev" style={linkStyle}>Web Dev</a>
        <a href="#dsa" style={linkStyle}>DSA</a>
        <a href="#devops" style={linkStyle}>DevOps</a>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ position: "relative" }}>
          <button
            onClick={handleToggleMenu}
            style={{
              background: "rgba(255,255,255,0.1)",
              padding: "15px 30px",
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(9, 21, 125, 0.6))`,
              borderRadius: "50%",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              cursor: "pointer",
              backdropFilter: "blur(5px)",
              marginRight: "40px",
            }}
          >
            Profile ▼
          </button>

          {showmenu && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                right: 0,
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                padding: "10px",
                minWidth: "160px",
                zIndex: 20
                ,
              }}
            >
              <button onClick={handleNavigateTouser} style={{ padding: "8px", color: "#fff" , backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
                User Details
              </button>
              <button onClick={() => console.log("Problem Solved clicked")} style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
                Problem Solved
              </button>
              <button onClick={handleLogoutClick} style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;