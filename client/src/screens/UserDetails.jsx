import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleLogout } from "../utils/Logout";
import Layout from "../Layout1/Layout";
import Navbar from "../Layout1/Navbar";

const UserDetails = () => {
  const [showmenu, setshowmenu] = React.useState(false);
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_USER_PROFILE, {
          withCredentials: true,
        });

        const data = res.data.user;
        setName(data.name || "");
        setEmail(data.email || "");
        setBio(data.bio || "");
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogoutClick = () => {
    setshowmenu(false);
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

      <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff",marginBottom: "2rem", fontFamily: "sans-serif", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4rem", maxWidth: "1000px", width: "100%" }}>
          <img
            src={`https://api.dicebear.com/7.x/micah/svg?seed=${name}`}
            alt="Profile"
            style={{ borderRadius: "50%", width: "180px", height: "180px", objectFit: "cover" }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>{name}</h2>
              <button
                onClick={() => navigate("/userupdatedetails")}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  fontSize: "1rem"
                }}
              >
                Edit Profile
              </button>
            </div>
            <p>Email: {email}</p>
            <p style={{ marginTop: "0.5rem" }}>{bio}</p>
          </div>
        </div>
      </div>
      <div style={{ padding: "2rem", backgroundColor: "#000", color: "#fff" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Posts</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "auto",
            gap: "1rem",
            paddingBottom: "1rem",
          }}
        >
          {/* Placeholder cards for posts */}
          {[...Array(5)].map((_, idx) => (
            <div
              key={idx}
              style={{
                minWidth: "200px",
                height: "200px",
                backgroundColor: "#1a1a1a",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontSize: "14px",
              }}
            >
              Post {idx + 1}
            </div>
          ))}
        </div>
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
