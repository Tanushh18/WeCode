import React from "react";
import { useNavigate } from "react-router-dom";
// import './HomeScreen.css';

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom right, black, #2e2e6c)",
        color: "white",
        minHeight: "100vh",
        height: "auto",
        overflowY: "auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div style={{ overflowY: "auto", width: "100%", maxWidth: "1200px", padding: "40px 20px" }}>
        <div style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "10px",
          borderRadius: "10px"
        }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "#ffffff",
              color: "#4e54c8",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              marginRight: "10px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            style={{
              backgroundColor: "#ffffff",
              color: "#4e54c8",
              padding: "10px 20px",
              fontSize: "16px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#ffffff")}
          >
            Register
          </button>
        </div>

        <h1 className="fade-in-down" style={{ fontSize: "48px",marginLeft:"135px" , marginBottom: "10px" }}>Welcome to WeCode</h1>
        <p className="fade-in" style={{ fontSize: "20px", maxWidth: "900px", textAlign: "center", marginBottom: "40px" }}>
          WeCode is a powerful collaborative coding platform offering real-time code editing, video conferencing, DSA content, LeetCode integration, and session management — all in one place. Join a room, write code with friends, learn DSA, and crack coding interviews with ease!
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px", marginBottom: "40px" }}>
          {[
            { title: "Real-Time Code Editor", icon: "https://img.icons8.com/color/48/source-code.png" },
            { title: "Video & Audio Chat", icon: "https://img.icons8.com/fluency/48/video-call.png" },
            { title: "DSA Learning Hub", icon: "https://img.icons8.com/color/48/learning.png" },
            { title: "Live Code Execution", icon: "https://img.icons8.com/office/40/play.png" },
            { title: "LeetCode Integration", icon: "https://img.icons8.com/color/48/source-code.png" },
            { title: "Secure User Sessions", icon: "https://img.icons8.com/fluency/48/lock.png" },
          ].map((feature) => (
            <div
              key={feature.title}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "20px",
                borderRadius: "10px",
                width: "280px",
                textAlign: "center",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={feature.icon} alt={feature.title} style={{ width: "40px", marginBottom: "10px" }} />
              <h3 style={{ fontSize: "22px", marginBottom: "10px" }}>{feature.title}</h3>
            </div>
          ))}
        </div>

        <section style={{ marginTop: "60px", maxWidth: "900px", textAlign: "left" }}>
          <h2 style={{ color: "#58a6ff" }}>✨ Optional Improvements</h2>
          <ul style={{ lineHeight: "1.8", fontSize: "16px" }}>
            <li>Dark Mode toggle for better UX</li>
            <li>Autosave feature in code editor</li>
            <li>GitHub integration for real-time commits</li>
            <li>Real-time chat and emoji reactions</li>
            <li>Code review mode for collaborative debugging</li>
            <li>Security enhancements: token expiry & input validation</li>
            <li>Performance boosts: lazy loading, socket optimization</li>
            <li>Gamification elements like Leaderboard & Badges</li>
            <li>AI-Powered Code Suggestions and Autocomplete</li>
            <li>Session Recording and Playback</li>
            <li>Integrated Whiteboard for brainstorming</li>
            <li>Mobile Responsive Design</li>
            <li>Custom Themes and Layouts</li>
          </ul>
        </section>

        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2 style={{ color: "#58a6ff" }}>🚀 Ready to Code Together?</h2>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>Jump into a room and start building, debugging, and learning with your peers in real time.</p>
          <button
            onClick={() => navigate("/rooms")}
            style={{
              backgroundColor: "#58a6ff",
              color: "#ffffff",
              padding: "12px 24px",
              fontSize: "18px",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1f6feb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#58a6ff")}
          >
            Explore Rooms
          </button>
        </div>

        <footer style={{ marginTop: "60px", padding: "20px", textAlign: "center", color: "#8b949e", borderTop: "1px solid #30363d" }}>
          Built with ❤️ using MERN Stack • © 2025 WeCode
        </footer>
      </div>
    </div>
  );
};

export default HomeScreen;
