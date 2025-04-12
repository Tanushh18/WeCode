import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Navbar from "../Layout1/Navbar";
import Layout from "../Layout1/Layout";
import Footer from "../Layout1/Footer"; // Make sure Footer exists

const socket = io(process.env.REACT_APP_SOCKET_URL); // Replace with actual server URL if needed

const Livechatroom = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("send-message", message);
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <Layout>
      <Navbar />

      <div style={{ padding: "2rem", color: "white" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>💬 Live Chat Room</h1>
        <p>Welcome! Start chatting in real-time with others in this room.</p>
      </div>

      <div
        style={{
          border: "1px solid violet",
          padding: "10px",
          borderRadius: "8px",
          backgroundColor: "#1a1a1a",
          color: "white",
          width: "300px",
          height: "400px",
          overflowY: "auto",
          position: "fixed",
          bottom: "80px", // leave space for footer
          right: "20px",
          zIndex: 1000,
        }}
      >
        <h3 style={{ textAlign: "center" }}>💬 Chat</h3>
        <div
          style={{
            height: "300px",
            overflowY: "scroll",
            marginBottom: "10px",
          }}
        >
          {messages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "100%",
            padding: "5px",
            backgroundColor: "#222",
            color: "white",
            border: "1px solid violet",
            borderRadius: "5px",
          }}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
      </div>

      <Footer />
    </Layout>
  );
};

export default Livechatroom;
