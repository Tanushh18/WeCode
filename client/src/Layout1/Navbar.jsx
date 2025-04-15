import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { handleLogout } from "../utils/Logout";
import { createroom, joinroom } from "../Rooms/room.jsx";
import { io } from "socket.io-client";
const socket = io(process.env.REACT_APP_SOCKET_URL);

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
};

const Navbar = () => {
  const [showmenu, setShowmenu] = React.useState(false);
  const [joinRoomId, setJoinRoomId] = React.useState("");
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isDsaDashboard = location.pathname.startsWith("/dsadashboard");

  const handleToggleMenu = () => setShowmenu(!showmenu);
  const handleLogoutClick = () => {
    setShowmenu(false);
    handleLogout(navigate);
  };
  const handleNavigateTouser = () => {
    navigate("/userdetails");
  };
  const NavigateDashboard = () => {
    navigate("/dsadashboard");
  }

  const NavigateFeed = () => {
    navigate("/Feed");
  };

  const handleCreateRoom = () => createroom(navigate);

  const handleJoinRoom = () => {
    if (!joinRoomId) {
      alert("Please enter a Room ID!");
      return;
    }
    joinroom(joinRoomId, navigate);
  };

  const handleNavigateToFollowDashboard = () => {
    navigate("/follow-dashboard");
  };

  const handleNavigateToUploadPost = () => {
    navigate("/upload-post");
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
      <div onClick={NavigateFeed} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
        <img src="/wecode logo.png" alt="WeCode Logo" style={{ height: "40px" }} />
        <span style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>WeCode</span>
      </div>

      <div style={{ display: "flex", gap: "25px", fontSize: "15px" }}>
        <span style={linkStyle} onClick={NavigateFeed}>Home</span>
        <a href="#courses" style={linkStyle}>Courses</a>
        <a href="#about" style={linkStyle}>About</a>
        <a href="#webdev" style={linkStyle}>Web Dev</a>
        <a href="#dsa" style={linkStyle} onClick={NavigateDashboard}>DSA</a>
        <a href="#devops" style={linkStyle}>DevOps</a>
      </div>
      {isDsaDashboard && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "10px" }}>
          <button onClick={handleCreateRoom} style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)", border: "1px solid violet", borderRadius: "6px" }}>
            Create Room
          </button>
          <button
            onClick={() => setShowJoinModal(true)}
            style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)", border: "1px solid violet", borderRadius: "6px" }}
          >
            Join Room
          </button>
        </div>
      )}

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
              <button onClick={handleNavigateToFollowDashboard} style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
                Follow Dashboard
              </button>
              <button onClick={handleNavigateToUploadPost} style={{ padding: "8px", color: "#fff", backgroundColor: "rgba(0, 0, 0, 0.95)" }}>
                Upload Post
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
      {isDsaDashboard && showJoinModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            padding: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            border: "1px solid violet"
          }}>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={joinRoomId}
              onChange={(e) => setJoinRoomId(e.target.value)}
              style={{
                backgroundColor: "#1a1a1a",
                color: "white",
                border: "1px solid violet",
                borderRadius: "8px",
                padding: "10px",
                outline: "none",
                width: "250px"
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleJoinRoom} style={{ padding: "8px", color: "#fff", backgroundColor: "black", border: "1px solid violet", borderRadius: "6px" }}>
                Join Room
              </button>
              <button onClick={() => setShowJoinModal(false)} style={{ padding: "8px", color: "#fff", backgroundColor: "black", border: "1px solid red", borderRadius: "6px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;