import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleLogout } from "../utils/Logout";
import Layout from "../Layout1/Layout";
import Navbar from "../Layout1/Navbar";

const UserDetails = () => {
  const [showmenu, setshowmenu] = React.useState(false);
  const navigate = useNavigate();

    
  const handleLogoutClick = () => {
    setshowmenu(false); // close the menu before logout
    handleLogout(navigate);
  };
  const handleToggleMenu = () => {
    setshowmenu(!showmenu);
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    
<Layout>
    <Navbar
      showMenu={showmenu}
      onToggleMenu={handleToggleMenu}
      onLogout={handleLogoutClick}
      onDashboard={handleNavigateToDashboard}
    />

<div
  className="user-form-container"
  style={{
    padding: "40px",
    maxWidth: "600px",
    margin: "50px auto",
    backgroundColor: "#000",
    border: "2px solid violet",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(138, 43, 226, 0.5)",
    marginTop: "100px",
  }}
>
  <h2 className="form-title" style={{ textAlign: "center", color: "violet", marginBottom: "25px" }}>
    User Profile
  </h2>
  <form className="user-form" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
    <input name="name" placeholder="Name" required style={inputStyle} />
    <input name="email" type="email" placeholder="Email" required style={inputStyle} />
    <input name="password" type="password" placeholder="Password" required style={inputStyle} />
    <input name="phone" placeholder="Phone" style={inputStyle} />
    <textarea name="bio" placeholder="Short bio..." style={inputStyle} />
    <textarea name="goals" placeholder="What are your goals?" style={inputStyle} />
    <input name="github" placeholder="GitHub URL" style={inputStyle} />
    <input name="linkedin" placeholder="LinkedIn URL" style={inputStyle} />
    <button type="submit" style={buttonStyle}>Update Profile</button>
  </form>
</div>
      </Layout>
  );
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #8a2be2",
  borderRadius: "5px",
  backgroundColor: "#111",
  color: "#fff",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#8a2be2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "bold",
  cursor: "pointer",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

export default UserDetails;
