import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterUserScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_REGISTER_URI,
        { name, email, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div
    style={{
      minHeight: "100vh",
      backgroundColor: "#0d1117",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      color: "#ffffff",
      fontFamily: "Segoe UI, sans-serif",
    }}
    >
      <img
        src="wecode logo.png"
        alt="wecode Logo"
        style={{ width: "50px", marginBottom: "20px" }}
      />
      <h1 style={{ marginBottom: "20px", fontWeight: "500" }}>
        Sign up to WeCode
      </h1>

      <form
        onSubmit={handleRegister}
        style={{
          backgroundColor: "#0d1117",
          border: "1px solid #30363d",
          borderRadius: "6px",
          padding: "20px",
          width: "300px",
          textAlign: "left",
        }}
      >
        <div>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: "5px" }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Sign up
        </button>

        {message && (
          <div
            style={{
              marginTop: "15px",
              color: "#f85149",
              backgroundColor: "#1f2a35",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #30363d",
              fontWeight: "bold",
            }}
          >
            {message}
          </div>
        )}
      </form>

      <div
        style={{
          marginTop: "20px",
          fontSize: "14px",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "1px solid #30363d",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          style={{ color: "#58a6ff", cursor: "pointer" }}
        >
          Log in
        </span>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "15px",
  borderRadius: "5px",
  border: "1px solid #30363d",
  backgroundColor: "#0d1117",
  color: "#c9d1d9",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "15px",
  borderRadius: "5px",
  backgroundColor: "#238636",
  color: "#fff",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default RegisterUserScreen;
